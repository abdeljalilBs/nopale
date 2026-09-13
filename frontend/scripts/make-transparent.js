const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const inputPath = path.join(__dirname, '../public/logos/logo-nopal.png');
const outputPath = path.join(__dirname, '../public/logos/logo-nopal-transparent.png');
const outputWhitePath = path.join(__dirname, '../public/logos/logo-nopal-white.png');

const buf = fs.readFileSync(inputPath);

const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

let pos = 8;
let idatData = [];
while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
        idatData.push(buf.slice(pos + 8, pos + 8 + length));
    }
    pos += 12 + length;
}

const compressed = Buffer.concat(idatData);
const raw = zlib.inflateSync(compressed);

const stride = 1 + width * 3;
const reconstructed = Buffer.alloc(height * width * 3);

function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
}

for (let y = 0; y < height; y++) {
    const filterType = raw[y * stride];
    const rawRow = y * stride + 1;
    const reconRow = y * width * 3;
    const prevRow = (y - 1) * width * 3;

    for (let x = 0; x < width * 3; x++) {
        const xVal = raw[rawRow + x];
        const a = x >= 3 ? reconstructed[reconRow + x - 3] : 0;
        const b = y > 0 ? reconstructed[prevRow + x] : 0;
        const c = (y > 0 && x >= 3) ? reconstructed[prevRow + x - 3] : 0;

        let val = 0;
        if (filterType === 0) val = xVal;
        else if (filterType === 1) val = (xVal + a) & 0xff;
        else if (filterType === 2) val = (xVal + b) & 0xff;
        else if (filterType === 3) val = (xVal + Math.floor((a + b) / 2)) & 0xff;
        else if (filterType === 4) val = (xVal + paeth(a, b, c)) & 0xff;

        reconstructed[reconRow + x] = val;
    }
}

let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 3;
        const r = reconstructed[idx];
        const g = reconstructed[idx + 1];
        const b = reconstructed[idx + 2];

        const isBackground = (r > 240 && g > 240 && b > 215);
        if (!isBackground) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
const cropStride = 1 + cropW * 4;
const cropRaw = Buffer.alloc(cropH * cropStride);
const cropWhiteRaw = Buffer.alloc(cropH * cropStride);

for (let y = 0; y < cropH; y++) {
    const srcY = minY + y;
    cropRaw[y * cropStride] = 0;
    cropWhiteRaw[y * cropStride] = 0;
    for (let x = 0; x < cropW; x++) {
        const srcX = minX + x;
        const srcIdx = (srcY * width + srcX) * 3;
        const destIdx = y * cropStride + 1 + x * 4;

        const r = reconstructed[srcIdx];
        const g = reconstructed[srcIdx + 1];
        const b = reconstructed[srcIdx + 2];

        const dr = 255 - r;
        const dg = 254 - g;
        const db = 235 - b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);

        if (dist < 15) {
            cropRaw[destIdx] = 0;
            cropRaw[destIdx + 1] = 0;
            cropRaw[destIdx + 2] = 0;
            cropRaw[destIdx + 3] = 0;

            cropWhiteRaw[destIdx] = 0;
            cropWhiteRaw[destIdx + 1] = 0;
            cropWhiteRaw[destIdx + 2] = 0;
            cropWhiteRaw[destIdx + 3] = 0;
        } else {
            const alpha = Math.min(255, Math.max(0, Math.round((dist - 15) * 5)));
            // Blue logo
            cropRaw[destIdx] = r;
            cropRaw[destIdx + 1] = g;
            cropRaw[destIdx + 2] = b;
            cropRaw[destIdx + 3] = alpha;

            // White/Ivoire logo (#FFFEEB)
            cropWhiteRaw[destIdx] = 255;
            cropWhiteRaw[destIdx + 1] = 254;
            cropWhiteRaw[destIdx + 2] = 235;
            cropWhiteRaw[destIdx + 3] = alpha;
        }
    }
}

const newIdat = zlib.deflateSync(cropRaw);
const newWhiteIdat = zlib.deflateSync(cropWhiteRaw);

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
}
function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
        c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff);
}

function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    const crc = crc32(toCrc);
    crcBuf.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(cropW, 0);
ihdrData.writeUInt32BE(cropH, 4);
ihdrData[8] = 8;
ihdrData[9] = 6;
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const ihdrChunk = makeChunk('IHDR', ihdrData);
const idatChunk = makeChunk('IDAT', newIdat);
const idatWhiteChunk = makeChunk('IDAT', newWhiteIdat);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

fs.writeFileSync(outputPath, Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]));
fs.writeFileSync(outputWhitePath, Buffer.concat([pngSig, ihdrChunk, idatWhiteChunk, iendChunk]));
console.log('Saved both transparent blue and transparent white logos!');

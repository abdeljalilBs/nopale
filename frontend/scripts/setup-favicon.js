const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Input transparent logo
const logoPath = path.join(__dirname, '../public/logos/logo-nopal-transparent.png');
const appIconPath = path.join(__dirname, '../src/app/icon.png');
const appFaviconPath = path.join(__dirname, '../src/app/favicon.ico');
const publicFaviconPath = path.join(__dirname, '../public/favicon.ico');

const buf = fs.readFileSync(logoPath);
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

console.log(`Original logo-nopal-transparent.png: ${width}x${height}`);

// Decode PNG to RGBA
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

const raw = zlib.inflateSync(Buffer.concat(idatData));
const stride = 1 + width * 4; // 8-bit RGBA
const srcPixels = Buffer.alloc(width * height * 4);

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
    const destRow = y * width * 4;
    const prevDestRow = (y - 1) * width * 4;

    for (let x = 0; x < width * 4; x++) {
        const xVal = raw[rawRow + x];
        const a = x >= 4 ? srcPixels[destRow + x - 4] : 0;
        const b = y > 0 ? srcPixels[prevDestRow + x] : 0;
        const c = (y > 0 && x >= 4) ? srcPixels[prevDestRow + x - 4] : 0;

        let val = 0;
        if (filterType === 0) val = xVal;
        else if (filterType === 1) val = (xVal + a) & 0xff;
        else if (filterType === 2) val = (xVal + b) & 0xff;
        else if (filterType === 3) val = (xVal + Math.floor((a + b) / 2)) & 0xff;
        else if (filterType === 4) val = (xVal + paeth(a, b, c)) & 0xff;

        srcPixels[destRow + x] = val;
    }
}

// Create a square canvas of size S = Math.max(width, height) + padding
// This preserves the exact proportion of "nopal" logo and centers it with transparent padding
const maxDim = Math.max(width, height);
// Make the square size 512x512 or maxDim
const squareSize = 512;
const scale = (squareSize * 0.9) / maxDim; // 5% padding around
const renderW = Math.round(width * scale);
const renderH = Math.round(height * scale);
const offsetX = Math.round((squareSize - renderW) / 2);
const offsetY = Math.round((squareSize - renderH) / 2);

const squarePixels = Buffer.alloc(squareSize * squareSize * 4); // All zeros = transparent

for (let dy = 0; dy < renderH; dy++) {
    const sy = Math.min(height - 1, Math.floor(dy / scale));
    for (let dx = 0; dx < renderW; dx++) {
        const sx = Math.min(width - 1, Math.floor(dx / scale));
        const srcIdx = (sy * width + sx) * 4;
        const destX = offsetX + dx;
        const destY = offsetY + dy;
        const destIdx = (destY * squareSize + destX) * 4;

        squarePixels[destIdx] = srcPixels[srcIdx];
        squarePixels[destIdx + 1] = srcPixels[srcIdx + 1];
        squarePixels[destIdx + 2] = srcPixels[srcIdx + 2];
        squarePixels[destIdx + 3] = srcPixels[srcIdx + 3];
    }
}

// Encode squarePixels to PNG
function encodePNG(pixels, w, h) {
    const rowStride = 1 + w * 4;
    const rawBuffer = Buffer.alloc(h * rowStride);

    for (let y = 0; y < h; y++) {
        rawBuffer[y * rowStride] = 0; // Filter 0
        pixels.copy(rawBuffer, y * rowStride + 1, y * w * 4, (y + 1) * w * 4);
    }

    const compressed = zlib.deflateSync(rawBuffer);

    const crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    function crc32(b) {
        let c = 0xffffffff;
        for (let i = 0; i < b.length; i++) {
            c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8);
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

    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0);
    ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8;
    ihdr[9] = 6; // RGBA
    ihdr[10] = 0;
    ihdr[11] = 0;
    ihdr[12] = 0;

    const pngSig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    return Buffer.concat([
        pngSig,
        makeChunk('IHDR', ihdr),
        makeChunk('IDAT', compressed),
        makeChunk('IEND', Buffer.alloc(0))
    ]);
}

const squarePng = encodePNG(squarePixels, squareSize, squareSize);

// Write to src/app/icon.png (Next.js App Router default icon standard)
fs.writeFileSync(appIconPath, squarePng);
console.log(`Created ${appIconPath}`);

// Also generate a 64x64 or 32x32 ICO file so old browsers requesting /favicon.ico get the logo
// An ICO file can embed a PNG directly (standard Windows Vista+ ICO format supported by all browsers)
function createIcoFromPng(pngBuf, w, h) {
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved
    icoHeader.writeUInt16LE(1, 2); // 1 = ICO
    icoHeader.writeUInt16LE(1, 4); // 1 image

    const icoDir = Buffer.alloc(16);
    icoDir.writeUInt8(w >= 256 ? 0 : w, 0); // Width
    icoDir.writeUInt8(h >= 256 ? 0 : h, 1); // Height
    icoDir.writeUInt8(0, 2); // Color palette
    icoDir.writeUInt8(0, 3); // Reserved
    icoDir.writeUInt16LE(1, 4); // Color planes
    icoDir.writeUInt16LE(32, 6); // Bits per pixel
    icoDir.writeUInt32LE(pngBuf.length, 8); // Size of image data
    icoDir.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

    return Buffer.concat([icoHeader, icoDir, pngBuf]);
}

// 64x64 square
const icon64Size = 64;
const scale64 = (icon64Size * 0.9) / maxDim;
const rW64 = Math.round(width * scale64);
const rH64 = Math.round(height * scale64);
const offX64 = Math.round((icon64Size - rW64) / 2);
const offY64 = Math.round((icon64Size - rH64) / 2);
const p64 = Buffer.alloc(icon64Size * icon64Size * 4);

for (let dy = 0; dy < rH64; dy++) {
    const sy = Math.min(height - 1, Math.floor(dy / scale64));
    for (let dx = 0; dx < rW64; dx++) {
        const sx = Math.min(width - 1, Math.floor(dx / scale64));
        const srcIdx = (sy * width + sx) * 4;
        const destX = offX64 + dx;
        const destY = offY64 + dy;
        const destIdx = (destY * icon64Size + destX) * 4;

        p64[destIdx] = srcPixels[srcIdx];
        p64[destIdx + 1] = srcPixels[srcIdx + 1];
        p64[destIdx + 2] = srcPixels[srcIdx + 2];
        p64[destIdx + 3] = srcPixels[srcIdx + 3];
    }
}

const png64 = encodePNG(p64, icon64Size, icon64Size);
const icoData = createIcoFromPng(png64, 64, 64);

fs.writeFileSync(appFaviconPath, icoData);
fs.writeFileSync(publicFaviconPath, icoData);
console.log(`Created ${appFaviconPath} and ${publicFaviconPath}`);

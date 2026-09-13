// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/DbConnect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Trop de requêtes, veuillez réessayer plus tard." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter); // Appliquer uniquement aux routes API

// --- ROUTES ---

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
    res.json({ message: 'API Nopal Backend est active 🚀' });
});

// Importation des routes (à créer dans le dossier /routes)
// Exemple : const projectRoutes = require('./routes/projectRoutes');
// app.use('/api/projects', projectRoutes);

// Gestion des erreurs 404 (Non trouvé)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

// --- DÉMARRAGE DU SERVEUR ---
app.listen(PORT, () => {
    console.log(`🚀 Serveur Nopal lancé sur le port ${PORT}`);
});
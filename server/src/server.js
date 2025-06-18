const express = require('express');
const cors = require('cors');

const BoardController = require('./controllers/BoardController');
const CardController = require('./controllers/CardController');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/*', (req, res, next) => {
    next();
});

server.get('/api/boards', async (req, res) => {
    try {
        const boards = await BoardController.getAll();
        res.json({ message: 'success', boards, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
});

server.post('/api/boards', async (req, res) => {
    try {
        const board = await BoardController.create(req.body);
        res.json({ message: 'success', board, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

server.delete('/api/boards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const board = await BoardController.delete(id);
        res.json({ message: 'success', board, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

server.get('/api/boards/:id/cards', async (req, res) => {
    try {
        const { id } = req.params;
        const cards = await CardController.getAll(id);
        res.json({ message: 'success', cards, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

server.post('/api/boards/:id/cards', async (req, res) => {
    try {
        const { id } = req.params;
        const card = await CardController.create(id, req.body);
        res.json({ message: 'success', card, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

server.use('/*', (req, res, next) => {
    next({ status: 404, message: 'Not found' })
})

server.use((err, req, res, next) => {
    const { message, status = 500 } = err
    res.status(status).json({ message })
})

module.exports = server;

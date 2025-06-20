const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());
const { BoardController, CardController, CommentController } = require('./controllers/Controller');


server.use('/*', (req, res, next) => {
    next();
});

/**
 * Retrieves all boards from the database
 * @returns {Object} JSON response with boards array
 */
server.get('/api/boards', async (req, res) => {
    try {
        const boards = await BoardController.getAll();
        res.json({ message: 'success', boards, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
});

/**
 * Creates a new board in the database
 * @param {Object} req.body - Board data
 * @returns {Object} JSON response with created board
 */
server.post('/api/boards', async (req, res) => {
    try {
        const board = await BoardController.create(req.body);
        res.json({ message: 'success', board, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Deletes a board and all its associated cards
 * @param {string} req.params.id - Board ID
 * @returns {Object} JSON response with deleted board
 */
server.delete('/api/boards/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const board = await BoardController.delete(id);
        res.json({ message: 'success', board, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Retrieves all cards for a specific board
 * @param {string} req.params.id - Board ID
 * @returns {Object} JSON response with cards array
 */
server.get('/api/boards/:id/cards', async (req, res) => {
    try {
        const { id } = req.params;
        const cards = await CardController.getAll(id);
        res.json({ message: 'success', cards, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Creates a new card for a specific board
 * @param {string} req.params.id - Board ID
 * @param {Object} req.body - Card data
 * @returns {Object} JSON response with created card
 */
server.post('/api/boards/:id/cards', async (req, res) => {
    try {
        const { id } = req.params;
        const card = await CardController.create(req.body, id);
        res.json({ message: 'success', card, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Deletes a specific card from a board
 * @param {string} req.params.boardId - Board ID
 * @param {string} req.params.cardId - Card ID
 * @returns {Object} JSON response with deleted card
 */
server.delete('/api/boards/:boardId/cards/:cardId', async (req, res) => {
    try {
        const { boardId, cardId } = req.params;
        const card = await CardController.delete(cardId);
        res.json({ message: 'success', card, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Updates a specific card in a board
 * @param {string} req.params.boardId - Board ID
 * @param {string} req.params.cardId - Card ID
 * @param {Object} req.body - Updated card data
 * @returns {Object} JSON response with updated card
 */
server.put('/api/boards/:boardId/cards/:cardId', async (req, res) => {
    try {
        const { boardId, cardId } = req.params;
        const card = await CardController.update(cardId, req.body);
        res.json({ message: 'success', card, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Get all comments for a specific card
 * @param {string} req.params.boardId - Board ID
 * @param {string} req.params.cardId - Card ID
 * @returns {Object} JSON response with associated comments
 */
server.get('/api/boards/:boardId/cards/:cardId/comments', async (req, res) => {
    try {
        const { boardId, cardId } = req.params;
        const comments = await CommentController.getAll(cardId);
        res.json({ message: 'success', comments, status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'error', error: error.message, status: 500 });
    }
})

/**
 * Create a comment for a specific card
 * @param {string} req.params.boardId - Board ID
 * @param {string} req.params.cardId - Card ID
 * @param {Object} req.body - Updated card data
 * @returns {Object} JSON response with comment data
 */
server.post('/api/boards/:boardId/cards/:cardId/comments', async (req, res) => {
    try {
        const { boardId, cardId } = req.params;
        const comment = await CommentController.create(req.body, cardId);
        res.json({ message: 'success', comment, status: 200 });
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

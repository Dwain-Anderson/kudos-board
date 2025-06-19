import { SERVER_ADDRESS } from "./constants";
import { GIPHY_API_KEY } from "./constants";

const METHOD_ENUM = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

/**
 * Generates request options for fetch API calls
 * @param {string} methodType - HTTP method type (GET, POST, PUT, DELETE, PATCH)
 * @param {Object} data - Data to be sent in the request body
 * @returns {Object} Request options for fetch API
 */
const options = (methodType, data) => {
    switch (methodType) {
        case METHOD_ENUM.GET:
            return {
                method: methodType,
                headers: {
                    'Accept': 'application/json',
                }
            }
        case METHOD_ENUM.POST:
            return {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            }
        case METHOD_ENUM.DELETE:
            return {
                method: methodType,
                headers: {
                    'Accept': 'application/json',
                }
            }
        case METHOD_ENUM.PATCH:
            return {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            }
        case METHOD_ENUM.PUT:
            return {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            }
        default:
            return {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }
    }
}


/**
 * Fetches GIFs from Giphy API based on search query
 * @param {string} searchQuery - Search term for GIFs
 * @returns {Array} Array of GIF objects or empty array on error
 */
export const fetchGifs = async (searchQuery = '') => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchQuery}&limit=6`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return [];
    }
}

export const Boards = {
    /**
     * Fetches all boards from the server
     * @returns {Array} Array of board objects
     */
    getAll: (async () => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards`, options(METHOD_ENUM.GET))).json();
            return response.boards
        } catch (error) {
            console.error("Error fetching boards:", error);
            return []; // Return empty array on error
        }
    }),
    /**
     * Creates a new board on the server
     * @param {Object} board - Board data to create
     * @returns {Object} Created board with server-assigned ID
     */
    create: (async (board) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards`, options(METHOD_ENUM.POST, board))).json();
            return response.board
        } catch (error) {

        }}),
    /**
     * Deletes a board from the server
     * @param {number|string} boardId - ID of the board to delete
     * @returns {Object} Deleted board data
     */
    delete: (async (boardId) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}`, options(METHOD_ENUM.DELETE))).json();
            return response.board
        } catch (error) {

        }
    }),
}

export const Cards = {
    /**
     * Fetches all cards for a specific board
     * @param {number|string} boardId - ID of the board to get cards from
     * @returns {Array} Array of card objects
     */
    getAll: (async (boardId) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}/cards`, options(METHOD_ENUM.GET))).json();
            return response.cards
        } catch (error) {

        }
    }),
    /**
     * Creates a new card on the server
     * @param {Object} card - Card data to create
     * @returns {Object} Created card with server-assigned ID
     */
    create: (async (card) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${card.boardId}/cards`, options(METHOD_ENUM.POST, card))).json();
            return response.card;
        } catch (error) {
            console.error("Error creating card:", error);
            throw error;
        }
    }),
    /**
     * Deletes a card from the server
     * @param {number|string} cardId - ID of the card to delete
     * @param {number|string} boardId - ID of the board containing the card
     * @returns {Object} Deleted card data
     */
    delete: (async (cardId, boardId) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}/cards/${cardId}`, options(METHOD_ENUM.DELETE))).json();
            return response.board
        } catch (error) {

        }
    }),
    /**
     * Updates a card on the server
     * @param {number|string} cardId - ID of the card to update
     * @param {number|string} boardId - ID of the board containing the card
     * @param {Object} data - Updated card data
     * @returns {Object} Updated card data
     */
    update: async (cardId, boardId, data) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}/cards/${cardId}`, options(METHOD_ENUM.PUT, data))).json();
            return response.card
        } catch (error) {

        }
    }
}

import { SERVER_ADDRESS } from "./constants";


const METHOD_ENUM = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

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
        default:
            return {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }
    }
}

export const Boards = {
    getAll: (async () => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards`, options(METHOD_ENUM.GET))).json();
            return response.boards
        } catch (error) {
        }
    }),
    create: (async (board) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards`, options(METHOD_ENUM.POST, board))).json();
            return response.board
        } catch (error) {

        }}),
    delete: (async (boardId) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}`, options(METHOD_ENUM.DELETE))).json();
            return response.board
        } catch (error) {

        }
    }),
}

export const Cards = {
    getAll: (async (boardId) => {
        try {
            const response = await (await fetch(`${SERVER_ADDRESS}/api/boards/${boardId}/cards`, options(METHOD_ENUM.GET))).json();
            return response.cards
        } catch (error) {

        }
    }),
    create: () => {},
    delete: () => {},
    update: () => {},
}

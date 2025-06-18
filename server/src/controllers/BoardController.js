const { database } = require('../shared');

const BoardController = {
    getAll: (async () => {
        try {
            const boards = await database.board.findMany();
            return boards || [];
        } catch (error) {
            throw new Error(error);
        }
    }),
    create: (async (data) => {
        try {
            if (!data.title || !data.category || !data.author) {
                throw new Error('Missing required fields');
            }
            const boardData = {
                title: data.title,
                category: data.category,
                imageUrl: data.imageUrl,
                author: data.author
            }
            const board = await database.board.create({ data: boardData });
            return board;
        } catch (error) {
            throw error;
        }
    }),
    delete: (async (id) => {
        try {
            const board = await database.board.delete({ where: { id: Number(id) } });
            return board;
        } catch (error) {
            throw error;
        }
    })
};

module.exports = BoardController;

const { database } = require('../shared');

const BoardController = {
    getAll: (async () => {
        const boards = await database.board.findMany();
        return boards || [];
    }),
    create: (async (data) => {
        const boardData = {
                title: data.title,
                category: data.category,
                imageUrl: data.imageUrl,
                author: data.author
            }
        const board = await database.board.create({ data: boardData });
        return board;
    }),
    delete: (async (id) => {
        const board = await database.board.delete({ where: { id: Number(id) } });
        return board;
    })
};



module.exports = BoardController;

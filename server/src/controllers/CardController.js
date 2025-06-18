const { database } = require('../shared');


const CardController = {
    getAll: async (id) => {
        const cards = await database.card.findMany({
                select: {
                    id: true,
                },
                where: { boardId: Number(id) }
            }
        );
        return cards;
    },
    create: () => {},
    update: () => {},
    delete: () => {},
}

module.exports = CardController;

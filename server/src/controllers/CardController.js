const { database } = require('../shared');

const CardController = {
    getAll: async (id) => {
        const cards = await database.card.findMany({
                where: { boardId: Number(id) }
            }
        );
        return cards;
    },
    create: (id, data) => {
        const cardData = {
            message: data.message,
            boardId: Number(id),
            gifUrl: data.gifUrl,
        }
        if (data.author) {
            cardData.author = data.author
        }
        return database.card.create({data: cardData})
    },
    update: () => {},
    delete: () => {},
}

module.exports = CardController;

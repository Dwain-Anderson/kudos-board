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
    update: async (id, data) => {
        // PATCH request - only update the fields that are passed in
        const updateData = {};

        // Check each field and only include it if it's provided in the request
        if (data.message !== undefined) {
            updateData.message = data.message;
        }

        if (data.author !== undefined) {
            updateData.author = data.author;
        }

        if (data.gifUrl !== undefined) {
            updateData.gifUrl = data.gifUrl;
        }

        if (data.upvotes !== undefined) {
            updateData.upvotes = data.upvotes;
        }

        // If no fields to update, return the existing card
        if (Object.keys(updateData).length === 0) {
            return database.card.findUnique({
                where: { id: Number(id) }
            });
        }

        // Update the card with only the provided fields
        return database.card.update({
            where: { id: Number(id) },
            data: updateData
        });
    },
    delete: (async (id) => {
        const card = await database.card.delete({ where: { id: Number(id) } });
        return card;
    }),

    deleteAll: (async (boardId) => {
        const card = await database.card.deleteMany({ where: { boardId: Number(boardId) } });
        return card;
    })


}

module.exports = CardController;

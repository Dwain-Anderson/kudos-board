const { PrismaClient } = require("./generated/prisma");
const database = new PrismaClient();

const TABLE_NAMES_ENUM = {
  BOARD: "board",
  CARD: "card",
  COMMENT: "comment",
};

module.exports = { database, TABLE_NAMES_ENUM };

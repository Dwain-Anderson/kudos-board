const { PrismaClient } = require('./generated/prisma');
const database = new PrismaClient();

module.exports = { database };

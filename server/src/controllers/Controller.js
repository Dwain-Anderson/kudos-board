const { database, TABLE_NAMES_ENUM } = require("../shared");

const Controller = {
  /**
   * (https://en.wikipedia.org/wiki/Functor)/(https://ocaml.org/docs/functors)
   * Creates a controller with CRUD operations for a database module
   * @param {Object} module - Module configuration with tableName and optional foreignKeys and hooks
   * @returns {Object} Controller object with CRUD methods
   */
  Make(module) {
    return {
      /**
       * Retrieves all records from the module's table with optional filtering by foreign key
       * @param {...any} args - Optional foreign key value(s)
       * @returns {Promise<Array>} Array of database records
       */
      getAll: async (...args) => {
        const where = {};
        if (
          module.foreignKeys &&
          module.foreignKeys.length > 0 &&
          args.length > 0
        ) {
          const foreignKey = module.foreignKeys[0];
          where[foreignKey] = { equals: Number(args[0]) };
        }
        return await database[module.tableName].findMany({ where });
      },

      /**
       * Retrieves a single record by ID
       * @param {number|string} id - Record ID to retrieve
       * @returns {Promise<Object>} Database record
       */
      get: async (id) => {
        return await database[module.tableName].findUnique({
          where: { id: Number(id) },
        });
      },

      /**
       * Creates a new record in the database
       * @param {Object} data - Data for the new record
       * @param {...any} args - Optional foreign key value(s)
       * @returns {Promise<Object>} Created database record
       */
      create: async (data, ...args) => {
        if (
          module.foreignKeys &&
          module.foreignKeys.length > 0 &&
          args.length > 0
        ) {
          const foreignKey = module.foreignKeys[0];
          data[foreignKey] = Number(args[0]);
        }
        return await database[module.tableName].create({ data });
      },

      /**
       * Updates an existing record in the database
       * @param {number|string} id - ID of the record to update
       * @param {Object} data - Updated data fields
       * @returns {Promise<Object>} Updated database record
       */
      update: async (id, data) => {
        const updateData = {};
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined && key !== "id") {
            updateData[key] = data[key];
          }
        });

        if (Object.keys(updateData).length === 0) {
          return await database[module.tableName].findUnique({
            where: { id: Number(id) },
          });
        }
        return await database[module.tableName].update({
          where: { id: Number(id) },
          data: updateData,
        });
      },

      /**
       * Deletes a record from the database
       * @param {number|string} id - ID of the record to delete
       * @returns {Promise<Object>} Deleted database record
       */
      delete: async (id) => {
        if (module.hooks && typeof module.hooks.onDelete === "function") {
          await module.hooks.onDelete(id);
        }
        return await database[module.tableName].delete({
          where: { id: Number(id) },
        });
      },
    };
  },
};

const BoardModule = {
  tableName: TABLE_NAMES_ENUM.BOARD,
  foreignKeys: [],
  hooks: {
    onDelete: async (boardId) => {
      await database[TABLE_NAMES_ENUM.CARD].deleteMany({
        where: { boardId: Number(boardId) },
      });
    },
  },
};

const CardModule = {
  tableName: TABLE_NAMES_ENUM.CARD,
  foreignKeys: ["boardId"],
  hooks: {
    onDelete: async (cardId) => {
      await database[TABLE_NAMES_ENUM.COMMENT].deleteMany({
        where: { cardId: Number(cardId) },
      });
    },
  },
};

const CommentModule = {
  tableName: TABLE_NAMES_ENUM.COMMENT,
  foreignKeys: ["cardId"],
};

Object.freeze(BoardModule);
Object.freeze(CardModule);
Object.freeze(CommentModule);

const BoardController = Controller.Make(BoardModule);
const CardController = Controller.Make(CardModule);
const CommentController = Controller.Make(CommentModule);

Object.freeze(BoardController);
Object.freeze(CardController);
Object.freeze(CommentController);

module.exports = { BoardController, CardController, CommentController };

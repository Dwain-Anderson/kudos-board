import { SERVER_ADDRESS, GIPHY_API_KEY } from "./constants";

const METHOD_ENUM = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

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
            };
        case METHOD_ENUM.POST:
        case METHOD_ENUM.PUT:
        case METHOD_ENUM.PATCH:
            return {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            };
        case METHOD_ENUM.DELETE:
            return {
                method: methodType,
                headers: {
                    'Accept': 'application/json',
                }
            };
        default:
            return {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            };
    }
};

/**
 * API Functor
 * @param {Object} module - Module configuration with resourceName and optional parentResource
 * @returns {Object} API client object with CRUD methods
 */
const API = {
    Make(module) {
        return {
            /**
             * Builds the URL path for a resource, including all parent resources
             * @param {Array} ids - IDs for each resource in the parent-child hierarchy tree
             * @returns {string} The URL path
             */
            formatUrl: (ids = []) => {
                let url = `${SERVER_ADDRESS}/api`;
                if (!module.parentResource) {
                    return `${url}/${module.resourceName}s`;
                }
                const hierarchyNodes = [];
                let current = module;
                while (current) {
                    hierarchyNodes.unshift(current);
                    current = current.parentResource;
                }
                for (let i = 0; i < hierarchyNodes.length - 1; i++) {
                    const resource = hierarchyNodes[i];
                    const id = ids[i];
                    if (id !== undefined) {
                        url += `/${resource.resourceName}s/${id}`;
                    }
                }
                return `${url}/${module.resourceName}s`;
            },

            /**
             * Fetches all resources from the server
             * @param {...any} args - IDs for parent resources in order of hierarchy
             * @returns {Array} Array of resource objects
             */
            getAll: async function(...args) {
                try {
                    const url = this.formatUrl(args);
                    const response = await (await fetch(url, options(METHOD_ENUM.GET))).json();
                    return response[`${module.resourceName}s`] || [];
                } catch (error) {
                    console.error(`Error fetching ${module.resourceName}s:`, error);
                    return [];
                }
            },

            /**
             * Creates a new resource on the server
             * @param {Object} data - Resource data to create
             * @param {...any} args - IDs for parent resources in order of hierarchy
             * @returns {Object} Created resource with server-assigned ID
             */
            create: async function(data, ...args) {
                try {
                    const url =  this.formatUrl(args);
                    const response = await (await fetch(url, options(METHOD_ENUM.POST, data))).json();
                    return response[module.resourceName];
                } catch (error) {
                    throw error;
                }
            },

            /**
             * Updates a resource on the server
             * @param {number|string} id - ID of the resource to update
             * @param {...any} args - Parent resource IDs followed by data object
             * @returns {Object} Updated resource data
             */
            update: async function(id, ...args) {
                try {
                    const data = args.pop();
                    const parentIds = args;

                    const basePath =  this.formatUrl(parentIds);
                    const url = `${basePath}/${id}`;

                    const response = await (await fetch(url, options(METHOD_ENUM.PUT, data))).json();
                    return response[module.resourceName];
                } catch (error) {
                    console.error(`Error updating ${module.resourceName}:`, error);
                    throw error;
                }
            },

            /**
             * Deletes a resource from the server
             * @param {number|string} id - ID of the resource to delete
             * @param {...any} args - IDs for parent resources in order of hierarchy
             * @returns {Object} Deleted resource data
             */
            delete: async function(id, ...args) {
                try {
                    const basePath = this.formatUrl(args);
                    const url = `${basePath}/${id}`;
                    const response = await (await fetch(url, options(METHOD_ENUM.DELETE))).json();
                    return response[module.resourceName];
                } catch (error) {
                    throw error;
                }
            }
        };
    }
};


const BoardModule = {
    resourceName: 'board',
    parentResource: null
};

const CardModule = {
    resourceName: 'card',
    parentResource: BoardModule
};

const CommentModule = {
    resourceName: 'comment',
    parentResource: CardModule
};


Object.freeze(BoardModule);
Object.freeze(CardModule);
Object.freeze(CommentModule);

const Boards = API.Make(BoardModule);
const Cards = API.Make(CardModule);
const Comments = API.Make(CommentModule);

Object.freeze(Boards);
Object.freeze(Cards);
Object.freeze(Comments);

/**
 * Fetches GIFs from Giphy API based on search query
 * @param {string} searchQuery - Search term for GIFs
 * @returns {Array} Array of GIF objects or empty array on error
 */
const fetchGifs = async (searchQuery = '') => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchQuery}&limit=6`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        return [];
    }
};

export { Boards, Cards, Comments, fetchGifs };

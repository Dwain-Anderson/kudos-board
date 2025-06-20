export const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;
export const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const FILTER_ENUM = {
  ALL: "all",
  RECENT: "recent",
  CELEBRATION: "Celebration",
  THANK_YOU: "Thank you",
  INSPIRATION: "Inspiration",
};

export const METHOD_ENUM = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const MAX_RECENT_BOARDS = 6;

export const STATE_ENUM = {
  DELETE: "DELETE",
  UPVOTE: "UPVOTE",
  PIN: "PIN",
};

export function sortByPin(cards) {
  const pinnedCards = cards.filter((card) => card.pinned);
  pinnedCards.sort((a, b) => b.pinnedAt - a.pinnedAt);
  const unpinnedCards = cards.filter((card) => !card.pinned);
  return pinnedCards.concat(unpinnedCards);
}

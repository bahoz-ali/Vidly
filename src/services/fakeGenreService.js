export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
  { _id: "5b21ca3eeb7f6fbccd471825", name: "horror" },
  { _id: "5b91ca3eeb7f6fbccd471813", name: "crime" },
  { _id: "5b21ca3eeb7f6fbccd471892", name: "romance" },
  { _id: "5b21ca3eeb7f6fbccd471821", name: "drama" },
];
 
export function getGenres() {
  return genres.filter(g => g);
}

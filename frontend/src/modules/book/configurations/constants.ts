import { BookCategory, Genre } from "./types";

export const booksCacheKey = "books";

export const BookCategoryRecord: Record<
  BookCategory,
  { label: string; description: string }
> = {
  setting: {
    label: "Setting",
    description: "This is description for setting.",
  },
  plot: { label: "Plot", description: "This is description for plot" },
  characters: {
    label: "Characters",
    description: "This is description for characters",
  },
  style: { label: "Style", description: "This is description for style" },
  engagement: {
    label: "Engagement",
    description: "This is description for engagement",
  },
};

export const GenreRecord: Record<Genre, { label: string; color: string }> = {
  fantasy: {
    label: "Fantasy",
    color: "#FF0000", // Red
  },
  scienceFiction: {
    label: "Science Fiction",
    color: "#007FFF", // Bright Blue
  },
  krimi: {
    label: "Krimi",
    color: "#8B0000", // Dark Red
  },
  thriller: {
    label: "Thriller",
    color: "#4B0082", // Indigo
  },
  liebesroman: {
    label: "Liebesroman",
    color: "#FF69B4", // Hot Pink
  },
  historischerRoman: {
    label: "Historischer Roman",
    color: "#A52A2A", // Brown
  },
  gesellschaftsroman: {
    label: "Gesellschaftsroman",
    color: "#4682B4", // Steel Blue
  },
  entwicklungsroman: {
    label: "Entwicklungsroman",
    color: "#32CD32", // Lime Green
  },
  kinderbuch: {
    label: "Kinderbuch",
    color: "#FFD700", // Gold
  },
  theaterstück: {
    label: "Theaterstück",
    color: "#800080", // Purple
  },
  sachbuch: {
    label: "Sachbuch",
    color: "#008080", // Teal
  },
  fachbuch: {
    label: "Fachbuch",
    color: "#DAA520", // Goldenrod
  },
};

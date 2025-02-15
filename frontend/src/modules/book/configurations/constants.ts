import { BookCategory } from "./types";

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

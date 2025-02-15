import RatingSelection from "@/modules/common/components/RatingSelection";
import { BookCategoryRecord } from "../../configurations/constants";
import { BookCategory, BookRatingBasic } from "../../configurations/types";

type RateBookCategoriesProps = {
  rating: BookRatingBasic;
  updateRating: (rating: BookRatingBasic) => void;
};

export default function RateBookCategories(props: RateBookCategoriesProps) {
  const handleRatingChange = (category: BookCategory, value: number) => {
    props.updateRating({
      ...props.rating,
      [category]: value,
    });
  };

  return (
    <div>
      {(Object.keys(BookCategoryRecord) as BookCategory[]).map((category) => (
        <div key={category}>
          <div className="text-lg font-semibold">
            {BookCategoryRecord[category].label}
          </div>
          <p className="mb-2">{BookCategoryRecord[category].description}</p>
          <RatingSelection
            currentRating={props.rating[category]}
            onSelectRating={(rating) => handleRatingChange(category, rating)}
          />
        </div>
      ))}
    </div>
  );
}

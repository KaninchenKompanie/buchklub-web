import { createEnumerationUpTo } from "../utils";
import RatingIcon from "./RatingIcon";

const maxRating = 7;

export default function RatingSelection({
  currentRating,
  onSelectRating,
}: {
  currentRating: number;
  onSelectRating: (rating: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {createEnumerationUpTo(maxRating).map((rating) => (
        <RatingIcon
          key={rating}
          filled={rating < currentRating + 1}
          onClick={() => onSelectRating(rating)}
        />
      ))}
    </div>
  );
}

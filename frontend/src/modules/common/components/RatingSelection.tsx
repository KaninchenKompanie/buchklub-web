
import { BookRatingBasic } from "@/modules/book/configurations/types";
import { ComponentProps } from "react";
import { PiFeatherFill, PiFeatherLight } from "react-icons/pi";
import { TbFeatherOff } from "react-icons/tb";

export default function RatingSelection({ currentRating, category, onChange }: { currentRating: number, category: keyof BookRatingBasic, onChange: Function}) {
  const ratingScale = 7;

  const selectRating = (selectedRating: number) => {
    onChange(category, selectedRating);
  };

  return (
    <div>
    <div className="flex gap-5">
      <TbFeatherOff onClick={() => selectRating(0)} />
      <div className="flex">
        {Array.from({ length: ratingScale }).map((_, rating) => (
          <RatingIcon
            key={rating}
            isActive={rating < currentRating}
            onClick={() => selectRating(rating + 1)}
          />
        ))}
      </div>

      <RatingIcon
          isActive={ratingScale + 1 == currentRating}
        onClick={() => selectRating(ratingScale + 1)}
        className="text-amber-400"
      />
    </div>
    </div>
  );
}

type Props = {
  isActive: boolean;
} & ComponentProps<"div">;

function RatingIcon({ isActive, ...props }: Props) {
  return (
    <div {...props}>{isActive ? <PiFeatherFill /> : <PiFeatherLight />}</div>
  );
}

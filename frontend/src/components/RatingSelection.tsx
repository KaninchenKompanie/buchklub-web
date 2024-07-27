import { ComponentProps, useState } from "react";
import { PiFeatherFill, PiFeatherLight } from "react-icons/pi";

export default function RatingSelection() {
  const ratingScale = 7;
  const [rating, setRating] = useState(0);

  const selectRating = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex">
      {Array.from({ length: ratingScale }).map((_, index) => (
        <RatingIcon
          key={index}
          isActive={index < rating}
          onClick={() => selectRating(index + 1)}
        />
      ))}
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

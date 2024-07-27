import { ComponentProps, useState } from "react";
import { PiFeatherFill, PiFeatherLight } from "react-icons/pi";
import { TbFeatherOff } from "react-icons/tb";

export default function RatingSelection() {
  const ratingScale = 7;
  const [rating, setRating] = useState(0);

  const selectRating = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex gap-5">
      <TbFeatherOff onClick={() => selectRating(0)} />
      <div className="flex">
        {Array.from({ length: ratingScale }).map((_, index) => (
          <RatingIcon
            key={index}
            isActive={index < rating}
            onClick={() => selectRating(index + 1)}
          />
        ))}
      </div>

      <RatingIcon
        isActive={ratingScale + 1 == rating}
        onClick={() => selectRating(ratingScale + 1)}
        className="text-amber-400"
      />
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

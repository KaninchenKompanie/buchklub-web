import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import RatingIcon from "./RatingIcon";

type RatingProps = {
  rating: number;
} & ComponentProps<"div">;

export default function RatingDisplay({
  rating,
  className,
  ...props
}: RatingProps) {
  const ratingIcons = getRatingIconsBasedOnRating(rating);

  return (
    <div {...props} className={cn("flex gap-1", className)}>
      {ratingIcons}
    </div>
  );
}

function getRatingIconsBasedOnRating(rating: number) {
  let ratingIcons = [];
  for (let i = 0; i < rating; i++) {
    ratingIcons.push(<RatingIcon filled={true} key={i} />);
  }
  return ratingIcons;
}

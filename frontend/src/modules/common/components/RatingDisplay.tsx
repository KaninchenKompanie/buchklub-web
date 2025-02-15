import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import RatingIcon from "./RatingIcon";

type RatingProps = {
  rating?: number;
  numberOfReviews: number;
} & ComponentProps<"div">;

export default function RatingDisplay({
  rating = 0,
  numberOfReviews,
  className,
  ...props
}: RatingProps) {
  if (!rating) return "-";

  const ratingIcons = getRatingIconsBasedOnRating(rating);
  return (
    <div {...props} className={cn("flex gap-1 items-center", className)}>
      {ratingIcons}{" "}
      <Badge className="ml-2" variant="outline">
        {numberOfReviews}
      </Badge>
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

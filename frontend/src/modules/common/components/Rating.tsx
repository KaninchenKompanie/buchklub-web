import { ComponentProps } from "react";
import { GiFeather } from "react-icons/gi";

type RatingProps = {
  value: number;
} & ComponentProps<"div">;

export default function Rating({ value, ...props }: RatingProps) {
  let rating = [];
  for (let i = 0; i < value; i++) {
    rating.push(<GiFeather key={i} />);
  }

  return <div {...props}>{rating}</div>;
}

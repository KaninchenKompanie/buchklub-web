import { GiFeather } from "react-icons/gi";

type RatingProps = {
  value: number;
};

export default function Rating(props: RatingProps) {
  let rating = [];
  for (let i = 0; i < props.value; i++) {
    rating.push(<GiFeather className="text-pink-400" />);
  }

  return <div className="flex flex-row">{rating}</div>;
}

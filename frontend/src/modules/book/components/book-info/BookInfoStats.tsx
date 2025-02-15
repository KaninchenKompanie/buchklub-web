import { BookStatMeta } from "../../configurations/types";

type BookInfoStatsProps = {
  stats?: BookStatMeta;
};

export default function BookInfoStats({ stats }: BookInfoStatsProps) {
  if (!stats) return <></>;
  return (
    <p>
      {Math.round(stats.recommendPercentage)}% der LeserInnen empfehlen dieses
      Buch weiter.
    </p>
  );
}

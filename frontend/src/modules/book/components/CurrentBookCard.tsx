import { Card, CardContent } from "@/components/ui/card";

type Props = {};

export default function CurrentBookCard({}: Props) {
  return (
    <Card className="size-max">
      <CardContent className="flex flex-col py-10">
        <span>Aktuelles Buch</span>
        <span className="text-5xl">The Witcher</span>
      </CardContent>
    </Card>
  );
}

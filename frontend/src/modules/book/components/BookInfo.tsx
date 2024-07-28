import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Book } from "../configurations/types";
import Rating from "@/modules/common/components/Rating";
import AverageRatingCategoryBook from "./AverageRatingCategoryBook";
import Review from "./Review";
import { Badge } from "@/components/ui/badge";

type BookInfoProps = {
  book?: Book;
};

export default function BookInfo({ book }: BookInfoProps) {
  if (!book) return <div>error</div>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Info</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{book?.name}</SheetTitle>
            <span className="py-2">{book.author} [{book.year}]</span>
            <Badge className="py-2 w-max">GENRE</Badge>
            <span className="flex flex-col gap-1 py-2">
              <span className="font-bold">Beschreibung</span>
              <span>{book.description}</span>
            </span>
          <SheetDescription></SheetDescription> 
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 py-2 text-2xl">
            <Rating value={book.rating ?? 0} className="flex" />
          </div>
          <AverageRatingCategoryBook id={0} />
          <p>XX% der LeserInnen empfehlen dieses Buch weiter.</p>
          <div>
            <p className="font-bold text-lg py-2">Rezensionen</p>
            <Review
              userName="Denise"
              ratingAvg={5}
              ratingCategories={{
                setting: 2,
                plot: 5,
                engagement: 1,
                characters: 6,
                style: 1,
              }}
              comment="hat mir gut gefallen"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

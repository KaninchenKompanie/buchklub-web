import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RatingDisplay from "@/modules/common/components/RatingDisplay";
import { Book, BookReviews, BookStatMeta } from "../../configurations/types";
import AverageRatingCategoryBook from "../AverageRatingCategoryBook";
import BookInfoReviews from "./BookInfoReviews";
import BookInfoStats from "./BookInfoStats";

type BookInfoProps = {
  book?: Book;
  reviews: BookReviews[];
  stats?: BookStatMeta;
};

export default function BookInfo({ book, reviews, stats }: BookInfoProps) {
  if (!book) return <div>error</div>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Info</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{book?.name}</SheetTitle>
          <span className="py-2">
            {book.author} [{book.year}]
          </span>
          <div>
            <Badge>{book.genre}</Badge>
          </div>
          <span className="flex flex-col gap-1 py-2">
            <span className="font-bold">Beschreibung</span>
            <span>{book.description}</span>
          </span>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 py-2 text-2xl">
            <RatingDisplay
              rating={book.rating}
              numberOfReviews={reviews?.length}
            />
          </div>
          <AverageRatingCategoryBook id={book.id} />
          <BookInfoStats stats={stats} />
          <BookInfoReviews reviews={reviews} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

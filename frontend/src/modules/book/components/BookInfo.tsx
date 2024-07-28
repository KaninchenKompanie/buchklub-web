import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Book, BookReviews } from "../configurations/types";
import Rating from "@/modules/common/components/Rating";
import AverageRatingCategoryBook from "./AverageRatingCategoryBook";
import Review from "./Review";
import { Badge } from "@/components/ui/badge";
import { useReviews } from "../hooks/useReviews";
import { useEffect, useState } from "react";
import useBooksStats from "../hooks/useBooksStats";

type BookInfoProps = {
  book?: Book;
};

export default function BookInfo({ book }: BookInfoProps) {
  if (!book) return <div>error</div>;

  const { reviews, isLoading, isError } = useReviews();
  const [bookReviews, setBookReviews] = useState<BookReviews[]>([]);
  const { booksStats } = useBooksStats();
  const stats = booksStats?.bookStats.find(item => item.bookId == book.id);  

  useEffect(() => {
    setBookReviews(reviews.filter((item) => item.bookId == book.id));
  }, [reviews]);

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
          <Badge className="py-2 w-max">GENRE</Badge>
          <span className="flex flex-col gap-1 py-2">
            <span className="font-bold">Beschreibung</span>
            <span>{book.description}</span>
          </span>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 py-2 text-2xl">
            <Rating value={book.rating ?? 1} className="flex" />
          </div>
          <AverageRatingCategoryBook id={book.id} />
          <p>{stats?.recommendPercentage}% der LeserInnen empfehlen dieses Buch weiter.</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg py-2">Rezensionen</p>
            {isLoading && <div>Kommentare werden geladen</div>}
            {isError && <div>Ein Fehler ist aufgetreten.</div>}
            {bookReviews.map((review, index) => (
              <Review
                key={index}
                userName={review.userId.toString()}
                ratingAvg={1}
                ratingCategories={{
                  setting: review.setting,
                  plot: review.plot,
                  engagement: review.engagement,
                  characters: review.characters,
                  style: review.style,
                }}
                comment={review.comment}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

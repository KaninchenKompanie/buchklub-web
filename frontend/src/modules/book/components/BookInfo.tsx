import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Book } from "../configurations/types";
import RecommendationDistribution from "./RecommendationDistribution";
import AverageRatingCategory from "./AverageRatingCategory";
import { Badge } from "@/components/ui/badge";
import Rating from "@/modules/common/components/Rating";
import AverageRatingCategoryBook from "./AverageRatingCategoryBook";
import Review from "./Review";

type BookInfoProps = {
  id: number;
};

export default function BookInfo(props: BookInfoProps) {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    // fetch(`http://127.0.0.1:8000/book/${props.id}`)
    //   .then((response) => response.json())
    //   .then((catalogue) => setBook(catalogue))
    //   .catch((error) => console.error(error));
    setBook({
      id: 0,
      name: "Harry Potter und der Stein der Weisen",
      author: "J. K. Rowling",
      rating: 7,
      year: 1997,
      genre: ["fantasy", "mystery"],
      description:
        "„Harry Potter und der Stein der Weisen“ ist der erste Band der Harry Potter Reihe. Es handelt von einem Jungen der bei seiner Tante, Onkel und Cousin auf gewachsen ist. Als Harry 11 Jahre alt wurde erfuhr er, dass er von Zauberern abstammt und selbst einer ist. Er soll nach Hogwarts (einer Zauberer Schule) gehen.",
    });
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Info</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{book?.name}</SheetTitle>
          <SheetDescription>
            <div className="py-2">
              {book?.author} [{book?.year}]<br />
            </div>
            <div className="flex gap-2 py-2">
              {book?.genre?.map((genre, index) => (
                <Badge key={index}>{genre}</Badge>
              ))}
            </div>
            <div className="flex flex-col py-2">
              <div className="font-bold">Beschreibung</div>
              <p>{book?.description}</p>
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 py-2 text-2xl">
            <Rating value={book?.rating ?? 0} className="flex" />
          </div>
          <AverageRatingCategoryBook id={0} />
          <p>XX% der LeserInnen empfehlen dieses Buch weiter.</p>
          <div>
            <p className="font-bold text-lg py-2">Rezensionen</p>
            <Review />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

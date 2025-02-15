import { Textarea } from "@/components/ui/textarea";
import AdvButton from "@/components/wrapper/AdvButton";
import useCurrentUser from "@/modules/user/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  Book,
  BookRatingBasic,
  CreateBookReview,
} from "../../configurations/types";
import useCreateBookReview from "../../hooks/useCreateBookReview";
import { useReviews } from "../../hooks/useReviews";
import RateBookCategories from "./RateBookCategories";
import RateBookRecommendation from "./RateBookRecommendation";

export default function RateBook({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<BookRatingBasic>(getInitialRating());
  const [recommendation, setRecommendation] = useState<boolean>(false);
  const [comment, setComment] = useState("");

  const { user } = useCurrentUser();
  const { reviews, isLoading } = useReviews();
  const {
    mutate: createBookReview,
    isPending,
    isSuccess,
    isError,
  } = useCreateBookReview();

  useEffect(() => {
    if (isSuccess || isError) {
      setOpen(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (existingReview) {
      console.log(existingReview);
      setRating({
        plot: existingReview.plot,
        characters: existingReview.characters,
        setting: existingReview.setting,
        engagement: existingReview.engagement,
        style: existingReview.style,
      });
      setComment(existingReview.comment);
      setRecommendation(existingReview.recommend);
    }
  }, [reviews]);

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const onSubmit = () => {
    const review: CreateBookReview = {
      bookId: book.id,
      userId: user.id,
      ...rating,
      recommend: recommendation,
      comment: comment,
    };
    createBookReview(review);
    handleResetFields();
  };

  const handleResetFields = () => {
    setRating(getInitialRating());
    setComment("");
    setRecommendation(false);
  };

  const existingReview = reviews.find(
    (review) => review.bookId === book.id && review.userId === user.id
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Bewerten</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buch bewerten</DialogTitle>
          <DialogDescription>
            Bewertung für {book.name} von {book.author}
          </DialogDescription>
          {existingReview && <p>Du hast dieses Buch schon einmal bewertet. </p>}
        </DialogHeader>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <RateBookCategories rating={rating} updateRating={setRating} />
            <RateBookRecommendation
              onRecommendationChange={setRecommendation}
            />
            <Textarea
              placeholder="Type your comment here."
              onChange={(e) => handleCommentChange(e.target.value)}
              className="mt-4"
            />
          </div>
        )}
        <DialogFooter>
          <AdvButton
            type="submit"
            onClick={onSubmit}
            loading={isPending}
            disabled={isPending}
          >
            Speichern
          </AdvButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getInitialRating() {
  return {
    setting: 0,
    plot: 0,
    engagement: 0,
    characters: 0,
    style: 0,
  };
}

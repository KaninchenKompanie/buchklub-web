import { ReactNode } from "react";
import { BookReviews } from "../../configurations/types";
import Review from "../review/Review";

type BookInfoReviewsProps = {
  reviews?: BookReviews[];
};

export default function BookInfoReviews({ reviews }: BookInfoReviewsProps) {
  if (!reviews)
    return (
      <Layout>
        <p>Noch keine Kommentare vorhanden</p>
      </Layout>
    );

  return (
    <Layout>
      {reviews.map((review, index) => (
        <Review
          key={index}
          userId={review.userId}
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
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-lg py-2">Rezensionen</p>
      {children}
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import RatingSelection from "../../common/components/RatingSelection";
import {
  BookCategory,
  BookRatingBasic,
  CreateBookReview,
} from "../configurations/types";
import { useState } from "react";
import { submitReview } from "../api";

const bookRatingCategoryData: {
  title: string;
  description: string;
  key: BookCategory;
}[] = [
  { key: "setting", title: "Setting", description: "" },
  { key: "plot", title: "Plot", description: "" },
  { key: "engagement", title: "Engagement", description: "" },
  { key: "characters", title: "Characters", description: "" },
  { key: "style", title: "Style", description: "" },
];

export default function RateBook({ id }: { id: number }) {
  const [rating, setRating] = useState<BookRatingBasic>({
    setting: 0,
    plot: 0,
    engagement: 0,
    characters: 0,
    style: 0,
  });
  const [recommendation, setRecommendation] = useState<boolean>(false);

  const handleRatingChange = (category: BookCategory, value: number) => {
    setRating((prevRating) => ({
      ...prevRating,
      [category]: value,
    }));
    console.log("hallo");
  };

  const handleRecommendationChange = (value: string) => {
    console.log(value);
    if (value === "yes") {
      setRecommendation(true);
    } else if (value === "no") {
      setRecommendation(false);
    }
  };

  const onSubmit = () => {
    //TODO: this can not be submitted yet
    const review: CreateBookReview = {
      bookId: id,
      userId: 0, //TODO: get user id! where??
      ...rating,
      recommend: recommendation,
      comment: "",
    };
    submitReview(review);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bewerten</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buch bewerten</DialogTitle>
          <DialogDescription>
            Bewertung für BUCHNAME von AUTOR
          </DialogDescription>
        </DialogHeader>
        <div>
          {bookRatingCategoryData.map((categoryData) => (
            <div className="mb-4" key={categoryData.key}>
              <div className="text-lg font-semibold">{categoryData.title}</div>
              <p className="pb-2">{categoryData.description}</p>
              <RatingSelection
                currentRating={rating[categoryData.key]}
                onSelectRating={(rating) =>
                  
                  handleRatingChange(categoryData.key, rating)
                }
              />
            </div>
          ))}
          <div>
            <div className="text-lg font-semibold pb-2">
              Würdest du das Buch weiterempfehlen?
            </div>
            <RadioGroup
              className="flex"
              onValueChange={handleRecommendationChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r2" />
                <Label htmlFor="r2">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r1" />
                <Label htmlFor="r1">Nein</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

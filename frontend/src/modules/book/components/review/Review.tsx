import { Card, CardContent } from "@/components/ui/card";
import { BiWorld } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { RiBook2Fill } from "react-icons/ri";

import RatingDisplay from "@/modules/common/components/RatingDisplay";
import useUser from "@/modules/user/hooks/useUser";
import { BookCategoryRecord } from "../../configurations/constants";
import CategoryRating from "./CategoryRating";

type ReviewProps = {
  ratingAvg: number;
  ratingCategories: {
    setting: number;
    plot: number;
    engagement: number;
    characters: number;
    style: number;
  };
  userId: number;
  comment: string;
};

export default function Review({
  ratingAvg,
  ratingCategories,
  userId,
  comment,
}: ReviewProps) {
  const { user } = useUser(userId);
  return (
    <Card>
      <CardContent className="py-4">
        <p className="font-bold">{user ? user.name : "Deine mUtter"}</p>
        <div className="flex py-2 gap-8 items-center">
          <RatingDisplay rating={ratingAvg} className="flex" />
          <div className="flex gap-4">
            <CategoryRating
              rating={ratingCategories.setting}
              icon={<BiWorld />}
              tooltipContent={BookCategoryRecord.setting.label}
            />
            <CategoryRating
              rating={ratingCategories.plot}
              icon={<RiBook2Fill />}
              tooltipContent={BookCategoryRecord.plot.label}
            />
            <CategoryRating
              rating={ratingCategories.engagement}
              icon={<BsStars />}
              tooltipContent={BookCategoryRecord.engagement.label}
            />
            <CategoryRating
              rating={ratingCategories.characters}
              icon={<IoPerson />}
              tooltipContent={BookCategoryRecord.characters.label}
            />
            <CategoryRating
              rating={ratingCategories.style}
              icon={<FaPenNib />}
              tooltipContent={BookCategoryRecord.style.label}
            />
          </div>
        </div>
        <p>{comment}</p>
      </CardContent>
    </Card>
  );
}

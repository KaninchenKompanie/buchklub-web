import { Card, CardContent } from "@/components/ui/card";
import { FaPenNib } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { RiBook2Fill } from "react-icons/ri";

import ToolTip from "@/modules/common/components/ToolTip";
import Rating from "@/modules/common/components/Rating";

type ReviewProps = {
  ratingAvg: number;
  ratingCategories: { setting: number; plot: number; engagement: number; characters: number; style: number };
  userName: string;
  comment: string;
};

export default function Review({ ratingAvg, ratingCategories, userName, comment } : ReviewProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="font-bold">{userName}</p>
        <div className="flex py-2 gap-8 items-center">
          <Rating value={ratingAvg} className="flex" />
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <ToolTip content="Setting">
                <BiWorld />
              </ToolTip>
              <p>{ratingCategories.setting}</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Plot">
                <RiBook2Fill />
              </ToolTip>
              <p>{ratingCategories.plot}</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Engagement">
                <BsStars />
              </ToolTip>
              <p>3</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Characters">
                <IoPerson />
              </ToolTip>
              <p>{ratingCategories.characters}</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Style">
                <FaPenNib />
              </ToolTip>
              <p>{ratingCategories.style}</p>
            </div>
          </div>
        </div>
        <p>{comment}</p>
      </CardContent>
    </Card>
  );
}

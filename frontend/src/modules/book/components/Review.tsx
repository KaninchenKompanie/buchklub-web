import { Card, CardContent } from "@/components/ui/card";
import { FaPenNib } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { RiBook2Fill } from "react-icons/ri";

import ToolTip from "@/modules/common/components/ToolTip";
import Rating from "@/modules/common/components/Rating";

type Props = {};

export default function Review({}: Props) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="font-bold">Username</p>
        <div className="flex py-2 gap-8 items-center">
          <Rating value={7} className="flex" />
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <ToolTip content="Setting">
                <BiWorld />
              </ToolTip>
              <p>3</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Plot">
                <RiBook2Fill />
              </ToolTip>
              <p>3</p>
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
              <p>3</p>
            </div>
            <div className="flex gap-1 items-center">
              <ToolTip content="Style">
                <FaPenNib />
              </ToolTip>
              <p>3</p>
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </p>
      </CardContent>
    </Card>
  );
}

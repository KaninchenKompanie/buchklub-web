import ToolTip from "@/modules/common/components/ToolTip";
import { ReactNode } from "react";

type CategoryRatingProps = {
    rating: number;
    tooltipContent: string;
    icon: ReactNode;
}

export default function CategoryRating({ rating, tooltipContent, icon }: CategoryRatingProps) {
    return (
        <div className="flex gap-1 items-center">
            <ToolTip content={tooltipContent}>
                {icon}
            </ToolTip>
            <p>{rating}</p>
        </div>
    )
}
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

type ToolTipProps = {
    children: React.ReactNode;
    content: string;
};

export default function ToolTip({ content, children }: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            { children }
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{ content }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

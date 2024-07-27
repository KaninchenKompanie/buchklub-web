import React, {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
} from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AdvButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  loading?: boolean;
}

const AdvButton = React.forwardRef<ComponentRef<typeof Button>, AdvButtonProps>(
  (
    { loading, leftElement, rightElement, children, className, ...buttonProps },
    ref
  ) => (
    <Button
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...buttonProps}
    >
      {(leftElement || loading) && (
        <span>
          {loading ? <ReloadIcon className="animate-spin" /> : leftElement}
        </span>
      )}
      {children}
      {rightElement && <span>{rightElement}</span>}
    </Button>
  )
);

AdvButton.displayName = "AdvButton";

export default AdvButton;

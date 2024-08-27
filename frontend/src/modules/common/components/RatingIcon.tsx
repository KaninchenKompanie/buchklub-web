import { ComponentProps } from "react";
import { PiFeatherFill, PiFeatherLight } from "react-icons/pi";

type Props = {
  filled?: boolean;
} & ComponentProps<typeof PiFeatherFill | typeof PiFeatherLight>;

export default function RatingIcon({ filled, ...props }: Props) {
  return filled ? <PiFeatherFill {...props} /> : <PiFeatherLight {...props} />;
}

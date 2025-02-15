import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RateBookRecommendationProps = {
  onRecommendationChange: (value: boolean) => void;
};

export default function RateBookRecommendation(
  props: RateBookRecommendationProps
) {
  const handleRecommendationChange = (value: string) => {
    props.onRecommendationChange(value === "yes");
  };
  return (
    <div>
      <div className="text-lg font-semibold mb-2">
        Würdest du das Buch weiterempfehlen?
      </div>
      <RadioGroup className="flex" onValueChange={handleRecommendationChange}>
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
  );
}

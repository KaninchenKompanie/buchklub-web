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

export default function RateBook() {
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
          <div className="mb-4">
            <div className="text-lg font-semibold">Setting</div>
            <p className="pb-2">
              This includes world-building, lore, atmosphere, etc.
            </p>
            <RatingSelection />
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Plot</div>
            <p className="pb-2">
              This includes structure, arcs, pacing, climax, tension,
              resolution, hooks, etc.
            </p>
            <RatingSelection />
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Engagement</div>
            <p className="pb-2">
              This includes immersion, enjoyment, themes, genre, tropes, etc.
            </p>
            <RatingSelection />
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Characters</div>
            <p className="pb-2">
              This includes development, relatability, depth, dynamics, arcs,
              etc.
            </p>
            <RatingSelection />
          </div>
          <div className="mb-4">
            <div className="text-lg font-semibold">Style</div>
            <p className="pb-2">
              This includes writing, voice, point of view, narrator, etc.
            </p>
            <RatingSelection />
          </div>
          <div>
            <div className="text-lg font-semibold pb-2">
              Würdest du das Buch weiterempfehlen?
            </div>
            <RadioGroup className="flex">
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
          <Button type="submit">Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

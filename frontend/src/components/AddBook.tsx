import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function AddBook() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> Add Book </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>extend catalogue</DialogTitle>
                    <DialogDescription>
                        Your shelf is empty!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4" >
                    <Label htmlFor="name" className="text-right"> Name</Label>
                </div>
            </DialogContent>
        </Dialog>
    )
}
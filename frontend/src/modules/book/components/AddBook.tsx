import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "../../../components/ui/badge";
import { ReactElement} from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
    FormDescription,
} from "../../../components/ui/form.tsx";
import { bookSchema } from "../configurations/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function AddBook() {

    const bookForm = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            name: ""
        }
    });

    function onSubmit(values: z.infer<typeof bookSchema>) {
        console.log(values);
        console.log('hallo');
    }

    // const inputFields = () => {
    //     <div className="grid gap-3 pt-3 pb-3">
    //         <Label
    //             htmlFor="name"
    //             className="text-left font-sans font-semibold text-xl pb-1">
    //             Name des Buches
    //         </Label>
    //         <Input id="name" value={book.name} onChange={e => setBook(
    //             {
    //                 ...book,
    //                 name: e.target.value
    //             })
    //         } />
    //     </div>
    // };

    const showGenres = () => {
        let genres = [
            "Fantasy",
            "Science Fiction",
            "Krimi",
            "Thriller",
            "Liebesroman",
            "Historischer Roman",
            "Gesellschaftsroman",
            "Entwicklungsroman",
            "Kinderbuch",
            "Theaterstück",
            "Sachbuch",
            "Fachbuch"
        ];
        let genreBadges: ReactElement[] = [];
        genres.forEach((genre) => {
            genreBadges.push(
                <Badge className="py-1 px-3 m-1 justify-center text-base font-serif italic font-light">
                    {genre}
                </Badge>
            );
        });
        return (
            <div className="flex-col">{genreBadges}</div>
        );
    };
    return (
        <Dialog>
            <Form {...bookForm}>
                <form onSubmit={bookForm.handleSubmit(onSubmit)}>
                    <DialogTrigger asChild>
                        <Button> Add Book </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Erweitere die Bibliothek um ein Buch!
                            </DialogTitle>
                        </DialogHeader>
                        <FormField control={bookForm.control} name="name" render={({field}) => (
                            <FormItem className="grid gap-3 pt-3 pb-3">
                                <FormLabel
                                    className="text-left font-sans font-semibold text-xl pb-1">
                                    Name des Buches
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Buch hinzufügen</Button>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>);
}
{/* <div className="grid gap-3 pb-3">
                    <Label
                        htmlFor="author"
                        className="text-left font-sans font-semibold text-xl pb-1">
                        Autor
                    </Label>
                    <Input id="author" value={book.author} onChange={e => setBook(
                        {
                            ...book,
                            author: e.target.value
                        })
                    } />
                </div> */}
{/* <div className="grid gap-3 pb-3">
                    <Label
                        htmlFor="year"
                        className="text-left font-sans font-semibold text-xl pb-1">
                        Jahr
                    </Label>
                    <Input id="year" value={book.year} onChange={e => setBook(
                        {
                            ...book,
                            year: e.target.value
                        })
                    } />
                </div> */}
{/* <div className="grid gap-3 pb-3">
                    <Label
                        htmlFor="genre"
                        className="text-left font-sans font-semibold text-xl pb-1">
                        Genre
                    </Label>
                    {showGenres()}
                </div>
                <div className="grid gap-3 pb-3">
                    <Label
                        htmlFor="description"
                        className="text-left font-sans font-semibold text-xl pb-1">
                        Beschreibung
                    </Label>
                    <Textarea id="description" />
                </div> */}


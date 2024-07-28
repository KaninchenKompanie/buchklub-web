import { Input } from "@/components/ui/input.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bookSchema } from "../configurations/schemas";
import { ReactElement } from "react";
import { Toggle } from "@/components/ui/toggle";

export default function AddBook() {

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      author: "",
      year: "",
      genre: [],
    },
  });

  function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log(values);
    console.log("hallo");
  }

  const inputFields = (name: any, label: string) => {
    return <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-3 pt-3 pb-3">
          <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
            {label}
          </FormLabel>
          <FormControl>
            <Input autoComplete="off" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  };

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
    return (
      <FormField
        control={form.control}
        name="genre"
        render={() => (
          <FormItem className="grid gap-3 pt-3 pb-3">
            <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
              Genres
            </FormLabel>
            <div className="flex-col">
            {genres.map((genre) => (
              <FormField
                key={genre}
                control={form.control}
                name="genre"
                render={({ field }) => {
                  return (
                    <Toggle
                      className="py-1 px-3 m-1 justify-center text-base font-serif italic font-light"
                      onClick={() => {
                        console.log(field)
                        let checked = field.value?.includes(genre)
                        console.log(checked)
                        if (checked){
                          return field.onChange(
                            field.value?.filter(
                              (value) => value !== genre
                            )
                          )}
                        else{
                          return field.onChange([...field.value, genre])}
                        
                      }}
                    >
                      { genre }
                    </Toggle>
                  )
                }}
              />
            ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Add Book </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Erweitere die Bibliothek um ein Buch!
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>

            {inputFields("name", "Buchtitel")}
            {inputFields("author", "Autor des Buches")}
            {inputFields("year", "Jahr der Veröffentlichung")}
            {showGenres()}


            <Button className="mt-8" type="submit">Buch hinzufügen</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea";
import AdvButton from "@/components/wrapper/AdvButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookSchema } from "../../configurations/schemas";
import { CreateBook } from "../../configurations/types";
import useCreateBook from "../../hooks/useCreateBook";
import GenreFormField from "./GenreFormField";
import TextFormField from "./TextFormField";

export type AddBookFormSchema = z.infer<typeof bookSchema>;

export default function AddBook() {
  const { mutate: createBook, isPending } = useCreateBook();

  const form = useForm<AddBookFormSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "grosser Prinz",
      author: "Döner",
      year: 2021,
      genre: [],
      description: "Ein Buch über einen grossen Prinzen",
    },
  });

  function onSubmit(values: AddBookFormSchema) {
    let book: CreateBook = {
      name: values.name,
      author: values.author,
      year: values.year,
      genre: values.genre,
      description: values.description,
    };
    createBook(book);
  }

  const inputFields = (name: any, label: string, props?: any) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="grid gap-1 pt-3 pb-3">
            <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
              {label}
            </FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} {...props} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const textFields = () => {
    return (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="grid gap-1 pt-3 pb-3">
            <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
              Beschreibung des Buches
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
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
            <TextFormField form={form} name="name" label="Buchtitel" />
            <TextFormField form={form} name="author" label="Autor des Buches" />
            <TextFormField
              form={form}
              name="year"
              label="Jahr der Veröffentlichung"
            />
            <GenreFormField form={form} />
            {textFields()}
            <DialogClose asChild>
              <AdvButton loading={isPending} className="mt-8" type="submit">
                Buch hinzufügen
              </AdvButton>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

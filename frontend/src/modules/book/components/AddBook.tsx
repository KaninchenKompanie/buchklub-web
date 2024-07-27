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

export default function AddBook() {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookSchema>) {
    console.log(values);
    console.log("hallo");
  }

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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-3 pt-3 pb-3">
                  <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
                    Name des Buches
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buch hinzufügen</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

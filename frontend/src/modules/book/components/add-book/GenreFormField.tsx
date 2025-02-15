import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Toggle } from "@radix-ui/react-toggle";
import { UseFormReturn } from "react-hook-form";
import { GenreRecord } from "../../configurations/constants";
import { Genre } from "../../configurations/types";
import { AddBookFormSchema } from "./AddBook";

type GenreFormFieldProps = {
  form: UseFormReturn<AddBookFormSchema, any, undefined>;
};

export default function GenreFormField({ form }: GenreFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="genre"
      render={() => (
        <FormItem className="grid gap-1 pt-3 pb-3">
          <FormLabel className="text-left font-sans font-semibold text-xl pb-1">
            Genres
          </FormLabel>
          <div className="flex-col">
            {(Object.keys(GenreRecord) as Genre[]).map((genre) => (
              // TODO: FormField innerhalb von FormField?
              <FormField
                key={genre}
                control={form.control}
                name="genre"
                render={({ field }) => {
                  let checked = field.value?.includes(genre);
                  console.log(GenreRecord[genre].color);
                  return (
                    <Toggle
                      className={cn(
                        "py-1 px-3 m-1 justify-center text-base font-serif italic font-light border"
                      )}
                      style={
                        checked ? { borderColor: GenreRecord[genre].color } : {}
                      }
                      onClick={() => {
                        if (checked) {
                          return field.onChange(
                            field.value?.filter((value) => value !== genre)
                          );
                        } else {
                          return field.onChange([...field.value, genre]);
                        }
                      }}
                    >
                      {GenreRecord[genre].label}
                    </Toggle>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

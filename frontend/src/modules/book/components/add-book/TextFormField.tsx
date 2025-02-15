import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { AddBookFormSchema } from "./AddBook";

type TextFormFieldProps<T extends AddBookFormSchema = AddBookFormSchema> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  inputProps?: ComponentProps<typeof Input>;
};

function TextFormField({ form, name, label, inputProps }: TextFormFieldProps) {
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
            <Input autoComplete="off" {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextFormField;

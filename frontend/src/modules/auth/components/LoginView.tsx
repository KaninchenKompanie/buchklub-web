import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { GiSelfLove } from "react-icons/gi";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./AuthContext";
import AdvButton from "@/components/wrapper/AdvButton";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please provide your username" })
    .max(50),
  password: z
    .string()
    .min(1, { message: "Please provide your password" })
    .max(50),
});

export default function LoginView() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleLogin, isWaiting } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleLogin({ name: values.username, password: values.password });
  }

  return (
    <div
      className={
        "h-[100vh] w-full flex flex-col items-center justify-center gap-5"
      }
    >
      <div className={"text-4xl flex gap-4 font-extrabold"}>
        <GiSelfLove /> Welcome back! You are awesome <GiSelfLove />
      </div>
      <div className={"text-blue-500 text-foreground/80 text-center"}>
        Sign in to share your book ideas and enjoy your time with amazing
        people!
        <br />
        Please do not insult people, just teach them.
      </div>
      <Card className="w-[350px] mt-8 bg-card/50 border-border/75">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Use the credentials you've been given. If you do not have one,
                please contact the admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <AdvButton loading={isWaiting} type="submit">
                Login
              </AdvButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

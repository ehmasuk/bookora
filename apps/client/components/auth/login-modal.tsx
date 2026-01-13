import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/useAuth";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { CommingSoon } from "../global/CommingSoon";

const LoginModal = ({ children }: { children: React.ReactNode }) => {
  const { handleLogin, loading } = useAuth();

  const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).max(50, { message: "Email is too long" }).email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleLogin(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="to-card bg-linear-to-b from-sky-100 to-40% bg-size-[100%_101%] sm:max-w-sm dark:from-sky-900">
        <DialogHeader className="items-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-sky-600/10 sm:mx-0 dark:bg-sky-400/10">
            <LogInIcon className="size-6 text-sky-600 dark:text-sky-400" />
          </div>
          <DialogTitle>Sign in with email</DialogTitle>
          <DialogDescription className="text-center">Make a new doc to bring your words, data and teams together. For free.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-3 space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-3 space-y-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="space-y-2 pt-4 sm:flex-col">
              <Button type="submit" loading={loading}>
                Get Started
              </Button>
              <div className="before:bg-border after:bg-border flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1">
                <span className="text-muted-foreground text-xs">Or</span>
              </div>
              <CommingSoon>
                <Button type="button" variant="outline">
                  <IconBrandGoogleFilled />
                  Continue with Google
                </Button>
              </CommingSoon>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

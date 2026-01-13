"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";

import { BorderBeam } from "@/components/magicui/border-beam";
import BackgroundMeteors from "@workspace/ui/components/backgroundmeteors";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import usePost from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function RegisterPage() {
  const t = useTranslations("registerpage");

  const { postData, loading } = usePost();

  const router = useRouter();

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be minimum 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password Must be 8 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postData({
      url: "/auth/register",
      data: values,
      onSuccess: () => {
        signIn("credentials", { ...values, redirect: false });
        toast.success("Registered successfully");
        router.push("/profile");
      },
      onError: (err) => {
        toast.error(err);
      },
    });
  }

  return (
    <BackgroundMeteors>
      <main className="flex-1 flex min-h-screen items-center justify-center py-20 p-4 sm:p-8">
        <Card className="w-full max-w-md dark:bg-slate-800 relative">
          <BorderBeam duration={8} size={100} />
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
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
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          minLength={8}
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full"
                  loading={loading}
                >
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t("footer.text")}{" "}
              <Link href="/login" className="text-[#0070F3] hover:underline">
                {t("footer.link")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </BackgroundMeteors>
  );
}

export default RegisterPage;

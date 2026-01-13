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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackgroundMeteors from "@workspace/ui/components/backgroundmeteors";

export default function LoginPage() {
  const t = useTranslations("loginpage");

  const { handleLogin, loading } = useAuth();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .max(50, { message: "Email is too long" })
      .email({ message: "Invalid email" }),
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
    <BackgroundMeteors>
      <main className="flex-1 flex items-center justify-center min-h-screen sm:p-8">
        <Card className="w-full max-w-md relative dark:bg-slate-800">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
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
                        <Input placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  loading={loading}
                  variant="primary"
                  type="submit"
                  className="w-full"
                >
                  {t("submit")}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t("footer.text")}{" "}
              <Link href="/register" className="text-[#0070F3] hover:underline">
                {t("footer.link")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </BackgroundMeteors>
  );
}

"use client";

import setCookie from "@/actions/set-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";
import { Check, Globe, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function LanguageModal({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeLanguage = (val: string) => {
    setCookie("LANGUAGE", val);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <Languages className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">
            Change Language
          </DialogTitle>
          <DialogDescription className="text-center">
            Select your preferred language for the interface.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group",
                currentLocale === lang.code
                  ? "border-primary shadow-sm ring-1 ring-primary"
                  : "bg-white border-slate-200 hover:border-primary/50 hover:bg-slate-50",
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p
                    className={cn(
                      "font-semibold",
                      currentLocale === lang.code
                        ? "text-primary"
                        : "text-slate-900",
                    )}
                  >
                    {lang.name}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    {lang.code}
                  </p>
                </div>
              </div>
              {currentLocale === lang.code && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-2">
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Bookora Multilingual Support
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import Step1 from "@/components/generate-book/step-1";
import Step2 from "@/components/generate-book/step-2";
import Step3 from "@/components/generate-book/step-3";
import Step4 from "@/components/generate-book/step-4";
import { Button } from "@workspace/ui/components/button";
import { ChevronLeft, Home, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          {step > 1 && (
            <Button
              variant="ghost"
              className="gap-2 pl-0 hover:bg-transparent hover:text-primary"
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Step content */}
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} />}
      {step === 3 && <Step3 setStep={setStep} />}
      {step === 4 && <Step4 />}
    </div>
  );
}

"use client";

import Step1 from "@/components/generate-book/step-1";
import Step2 from "@/components/generate-book/step-2";
import Step3 from "@/components/generate-book/step-3";
import Step4 from "@/components/generate-book/step-4";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Step content */}
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} />}
        {step === 3 && <Step3 setStep={setStep} />}
        {step === 4 && <Step4 setStep={setStep} />}
    </div>
  );
}

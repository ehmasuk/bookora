"use client";

import Step1 from "@/components/generate-book/step-1";
import Step2 from "@/components/generate-book/step-2";
import Step3 from "@/components/generate-book/step-3";
import Step4 from "@/components/generate-book/step-4";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Step indicator */}
      <div className="flex justify-between gap-4 text-sm font-medium mb-5">
        <div className={`flex-1 text-center py-2 rounded-md ${step === 1 ? "bg-primary text-white" : "bg-muted"}`}>Info</div>
        <div className={`flex-1 text-center py-2 rounded-md ${step === 2 ? "bg-primary text-white" : "bg-muted"}`}>Chapters</div>
        <div className={`flex-1 text-center py-2 rounded-md ${step === 3 ? "bg-primary text-white" : "bg-muted"}`}>Sections</div>
        <div className={`flex-1 text-center py-2 rounded-md ${step === 4 ? "bg-primary text-white" : "bg-muted"}`}>Review</div>
      </div>

      {/* Step content */}
      <div className="border rounded-lg p-6">
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} />}
        {step === 3 && <Step3 setStep={setStep} />}
        {step === 4 && <Step4 setStep={setStep} />}
      </div>
    </div>
  );
}

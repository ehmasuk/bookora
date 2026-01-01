import StepCard from "@/components/global/StepCard";
import { bookstepsEnglish, bookstepsFrench, bookstepsGerman, bookstepsSpanish } from "@/data/steps";
import { useLocale } from "next-intl";
import { NextStep, NextStepProvider } from "nextstepjs";
import React from "react";

function StepProvider({ children }: { children: React.ReactNode }) {
  const language = useLocale();

  const steps = language === "en" ? bookstepsEnglish : language === "es" ? bookstepsSpanish : language === "de" ? bookstepsGerman : language === "fr" ? bookstepsFrench : bookstepsEnglish;

  return (
    <NextStepProvider>
      <NextStep steps={steps} cardComponent={StepCard}>
        {children}
      </NextStep>
    </NextStepProvider>
  );
}

export default StepProvider;

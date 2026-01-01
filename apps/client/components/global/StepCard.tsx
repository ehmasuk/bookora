"use client";

import { Step } from "nextstepjs";
import React from "react";

interface StepCardProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour?: () => void;
  arrow: React.ReactNode;
}

const StepCard = ({ step, currentStep, totalSteps, nextStep, prevStep, skipTour, arrow }: StepCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-3xl rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-md">
      <div className="flex items-center gap-3 mb-4">
        {step.icon && step.icon}
        <h3 className="text-lg font-semibold text-black dark:text-white">{step.title}</h3>
      </div>

      <div className="mb-6 text-sm text-gray-800 dark:text-gray-300 leading-relaxed">{step.content}</div>

      {arrow}

      <div className="flex justify-between items-center">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {step.showSkip && (
          <button onClick={skipTour} className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium transition-colors duration-200">
            Skip
          </button>
        )}

        <div className="flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded text-sm font-medium transition-colors duration-200"
            >
              Previous
            </button>
          )}

          <button onClick={nextStep} className="px-4 py-2 bg-black dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors duration-200">
            {currentStep === totalSteps - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepCard;

import { useState } from 'react';

export function useFormStepper(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!steps || !Array.isArray(steps)) {
    throw new Error('useFormStepper needs steps arg');
  }

  const onChangeStep = (step) => {
    const nextStep = step ?? currentStep + 1;
    if (steps[nextStep]) {
      setCurrentStep(nextStep);
    }
  };

  return { currentStep, setCurrentStep, onChangeStep };
}

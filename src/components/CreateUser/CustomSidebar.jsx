import { StepperSection } from '@components/StepperSection/StepperSection';

export function CustomSidebar({ currentStep, steps }) {
  return (
    <div className="w-80 p-8 bg-gray-800 hidden lg:block flex flex-col">
      <h2 className="text-white text-3xl leading-9 font-medium mb-8">
        Crea un usuario
      </h2>

      {steps.map((step, idx) => (
        <StepperSection
          key={step.title}
          title={step.title}
          description={step.description}
          previous={currentStep > idx}
          current={currentStep === idx}
          next={currentStep < idx}
        />
      ))}
    </div>
  );
}

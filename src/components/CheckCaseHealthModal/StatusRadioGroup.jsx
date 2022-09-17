import classNames from 'classnames';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';

const states = ['SET_DIRTY', 'SET_AVAILABLE'];

const texts = {
  SET_DIRTY: {
    title: 'Necesita limpieza',
    description:
      'El case no se encuentra preparado para otro uso, necesita limpieza',
  },
  SET_AVAILABLE: {
    title: 'Listo para otro uso',
    description: 'El case está listo para otro uso sin pasar por limpieza',
  },
};

export function StatusRadioGroup({ value, onChange, error }) {
  return (
    <>
      <RadioGroup value={value} onChange={onChange}>
        <div className="space-y-2">
          {states.map((item) => (
            <RadioGroup.Option
              key={item}
              value={item}
              className={({ active, checked }) =>
                classNames(
                  'relative flex cursor-pointer rounded p-4 border border-gray-200 focus:outline-none',
                  {
                    'bg-sky-900 bg-opacity-75 text-white': checked,
                    'bg-white': !checked,
                    'ring-2 ring-red-500 ring-opacity-60 border-none':
                      error && error.message,
                  }
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="">
                        <RadioGroup.Label
                          as="p"
                          className={classNames('text-sm font-medium', {
                            'text-white': checked,
                            'text-gray-900': !checked,
                            'text-red-500': error,
                          })}
                        >
                          {texts[item].title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`text-xs inline ${
                            checked ? 'text-sky-100' : 'text-gray-500'
                          }`}
                        >
                          {texts[item].description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {error && error.message && (
        <span className="text-xs leading-5 font-normal text-red-500 mt-1.5">
          {error.message}
        </span>
      )}
    </>
  );
}

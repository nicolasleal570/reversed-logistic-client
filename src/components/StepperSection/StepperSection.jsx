import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/outline';

export function StepperSection({
  title,
  description,
  current,
  previous,
  next,
}) {
  return (
    <div className="w-full flex mb-8">
      <div
        className={classNames(
          'w-8 h-8 rounded-full flex justify-center items-center mr-4',
          {
            'bg-white border-2 border-white': current || previous,
            'bg-gray-900 border-2 border-white': next,
          }
        )}
      >
        {previous && <CheckIcon className="w-6 text-indigo-600" />}

        {(current || next) && (
          <div
            className={classNames('w-2.5 h-2.5 rounded-full', {
              'bg-indigo-600': current,
              'bg-white': next,
            })}
          />
        )}
      </div>

      <div className="flex-1">
        <p className="text-white text-base leading-6 font-medium mt-1 mb-0.5">
          {title}
        </p>
        {description && (
          <p className="text-gray-300 text-sm leading-5 font-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

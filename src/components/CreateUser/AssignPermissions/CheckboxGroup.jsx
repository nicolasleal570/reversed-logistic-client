/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/outline';

export const CheckboxGroup = forwardRef(
  ({ title, description, selected, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={classNames('block w-full p-4 rounded-md border', {
          'bg-white  border-gray-200': !selected,
          'bg-indigo-50 border-indigo-600': selected,
        })}
      >
        <p className="flex items-center justify-between mb-2">
          <span
            className={classNames('text-sm leading-5 font-medium', {
              'text-gray-700': !selected,
              'text-indigo-800': selected,
            })}
          >
            {title}
          </span>
          <span
            className={classNames(
              'flex items-center justify-center w-4 h-4 border rounded-full',
              {
                'bg-white border-gray-200': !selected,
                'bg-indigo-600 border-indigo-600': selected,
              }
            )}
          >
            {selected && <CheckIcon className="w-3 text-white" />}
          </span>
        </p>
        <p
          className={classNames('text-sm leading-5 font-normal', {
            'text-gray-500': !selected,
            'text-indigo-500': selected,
          })}
        >
          {description}
        </p>
        <input
          type="checkbox"
          className="hidden"
          id={id}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

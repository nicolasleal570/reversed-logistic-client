import { useState } from 'react';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/outline';
import { CheckboxGroup } from '@components/CreateUser/AssignPermissions/CheckboxGroup';

export function PermissionSectionUserForm({ control, info }) {
  const { title, description, fields } = info;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((oldSetIsOpen) => !oldSetIsOpen)}
        className="flex items-center justify-between w-full text-gray-700"
      >
        <p className="text-lg leading-7 font-medium">{title}</p>
        {isOpen ? (
          <MinusCircleIcon className="w-6" />
        ) : (
          <PlusCircleIcon className="w-6" />
        )}
      </button>

      {isOpen && (
        <>
          <p className="text-sm leading-5 font-normal text-gray-500 mb-3">
            {description}
          </p>

          <div className={classNames('grid grid-cols-2 gap-3')}>
            {fields.map((fieldInfo) => {
              return (
                <Controller
                  key={fieldInfo.name}
                  control={control}
                  name={fieldInfo.name}
                  render={({ field }) => {
                    return (
                      <CheckboxGroup
                        title={fieldInfo.title}
                        description={fieldInfo.description}
                        id={fieldInfo.name}
                        selected={field.value}
                        {...field}
                      />
                    );
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

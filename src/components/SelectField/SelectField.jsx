import classNames from 'classnames';

export function SelectField({
  name,
  placeholder,
  value,
  options,
  onChange,
  disabled,
  id,
  highlight,
  error: customError,
  errors,
  inputProps,
  highlightMsgProps,
  errorMsgProps,
}) {
  const error = (errors && errors[name]) ?? customError;

  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        className={classNames(
          'w-full',
          { 'border border-gray-300 text-gray-900': !error },
          { 'border border-red-300 text-red-500': error },
          'text-base leading-6 font-normal',
          'bg-white h-10 px-2.5 shadow-sm rounded-lg',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring focus:ring-indigo-300'
        )}
        {...inputProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {highlight && !error && (
        <span
          className="text-xs leading-5 font-normal text-gray-500 mt-1.5"
          {...highlightMsgProps}
        >
          {highlight}
        </span>
      )}
      {error && error.message && (
        <span
          className="text-xs leading-5 font-normal text-red-500 mt-1.5"
          {...errorMsgProps}
        >
          {error.message}
        </span>
      )}
    </>
  );
}

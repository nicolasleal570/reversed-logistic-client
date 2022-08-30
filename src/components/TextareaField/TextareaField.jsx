import classNames from 'classnames';

export function TextareaField({
  name,
  placeholder,
  value,
  onChange,
  id,
  disabled,
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
      <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        className={classNames(
          'w-full min-h-[150px]',
          { 'border border-gray-300 text-gray-900': !error },
          { 'border border-red-300 text-red-500': error },
          'text-base leading-6 font-normal',
          'bg-white h-10 py-3 px-2.5 shadow-sm rounded-lg',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring focus:ring-indigo-300'
        )}
        {...inputProps}
      >
        {value}
      </textarea>

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

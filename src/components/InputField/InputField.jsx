import classNames from 'classnames';

export function InputField({
  name,
  placeholder,
  value,
  onChange,
  id,
  type = 'text',
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        disabled={disabled}
        className={classNames(
          'w-full',
          { 'border border-gray-300 text-gray-900': !error },
          { 'border border-red-300 text-red-500': error },
          {
            'border border-gray-300 text-gray-400 cursor-not-allowed': disabled,
          },
          'text-base leading-6 font-normal',
          'bg-white h-10 py-3 px-2.5 shadow-sm rounded-lg cursor-pointer',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring focus:ring-indigo-300'
        )}
        {...inputProps}
      />

      {highlight && !error && (
        <span
          className="text-xs font-medium text-gray-500"
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

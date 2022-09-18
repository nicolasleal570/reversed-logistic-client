import classNames from 'classnames';

export const DEFAULT_KIND = 'default';
export const DEFAULT_SM_KIND = 'default_sm';

const validKindOfBtn = new Set([DEFAULT_KIND, DEFAULT_SM_KIND]);

export const NORMAL_SIZE = 'normal';
export const SM_SIZE = 'small';
export const MD_SIZE = 'medium';

const validSizeOfBtn = new Set([NORMAL_SIZE, SM_SIZE]);

export function Button({
  children,
  kind = DEFAULT_KIND,
  size = NORMAL_SIZE,
  fullWidth = true,
  className,
  outline = false,
  disabled,
  ...props
}) {
  const validKind = validKindOfBtn.has(kind) ? kind : DEFAULT_KIND;
  const validSize = validSizeOfBtn.has(size) ? size : NORMAL_SIZE;

  return (
    <button
      className={classNames('cursor-pointer',
        {
          'w-full': fullWidth,
          'text-sm leading-5 font-medium rounded-lg':
            validKind === DEFAULT_KIND,
          'bg-indigo-600 text-white': !outline && validKind === DEFAULT_KIND,
          'py-4 px-8': validSize === NORMAL_SIZE,
          'py-2 px-4 text-xs': validSize === SM_SIZE,
          'py-2.5 px-5 text-md': validSize === SM_SIZE,
          'bg-transparent border-2 border': outline,
          'border-indigo-600 text-indigo-700':
            outline && validKind === DEFAULT_KIND,
          'bg-gray-300 text-gray-400 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

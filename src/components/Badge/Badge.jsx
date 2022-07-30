import classNames from 'classnames';

export function Badge({ title, color }) {
  return (
    <p
      className={classNames(
        `inline-flex items-center px-2 py-0.5 rounded-full`,
        {
          'bg-indigo-50 text-indigo-600': color === 'indigo',
          'bg-red-50 text-red-600': color === 'red',
          'bg-yellow-50 text-yellow-600': color === 'yellow',
          'bg-orange-50 text-orange-600': color === 'orange',
          'bg-blue-50 text-blue-600': color === 'blue',
        }
      )}
    >
      <span
        className={classNames(`block w-1.5 h-1.5 rounded-full mr-2`, {
          'bg-indigo-600': color === 'indigo',
          'bg-red-600': color === 'red',
          'bg-yellow-600': color === 'yellow',
          'bg-orange-600': color === 'orange',
          'bg-blue-600': color === 'blue',
        })}
      />
      {title}
    </p>
  );
}

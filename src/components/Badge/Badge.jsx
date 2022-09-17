import classNames from 'classnames';

export function Badge({ title, color }) {
  return (
    <p
      className={classNames(
        `inline-flex items-center px-2 py-0.5 rounded-full border`,
        {
          'bg-indigo-50 text-indigo-600 border-indigo-600/40':
            color === 'indigo',
          'bg-violet-50 text-violet-600 border-violet-600/40':
            color === 'violet',
          'bg-red-50 text-red-600 border-red-600/40': color === 'red',
          'bg-yellow-50 text-yellow-600 border-yellow-600/40':
            color === 'yellow',
          'bg-orange-50 text-orange-600 border-orange-600/40':
            color === 'orange',
          'bg-blue-50 text-blue-600 border-blue-600/40': color === 'blue',
          'bg-cyan-50 text-cyan-600 border-cyan-600/40': color === 'cyan',
          'bg-green-50 text-green-600 border-green-600/40': color === 'green',
          'bg-lime-50 text-lime-600 border-lime-600/40': color === 'lime',
        }
      )}
    >
      <span
        className={classNames(`block w-1.5 h-1.5 rounded-full mr-2`, {
          'bg-indigo-600': color === 'violet',
          'bg-violet-600': color === 'indigo',
          'bg-red-600': color === 'red',
          'bg-yellow-600': color === 'yellow',
          'bg-orange-600': color === 'orange',
          'bg-blue-600': color === 'blue',
          'bg-cyan-600': color === 'cyan',
          'bg-green-600': color === 'green',
          'bg-lime-600': color === 'lime',
        })}
      />
      {title}
    </p>
  );
}

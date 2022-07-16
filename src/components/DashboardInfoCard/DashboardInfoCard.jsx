import Link from 'next/link';
import classNames from 'classnames';

export function DashboardInfoCard({
  title,
  description,
  icon,
  route,
  firstColor,
  secondColor,
}) {
  return (
    <div className="w-full lg:w-[763px] bg-gray-50 border border-gray-100 shadow-xs flex p-6 mb-5 rounded-md">
      <div
        className={classNames(
          'w-14 h-14 flex justify-center items-center p-3 mr-6',
          firstColor
        )}
      >
        <div
          className={classNames(
            'flex justify-center items-center w-8 h-8 text-white',
            secondColor
          )}
        >
          {icon}
        </div>
      </div>

      <Link href={route}>
        <a className="flex flex-col">
          <span className="text-xs leading-4 font-bold text-gray-700 mb-1.5">
            {title}
          </span>

          <span className="text-sm leading-5 font-normal text-gray-500 flex-1 flex-wrap">
            {description}
          </span>
        </a>
      </Link>
    </div>
  );
}

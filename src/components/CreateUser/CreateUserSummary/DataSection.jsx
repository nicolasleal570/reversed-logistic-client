import { Badge } from '@components/Badge/Badge';
import classNames from 'classnames';

export function DataSection({ label, value, badge, tags }) {
  return (
    <div className="my-6">
      <p
        className={classNames('text-sm leading-5 font-medium text-gray-500', {
          'mb-2': badge,
        })}
      >
        {label}
      </p>
      {value && !badge && (
        <p className="text-base leading-6 font-normal text-gray-900 mb-6">
          {value}
        </p>
      )}

      {badge && <Badge title={badge.title} color={badge.color} />}

      {tags && tags.length > 0 && (
        <div className="flex mt-2">
          {tags.map((tag) => (
            <p
              key={`${label.trim()}-${tag}`}
              className="py-0.5 px-2 bg-indigo-50 text-indigo-700 flex items-center rounded-xl mr-3"
            >
              <span className="w-1.5 h-1.5 bg-indigo-600 mr-2 rounded-full" />
              <span className="text-xs leading-4 font-medium">{tag}</span>
            </p>
          ))}
        </div>
      )}

      {tags && tags.length === 0 && (
        <div className="flex mt-2">
          <p className="py-0.5 px-2 bg-yellow-50 text-yellow-700 flex items-center rounded-xl mr-3">
            <span className="w-1.5 h-1.5 bg-yellow-600 mr-2 rounded-full" />
            <span className="text-xs leading-4 font-medium">
              Sin permisos sobre este módulo
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

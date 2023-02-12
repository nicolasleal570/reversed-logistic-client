import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function SidebarSection({
  header,
  headerAction,
  headerActionIcon,
  slots,
}) {
  const router = useRouter();

  return (
    <section className="w-full p-4 border-b border-gray-200">
      {header && (
        <p className="px-3 text-indigo-600 text-xs leading-4 font-medium mb-2 flex justify-center justify-between">
          <span>{header}</span>

          {headerAction && headerActionIcon && (
            <button type="button" onClick={headerAction}>
              {headerActionIcon}
            </button>
          )}
        </p>
      )}

      {slots.map((slot) => {
        const isActive = router.pathname.includes(slot.url);

        return (
          <Link key={slot.url} href={slot.url}>
            <a
              className={classNames('block w-full py-2 px-3 flex items-center')}
            >
              {slot.icon ? (
                slot.icon
              ) : (
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                </div>
              )}
              <span
                className={classNames(
                  'text-gray-700 text-base leading-6 font-medium',
                  {
                    'text-indigo-500': isActive,
                  }
                )}
              >
                {slot.title}
              </span>
            </a>
          </Link>
        );
      })}
    </section>
  );
}

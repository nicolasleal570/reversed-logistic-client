import Link from 'next/link';

export function SidebarSection({
  header,
  headerAction,
  headerActionIcon,
  slots,
}) {
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
        return (
          <Link key={slot.url} href={slot.url}>
            <a className="block w-full py-2 px-3 flex items-center">
              {slot.icon}
              <span className="text-gray-700 text-base leading-6 font-medium">
                {slot.title}
              </span>
            </a>
          </Link>
        );
      })}
    </section>
  );
}
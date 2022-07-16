import { useEffect } from 'react';
import classNames from 'classnames';
import { XIcon } from '@heroicons/react/outline';
import { SidebarSection } from '@components/SidebarSection/SidebarSection';
import { items } from '@constants/sidebarItems';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useLayout } from '@hooks/useLayout';
import Link from 'next/link';

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();
  const isMediumSize = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setIsSidebarOpen(isMediumSize);
  }, [isMediumSize]);

  return (
    <div
      className={classNames(
        'fixed md:relative bg-gray-900/70 w-full md:w-64 min-h-screen z-10',
        {
          block: isSidebarOpen && isMediumSize,
          hidden: !isSidebarOpen && !isMediumSize,
        }
      )}
    >
      <aside className="w-64 h-full overflow-y-scroll lg:overflow-y-auto bg-white flex flex-col">
        <button
          className="block md:hidden absolute right-2 top-2 rounded bg-red-400 text-white p-1"
          onClick={() => setIsSidebarOpen(false)}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <section className="w-full p-4 md:py-8 border-b border-gray-200">
          <Link href="/">LOGO</Link>
        </section>

        {items.map((item) => (
          <SidebarSection
            key={item.header ?? item.slots[0].title}
            header={item.header}
            headerAction={item.headerAction}
            headerActionIcon={item.headerActionIcon}
            slots={item.slots}
          />
        ))}

        <section className="w-full block flex-grow" />

        <section className="w-full p-4 md:border-t md:border-gray-200">
          <button className="bg-white border border-red-400 rounded-lg text-red-400 block w-full py-4 text-center">
            Cerrar sesión
          </button>
        </section>
      </aside>
    </div>
  );
}

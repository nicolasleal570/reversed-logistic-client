import { useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useCookies } from 'react-cookie';
import { XIcon } from '@heroicons/react/outline';
import { SidebarSection } from '@components/SidebarSection/SidebarSection';
import { items } from '@constants/sidebarItems';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useLayout } from '@hooks/useLayout';
import Link from 'next/link';
import { logoutUser } from '@api/auth/methods';

export function Sidebar() {
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();
  const isMediumSize = useMediaQuery('(min-width: 768px)');
  const [cookies, _, removeCookie] = useCookies(['token']);

  const handleLogout = async () => {
    const { token } = cookies;
    try {
      await logoutUser(token);
      removeCookie('token');
      router.replace('/login');
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setIsSidebarOpen(isMediumSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumSize]);

  return (
    <div
      className={classNames(
        'fixed md:relative bg-gray-900/70 w-full md:w-64 md:min-w-[16rem] min-h-screen z-10',
        {
          block: isSidebarOpen && isMediumSize,
          hidden: !isSidebarOpen && !isMediumSize,
        }
      )}
    >
      <aside className="fixed w-64 h-full bg-white flex flex-col">
        <button
          className="block md:hidden absolute right-2 top-2 rounded bg-red-400 text-white p-1"
          onClick={() => setIsSidebarOpen(false)}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <section className="w-full p-4 md:py-8 border-b border-gray-200">
          <Link href="/">LOGO</Link>
        </section>

        <div className="overflow-y-scroll lg:overflow-y-auto">
          {items.map((item) => (
            <SidebarSection
              key={item.header ?? item.slots[0].title}
              header={item.header}
              headerAction={item.headerAction}
              headerActionIcon={item.headerActionIcon}
              slots={item.slots}
            />
          ))}

          <section className="w-full block flex-grow min-h-[60px]" />
        </div>

        <section className="bg-gray-100/20 w-full p-4 md:border-t md:border-gray-200">
          <button
            type="button"
            className="bg-white border border-red-400 rounded-lg text-red-400 block w-full py-4 text-center"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </section>
      </aside>
    </div>
  );
}

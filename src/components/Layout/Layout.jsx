import { MenuIcon } from '@heroicons/react/outline';
import { Sidebar } from '@components/Sidebar/Sidebar';
import LayoutContextProvider from '@contexts/LayoutContext/LayoutContext';
import { useLayout } from '@hooks/useLayout';

function LayoutContainer({ children, title, description }) {
  const { setIsSidebarOpen } = useLayout();

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <main className="w-full flex-1 border-l border-gray-200">
        <nav className="block md:hidden p-4 md:py-8 border-b border-gray-200 flex justify-between items-center">
          {/*Temp text*/}
          <span className="text-white">NAV</span>

          <button
            className="block md:hidden"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="w-7 text-gray-900" />
          </button>
        </nav>
        <section className="p-8">
          {title && (
            <h1 className="text-3xl leading-9 font-medium text-gray-900 mb-4">
              {title}
            </h1>
          )}

          {description && (
            <p className="text-sm md:text-base leading-6 font-normal text-gray-500 w-full lg:w-[763px] mb-14">
              {description}
            </p>
          )}

          {children}
        </section>
      </main>
    </div>
  );
}

export function Layout(props) {
  return (
    <LayoutContextProvider>
      <LayoutContainer {...props} />
    </LayoutContextProvider>
  );
}

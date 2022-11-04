import classNames from 'classnames';
import { Tab } from '@headlessui/react';

export function TableTabs({ tabs, children }) {
  return (
    <Tab.Group as="div">
      <Tab.List className="flex space-x-2 rounded bg-indigo-900/20 p-1">
        {tabs.map((item) => (
          <Tab
            key={item}
            className={({ selected }) =>
              classNames(
                'w-full rounded py-2.5 text-sm font-medium leading-5 text-indigo-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-indigo-400 hover:bg-white/[0.5] hover:text-indigo-600'
              )
            }
          >
            {item}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">{children}</Tab.Panels>
    </Tab.Group>
  );
}

import classNames from 'classnames';

export function FilterPillTable({ tabs, currentTab, onClick }) {
  return (
    <>
      <h2 className="text-lg leading-7 font-medium text-gray-900 my-auto flex-1 mb-2 g:mb-0">
        Filtros:
      </h2>

      <div className="flex flex-row flex-wrap items-center space-x-2 mb-4">
        <button
          type="button"
          onClick={() => onClick()}
          className={classNames('mb-3 py-1 px-3 rounded-full border text-sm', {
            'bg-white border-gray-300': 'ALL' !== currentTab,
            'bg-indigo-500 text-white border-indigo-500': 'ALL' === currentTab,
          })}
        >
          Todos
        </button>
        {tabs.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onClick(item.value)}
            className={classNames(
              'mb-3 py-1 px-3 rounded-full border text-sm',
              {
                'bg-white border-gray-300': item.value !== currentTab,
                'bg-indigo-500 text-white border-indigo-500':
                  item.value === currentTab,
              }
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
}

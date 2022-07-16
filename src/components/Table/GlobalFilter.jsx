import React from 'react';
import { useAsyncDebounce } from 'react-table';
import { SearchIcon } from '@heroicons/react/outline';

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);

  const onChange = useAsyncDebounce((_value) => {
    setGlobalFilter(_value || undefined);
  }, 100);

  return (
    <label htmlFor="search" className="relative">
      <span className="sr-only">Buscador</span>
      <input
        name="search"
        type="search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Buscar en ${count} registros`}
        className="bg-white border border-gray-300 shadow-sm w-full h-10 px-4 pr-10 rounded-lg text-sm focus:outline-none text-gray-700 placeholder-gray-500"
      />
      <button
        type="button"
        className="absolute right-0 top-0.5 mr-4 text-gray-500"
      >
        <SearchIcon className="w-4" />
      </button>
    </label>
  );
}

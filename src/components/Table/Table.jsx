/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import React from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import { Pagination } from '@components/Pagination/Pagination';
import { GlobalFilter } from './GlobalFilter';
import { NoData } from './NoData';
//import Pagination from './Pagination';

function Table({
  headers,
  content,
  href,
  as,
  text,
  onClickRow,
  tableHeader,
  deactivateSearchBar,
  filterTabs,
}) {
  const columns = React.useMemo(() => [...headers], [headers]);
  const data = React.useMemo(() => [...content], [content]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      {tableHeader}

      {!deactivateSearchBar && (
        <div className="flex flex-row flex-wrap w-full px-6 py-3">
          <div className="w-full lg:w-2/3">{filterTabs}</div>

          {content.length > 0 && (
            <div className="w-full lg:w-1/3 ml-auto">
              <GlobalFilter
                globalFilter={globalFilter}
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto w-full block">
        {content.length === 0 ? (
          <div className="w-full border-collapse text-gray-600">
            <NoData href={href} as={as} />
          </div>
        ) : (
          <table
            className="w-full border-collapse mb-4 text-gray-600"
            style={{ captionSide: 'bottom' }}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={Math.random().toString(36).substring(2, 15)}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((header, idx) => (
                    <th
                      key={Math.random().toString(36).substring(2, 15)}
                      className={classNames(
                        'border-b border-gray-200 text-left text-gray-500 text-xs leading-4 font-medium',
                        {
                          'p-3': idx > 0,
                          'pl-6': idx === 0,
                        }
                      )}
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      <span className="inline-flex w-full">
                        <span className="my-auto pr-2">
                          {header.render('Header')}
                        </span>
                        {header.canSort ? (
                          <span className="ml-auto my-auto">
                            {header.isSorted ? (
                              header.isSortedDesc ? (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                  />
                                </svg>
                              )
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 8h16M4 16h16"
                                />
                              </svg>
                            )}
                          </span>
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, idx) => {
                prepareRow(row);
                return (
                  <tr
                    key={Math.random().toString(36).substring(2, 15)}
                    className={`${
                      onClickRow ? 'cursor-pointer' : ''
                    } hover:bg-gray-200`}
                    {...row.getRowProps()}
                    data-id={content?.[idx]?._id}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onClickRow) {
                        onClickRow(e?.currentTarget?.dataset?.id);
                      }
                    }}
                  >
                    {row.cells.map((cell, idx) => (
                      <td
                        key={Math.random().toString(36).substring(2, 15)}
                        className={classNames(
                          'p-3 align-top border-t border-gray-200 text-sm leading-5 font-normal max-w-[200px]',
                          {
                            'pl-6': idx === 0,
                          }
                        )}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {content.length > 0 && (
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageOptions={pageOptions}
        />
      )}
    </>
  );
}

export default Table;

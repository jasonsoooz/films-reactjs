import React from 'react'

import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import TablePagination from './TablePagination'

const Table = ({ columns, data }) => {

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: _defaultColumnFilter,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // pagination
    page,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable({
    columns,
    data,
    defaultColumn, // Be sure to pass the defaultColumn option
  }, 
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <div>
      <table {...getTableProps()} className='ui striped celled table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                    {/* Render the columns filter UI */}
                    <div data-testid={column.id}>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <TablePagination gotoPage={gotoPage} canPreviousPage={canPreviousPage}
          previousPage={previousPage} nextPage={nextPage} canNextPage={canNextPage}
          pageCount={pageCount} pageIndex={pageIndex} pageOptions={pageOptions}
          setPageSize={setPageSize} />
      <br />
    </div>
  )
}

// Default UI for filtering
const _defaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export default Table
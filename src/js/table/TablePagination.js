import React from 'react'

const TablePagination = ({gotoPage, canPreviousPage, previousPage, 
    nextPage, canNextPage, pageCount, pageIndex, pageOptions,
    pageSize, setPageSize}) => {
    return(
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='ui button'>
            {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='ui button'>
            {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage} className='ui button'>
            {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='ui button'>
            {'>>'}
        </button>{' '}
        <span>
            Page{' '}
            <strong>
            {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>
        <span>
            | Go to page:{' '}
            <input data-testid='pageInput'
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
            }}
            style={{ width: '100px' }}
            />
        </span>{' '}
        <select data-testid='pageSelect'
            value={pageSize}
            onChange={e => {
            setPageSize(Number(e.target.value))
            }}
        >
            {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
                Show {pageSize}
            </option>
            ))}
        </select>
      </div>
    )
}

export default TablePagination
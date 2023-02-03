import React from "react";
import { useTable, useFilters, useGlobalFilter, useSortBy, useRowSelect } from "react-table";
import { matchSorter } from 'match-sorter';
import { GlobalFilter, TextColumnFilter } from "./TableFilters";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function EnhancedTable({ tableData, tableColumns, onRowSelect, startSelected = true }) {

  const data = React.useMemo(
    () => tableData,
    [tableData]
  );

  const columns = React.useMemo(
    () => tableColumns,
    [tableColumns]
  );

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: TextColumnFilter,
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = tableInstance;

  //Select every row initially
  React.useEffect(() => {
    if (startSelected === true)
      tableInstance.toggleAllRowsSelected(true);
  }, [startSelected, tableInstance]);

  //Register an update to the selected rows
  React.useEffect(() => {
    onRowSelect(selectedFlatRows);
  }, [onRowSelect, selectedFlatRows]);

  return (
    // apply the table props
    <table {...getTableProps()}>
      <thead>
        {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.canSort ?
                        (column.isSorted ?
                          (column.isSortedDesc ? ' ↓' : ' ↑') :
                          ' ↕️'
                        ) :
                        ''
                      }
                  </th>
              ))}
            </tr>
          ))}
        {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                ))}
            </tr>
          ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                          cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default EnhancedTable;

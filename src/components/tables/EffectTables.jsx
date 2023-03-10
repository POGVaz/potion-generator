import React from "react";
import EnhancedTable from "./EnhancedTable";
import { SelectColumnFilter, NumberRangeColumnFilter } from "./TableFilters";


function EffectTables({effectsList, sideEffectsList, onEffectsChange, onSideEffectsChange}) {
  return (
    <div>
      <div>
        {
          renderMainEffectsTable(effectsList, onEffectsChange)
        }
      </div>
      <div>
        {
          renderSideEffectsTable(sideEffectsList, onSideEffectsChange)
        }
      </div>
    </div>
  )
}

function renderMainEffectsTable(effects, onChange) {

  //Define columns for the table
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sortType: 'basic',
      filter: 'fuzzyText',
      Cell: ({value, row}) => {
        if (row.original.reference){
          return (
            <div><a href={row.original.reference} target="_blank" rel="noreferrer">{value}</a></div>
            // <div>{value}</div>
          )
        }
        else {
          return (
            <div>{value}</div>
          )
        }
      }
    },
    {
      Header: 'Level',
      accessor: 'level',
      Filter: SelectColumnFilter,
      filter: 'equal',
    },
    {
      Header: 'Price',
      accessor: 'basePrice',
      Filter: NumberRangeColumnFilter,
      filter: 'between',
    },
    {
      Header: 'Description',
      accessor: 'description',
      disableSortBy: true,
      filter: 'fuzzyText',
    },
  ]

  //return the table rendered
  return (
    <div>
      <h2>Potion Effects</h2>
      <EnhancedTable
        tableData={effects}
        tableColumns={columns}
        onRowSelect={onChange}
      />
    </div>
  )
}

function renderSideEffectsTable(effects, onChange) {

  //Define columns for the table
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sortType: 'basic',
      filter: 'fuzzyText',
    },
    {
      Header: 'Category',
      accessor: 'category',
      Filter: SelectColumnFilter,
      disableSortBy: true,
      filter: 'equal',
      Cell: ({ value }) => {
        return {
          "very_weak": "Muito Fraco",
          "weak": "Fraco",
          "medium": "M??dio",
          "strong": "Forte",
          "very_strong": "Muito Forte",
        }[value];
      },
    },
    {
      Header: 'Modifier',
      accessor: 'costModifier',
      Filter: SelectColumnFilter,
      filter: 'equal',
      Cell: ({ value }) => {
        return String(value < 1 ? Math.floor((1 - value) * 100)*(-1) : Math.floor(value * 100)) + '%'
      }
    },
    {
      Header: 'Description',
      accessor: 'description',
      disableSortBy: true,
      filter: 'fuzzyText',
    },
  ]

  //return the table rendered
  return (
    <div>
      <h2>Potion Side Effects</h2>
      <EnhancedTable
        tableData={effects}
        tableColumns={columns}
        onRowSelect={onChange}
      />
    </div>
  )
}

export default EffectTables;

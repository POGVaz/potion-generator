import React from "react";
import EnhancedTable from "./EnhancedTable";
import { SelectColumnFilter } from "./TableFilters";
import { Box, Grid, Link, Paper, Typography } from "@mui/material";


function EffectTables({effectsList, sideEffectsList, onEffectsChange, onSideEffectsChange}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            {renderMainEffectsTable(effectsList.sort((a, b) => { return a.level - b.level }), onEffectsChange)}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            {renderSideEffectsTable(sideEffectsList, onSideEffectsChange)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
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
      width: 50,
      Cell: ({value, row}) => {
        return (row.original.reference)?
          <Link href={row.original.reference}>{value}</Link> :
          <Typography>{value}</Typography>
      }
    },
    {
      Header: "Level",
      accessor: 'level',
      Filter: SelectColumnFilter,
      filter: 'equal',
      Cell: ({ value }) => <Typography align="center" >{value}</Typography>
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

  effects.forEach((effect) => {
    effect["category_alias"] = {
      "very_weak": "Muito Fraco",
      "weak": "Fraco",
      "medium": "Médio",
      "strong": "Forte",
      "very_strong": "Muito Forte",
    }[effect["category"]];
  });

  //Define columns for the table
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sortType: 'basic',
      filter: 'fuzzyText',
      width: 200,
    },
    {
      Header: 'Category',
      accessor: 'category_alias',
      Filter: SelectColumnFilter,
      disableSortBy: true,
      filter: 'equal',
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

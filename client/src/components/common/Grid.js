import React from 'react';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';

const pagingPanelMessages = {
  showAll: 'Показать все',
  rowsPerPage: 'Строк показано',
  info: '{from}-{to} из {count}'
};
const tableColumnExtensions = [{ columnName: 'actions', align: 'center' }];
const GridComponent = ({
  columns, rows, page, limit, changeCurrentPage, count
}) => (
  <Grid rows={rows} columns={columns}>
    <PagingState
      defaultCurrentPage={page}
      pageSize={limit}
      onCurrentPageChange={changeCurrentPage}
    />
    <CustomPaging totalCount={count} />
    <Table columnExtensions={tableColumnExtensions} />
    <TableHeaderRow />
    <PagingPanel messages={pagingPanelMessages} />
  </Grid>
);
export default GridComponent;

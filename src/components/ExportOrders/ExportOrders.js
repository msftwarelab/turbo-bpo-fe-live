import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { Button } from 'react-bootstrap';
import ReactExport from 'react-data-export';
import moment from 'moment';
import setOrderHours from 'utils/setOrderHours';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ExcelFile;
const { ExcelColumn } = ExcelFile;

const ExportOrders = ({ fileName, data, title }) => (
  <ExcelFile filename={fileName} element={<Button>{title}</Button>}>
    <ExcelSheet data={data} name="Orders">
      <ExcelColumn label="Order Number" value="orderNumber" />
      <ExcelColumn label="Client name" value="authorName" />
      <ExcelColumn label="Address" value="address" />
      <ExcelColumn label="Type" value="type" />
      <ExcelColumn label="Order Type" value="orderType" />
      <ExcelColumn label="Company" value="company" />
      <ExcelColumn
        label="Assigned/Due Date"
        value={col =>
          `${col.assign} ${moment(col.createdDateTime)
            .add(setOrderHours(col), 'hours')
            .format('MMM DD YYYY, hh:mm A')}`
        }
      />
      <ExcelColumn label="Status" value="status" />
      <ExcelColumn label="Fee" value="orderFee" />
    </ExcelSheet>
  </ExcelFile>
);

ExportOrders.propTypes = {
  fileName: string,
  data: arrayOf(shape({})),
};

ExportOrders.defaultProps = {
  fileName: 'Exported_data',
  data: [],
};

export default ExportOrders;

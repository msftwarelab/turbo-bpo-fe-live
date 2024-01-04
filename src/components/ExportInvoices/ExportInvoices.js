import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { Button } from 'react-bootstrap';
import ReactExport from 'react-data-export';
import moment from 'moment';


const { ExcelFile } = ReactExport;
const { ExcelSheet } = ExcelFile;
const { ExcelColumn } = ExcelFile;

const ExportInvoices = ({ fileName, data }) => (
  <ExcelFile filename={fileName} element={<Button variant="warning">Export Invoices</Button>}>
    <ExcelSheet data={data} name="Invoices">
      <ExcelColumn label="Type" value="type" />
      <ExcelColumn label="Name" value="name" />
       <ExcelColumn
        label="Date"
        value={ col =>
          `${moment(col.date)
            .format('MMM DD YYYY, hh:mm A')}`
        }
      />
      <ExcelColumn label="Order Number" value="orderNumber" />
      <ExcelColumn label="Address" value="address" />
      <ExcelColumn label="Company" value="company" />
      <ExcelColumn label="Client" value="client" />
      <ExcelColumn label="Order Type" value="orderType" />
      <ExcelColumn label="isSuperRush" value="isSuperRush" />
      <ExcelColumn label="isRush" value="isRush" />
      <ExcelColumn label="isInterior" value="isInterior" />
      <ExcelColumn label="isRentalAddendum" value="isRentalAddendum" />
      <ExcelColumn label="isInitialBpo" value="isInitialBpo" />
      <ExcelColumn label="isInspection" value="isInspection" />
      <ExcelColumn label="isNoCsv" value="isNoCsv" />
      <ExcelColumn label="isNoIFill" value="isNoIFill" />
      <ExcelColumn label="isOtherPremium" value="isOtherPremium" />
    </ExcelSheet>
  </ExcelFile>
);

ExportInvoices.propTypes = {
  fileName: string,
  data: arrayOf(shape({})),
};

ExportInvoices.defaultProps = {
  fileName: 'Exported_data',
  data: [],
};

export default ExportInvoices;

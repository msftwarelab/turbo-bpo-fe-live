import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import ReactExport from 'react-data-export';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ExcelFile;
const { ExcelColumn } = ExcelFile;

const ExportPasswords = ({ data, company }) => {
  const companyData = data.filter(item => item.company === company);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Export password
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <ExcelFile
          filename="All_Password"
          element={<Dropdown.Item>All</Dropdown.Item>}
        >
          <ExcelSheet data={data} name="All Passwords">
            <ExcelColumn label="Username" value="username" />
            <ExcelColumn label="Password" value="password" />
            <ExcelColumn label="Company" value="company" />
            <ExcelColumn label="Website" value="webSite" />
          </ExcelSheet>
        </ExcelFile>
        <ExcelFile
          filename="Password_by_Company"
          element={<Dropdown.Item>By Company</Dropdown.Item>}
        >
          <ExcelSheet data={companyData} name="Password by Company">
            <ExcelColumn label="Username" value="username" />
            <ExcelColumn label="Password" value="password" />
            <ExcelColumn label="Company" value="company" />
            <ExcelColumn label="Website" value="webSite" />
          </ExcelSheet>
        </ExcelFile>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ExportPasswords.propTypes = {
  data: arrayOf(shape({})),
  company: string,
};

ExportPasswords.defaultProps = {
  data: [],
  company: null,
};

export default ExportPasswords;

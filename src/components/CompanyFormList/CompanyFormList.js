import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Table } from 'react-bootstrap';
import { shape } from 'prop-types';
import EditCompanyForms from 'components/EditCompanyForms';
import AddCompanyForm from 'components/AddCompanyForm';

const CompanyFormList = ({ company, filter }) => {
  const [isShow, setShow] = useState(false);

  const handleShow = () => setShow(!isShow);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faCog} />
      </Button>
      <Modal show={isShow} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Company Forms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <AddCompanyForm company={company} filter={filter} />
          </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {company.forms && company.forms.length ? (
                company.forms.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                      <EditCompanyForms
                        company={company}
                        companyFormIndex={i}
                        companyForm={item}
                        filter={filter}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan="5">
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

CompanyFormList.propTypes = {
  company: shape({}),
  filter: shape({}),
};

CompanyFormList.defaultProps = {
  company: {},
  filter: {},
};

export default CompanyFormList;

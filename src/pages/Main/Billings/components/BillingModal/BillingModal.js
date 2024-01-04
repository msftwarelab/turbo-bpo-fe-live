import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { shape } from 'prop-types';
import { useMe } from 'contexts/Me';
import setCurrency from 'utils/setCurrency';
import DeleteBillingEntry from 'components/DeleteBillingEntry';
import AddCustomBillingEntry from 'components/AddCustomBillingEntry';
import ExportBillingEntry from 'components/ExportBillingEntry';

const BillingModal = ({ billing, filter }) => {
  const { me } = useMe();
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  return (
    <>
      <Button variant="link" className="p-0" onClick={handleShow}>
        {billing.invoiceNumber}
      </Button>
      {isShow && (
        <Modal show onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Billing Entry</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {billing.status !== 'PAID' &&
              me.permissionList.includes('ADD_BILLING') && (
                <div className="mb-3">
                  <AddCustomBillingEntry billing={billing} />
                </div>
              )}
            <Table striped bordered hover className="mb-0">
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Description</th>
                  <th>Amount</th>
                  {billing.status !== 'PAID' &&
                    me.permissionList.includes('DELETE_BILLING') && (
                      <th>Action</th>
                    )}
                </tr>
              </thead>
              <tbody>
                {billing.entries.map(item => (
                  <tr key={item.orderNumber}>
                    <td>{item.orderNumber}</td>
                    <td>{item.description}</td>
                    <td className="text-right">
                      {setCurrency('', item.amount, 2)}
                    </td>
                    {billing.status !== 'PAID' &&
                      me.permissionList.includes('DELETE_BILLING') && (
                        <td className="text-center">
                          <DeleteBillingEntry
                            filter={filter}
                            billing={billing}
                            billingEntry={item}
                          />
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <ExportBillingEntry billingId={billing.id} />
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
BillingModal.propTypes = {
  billing: shape({}),
  filter: shape({}),
};
BillingModal.defaultProps = {
  billing: {},
  filter: {},
};
export default BillingModal;

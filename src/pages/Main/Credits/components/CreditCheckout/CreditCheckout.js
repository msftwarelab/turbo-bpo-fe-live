import React, { useState } from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faTimes } from '@fortawesome/free-solid-svg-icons';
import { withApollo } from 'react-apollo';
import orderId from 'order-id';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import setCurrency from 'utils/setCurrency';
import { shape } from 'prop-types';
import PaymentModal from 'components/PaymentModal';
import ALL_CREDIT_LEDGER from 'queries/allCreditLedger';
import { CREDIT_BALANCE } from '../CreditBalance/queries';
import { SAVE_CREDIT } from './mutations';

const creditsOptions = [
  { id: 1, value: 25 },
  { id: 2, value: 50 },
  { id: 3, value: 100 },
];

const paypalOrderId = orderId('paypal-order-id');
const paypalToken = orderId('paypal-token');

const CreditCheckout = ({ client, filter }) => {
  const [isPaymentShow, setPaymentShow] = useState(false);
  const handlePaymentShow = () => setPaymentShow(!isPaymentShow);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handleCartItems = e => {
    const newCartItems = [...cartItems];
    newCartItems.push(e);
    setCartItems(newCartItems);
  };
  const handleRemoveCart = index => {
    const newCartItems = cartItems.filter((item, i) => index !== i);
    setCartItems(newCartItems);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const promisedMutations = cartItems.map(item => {
        return client.mutate({
          mutation: SAVE_CREDIT,
          variables: {
            input: {
              paypalOrderId: paypalOrderId.generate(),
              paypalToken: paypalToken.generate(),
              amount: item.value,
            },
          },
          refetchQueries: [
            {
              query: CREDIT_BALANCE,
            },
            {
              query: ALL_CREDIT_LEDGER,
              variables: { filter },
            },
          ],
        });
      });
      await Promise.all(promisedMutations);
      setCartItems([]);
      setLoading(false);
      cogoToast.success('Credit added');
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <div className="mt-3">
      <Row className="mb-3">
        {creditsOptions.map(item => (
          <Col sm={4} key={item.id}>
            <Card>
              <Card.Body className="text-center">
                <h3>
                  {item.value}{' '}
                  <FontAwesomeIcon icon={faCoins} className="text-warning" />
                </h3>
                <Card.Text className="text-primary">
                  {setCurrency('USD', item.value, 2)}
                </Card.Text>
                <Button onClick={() => handleCartItems(item)}>
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Your cart</h3>
      <ListGroup className="mb-3">
        {cartItems.length ? (
          <>
            {cartItems.map((item, k) => (
              <ListGroup.Item
                key={k}
                className="d-flex justify-content-between"
              >
                <div>
                  <h4 className="my-0">
                    {item.value}{' '}
                    <FontAwesomeIcon icon={faCoins} className="text-warning" />
                  </h4>
                  <small>{setCurrency('USD', item.value, 2)}</small>
                </div>
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    handleRemoveCart(k);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </a>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="bg-light">
              <div>Total (USD)</div>
              <h3 className="my-0">
                {setCurrency(
                  'USD',
                  cartItems
                    .map(item => parseFloat(item.value))
                    .reduce((a, b) => a + b),
                  2
                )}
              </h3>
            </ListGroup.Item>
          </>
        ) : (
          <div>No items ordered.</div>
        )}
      </ListGroup>
      {Boolean(cartItems.length) && (
        <Button
          disabled={isLoading}
          size="lg"
          onClick={handlePaymentShow}
          variant="warning"
        >
          Checkout
        </Button>
      )}

      {isPaymentShow && (
        <PaymentModal
          show
          onHide={handlePaymentShow}
          amount={cartItems.map(item => item.value).reduce((a, b) => a + b, 0)}
          onSuccess={handleSubmit}
        />
      )}
    </div>
  );
};

CreditCheckout.propTypes = {
  client: shape({}),
  filter: shape({}),
};

CreditCheckout.defaultProps = {
  client: {},
  filter: {},
};

export default withApollo(CreditCheckout);

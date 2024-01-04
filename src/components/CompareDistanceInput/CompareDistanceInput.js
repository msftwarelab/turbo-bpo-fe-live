import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { string, func, bool } from 'prop-types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form } from 'react-bootstrap';

const CompareDistanceInput = ({
  addressFrom,
  addressTo,
  name,
  onChange,
  isInvalid,
  cRef,
}) => {
  const [fromLatLng, setFromLatLng] = useState(null);
  const [toLatLng, setToLatLng] = useState(null);

  const getLatLngByAddress = async (address, cb) => {
    const geoCodes = await geocodeByAddress(address);
    const latlng = await getLatLng(geoCodes[0]);
    cb(latlng);
  };

  useEffect(() => {
    if (addressFrom)
      getLatLngByAddress(addressFrom, latlng => setFromLatLng(latlng));
  }, [addressFrom]);

  useEffect(() => {
    if (addressTo) getLatLngByAddress(addressTo, latlng => setToLatLng(latlng));
  }, [addressTo]);

  const calculateDistance = (mk1, mk2) => {
    if (!mk1 || !mk2) return null;
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  };

  const distance = calculateDistance(fromLatLng, toLatLng);

  return (
    <Form.Control
      name={name}
      onChange={onChange}
      defaultValue={distance ? distance.toFixed(0) : ''}
      isInvalid={isInvalid}
      ref={cRef}
    />
  );
};

CompareDistanceInput.propTypes = {
  addressFrom: string,
  addressTo: string,
  name: string,
  onChange: func,
  isInvalid: bool,
  cRef: func,
};
CompareDistanceInput.defaultProps = {
  addressFrom: null,
  addressTo: null,
  name: null,
  onChange: e => e,
  isInvalid: false,
  cRef: e => e,
};

export default withApollo(CompareDistanceInput);

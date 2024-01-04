import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { shape, bool } from 'prop-types';

const GoogleMaps = ({ latlng, isMarkerShown, defaultZoom }) => (
  <GoogleMap center={latlng} defaultZoom={defaultZoom}>
    {isMarkerShown && <Marker position={latlng} />}
  </GoogleMap>
);

GoogleMaps.propTypes = {
  latlng: shape({}),
  isMarkerShown: bool,
};

GoogleMaps.defaultProps = {
  latlng: {},
  isMarkerShown: true,
  defaultZoom: 15,
};

export default withScriptjs(withGoogleMap(GoogleMaps));

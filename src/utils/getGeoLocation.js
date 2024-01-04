import axios from 'axios';
import geocoder from 'geocoder';

export default async latlng => {
  if (!latlng) return new Promise();
  return new Promise(resolve => {
    geocoder.reverseGeocode(
      latlng.lat,
      latlng.lng,
      (err, data) => {
        if (!err) {
          const { results } = data;
          if (results && results.length > 0) {
            const geoAddress = results[0];
            const { address_components: addressComponents } = geoAddress;
            if (addressComponents && addressComponents.length > 0) {
              const postalCode = addressComponents.filter(loc => {
                return loc.types.includes('postal_code');
              });
              if (postalCode.length > 0) {
                const { long_name: longName } = postalCode[0];
                axios(
                  `http://turbobpolocserv.webronins.com/public/?zips=${longName}`,
                  {
                    method: 'get',
                    responseType: 'applications/json',
                  }
                ).then(respData => {
                  const { data: densityData } = respData;
                  if (densityData.length > 0) {
                    resolve({
                      zipCode: longName,
                      populationDensity: densityData[1],
                    });
                  }
                });
              } else {
                resolve('Undefined');
              }
            } else {
              resolve('Undefined');
            }
          } else {
            resolve('Undefined');
          }
        } else {
          resolve('Undefined');
        }
      },
      { key: process.env.REACT_APP_GEOMAP_API_KEY }
    );
  });
};

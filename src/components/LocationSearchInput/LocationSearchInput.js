import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { func, bool, string } from 'prop-types';
import { StyledContainer, StyledLoading } from './styles';

const LocationSearchInput = ({ value, onChange, isInvalid, disabled }) => {
  const [address, setAddress] = useState(value);
  const handleChange = newAddress => {
    setAddress(newAddress);
  };

  const handleSelect = newAddress => {
    setAddress(newAddress);
    onChange(newAddress);
  };

  return (
    <PlacesAutocomplete
      value={address || ''}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <StyledContainer suggestions={suggestions}>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: `form-control ${isInvalid ? 'is-invalid' : ''}`,
              disabled,
            })}
          />

          <div className="autocomplete-dropdown-container">
            {loading && <StyledLoading>Loading...</StyledLoading>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#3390ff', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </StyledContainer>
      )}
    </PlacesAutocomplete>
  );
};

LocationSearchInput.propTypes = {
  onChange: func,
  isInvalid: bool,
  disabled: bool,
  value: string,
};

LocationSearchInput.defaultProps = {
  onChange: e => e,
  isInvalid: false,
  disabled: false,
  value: null,
};

export default LocationSearchInput;

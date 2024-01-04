import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { string } from 'prop-types';

const PhotoImage = ({ url }) => {
  const [isError, setError] = useState(false);
  const handleError = () => setError(true);
  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {isError ? (
          <FontAwesomeIcon icon={faFileArchive} size="6x" />
        ) : (
          <Image src={url} fluid alt="No image" onError={handleError} />
        )}
      </a>
    </>
  );
};

PhotoImage.defaultProps = {
  url: null,
};

PhotoImage.propTypes = {
  url: string,
};

export default PhotoImage;

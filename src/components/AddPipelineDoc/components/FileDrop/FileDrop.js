import React from 'react';
import Dropzone from 'react-dropzone';
import { StyledContainer } from './styles';

const FileDrop = ({ onDrop }) => {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledContainer>
              Drag 'n' drop some files here, or click to select files
            </StyledContainer>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileDrop;

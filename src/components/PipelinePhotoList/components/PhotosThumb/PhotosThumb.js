import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import PhotoImage from 'components/PhotoImage';
import { StyledContainer, StyledFormGroup } from './styles';

const PhotosThumb = ({
  selectedPhotos = [],
  onSelectPhoto = e => e,
  loading,
  data,
  onDelete = e => e,
}) => {
  if (loading) return <div>loading</div>;
  if (data.length) {
    return (
      <Row>
        {data.map(item => (
          <Col key={item.id} sm={3}>
            <StyledContainer>
              <StyledFormGroup>
                <Form.Check
                  type="checkbox"
                  checked={selectedPhotos
                    .map(select => select.id)
                    .includes(item.id)}
                  onChange={() => onSelectPhoto(item)}
                />
              </StyledFormGroup>
              <PhotoImage url={item.url} />
            </StyledContainer>
          </Col>
        ))}
      </Row>
    );
  }
  return <div>No data yet...</div>;
};

export default PhotosThumb;

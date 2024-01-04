import React, { useState } from 'react';
import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import commentSectionOptions from 'constants/commentSectionOptions';
import { Card, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import EditComment from '../EditComment';
import AddComment from '../AddComment';
import AddCategory from '../AddCategory';
import SetDefault from '../SetDefault';

const StyledContainer = styled.div`
  position: relative;

  .closeCategory {
    position: absolute;
    top: 5px;
    right: 4px;
  }
`;

const CommentList = ({ data: currentData }) => {
  const data = currentData.map(item => ({
    ...item,
    isReadOnly: true,
    isEdit: false,
  }));
  const groupedData = groupBy(data, 'category');
  const [section, setSection] = useState(commentSectionOptions[0].value);
  const [categories, setCategories] = useState(keys(groupedData));

  const handleAddCategory = e => {
    setSection(e.section);
    setCategories([e.category, ...categories]);
  };

  const closeCategory = (e, index) => {
    e.preventDefault();
    const newCategories = categories.filter((item, i) => index !== i);
    setCategories(newCategories);
  };

  const getSection = sectionValue => {
    return commentSectionOptions.find(option => option.value === sectionValue);
  };

  return (
    <>
      <div className="mb-3">
        <AddCategory onSubmit={handleAddCategory} /> <SetDefault />
      </div>
      {categories.map((category, index) => {
        const sectionObj =
          groupedData[category] && groupedData[category].length > 1
            ? getSection(groupedData[category][0].section) || {}
            : {};
        return (
          <StyledContainer key={category}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{category}</Card.Title>
                {groupedData[category] ? (
                  groupedData[category].map(groupItem => (
                    <EditComment key={groupItem.id} comment={groupItem} />
                  ))
                ) : (
                  <Row className="mb-3">
                    <Col sm={{ offset: 2, span: 10 }}>No category yet</Col>
                  </Row>
                )}
                <AddComment
                  category={category}
                  section={sectionObj.value || section}
                />
                {keys(groupedData).indexOf(category) === -1 && (
                  <Button
                    variant="primary"
                    className="closeCategory"
                    onClick={e => closeCategory(e, index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                )}
              </Card.Body>
            </Card>
          </StyledContainer>
        );
      })}
    </>
  );
};

CommentList.propTypes = {
  data: PropTypes.shape({}),
};

CommentList.defaultProps = {
  data: {},
};

export default CommentList;

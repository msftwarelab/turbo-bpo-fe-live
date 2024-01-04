import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ALL_COMMENT from 'queries/allComment';
import CommentForm from '../CommentForm';
import { SAVE_COMMENT } from './mutations';

const AddComment = ({ category, section, client }) => {
  const [isLoading, setLoading] = useState(false);
  const [isAddComment, setAddComment] = useState(false);

  const handleAddComment = () => setAddComment(!isAddComment);

  const handleSubmit = async e => {
    const input = { ...e };
    delete input.isAdd;
    setLoading(true);
    try {
      const {
        data: { saveComment },
      } = await client.mutate({
        mutation: SAVE_COMMENT,
        variables: {
          input,
        },
        refetchQueries: [
          {
            query: ALL_COMMENT,
          },
        ],
      });
      setLoading(false);
      if (saveComment) cogoToast.success('Comment added');
      else cogoToast.error(setErrorMessage());
      handleAddComment();
    } catch (err) {
      setLoading(false);
      cogoToast.error(setErrorMessage(err));
    }
  };

  return (
    <>
      {isAddComment && (
        <CommentForm
          initialValues={{
            category,
            section,
            label: null,
            value: null,
            isAdd: true,
          }}
          onSubmit={handleSubmit}
          onCancel={handleAddComment}
          isLoading={isLoading}
        />
      )}
      <Row>
        <Col sm={{ offset: 2, span: 10 }}>
          <Button
            variant="warning"
            onClick={handleAddComment}
            disabled={isAddComment}
          >
            <FontAwesomeIcon icon={faPlus} /> Add new comment
          </Button>
        </Col>
      </Row>
    </>
  );
};

AddComment.propTypes = {
  category: PropTypes.string,
  section: PropTypes.string,
  client: PropTypes.shape({
    mutate: PropTypes.func,
  }),
};

AddComment.defaultProps = {
  category: null,
  section: null,
  client: {},
};

export default withApollo(AddComment);

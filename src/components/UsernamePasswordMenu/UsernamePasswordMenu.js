import React, { useState } from 'react';
import { MenuItem } from 'react-contextmenu';
import { withApollo } from 'react-apollo';
import { shape } from 'prop-types';
import UsernamePasswordModal from 'components/UsernamePasswordModal';
import PIPELINE from 'queries/pipeline';

const UsernamePasswordMenu = ({ client }) => {
  const [pipeline, setPipeline] = useState({});
  const [isShow, setShow] = useState(false);
  const handleShow = () => setShow(!isShow);
  const handleClick = async (_, contextData) => {
    const { data = {} } = await client.query({
      query: PIPELINE,
      variables: {
        id: contextData.pipelineId,
      },
    });
    setPipeline(data.pipeline);
    handleShow();
  };
  return (
    <>
      <MenuItem onClick={handleClick}>Username & Password</MenuItem>
      {isShow && (
        <UsernamePasswordModal pipeline={pipeline} show onHide={handleShow} />
      )}
    </>
  );
};

UsernamePasswordMenu.propTypes = {
  client: shape({}),
};

UsernamePasswordMenu.defaultProps = {
  client: {},
};

export default withApollo(UsernamePasswordMenu);

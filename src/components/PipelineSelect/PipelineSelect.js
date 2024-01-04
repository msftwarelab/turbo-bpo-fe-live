import React, { useEffect, useState, useRef  } from 'react';
import { withApollo } from 'react-apollo';
import removeNull from 'utils/removeNull';
import AsyncSelect from 'react-select/async';
import PIPELINE from 'queries/pipeline';
import ALL_PIPELINE from 'queries/allPipeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { StyledSelectContainer } from './styles'

const PipelineSelect = ({ value, onChange, client }) => {
  const [newValue, setNewValue] = useState({});
  const refContainer = useRef(null)
  const loadPipelineById = async id => {
    const { data } = await client.query({
      query: PIPELINE,
      variables: {
        id,
      },
    });
    const { pipeline = {} } = data;
    setNewValue({
      label: pipeline.orderNumber,
      value: pipeline.id,
    });
  };


  useEffect(() => {
    loadPipelineById(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const loadOptions = async inputValue => {
    const filter = removeNull({
      offset: 0,
      limit: 10,
      orderNumber: inputValue ? inputValue : undefined,
    });
    const { data } = await client.query({
      query: ALL_PIPELINE,
      variables: { filter },
      fetchPolicy: 'network-only',
    });
    const { allPipeline = {} } = data;
    const { results = [] } = allPipeline;
    return results.map(item => ({
      label: item.orderNumber,
      value: item.id,
    }));
  };

  const handleChange = e => {
    onChange(e.value);
  };


  const selectText = (node) => {
    if (document.selection) { // IE
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(node);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
  }

  const handleCopy = () => {
    const node = refContainer.current.querySelector('div[class*="-singleValue"]');
    selectText(node)
    document.execCommand("copy");
  }

  return (
    <StyledSelectContainer ref={refContainer}>
      <AsyncSelect
        onChange={handleChange}
        value={newValue}
        defaultOptions
        loadOptions={loadOptions}
        className="test"
      />
      { Object.keys(newValue).length > 0  && <FontAwesomeIcon icon={faCopy} onClick={handleCopy} className="copyIcon"/> }
    </StyledSelectContainer>
  );
};

export default withApollo(PipelineSelect);

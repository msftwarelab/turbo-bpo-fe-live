import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { withApollo } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import setErrorMessage from 'utils/setErrorMessage';
import cogoToast from 'cogo-toast';
import PIPELINE from 'queries/pipeline';
import removeTypeName from 'utils/removeTypeName';
import ALL_ADJUSTMENT from 'queries/allAdjustment';
import { Container, Tabs, Tab } from 'react-bootstrap';
import IFORM from 'queries/iform';
import IFORM_TEMP from 'queries/iformTemp';
import UPDATE_IFORM from 'mutations/updateIform';
import Comparables from './components/Comparables/ComparablesCopy';
//import Comparables from './components/Comparables/Comparables';
import Grid from './components/Grid';
import Photos from './components/Photos';
import Repairs from './components/Repairs';
import Values from './components/Values';
import IFormTypeModal from './components/IFormTypeModal';

const IForm = ({ client, match }) => {
  const { pipelineId } = match.params;

  const { loading, error, data = {}, refetch } = useQuery(IFORM, {
    variables: {
      pipelineId,
    },
  });

  const {
    loading: loadingTemp,
    error: errorTemp,
    data: dataTemp = {},
  } = useQuery(IFORM_TEMP, {
    variables: {
      pipelineId,
    },
  });

  const [adjustmentOption, setAdjustmentOption] = useState([]);

  useEffect(() => {
    const fetchAdjustment = async () => {
      const { data: pipelineResults } = await client.query({
        query: PIPELINE,
        variables: {
          id: pipelineId,
        },
      });

      const { authorId: authId } = pipelineResults.pipeline;

      const allAdjustmentResults = await client.query({
        query: ALL_ADJUSTMENT,
        variables: {
          userId: authId,
        },
      });

      const { allAdjustment } = allAdjustmentResults.data;

      setAdjustmentOption(allAdjustment);
    };

    fetchAdjustment();
  }, [match, client, pipelineId]);

  const [updateIform] = useMutation(UPDATE_IFORM);

  if (loading || loadingTemp) return <div className="mt-2">loading...</div>;
  if (error || errorTemp) {
    if (!setErrorMessage(error) === 'no record found')
      cogoToast.error(setErrorMessage(error));
  }
  const { iform = {} } = data;
  const { iformTemp = {} } = dataTemp;

  const handleLoadIformTemp = async () => {
    const newInformTemp = removeTypeName(iformTemp);
    delete newInformTemp.id;
    delete newInformTemp.history;
    delete newInformTemp.pipelineId;

    const newIform = removeTypeName(iform);
    delete newIform.id;
    delete newIform.history;
    delete newIform.pipelineId;

    const newInputs = {
      ...newIform,
      ...newInformTemp,
    };

    try {
      await updateIform({
        variables: {
          pipelineId,
          input: newInputs,
        },
        refetchQueries: [{ query: IFORM, variables: { pipelineId } }],
      });
      cogoToast.success('Iform successfully updated');
    } catch (e) {
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <Container className="my-3" fluid>
      <IFormTypeModal pipelineId={pipelineId} iform={iform} />
      <Tabs defaultActiveKey="grid">
        <Tab eventKey="grid" title="Grid">
          <Grid pipelineId={pipelineId} iform={iformTemp} />
        </Tab>
        <Tab eventKey="comparables" title="Comparables">
          <Comparables
            pipelineId={pipelineId}
            iform={iform}
            onRefetchIform={refetch}
            onLoadIformTemp={handleLoadIformTemp}
            adjustmentOption={adjustmentOption}
          />
        </Tab>
        <Tab eventKey="photos" title="Photos">
          <Photos pipelineId={pipelineId} iform={iform} />
        </Tab>
        <Tab eventKey="repairs" title="Repairs">
          <Repairs pipelineId={pipelineId} iform={iform} />
        </Tab>
        <Tab eventKey="values" title="Values">
          <Values pipelineId={pipelineId} iform={iform} />
        </Tab>
      </Tabs>
    </Container>
  );
};

IForm.propTypes = {
  match: shape({}),
  client: shape({}),
};

IForm.defaultProps = {
  match: {},
  client: {},
};

export default withApollo(IForm);

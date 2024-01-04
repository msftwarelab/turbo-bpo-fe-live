import React, { useState, useEffect } from 'react';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import pick from 'lodash/pick';
import { bool, func, shape } from 'prop-types';
import { withApollo } from 'react-apollo';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import setErrorMessage from 'utils/setErrorMessage';
import removeTypeName from 'utils/removeTypeName';
import removeNull from 'utils/removeNull';
import ALL_PIPELINE from 'queries/allPipeline';
import USER from 'queries/user';
import deepDiff from 'utils/deepDiff';
import PipelineForm from 'components/PipelineForm';
import PIPELINE_STATE from 'queries/pipelineState';
import setPriceModule from 'utils/setPriceModule';
import { UPDATE_PIPELINE } from './mutations';

const EditPipeline = ({ hasAuthor, onClose, pipeline, client, filter }) => {
  const [isLoading, setLoading] = useState(false);
  const { pipelineHistory } = pipeline;
  const [editedPipeline, setEditedPipeline] = useState({
    ...removeTypeName(pipeline),
    isEdit: true,
    hasAuthor,
  });
  const handleLatLng = async () => {
    const geoCodes = await geocodeByAddress(editedPipeline.address);
    const latlng = await getLatLng(geoCodes[0]);
    setEditedPipeline({ ...editedPipeline, latlng });
  };

  useEffect(() => {
    handleLatLng();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipeline]);
  const { error, data = {}, loading: pipelineStateLoading } = useQuery(
    PIPELINE_STATE
  );
  const {
    error: userError,
    data: userData = {},
    loading: userLoading,
  } = useQuery(USER, {
    variables: {
      id: pipeline.authorId,
    },
  });
  if (error) return cogoToast.error(setErrorMessage(error));
  const { pipelineState = {} } = data;

  if (userError) return cogoToast.error(setErrorMessage(error));
  const { user = {} } = userData;
  const { priceModule = {} } = user;

  const handleSubmit = async fields => {
    const fieldsUsed = [
      'authorId',
      'address',
      'country',
      'location',
      'company',
      'companyId',
      'premiumCompanyId',
      'premiumCompany',
      'type',
      'orderType',
      'objective',
      'assign',
      'assignId',
      'mls',
      'isRushOrder',
      'isSuperRush',
      'isInspection',
      'isInitialBpo',
      'orderFee',
      'totalFee',
      'isSyncedToTurboBpo',
      'status',
      'isHold',
      'holdRemarks',
      'unHoldRemarks',
      'cancelRemarks',
    ];
    setLoading(true);

    const oldInput = pick(editedPipeline, fieldsUsed);
    const newInput = pick(fields, fieldsUsed);
    const changedInput = deepDiff(oldInput, newInput);

    if (changedInput.status && changedInput.status === 'STANDBY') {
      delete changedInput.orderFee;
      delete changedInput.totalFee;
    }
    try {
      const {
        data: { updatePipeline },
      } = await client.mutate({
        mutation: UPDATE_PIPELINE,
        variables: {
          id: pipeline.id,
          input: removeNull(changedInput),
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter },
          },
        ],
      });

      setLoading(false);
      if (updatePipeline) {
        let message = 'Hold';
        if (changedInput.status === 'CANCEL') message = 'Cancelled';
        if (changedInput.status === 'STANDBY') message = 'Standby';
        cogoToast.success(message);
      } else cogoToast.error(setErrorMessage());
      onClose();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };
  return (
    <PipelineForm
      initialValues={editedPipeline}
      onSubmit={handleSubmit}
      isLoading={isLoading || pipelineStateLoading || userLoading}
      onClose={onClose}
      filter={filter}
      pipelineState={setPriceModule(priceModule, pipelineState)}
      pipelineHistory={pipelineHistory}
    />
  );
};

EditPipeline.propTypes = {
  hasAuthor: bool,
  onClose: func,
  pipeline: shape({}),
  client: shape({}),
  filter: shape({}),
};

EditPipeline.defaultProps = {
  hasAuthor: false,
  onClose: e => e,
  pipeline: {},
  client: {},
  filter: {},
};

export default withApollo(EditPipeline);

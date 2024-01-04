import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import setErrorMessage from 'utils/setErrorMessage';
import orderId from 'order-id';
import ConfirmModal from 'components/ConfirmModal';
import IFORM from 'queries/iform';
import removeNull from 'utils/removeNull';
import PipelineForm from 'components/PipelineForm';
import ALL_PIPELINE from 'queries/allPipeline';
import PIPELINE_STATE from 'queries/pipelineState';
import SAVE_PIPELINE from 'mutations/savePipeline';
import { useMe } from 'contexts/Me';
import SAVE_PIPELINE_NOTE from 'mutations/savePipelineNote';
import setPriceModule from 'utils/setPriceModule';
import { bool, func, shape } from 'prop-types';

const orderIdwithKey = orderId('order-id-key');

const AddPipeline = ({
  hasAuthor = false,
  onClose,
  onCreate,
  client,
  filter,
}) => {
  const { me } = useMe();
  const isClient = me.roles.includes('CLIENT');
  const [isShowAddPipelineNotes, setShowAddPipelineNotes] = useState(false);
  const [duplicatePipeline, setDuplicatePipeline] = useState(null);
  const [fields, setFields] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { error, data = {} } = useQuery(PIPELINE_STATE);
  if (error) return cogoToast.error(setErrorMessage(error));
  const { pipelineState = {} } = data;

  const checkUniqueAddress = async address => {
    try {
      const {
        data: { allPipeline },
      } = await client.query({
        query: ALL_PIPELINE,
        variables: {
          filter: { address, limit: 1, offset: 0 },
        },
      });
      const { results = [] } = allPipeline;
      if (results.length) return results[0];
      return null;
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
      return null;
    }
  };

  const handleSubmit = async currentFields => {
    const input = { ...currentFields };
    delete input.latlng;
    delete input.hasAuthor;
    try {
      const {
        data: { savePipeline },
      } = await client.mutate({
        mutation: SAVE_PIPELINE,
        variables: {
          input: removeNull(input),
        },
        refetchQueries: [
          {
            query: ALL_PIPELINE,
            variables: { filter },
          },
        ],
      });
      setLoading(false);
      if (savePipeline) cogoToast.success('Complete');
      else cogoToast.error(setErrorMessage());
      onCreate();
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  const handleCloseAddPipelineNotes = () => {
    setShowAddPipelineNotes(false);
  };

  const handleCancelPipelineNotes = () => {
    handleCloseAddPipelineNotes();
    onClose();
  }

  const handleUniqueAddress = async input => {
    setLoading(true);
    const pipeline = await checkUniqueAddress(input.address);
    if (pipeline) {
      setShowAddPipelineNotes(true);
      setDuplicatePipeline(pipeline);
      setFields(input);
      setLoading(false);
    } else {
      handleSubmit(input);
    }
  };

  const createOrderNoteString = iform => `
    Sales Comp1 Address: ${iform.txtSaleComp1Address || '-'},
    Sales Comp1 Tax ID/MLS Number: ${iform.txtSaleComp1MLSNumber || '-'},
    Sales Comp2 Address: ${iform.txtSaleComp2Address || '-'},
    Sales Comp2 Tax ID/MLS Number: ${iform.txtSaleComp2MLSNumber || '-'},
    Sales Comp3 Address: ${iform.txtSaleComp3Address || '-'},
    Sales Comp3 Tax ID/MLS Number: ${iform.txtSaleComp3MLSNumber || '-'},
    List Comp1 Address: ${iform.txtListComp1Address || '-'},
    List Comp1 Tax ID/MLS Number: ${iform.txtListComp1MLSNumber || '-'},
    List Comp2 Address: ${iform.txtListComp2Address || '-'},
    List Comp2 Tax ID/MLS Number: ${iform.txtListComp2MLSNumber || '-'},
    List Comp3 Address: ${iform.txtListComp3Address || '-'},
    List Comp3 Tax ID/MLS Number: ${iform.txtListComp3MLSNumber || '-'},
  `;

  const handleAcceptDuplicate = async () => {
    let iformResponse = {};
    try {
      const {
        data: { iform },
      } = await client.query({
        query: IFORM,
        variables: {
          pipelineId: duplicatePipeline.id,
        },
      });
      iformResponse = iform;
      handleCloseAddPipelineNotes();
    } catch (e) {
      if (setErrorMessage(e) !== 'no record found')
        cogoToast.error(setErrorMessage(e));
    }

    try {
      await client.mutate({
        mutation: SAVE_PIPELINE_NOTE,
        variables: {
          pipelineId: duplicatePipeline.id,
          input: {
            orderNotes: createOrderNoteString(iformResponse),
          },
        },
      });
      handleSubmit(fields);
    } catch (e) {
      setLoading(false);
      cogoToast.error(setErrorMessage(e));
    }
  };

  return (
    <>
      <PipelineForm
        initialValues={{
          orderNumber: orderIdwithKey.generate(),
          hasAuthor,
          authorId: null,
          address: null,
          country: null,
          location: null,
          companyId: null,
          company: null,
          zipCode: null,
          premiumCompanyId: null,
          premiumCompany: null,
          otherCompany: null,
          type: 'Order',
          orderType: null,
          objective: null,
          assign: null,
          assignId: null,
          mls: null,
          isRushOrder: false,
          isSuperRush: false,
          isInspection: false,
          isInitialBpo: false,
          orderFee: 0,
          totalFee: 0,
          isSyncedToTurboBpo: true,
          latlng: null,
        }}
        pipelineState={setPriceModule(
          isClient ? me.priceModule : {},
          pipelineState
        )}
        onSubmit={handleUniqueAddress}
        isLoading={isLoading}
        onClose={onClose}
      />
      <ConfirmModal
        show={isShowAddPipelineNotes}
        closeButton={false}
        title="Address history"
        description="Address already added, do you want to continue?"
        onAccept={handleAcceptDuplicate}
        onClose={handleCancelPipelineNotes}
        isLoading={isLoading}
      />
    </>
  );
};

AddPipeline.propTypes = {
  hasAuthor: bool,
  onClose: func,
  onCreate: func,
  client: shape({}),
  filter: shape({}),
};

AddPipeline.defaultProps = {
  hasAuthor: false,
  onClose: e => e,
  onCreate: e => e,
  client: {},
  filter: {},
};

export default withApollo(AddPipeline);

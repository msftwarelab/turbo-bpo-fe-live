import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ProgressBar, Card } from 'react-bootstrap';
import setErrorMessage from 'utils/setErrorMessage';
import PIPELINE_STATE from 'queries/pipelineState';
import { StyledCardBody, StyledLabel, StyledLabelStart } from './styles';

const TurboLoad = () => {
  const { loading, error, data = {} } = useQuery(PIPELINE_STATE);
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { pipelineState = {} } = data;
  const tLSlow = pipelineState.tLSlow.split('-');
  const tLModerate = pipelineState.tLModerate.split('-');
  const tLBusy = pipelineState.tLBusy.split('-');
  let color = '';
  let percentage = 0;
  if (
    pipelineState.todayOrderCount >= tLSlow[0] &&
    pipelineState.todayOrderCount <= tLSlow[1]
  ) {
    color = 'green';
    percentage = 25;
  } else if (
    pipelineState.todayOrderCount >= tLModerate[0] &&
    pipelineState.todayOrderCount <= tLModerate[1]
  ) {
    color = 'warning';
    percentage = 50;
  } else if (
    pipelineState.todayOrderCount >= tLBusy[0] &&
    pipelineState.todayOrderCount <= tLBusy[1]
  ) {
    color = 'danger';
    percentage = 75;
  } else if (pipelineState.todayOrderCount > tLBusy[1]) {
    color = 'danger';
    percentage = 100;
  }

  return (
    <Card>
      <Card.Header>Turbo Meter | Projected TAT in Hours</Card.Header>
      <StyledCardBody className="px-5">
        <div className="d-flex">
          <StyledLabelStart>
            {'<'}
            {pipelineState.tTSlow}
          </StyledLabelStart>
          <StyledLabel className="text-right">
            &nbsp;<span>{pipelineState.tTSlow}</span>
          </StyledLabel>
          <StyledLabel className="text-right">
            <span>{pipelineState.tTModerate}</span>
          </StyledLabel>
          <StyledLabel className="text-right">
            <span>{pipelineState.tTBusy}</span>
          </StyledLabel>
          <StyledLabel className="text-right">
            <span>{pipelineState.tTMax}</span>
          </StyledLabel>
        </div>
        <ProgressBar variant={color} now={percentage} />
      </StyledCardBody>
    </Card>
  );
};

export default TurboLoad;

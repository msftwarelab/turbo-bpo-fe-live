import gql from 'graphql-tag';

const ALL_PIPELINE_NOTE = gql`
  query AllPipelineNote($pipelineId: ID!, $filter: FilterInput) {
    allPipelineNote(pipelineId: $pipelineId, filter: $filter) {
      totalCount
      results {
        id
        orderNotes
        inspectionNotes
        exteriorRepairDescription1
        exteriorRepairPrice1
        exteriorRepairDescription2
        exteriorRepairPrice2
        exteriorRepairDescription3
        exteriorRepairPrice3
        exteriorRepairDescription4
        exteriorRepairPrice4
        exteriorRepairDescription5
        exteriorRepairPrice5
        exteriorRepairDescription6
        exteriorRepairPrice6
        exteriorRepairDescription7
        exteriorRepairPrice7
        exteriorRepairDescription8
        exteriorRepairPrice8
        exteriorRepairDescription9
        exteriorRepairPrice9
        exteriorRepairDescription10
        exteriorRepairPrice10
        exteriorRepairPriceTotal
        interiorRepairDescription1
        interiorRepairPrice1
        interiorRepairDescription2
        interiorRepairPrice2
        interiorRepairDescription3
        interiorRepairPrice3
        interiorRepairDescription4
        interiorRepairPrice4
        interiorRepairDescription5
        interiorRepairPrice5
        interiorRepairDescription6
        interiorRepairPrice6
        interiorRepairDescription7
        interiorRepairPrice7
        interiorRepairDescription8
        interiorRepairPrice8
        interiorRepairDescription9
        interiorRepairPrice9
        interiorRepairDescription10
        interiorRepairPrice10
        interiorRepairPriceTotal
        createdBy
        createdDateTime
      }
    }
  }
`;

export default ALL_PIPELINE_NOTE;

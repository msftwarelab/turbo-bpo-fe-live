import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import setErrorMessage from 'utils/setErrorMessage';
import Pagination from 'components/Pagination';
import { arrayOf, shape, string, func } from 'prop-types';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';
import PhotosTable from './components/PhotosTable';
import PhotosThumb from './components/PhotosThumb';

const PipelinePhotoList = ({
  selectedPhotos = [],
  onSelectedPhotos = e => e,
  pipeline = {},
  filter = {},
  view = 'LIST',
  pipelineFilter = e => e,
  onChangeFilter = e => e,
}) => {
  const { loading, error, data = {} } = useQuery(ALL_PIPELINE_PHOTO, {
    variables: {
      pipelineId: pipeline.id,
      filter,
    },
  });
  if (error) cogoToast.error(setErrorMessage(error));
  const handleFilter = e => {
    onChangeFilter({
      ...filter,
      offset: e.selected * filter.limit,
    });
  };
  
  const { allPipelinePhoto = {} } = data;
  const { totalCount = 0, results = [] } = allPipelinePhoto;
  const pageCount = Math.ceil(totalCount / filter.limit);

  const handleSelectedPhoto = e => {
    let newSelectedPhotos = [...selectedPhotos, e];
    if (selectedPhotos.map(item => item.id).includes(e.id)) {
      newSelectedPhotos = selectedPhotos.filter(item => item.id !== e.id);
    }
    onSelectedPhotos(newSelectedPhotos);
  };

  const handleAllSelectedPhotos = () => {
    let newSelectedPhotos = results;
    if (
      results.some(item =>
        selectedPhotos.map(selected => selected.id).includes(item.id)
      )
    ) {
      newSelectedPhotos = [];
    }
    onSelectedPhotos(newSelectedPhotos);
  };

  const handleDeletePhoto = id => {
    const newSelectedPhotos = selectedPhotos.filter(item => item.id !== id);
    onSelectedPhotos(newSelectedPhotos);
  };

  return (
    <>
      {view === 'LIST' ? (
        <PhotosTable
          selectedPhotos={selectedPhotos}
          onSelectPhoto={handleSelectedPhoto}
          onAllSelectedPhotos={handleAllSelectedPhotos}
          loading={loading}
          data={results}
          pipelineId={pipeline.id}
          filter={filter}
          pipelineFilter={pipelineFilter}
          onDelete={handleDeletePhoto}
        />
      ) : (
        <PhotosThumb
          selectedPhotos={selectedPhotos}
          onSelectPhoto={handleSelectedPhoto}
          loading={loading}
          data={results}
          pipelineId={pipeline.id}
          filter={filter}
          pipelineFilter={pipelineFilter}
          onDelete={handleDeletePhoto}
        />
      )}
      {results && results.length ? (
        <Pagination
          pageCount={pageCount}
          onPageChange={handleFilter}
          currentPage={filter.offset / filter.limit}
        />
      ) : null}
    </>
  );
};

PipelinePhotoList.defaultProps = {
  selectedPhotos: [],
  onSelectedPhotos: e => e,
  pipeline: {},
  filter: {},
  view: 'LIST',
  pipelineFilter: {},
  onChangeFilter: e => e,
};

PipelinePhotoList.propTypes = {
  selectedPhotos: arrayOf(shape({})),
  onSelectedPhotos: func,
  pipeline: shape({}),
  filter: shape({}),
  view: string,
  pipelineFilter: shape({}),
  onChangeFilter: func,
};

export default PipelinePhotoList;

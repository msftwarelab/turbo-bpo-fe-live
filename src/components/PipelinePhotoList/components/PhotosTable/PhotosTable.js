import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import moment from 'moment';
import { arrayOf, shape, func, bool, string } from 'prop-types';
import bytesToSize from 'utils/bytesToSize';
import { useMe } from 'contexts/Me';
import PipelinePhotoSubmitSwitch from 'components/PipelinePhotoSubmitSwitch';
import PipelinePhotoAllSubmitSwitch from 'components/PipelinePhotoAllSubmitSwitch';
import DeletePhoto from '../DeletePhoto';

const PhotosTable = ({
  selectedPhotos,
  onSelectPhoto = e => e,
  onAllSelectedPhotos = e => e,
  loading,
  data = [],
  pipelineId,
  filter,
  pipelineFilter,
  onDelete = e => e,
}) => {
  const { me } = useMe();
  const renderLoading = (
    <tr>
      <td colSpan={5} className="text-center">
        loading...
      </td>
    </tr>
  );

  const [isSwitchLoading, setSwitchLoading] = useState(false);

  const renderRow = data.length ? (
    data.map(item => (
      <tr key={item.id}>
        <td>
          <Form.Group>
            <Form.Check
              type="checkbox"
              checked={selectedPhotos
                .map(select => select.id)
                .includes(item.id)}
              onChange={() => onSelectPhoto(item)}
            />
          </Form.Group>
        </td>
        <td>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.fileName}
          </a>
        </td>
        <td>{bytesToSize(item.fileSize)}</td>
        <td>
          {moment(item.createdDateTime).format('MMM DD YYYY, hh:mm A')} by{' '}
          {item.createdBy}
        </td>
        <td>
          <PipelinePhotoSubmitSwitch
            filter={filter}
            pipelinePhotoId={item.id}
            isSubmitted={item.isSubmitted}
            pipelineId={pipelineId}
            isSwitchLoading={isSwitchLoading}
            handleSwitch={setSwitchLoading}
          />
        </td>
        {me.permissionList.includes('CAN_DELETE_PIPELINE_PHOTO') && (
          <td className="text-center">
            <DeletePhoto
              photo={item}
              filter={filter}
              pipelineFilter={pipelineFilter}
              pipelineId={pipelineId}
              onDelete={onDelete}
            />
          </td>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={10} className="text-center">
        No data yet...
      </td>
    </tr>
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Group>
              <Form.Check
                type="checkbox"
                checked={data.every(item =>
                  selectedPhotos.map(selected => selected.id).includes(item.id)
                )}
                onClick={onAllSelectedPhotos}
              />
            </Form.Group>
          </th>
          <th>File</th>
          <th>Size</th>
          <th>Date</th>
          <th>
            <PipelinePhotoAllSubmitSwitch
              label="Submit Order"
              filter={filter}
              pipelinePhotos={data}
              isSubmitted={data.every(item => item.isSubmitted)}
              pipelineId={pipelineId}
              isSwitchLoading={isSwitchLoading}
              handleSwitch={setSwitchLoading}
            />
          </th>
          {me.permissionList.includes('CAN_DELETE_PIPELINE_PHOTO') && (
            <th className="text-center">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>{loading ? renderLoading : renderRow}</tbody>
    </Table>
  );
};

PhotosTable.propTypes = {
  selectedPhotos: arrayOf(shape({})),
  onSelectPhoto: func,
  onAllSelectedPhotos: func,
  loading: bool,
  data: arrayOf(shape({})),
  pipelineId: string,
  filter: shape({}),
  pipelineFilter: shape({}),
  onDelete: func,
};

PhotosTable.defaultProps = {
  selectedPhotos: [],
  onSelectPhoto: e => e,
  onAllSelectedPhotos: e => e,
  loading: false,
  data: [],
  pipelineId: null,
  filter: {},
  pipelineFilter: {},
  onDelete: e => e,
};

export default PhotosTable;

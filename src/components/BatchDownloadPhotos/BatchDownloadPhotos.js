import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';
import ALL_PIPELINE_PHOTO from 'queries/allPipelinePhoto';

const urlToPromise = url =>
  new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const BatchDownloadPhotos = ({
  label = 'Export Photos',
  zipName = 'Batch_Export',
  selectedPipeline = [],
  client = {},
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleDownload = async () => {
    if (!selectedPipeline.length) {
      cogoToast.warn('No pipeline selected');
      return;
    }
    const promisedQuery = selectedPipeline.map(pipeline => {
      return client.query({
        query: ALL_PIPELINE_PHOTO,
        variables: {
          pipelineId: pipeline.id,
          filter: {
            limit: 100,
            offset: 0,
          },
        },
      });
    });

    const pipelinePhotos = await Promise.all(promisedQuery);
    const zip = new JSZip();
    const zipFilename = `${zipName}.zip`;
    pipelinePhotos.map((pipelinePhoto, key) => {
      const { allPipelinePhoto } = pipelinePhoto.data;
      const { results = [] } = allPipelinePhoto;
      var folder = zip.folder(selectedPipeline[key].address);
      results.forEach(file => {
        folder.file(file.fileName, urlToPromise(file.url), { binary: true });
      });
      return false;
    });
    zip
      .generateAsync({ type: 'blob' }, () => setLoading(true))
      .then(
        blob => {
          saveAs(blob, zipFilename);
          setLoading(false);
        },
        e => console.log(e)
      );
  };
  return (
    <>
      <Button onClick={handleDownload} disabled={isLoading}>
        {label}
      </Button>
    </>
  );
};

export default withApollo(BatchDownloadPhotos);

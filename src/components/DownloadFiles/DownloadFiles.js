import React, { useState } from 'react';
import cogoToast from 'cogo-toast';
import { Button } from 'react-bootstrap';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'save-as';

const urlToPromise = url =>
  new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const DownloadFiles = ({
  label = 'Download',
  zipName = 'Batch_Files',
  selectedFiles = [],
}) => {
  const [isLoading, setLoading] = useState(false);

  const generateZip = (zipFilename, isSubmitted) => {
    const zip = new JSZip();
    selectedFiles.forEach(file => {
      const fileName =
        file.isSubmitted === true
          ? file.fileName
          : `NO_SUBMIT_${file.fileName}`;
      return file.isSubmitted === isSubmitted
        ? zip.file(fileName, urlToPromise(file.url), { binary: true })
        : null;
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

  const checkFiles = (zipFilename, bool) => {
    selectedFiles.every(file => {
      if(file.isSubmitted === bool){
        generateZip(zipFilename, bool);
        return false;
      }
      return true;
    })
  } ;

  const handleDownload = () => {
    if (!selectedFiles.length) {
      cogoToast.warn('No files selected');
      return;
    }
    const zipFilename = `${zipName}.zip`;

    checkFiles(zipFilename, true);
    checkFiles(`NO_SUBMIT_${zipFilename}`, false);
  };
  return (
    <>
      <Button onClick={handleDownload} disabled={isLoading}>
        {label}
      </Button>
    </>
  );
};

export default DownloadFiles;

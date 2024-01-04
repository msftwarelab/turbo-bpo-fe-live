import React, { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import ChooseImageModal from 'components/ChooseImageModal';
import 'react-image-crop/dist/ReactCrop.css';

const ImagePreview = ({ url, onChange }) => {
  const [isShow, setShow] = useState(false);
  const [src, setSrc] = useState(url ? url : 'https://via.placeholder.com/150');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSrc = src => {
    setSrc(src);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status === 200) {
        const file = this.response;
        file.lastModifiedDate = new Date();
        file.name = 'profilePic.png';
        onChange(file);
      }
    };
    xhr.send();
  };

  return (
    <>
      <div className="mb-2">
        <Image fluid src={src} rounded />
      </div>
      <Button style={{ width: 150 }} onClick={handleShow}>
        Upload Portrait
      </Button>
      <ChooseImageModal
        show={isShow}
        onClose={handleClose}
        onUseImage={handleSrc}
      />
    </>
  );
};

export default ImagePreview;

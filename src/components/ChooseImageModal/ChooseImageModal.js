import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';

class ChooseImageModal extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 150,
      aspect: 1 / 1,
    },
    croppedImageUrl: null,
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  onUseImage = () => {
    const { croppedImageUrl } = this.state;
    const { onUseImage, onClose } = this.props;
    onUseImage(croppedImageUrl);
    onClose();
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  render() {
    const { show, onClose } = this.props;
    const { src, crop } = this.state;
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control type="file" onChange={this.onSelectFile} />
          {src && (
            <div className="mt-3">
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose} variant="primary">
            Close
          </Button>
          <Button onClick={this.onUseImage} variant="warning">
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChooseImageModal;

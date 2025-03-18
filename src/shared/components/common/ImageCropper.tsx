import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import { cropImage } from '@shared/utils/cropUtils';

interface ImageCropperProps {
  open: boolean;
  image: string | undefined;
  onComplete: (imagePromise: Promise<string>) => void;
  containerStyle?: React.CSSProperties;
  aspect: number;
  onClose: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  open,
  image,
  onComplete,
  containerStyle,
  aspect,
  onClose,
  ...props
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { x: number, y: number, width: number, height: number }>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const step = 5;
      if (event.key === 'ArrowUp') {
        setCrop(prev => ({ ...prev, y: prev.y - step }));
      } else if (event.key === 'ArrowDown') {
        setCrop(prev => ({ ...prev, y: prev.y + step }));
      } else if (event.key === 'ArrowLeft') {
        setCrop(prev => ({ ...prev, x: prev.x - step }));
      } else if (event.key === 'ArrowRight') {
        setCrop(prev => ({ ...prev, x: prev.x + step }));
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        Crop Image
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 10,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={containerStyle}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
            {...props}
          />
        </div>
      </DialogContent>

      <div className="controls mx-6">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(_, zoom) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />
      </div>

      <DialogActions>
        <Button
          color="primary"
          onClick={() =>
            onComplete(cropImage(image, croppedAreaPixels, console.error))
          }
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;

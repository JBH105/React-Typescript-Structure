import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, useMediaQuery, useTheme, IconButton, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import CloseIcon from '@mui/icons-material/Close';
import { CustomConfirmModalProps } from '../interface/IConfirmDialogModal';

const CustomConfirmModal: React.FC<CustomConfirmModalProps> = ({
  open,
  onClose,
  icon = 'hugeicons:tick-double-01',
  headerText = 'Default Header Text',
  contentText,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Yes',
  onConfirm = () => {},
  iconColor = '',
  showDeleteField = false,
  height = 250
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const headerFontSize = fullScreen ? '16px' : '20px';
  const contentFontSize = fullScreen ? '12px' : '14px';
  const buttonFontSize = fullScreen ? '12px' : '14px';

  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!open) {
      setInputValue('');
      setIsButtonDisabled(true);
    }
  }, [open]);

  // Handle input changes and validate the text
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.trim().toLowerCase() !== 'delete');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: fullScreen ? '85%' : 450,
          height: fullScreen ? 'auto' : height ? height : 250,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: fullScreen ? 1.5 : 2,
          outline: 'none',
          animation: `${open ? 'modal-open 0.3s ease-out' : ''}`,
          '@keyframes modal-open': {
            '0%': { opacity: 0, transform: 'translate(-50%, -30%) scale(0.8)' },
            '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
          }
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <div className="h-[3.5rem] w-20">
          <Icon icon={icon} width={40} height={40} style={{ marginBottom: '10px', color: iconColor }} className="text-center mx-auto" />
        </div>

        <Typography
          component="h2"
          sx={{
            color: '#494949',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: headerFontSize,
            mb: 0.5
          }}
        >
          {headerText}
        </Typography>

        {contentText && (
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'gray',
              fontSize: contentFontSize,
              mb: 1
            }}
          >
            {contentText}
          </Typography>
        )}

        {/* Conditionally render the TextField */}
        {showDeleteField && (
          <>
            <TextField
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type 'delete' to confirm"
              variant="outlined"
              sx={{
                marginBottom: '8px',
                width: '50%',
                height: '30px',
                '& .MuiInputBase-root': {
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center'
                },
                '& .MuiOutlinedInput-root': {
                  padding: '0 12px'
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  padding: '8px 0',
                  textAlign: 'center'
                },
                '& .MuiInputLabel-root': {
                  display: 'none'
                }
              }}
            />

            <Typography variant="caption" sx={{ color: 'gray', textAlign: 'center', marginBottom: 2 }}>
              Note: To confirm deletion, type the word "delete" exactly.
            </Typography>
          </>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          <Button
            sx={{
              color: '#737373',
              fontSize: buttonFontSize,
              paddingX: fullScreen ? '2rem' : '3.5rem',
              backgroundColor: '#D9D9D9',
              '&:hover': { backgroundColor: '#C0C0C0' },
              borderRadius: 1,
              textTransform: 'none'
            }}
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>

          <Button
            sx={{
              color: '#FFFFFF',
              fontSize: buttonFontSize,
              paddingX: fullScreen ? '2rem' : '3.5rem',
              backgroundColor: '#00B894',
              '&:hover': { backgroundColor: '#009977' },
              borderRadius: 1,
              textTransform: 'none'
            }}
            onClick={onConfirm}
            disabled={showDeleteField && isButtonDisabled}
          >
            {confirmButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomConfirmModal;

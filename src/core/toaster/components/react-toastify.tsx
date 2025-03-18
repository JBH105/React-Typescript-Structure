import { Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const Toast: React.FC<ToastProps> = ({ message, severity }) => {
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    if (message) {
      setQueue((prevQueue) => [...prevQueue, message]);
    }
  }, [message]);

  useEffect(() => {
    if (queue.length > 0) {
      setCurrentMessage(queue[0]);
      setOpen(true);

      const timer = setTimeout(() => {
        setQueue((prevQueue) => prevQueue.slice(1));
        setOpen(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [queue]);

  const handleClose = () => {
    setOpen(false);
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  return (
    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
      <Alert severity={severity} variant="filled" onClose={handleClose}>
        {currentMessage.split('@@')[0]}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

import { useState } from 'react';
import axios from 'axios';
import { APP_MESSAGES } from '@shared/constant/app-message';
import { showToastify } from '@shared/components/common/CustomToast';

const useProcessQueue = () => {
  const [processedPaths, setProcessedPaths] = useState<{ method: string; path: string }[]>([]);
  const [failedPaths, setFailedPaths] = useState<{ method: string; path: string }[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const processQueue = async () => {
    const queueData = localStorage.getItem('queueData');
    let parseQueueData = [];
    let count = 0;
    let totalRequests = 0;
    const processedPaths: { method: string; path: string }[] = [];
    const failedPaths: { method: string; path: string }[] = [];

    if (queueData) {
      const parsed = JSON.parse(queueData);
      parseQueueData = Array.isArray(parsed) ? parsed : [parsed];
    }

    if (parseQueueData.length !== 0) {
      totalRequests = parseQueueData.length;

      const promises = parseQueueData.map(async (request) => {
        const isOnline = navigator.onLine;
        if (isOnline) {
          try {
            await axios({
              data: request?.payloadData,
              method: request?.requestMethod,
              url: request?.apiUrl,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            processedPaths.push({ method: request.requestMethod, path: request.extractedPath });
            count++;
          } catch (error) {
            failedPaths.push({ method: request.requestMethod, path: request.extractedPath });
            showToastify(`${APP_MESSAGES.QUEUE_ERROR} ${request.extractedPath}.`, 'error');
          }
          parseQueueData.shift();
          localStorage.setItem('queueData', JSON.stringify(parseQueueData));
        }
      });

      await Promise.all(promises);

      if (count === totalRequests) {
        showToastify(APP_MESSAGES.QUEUE_SUCCESS, 'success');
      } else if (count > 0) {
        showToastify(`${count} ${APP_MESSAGES.QUEUE_WARNING}, ${totalRequests - count} failed.`, 'warning');
      }

      if (processedPaths.length > 0 || failedPaths.length > 0) {
        setProcessedPaths(processedPaths);
        setFailedPaths(failedPaths);
        handleOpen();
      }
    }
  };

  return { processedPaths, failedPaths, open, handleClose, processQueue };
};

export default useProcessQueue;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationBlocker = (isRefreshBlocked: boolean = false, isNavigationBlocked: boolean = true) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [nextLocation, setNextLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePopstate = (event: PopStateEvent) => {
    if (isNavigationBlocked && nextLocation && event.state?.path !== nextLocation) {
      setDialogOpen(true);
      event.preventDefault();
    }
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (isRefreshBlocked) {
      const message = 'You have marked attendance but have not saved it. Are you sure you want to leave?';
      event.returnValue = message;
      setDialogOpen(true);
      return message;
    }
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    if (nextLocation) {
      navigate(nextLocation);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (isNavigationBlocked) {
      window.addEventListener('popstate', handlePopstate);
    }
    if (isRefreshBlocked) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isNavigationBlocked, isRefreshBlocked, nextLocation]);

  const setNextLocationHandler = (url: string) => {
    if (isNavigationBlocked) {
      setNextLocation(url);
      navigate(url, { replace: true });
    }
  };

  return { isDialogOpen, handleConfirm, handleCancel, setNextLocationHandler };
};

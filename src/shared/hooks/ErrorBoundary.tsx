import showToast from '@core/toaster/notification.service';
import { APP_MESSAGES } from '@shared/constant/app-message';
import { useEffect } from 'react';
import error_img from '@assets/images/downfall-concept-illustration.png';

const ErrorBoundaryComponent = () => {
  useEffect(() => {
    showToast(APP_MESSAGES.BOUNDARY_ERROR, 'error');

    setTimeout(() => {
      location.replace('/');
    }, 200000);
  }, []);
  return (
    <div className="flex items-center justify-center flex-col h-screen space-y-12">
      <p className="text-2xl text-center font-semibold text-[#1C2F36]">Aaaah! Something Went Wrong</p>
      <div className="h-96 w-96 mx-auto">
        <img src={error_img} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default ErrorBoundaryComponent;

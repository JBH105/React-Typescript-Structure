import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop({ status = false }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={status}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

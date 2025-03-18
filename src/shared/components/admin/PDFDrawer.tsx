import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import { MdKeyboardBackspace } from 'react-icons/md';

interface PDFDrawerProps {
  open: boolean;
  pdfUrl: string | null;
  pdfUrlTypeName?: string;
  onClose: () => void;
}

const PDFDrawer: React.FC<PDFDrawerProps> = ({ open, pdfUrl, pdfUrlTypeName, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="">
        <div></div>
      </div>
      <div style={{ width: '70vw', padding: '0 10px' }}>
        <div className="flex items-center gap-3">
          <IconButton onClick={onClose} style={{ float: 'left' }}>
            <MdKeyboardBackspace className="text-xl xl:text-2xl" />
          </IconButton>
          {pdfUrlTypeName && <p className="text-[#707070] font-medium text-sm xl:text-base">{pdfUrlTypeName}</p>}
        </div>
        {pdfUrl ? (
          <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="100%" style={{ border: 'none', height: '90vh' }} />
        ) : (
          <p className="text-sm xl:text-base text-center">No PDF selected</p>
        )}
      </div>
    </Drawer>
  );
};

export default PDFDrawer;

import React from 'react';
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/system';

interface ChipProps {
  label: string | number;
  className?: string;
}

interface PointingArrowTooltipProps extends TooltipProps {
  className?: string;
  tooltipbgColor?: string;
  tooltipArrowColor?: string;
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
  boxShadow?: string;
  padding?: string;
  wordSpacing?: string;
  letterSpacing?: string;
}

const PointingArrowTooltipComponent = ({ className, ...props }: PointingArrowTooltipProps) => {
  return <Tooltip {...props} arrow classes={{ popper: className }} />;
};

export const PointingArrowTooltip = styled(PointingArrowTooltipComponent)(
  ({
    tooltipbgColor,
    tooltipArrowColor,
    textColor,
    fontWeight,
    fontSize,
    boxShadow,
    padding,
    wordSpacing,
    letterSpacing
  }: PointingArrowTooltipProps) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: tooltipArrowColor || '#000',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: tooltipbgColor || '#fff',
      color: textColor || '#000',
      fontWeight: fontWeight || '600',
      fontSize: fontSize || '0.8rem',
      boxShadow: boxShadow || 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      width: 'auto',
      maxWidth: 'fit-content',
      padding: padding || '0.2rem 0.4rem',
      wordSpacing: wordSpacing || 'normal',
      letterSpacing: letterSpacing || 'normal'
    }
  })
);

const Chip: React.FC<ChipProps> = ({ label, className }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-slate-600 font-semibold bg-slate-200 shadow-sm ${className}`}>
      {label}
    </div>
  );
};

export default Chip;

import { IButtonProps } from '@shared/interfaces/IButtonProps';
import { FC, ReactElement } from 'react';

const Button: FC<IButtonProps> = (props): ReactElement => {
  const { id, label, className, disabled, role, type, testId, onClick } = props;

  return (
    <button data-testid={testId} id={id} type={type} className={className} role={role} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

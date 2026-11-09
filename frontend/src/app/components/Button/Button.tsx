import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary'|'secondary'|'outline';
export type ButtonSize ='sm'|'md'|'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ 
    variant ="primary",
    size ="md",
    children,
    className = '',
    disabled,
    ...props
}) => {
    const combinedClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
    return (
        <button className={combinedClasses} disabled={disabled} {...props}>
            {children}
        </button>
    );
}


export default Button;
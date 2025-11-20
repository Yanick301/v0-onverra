import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50";
  
  const variants = {
    primary: "bg-black text-white hover:bg-accent hover:text-black border border-black hover:border-accent",
    secondary: "bg-accent text-black hover:bg-black hover:text-white border border-accent hover:border-black",
    outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

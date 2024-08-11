import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={{
        padding: '10px 20px',
        width:'100px',
        margin: '0 5px',
        backgroundColor: disabled ? '#ddd' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;

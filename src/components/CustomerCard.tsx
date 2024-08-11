import React from 'react';
import { Customer } from '../services/api';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  isSelected: boolean;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick, isSelected }) => {
  return (
    <div 
      onClick={onClick} 
      style={{
        padding: '15px',
        cursor: 'pointer',
        backgroundColor: isSelected ? 'lightgrey' : 'white',
        borderRight: isSelected ? '4px solid black' : '4px solid transparent',
      }}
    >
      <h4>{customer.name}</h4>
      <p style={{
        margin: '0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      }}>
        {customer.description}
      </p>
    </div>
  );
};

export default CustomerCard;

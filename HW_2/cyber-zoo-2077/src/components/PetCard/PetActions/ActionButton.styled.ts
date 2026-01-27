import styled from 'styled-components';
import Button from '@mui/material/Button';

export const ActionButton = styled(Button)<{ mood?: string }>`
  && {
    background: linear-gradient(45deg, #2196f3 0%, #21cbf3 100%);
    border: 0;
    border-radius: 8px;
    color: white;
    height: 36px;
    padding: 0 16px;
    margin: 0;
    text-transform: none;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(33, 150, 243, 0.4);
      background: linear-gradient(45deg, #1976d2 0%, #00acc1 100%);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      background: #666;
      color: #999;
      transform: none;
      box-shadow: none;
      cursor: not-allowed;
    }
  }
`;
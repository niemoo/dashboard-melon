import React from 'react';
import { Button } from '@material-tailwind/react';

const Tombol = ({ title, className, onClick, disabled }) => {
  return (
    <>
      <Button size="sm" className={`bg-green-500 hover:bg-green-600 w-full ${className}`} onClick={onClick} disabled={disabled}>
        {title}
      </Button>
    </>
  );
};

export default Tombol;

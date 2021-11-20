import React from 'react';
import loading from './loading.gif';

export const ActivityIndicator = () => {
  return (
    <img
      src={loading}
      alt='Loading...'
      style={{ position: 'absolute', top: '50%', left: '50%', width: '50px' }}
    />
  );
};

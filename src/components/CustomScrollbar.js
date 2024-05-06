import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import '../styles/CustomScrollbar.scss';

export default function CustomScrollbar({ children }){
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#ccc',
            borderRadius: '5px',
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};
import React from 'react';
import {connect} from 'react-redux';

const ConnectionState = ({connected, state}) => {
  if (connected) return <div />;
  return (
    <div className="connectionState">
      Not connected (${state})
    </div>
  )
};

export default ConnectionState;

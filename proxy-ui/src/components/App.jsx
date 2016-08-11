import React from 'react';
import {connect} from 'react-redux';
import ConnectionState from './ConnectionState';

const App = ({connection, routes}) => (
  <div>
    <ConnectionState connected={connection.connected} state={connection.state}/>
    IM A BANANA
    {JSON.stringify(routes)}
  </div>
);

const mapStateToProps = ({routes, connection}) => ({
  routes: routes || {},
  connection: connection,
})

export default connect(mapStateToProps)(App);


import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';

import ConnectionState from './ConnectionState';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {railscasts} from 'react-syntax-highlighter/dist/styles';

import {keepRequest, chooseRequest, toggleRecording} from '../actionCreators';

const App = (props) => {
  const {connection, routes, isRecording} = props;
  const {keep, choose, toggleRecord} = props;

  return <div className="container">
    <ConnectionState connected={connection.connected} state={connection.state}/>
    <RecordButton isRecording={isRecording} onToggle={toggleRecord} />
    {Object.keys(routes).map((route) => (
      <RequestPath path={route}
                   requests={routes[route]}
                   onKeep={keep}
                   onChoose={choose}
      />
    ))}
  </div>
};

const RequestPath = ({path, requests, onKeep, onChoose}) => (
  <div>
    <h3>{path}</h3>
    <div className="request-container">
      {Object.keys(requests).map((reqId) => {
        const request = requests[reqId];
        const {id, chosen, keeping, data} = request;
        return <Request chosen={chosen}
                 keeping={keeping}
                 data={data}
                 onKeep={onKeep.bind(null, path, id)}
                 onChoose={onChoose.bind(null, path, id)} />
      })}
    </div>
  </div>
);

const Request = ({data, chosen, keeping, onChoose, onKeep}) => (
  <div className="request">
    <SyntaxHighlighter language='json' style={railscasts}>
      {data}
    </SyntaxHighlighter>
    <button onClick={onChoose} className={chosen ? 'active' : null}>Choose</button>
    <button onClick={onKeep} className={keeping ? 'active' : null}>Keep</button>
  </div>
);

const RecordButton = ({isRecording, onToggle}) => {
  return <button onClick={onToggle}
                 className={isRecording ? 'active' : null}>Record</button>
}

const mapStateToProps = (state) => ({
  routes: state.routes || {},
  connection: state.connection,
  isRecording: state.isRecording
})

const mapDispatchToProps = (dispatch) => ({
  keep: (path, requestId) => dispatch(keepRequest(path, requestId)),
  choose: (path, requestId) => dispatch(chooseRequest(path, requestId)),
  toggleRecord: () => dispatch(toggleRecording())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


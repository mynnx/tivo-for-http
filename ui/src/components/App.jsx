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
    <RecordButton isRecording={isRecording} />
    <ConnectionState connected={connection.connected} state={connection.state}/>
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
      {requests.map(({id, active, keep, data}) => (
        <Request active={active}
                 keeping={keep}
                 data={data}
                 onKeep={onKeep.bind(null, id)}
                 onChoose={onChoose.bind(null, id)} />
      ))}
    </div>
  </div>
);

const Request = ({data, onChoose, onKeep}) => (
  <div className="request">
    <SyntaxHighlighter language='json' style={railscasts}>
      {data}
    </SyntaxHighlighter>
    <button onClick={onChoose}>Choose</button>
    <button onClick={onKeep}>Choose</button>
  </div>
);

const RecordButton = ({isRecording, onToggle}) => {
  const btnClass = classnames('modeButton', {'record': isRecording, 'play': !isRecording});
  return <button onClick={onToggle}
                 className={btnClass}>Record</button>
}

const mapStateToProps = (state) => ({
  routes: state.routes || {},
  connection: state.connection,
  isRecording: state.isRecording
})

const mapDispatchToProps = (dispatch) => ({
  keep: (requestId) => dispatch(keepRequest(requestId)),
  choose: (requestId) => dispatch(chooseRequest(requestId)),
  toggleRecord: () => dispatch(toggleRecording())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


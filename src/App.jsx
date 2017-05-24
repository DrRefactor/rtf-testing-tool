import React from 'react';
import './App.css';
import RTF from './RTF-field.jsx'

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>RTF testing page</h2>
        </div>
        <RTF />
      </div>
    );
  }
});

module.exports = App;

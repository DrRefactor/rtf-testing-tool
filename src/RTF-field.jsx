import React from 'react';
import Quill from 'quill';
import './RTF.css';
import '../node_modules/quill/dist/quill.snow.css';

var RTF = React.createClass({
  componentDidMount: function() {
    var container = this.refs.rtf;
    var options = {
      modules: {
        toolbar: false
      },
      placeholder: 'Test...',
      theme: 'snow'  // or 'bubble'
    }
    this.editor = new Quill(container, options);
  },

  render: function() {
    return (
      <div>
        <div ref='toolbar' />
        <div ref='rtf' className='rtf' onPaste={this._inspectPasteEv} />
      </div>
    );
  },

  _inspectPasteEv: function(e) {
    var data = e.clipboardData || window.clipboardData;
    var file = data.items && data.items.length === 1 && data.items[0].kind === 'file' && data.items[0].getAsFile();
    if (file) {
      e.stopPropagation();
      e.preventDefault();
      this._insertFile(file, true, { rename : true });
    }
  },
  _insertFile: function(file) {
    var currentPosition = this.editor.getSelection(true);
    var reader = new FileReader();
    reader.onload = e => this.editor.insertEmbed(currentPosition.index, 'image', event.target.result); // data url!
    reader.readAsDataURL(file);
  }
});

module.exports = RTF;

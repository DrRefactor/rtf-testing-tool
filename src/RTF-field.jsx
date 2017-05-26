import React from 'react';
import Quill from 'quill';
import './RTF.css';
import '../node_modules/quill/dist/quill.snow.css';
import LocalStorageManager from './local-storage-manager';
import { secureHtml } from './utils';
import { bodyContent } from './utils';

var RTF = React.createClass({
  componentDidMount: function() {
    var container = this.refs.rtf;
    var options = {
      modules: {
        toolbar: false
      },
      placeholder: 'Test...',
      theme: 'snow'
    }
    this.editor = new Quill(container, options);
    this.editor.on('text-change', this._storeContents);
    var prevContents = LocalStorageManager.get('rtf-contents');
    if (prevContents)
      this.editor.setContents(prevContents);
  },

  render: function() {
    return (
      <div>
        <div ref='toolbar' />
        <div ref='rtf' className='rtf' onPaste={this._onPaste} />
      </div>
    );
  },

  _onPaste: function(e) {
    var data = e.clipboardData || window.clipboardData;
    // IE
    var files = data.files && data.files.length && Object.keys(data.files).map(x => data.files[x]);
    if (files && !(files.length === 1 && files[0].type.startsWith('image/'))) {
      e.stopPropagation();

      files.forEach(x => {
        if (x.type.startsWith('image/'))
          this._insertImage(x);
      });
    }

    var file = data.items && data.items.length === 1 && data.items[0].kind === 'file' && data.items[0].getAsFile();
    if (file) {
      e.stopPropagation();
      e.preventDefault();
      this._insertImage(file);
    }

    this._insertHtml(data.getData('text/html'));
  },
  _insertImage: function(file) {
    var currentPosition = this.editor.getSelection(true);
    var reader = new FileReader();
    reader.onload = e => this.editor.insertEmbed(currentPosition.index, 'image', event.target.result); // data url!
    reader.readAsDataURL(file);
  },
  _insertHtml: function(html) {
    console.log(html);
    var cleanHTML = secureHtml(bodyContent(html));
    console.log(cleanHTML);
    var currentPosition = this.editor.getSelection(true);
    this.editor.clipboard.dangerouslyPasteHTML(currentPosition.index, cleanHTML);
  },
  _storeContents: function() {
    var contents = this.editor.getContents();
    LocalStorageManager.set('rtf-contents', contents);
  }
});

module.exports = RTF;

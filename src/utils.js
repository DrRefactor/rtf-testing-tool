function _secureHtml(html) {
  return (html || '').replace(/<(\w+)(.|[\r\n])*?>/g, '<$1>');
}

function _bodyContent(html) {
	return /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(html)[1];
}

module.exports = {
	secureHtml: _secureHtml,
	bodyContent: _bodyContent
};
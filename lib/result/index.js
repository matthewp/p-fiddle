module tmpl from './result.mustache';
var $ = can.$;

can.Component.extend({
  tag: 'p-result',
  template: tmpl,
  scope: {
    content: can.compute(function() {
      var css = this.attr('css');
      var js = this.attr('js');
      var html = this.attr('html');

      return html +
        '<style>' + css + '</style>' +
        '<script>' + js + '</script>';
    }),
    selected: false
  },
  events: {
    '{scope} selected': function(el, ev, selected) {
      if(!selected) return;

      var content = this.scope.attr('content');
      var { contentDocument: doc } = this.element.find('iframe')[0];
      $(doc).find('body').html(content);
    }
  }
});

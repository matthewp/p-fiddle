module tmpl from './result.mustache';
import { loadAll } from './scripts';
var $ = can.$;

can.Component.extend({
  tag: 'p-result',
  template: '',
  scope: {
    content: can.compute(function() {
      var css = this.attr('css');
      var html = this.attr('html');

      return html +
        '<style>' + css + '</style>';
    }),
    scripts: [
      '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js',
      '//canjs.com/release/2.0.4/can.jquery.js'
    ],
    selected: false
  },
  events: {
    '{scope} selected': function(el, ev, selected) {
      if(!selected) return;
      var scope = this.scope;

      var content = scope.attr('content');
      var iframe = $('<iframe>');
      this.element.append(iframe);
      var { contentWindow: { document: doc } } = iframe[0];
      var body = $(doc).find('body');
      body.html(content);

      var scripts = [];
      can.each(scope.attr('scripts'), function(s) {
        scripts.push({ src: s });
      });
      scripts.push({ content: scope.attr('js') });
      loadAll(doc, scripts);
    }
  }
});

module CodeMirror from 'codemirror';
module tmpl from './fiddle.mustache';

import '../tabs';
import '../result';

var tabs = new can.List([
  {value: 'html', text: 'HTML'},
  {value: 'js', text: 'Script'},
  {value: 'css', text: 'Style'},
  {value: 'result', text: 'Result'}
]);

var modes = {
  'html': 'htmlmixed',
  'js': 'javascript',
  'css': 'css'
};

/*
 * Aligns a string to the left
 */
function align(str) {
  var spaces = str.search(/[^\s]/);
  str = str.substr(spaces);

  var spacer = '', i = 0;
  while (i < (spaces - 1)) {
    spacer += " ";
    i++;
  }

  var parts = can.map(str.split('\n'), function(part) {
    return part.replace(spacer, '');
  });

  return can.trim(parts.join('\n'));
}

can.Component.extend({
  tag: 'p-fiddle',
  template: tmpl,
  scope: {
    tabs: tabs,
    active: 'html',
    isResult: can.compute(function() {
      return this.attr('active') === 'result';
    })
  },
  events: {
    'inserted': function(el) {
      var scope = this.scope;
      can.each(['html', 'css', 'js'], (v) => {
        var selector = '.p-source p-' + v;
        var content = el.find(selector).html();
        this.scope.attr(v, align(content));
      });
      var pContent = this.element.find('.p-content')[0];
      this.codeMirror = new CodeMirror(pContent, {
        lineNumbers: true,
      });
      this.codeMirror.on('change', can.proxy(this.codeMirrorChange, this));
      can.trigger(scope, 'active', scope.attr('active'));
    },
    '{scope} active': function(el, ev, active) {
      if(active !== 'result') {
      var cm = this.codeMirror;

      var mode = modes[active];
      cm.setOption('mode', mode);
      cm.setValue(this.scope.attr(active));
      }
    },
    codeMirrorChange: function(cm, evt) {
      var origin = evt.origin;

      if(origin != 'setValue') {
        var scope = this.scope;
        var value = cm.getValue();
        scope.attr(scope.attr('active'), value);
      }
    }
  }
});

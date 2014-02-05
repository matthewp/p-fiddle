import 'codemirror';
import 'xmlmode';
import 'jsmode';
import 'cssmode';
import 'htmlmode';

import './fiddle';

var $ = can.$;

$(function() {
  var fiddles =$('p-fiddle');
  fiddles.each(function(i, fiddle) {
    var el = $(fiddle);
    var content = fiddle.outerHTML;
    var renderer = can.view.mustache(content);

    var prev = el.prev();
    if(prev.length) {
      el.remove();
      prev.after(renderer({}));
    } else {
      var parent = el.parent();
      el.remove();
      parent.append(renderer({}));
    }
  });
});

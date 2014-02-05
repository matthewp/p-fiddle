var noop = function(){};

export var load = function(doc, item, callback = noop) {
  var script = doc.createElement('script');
  if(item.src) {
    script.src = item.src;
  } else {
    script.textContent = item.content;
  }
  script.onload = callback;

  var body = doc.getElementsByTagName('body')[0];
  body.appendChild(script);
};

export var loadAll = function(doc, items, callback = noop) {
  if(!items.length) {
    return callback();
  }
  var item = items.shift();
  var next = function() {
    loadAll(doc, items, callback);
  };
  load(doc, item, next);
};

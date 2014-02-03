import './tabs';

var tabs = new can.List([
  {value: 'html', text: 'HTML'},
  {value: 'js', text: 'Script'},
  {value: 'css', text: 'Style'},
  {value: 'result', text: 'Result'}
]);

can.Component.extend({
  tag: 'p-fiddle',
  template: '<div><div class="p-source" style="display: none;"><content/></div><p-tabs tabs="tabs" active="active"></p-tabs><div class="p-content"><textarea class="form-control" rows="12" value="{{content}}"></textarea></div></div>',
  scope: {
    tabs: tabs,
    active: 'html',
    content: can.compute(function() {
      return this.attr(this.attr('active'));
    })
  },
  events: {
    'inserted': function(el) {
      var scope = this.scope;
      can.each(['html', 'css', 'js'], (v) => {
        var selector = '.p-source p-' + v;
        var content = el.find(selector).html();
        this.scope.attr(v, $.trim(content));
      });
      scope.attr('content', scope.attr(scope.attr('active')));
    }
  }
});

can.Component.extend({
  tag: 'p-tabs',
  template: '<ul class="nav nav-tabs">' +
    '{{#each tabs}}' +
    '<li {{#if isActive}}class="active"{{/if}}  data-value="{{value}}"><a href="javascript://" can-click="set">{{text}}</a></li>' +
    '{{/each}}' +
    '</ul>',
  scope: {
    active: '',
    set: function(ctx) {
      this.attr('active', ctx.attr('value'));
    },
    isActive: function(ctx) {
      return this.attr('active') == ctx.attr('value');
    }
  }
});

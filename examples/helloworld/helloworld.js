/* global Backbone, Mustache, I18n */
(function (Backbone, Mustache, I18n) {
  'use strict';
  var translations = {
    'Hello World!': 'Olá Mundo!'
  };
  var i18n = new I18n();
  var GreetingView = Backbone.View.extend({
    el: document.getElementById('title'),
    render: function () {
      this.$el.html(Mustache.render('{{#_i18n_}}{{title}}{{/_i18n_}}', {
        title: 'Hello World!'
      }));

      return this;
    }
  });

  i18n.set(translations);

  new GreetingView().render();
})(Backbone, Mustache, I18n);

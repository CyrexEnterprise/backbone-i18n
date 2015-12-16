(function(Backbone, Mustache, I18n) {
  'use strict';

  var translations = {
    'Hello World!': 'Olá Mundo!'
  };

  var i18n = new I18n();

  i18n.set(translations);

  console.log(i18n.translate('Hello World!')); // Olá Mundo!
  console.log(i18n.translate('lost in translation')); // lost in translation

  var GreetingView = Backbone.View.extend({
    el: document.getElementById('title'),
    render: function() {
      this.$el.html(Mustache.render('{{#_i18n_}}{{title}}{{/_i18n_}}', {
        title: 'Hello World!'
      }));

      return this;
    }
  });

  new GreetingView().render();
})(Backbone, Mustache, I18n);

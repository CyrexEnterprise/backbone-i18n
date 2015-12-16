# Backbone-Mustache-i18n

Content internalization and localization (i18n) with Backbone and Mustache

Provide translations as keyphrase to translated content

```json
{
  "keyPhrase": "translatedKeyPhrase",
  "Name": "Nome",
  "First Name": "Primeiro Nome"
}
```

You can call the `_i18n_` function to translate content on a template:

```html
  {{#_i18n_}}{{title}}{{/_i18n_}}
  {{#_i18n_}}Something to be translated{{/_i18n_}}
```

Content rendered within the `{{_i18n_}}` will be used as keyphrase

### Instalation

Requirements: Backbone and Mustache

With script Tag `<script type="text/javascript" src="https://github.com/Cloudoki/backbone-mustache-i18n/blob/master/index.js"></script>`

With Bower `bower install git://github.com/Cloudoki/backbone-mustache-i18n.git`

With npm `npm install github:Cloudoki/backbone-mustache-i18n`

### Example Usage

```javascript
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
```

### Fetch translations from resource API

```javascript
var xi18n = I18n.extend({
  url: function(){
    return '/translations/' + this.locale ? this.locale : 'en-GB';
  }
});

var i18n = new xi18n();

i18n.setLocale('pt-PT');
i18n.fetch({
  success: function(){
    console.log('translations loaded');  
  },
});
```

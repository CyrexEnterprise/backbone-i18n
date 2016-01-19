# Backbone-Mustache-i18n

Content internalization and localization (i18n) with Backbone and Mustache

## Features

- Translation specific elements in Mustache templates;
- Global access to the translations through Javascript variables;
- Request the translations from an external API;

## Requirements

- [backbonejs](http://backbonejs.org/)
- [mustache.js](https://github.com/janl/mustache.js/)

## Instalation

- **Script Tag:** `<script type="text/javascript" src="https://github.com/Cloudoki/backbone-i18n/blob/master/index.js"></script>`
- **Bower:** `bower install git://github.com/Cloudoki/backbone-i18n.git`
- **npm:** `npm install github:Cloudoki/backbone-i18n`

### Usage

#### Initialize the plugin:

```javascript
  // Define your transations
  var translations = {
    'Hello World!': 'Olá Mundo!'
  };

  var i18n = new I18n();                  // Initialize the translations plugin
  i18n.set(translations);                 // Apply the translations
```

#### Translations available through Mustache:

After initializing the plugin, the translations will be automatically hooked up to
Mustache:

```javascript
  var template = "{{#_i18n_}}{{title}}{{/_i18n_}}";
  this.$el.html(Mustache.render( template, {title: 'Hello World!'}));     // Render
```

#### Access Translations on Javascript:

You can also access the translations through Javascript variables:

```javascript
  console.log(i18n.translate('Hello World!')); // Olá Mundo!
  console.log(i18n.translate('lost in translation')); // lost in translation
```

### Fetch translations from resource API

```javascript
// You will need to extend the i18n Backbone Model
// to provide the translations resource url
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

### Check the examples

You will need a static server

`npm install -g http-server`

Serve the entire project directory

`http-server ./`

Open your browser at `http://127.0.0.1:8080/examples/`

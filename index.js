(function(root, main) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'mustache'],
      function(Backbone, Mustache) {
        return main(Backbone, Mustache);
      });
    // CommonJS
  } else if (typeof exports !== 'undefined' && typeof require !== 'undefined') {
    module.exports = main(require('backbone'), require('mustache'));
    // Globals
  } else {
    root.I18n = main(root.Backbone, root.Mustache);
  }
})(this, function(Backbone, Mustache) {
  'use strict';

  /**
   * i18n (Internationalization and Localization) Backbone Model
   */
  return Backbone.Model.extend({
    // Method called when i18n model is initialized with new constructor
    initialize: function() {
      var self = this;

      // define default mustache render at initialization
      var defaultRender = Mustache.render;

      //monkey-patch Mustache render to include on all views the
      //  authorizations (_i18n_)
      Mustache.render = function(template, view) {
        view._i18n_ = function() {
          return function(text, render) {
            //render text and attempt to translate it
            return self.translate(render(text));
          }
        };
        return defaultRender.apply(this, arguments);
      };
    },

    /**
     * Changes current locale
     *
     * @param {string} locale key value
     */
    setLocale: function(locale) {
      this.locale = locale;
    },

    /**
     * translates key phrase given to current locale data
     *
     * @param key
     * @returns {string} translation or key phrase if translation not found
     */
    translate: function(key) {
      return this.get(key) ? this.get(key) : key;
    }
  });
});

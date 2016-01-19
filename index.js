(function (root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'mustache'], factory);
    // CommonJS
  } else if (typeof module === 'object' && module.exports && require) {
    module.exports = factory(require('backbone'), require('mustache'));
    // Globals
  } else {
    /* eslint-disable no-param-reassign */
    root.I18n = factory(root.Backbone, root.Mustache);
    /* eslint-enable no-param-reassign */
  }
})(this, function (Backbone, Mustache) {
  'use strict';

  /**
   * i18n (Internationalization and Localization) Backbone Model
   */
  return Backbone.Model.extend({
    // Method called when i18n model is initialized with new constructor
    initialize: function () {
      var self = this;

      // define default mustache render at initialization
      var defaultRender = Mustache.render;

      // Monkey-patch Mustache render to include on all views the
      //  authorizations (_i18n_)
      /* eslint-disable no-param-reassign */
      Mustache.render = function (template, view) {
        var i18n = function () {
          return function (text, render) {
            // render text and attempt to translate it
            return self.translate(render(text));
          };
        };
        if (!view) {
          return defaultRender.apply(this, [template, {
            _i18n_: i18n
          }]);
        }
        view._i18n_ = i18n;
        return defaultRender.apply(this, arguments);
      };
      /* eslint-enable no-param-reassign */
    },

    /**
     * Changes current locale
     *
     * @param {string} locale key value
     */
    setLocale: function (locale) {
      this.locale = locale;
    },

    /**
     * Translates key phrase given to current locale data
     *
     * @param {string} key phrase
     * @returns {string} translation or key phrase if translation not found
     */
    translate: function (key) {
      return this.get(key) ? this.get(key) : key;
    }
  });
});

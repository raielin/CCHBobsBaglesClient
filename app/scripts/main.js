'use strict';
// handlebars templates/> templates/templates.js
// Handlebars.registerPartial('cart', Handlebars.templates.cart);

$(document).ready(function() {
   $('#list li').on('click', function() {
      var name = $(this).val()
      document.cookie = "name=" + name;
    });
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'menu': 'menu',
    'about': 'about',
    'contact': 'contact',
    'checkout': 'checkout',
    'cart': 'cart'
  },

  home: function() {
    var template = Handlebars.templates['home'];

    $('#content').html(template({
        name: 'Bob'
    }));
  },

  menu: function() {
    var template = Handlebars.compile($('#menu-temp').html());

    $.ajax({
      url: 'http://localhost:3000/menus',
      type: 'GET'
    }).done(function(response) {

      $('#content').html(template({
        menu: response.menus
      }));
    });

  },

  about: function() {
    var template = Handlebars.compile($("#about-temp").html());
    $('#content').html(template({}));

  },

  contact: function() {
    var template = Handlebars.compile($("#contact-temp").html());
    $('#content').html(template({}));

  },

  checkout: function() {
    var template = Handlebars.compile($("#checkout-temp").html());
    $('#content').html(template({}));
  },

  cart: function() {
    var template = Handlebars.compile($("#cart-temp").html());
    $.ajax({
      url: 'http://localhost:3000/order_items',
      type: 'GET'
    }).done(function(response) {
      $('#content').html(template({
        order_items: response.order_items
      }));
    });

    $('#place-order').on('click', function() {
      Router.checkout();
    });
  }

});

var router = new Router();
// Stripe.setPublishableKey('pk_test_0fbtu0To5Q8TurGcFy6XZ505');

// function stripeResponseHandler(status, response) {
//   var $form = $('#payment-form');

//   if (response.error) {
//     // Show the errors on the form
//     $form.find('.payment-errors').text(response.error.message);
//     $form.find('button').prop('disabled', false);
//   } else {
//     // response contains id and card, which contains additional card details
//     var token = response.id;
//     var fullName = response.card.name;
//     // Insert the token into the form so it gets submitted to the server
//     $form.append($('<input type="hidden" name="user[access_token]" />').val(token));
//     $form.append($('<input type="hidden" name="user[name]" />').val(fullName));
//     // and submit
//     $form.get(0).submit();
//   }
// }

// $(document).ready(function() {
//   $('#payment-form').submit(function(event) {
//     var $form = $(this);

//     // Disable the submit button to prevent repeated clicks
//     $form.find('button').prop('disabled', true);

//     Stripe.card.createToken($form, stripeResponseHandler);

//     // Prevent the form from submitting with the default action
//     return false;
//   });
// });

Backbone.history.start();

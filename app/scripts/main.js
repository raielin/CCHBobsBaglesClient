'use strict';

var CCHBBClient = {
  // baseURL: 'https://cch-bobsbagels-api.herokuapp.com/',
  jsonAppend: '.json',
  baseURL: 'http://localhost:3000/',

  cart: {},
  menu: {}
};

// $(document).ready(function() {
//    $('#list li').on('click', function() {
//       var name = $(this).val() 
//       document.cookie = "name=" + name;
//     });
// });

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
    var template = Handlebars.compile($("#home-temp").html());
    $('#content').html(template({}));
  },

  menu: function() {
    var template = Handlebars.compile($("#menu-temp").html());
    $('#content').html(template({
      menu: CCHBBClient.menu
    }));

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
    Stripe.setPublishableKey('pk_test_0fbtu0To5Q8TurGcFy6XZ505');

    function stripeResponseHandler(status, response) {
      var $form = $('#payment-form');
    
      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // response contains id and card, which contains additional card details
        var token = response.id;
        var fullName = response.card.name;
        var street = response.card.address_line1;
        var city = response.card.city;
        var state = response.card.state;
        var zip = response.card.zip;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="user[access_token]" />').val(token));
        $form.append($('<input type="hidden" name="user[name]" />').val(fullName));
        $form.append($('<input type="hidden" name="order[street]" />').val(street));
        $form.append($('<input type="hidden" name="order[city]" />').val(city));
        $form.append($('<input type="hidden" name="order[zip]" />').val(zip));
        // and submit
        $form.get(0).submit();
      }
    }
  },

  cart: function() {
    var template = Handlebars.compile($("#cart-temp").html());
    $.ajax({
      url: CCHBBClient.baseURL + 'order_items' + CCHBBClient.jsonAppend,
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
Backbone.history.start();

CCHBBClient.initCart = function() {
  CCHBBClient.cart = {};
};


CCHBBClient.initMenu = function() {
  CCHBBClient.menu = {};
   $.ajax({
      url: CCHBBClient.baseURL + 'menus' + CCHBBClient.jsonAppend,
      type: 'GET'
    }).done(function(response) {
      CCHBBClient.menu = response.menus;
    });
};



CCHBBClient.initApp = function() {
  CCHBBClient.initCart;
  CCHBBClient.initMenu;
};

// event listeners
CCHBBClient.addEvents = function() {

    // $('#js-placeOrder').on('submit', CCHBBClient.checkOut);

    // $('.js-taskForm').on('submit', CCHBBClient.submitTaskForm);

    // $('.js-taskList').on('click', 'a', CCHBBClient.clickTaskItem);

    // $('.js-removeCompleted').on('click', CCHBBClient.clickRemoveCompleted);
};

// DOM ready
$(function() {
  CCHBBClient.initApp;
  CCHBBClient.addEvents;
  $.ajaxSetup({
       contentType: 'application/json'
  });
  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});
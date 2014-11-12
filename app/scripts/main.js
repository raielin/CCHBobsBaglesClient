'use strict';

var CCHBBClient = {
  // baseURL: 'https://cch-bobsbagels-api.herokuapp.com/',
  jsonAppend: '.json',
  baseURL: 'http://localhost:3000/',

  cart: {
    orders: [{
      name: 'bagel'
    }]
  },

  menu: {}
};

// event listeners
CCHBBClient.addEvents = function() {

    // $('#js-placeOrder').on('submit', CCHBBClient.checkOut);

    // $('.js-taskForm').on('submit', CCHBBClient.submitTaskForm);

    // $('.js-taskList').on('click', 'a', CCHBBClient.clickTaskItem);

    // $('.js-removeCompleted').on('click', CCHBBClient.clickRemoveCompleted);
};

CCHBBClient.renderCart = function() {

};

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
    $.ajax({
      url: CCHBBClient.baseURL + 'menus' + CCHBBClient.jsonAppend,
      type: 'GET',
      dataType: 'json'
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
        $form.append($('<input type="hidden" name="order[state]" />').val(state));
        $form.append($('<input type="hidden" name="order[zip]" />').val(zip));
        // and submit
        $form.get(0).submit();
      }
    }
  },

  cart: function() {
    var template = Handlebars.compile($("#cart-temp").html());
    debugger
     $('#content').html(template({
        order_items: CCHBBClient.cart.orders
      }));

  }

});

// DOM ready
$(function() {

  // $.ajaxSetup({contentType: 'application/json'});
  // CCHBBClient.initApp();
  CCHBBClient.addEvents();

  var router = new Router();
  Backbone.history.start();
  
  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});
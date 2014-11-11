'use strict';

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'menu': 'menu',
    'about': 'about',
    'contact': 'contact',
    'checkout': 'checkout'
  },

  
});

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
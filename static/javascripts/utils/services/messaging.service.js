/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('cafeyoga.utils.services')
    .factory('MessagingService', MessagingService);

  MessagingService.$inject = ['$http','$q'];

  /**
  * @namespace Reservations
  * @returns {Factory}
  */
  function MessagingService($http, $q) {
    /**
    * @name Reservations
    * @desc The Factory to be returned
    */
    var MessagingService = {
       sendEmail: sendEmail,
       sendEmailFromContactPage:sendEmailFromContactPage,
    }

    return MessagingService;

    ////////////////////

    function sendEmail(lesson, account, callback) {
       return $http.post('api/v1/messaging/email/', {
         lesson: lesson,
         account: account,
       }).then(
         function(data, status, headers, config){
           callback(true, "OK");
       },function(data, status, headers, config){
           callback(false, ["Une erreur est survenue lors de la réservation"]);
       });
    }

    function sendEmailFromContactPage(type, name, email, tel, message, callback) {
       return $http.post('api/v1/messaging/contact/', {
         type: type,
         name: name,
         email: email,
         tel: tel,
         message: message,
       }).then(
         function(data, status, headers, config){
           callback(true, "OK");
       },function(data, status, headers, config){
           callback(false, ["Une erreur est survenue lors de la réservation"]);
       });
    }

  }
})();


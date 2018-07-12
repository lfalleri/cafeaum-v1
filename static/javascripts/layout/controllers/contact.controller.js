/**
* LandingPageController
* @namespace thinkster.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('cafeyoga.layout.controllers')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope', 'Authentication', 'MessagingService'];

  /**
  * @namespace NavbarController
  */
  function ContactController($scope, Authentication, MessagingService) {
    var vm = this;

    $scope.questions = [/*"Réserver une table", */"Contacter notre équipe"];
    $scope.button_text = [/*"Réserver", */"Envoyer"];
    $scope.submit_button = "Envoyer";
    $scope.success = undefined;
    $scope.selectedQuestion = $scope.questions[0];

    $scope.initialize = function() {
       var loc = {lat: 48.822224, lng:2.266625};
       var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: loc
       });
       var marker = new google.maps.Marker({
          position: loc,
          map: map
       });

       var map2 = new google.maps.Map(document.getElementById('map2'), {
          zoom: 16,
          center: loc
       });
       var marker = new google.maps.Marker({
          position: loc,
          map: map2
       });
    }

    $(document).ready( function () {
        $scope.initialize();
    });

    $scope.changeQuestion = function(){
       $scope.success = undefined;
       $scope.questions.forEach(function(question, i){
          if(question === $scope.selectedQuestion){
             $scope.submit_button = $scope.button_text[i];
          }
       });
    }

    $scope.changeForm = function(){
       $scope.success = undefined;
    }

    $scope.sendMessage = function(){
       if($scope.contact_tel === undefined){
          $scope.contact_tel = '';
       }

       MessagingService.sendEmailFromContactPage(
          $scope.selectedQuestion,
          $scope.contact_nom,
          $scope.contact_email,
          $scope.contact_tel,
          $scope.contact_comment,
          function(success, message){
             if(success){
                $scope.success = "Votre message a été bien envoyé, notre équipe vous répondra dans les plus brefs délais."
             }
          });
    }
  }
})();
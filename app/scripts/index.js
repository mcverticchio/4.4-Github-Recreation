// console.log("Hello World!");

var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');

// if(githubtoken !== undefined){
//   $.ajaxSetup({
//     headers: {
//       'Authorization': 'token ' + githubtoken.token
//     }
//   });
// }


$.ajax('https://api.github.com/users/mcverticchio').then(function(data){
  init(data);
  console.log(data);
});

function init(data){
  // console.log(data);
  var source = $('#individualImage').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);

  var returnHTML = $(template(data));

  $('.imageContainer').append(returnHTML);
  name(data);
};

function name(data){
  // console.log(data);
  var source = $('.nameTemplate').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);

  var returnHTML = $(template(data));

  $('.nameContainer').append(returnHTML);
  bio(data);
};

function bio(data){
  // console.log(data);
  var source = $('.bioTemplate').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);

  var returnHTML = $(template(data));

  $('.bioContainer').append(returnHTML);
  email(data);
};


function email(data){
  var source = $('.emailTemplate').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);

  var returnHTML = $(template(data));

  $('.emailContainer').append(returnHTML);
  // org(data);
}

$.ajax('https://api.github.com/users/mcverticchio/orgs').then(go)
function go(data){
  console.log(data);
  var orgs = data;
  displayOrgs(orgs);
}

function displayOrgs(orgs){
  var source=$('.orgTemplate').html();
  var template = Handlebars.compile(source);

  orgs.forEach(function(org){

    var returnHTML = $(template(org));
    $('.orgContainer').append(returnHTML);

  })
}



$.ajax('https://api.github.com/users/mcverticchio/repos?sort=pushed').then(run)
function run(data){
  console.log(data);
  var repositories = data;
  displayRepos(repositories);
}

function displayRepos(repos){
  var source=$('#repoTemplate').html();
  var template = Handlebars.compile(source);

  repos.forEach(function(repository){

    var returnHTML = $(template(repository));
    $('#repositoryContainer').append(returnHTML);

  })
}



$(function(){
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});

function sticky_relocate() {
      var window_top = $(window).scrollTop();
      var div_top = $('.content-anchor').offset().top;
      if (window_top > div_top) {
        $('.topNav').addClass('stick');
        $('.topNavPhantom').show();
      } else {
        $('.topNav').removeClass('stick');
        $('.topNavPhantom').hide();
      }
}

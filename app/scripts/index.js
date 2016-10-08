// console.log("Hello World!");

var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}


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

}

  $.ajax('https://api.github.com/users/mcverticchio/orgs').then(function(data){
    org(data);
    console.log(data);
  });


function org(data){
//   // console.log(data);
  var source = $('#orgTemplate').html();          //grabs all the html within my "stamp"
  var template = Handlebars.compile(source);

  var returnHTML = $(template(data));

  $('#orgContainer').append(returnHTML);
//   //   email(data);
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

// HOW TO CHANGE CIRCLE COLOR BASED ON LANGUAGE VALUE?
// function changeCircleColor (circle){
//   var circle =document.getElementById("circle");
//   var language =document.getElementById("language");
//   if (.language=== "CSS") {
//   circle.style.backgroundColor = "$purplecircle";
//   } else{
//   circle.style.backgroundColor = "$yellowcircle"
// }
// }

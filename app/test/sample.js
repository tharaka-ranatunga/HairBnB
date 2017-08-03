/**
 * Created by tharaka_ra on 8/2/2017.
 */
// var casper = require('casper').create();
//
//
// casper.start('http://localhost:63342/HairBnB/app/views/#!');
//
// casper.wait(3000, function(){
//     this.echo(this.getTitle());
// });
//
// casper.then(function(){
//     casper.exit();
// });

// casper.test.begin('Hello, Test!', 1, function(test) {
//     test.assert(true);
//     test.done();
// });

// casper.run();


//
// var casper = require('casper').create();
// var links;
//
// function getLinks() {
// // Scrape the links from top-right nav of the website
//     var links = document.querySelectorAll('ul.navigation li a');
//     return Array.prototype.map.call(links, function (e) {
//         return e.getAttribute('href')
//     });
// }
//
// // Opens casperjs homepage
// casper.start('http://localhost:63342/HairBnB/app/views/#!');
//
// casper.then(function () {
//     links = this.evaluate(getLinks);
// });
//
// casper.run(function () {
//     for(var i in links) {
//         console.log(links[i]);
//     }
// });

// casper.test.begin('Testing title', 1, function(test){
//     casper.start('http://localhost:63342/HairBnB/app/views/#!');
//
// //     casper.wait(3000, function(){
// //     this.echo(this.getTitle());
// // });
//
//     casper.then(function(){
//         test.assertTitle('Hairbnb', 'Application has correct title');
//     });
//
//     casper.run(function(){
//         test.done();
//     })
// });

// var links = [];
// var casper = require('casper').create();
//
// function getLinks() {
//     var links = document.querySelectorAll('h3.r a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }
//
// casper.start('http://localhost:63342/HairBnB/app/views/#!/', function() {
//     // Wait for the page to be loaded
//     this.waitForSelector('form[action="/search"]');
// });
//
// casper.then(function() {
//     // search for 'casperjs' from google form
//     this.fill('form[action="/search"]', { q: 'casperjs' }, true);
// });
//
// casper.then(function() {
//     // aggregate results for the 'casperjs' search
//     links = this.evaluate(getLinks);
//     // now search for 'phantomjs' by filling the form again
//     this.fill('form[action="/search"]', {   q: 'phantomjs' }, true);
// });
//
// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });
//
// casper.run(function() {
//     // echo results in some pretty fashion
//     this.echo(links.length + ' links found:');
//     this.echo(' - ' + links.join('\n - ')).exit();
// });


var casper = require('casper').create({
    loadImages:false,
    verbose: true,
    logLevel: 'debug'
});

var x = require('casper').selectXPath;

casper.userAgent('Mozilla/4.0,(compatible; MSIE 6.0; Windows NT 5.1)');

casper.start('http://localhost:63342/HairBnB/app/views/#!/');

// casper.then(function () {
//     this.sendKeys('#test','Sydney');
//     console.log('search started');
// });

// casper.thenClick(x('/html/body/div[2]/div/div/div/div/div/div[4]/input'), function () {
//     console.log("xpath selected");
// });
casper.wait(1000, function () {
    casper.click(x('//*[@id="search"]'));
    casper.click(x('//*[@id="Signin"]'));
    console.log('signin clicked')
});

casper.wait(1000, function () {
    casper.click(x('//*[@id="Signin"]'));
    console.log('signin clicked')
});

casper.wait(1000, function () {
    casper.capture('tar.png');
});


casper.run()

//

//

//
// casper.start('http://localhost:63342/HairBnB/app/views/#!/');
//
// casper.then(function() {
//     this.test.assertExists(x('//*[@id="Signin"]'), 'Sign In model is exist');
//     // casper.clickLabel('sign','a');
//     // this.sendKeys('#uemail', "tharaka.kamal@gmail.com");
//     // this.sendKeys('#upassword', "Aa1111");
//     // this.click(x('//*[@id="signin"]/div/div/div[2]/div/form/div[4]/input'));
//     console.log('started');
//     //.click('a[data-lp-signin-na
//     // v="1"]');
// });
//
// casper.wait(2000,function() {
//     this.capture('modal.png');
//
// });
// //
// // casper.start('https://draftkings.com');
//
//
//
// // casper.wait(1000,function() {
// //     this.capture('logged_in.png');
// // });
//
// casper.run();

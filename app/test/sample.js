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

casper.test.begin('Testing title', 1, function(test){
    casper.start('http://localhost:63342/HairBnB/app/views/#!');

//     casper.wait(3000, function(){
//     this.echo(this.getTitle());
// });

    casper.then(function(){
        test.assertTitle('Hairbnb', 'Application has correct title');
    });

    casper.run(function(){
        test.done();
    })
});
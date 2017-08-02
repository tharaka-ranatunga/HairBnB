/**
 * Created by tharaka_ra on 8/2/2017.
 */
var casper = require('casper').create();


casper.start('http://localhost:63342/HairBnB/app/views/#!');

casper.wait(3000, function(){
    this.echo(this.getTitle());
});

casper.then(function(){
    casper.exit();
});


casper.run();


//
// phantom.casperPath = '../vendor/casperjs-1.1.4-1/bin/casperjs';
// phantom.injectJs('../vendor/casperjs-1.1.4-1/bin/bootstrap.js');
// phantom.casperTest = true;
// // var utils = require('untils');
// var casper = require('casper').create();
//
// casper.start('https://google.com');
//
// casper.wait(3000, function(){
//     this.echo(this.getTitle());
// });
//
// casper.then(function(){
//     casper.exit();
// });
//
// casper.run();
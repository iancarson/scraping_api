//This function scraps the title for all the posts on the
//front page of the reddit.
//Updated Version.
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
    .launch()
    .then(function(browser) {
        return browser.newPage();
    })
    .then(function(page) {
        return page.goto(url).then(function() {
            return page.content();
        });
    })
    .then(function(html) {
        $('h2', html).each(function() {
            console.log($(this).text());
        });
    })
    .catch(function(err) {
        //handle error
    });

// const puppeteer = require('puppeteer');
// const url = 'https://www.reddit.com';
//
// puppeteer
//     .launch()
//     .then(function(browser){
//         return browser.newPage();
//     })
//     .then(function(page){
//         return page.goto(url).then(function(){
//             return page.content();
//         });
//     })
//     .then(function(html){
//         console.log(html);
//     })
//     .catch(function(err){
//         console.log(err);
//     });

const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then(function(html) {
        //success!
        const wikiUrls = [];
        for (let i = 0; i < 45; i++) {
            wikiUrls.push($('big > a', html)[i].attribs.href);
        }
        return Promise.all(
            wikiUrls.map(function(url) {
                return potusParse('https://en.wikipedia.org' + url);
            })
        );
    })
    .then(function(presidents) {
        console.log(presidents);
    })
    .catch(function(err) {
        //handle error
        console.log(err);
    });

/**
 * The Output looks like this.
 * [
 *   { name: 'George Washington', birthday: '1732-02-22' },
 *   { name: 'John Adams', birthday: '1735-10-30' },
 *   { name: 'Thomas Jefferson', birthday: '1743-04-13' },
 *   { name: 'James Madison', birthday: '1751-03-16' },
 *   { name: 'James Monroe', birthday: '1758-04-28' },
 *   { name: 'John Quincy Adams', birthday: '1767-07-11' },
 *   { name: 'Andrew Jackson', birthday: '1767-03-15' },
 *   { name: 'Martin Van Buren', birthday: '1782-12-05' },
 *   { name: 'William Henry Harrison', birthday: '1773-02-09' },
 *   { name: 'John Tyler', birthday: '1790-03-29' },
 *   { name: 'James K. Polk', birthday: '1795-11-02' },
 *   { name: 'Zachary Taylor', birthday: '1784-11-24' },
 *   { name: 'Millard Fillmore', birthday: '1800-01-07' },
 *   { name: 'Franklin Pierce', birthday: '1804-11-23' },
 *   { name: 'James Buchanan', birthday: '1791-04-23' },
 *   { name: 'Abraham Lincoln', birthday: '1809-02-12' },
 *   { name: 'Andrew Johnson', birthday: '1808-12-29' },
 *   { name: 'Ulysses S. Grant', birthday: '1822-04-27' },
 *   { name: 'Rutherford B. Hayes', birthday: '1822-10-04' },
 *   { name: 'James A. Garfield', birthday: '1831-11-19' },
 *   { name: 'Chester A. Arthur', birthday: '1829-10-05' },
 *   { name: 'Grover Cleveland', birthday: '1837-03-18' },
 *   { name: 'Benjamin Harrison', birthday: '1833-08-20' },
 *   { name: 'Grover Cleveland', birthday: '1837-03-18' },
 *   { name: 'William McKinley', birthday: '1843-01-29' },
 *   { name: 'Theodore Roosevelt', birthday: '1858-10-27' },
 *   { name: 'William Howard Taft', birthday: '1857-09-15' },
 *   { name: 'Woodrow Wilson', birthday: '1856-12-28' },
 *   { name: 'Warren G. Harding', birthday: '1865-11-02' },
 *   { name: 'Calvin Coolidge', birthday: '1872-07-04' },
 *   { name: 'Herbert Hoover', birthday: '1874-08-10' },
 *   { name: 'Franklin D. Roosevelt', birthday: '1882-01-30' },
 *   { name: 'Harry S. Truman', birthday: '1884-05-08' },
 *   { name: 'Dwight D. Eisenhower', birthday: '1890-10-14' },
 *   { name: 'John F. Kennedy', birthday: '1917-05-29' },
 *   { name: 'Lyndon B. Johnson', birthday: '1908-08-27' },
 *   { name: 'Richard Nixon', birthday: '1913-01-09' },
 *   { name: 'Gerald Ford', birthday: '1913-07-14' },
 *   { name: 'Jimmy Carter', birthday: '1924-10-01' },
 *   { name: 'Ronald Reagan', birthday: '1911-02-06' },
 *   { name: 'George H. W. Bush', birthday: '1924-06-12' },
 *   { name: 'Bill Clinton', birthday: '1946-08-19' },
 *   { name: 'George W. Bush', birthday: '1946-07-06' },
 *   { name: 'Barack Obama', birthday: '1961-08-04' },
 *   { name: 'Donald Trump', birthday: '1946-06-14' }
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

let parseStandford = require('./parseStandford')

app.get('/scrape', function(req, res){
  var eventList =[];
  request(req.query.url, function(error, response, html){
      if(!error){
        let $ = cheerio.load(html);
        //stanford home & search
        let stanford = $('.postcard-text').length
        console.log(stanford)
        if(stanford > 0) {
          $('.postcard-text').each(function() {
              let title = $(this).find('h3').text();
              let eventDateA = $(this).find('strong').text();
              if(eventDateA != "") {
                let json = parseStandford(title,eventDateA)
                if(json != null) {
                  eventList.push(json);
                }
              }
          });
        };
      };

    fs.writeFile('eventsData.json', JSON.stringify(eventList, null, 4), function(err){
        if (err) console.log(err);
        console.log('File successfully written! - Check your project directory for the eventsData.json file');
    });
    res.set("Access-Control-Allow-Origin", '*');
    //res.send('Check console!');
    res.end(JSON.stringify(eventList));
  });
});
app.listen('8090');
console.log('Scraper is running on port: 8090');
exports = module.exports = app;

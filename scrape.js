var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    jf = require('jsonfile'),
    file = 'app/images/data.json',
    colors = 'http://www.colourlovers.com/palette/210101/Then_and_Forevermore',
    // site = "http://www.ycombinator.com";
    // site = 'http://www.findengineeringschools.org/'
    // boom = 'http://colleges.startclass.com/d/o/Metallurgical-Engineering';
    // site = 'http://www.mymajors.com/colleges/metallurgical-engineering-major/',
    // site = 'https://bigfuture.collegeboard.org/college-search',
    type = 'metallurgical',
    site = 'http://www.collegeatlas.org/' + type + '-engineering-colleges.html',
    schools = [],
    majors = {},
    geocoderProvider = 'google',
    httpAdapter = 'https',
    // optional
    extra = {
      apiKey: 'AIzaSyAad08JMLkDIeg9d0loPNc9HD0lzmDfrEg', // for Mapquest, OpenCage, Google Premier
      formatter: null         // 'gpx', 'string', ...
    },
    geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


request(site, function (error, response, html) {
  // if (!error && response.statusCode == 200) {
  //   var $ = cheerio.load(html);
  //   $('span.comhead').each(function(i, element) {
  //     var a = $(this).prev();
  //     console.log(a.text());
  //   });

    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('h3').each(function(i, element) {
        var name = $(this).text(),
            location;
        if (name != '' && name.indexOf('\n\n') > -1) {
          name = name.trim();
          location = $(this).next().children('.tsignal').text().trim();

          var results = geocoder.geocode(location)
              .then(function(res) {
                var latLng = [res[0].latitude, res[0].longitude],
                    school = {
                    name: name,
                    location: location,
                    latLng: latLng,
                    type: type};

                schools.push(school);
                majors[type]=schools;

                jf.writeFile(file, majors, function(err) {
                  console.log(err);
                });
              })
              .catch(function(err) {
                  console.log(err);
              });
        }
      });



  }
});
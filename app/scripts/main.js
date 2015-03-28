'use strict';
console.log('\'Allo \'Allo!');

$(function() {
  $.getJSON('../images/data.json', function( data ) {

    $.each( data, function( key, val ) {
      console.log('Key:', key, 'Value:', val);
      // var markers = val;
      $('#map').vectorMap({
        map: 'us_aea_en',
        backgroundColor: 'gray',
        // markerStyle: {
        //      initial: {
        //        fill: '#F8E23B',
        //        stroke: '#F8E23B'
        //      }
        //    },
         markers: {latLng:
          [39.7510216,
          -105.2225769
        ]},
         series: {
           markers: [{
             attributes: {fill: 'pink'},
             scale: ['#FEE5D9', '#A50F15'],
             values: [1,2,3]
           }]
         },
         regions: [
          {attribute: 'fill'}
         ]
      });
    });
  });

});

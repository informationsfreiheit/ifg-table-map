//  leafleat 
var map = L.map('map').setView([48.949, 11.395], 7);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2014 OpenStreetMap contributors'
}).addTo(map);

$.getJSON( '/wp-content/plugins/ifg-table-map/js/bayern.json' , function(data) {
  var geoLayer;
  return geoLayer = L.geoJson(data, {
    style: { color: "#3375B6", fillColor: "#B2C7E3", weight: 3, opacity: 1 }
  }).addTo(map);
});

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [10, 10],
    }
});

jQuery(document).ready(function() { 
    $("#woinbayern").tablesorter(); 

    // get city name, pos and pdf from table
    $.each( $('#woinbayern tr'), function() { 
        var pos = $(this).data('pos') ;
        var cityname = $(this).attr('id') ;
        var name = $(this).find('.name').text() ;
        var satzlink = $(this).find('.satzlink').html(); 

        var iconString = 'icon' + $(this).data('gemart') ;

        // add bullets to map
        // window[iconString] trick from http://stackoverflow.com/a/5613859/2248997
        if ( typeof pos != 'undefined' && pos != 'none' ) {
            pos = pos.split(',');
            L.marker([ Number(pos[0]), Number(pos[1]) ], {icon: window[iconString] }).bindPopup( satzlink + "<a href='#" + cityname + "'>" + name + "</a>" ).addTo(map); 
        }
    }); 
});

/* payload */
// red
var icon = new LeafIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAAv0lEQVQYlTXPIU8CYQCA4ecDIZlMUBmb3epvOGYmOjVRbhb/g93oHyAddJKbg81sh00OdzvGeZDwzqC+9UkvvzVwNyC5JMENwp8JD0zXcVyvhsN63u/XT9Q9JghN3I7j+P5sNALt7ZaiEMryfM6qEREdNxv72cwxTakq7VZLFx0GJzn1x2KhU5ZUlf1yqTgc7FChueL0Is8HisJXlknz3DrLvOKNx4DQI4mIutjhHS9MMq7+VwKuu0Tf+GSKZ9Q/0IFOVMgrTdIAAAAASUVORK5CYII%3D'});
// blue
var iconLandkreis = new LeafIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAA3klEQVQYlT2PsU7CQABA3yGXQBhdbN2I0Z3Vb7hGJxNHo04uxIWV+AuGEb+h7ayTDrK4aIjBSZdKzqINd6Q13DFgfOvLGx6sqQHnhFHM5n4MnALizyHY7aXd64k/vnrxO0e3ns7A02ongNgAzrr9m8uLw21AMDOCwjrmldwjf/yoESr1Oau4e/omyyucByklNAJobkV1ytyPnjPmiyXOw3tmsNbC7w84R52vh/Rt8hoZY5BSYq1Faw3FGMppIgBBqx0TKkUjWJfFGPR9QqUPxP8JnNAMFG4J5TQFhoBfAVS8XfVK8EgaAAAAAElFTkSuQmCC'});
// yellow
var iconAusarbeitung = new LeafIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2wcOEyUlW0X05gAAANNJREFUGJU1z7EOwVAAQNH7lE6dxNCuIrH3P9qdUWKziIHJD9iNfsDGbpI0lYjRYvISLZHSajtVnwF3PdPV+FYB+q7LtNGgIyUGcPgZYjJhHQRDJWVX+X5LzeeoZpMVIDSgv1wOR/X6AABdfwAJQqRt30dWHAenKK5k2YaiCIESXa9hWWCauNUoQl0uO0wzBUqy7EyS5MQxlCVoUmLYduRCwut1JwwjguCO58F+z0wDDscjthBp+/mMOZ1yPA+2W1Z5zlj8T4CeZeG833C7sQYWgPoAC4FeOn1WF+AAAAAASUVORK5CYII%3D'});
// black
var iconausserkraft = new LeafIcon({iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAAcklEQVQYlXWPSwqDQBBE35szuDQ70UPFEybiGfRAisZ9Jos0cQhYUFBNV/UHvripg/oKjkBL0VzU/McVqIlkBnp1UifgHqYn6hHFDFRAFcas7okT70J7Kh2LFXOs6GPCANCp68WRze+TlNJD3dUtkg3AB1LkJUsnqQ1XAAAAAElFTkSuQmCC'});

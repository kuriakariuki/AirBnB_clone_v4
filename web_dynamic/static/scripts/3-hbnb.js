// Listen for changes on each input checkbox tag:
// if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
// if the checkbox is unchecked, you must remove the Amenity ID from the variable
// update the h4 tag inside the div Amenities with the list of Amenities checked

const $ = window.$;
$(document).ready(function () {
  const amenityList = {};
  $('input:checkbox').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if (this.checked) {
      amenityList[amenityId] = amenityName;
    } else {
      delete amenityList[amenityId];
    }

    const addName = $.map(amenityList, function (name) {
      return name;
    }).join(', ');
    $('div.amenities h4').text(addName);
  });
});


$('html').ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, txtStat) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  let places_list;

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    headers: {"Content-Type": "application/json"},
    data: JSON.stringify({}),
    context: $("section.places"),
    success: function (responses) {
     places_list = responses.map(function(res) {
       return `
           <article>
               <div class="title_box">
                   <h2>${res.name}</h2>
                   <div class="price_by_night">${res.price_by_night}</div>
               </div>
               <div class="information">
                   <div class="max_guest">${res.max_guest} Guest(s)</div>
                   <div class="number_rooms">${res.number_rooms} Bedroom(s)</div>
                   <div class="number_bathrooms">${res.number_bathrooms} Bathroom(s)</div>
               </div>
               <div class="description">
                   ${res.description}
               </div>
           </article>
       `
     })
 }
}).done(function() {
    $(this).html(places_list.join(''));
});
}


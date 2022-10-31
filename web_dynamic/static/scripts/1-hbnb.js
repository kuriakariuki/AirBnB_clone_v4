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

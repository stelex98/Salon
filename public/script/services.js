//href="/api/beauty_salon/service/${service.id}
let titleCard = document.getElementsByClassName('.card-image');
let checkServices = [];
let checkedServices = [];



function getServices() {
    $.ajax({
        url: "/api/beauty_salon/services",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(services) {
            console.log(services);
        }
    });
}


function service(element) {
    $.ajax({
        url: element.href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(service) {
            console.log(service[0]);
        }
    });
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

function sendNameAndDescribeServices(id, defaultValue) {
    let mySelectServices = $("#" + id + " :selected").text();
    checkServices.push(id);
    if (checkServices[0] == id) {
        $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги
    } else {
        reset();
        checkServices[0] = id;
    }
    $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги
}

function reset() {
  var select = $("#" + checkServices[0]);
  select.prop('selectedIndex', 0); //Sets the first option as selected
  select.formSelect();        //Update material select
}

getServices();
//href="/api/beauty_salon/service/${service.id}
let titleCard = document.getElementsByClassName('.card-image');
let checkServices = [];
let checkedServices = [];
let arrayDataOfService = [];

//для селектов
//{id: , service: , id_group: , group: }
function getServices() {
    $.ajax({
        url: "/api/beauty_salon/services",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (services) {
            console.log(services);
            service();
        }
    });
}

//для конкретной услуги
//
function service(id, num_service) {
    $.ajax({
        url: `/api/beauty_salon/service/${num_service}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (service) {
            let price = service[0].price;
            let describeService = service[0].about_service;
            let mySelectServices = $("#" + id + " :selected").text();

            $('.card-content')[0].innerText = `${describeService}\nЦена: $${price}`;
            checkServices.push(id);

            if (checkServices[0] == id) {
                $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги
            } else {
                reset();
                checkServices[0] = id;
            }
            $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги

        }
    });
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

function sendNameAndDescribeServices(id, defaultValue, value) {
    service(id, value);
}

function reset() {
    var select = $("#" + checkServices[0]);
    select.prop('selectedIndex', 0); //Sets the first option as selected
    select.formSelect();        //Update material select
}

getServices();
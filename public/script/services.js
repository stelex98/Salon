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
            
        }
    });
}

//для конкретной услуги
//
function sendNameAndDescribeServices(id, defaultValue, value) {
     $.ajax({
        url: `/api/beauty_salon/service/${value}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (service) {
            console.log(service);
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


function reset() {
    var select = $("#" + checkServices[0]);
    select.prop('selectedIndex', 0); //Sets the first option as selected
    select.formSelect();        //Update material select
}

getServices();

function openAuthorization(){
    window.location = 'http://localhost:3010/#auth';
    return false;
}

//logout
function exit(){
    $.ajax({
        url: "/api/logout",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
    });
    alert("Выход выполнен!");
    window.location = `http://localhost:3010/`;
}
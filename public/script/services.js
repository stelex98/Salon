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
            let arr_id = ['#spa', '#massage', '#cosmetology', '#makeup', '#eyebrows-eyelashes', '#nail-design', '#hairdressing'];
            let divs = '';
            for (let i = 0; i < services.length; i++) {
                $.each(services[i], function (index, service) {
                    divs += addOptionService(service);
                })
                $(arr_id[i]).append(divs);
                $(arr_id[i]).formSelect();
                divs = '';
            }

        }
    });
}

function addOptionService(service) {
    return `
        <option value="${service.id}">${service.service}</option>
    `;
}

//для конкретной услуги
let arrayIdServices = [];

function sendNameAndDescribeServices(id, event) {

    $.ajax({
        url: `/api/beauty_salon/service/${id}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (service) {
            reset();
            arrayIdServices.push('#' + event.path[0].id);

            let price = service[0].price;
            let describeService = service[0].about_service;
            let mySelectServices = service[0].service;

            $('.card-content')[0].innerText = `${describeService}\nЦена: ${price}`;
            checkServices.push(service[0].service);

            if (checkServices[0] == service[0].service) {
                $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги
            } else {
                checkServices[0] = service[0].service;
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

    for (let i = 0; i < arrayIdServices.length; i++) {
        $(arrayIdServices[i]).prop('selectedIndex', 0);
        $(arrayIdServices[i]).formSelect();

    }

    arrayIdServices.length = 0;
}

getServices();

function openAuthorization() {
    window.location = 'http://localhost:3010/#auth';
    return false;
}

//logout
function exit() {
    $.ajax({
        url: "/api/logout",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
    });
    alert("Выход выполнен!");
    window.location = `http://localhost:3010/`;
}










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
            for(let i=0; i<services.length; i++){
                $.each(services[i], function (index, service){
                    divs += addOptionService(service);
                })
                $(arr_id[i]).append(divs);
                $(arr_id[i]).formSelect();
                divs = '';
            }
            
        }
    });
}

function addOptionService(service){
    return `
        <option value="${service.id}">${service.service}</option>
    `;
}

//для конкретной услуги
//
function sendNameAndDescribeServices(id) {

     $.ajax({
        url: `/api/beauty_salon/service/${id}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (service) {
            console.log(service);
            let price = service[0].price;
            let describeService = service[0].about_service;
            let mySelectServices = service[0].service;

            $('.card-content')[0].innerText = `${describeService}\nЦена: ${price}`;
            checkServices.push(service[0].service);

            if (checkServices[0] == service[0].service) {
                $("#card-title")[0].innerText = mySelectServices; // запись в карточку названия услуги
            } else {
                reset();
                console.log('d');
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
let id_service;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});

$(document).ready(function() {
    getServices();

});

function getServices() {
    $.ajax({
        url: "/api/beauty_salon/services/recording",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (services) {
            var divs = `<select class='service-select'  onchange="onchangeServiceSelect(this);">
                    <option  value="" disabled selected>Выбор услуги</option>`;
            $.each(services, function (index, service){
                divs += addOptionService(service);

            })
            divs += `</select>`;

            $(".input-field.col.s6.choose-service").append(divs);
        }
    });
}

function addOptionService(service){
    return `
        <option data-id="${service.id}" value="${service.id_group}">${service.service}</option>
    `;
}

let select = document.getElementsByClassName('master-select');



function  onchangeServiceSelect(el){
    $(".datepicker.date").val('');
    $('.row.first').html('');
   id_service = el.selectedOptions[0].dataset.id;
    if(select.length){
        $('.master-select').remove();
    }
    let id_group = $(".service-select").val();
    $.ajax({
        url: `/api/beauty_salon/master/${id_group}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (masters) {
             var divs = `<select class='master-select'  onchange="onchangeMasterSelect();">
                    <option  value="" disabled selected>Выбор мастера</option>`;
            $.each(masters, function (index, master){
                divs += addOptionMaster(master);

            })
            divs += `</select>`;

            $(".input-field.col.s6.choose-master").append(divs);
        }
    });
}

function addOptionMaster(master){
    return `
        <option value="${master.id}">${master.name} ${master.surname}</option>
    `;
}

function  onchangeMasterSelect(){
    $('.row.first').html('');
    $(".datepicker.date").val('');
    let id_master = $(".master-select").val();
    console.log('id_master ', id_master);

}


let arr_time = [];

function onchangeDate(){
    $('.row.first').html('');
    arr_time = ['08:00-09:45', '10:00-11:45', '12:00-13:45', '14:00-15:45', '16:00-17:45', '18:00-19:45']
    let date = $(".datepicker.date").val();
    let id_master = $(".master-select").val();
    console.log('date ', date);
    $.ajax({
        url: "/api/beauty_salon/date_time",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            date: date,
            id_master: id_master
        }),
        success: function (schedule) {
            let checkBoxTime = '';
            $.each(schedule, function (index, record){
                for(let i = 0; i<6; i++){
                    if(arr_time[i] === record.time){
                        arr_time.splice(i, 1);
                    }
                }
            });
            for(let i = 0; i < arr_time.length; i++){
                checkBoxTime += fun_boxTime(arr_time[i]);
            }
            $('.row.first').append(checkBoxTime);

       }
    });
}

function fun_boxTime(time){
    return `
            <label>
                    <input type="checkbox" value=${time} />
                    <span>${time}</span>
            </label>
    `;
}

function record(){
    let time;
    $('input:checkbox:checked').each(function(){
        time = $(this).val();
    });
    $.ajax({
        url: "/api/beauty_salon/recording",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id_service: id_service,
            id_master: $(".master-select").val(),
            date: $(".datepicker.date").val(),
            time: time
        }),
        success: function (record) {
            console.log(record);
            alert('Вы записaны на услугу!');
            window.location = `http://localhost:3010/`;

       }
    });


}

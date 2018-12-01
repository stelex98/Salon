

function getValueOfElement(value) {
    let priceTable = document.querySelector('tbody');
    $.ajax({
        url: `/api/beauty_salon/service_price/${value}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (service_price) { //service_price
            let serviceLength = service_price.length;
            let services = {};
            let elementServices;
            let i = 0;

            clearTable();

            for (i; i < serviceLength; i++) {
                services = { 'service': service_price[i].service, 'price': service_price[i].price };
                elementServices = addInformationInnerTable(services);
                $("#priceTable").append(elementServices);
            }
        }


    });
}

function clearTable() {

    let container = document.getElementById('priceTable');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


function addInformationInnerTable(services) {
    return `
    <tr>
        <td>${services.service}</td>
        <td>$${services.price}</td>
    </tr>
    `;
}

function divs(group) {
    return `
        <div id='gr${group.id}'>
            <a  href='/api/beauty_salon/service_by_group/${group.id}'  onclick="return price(this);" ">${group.group}</a><br >
        </div>
    `;
}


function price(element) {
    $.ajax({
        url: element.href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (services) {
            let p = "";
            for (let i = 0; i < services.length; i++) {
                p += ps(services[i]);
            }
            let id = element.parentElement.id;
            console.log(id);

            let div = document.getElementById("id");
            div.insertAdjacentHTML('beforeEnd', p);

        }
    });
    return false;
}



// function openPriceList(services){
//     let p ='';
//     for(let i=0; i<div_price.length; i++){
//         div_price[i].onclick = () => {
//             for(let j=0; j<services.length; j++){
//                 p += ps(services[i]);
//             }
//             div_price[i].insertAdjacentHTML('beforeEnd', p);  
//         }
//     }
// }


function ps(service) {
    return `
        <p> ${service.service} ${service.price}</p>
    `;
}

//для записи на услугу
function recording(element) {
    $.ajax({
        url: "/recording_check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.text === true)
                window.location = `http://localhost:3010/recording`;
            else
                alert(data.text);
        }
    });
    return false;
}

(function () {
    $.ajax({
        url: "/check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            if (data.check === 'user') {
                linkAccount(data.login);
            }
            if (data.check === 'admin') {
                linkSetting();
            }
        }
    });
})();

function linkAccount(login) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
    let account = `<a class='user-account' id='account' href='/personal-account'>Личный кабинет (${login})</a>`;
    let logout = `<a class='user-account' onclick='return exit(this);'>Выход</a>
    <style>
        .user-account{
            color: #980FA0;
            margin-left: 20%;
            display: inline-block;
            font-family: 'Open Sans', sans-serif
        }
    </style>`;
    $(".auth-registr").append(account);
    $(".auth-registr").append(logout);
}

function linkSetting() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
    
    let editService = `<a class='admin-block' id='setting' href='/setting'>Редактирование информации</a>`;
    let logout = `<a class='admin-block' onclick='return exit(this);'>Выход</a>
    <style>
        .admin-block{
            color: #980FA0;
            margin-left: 20%;
            display: inline-block;
            font-family: 'Open Sans', sans-serif
        }
    </style>`;
    $(".auth-registr").append(editService);
    $(".auth-registr").append(logout);

}

// getGroups();
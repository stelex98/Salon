const ws = new WebSocket('ws://localhost:3030');
const send = document.getElementById('send');
let text = document.getElementById('text_review');
let form_reviewsOk = document.getElementsByClassName("reviewsOk");
let form_reviewsNot = document.getElementsByClassName("popupError");
let a = document.getElementById('overlay');
let b = document.getElementById('popup');
let authorization_div = document.getElementById("authorization-div");
let id_client = 0;

ws.onopen =  () => {
    console.log('websocket is connected ...');
}

ws.onclose =  () => {
    console.log('websocket is disconnected ...');
    ws.send('close');
}

send.onclick = () => {
    let message = id_client + "|" + text.value;
    ws.send(message);
    cancel();
}

ws.onmessage = function (data) {
    printMessage(data.data);
}

function printMessage(message){
    let arr = message.split('|');
    $.ajax({
        url: `/api/beauty_salon/client/${arr[0]}`,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            let review = {'photo': data[0].photo, 'review': arr[1], 'name': data[0].name};
            $("#idListReviews").append(addDivReview(review));
        }
    });
}

function addDivReview(review){
	return `
        <div class='review-block'>
            <img src="${review.photo}" alt="User" align = "right">
            <p>${review.review}</p>
            <p>-${review.name}</p>
        </div>
    `;
}

function getReviews() {
    $.ajax({
        url: "/api/beauty_salon/reviews",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (reviews) {
            var divs = "";
            $.each(reviews, function (index, review){
                 divs += addDivReview(review);
            })
            $("#idListReviews").append(divs);
        }
    });
}


getReviews();

function cancel(){
    form_reviewsOk[0].style.display = "none";
    form_reviewsNot[0].style.display = "none";
    a.style.display = "none";
    b.style.display = "none";
}

function openBlockReview(){
    form_reviewsOk[0].style.display = "block";
    a.style.display = "block";
    b.style.display = "block";
}

function openBlock(){
    a.style.display = "block";
    b.style.display = "block";
    form_reviewsNot[0].style.display = "block";
}

function addReview (element){
    $.ajax({
        url: "/addReview_check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            if(data.key){
                idUser(data.key);
            }
            else{
                openBlock();
            }
        }
    });
    return false;
}

//определение id клиента (для отзыва)
function idUser(id_u){
    $.ajax({
        url: `api/user_client`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({id_user: id_u}),
         success: function (data) {
            id_client = data.id;
            openBlockReview();
        }
    });
}

function openAuthorization(){
    console.log('open');
    window.location = 'http://localhost:3010/#auth';
    return false;
}


function linkAccount(login){
    document.getElementById('auth').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
    let account = `<a class='user-account' id='account' href='/personal-account'>Личный кабинет (${login})</a>`;
    let logout = `<a class='user-account' onclick='return exit(this);'>Выход</a>
    <style>
        .user-account{
            color: white;
            margin-left: 20%;
            display: inline-block;
            font-family: 'Open Sans', sans-serif
        }
    </style>`;
    $(".auth-registr").append(account);
    $(".auth-registr").append(logout);
}

function linkSetting(){
    document.getElementById('auth').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
    let editService = `<a class='admin-block' id='setting' href='/setting'>Редактирование информации</a>`;
    let myRecord = `<a class='admin-block' id='setting' href='/my_records'>Мои записи</a>`;
    let logout = `<a class='admin-block' onclick='return exit(this);'>Выход</a>
    <style>
        .admin-block{
            color: white;
            margin-left: 20%;
            display: inline-block;
            font-family: 'Open Sans', sans-serif
        }
    </style>`;
    $(".auth-registr").append(editService);
    $(".auth-registr").append(myRecord);
    $(".auth-registr").append(logout);
}

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

//для записи на услугу
function recording(element){
    $.ajax({
        url: "/recording_check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.text === true)
                window.location = `http://localhost:3010/recording`;
            else
                alert(data.text);
        }
    });
    return false;
}


(function(){
    $.ajax({
        url: "/check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            if(data.check === 'user'){
                linkAccount(data.login);
            }
            if(data.check === 'admin'){
                linkSetting();
            }
        }
    });
    if(window.location.href === 'http://localhost:3010/reviews#guest'){
        openBlock();
    }
    else{
        if(window.location.href !== 'http://localhost:3010/reviews'){
            idUser(window.location.hash.substr(1));
            openBlockReview();
        }
    }
})();


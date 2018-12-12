let authorization_div = document.getElementById("authorization-div");
let a = document.getElementById('overlay');

$(document).ready(function() {
    $('.slider').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 900,
    });
    getReviews();
});

//загрузка отзывов
function getReviews() {
    $.ajax({
        url: "/api/beauty_salon/reviews",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (reviews) {
            let n = reviews.length;
            $(".inner0").append(div(reviews[n-1]));
            $(".inner1").append(div(reviews[n-2]));
            $(".inner2").append(div(reviews[n-3]));
            $(".inner3").append(div(reviews[n-4]));
            $(".inner4").append(div(reviews[n-5]));
        }
    });
}

function div(review){
	return `
    <div class="text">
        <img src="${review.photo}" alt="User" align = "right">
        <p>${review.review}</p>
        <p>-${review.name}</p>
    </div>
	`;
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

let login = document.getElementById('login');
let password = document.getElementById('password');

function openAuthorization(){
    authorization_div.style.display = "block";
    a.style.display = "block";
    return false;
}

function closeeee(){
    authorization_div.style.display = "none";
    a.style.display = "none";
}

function enterClick(){
    let salt = CryptoJS.lib.WordArray.random(128/8);
    let hash = CryptoJS.PBKDF2(password.value, salt, { keySize: 128/32 });
    $.ajax({
        url: "/api/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            log: login.value,
            pass: hash.toString(),
            salt: salt
        }),
        success: function (data) {
            console.log(data);
            if(typeof data.role === 'boolean'){
                if(data.role){  //true - admin
                    linkSetting();
                }
                else{
                    linkAccount(data.login);
                }
            }
            else
                alert(data);
        }
    });
    login.value = '';
    password.value ='';
    closeeee();
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

function addReview (element){
    $.ajax({
        url: "/addReview_check",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            if(data.key){
                window.location = `http://localhost:3010/reviews#${data.key}`;
            } else{
                window.location = 'http://localhost:3010/reviews#guest';
            }
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
    if(window.location.href === 'http://localhost:3010/#auth'){
        openAuthorization();
    }
})();

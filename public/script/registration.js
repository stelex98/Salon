
let r_login = document.getElementById("login-reg");
let r_password = document.getElementById("password-reg");
let r_password_repeat = document.getElementById("password_repeat-reg");
let r_name = document.getElementById("name-reg");
let r_surname = document.getElementById("surname-reg");
let r_date_birth = document.getElementById("date_birth-reg");
let r_mail = document.getElementById("mail-reg");
let r_phone = document.getElementById("phone-reg");
let r_photo = document.getElementById("photo-reg");
let pass, n, s, d, m, p, ph;


var inputs = document.querySelectorAll('.photo-reg');

Array.prototype.forEach.call(inputs, function(input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function(e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
            fileName = e.target.value.split('\\').pop();

        if (fileName)
            label.querySelector('strong').innerHTML = fileName;
        else
            label.innerHTML = labelVal;
    });
});


let reader = new FileReader();
let uploadImage = function(image) {

    reader.onloadend = function() {

    };
    reader.readAsDataURL(image);
};

function registration_block(){
	$.ajax({
        url: "/api/signup_check",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            login: r_login.value
        }),
        success: function (user) {
        	if(user.length !== 0){
        		alert("Пользователь с таким логином уже существует!");
        	}
        	else{
        		if(r_password.value !== r_password_repeat.value){
        			alert('Пароли не совпадают!');
				}
				else{
                    console.log('tyt');
					registration();
				}
        	}
       }
    });
}

function registration(){
    $.ajax({
        url: "/api/signup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            login: r_login.value,
			password: r_password.value,
			name: r_name.value,
			surname: r_surname.value,
			date_birth: r_date_birth.value,
			mail: r_mail.value,
			phone: r_phone.value,
			photo: reader.result,
			role: false
        }),

        success: function (data) {
        	console.log(data);
        	alert('Вы успешно зарегистрировались!');
        	window.location = 'http://localhost:3010/';
       }
    });
}

function back(){
   window.location = 'http://localhost:3010/';
}
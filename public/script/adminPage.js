
let currentEventEdit;
let checkActionAddOrEdit = 0;
var idGroup = 0;
var id = 0;
let reader = new FileReader();

let uploadImage = function (image) {

  reader.onloadend = function () {

  };
  reader.readAsDataURL(image);
};

function checkButtonToAdd(ev) {

  if (checkActionAddOrEdit == 0) {
    console.log('Редактируем');
    let newServices = $('input#services.validate.inputServices')[0].value;
    let newPrice = $('input#price.validate.inputPrice')[0].value.slice(1);
    newPrice = parseInt(newPrice);
    console.log(newPrice);
    let newDescribe = $('textarea#describeText.materialize-textarea.inputDescribe')[0].value;
    console.log(reader.result);
    // let srcImage =
    console.log(newServices, newPrice, newDescribe );
    $.ajax({
      url: `/api/beauty_salon/service/${id}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        service: newServices,
        id_group: idGroup,
        price: newPrice,
        picture: reader.result,
        about_service: newDescribe
      }),
      success: function (service) {
        console.log(service);
        location.reload(true);

        //$('#myTable3').append(newRowInformation);
      }
    });
    // currentEventEdit.path[2].cells[0].innerHTML = newServices;
    // currentEventEdit.path[2].cells[1].innerHTML = newPrice;
    // currentEventEdit.path[2].cells[2].innerHTML = newDescribe;
  } else {
    let newServices = $('input#services.validate.inputServices')[0].value;
    let newPrice = $('input#price.validate.inputPrice')[0].value;
    let newDescribe = $('textarea#describeText.materialize-textarea.inputDescribe')[0].value;
    let newRowInformation = addInformationInnerTableInf(newServices, newPrice, newDescribe, idGroup);
    console.log(reader.result);
    $.ajax({
      url: "/api/beauty_salon/service",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        service: newServices,
        id_group: idGroup,
        price: newPrice,
        picture: reader.result,
        about_service: newDescribe
      }),
      success: function (service) {
        console.log(service);
        //$('#myTable3').append(newRowInformation);
        location.reload(true);

      }
    });

  }
}

function deleteInformation(ev) {
  let b = $('#myTable3');
  let a = ev.path[2];
  a.remove();
}

function addNewServices(ev) {
  checkActionAddOrEdit = 1;
}

function addInformationInnerTableInf(newServices, newPrice, newDescribe, srcImage, id_group, id) {
  return `
  <tr data-id=${id} data-id_group=${id_group}>
      <td>${newServices}</td>
      <td>$${newPrice}</td>
      <td style ="width: 10% !important;
      white-space: nowrap;
      overflow: hidden;
      position: absolute;
      text-overflow: ellipsis;">${newDescribe}</td>
      <td><img src="${srcImage}" alt="альтернативный текст" style="width: 30px; height: 30px; margin-left: 25%;"></td>
      <td><i onclick="deleteInformation(event)" class="centered small material-icons">delete</i></td>
      <td onclick="changeInformation(event)"><i class="centererd small material-icons modal-trigger"
                                            href="#modal1">edit</i></td>
  </tr>
  `;
}

function inicializate() {
  $('.tabs').tabs();
  M.updateTextFields();
  $('.datepicker').datepicker();
  $('.modal').modal();
}

$(document).ready(function () {
  inicializate();
});


function changeInformation(ev) {
  id = ev.path[2].dataset.id;
  checkActionAddOrEdit = 0;
  currentEventEdit = ev;
  let services = ev.path[2].cells[0].innerHTML;
  let price = ev.path[2].cells[1].innerHTML;
  let describe = ev.path[2].cells[2].innerHTML;
  let srcImage = ev.path[2].cells[3].childNodes[0].src;
  console.log(srcImage.slice(22));
  srcImage = srcImage.slice(21);
  transitionToWindow(services, price, describe, srcImage);
}

function transitionToWindow(services, price, describe, srcImage) {

  $('input#services.validate.inputServices')[0].value = services;
  $('input#price.validate.inputPrice')[0].value = price;
  $('textarea#describeText.materialize-textarea.inputDescribe')[0].value = describe;
  $('input.file-path.validate')[0].value = srcImage;
}

var listLocation = new Vue({
  el: '.list-location',
  data: {
    place: 'МИНСК, ПР-Т НЕЗАВИСИМОСТИ 93',
    phone: '+375 (29) 618-35-05',
  }
});

var addInfromationOnPage = new Vue({
  el: "#myTable3",
  data: {
    addReviewsText: 'Добавить услугу:',
    reviews: 'Услуга',
    price: 'Цена',
    desicribeRev: 'Об услуге',
    deleteRev: 'Удалить',
    editRev: 'Редактировать'
  }
});

var authRegistr = new Vue({
  el: '.auth-registr',
  data: {
    addInf: 'Добавить информацию',
    nameAdmin: 'Имя: Admin',
    mineReviewsList: 'Мои записи',
    exit: 'Выход'
  },
  methods: {
    showAddInf: function () {
      rowFirst.seen = false;
      rowFirst.seen2 = true;
      getServices();
    },
    showMineAndAllReviews: function () {
      rowFirst.seen = true;
      rowFirst.seen2 = false;
      getMyRecords();
      getRecords();
    }

  }
});

var mainMenu = new Vue({
  el: '.main-menu-item',
  data: {
    mainPage: 'Главная',
    servicesPage: 'Услуги',
    pricePage: 'Цены',
    reviewsPage: 'Отзывы',
    contactPage: 'Контакты',
    recordPage: 'Запись'
  }
});

var footerItem = new Vue({
  el: '.footer-item',
  data: {
    titleName: '© Косметический салон',
    nameSalon: '"The Royal"',
    phone: '+375 (29) 179-98-11 +375 (25) 741-06-84',
    linkVk: 'vk',
    linkInst: 'inst',
    titleDev: 'Разработка сайта',
    nameDeveloper: 'Адамович Артур'
  }
});

var mineReviews = new Vue({
  el: '.mineReviews',
  data: {
    number: 'Номер',
    reviews: 'Услуга',
    lastfirstName: 'ФИО клиента',
    date: 'Дата',
    time: 'Время'
  }
});

var mineSecondReviews = new Vue({
  el: '.mineSecondReviews',
  data: {
    number: 'Номер',
    reviews: 'Услуга',
    lastfirstName: 'ФИО клиента',
    date: 'Дата',
    time: 'Время'
  }
});

var tabs = new Vue({
  el: '.tabs',
  data: {
    mineReviews: 'Мои записи',
    allReviews: 'Все записи'
  }
});

var rowFirst = new Vue({
  el: '#myRow',
  data: {
    seen: true,
    seen2: false,
  }
});

//получение записей конкретного мастера
function getMyRecords() {
  $.ajax({
    url: "/api/beauty_salon/services/master/my-records",
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    success: function (records) {

      clearTable();
      for (let i = 0; i < records.length; i++) {
        recordsNew = { 'number': i + 1, 'service': records[i].service, 'client': records[i].client, 'date': records[i].date, 'time': records[i].time };
        let mineRecordsByAdmin = addInformationInnerTable(recordsNew);
        $("#myTableTbody").append(mineRecordsByAdmin);
      }
    }
  });
}

function getRecords() {
  $.ajax({
    url: "/api/beauty_salon/services/master/records",
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    success: function (records) {
      clearTableAllReviews();

      for (let i = 0; i < records.length; i++) {
        recordsNew = { 'number': i + 1, 'service': records[i].service, 'master': records[i].master, 'client': records[i].client, 'date': records[i].date, 'time': records[i].time };
        let mineRecordsByAdmin = addInformationInnerTableForAllReviews(recordsNew);
        $("#myTable2Tbody").append(mineRecordsByAdmin);
      }
    }
  });
}

//получение услуг конкретного мастера
function getServices() {
  $.ajax({
    url: "/api/beauty_salon/master/services",
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    success: function (services) {
      idGroup = services[0].id_group;
      id = services[0].id;
      console.log(services);
      for (let i = 0; i < services.length; i++) {
        let newRowInformation = addInformationInnerTableInf(services[i].service, services[i].price, services[i].about_service, services[i].picture, services[i].id_group, services[i].id);
        $('#myTable3').append(newRowInformation);
      }
    }
  });
}

function addInformationInnerTableForAllReviews(recordsNew) {
  return `
  <tr>
      <td>${recordsNew.number}</td>
      <td>${recordsNew.service}</td>
      <td>${recordsNew.master}</td>
      <td>${recordsNew.client}</td>
      <td>${recordsNew.date}</td>
      <td>${recordsNew.time}</td>
  </tr>
  `;
}

function addInformationInnerTable(recordsNew) {
  return `
  <tr>
      <td>${recordsNew.number}</td>
      <td>${recordsNew.service}</td>
      <td>${recordsNew.client}</td>
      <td>${recordsNew.date}</td>
      <td>${recordsNew.time}</td>
  </tr>
  `;
}

function clearTable() {

  let container = document.getElementById('myTableTbody');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function clearTableAllReviews() {

  let container = document.getElementById('myTable2Tbody');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

(function () {
  if (window.location.href === 'http://localhost:3010/setting') {
    authRegistr.showAddInf();
  }
  else {
    authRegistr.showMineAndAllReviews();
  }
})();



//для добавления услуги
/*
function addService() {
  $.ajax({
    url: "/api/beauty_salon/service",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        service:  
        id_group:
        price:
        picture:
        about_service:
    }),
    success: function (service) {
      console.log(service);
  })
}

*/
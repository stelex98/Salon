
let currentEventEdit;
let checkActionAddOrEdit = 0;

function checkButtonToAdd(ev) {

  if (checkActionAddOrEdit == 0) {
    console.log('Редактируем');
    let newServices = $('input#services.validate.inputServices')[0].value;
    let newPrice = $('input#price.validate.inputPrice')[0].value;
    let newDescribe = $('textarea#describeText.materialize-textarea.inputDescribe')[0].value;

    currentEventEdit.path[2].cells[0].innerHTML = newServices;
    currentEventEdit.path[2].cells[1].innerHTML = newPrice;
    currentEventEdit.path[2].cells[2].innerHTML = newDescribe;
  } else {
    console.log('Добавляем');
    let newServices = $('input#services.validate.inputServices')[0].value;
    let newPrice = $('input#price.validate.inputPrice')[0].value;
    let newDescribe = $('textarea#describeText.materialize-textarea.inputDescribe')[0].value;

    let newRowInformation = addInformationInnerTable(newServices, newPrice, newDescribe);

    $('#myTable3').append(newRowInformation);
    console.log(newServices, newPrice, newDescribe);
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

function addInformationInnerTable(newServices, newPrice, newDescribe) {
  return `
  <tr>
      <td>${newServices}</td>
      <td>$${newPrice}</td>
      <td>${newDescribe}</td>
      <td><i onclick="deleteInformation(event)" class="centered small material-icons">delete</i></td>
      <td onclick="changeInformation(event)"><i class="centererd small material-icons modal-trigger"
                                            href="#modal1">edit</i></td>
  </tr>
  `;
}

function inicializate() {
  $("#myTable").tablesorter();
  $("#myTable2").tablesorter();
  $("#myTable3").tablesorter();
  $('.tabs').tabs();
  M.updateTextFields();
  $('.datepicker').datepicker();
  $('.modal').modal();
}

$(document).ready(function () {
  inicializate();
});


function changeInformation(ev) {
  checkActionAddOrEdit = 0;
  currentEventEdit = ev;
  console.log("ev: ", ev);
  let services = ev.path[2].cells[0].innerHTML;
  let price = ev.path[2].cells[1].innerHTML;
  let describe = ev.path[2].cells[2].innerHTML;

  console.log(services, price, describe);

  transitionToWindow(services, price, describe);
}

function transitionToWindow(services, price, describe) {

  $('input#services.validate.inputServices')[0].value = services;
  $('input#price.validate.inputPrice')[0].value = price;
  $('textarea#describeText.materialize-textarea.inputDescribe')[0].value = describe;

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

    },
    showMineAndAllReviews: function () {
      rowFirst.seen = true;
      rowFirst.seen2 = false;
      getMyRecords();
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

let fullNameArray = [];

function getMyRecords() {
  fullNameArray.length = 0;
  $.ajax({
    url: "/api/beauty_salon/services/master/my-records",
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    success: function (records) {
      //let serviceLength = service_price.length;
      let recordsNew = {};
      let i = 0;

      console.log(records);

      $.each(records, (index, record) => {
        getFullName(record.id_profile)
      })
      setTimeout(() => {
        console.log('massiv imen ', fullNameArray);

        for (i; i < fullNameArray.length; i++) {
          recordsNew = { 'number': i + 1, 'service': records[i].service, 'fullName': fullNameArray[i], 'date': records[i].date, 'time': records[i].time };
          console.log('Records: ', recordsNew);
          let mineRecordsByAdmin = addInformationInnerTable(recordsNew);
          $("#myTableTbody").append(mineRecordsByAdmin);
        }
      }, 100);
      setTimeout(() => {
        inicializate();
        $("#myTable").tablesorter();
      }, 200);
    }
  });
}

function addInformationInnerTable(recordsNew) {
  return `
  <tr>
      <td>${recordsNew.number}</td>
      <td>${recordsNew.service}</td>
      <td>${recordsNew.fullName}</td>
      <td>${recordsNew.date}</td>
      <td>${recordsNew.time}</td>
  </tr>
  `;
}

function clearTable() {

  let container = document.getElementById('priceTable');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function getFullName(id_profile) {

  $.ajax({
    url: `/api/beauty_salon/services/master/my-records/${id_profile}`,
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    success: function (fullName) {
      //console.log(fullName.name + ' ' + fullName.surname);
      fullNameArray.push(fullName.name + ' ' + fullName.surname);
    }
  });

}


(function () {
  if (window.location.href === 'http://localhost:3010/setting') {
    authRegistr.showAddInf();
  }
  else {
    authRegistr.showMineAndAllReviews();
  }
})();


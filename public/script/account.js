$(document).ready(function() {
    getRecords();

});

function getRecords() {
    $.ajax({
        url: "/api/beauty_salon/records_client",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (records) {
            console.log(records);
            let table = '';
            for(let i = 0; i < records.length; i++)
                table += `<tr data-id=${records[i].id}><td>${records[i].service}</td><td>${records[i].date.slice(0, 10)}</td> <td>${records[i].time}</td><td>${records[i].price}</td><td><a>Отменить</a></td></tr>`;
            let length = records.length;
            $('.highlight').append(table);
        }
    });
}

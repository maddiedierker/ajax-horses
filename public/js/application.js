$(document).ready(function() {
  $('#new-horse').on('click', function(event) {
    event.preventDefault();
    $('#new-horse').hide();
    $.ajax({
      method: "get",
      url: "/horses/new"
    })
    .done(function(response) {
      $('.container').append(response);
    });
  });

  $('.container').on('submit', '#horse-form', function(event) {
    event.preventDefault();
    var horseInfo = $(this).serialize();
    $.ajax({
      method: "post",
      url: "/horses",
      data: horseInfo
    })
    .done(function(data) {
      $('#horse-list').append(data);
      $('#new-horse').show();
      $('#horse-form, h2').remove();
    });
  });

  $('#horse-list div').on('click', function(event) {
    event.preventDefault();

    if (document.getElementById("horse-info")) {
      document.getElementById("horse-info").remove();
    };

    var linkChildren = $(this).children()[0];
    var url = $(linkChildren).children().attr('href');
    var id = url.replace("/horses/", "");

    $.ajax({
      method: "get",
      url: url
    })
    .done(function(response) {
      $('#horse' + id).append(response);
    });
  });
});

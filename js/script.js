$(function () {

  var instapics = '';
      pagination = '';
  var $getPhotogrid = $('.photogrid');
  var failSafe = $('<img class="loader-gif" src="images/ajax-loader.gif">');

  $('.search-button').on('click', function (event) {

    event.preventDefault();

    $('.search-button').css({
      outline:'none',
    });
    $('.header').css({
      height: '10vh',
      'flex-direction': 'row',
    });
    $('input').css({
      'background-color': 'black',
    });
    $('div.button-section').css({
      'display':'flex',
      'justify-content':'center',
      'margin-top':'2rem',
    });


    $getPhotogrid.append(failSafe);

    var hashtag = $('input[name="search"]').val();

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682',
    })
        .done(function ($instapics) {
            $.each($instapics.data, function (index, value) {
              instapics += '<li>';
              instapics += '<section class="photogrid-container">';
              instapics += '<a href="' + value.link + '"><img src="' + value.images.standard_resolution.url + '"/></a>';
              instapics += '<div class="metadata-block">';
              instapics += '<div class="profile-picture"><img src="' + value.user.profile_picture + '"/></div>';
              instapics += '<div class="metadata-content">';
              instapics += '<div class="username">' + value.user.username + ' </div>';
              instapics += '<div class="counts"> ' + '<i class="fa fa-heart"></i>' + ' ' + value.likes.count + '  ';
              instapics += '<i class="fa fa-comments"></i>' + ' ' + value.comments.count + '</div>';
              instapics += '</div>';
              instapics += '</div>';
              instapics += '</section>';
              instapics += '</li>';

            });

            $getPhotogrid.empty().append(instapics); //empties photo cache
            instapics = '';
          })

        .fail(function (failSafeError) {
          $('.photogrid').empty().append('<p class="sorry_msg">Sorry! Instagrid has encountered a problem, please try again.</p>');
        })

        .always(function (failSafeError) {
          $('.loader-gif').hide();
        });

        instapics= '';

        //animations-----------------------------*
          $('.search-button').on('click', function(event){
            $(this).find('.header').addClass('photogrid-slide');
          });

          $('.search-button').on('click', function(event){
            $(this).find('.header').removeClass('photogrid-slide');
          });

          $('body').on('mouseover', 'li', function (event) {
            $(this).find('.metadata-block').addClass('metadata-block-hover');
          });
          $('body').on('mouseout', 'li', function (event) {
            $(this).find('.metadata-block').removeClass('metadata-block-hover');
           });


  });//initial function closing brackets--*




// load more function--------------------*
$('button.load-more').on('click', function() {

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: pagination,
    })
    .done(function (instapics) {
        pagination = instapics.pagination.next_url;
        instapics = '';
          $.each(instapics.data, function (index, value) {
            instapics += '<li>';
            instapics += '<section class="photogrid-container">';
            instapics += '<a href="' + value.link + '"><img src="' + value.images.standard_resolution.url + '"/></a>';
            instapics += '<div class="metadata-block">';
            instapics += '<div class="profile-picture"><img src="' + value.user.profile_picture + '"/></div>';
            instapics += '<div class="metadata-content">';
            instapics += '<div class="username">' + value.user.username + ' </div>';
            instapics += '<div class="counts"> ' + '<i class="fa fa-heart"></i>' + ' ' + value.likes.count + '  ';
            instapics += '<i class="fa fa-comments"></i>' + ' ' + value.comments.count + '</div>';
            instapics += '</div>';
            instapics += '</div>';
            instapics += '</section>';
            instapics += '</li>';
          });

    $getPhotogrid.append(instapics);

  });

    //end of load more

  });

});

$(function () {
  var instapics = '';
  var $getPhotogrid = $('.photogrid');
  var failSafe = ('<img src=images/ajax-loader.gif style="width:3rem;">');

  $('.search-button').on('click', function (event) {
    event.preventDefault();
    $('.search-button').css({
      outline:'none',
    });
    $('.header').css({
      height: '40px',
      'flex-direction': 'row',
    });
    $('input').css({
      'background-color': 'black',
    });

    $getPhotogrid.append(failSafe);

    var hashtag = $('input[name="search"]').val();

    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682',
    })

          .done(function ($instaData) {
            console.log($instaData);
            $.each($instaData.data, function (index, value) {
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

              console.log(instapics);
            });

            $getPhotogrid.empty().append(instapics); //empties photo cache
            instapics = '';
          })

          .fail(function (failSafe) {
            $('.photogrid').empty().append('<p class="sorry_msg">Sorry! Instagrid has encountered a problem, please try again.</p>');
          })


        .always(function (failsafe) {
          $('.photogrid').remove(failSafe);
        });

  });

  $('body').on('mouseover', 'li', function (event) {
    $(this).find('.metadata-block').addClass('metadata-block-hover');
  });
  $('body').on('mouseout', 'li', function (event) {
    $(this).find('.metadata-block').removeClass('metadata-block-hover');
  });

  //initial function closing brackets below.
});

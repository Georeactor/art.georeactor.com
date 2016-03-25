$(function() {
  var URL = window.URL || window.webkitURL;
  var reader  = new FileReader();

  // color editor
  $('.color').spectrum({
    color: '#444',
    preferredFormat: 'hex'
  });

  var snapout, ctx;

  // source image selector and grid preview
  $('.source').each(function(i, col) {
    var imagePick = $("<input type='file'/>");
    imagePick.on("change", function(e) {
      // get the image picked by the user, without POST / refresh
      if (!e.target.files.length) {
        return;
      }
      var img = e.target.files[0];

      reader.onload = function(data) {
        // console.log(data);
        var png = reader.result;

        // get the texture definition that the user is looking at
        var row = $(e.target).parents('tr');

        // preview the image as a texture
        var texturegrid = $('<table class="grid"><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>');
        texturegrid.find('td').each(function (i, td) {
          var pngimg = $('<img/>').attr('src', png);
          $(td).append(pngimg);
        });
        row.find('.output').html('').append(texturegrid);

        var pp = new Image();
        pp.onload = function() {
          snapout = $('<canvas>').attr('width', pp.width).attr('height', pp.height)[0];
          ctx = snapout.getContext('2d')
          ctx.drawImage(pp, 0, 0);
        };
        pp.src = png;

        var startimg = $('<img/>').attr('src', png);
        row.find('.crop').addClass('activate').html(startimg);
        row.find('.crop img').cropper({
          crop: function (e) {
            var imageData = ctx.getImageData(e.x, e.y, e.width, e.height);
            var outt = $('<canvas>').attr('height', e.height).attr('width', e.width)[0];
            outt.getContext('2d').putImageData(imageData, 0, 0);
            texturegrid.find('img').attr('src', outt.toDataURL());
          }
        });
      };
      reader.readAsDataURL(img);
    });
    $(col).append(imagePick);
  });

  // update map
  $('.update-map').click(function() {
    var bgcolor = $('input.color').val();

    var textures = {};
    var tiles = $('.output');
    for (var t = 0; t < tiles.length; t++) {
      var src = $(tiles[t]).find('img').attr('src');
      var texturename = $(tiles[t]).parent().find('.type').text();
      texturename = texturename.toLowerCase().split(' ')[0];
      if (src) {
        textures[texturename] = src;
      }
    }

    //console.log(textures);
    $.post('/upload', {
      _csrf: $('.csrf').val(),
      background: bgcolor,
      textures: textures
    }, function (data) {
      if (data.success) {
        $('#map').html('');
        $('.reveal').removeClass('hide').attr('href', '/map/view/' + data._id);
        renderMap(bgcolor, '/sprite/' + data._id);
      }
    });
  });
});

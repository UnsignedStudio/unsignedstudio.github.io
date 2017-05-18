function myMap() {
  var myCenter = new google.maps.LatLng(-37.8118494,144.9917887)
  
  var mapOptions = {
    center: myCenter,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.MAP,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0f1418"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#e3b127"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0f1418"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#20262b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b818f"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#20262b"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#20262b"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#20262b"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#20262b"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3f4d54"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#586267"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  }
  
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    position: myCenter,
    icon: 'images/unsigned mark yellow-01.png',
    animation:google.maps.Animation.DROP
  });

  marker.setMap(map);
}

$(window).load(function() {
  $("html, body").css({
    "height": "calc(100% - 25px)"
  });
  
  $("#submit").on("click", function() {
    var postData = {}
    postData.name = $("#name").val();
    postData.email = $("#email").val();
    postData.message = $("#message").val();
    
    if (postData.name == "" || postData.email == "" || postData.message == "")
      return;
    
    $.ajax({
      url: "https://i6hhmr5rd5.execute-api.ap-southeast-2.amazonaws.com/Submit",
      type: "POST",
      data: JSON.stringify(postData),
      contentType: "text/json",
      dataType: "json",
      success: function(data){
        if (data == "SUCCESS")
        {
          $("form").css({
            "display": "none"
          });
          
          $("#thanks").css({
            "display": "block"
          });
        }
        else
          console.log(data.errorMessage);
      }
    });
  });
});
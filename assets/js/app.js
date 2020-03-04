import {select} from "./display.js";
import {clear} from "./display.js";
import {initMap} from "./map.js";
import {search} from "./display.js";

window.onload = () => {

  document.getElementById('today').onclick = function(){
    clear();
    select(1);
  };

  document.getElementById('nextly').onclick = function(){3
    clear();
    select(2);
  };

  document.getElementById('search').onclick = function(){
    let city = $("#search_label").val();
    search(city);
  };

  select(1);
  initMap();
};


var $sidebar   = $("#map"),
    $window    = $(window),
    offset     = $sidebar.offset(),
    topPadding = 15;

$window.scroll(function() {
  if ($window.scrollTop() > offset.top) {
    $sidebar.stop().animate({
      marginTop: $window.scrollTop() - offset.top + topPadding
    });
  } else {
    $sidebar.stop().animate({
      marginTop: 0
    });
  }
});
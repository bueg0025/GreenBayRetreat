(function () {
  "use strict";

  /* Property location is intentionally NOT stored here. Distances below were
     pre-calculated from the real address and baked in as static numbers so the
     exact coordinates never ship to the browser. The circle center/radius is a
     deliberately offset "general area" indicator, not the true location. */
  var GENERAL_AREA = { lat: 44.5079, lon: -88.0522, radiusMeters: 565 };

  var CATEGORY_LABELS = {
    attractions: "Attractions",
    outdoors: "Outdoors",
    coffee: "Coffee",
    breakfast: "Breakfast & Brunch",
    dining: "Dining",
    pizza: "Pizza",
    breweries: "Breweries",
    bars: "Game-Day Bars"
  };

  var CATEGORY_COLORS = {
    attractions: "#b6893f",
    outdoors: "#3d5f47",
    coffee: "#8a5a3b",
    breakfast: "#c99a3f",
    dining: "#1a2e22",
    pizza: "#a13d2b",
    breweries: "#6b4423",
    bars: "#2d4a37"
  };

  var POIS = [
    { name: "Lambeau Field", cats: ["attractions"], lat: 44.5009705, lon: -88.0619681, mi: 0.50 },
    { name: "National Railroad Museum", cats: ["attractions"], lat: 44.4831192, lon: -88.0480296, mi: 1.59 },
    { name: "Bay Beach Amusement Park", cats: ["attractions"], lat: 44.5313833, lon: -87.9801812, mi: 4.05 },
    { name: "Bay Beach Wildlife Sanctuary", cats: ["outdoors"], lat: 44.5245836, lon: -87.9639606, mi: 4.63 },
    { name: "Fox River Trail", cats: ["outdoors"], lat: 44.4772532, lon: -88.0364299, mi: 2.15 },
    { name: "The Pancake Place", cats: ["breakfast"], lat: 44.5284135, lon: -88.0602403, mi: 1.60 },
    { name: "The Creamery Downtown", cats: ["breakfast"], lat: 44.5165354, lon: -88.0154571, mi: 2.05 },
    { name: "Golden Basket Restaurant", cats: ["breakfast"], lat: 44.5149567, lon: -88.0707872, mi: 1.04 },
    { name: "Fox Harbor", cats: ["dining"], lat: 44.5109562, lon: -88.0188546, mi: 1.78 },
    { name: "Taverne in the Sky", cats: ["dining"], lat: 44.5024207, lon: -88.0649259, mi: 0.58 },
    { name: "Kroll's West", cats: ["dining"], lat: 44.5011154, lon: -88.0658873, mi: 0.66 },
    { name: "Hinterland Brewery", cats: ["dining", "breweries", "bars"], lat: 44.5033658, lon: -88.0645696, mi: 0.54 },
    { name: "Republic Chophouse", cats: ["dining"], lat: 44.5153026, lon: -88.0133623, mi: 2.12 },
    { name: "White Dog", cats: ["dining"], lat: 44.5149898, lon: -88.0223745, mi: 1.69 },
    { name: "Kroll's", cats: ["dining"], lat: 44.5014295, lon: -87.9829758, mi: 3.52 },
    { name: "Glass Nickel Pizza Co.", cats: ["pizza"], lat: 44.5197739, lon: -88.0205207, mi: 1.92 },
    { name: "Gallagher's Pizza", cats: ["pizza"], lat: 44.5231669, lon: -88.1021955, mi: 2.65 },
    { name: "Jake's Pizza", cats: ["pizza"], lat: 44.5159979, lon: -88.0223991, mi: 1.72 },
    { name: "Titletown Brewing Company", cats: ["breweries"], lat: 44.5194445, lon: -88.0178555, mi: 2.03 },
    { name: "Badger State Brewing Company", cats: ["breweries"], lat: 44.4979567, lon: -88.0499896, mi: 0.58 },
    { name: "Stillmank Brewing Company", cats: ["breweries"], lat: 44.5044596, lon: -87.9783883, mi: 3.74 },
    { name: "Noble Roots Brewing Company", cats: ["breweries"], lat: 44.5175143, lon: -87.9434893, mi: 5.52 },
    { name: "Copper State Brewing Company", cats: ["breweries"], lat: 44.5190163, lon: -88.019784, mi: 1.93 },
    { name: "The Bar — Holmgren Way", cats: ["bars"], lat: 44.4963515, lon: -88.0532222, mi: 0.65 },
    { name: "Anduzzi's Sports Club", cats: ["bars"], lat: 44.483884, lon: -87.9386615, mi: 5.89 },

    { name: "Titletown District", cats: ["attractions"], lat: 44.5037713, lon: -88.0656069, mi: 0.58 },
    { name: "Kavarna Coffeehouse", cats: ["coffee"], lat: 44.5174855, lon: -88.0212915, mi: 1.81 },
    { name: "The Attic", cats: ["coffee"], lat: 44.5141543, lon: -88.0059579, mi: 2.45 },
    { name: "Bhava Coffee", cats: ["coffee"], lat: 44.5232584, lon: -88.0626851, mi: 1.28 },
    { name: "Glas Coffee", cats: ["coffee"], lat: 44.5155458, lon: -88.0132811, mi: 2.13 },
    { name: "Coffee Wizardz", cats: ["coffee"], lat: 44.4692875, lon: -88.0198036, mi: 3.04 },
    { name: "Leaps and Bounds Cafe", cats: ["coffee"], lat: 44.5025508, lon: -88.06484, mi: 0.57 },
    { name: "The Daily Buzz", cats: ["coffee"], lat: 44.5143254, lon: -88.0165573, mi: 1.95 },
    { name: "Bay Family Restaurant", cats: ["breakfast"], lat: 44.515892, lon: -88.069376, mi: 1.03 },
    { name: "Delilah's", cats: ["breakfast"], lat: 44.5140697, lon: -88.0146588, mi: 2.03 },
    { name: "Grapevine Cafe", cats: ["breakfast"], lat: 44.481499, lon: -88.0231921, mi: 2.27 },
    { name: "Allouez Cafe", cats: ["breakfast"], lat: 44.506773, lon: -88.007306, mi: 2.31 },
    { name: "Mangiare Italian Restaurant", cats: ["dining"], lat: 44.5141151, lon: -88.0146274, mi: 2.03 },
    { name: "Al's Hamburgers", cats: ["dining"], lat: 44.5133051, lon: -88.0166053, mi: 1.93 },
    { name: "The OC", cats: ["dining"], lat: 44.479338688929, lon: -88.050931588728, mi: 1.83 },
    { name: "1919 Kitchen & Tap", cats: ["dining", "bars"], lat: 44.5009705, lon: -88.0619681, mi: 0.50 },
    { name: "Bistro Buchanan", cats: ["dining"], lat: 44.5145221, lon: -88.0168908, mi: 1.94 },
    { name: "Iron Duck", cats: ["dining"], lat: 44.5340512, lon: -88.0292635, mi: 2.31 },
    { name: "Cheesesteak Rebellion", cats: ["dining"], lat: 44.502423, lon: -88.030685, mi: 1.18 },
    { name: "Rustique Pizzeria + Lounge", cats: ["pizza"], lat: 44.6296258, lon: -88.0564814, mi: 8.56 },
    { name: "Sammy's Pizza & Italian Restaurant", cats: ["pizza"], lat: 44.5120034, lon: -88.0498768, mi: 0.48 },
    { name: "Parker John's BBQ + Pizza", cats: ["pizza"], lat: 44.5250524, lon: -88.0410457, mi: 1.48 },
    { name: "Cranky Pat's Pizza Parlor", cats: ["pizza"], lat: 44.4959163, lon: -87.9916017, mi: 3.16 },
    { name: "Stadium View Sports Bar", cats: ["bars"], lat: 44.497160018508, lon: -88.053879153563, mi: 0.59 },
    { name: "D2 Sports Pub", cats: ["bars"], lat: 44.4987108, lon: -88.0555549, mi: 0.49 }
  ];

  function initMap() {
    var mapEl = document.getElementById("attractions-map");
    if (!mapEl || typeof L === "undefined") return;

    var map = L.map(mapEl, { scrollWheelZoom: false }).setView([GENERAL_AREA.lat, GENERAL_AREA.lon], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    L.circle([GENERAL_AREA.lat, GENERAL_AREA.lon], {
      radius: GENERAL_AREA.radiusMeters,
      color: "#b6893f",
      weight: 2,
      fillColor: "#b6893f",
      fillOpacity: 0.18
    }).addTo(map).bindPopup("<strong>Green Bay Retreat</strong><br>General area — exact address provided at booking.");

    var markers = [];
    POIS.forEach(function (poi) {
      var color = CATEGORY_COLORS[poi.cats[0]] || "#3d5f47";
      var icon = L.divIcon({
        className: "map-pin",
        html: '<span style="background:' + color + '"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      var marker = L.marker([poi.lat, poi.lon], { icon: icon }).addTo(map);
      marker.bindPopup(
        "<strong>" + poi.name + "</strong><br>" +
        poi.cats.map(function (c) { return CATEGORY_LABELS[c]; }).join(" · ") + "<br>" +
        "~" + poi.mi.toFixed(2) + " mi from Green Bay Retreat"
      );
      marker.__cats = poi.cats;
      markers.push(marker);
    });

    var filterBar = document.getElementById("map-filters");
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        var filter = btn.getAttribute("data-filter");
        filterBar.querySelectorAll("[data-filter]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        markers.forEach(function (marker) {
          var show = filter === "all" || marker.__cats.indexOf(filter) !== -1;
          if (show) {
            if (!map.hasLayer(marker)) marker.addTo(map);
          } else {
            map.removeLayer(marker);
          }
        });
      });
    }

    var listEl = document.getElementById("map-distance-list");
    if (listEl) {
      var sorted = POIS.slice().sort(function (a, b) { return a.mi - b.mi; });
      listEl.innerHTML = sorted.map(function (poi) {
        return '<li><span class="poi-name">' + poi.name + '</span>' +
          '<span class="poi-tag">' + poi.mi.toFixed(2) + ' mi</span></li>';
      }).join("");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    initMap();
  }
})();

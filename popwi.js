if (Meteor.isClient) {
  Template.home.greeting = function () {
    return "Welcome to popwi.";
  };

  Template.home.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

    Template.networkmain.rendered = function () {
        mapId = "popwi.j4e7m671";
        var map = L.map('map').setView([37.75605845785265, -122.46030807495116 ], 13);
        L.Icon.Default.imagePath = 'img';
        L.tileLayer("http://{s}.tiles.mapbox.com/v3/" + mapId + "/{z}/{x}/{y}.png", {
            attribution: 'PopWi Technology Group, Inc.'
            }).addTo(map);

        var circle1 = L.circle([37.75605845785265, -122.46030807495116], 5000, {
            fillColor: '#ff0000',
            fillOpacity: 1.0,
            stroke: false
        });

        var circle2 = L.circle([37.71605845785265, -122.46030807495116], 5000, {
            fillColor: '#ff0000',
            fillOpacity: 1.0,
            stroke: false
        });

        var layerGroup = L.layerGroup([circle1, circle2]).addTo(map);

        var test = L.GeoJSON(layerGroup);
        console.log(test);

//        var overlayImage = 'img/night.jpg';
//        var overlayBounds =  [[37.75605845785265, -122.46030807495116], [37.79605845785265, -122.41030807495116]];
//        var myOverlay = L.imageOverlay(overlayImage, overlayBounds, {
//            opacity: 0.5
//        }).addTo(map);
    };

    Template.main.rendered = function() {
        $('.carousel').carousel({
            interval: 2000
        });
    }

    Template.nav.events({

        'submit #login-form' : function(e, t){
            e.preventDefault();
            // retrieve the input field values
            var email = t.find('#login-email').value
                , password = t.find('#login-password').value;

            // Trim and validate your fields here....

            // If validation passes, supply the appropriate fields to the
            // Meteor.loginWithPassword() function.
            Meteor.loginWithPassword(email, password, function(err){
                if (err)
                console.log("login attempt has failed");
                else
                console.log("The user has been logged in");
            });
            return false;
        }
    });

    Template.register.events({
        'submit #register-form' : function(e, t) {
            e.preventDefault();
            var email = t.find('#account-email').value
                , password = t.find('#account-password').value;

            // Trim and validate the input

            Accounts.createUser({email: email, password : password}, function(err){
                if (err) {
                    console.log("the account creation has failed");
                } else {
                    console.log("the account was successfully created");
                }

            });

            return false;
        }
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
Router.map(function() {
    this.route('home', {path: '/'});
    this.route('network');
    this.route('products');
    this.route('service');
    this.route('support');
    this.route('contact');
    this.route('about');
    this.route('iot');
});

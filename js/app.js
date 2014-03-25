document.addEventListener('DOMComponentsLoaded', function() {
  
  var deck = document.querySelector('x-deck');
  var firstTab = document.querySelector('x-tabbar-tab');
  deck.showCard(0);
  firstTab.select();

  // Install logic
  // If the app has already been installed, we don't do anything.
  // Otherwise we'll show the button, and hide it when/if the user installs the app.
  var installButton = document.getElementById('install');
  var manifestPath = AppInstall.guessManifestPath();

  if(AppInstall.isInstallable()) {

    // checking for app installed is an asynchronous process
    AppInstall.isInstalled(manifestPath, function isInstalledCb(err, result) {

      if(!err && !result) {

        // No errors, and the app is not installed, so we can show the install button,
        // and set up the click handler as well.
        installButton.classList.remove('hidden');

        installButton.addEventListener('click', function() {

          AppInstall.install(manifestPath, function(err) {
            if(!err) {
              installButton.classList.add('hidden');
            } else {
              alert('The app cannot be installed: ' + err);
            }
          });

        }, false);

      }

    });

  }


});

(function() {

  // Mortar AppInstall version 0.0.2
  var _window = {
    'location': {
      'host': 'example.com',
      'protocol': 'http:',
      'pathname': '/example'
    },
    'navigator': {}
  };

  function setupMockups(win) {
    _window = win;
  }

  function guessManifestPath() {

    var loc = _window.location;

    var pathname = loc.pathname;

    if(pathname !== '/') {
      var parts = pathname.split('/');
      var lastPart = parts.pop();
      
      if(lastPart.indexOf('.') !== -1) {
        // the last part is not a directory, so we'll ignore it when guessing the path
        pathname = parts.join('/');
      }
    }

    if(pathname[pathname.length - 1] !== '/') {
      pathname += '/';
    }

    return loc.protocol + '//' + loc.host + pathname + 'manifest.webapp';

  }


  function isInstallable() {
    return(_window.navigator.mozApps !== undefined);
  }


  function isInstalled(manifestPath, callback) {

    var request = _window.navigator.mozApps.checkInstalled(manifestPath);

    request.onerror = function() {
      callback('Error checking for installed app: ' + request.error.name);
    };

    request.onsuccess = function() {
      // If the app is installed, you'll get a mozApp object in `request.result`,
      // else `request.result` is null
      callback(false, request.result !== null);
    };

  }


  function install(manifestPath, callback) {

    var installRequest = _window.navigator.mozApps.install(manifestPath);

    installRequest.onsuccess = function() {
      // No error
      callback(false);
    };

    installRequest.onerror = function() {
      callback('Error installing the app: ' + installRequest.error.name);
    };

  }


  var AppInstall = {
    isInstallable: isInstallable,
    guessManifestPath: guessManifestPath,
    isInstalled: isInstalled,
    install: install,
    setupMockups: setupMockups
  };

  if(typeof define === 'function' && define.amd) {
    define(function() { return AppInstall; });
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = AppInstall;
  } else {
    this.AppInstall = AppInstall;
  }

}).call(this);

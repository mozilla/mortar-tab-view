# TabView Template

This template provides a basic tabbed view layout, using some web components from Brick.

This is part of the [mortar](https://github.com/mozilla/mortar/) template collection for building [Open Web Apps](https://developer.mozilla.org/en-US/Apps).

## Obtaining

There are a few ways to get this template:

If you use [Git](http://www.git-scm.com/):

````bash
git clone https://github.com/mozilla/mortar-tab-view.git
````

Or download the latest version in this [ZIP file](https://github.com/mozilla/mortar-tab-view/archive/master.zip).


## Usage

Start a local server to simulate accessing the hosted app from the browser, and trying the *Install* button flow.

For example:

````bash
python -m SimpleHTTPServer 8000
````

then access `localhost:8000` or `your.computer.ip:8000` (for example, `192.168.0.25`) using Firefox (Desktop or Mobile), or the Browser app in a Firefox OS simulator (or device).

You'll need to use the IP address when using a physical device. Change the port accordingly, if you're running a webserver in this port already.

## Code walkthrough

The `manifest.webapp` file contains metadata about the app, such as its name, description, icon and required permissions for running under Firefox OS.

There really isn't much logic or behaviour baked into this template--it's more about demonstrating how to build an app using web components, and how to provide *Install* functionality, since this is a hosted web app.

The app logic is defined in `js/app.js`. Here we first wait for the `DOMComponentsLoaded` event to fire. This is so that we ensure that the web components are ready before using them.

Then we get a handle to the `deck` and the `tabbar` so we can call methods on them. We select the first tab and show the first card in the deck.

After that, we set up the installation functionality, which is associated to the `install` button. We're using a small library for dealing with installs; this library is in `js/lib/AppInstall.js` and is referenced in `index.html`, right before `js/app.js`, so that the code is available when we want to use it.

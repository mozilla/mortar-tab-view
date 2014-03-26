# TabView Template

This template provides a basic tabbed view layout, using some web components from [Brick](https://github.com/mozilla/brick).

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

There really isn't much logic or behaviour baked into this template--it's more about demonstrating how to build an app using web components, and how to provide *Install* functionality, since this is a [hosted web app](https://developer.mozilla.org/en-US/Marketplace/Publishing/Publish_options#Hosted_apps).

The **app layout** consists of a top level `x-layout` element which contains an `x-appbar`, an `x-deck` and a `x-tabbar`. To see this code in place, have a look at `index.html` and the comments.

The **app logic** is defined in `js/app.js`. Here we first wait for the `DOMComponentsLoaded` event to fire. This is so that we ensure that the web components are ready before using them.

Then we get a handle to the `deck` and the `tabbar` so we can call methods on them. We select the first tab and show the first card in the deck.

After that, we set up the installation functionality, which is associated to the `install` button. We're using a small library for dealing with installs; this library is in `js/lib/AppInstall.js` and is referenced in `index.html`, right before `js/app.js`, so that the code is available when we want to use it.

## Getting help

If you find something that doesn't quite work as you'd expect, we'd appreciate if you [filed a bug](https://github.com/mozilla/mortar-tab-view/issues)!

We need your help in order to help you. Therefore:

1. Tell us which version of the template are you using. Where did you get the code from?
* Specify the environment where the bug occurs i.e. which browser were you using, or which version of the Simulator or Firefox OS device. An example would be `Firefox 30.0a1 Nightly 20140210`. You can generally get this data from the *About* menu in your browser. Also maybe tell us if you have experimental features enabled in your browser (for example, support for web components).
* Describe the problem in detail. What were you doing? What happened? What did you expect to happen?
* Probably also provide a test case so we can see what is happening and try to reproduce the error.

Ultimately it all boils down to the fact that if we can't reproduce it, we can't help you or fix it either.

## Contributing

Contributions are always welcome! If you want to collaborate, whether that is with a new feature or fixing a bug, we recommend you...

1. Have a look at the [issue tracker](https://github.com/mozilla/mortar-tab-view/issues) first--to make sure there isn't anyone working on that already.
* If it's a new issue/feature, or no one is working on it already, fork the project in GitHub (you'll need an account if you don't have one yet).
* Create the bug to let us know you want to work on this. That way we are aware of and can keep an eye on it, or maybe tell you that it is not a bug but an intended feature, and save you the hassle of working on something that is not needed.
* Clone your fork to your computer (i.e. get the code onto your computer)
* Make a new branch, and switch to that new branch
* Do the changes you deem necessary
* Push the branch to GitHub
* Send a pull request

To make your changes as easy to merge back onto the project as possible, you should only work on one feature per branch. That makes code review simpler and faster!

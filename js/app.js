document.addEventListener('DOMComponentsLoaded', function() {
  var deck = document.querySelector('x-deck');
  var tabbar = document.querySelector('x-tabbar');
  deck.showCard(0);
});

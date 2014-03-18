document.addEventListener('DOMComponentsLoaded', function() {
  var deck = document.querySelector('x-deck');
  var firstTab = document.querySelector('x-tabbar-tab');
  deck.showCard(0);
  firstTab.select();
});

var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);

var yellow = rootStyles.getPropertyValue('--yellow');

root.style.setProperty('--yellow', 'blue');
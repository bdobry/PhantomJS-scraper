/**
 * PhantomJS action file used to tell Phantom how to capture screens. The
 * timeout is used to give JS a change to change content on the page before
 * taking the screenshot.
 */
var page = require('webpage').create();
var system = require('system');
var address, output, size, selector;

// Get the input parameters.
address = system.args[1];
output = system.args[3];
selector = system.args[4];
onet = system.args[2];

// Set the capture size to full HD.
page.viewportSize = { width: 1020, height: 1080 };

// Check if PDF should be rendered.
if (system.args.length === 3 && system.args[1].substr(-4) === ".pdf") {
  size = system.args[2].split('*');
  page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' } : { format: system.args[2], orientation: 'portrait', margin: '1cm' };
}

// Open the address and capture the screen after 200 mill-seconds (give the
// screen the chance to run JS alters).
page.open(address, function() {
  page.render(output);
  
  page.open(address, function() {
    page.render(output . '2');
  phantom.exit();
  }, 5000);
});
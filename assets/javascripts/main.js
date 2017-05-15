// Straight up get pym.js working
var pymChild = new pym.Child();

/**
 * Grab the data from our Google Sheet and clean it up a little
 */
var sheetURL = 'https://docs.google.com/spreadsheets/d/1_luZn62p_9v3SqKCp4cvSxtLXgf09qGkSs7Hkdw_EMA/pubhtml';

var rawData = {};
var updatesData = {};

var tabletopInit = function tabletopInit() {
  Tabletop.init({
    key: sheetURL,
    callback: processData,
    simpleSheet: false,
  })
};

var processData = function processData(data, tabletop) {
  constants = data.constants.elements['0'];
  updatesData = data.updates.elements;
  updatesData = updatesData.reverse();

  update();
};

/**
 * Copy
 */
var copyUpdate = function copyUpdate() {
  // General
  d3.select('.js-updates-title').text(constants.title);
  d3.select('.js-footer-footnotes').html(constants.footnotes);
};

/**
 * updates (the blog feature)
 */
var updatesUpdate = function updateUpdates() {
  var entries = d3.select('.js-updates-entries');

  // Remove the existing content of the blogs
  entries.html('');

  var entry = entries.selectAll('article')
    .data(updatesData)
    .enter()
    .append('article')
    .classed('updates__entry', true);

  var entryHeading = entry.append('h5')
    .classed('updates__heading', true)
    .text(function(d, i) { return updatesData[i].heading; });

  var entryMeta = entry.append('p')
    .classed('updates__meta', true)
    .text(function(d, i) { return updatesData[i].meta; });

  var entryBody = entry.append('div')
    .classed('updates__body', true)
    .html(function(d, i) { return updatesData[i].body; });
};


/**
 * Initialise everything
 */
var init = function init() {
  tabletopInit();
  pymChild.sendHeight()
};


/**
 * Update all of the things
 */
var update = function update() {
  updatesUpdate();
  copyUpdate();
  pymChild.sendHeight()
};

/**
 * Update everything on the window resizing
 */

window.addEventListener("resize", update);

document.addEventListener("DOMContentLoaded", function(){
  init();
});

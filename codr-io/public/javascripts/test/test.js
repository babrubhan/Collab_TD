

//Ajax req res testing
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

var sinon = require('sinon');

QUnit.module('Compile-Run', {
  before: function () {
    this.server = sinon.fakeServer.create();
  },
  after: function () {
    this.server.restore();
    delete this.server;
  }
});

QUnit.test("Onclick Request-Response Calls", function (assert) {
  var callback = sinon.spy(jQuery, "ajax");
  this.server.respondWith("POST", "/compileRun",
    [200, { "Content-Type": "application/json" },
      '[{ "id": 250053, "name": "Babru" }]']);

  var a = getTheValues();
  this.server.respond();

  assert.ok(callback.calledOnce, "Callback was called once");
  var callArgs = callback.args[0][0];
  assert.equal(JSON.stringify(callArgs.data), JSON.stringify({ "id": 250053, "name": "Babru" }));
});

function getTheValues() {
  // do some stuff including an ajax call:

  $.ajax({
    data: { id: 250053, name: "Babru" },
    method: 'POST',
    dataType: 'json',
    cache: false,
    url: '/compileRun',
    success: function (data) {
        alert(data);
    }
  });
}
                                 

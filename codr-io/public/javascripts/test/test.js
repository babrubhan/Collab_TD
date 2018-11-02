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

QUnit.test("Compile-Run buttons functionality", function (assert) {
  var callback = sinon.spy(jQuery, "ajax");
  this.server.respondWith("POST", "/compileRun",
    [200, { "Content-Type": "application/json" },
      '[{ "id": "BB250053" }]']);

  var a = getTheValues();
  this.server.respond();

  assert.ok(callback.calledOnce, "Callback was called once");
  var callArgs = callback.args[0][0];
  assert.equal(JSON.stringify(callArgs.data), JSON.stringify({ "id": 'BB250053'}));
});

function getTheValues() {
  // do some stuff including an ajax call:

  $.ajax({
    data: { id: 'BB250053' },
    method: 'POST',
    dataType: 'json',
    cache: false,
    url: '/compileRun',
    success: function (data) {
        alert(data);
    }
  });
}


function compile(cb) {
	var result = "OKK";
	cb(result);
}

QUnit.test("compile()",function(assert) {
	compile( function(result) {
		assert.equal(result, "OKK");
	});
}); 

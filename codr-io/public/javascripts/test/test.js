/*QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

function isEven(val) {
    return val % 2 === 0;
}
 
QUnit.test('isEven()', function(assert) {
    assert.ok(isEven(0), 'Zero is an even number');
})
*/


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
  this.server.respondWith("GET", "/compileRun",
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

//Docker testing
QUnit.test("Docker Compiler", function (assert) {

});

function useDocker(){
     var Docker = require('dockerode');
     var docker = new Docker({socketPath: '/var/run/docker.sock'});     
     var dPaths = { bind: ['/root/working_project/Collab_TD/codr-io/public/javascripts/test:/src'] };           
                                                   
       docker.run(dImage, dCommands.compile, process.stdout, {
       'Volumes': {
       '/src': {}
         },
       'Hostconfig': {
       'Binds': dPaths.bind,
           }
       }, function (err, data, container) {
                                 
         }
       );
}
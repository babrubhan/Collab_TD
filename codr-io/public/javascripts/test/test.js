

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
      '[{ "id": 250053 }]']);

  var a = getTheValues();
  this.server.respond();

  assert.ok(callback.calledOnce, "Callback was called once");
  var callArgs = callback.args[0][0];
  assert.equal(JSON.stringify(callArgs.data), JSON.stringify({ "id": 250053}));
});

function getTheValues() {
  // do some stuff including an ajax call:

  $.ajax({
    data: { id: 250053 },
    method: 'POST',
    dataType: 'json',
    cache: false,
    url: '/compileRun',
    success: function (data) {
        alert(data);
    }
  });
}



/*
QUnit.test("run", function() {
        this.timeout(30000);

        QUnit.test("should emit partial data", function(done) {
            function handler(err, data, container) {
                expect(err).to.be.null;
                //container is created
                expect(container).to.be.ok;

                container.remove(function(err, data) {
                    expect(err).to.be.null;
                });
            }

            var ee = docker.run(testImage, ['bash', '-c', 'uname -a'], process.stdout, handler);
            ee.on('container', function(container) {
                expect(container).to.be.ok;
            });
        });


       QUnit.test("should run a command with create options", function(done) {
            function handler(err, data, container) {
                expect(err).to.be.null;

                container.inspect(function(err, data) {
                    expect(err).to.be.null;

                    container.remove(function(err, data) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            }
            docker.run(testImage, ['bash', '-c', 'uname -a'], process.stdout, {}, handler);
        });
    });*/






                              

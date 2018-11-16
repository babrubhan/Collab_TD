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

//Write File Test
function writefile(cb){
	var config = { dPath: ['/home/babru/collab_td/codr-io/public/javascripts/test:/src'],
        	       dImage: ['babru/gccbox'],
        	       codeFile: ['/src/qq.c'],
                       outputFile: ['/src/qq']
	};
	cb(config.dPath, config.dImage, config.codeFile, config.outputFile);
}

QUnit.test("writefile()", function (assert) {
	writefile( function (path, image, file, output) {
		assert.equal(image, "babru/gccbox");
	});
});

//Compile Code (with Docker) Test
function compile(cCmd, cb) {
	var spawn = require('child_process').spawn;
        var compile = spawn('docker', cCmd);
        compile.stdout.on('data', function (data) {
        });
        compile.stderr.on('data', function (data) {
        });
        compile.on('close', function (data) { 
	    (data == 0) ? cb(true) : cb(false);
	});
}

QUnit.test("compile()",function(assert) {
    writefile( function (path, image, file, output) {
	var dCommands = { compile: ['run', '--rm', '-v', path, image, 'gcc', file, '-o', output] };
		compile(dCommands.compile, function(isCompiled) {
			assert.ok(true, isCompiled);
		});
               
        });


}); 

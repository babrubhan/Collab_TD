var expect  = require('chai').expect;
var assert = require('assert');

    describe ('btnCompile', function() {
        it('Sends sDocumentID to compilecode', function(done){
          //  var sDocumentID = /^(\/v)?\/([a-z0-9]+)\/?$/.exec(document.location.pathname)[2];
            var id = btnCompile();
            assert.equal(id, sDocumentID);
        });
    });
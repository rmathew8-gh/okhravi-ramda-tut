var assert = require('assert'),
    main = require('../lib/fp/main.js');

describe('Main', function () {

    describe('#test main', function () {

        it('should return the default hello message if no options are provided', function () {
            var res = main.compute();
            assert.equal('Hello World!', res);
        });
    });

});

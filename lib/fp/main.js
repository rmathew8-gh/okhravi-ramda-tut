var R = require('ramda');
var fs = require('fs');

var curPath = __dirname
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

function compute() {
    var readF = path => fs.readFileSync(path, { encoding: 'utf-8' });

    return R.pipe(
        R.map(readF),
        R.map(R.split(/[\t\n]/)),
        console.log
    )([btcPath, ethPath]);
}

exports.compute = compute;

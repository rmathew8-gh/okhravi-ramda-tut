var R = require('ramda');
var { map, compose, pipe, split } = require('ramda');
var fs = require('fs');

var curPath = __dirname
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

function compute() {
    var readF = path => fs.readFileSync(path, { encoding: 'utf-8' });

    return pipe(
        map(readF),
        map(split(/[\t\n]/)),
        console.log
    )([btcPath, ethPath]);
}

exports.compute = compute;

pipe(
    map(readF), // -> [s, s]
    map(split('\n')), // -> [[s], [s]]
    console.log
)([btcPath, ethPath])

/*/
/*/

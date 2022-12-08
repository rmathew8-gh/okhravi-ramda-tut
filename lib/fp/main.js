var fs = require('fs');
var assert = require('assert');

var R = require('ramda');
// var { map, filter, match, compose, pipe, split } = require('ramda');

var curPath = __dirname;
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

// simple sanity check
R.map(x => x * 2, [1, 2, 3]); //=> [2, 4, 6]

var readF = path => fs.readFileSync(path, { encoding: 'utf-8' });

var splitStringOnNL = R.split('\n');
assert(R.equals(splitStringOnNL("a\nb\tc\td\ne\n"), ["a", "b\tc\td", "e", ""]));

var splitStringOnTab = R.split('\t');
assert(R.equals(splitStringOnTab("a\nb\tc\td\ne\n"), ['a\nb', 'c', 'd\ne\n']));

var stripEmptiesFromList = R.filter(R.test(/\w+/));
assert(R.equals(stripEmptiesFromList(["a", "b\tc\td", "e", ""]), ["a", "b\tc\td", "e"]));

var pickCols1and3 = R.pick([0, 2]);
assert(R.equals(pickCols1and3([1, 2, 3, 4]), { '0': 1, '2': 3 }));
assert(R.equals(pickCols1and3([1, 2, 3, 4]), { '0': 1, '2': 3 }));

R.pipe(
  R.map(readF), // -> [s, s],
  R.map(splitStringOnNL), // -> [[s][s]]
  R.map(stripEmptiesFromList), // -> [[s][s]]
  R.map(R.map(splitStringOnTab)), // -> [[[s][s]] [[s][s]]]]
  R.map(R.map(pickCols1and3)), // -> [[{...}] [{...}]]]
  console.log
)([btcPath, ethPath]);

// function compute() {...}
// exports.compute = compute;


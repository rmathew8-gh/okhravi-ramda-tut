var fs = require('fs');
var assert = require('assert');
var _ = require('lodash');

var R = require('ramda');
// var { map, filter, match, compose, pipe, split } = require('ramda');

var curPath = __dirname
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

// function compute() {
//   return R.pipe(
//     R.map(readF),
//     R.map(R.split(/[\t\n]/)),
//     console.log
//   )([btcPath, ethPath]);
// }

// exports.compute = compute;

// simple sanity check
R.map(x => x * 2, [1, 2, 3]); //=> [2, 4, 6]

var readF = path => fs.readFileSync(path, { encoding: 'utf-8' });

var splitStringOnNL = R.split('\n');
assert(_.isEqual(splitStringOnNL("a\nb\tc\td\ne\n"), ["a", "b\tc\td", "e", ""]));

var splitStringOnTab = R.split('\t');
assert(_.isEqual(splitStringOnTab("a\nb\tc\td\ne\n"), ['a\nb', 'c', 'd\ne\n']));

var stripEmptiesFromList = R.filter(R.test(/\w+/));
assert(_.isEqual(stripEmptiesFromList(["a", "b\tc\td", "e", ""]), ["a", "b\tc\td", "e"]));

var pickCols1and3 = R.pick([0, 2]);
assert(_.isEqual(pickCols1and3([1, 2, 3, 4]), { '0': 1, '2': 3 }));

R.pipe(
  R.map(readF), // -> [s, s],
  R.map(splitStringOnNL), // -> [[s][s]]
  R.map(stripEmptiesFromList), // -> [[s][s]]
  R.map(R.map(splitStringOnTab)), // -> [[[s][s]] [[s][s]]]]
  R.map(R.map(pickCols1and3)), // -> [[{...}] [{...}]]]
  console.log
)([btcPath, ethPath]);

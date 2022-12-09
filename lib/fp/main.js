var fs = require('fs');
var R = require('ramda');
var assert = require('assert');
// var { map, filter, match, compose, pipe, split } = require('ramda');

var curPath = __dirname;
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

var readF = path => fs.readFileSync(path, { encoding: 'utf-8' });

var splitStringOnNL = R.split('\n');
assert.deepEqual(
  splitStringOnNL("a\nb\tc\td\ne\n"),
  ["a", "b\tc\td", "e", ""]);

var splitStringOnTab = R.split('\t');
assert.deepEqual(
  splitStringOnTab("a\nb\tc\td\ne\n"),
  ['a\nb', 'c', 'd\ne\n']);

var stripEmptiesFromList = R.filter(R.test(/\w+/));
assert.deepEqual(
  stripEmptiesFromList(["a", "b\tc\td", "e", ""]),
  ["a", "b\tc\td", "e"]);

var pickCols1and3FromList = R.props([0, 2]);
assert.deepEqual(
  pickCols1and3FromList([1, 2, 3, 4]),
  [1, 3]);

function X1() {
  return R.pipe(
    R.map(readF), // -> [s, s],
    R.map(splitStringOnNL), // -> [[s][s]]
    R.map(stripEmptiesFromList), // -> [[s][s]]
    R.map(R.map(splitStringOnTab)), // -> [[[s][s]] [[s][s]]]]
    R.map(R.map(pickCols1and3FromList)), // -> [[{...}] [{...}]]]
  );
}
var res = X1()([btcPath, ethPath]);
assert.equal(res[0][0][1], '$17,091.86');

var getFileBasenames = R.pipe(
  R.map(R.match(/.*\/(.*?)\.csv/)),
  R.pluck(1),
);
assert.deepEqual(
  getFileBasenames([btcPath, ethPath]),
  ['btc', 'eth']);

// simple test
var arr1 = ['btc', 'eth'];
var arr2 = [[[], []], [[], []]];
var addCoin = R.insert(2);
assert.deepEqual(
  R.map(addCoin('eth'), arr2[0]),
  [['eth'], ['eth']]);
assert.deepEqual(
  R.zipWith((x, y) => R.map(addCoin(x), y), arr1, arr2),
  [[['btc'], ['btc']], [['eth'], ['eth']]]);

// full monty
var coins = getFileBasenames([btcPath, ethPath]);
var rows = X1()([btcPath, ethPath]);
var res = R.zipWith((coin, row) => R.map(addCoin(coin), row), coins, rows);
console.log(res);


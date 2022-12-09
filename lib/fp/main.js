// function compute() {...}
// exports.compute = compute;

var fs = require('fs');

var R = require('ramda');

var assert = require('assert');
// var { map, filter, match, compose, pipe, split } = require('ramda');

var curPath = __dirname;
var ethPath = curPath + '/eth.csv';
var btcPath = curPath + '/btc.csv';

// simple sanity check
R.map(x => x * 2, [1, 2, 3]); //=> [2, 4, 6]

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

var pickCols1and3FromList = R.pick([0, 2]);
assert.deepEqual(
  pickCols1and3FromList([1, 2, 3, 4]),
  { '0': 1, '2': 3 });

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
assert.equal(res[0][0][2], '$17,091.86');

var getFileBasenames = R.pipe(
  R.map(R.match(/.*\/(.*?)\.csv/)),
  R.pluck(1),
);
assert.deepEqual(
  getFileBasenames([btcPath, ethPath]),
  ['btc', 'eth']);

'ok';

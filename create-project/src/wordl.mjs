import * as fs from 'fs';
import inquirer from 'inquirer';

// Transcrypt'ed from Python, 2022-06-25 23:11:42
var math = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_math__ from './math.js';
import { exit } from 'process';
__nest__ (math, '', __module_math__);
var __name__ = '__main__';
export var N = 5;
export var BASE = 3;
export var WORD = 0;
export var EXPECTED = 1;
export var RANK = 2;
export var WORDLE_DATA_FILE = './words_bits.txt';
export var WORD_EXPECTED_RANK_VALUES = './word_expected_rank_values.txt';
export var GOOGLE_20K_DATA_FILE = './20k.txt';
var __left0__ = tuple ([0, 0]);
export var DEFAULT_RANK = __left0__ [0];
export var DEFAULT_EXPECTED = __left0__ [1];
export var Hint =  __class__ ('Hint', [object], {
	__module__: __name__,
	miss: 0,
	hit: 1,
	other: 2
});
export var generate_pattern = function (src, trgt) {
	var pattern = [Hint.miss] * N;
	for (var i = 0; i < N; i++) {
		if (trgt [i] != src [i]) {
			var hits = (function () {
				var __accu0__ = [];
				for (var [j, c] of enumerate (src)) {
					if (c == trgt [i]) {
						__accu0__.append (j);
					}
				}
				return __accu0__;
			}) ();
			if (len (hits) != 0) {
				pattern [i] = Hint.other;
			}
		}
		else {
			pattern [i] = Hint.hit;
		}
	}
	var res = '';
	for (var j = 0; j < N; j++) {
		res += str (pattern [j]);
	}
	return res;
};
export var verify_pattern = function (pattern, target, source) {
	var n = len (pattern);
	var res = true;
	for (var i = 0; i < n; i++) {
		if (int (pattern [i]) == Hint.miss) {
			if (source [i] == target [i]) {
				var res = false;
				break;
			}
			else if ((function () {
				var __accu0__ = [];
				for (var [j, c] of enumerate (source)) {
					if (target [i] == c) {
						__accu0__.append (j);
					}
				}
				return __accu0__;
			}) ()) {
				var res = false;
				break;
			}
		}
		else if (int (pattern [i]) == Hint.hit) {
			if (source [i] != target [i]) {
				var res = false;
				break;
			}
		}
		else if (int (pattern [i]) == Hint.other) {
			if (source [i] == target [i]) {
				var res = false;
				break;
			}
			else if (!((function () {
				var __accu0__ = [];
				for (var [j, c] of enumerate (source)) {
					if (target [i] == c) {
						__accu0__.append (j);
					}
				}
				return __accu0__;
			}) ())) {
				var res = false;
				break;
			}
		}
	}
	return res;
};
export var filter_words = function (pattern, words, src) {
	var matches = [];
	for (var target of words) {
		if (verify_pattern (pattern, src, target [WORD])) {
			matches.append (target);
		}
	}
	return matches;
}
export var read_word_data = function (filename) {
	var data = ''; var words = []; var lines = [];

	try {data = fs.readFileSync(filename, 'utf8');
			lines = data.py_split('\n'); 
		} catch (err) {
		console.error(err); 
	}

	if (filename == WORDLE_DATA_FILE) {
		for (var line of lines) {
			var s = line.py_split (' ');
			var t = tuple (tuple ([s [WORD], float (s [EXPECTED])]));
			words.append (t);
		}
	}
	else if (filename == GOOGLE_20K_DATA_FILE) {
		var rank = 0;
		for (var word of lines) {
			var t = tuple (tuple ([word, DEFAULT_EXPECTED, rank / (2 * Math.pow (10, 4))]));
			rank++;
			words.append (t);
		}
	}
	else {

		var length = len(lines);
		for (var i=0; i<length; i++) {
			var l = lines[i]
			console.error(l, i++);
			var t = JSON.parse(l);
			words.append(t);
		}	

	}

	return words;
}

export var generate_rankings = function () {
	var t20k5 = [];
	var t20k = read_word_data (GOOGLE_20K_DATA_FILE);
	for (var t of t20k) {
		if (len (t [WORD]) == N) {
			t20k5.append (t);
		}
	}
	var twordl = read_word_data (WORDLE_DATA_FILE);
	for (var t of twordl) {
		var result = py_next ((function () {
			var __accu0__ = [];
			for (var [i, v] of enumerate (t20k5)) {
				if (v [WORD] == t [WORD]) {
					__accu0__.append (i);
				}
			}
			return py_iter (__accu0__);
		}) (), null);
		if (result != null) {
			t += tuple ([t20k5 [result] [RANK]]);
		}
		else {
			t += tuple ([0]);
		}
		console.log (t);
	}
};
export var generate_expecteds = function () {
	var words = read_word_data (WORDLE_DATA_FILE);
	var n = len (words);
	for (var i = 0; i < n; i++) {
		var patterns = dict ({});
		for (var j = 0; j < n; j++) {
			var p = generate_pattern (words [i] [WORD], words [j] [WORD]);
			if (__in__ (p, patterns)) {
				patterns [p]++;
			}
			else {
				patterns [p] = 1;
			}
		}
		var nk = len (patterns.py_keys ());
		console.log ('# keys=', nk);
		var s = 0;
		for (var p of patterns.py_keys ()) {
			var count = patterns [p];
			var probability = count / n;
			var bits = math.log2 (1 / probability);
			s += probability * bits;
		}
		console.log ('{0:s} {1:n} {2:s} {3:2.5f}'.format (words [i] [WORD], count, p, s));
	}
	console.log ('{0:s} {1:2.5f}'.format (words [i] [0], s));
};
export var iterate_and_do = function () {
	var matches = [];
	var words = read_word_data (WORDLE_DATA_FILE);
	for (var word of words) {
		var pattern = [0] * N;
		var od = Odometer (pattern, BASE);
		for (var i = 0; i < Math.pow (BASE, N); i++) {
			var matches = filter_words (pattern, words, word [WORD]);
			if (matches) {
				var count = len (matches);
				console.log (pattern, count);
				if (count > 15) {
					var count = 15;
				}
				for (var i = 0; i < count; i++) {
					console.log (matches [i], __kwargtrans__ ({end: ' '}));
				}
				console.log ();
				console.log ();
			}
			else {
				console.log (pattern, __kwargtrans__ ({end: ' '}));
				console.log (' not matched!');
			}
			od.increment ();
		}
	}
};
export var Odometer =  __class__ ('Odometer', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, digits, base) {
		self.digits = digits;
		self.n = len (digits);
		self.base = base;
	});},
	get increment_and_carry () {return __get__ (this, function (self, i) {
		self.digits [i] = __mod__ (self.digits [i] + 1, self.base);
		return self.digits [i] == 0;
	});},
	get increment () {return __get__ (this, function (self) {
		var i = 0;
		while (self.increment_and_carry (i)) {
			i++;
			if (i == self.n) {
				break;
			}
		}
	});}
});
export var iterate_and_do2 = function () {
	var matches = [];
	var words = read_word_data (WORDLE_DATA_FILE);
	for (var target of words) {
		for (var source of words) {
			var pattern = [0] * N;
			var od = scratch.Odometer (pattern, BASE);
			for (var i = 0; i < Math.pow (BASE, N); i++) {
				var res = verify_pattern (od.digits, source [WORD], target [WORD]);
				if (res) {
					console.log (od.digits, source [WORD], target [WORD]);
				}
				od.increment ();
			}
		}
	}
};


export var main = function () {

	console.log("\nWelcome to Wordl! You have 6 guesses, 'q' to quit");
	var matches = [];
	var words = read_word_data (WORD_EXPECTED_RANK_VALUES);

	const questions = [
		{
			type: "input",
			name: "fruitList",
			message: "List all your favorite fruit",
			filter(answer) {
				return answer.split(/[ ,]+/).filter(Boolean);
			},
			validate(answer) {
				if (answer.length < 1) {
					return "Mention at least one fruit!";
				}
				return true;
			},
		}
	  ]
	  

	  function getFruitQuestions(answers) {
		const fruitList = answers.fruitList
		const fruitQuestions = []
		for (let i = 0; i < fruitList.length; i++) {
			const fruitName = fruitList[i]
			fruitQuestions.push(
				{
					type: "input",
					name: `fruit.${fruitName}.reason`,
					message: `Why do you like ${fruitName}?`
				}
			)
		}
		return fruitQuestions
	  }
	  



	  inquirer
	  .prompt(questions)
	  .then((answers) => {
		  inquirer.prompt(getFruitQuestions(answers)).then((fruitAnswers) => {
			  console.log(JSON.stringify(fruitAnswers, null, 2))
		  })
	  })
	  .catch((error) => {
		  if (error.isTtyError) {
			  console.log("Your console environment is not supported!")
		  } else {
			  console.log(error)
		  }
	  })
	
  //--------------------------------------------------

  /*

	for (var i = 0; i < 1; i++) {

	  var args = line.py_split (' ');
		if (args [0] [0] == 'q') {
			break;
		}
		var word = args [0];
		var pattern = args [1];
		var result = py_next ((function () {
			var __accu0__ = [];
			for (var [k, v] of enumerate (words)) {
				if (v [WORD] == word) {
					__accu0__.append (v);
				}
			}
			return py_iter (__accu0__);
		}) (), null);
		if (!(result)) {
			console.log (word + ' is not in the dictionary!');
			break;
		}
		else {
			var expectedbits = result [EXPECTED];
		}
		if (!(i)) {
			var matches = words;
		}
		var matches = filter_words (pattern, matches, args [0]);
		var count = len (matches);
		if (count) {
			var actualbits = math.log2 (count);
		}
		else {
			var actualbits = 1.0;
		}
		if (count > 20) {
			var count = 20;
		}
		var ranked_by_entropy = list (sorted (matches, __kwargtrans__ ({key: (function __lambda__ (ele) {
			return ele [EXPECTED];
		}), reverse: true})));
		var ranked_by_frequency = list (sorted (matches, __kwargtrans__ ({key: (function __lambda__ (ele) {
			return ele [RANK];
		}), reverse: true})));
		console.log ((('\n\nWord:\t' + word) + '\tPattern: ') + pattern);
		console.log ('Expected Bits:\t' + str (expectedbits));
		console.log ('Actual Bits:\t' + str (actualbits));
		console.log ('\nExpected values and frequencies:\n');
		for (var j = 0; j < count; j++) {
			var en = ranked_by_entropy [j];
			var fr = ranked_by_frequency [j];
			console.log ('{0:s}  {1:1.2f}  {2:1.2f}   '.format (en [WORD], en [EXPECTED], en [RANK]), __kwargtrans__ ({end: ' '}));
			console.log ('{0:s}  {1:1.2f}  {2:1.2f}'.format (fr [WORD], fr [EXPECTED], fr [RANK]));
		}
	}

*/
}; 



main ();

// #sourceMappingURL=wordl.map
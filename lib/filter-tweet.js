var cleanText = require('./clean-text'),
	stringContainsOneOf = require('./string-contains-one-of');

module.exports = function tweetAcceptable(tweet, trackWords){
	if(!tweet) return false;
	if(!tweet.text) return false;
	if(tweet.lang !== 'en') return false;

	// 5 words or less
	var words = tweet.text.split(' ');
	if(words.length > 5) return false;

	// no questions
	if(tweet.text.match(/\?/)) return false;

	// must contain a trackWord
	var cleanLower = cleanText(tweet.text).toLowerCase();
	if(!stringContainsOneOf(cleanLower, trackWords)) return false;

	// exclude i'm im
	var wordsLower = cleanLower.split(' ');
	if(wordsLower.indexOf('im')>-1 || wordsLower.indexOf('i\'m')>-1 || wordsLower.indexOf('i’m')>-1){
		return false
	}

	// exclude "no.123"
	if(tweet.text.match(/no\.[0-9]+/)){
		return false;
	}

	// exclude "he is" / "she is"
	if(tweet.text.match(/(he|she) is/)){
		return false;
	}

	// again / never / absolutely : special filtering
	if(wordsLower.indexOf('again')>-1 || wordsLower.indexOf('never')>-1 || wordsLower.indexOf('absolutely')>-1){
		if(wordsLower.length>3) return false;
	}

	return true;
}
var twitterCreds;
try{
	twitterCreds = require('../twitter-creds.json');
}catch(err){
	twitterCreds = {
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	};
}
const Twitter = require('twitter');
const client = new Twitter(twitterCreds);
const _ = require('underscore');
const cleanText = require('./clean-text'),
	filterTweet = require('./filter-tweet'),
	trackWords = require('./track-words.json');

function findTweets(cb){
	client.get('search/tweets', {
		q: _.shuffle(trackWords).join(' OR '),
		result_type: 'recent',
		lang: 'en',
		count: 50
	}, (err, res) => {

		var tweets = res.statuses.filter((tw) => filterTweet(tw, trackWords));
		if(tweets.length === 0){
			findTweets(cb);
		}else{
			cb(null, tweets.map(tw => {
				tw.clean = cleanText(tw.text)
				return tw;
			}));
		}

	});
}


module.exports = {
	findTweets,
	findTweet: (cb) => findTweets((err, tweets) => cb(err, tweets[0]))
}
const express = require('express')
const app = express()
const Twitter8Ball = require('./lib')
const port = process.env.PORT || 8080;

app.use(express.static('public'))


app.get('/fetch-live-tweet', (req, res) => {
	Twitter8Ball.findTweet((err, tweet) => {
		if(err){
			res.status(500).send({error:err})
		}else{
			res.send(tweet)
		}

	})
})

app.listen(port, () => console.log('http://localhost:' + port))
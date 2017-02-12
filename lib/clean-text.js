const linkRegex = /http[^ ]+/;
const hashtagRegex = /\#[a-zA-Z0-9_]+/;
const atMentionRegex = /\@[a-zA-Z0-9_]+\:?/;

module.exports = function cleanText(text){


	text = removeAll(text, linkRegex);
	text = removeAll(text, hashtagRegex);
	text = removeAll(text, atMentionRegex);

	if(text.substr(0,3)==='RT '){
		text = text.substr(3);
	}

	text = text.trim();



	return text;
}

function removeAll(subject, regex){
	while(true){
		var replaced = subject.replace(regex, '');
		if(replaced.length === subject.length){
			subject = replaced;
			break;
		}
		subject = replaced;
	}
	return subject;
}
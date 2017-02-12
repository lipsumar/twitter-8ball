module.exports = (str, arr) => {
	for (var i = 0; i < arr.length; i++) {
		if(str.indexOf(arr[i]) > -1){
			return true;
		}
	}
	return false;
}
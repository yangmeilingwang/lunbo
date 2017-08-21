function audioMy($data) {
	$audio ="<audio autoplay='autoplay'>"+
				"<source src='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text="+encodeURI($data)+"'type='audio/mpeg'>"+
				// "<embed height=0 width=0 src='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text="+encodeURI($data)+"'>"+
			"</audio>";
	return $('body').append($audio);
}
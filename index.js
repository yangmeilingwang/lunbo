$(window).load(function() {
	//开场语音
	// var $audioVal = '您好，欢迎访问麻阳县民生监督平台';
	// audioMy($audioVal);
	//ajax数据获取
	var timer = '';
	var deg_ = 0;
	function spanMove() {
		if(deg_==360) {
			deg_ = 0;
		}else {
			deg_++;	
		}
		$('.aa>i').css({
			'transform': 'rotate('+deg_+'deg)',
			'-ms-transform': 'rotate('+deg_+'deg)',
			'-webkit-transform': 'rotate('+deg_+'deg)',
		});
	}
	timer=setInterval(spanMove,20);
	var	postData = {};
	$.ajax({
		url: '/index.php/Index/index_json',
		type: 'post',
		success: function(data) {
			postData = data;
			return postData;
		},
		dataType: 'JSON',
		async:false,
      	cache:false,
	});
	function fadeTan($num) {
		$('.Index_tan').animate({
			opacity: 1,
		},$num);
	}
	//入场效果
	function bingMove() {
		$('.top_img').animate({
			bottom:'0',
		},1500);
	}
	setTimeout(bingMove,100);

	//计算高度
	function mainHeight() {
		var $dd = $('.tan_wrap dd').height($('.tan_wrap img').height());
		var $main = $('.IndexMain').height($(window).height()-$('.list_wrap').outerHeight());
		var $hh = [$dd,$main];
		return $hh;
	}
	setInterval(mainHeight,10);
	//当前模块显示对应的弹窗信息
	function indexInfo($num) {
		$('.text_tan p').text(postData[$num]['text']);
		$('.tan_wrap a').attr('srcUrl',postData[$num]['url']);
		$('.tan_wrap img').attr('src',postData[$num]['leftImg']);
	}
	//模块点击事件+轮播
	// var n = 0;
	// var timerDiv = '';
  	$audio = document.getElementById('audio');
	$('.list_container').on('click', '.li_div', function() {
      	var $faudio = document.getElementById('faudio');
		$('.Index_tan').remove();
		$($faudio).remove();
      	if($(this).parent().index()==8) {
        	return false;
        }
		tan_add();
		fadeTan(1000);
		n = $(this).parent().index();
		$(this).addClass('active');
		$(this).parent().siblings().find('.li_div').removeClass('active');
		var _index = $(this).parent().index()+1;
		var $num = 'num'+_index;
		indexInfo($num);
		//audioMy($('.Index_tan p').text());
      	var $audio = document.getElementById('myAudio');
		$audio.src='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text='+$('.Index_tan p').text();
	});	
	$('.list_container').on('mouseenter', '.li_div', function() {
		$('.Index_tan').remove();
        if($(this).parent().index()==8) {
              return false;
        }
		tan_add();
		fadeTan(10);
		var _index = $(this).parent().index()+1;
		var $num = 'num'+_index;
		indexInfo($num);
	});	
	$('.list_container').on('mouseleave', 'ul', function() {
		var _index = $('.li_div.active').parent().index()+1;
		var $num = 'num'+_index;
		if($('.active').length>0) {
			//$('.Index_tan').remove();
			//alert(2);
			indexInfo($num);
		}else {
			$('.Index_tan').remove();
		}
		
		//indexInfo($num);
	});
	function tan_add() {
		$tan = '<div class="Index_tan">'+
			'<dl class="tan_wrap">'+
				'<dt>'+
					'<a href=""><img src="/PUBLIC/indexImg/zj.jpg" alt=""></a>'+
				'</dt>'+
				'<dd>'+
					'<div class="text_tan">'+
						'<p></p>'+
					'</div>'+
					'<a href="javascript:;" class="btn_tan">点击进入</a>'+
				'</dd>'+
			'</dl>'+
			// '<div class="tan_close"></div>'+
		'</div>';
		$('.IndexMain').append($tan);
	}
	$('.IndexMain').on('click', '.btn_tan', function() {
		$('audio').remove();
		window.location=$(this).attr('srcUrl');
	});
});
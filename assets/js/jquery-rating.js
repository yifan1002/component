//基于jquery的评价系统
$('.rating-show').each(function(){
	var dataScore = $(this).attr('data-score');
	if (dataScore.indexOf('.') === -1) dataScore = dataScore + '.0';
	var score = dataScore .split('.');
	var scoreInt = score[0];
	if (scoreInt > 5)  scoreInt = 5;
	var scoreDec = parseInt(score[1].substring(0,1));
	var starWidth;
	if (scoreDec <= 0) {
		starWidth = '0';
	} else if (scoreDec > 0 && scoreDec <= 5) {
		starWidth = '9px';
	} else{
		starWidth = '18px';
	}
	$(this).children('.rating-list').children('a:eq(' + scoreInt + ')').addClass('active').css('width', starWidth).prevAll('a').addClass('active');
});

$('.rating-item .rating-list a').click(function(e){
	e.preventDefault();
});
$('.rating-item:not(.rating-show) .rating-list a').click(function(){
	$(this).addClass('active').prevAll('a').addClass('active');
	$(this).nextAll('a').removeClass('active');
	var $info = $(this).parent('.rating-list').siblings('.rating-info');
	if ($info.length) {
		var myIndex = $(this).index()+1;
		switch (myIndex){
		case 1:
			myText='失望';
			break;
		case 2:
			myText='不满';
			break;
		case 3:
			myText='一般';
			break;
		case 4:
			myText='满意';
			break;
		case 5:
			myText='惊喜';
			break;
		}
		$info.text(myText);
	};
});
selId = null;
steps = {'rar': 0, 'rbr': 0};
maxStep = {'rar': 3, 'rbr': 5};
selPlan = 'rbr';

links = {'underinvestment':'https://www.bostonglobe.com/metro/2016/09/17/mbta-failed-spend-enough-repairs-expansion/cBhT3DqHaOi88T0yl7O2EN/story.html',
'crisis': 'https://www.bostonglobe.com/metro/2015/03/15/parade-day-snow-but-snowiest-winter-record-unlikely-today/BCxfh7yPtIrxtHVzty5sPM/story.html',
'service':'https://www.bostonglobe.com/metro/2016/01/25/state-red-line-crowded-late-need-repair/8MPiHXV8BwhMXpULICneCL/story.html',
'inefficiencies':'https://www.bostonglobe.com/metro/2016/07/10/mbta-details-poorly-and-inefficiently-run-cash-counting-operation/EX4u231ZjJDQSQFp2k0IEM/story.html',
'privatized':'https://www.bostonglobe.com/opinion/2015/04/14/free-mbta-from-pacheco-law/0gTJ2Er0JGzvXlpDiyguON/story.html',
'private':'https://www.bostonglobe.com/metro/2016/09/06/mbta-could-privatize-maintenance-and-bus-driver-jobs/FGgShhgOEfydZTBosD96HJ/story.html',
'pay':'https://www.bostonglobe.com/metro/2016/07/30/government-left-shaky-ethical-ground-political-consultants-become-corporate-lobbyists/R6fRl4onJX3rfIdYo8nolK/story.html',
'talk':'https://www.bostonglobe.com/metro/2015/02/18/governor-charlie-baker-keolis-done-with-excuses/GOz8QlNZOwpFO9YugFG22J/story.html',
'extra':'https://www.bostonglobe.com/metro/2016/07/11/mbta-may-pay-million-more-per-year-commuter-rail-operator/4PhRLwfYT9o40zKL7h9x4K/story.html',
'deficit':'https://www.bostonglobe.com/metro/2016/06/16/baker-bureaucrats-plan-for-smallest-budget-proposal/GnePQ93WCcHOoa1HKc3NcK/story.html',
'enhancements':'http://www.bostonglobe.com/metro/2016/09/26/could-mbta-run-overnight-bus-routes-some-advocates-say-yes/1Wo9phLrioBL5h29R9lCJO/story.html',
'reform':'https://www.bostonglobe.com/metro/2016/08/01/after-buyouts-mbta-considers-additional-layoffs/kvd5y9DTSOMa5tb4A4g8MK/story.html'
}


$(function(clickCell){  //clicking on the flow-chart cells
	$('.diagram-cell').click(function(event) {
		$id = $(this).attr('id')
		if ($id == selId) { //if the cell is already selected, de-select
		  selId = null;
		  $(this).attr('class','diagram-cell');
    	  $('.article-mask').removeClass('article-mask-collapse');

		} else { //otherwise, select
		  selId = $id;
		  $('.diagram-cell').attr('class','diagram-cell');
		  $(this).attr('class','diagram-cell selected');
   		  $('.article').attr('src','img/'+$id+'.png');
		  $('a#article-link').attr('href',links[$id]);
  		  $('.article-mask').addClass('article-mask-collapse');
		}
	})
})

$(function(hoverCell){
	$('.diagram-cell').mouseover(function(event) {
		if(!selId){
  		  $id = $(this).attr('id')
		}
		$('.article').attr('src','img/'+$id+'.png');
		$('a#article-link').attr('href',links[$id]);
	})
})

checkStep = function (step) {
  $('g[id]').each(function(index){
    $groupStep = $(this).attr('id').split('-')[1]
	if ($groupStep > step){
	  $(this).attr('class','hidden');
	} else {
	  $(this).attr('class','');
	}
  })
  steps[selPlan] == 0 ? $('#step-back').addClass('hidden') : $('#step-back').removeClass('hidden')
  steps[selPlan] == maxStep[selPlan] || selPlan == 'rar' ? $('#change-plan').removeClass('hidden') : ''
  steps[selPlan] == maxStep[selPlan] ? $('#step-next').addClass('disabled') : $('#step-next').removeClass('disabled')
}

$(function(){
  $('#step-next').click(function(event) {
    steps[selPlan] < maxStep[selPlan] ? steps[selPlan] ++ : '';
	checkStep(steps[selPlan]);
  })
})

$(function(){
  $('#step-back').click(function(event) {
    steps[selPlan] > 0 ? steps[selPlan] -- : '';
	checkStep(steps[selPlan]);
  })
})

$(function(){
  $('#change-plan').click(function(event) {
    if (selPlan == 'rbr') {
	  selPlan = 'rar';
	  $('#rar').attr('display','inline');
	  $('#rbr').attr('display','none');
	} else {
	  selPlan = 'rbr';
	  $('#rbr').attr('display','inline');
	  $('#rar').attr('display','none');
	}
	$(this).toggleClass('active');
	$('h3#title').toggleClass('hidden');
	selId = null;
	checkStep(steps[selPlan]);
  })
})

$(document).ready( function() {
  checkStep(steps[selPlan])
});


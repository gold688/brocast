var windowData = {
	'url': '', 
	'type': 'popup',
	'width': 500,
	'height': 300
}
var url;

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request.resultingURL) {
  		url = request.resultingURL;
  		$(".url").text(url);
  		$("#openInTabButton").click(function() {
  			chrome.tabs.create({'url': url}, function(tab){});
  		});
  	}
});

$(document).ready(function(){
	$("#facebook_button").click(function() {
		_gaq.push(['_trackEvent', "extension getURL", 'share with facebook']);
		windowData.url = "https://www.facebook.com/sharer/sharer.php?u=" + url;
		chrome.windows.create(windowData, function(window) {});
	});

	$("#twitter_button").click(function() {
		_gaq.push(['_trackEvent', "extension getURL", 'share with twitter']);
		windowData.url = "https://twitter.com/home?status=Join%20my%20Brocast%20live%20stream:%20"+encodeURIComponent(url);
		chrome.windows.create(windowData, function(window) {});
	});

	$("#copyButton").click(function() {
		_gaq.push(['_trackEvent', "extension getURL", 'copy link']);
		copyTextToClipboard(url);
	});
});
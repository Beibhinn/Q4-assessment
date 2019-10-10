$(document).ready(function(){
	var newsSource = document.getElementById("release-template").innerHTML,
		template = Handlebars.compile(newsSource);

	$.getJSON('release.json', function(json) {
		var data = template(json);
		$('.news').html(data);
	});

	Handlebars.registerHelper('formatDate', function(date, format) {
		return moment(date).format(format);
	});

	Handlebars.registerHelper('truncate', function(text, num) {
		return text.substr(0,num) + '...';
	});

	Handlebars.registerHelper('limit', function(releases, block) {
		let limitNews = "",
			offset = parseInt(block.hash.offset) || 0,
			limit = parseInt(block.hash.limit) || 3,
			i = (offset < releases.length) ? offset : 0,
			j = ((limit + offset) < releases.length) ? (limit + offset) : releases.length;

		for(i,j; i<j; i++) {
			limitNews += block.fn(releases[i]);
		}

		return limitNews;
	});
});
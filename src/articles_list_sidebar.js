javascript: (async () => {
	try {
		if (location.hostname !== 'www.nikkei.com') {
			return alert('This plugin works on `nikkei.com/paper/article/` only!');
		}
		const url = `https://www.nikkei.com/paper/`;
		const res = await fetch(url).then(response => response.text());
		let html = '';
		const parser = new DOMParser();
		const doc = parser.parseFromString(res, 'text/html');
		const articles = doc.getElementsByClassName('cmn-article_title');
		const params = new URLSearchParams(location.search);
		const id = params.get('ng');
		for (let l = 0; l < articles.length; l++) {
			const articlesElement = articles[l];
			const rawArticle = articlesElement
				.getElementsByTagName('span')[0]
				.getElementsByTagName('a')[0];
			if (!rawArticle) {
				continue;
			}
			const articleTitle = rawArticle
				.getElementsByTagName('span')[0]
				.getElementsByTagName('span')[0].textContent;
			if (!articleTitle) {
				continue;
			}
			let mark = '';
			if (rawArticle.href.match(id)) {
				mark = '==';
			}
			html += `<a href=${rawArticle.href}>${mark}${articleTitle.substr(
				0,
				14
			)}${mark}</a><br>`;
		}
		document
			.getElementsByClassName('cmn-sub_rightbox')[0]
			.insertAdjacentHTML('beforebegin', html);
		return;
	} catch (e) {
		console.log(e);
		alert(e);
	}
})();

javascript: (async () => {
	try {
		if (location.hostname !== 'www.nikkei.com') {
			return alert('This plugin works on `nikkei.com/paper/article/` only!');
		}

		const createMark = () => {
			const params = new URLSearchParams(location.search);
			insertMark(params.get('ng'));
		};

		const createArticlesList = doc => {
			const articleList = [];
			const articles = doc.getElementsByClassName('cmn-article_title');
			for (let l = 0; l < articles.length; l++) {
				const articlesElement = articles[l];
				const rawArticle = articlesElement
					.getElementsByTagName('span')[0]
					.getElementsByTagName('a')[0];
				if (!rawArticle) continue;
				const articleTitle = rawArticle
					.getElementsByTagName('span')[0]
					.getElementsByTagName('span')[0].textContent;
				if (!articleTitle) continue;
				let article = {};
				article.href = rawArticle.href;
				article.title = articleTitle.substr(0, 16);
				articleList.push(article);
			}
			return articleList;
		};

		const getArticles = async () => {
			const url = `https://www.nikkei.com/paper/`;
			const res = await fetch(url).then(response => response.text());
			const parser = new DOMParser();
			const doc = parser.parseFromString(res, 'text/html');
			return createArticlesList(doc);
		};

		const createHtml = articleList => {
			let html = '';
			for (let i = 0; i < articleList.length; i++) {
				const article = articleList[i];
				html += `<a href=${article.href}>${article.title.substr(
					0,
					16
				)}</a><br>`;
			}
			return html;
		};

		const insertHtml = html => {
			document
				.getElementsByClassName('cmn-sub_rightbox')[0]
				.insertAdjacentHTML('afterbegin', html);
		};

		const insertMark = id => {
			const articlesHtml = document
				.getElementById('articles')
				.getElementsByTagName('a');
			for (let i = 0; i < articlesHtml.length; i++) {
				const articleHtml = articlesHtml[i];
				const href = new URLSearchParams(articleHtml.href);
				const ng = href.get('ng');
				if (ng === id) {
					return articleHtml.insertAdjacentHTML(
						'beforebegin',
						'<a id="marked">=></a>'
					);
				}
			}
		};

		const renderArticles = async () => {
			const articleList = await getArticles();
			const html = createHtml(articleList);
			insertHtml(html);
			createMark();
		};

		renderArticles('');
		return;
	} catch (e) {
		console.log(e);
		alert(e);
	}
})();

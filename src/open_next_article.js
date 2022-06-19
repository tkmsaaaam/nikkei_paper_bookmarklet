javascript: (() => {
	try {
		if (
			location.hostname !== 'www.nikkei.com' ||
			!location.pathname.startsWith('/paper/article/')
		) {
			return alert('This plugin works on `nikkei.com/paper/article/` only!');
		}
		const articleBtnNext = document.getElementsByClassName(
			'm−paper_articleBtn_next'
		)[0];
		if (articleBtnNext !== undefined) {
			window.location.href = articleBtnNext.href;
		} else {
			const contentsMain = document.getElementById('CONTENTS_MAIN');
			const cmncTitleElement =
				contentsMain.getElementsByClassName('cmnc-title')[0];
			const cmncTitle = cmncTitleElement.textContent;
			const jsidUrlData = contentsMain.getElementsByTagName('li');
			for (const j in jsidUrlData) {
				if (~jsidUrlData[j].textContent.indexOf(cmncTitle)) {
					jsidUrlData[parseInt(j) + 1].getElementsByTagName('a')[0].click();
					break;
				}
			}
		}
	} catch (e) {
		console.log(e);
		alert(e);
	}
})();

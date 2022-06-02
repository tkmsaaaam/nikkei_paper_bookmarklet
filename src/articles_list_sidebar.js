javascript:(
  async () => {
    if (location.hostname !== 'www.nikkei.com' || !location.pathname.startsWith('/paper/article/')) {
      return alert('This plugin works on `nikkei.com/paper/article/` only!')
    };
    const url = `https://www.nikkei.com/paper/`;
    const res = await fetch(url).then((response)=>response.text());
    let html ='';
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, "text/html");
    const articles = doc.getElementById('CONTENTS_MAIN').getElementsByTagName('h4');
    for (let l = 0; l < articles.length; l++) {
      const articlesElement = articles[l];
      if (articlesElement.className !== 'cmn-article_title') {
        continue;
      }else {
        const rawArticle = articlesElement.getElementsByTagName('span')[0].getElementsByTagName('a')[0];
        const articleTitle = rawArticle.getElementsByTagName('span')[0].getElementsByTagName('span')[0].textContent;
        html += `<a href=${rawArticle.href}>${articleTitle.substr(0, 18)}</a><br>`
      }
    };
    document.getElementsByClassName('infoNikkei')[0].insertAdjacentHTML('afterend', html);
    return ;
  }
)();

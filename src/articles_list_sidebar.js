javascript:(
  async () => {
    try{
      if (location.hostname !== 'www.nikkei.com') {
        return alert('This plugin works on `nikkei.com/paper/article/` only!')
      };
      const url = `https://www.nikkei.com/paper/`;
      const res = await fetch(url).then((response)=>response.text());
      let html ='';
      const parser = new DOMParser();
      const doc = parser.parseFromString(res, "text/html");
      const articles = doc.getElementsByClassName('cmn-article_title');
      for (let l = 0; l < articles.length; l++) {
        const articlesElement = articles[l];
        const rawArticle = articlesElement.getElementsByTagName('span')[0].getElementsByTagName('a')[0];
        if (!rawArticle) { continue; }
        const articleTitle = rawArticle.getElementsByTagName('span')[0].getElementsByTagName('span')[0].textContent;
        if (!articleTitle) { continue; }
        html += `<a href=${rawArticle.href}>${articleTitle.substr(0, 18)}</a><br>`
      };
      document.getElementsByClassName('infoNikkei')[0].insertAdjacentHTML('afterend', html);
      return ;
    }catch(e){
      console.log(e);
      alert(e);
    }
  }
)();

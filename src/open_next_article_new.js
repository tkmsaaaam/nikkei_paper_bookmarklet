javascript: (async () => {
  try {
    if (
      location.hostname !== "www.nikkei.com" ||
      !location.pathname.startsWith("/paper/article/")
    ) {
      return alert("This plugin works on `nikkei.com/paper/article/` only!");
    }
    const url = `https://www.nikkei.com/paper/`;
    const res = await fetch(url).then((response) => response.text());
    const ids = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, "text/html");
    const articles = doc.getElementsByClassName("cmn-article_title");
    for (let l = 0; l < articles.length; l++) {
      const articlesElement = articles[l];
      const rawParams = articlesElement
        .getElementsByTagName("span")[0]
        .getElementsByTagName("a")[0];
      if (!rawParams) {
        continue;
      }
      const params = new URLSearchParams(rawParams.href);
      const id = params.get("ng");
      if (id === null) {
        continue;
      }
      ids.push(id);
    }

    const params = new URLSearchParams(location.search);
    const id = params.get("ng");
    const i = ids.findIndex((searchId) => searchId === id);
    const next_page = ids[i + 1];
    return (window.location = `https://www.nikkei.com/paper/article/?ng=${next_page}`);
  } catch (e) {
    console.log(e);
    alert(e);
  }
})();

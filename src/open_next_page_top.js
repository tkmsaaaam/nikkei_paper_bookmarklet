javascript:(
  ()=>{
    try{
      if (location.hostname !== 'www.nikkei.com' || location.pathname.startsWith('/paper/article')) {
        return alert('This plugin works on `nikkei.com/paper/` only!')
      };
      const pages = [];
      const lis = document.getElementById('CONTENTS_MAIN').getElementsByClassName('kn-panel')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
      for (let l = 0; l < lis.length; l++) {
        const hash = lis[l].getElementsByTagName('span')[0].textContent.slice(1);
        pages.push(hash);
      };
      const params = new URLSearchParams(location.search);
      const q = params.get("fs");
      const next_page = pages[pages.findIndex(p => p === q)+1];
      document.getElementById(next_page).getElementsByTagName('a')[3].click();
    }catch(e){
      console.log(e);
      alert(e);
    }
  }
)();

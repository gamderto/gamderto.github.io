(function(){
  const KEY = 'site-theme';
  const checkboxId = 'theme-toggle-checkbox';

  function applyTheme(theme){
    if(theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  function saveTheme(theme){
    try{ localStorage.setItem(KEY, theme); }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = (function(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; }})();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(initial);

    // sync checkboxes (there may be multiple on page)
    const boxes = document.querySelectorAll('#'+checkboxId);
    boxes.forEach(cb => {
      cb.checked = (initial === 'dark');
      cb.addEventListener('change', (e)=>{
        const theme = e.target.checked ? 'dark' : 'light';
        applyTheme(theme);
        saveTheme(theme);
      });
    });
  });
})();

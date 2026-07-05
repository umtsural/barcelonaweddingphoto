document.documentElement.classList.add('js');

(function(){
  function ready(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
  ready(function(){
    document.querySelectorAll('.header').forEach(function(header, index){
      const nav = header.querySelector('.nav');
      if(!nav || header.querySelector('.nav-toggle')) return;

      const id = nav.id || 'site-nav-' + index;
      nav.id = id;

      const button = document.createElement('button');
      button.className = 'nav-toggle';
      button.type = 'button';
      button.setAttribute('aria-label', 'Open menu');
      button.setAttribute('aria-controls', id);
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = '<span></span><span></span><span></span>';
      header.insertBefore(button, nav);

      function closeMenu(){
        header.classList.remove('nav-open');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open menu');
      }

      button.addEventListener('click', function(){
        const isOpen = header.classList.toggle('nav-open');
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      nav.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', closeMenu);
      });

      document.addEventListener('keydown', function(event){
        if(event.key === 'Escape') closeMenu();
      });
    });
  });
})();

(function(){
  const slider = document.querySelector('.editorial-slider');
  if(!slider || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let dir = 1;
  let raf;
  function tick(){
    const max = slider.scrollWidth - slider.clientWidth;
    if(max > 0){
      slider.scrollLeft += 0.25 * dir;
      if(slider.scrollLeft >= max - 1) dir = -1;
      if(slider.scrollLeft <= 1) dir = 1;
    }
    raf = requestAnimationFrame(tick);
  }
  slider.addEventListener('mouseenter',()=>cancelAnimationFrame(raf));
  slider.addEventListener('mouseleave',()=>{raf=requestAnimationFrame(tick);});
  raf = requestAnimationFrame(tick);
})();


(function(){
  const section = document.querySelector('.three-moments');
  if(!section) return;
  section.addEventListener('mouseenter', () => {
    section.querySelectorAll('.three-card').forEach(card => card.style.animationPlayState = 'paused');
  });
  section.addEventListener('mouseleave', () => {
    section.querySelectorAll('.three-card').forEach(card => card.style.animationPlayState = 'running');
  });
})();





(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let wipe = document.querySelector('.bwp-page-wipe');
  if(!wipe){
    wipe = document.createElement('div');
    wipe.className = 'bwp-page-wipe';
    wipe.setAttribute('aria-hidden','true');
    document.body.appendChild(wipe);
  }

  function isInternalLink(a){
    if(!a || !a.href) return false;
    const url = new URL(a.href, window.location.href);
    const current = new URL(window.location.href);
    if(url.origin !== current.origin) return false;
    if(a.hasAttribute('download') || a.target) return false;
    if(url.pathname === current.pathname && url.hash) return false;
    return true;
  }

  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!isInternalLink(a)) return;

    e.preventDefault();

    document.body.classList.add('is-transitioning');
    wipe.classList.remove('is-active');
    void wipe.offsetWidth;
    wipe.classList.add('is-active');

    setTimeout(function(){
      window.location.href = a.href;
    }, 620);
  });
})();

(function(){
  function ready(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
  ready(function(){
    if(localStorage.getItem('bwp_cookie_choice')) return;
    var isEs = location.pathname.indexOf('/es/') === 0;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = '<p>' + (isEs ? 'Usamos cookies esenciales y, si aceptas, cookies analíticas para mejorar la experiencia. Puedes cambiar la configuración desde tu navegador. ' : 'We use essential cookies and, if accepted, analytics cookies to improve the experience. You can change settings in your browser. ') + '<a href="' + (isEs ? '/es/cookie-policy.html' : '/cookie-policy.html') + '">' + (isEs ? 'Política de cookies' : 'Cookie policy') + '</a></p><div class="cookie-actions"><button class="decline">' + (isEs ? 'Rechazar' : 'Decline') + '</button><button class="accept">' + (isEs ? 'Aceptar' : 'Accept') + '</button></div>';
    document.body.appendChild(banner);
    banner.style.display = 'flex';
    banner.querySelector('.accept').addEventListener('click', function(){localStorage.setItem('bwp_cookie_choice','accepted');banner.remove();});
    banner.querySelector('.decline').addEventListener('click', function(){localStorage.setItem('bwp_cookie_choice','declined');banner.remove();});
  });
})();

(function(){
  function ready(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
  ready(function(){
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){
      a.addEventListener('click', function(){
        if (typeof gtag === 'function') gtag('event', 'contact_email_click', {'event_category':'conversion'});
      });
    });
    document.querySelectorAll('form.contact-form').forEach(function(form){
      form.addEventListener('submit', function(){
        if (typeof gtag === 'function') gtag('event', 'contact_form_submit', {'event_category':'conversion'});
      });
    });
  });
})();

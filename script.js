(function(){
  document.documentElement.classList.add('js-ready');
  var menuBtn=document.getElementById('menuBtn'),mobileMenu=document.getElementById('mobileMenu');
  menuBtn&&menuBtn.addEventListener('click',function(){
    var open=mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open',open);
    menuBtn.setAttribute('aria-expanded',open);
  });
  mobileMenu&&mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
    });
  });

  var nav=document.getElementById('siteNav');
  var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>10); };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();

  var form=document.getElementById('quoteForm');
  form&&form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(e.currentTarget);
    var msg="Hi Edgar's Garage, I'd like to request mobile service.%0A%0AName: "+encodeURIComponent(d.get('name'))+
      '%0APhone: '+encodeURIComponent(d.get('phone'))+
      '%0AVehicle: '+encodeURIComponent(d.get('vehicle'))+
      
      '%0AService: '+encodeURIComponent(d.get('service'))+
      '%0AIssue: '+encodeURIComponent(d.get('issue')||'');
    window.location.href='sms:+16615268966?&body='+msg;
  });
})();

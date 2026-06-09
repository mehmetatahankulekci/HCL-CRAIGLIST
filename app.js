(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
  function money(n){return '$'+Number(n).toLocaleString('en-US');}

  /* ---------- color + shade ---------- */
  function shade(hex,pct){
    var c=hex.replace('#','');
    if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);
    var t=pct<0?0:255,p=Math.abs(pct)/100;
    r=Math.round((t-r)*p)+r;g=Math.round((t-g)*p)+g;b=Math.round((t-b)*p)+b;
    return 'rgb('+r+','+g+','+b+')';
  }
  var COLORHEX={White:'#e6e8ec',Black:'#2c2f36',Silver:'#bfc3ca',Blue:'#3f6fc4',Red:'#a8332e',
    Gray:'#6c7077',Green:'#3c6b3a',Beige:'#cdbf9c',White2:'#eef0f3'};

  /* ---------- SVG art ---------- */
  function cabin(body){
    switch(body){
      case 'SUV': return {p:'92,96 100,52 236,52 246,96', w:'106,90 112,60 226,60 234,90', extra:''};
      case 'Sedan': return {p:'100,96 126,62 206,62 236,96', w:'112,90 132,68 200,68 222,90', extra:''};
      case 'Coupe': return {p:'112,96 142,62 196,62 226,96', w:'124,90 148,70 190,70 210,90', extra:''};
      case 'Truck': return {p:'90,96 102,56 150,56 150,96', w:'98,90 106,62 144,62 144,90', extra:'<rect x="150" y="78" width="124" height="18" rx="4" />'};
      case 'Hatch': return {p:'100,96 122,58 222,58 246,96', w:'112,90 130,66 234,66 236,90', extra:''};
      case 'Van': return {p:'90,96 96,44 252,44 260,96', w:'100,90 106,52 246,52 252,90', extra:''};
      default: return {p:'100,96 126,62 206,62 236,96', w:'112,90 132,68 200,68 222,90', extra:''};
    }
  }
  function carSVG(colorName, body, opts){
    opts=opts||{};
    var hex=COLORHEX[colorName]||'#5b6fb0';
    var bg=opts.bg||'#dfe6ee';
    var cb=cabin(body);
    var flip=opts.flip?' transform="translate(320,0) scale(-1,1)"':'';
    var svg='<svg viewBox="0 0 320 190" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';
    svg+='<defs><linearGradient id="sky'+(opts.id||'')+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+shade(bg,14)+'"/><stop offset="1" stop-color="'+shade(bg,-8)+'"/></linearGradient></defs>';
    svg+='<rect width="320" height="190" fill="url(#sky'+(opts.id||'')+')"/>';
    svg+='<g'+flip+'>';
    svg+='<ellipse cx="160" cy="150" rx="120" ry="12" fill="rgba(0,0,0,0.13)"/>';
    svg+='<polygon points="'+cb.p+'" fill="'+shade(hex,-6)+'"/>';
    svg+='<polygon points="'+cb.w+'" fill="#d3e2f1" opacity="0.94"/>';
    if(cb.extra) svg+=cb.extra.replace('/>',' fill="'+shade(hex,-12)+'"/>');
    svg+='<rect x="44" y="94" width="232" height="42" rx="16" fill="'+hex+'"/>';
    svg+='<rect x="44" y="118" width="232" height="18" rx="9" fill="'+shade(hex,-20)+'"/>';
    svg+='<rect x="148" y="60" width="2.5" height="76" fill="rgba(0,0,0,0.10)"/>';
    svg+='<circle cx="268" cy="104" r="6" fill="#ffe39a"/><circle cx="52" cy="106" r="4" fill="#c0392b" opacity=".8"/>';
    // wheels
    [98,224].forEach(function(cx){
      svg+='<circle cx="'+cx+'" cy="136" r="23" fill="#23262c"/><circle cx="'+cx+'" cy="136" r="11" fill="#9aa0aa"/><circle cx="'+cx+'" cy="136" r="4" fill="#4b4f57"/>';
    });
    svg+='</g></svg>';
    return svg;
  }
  function dashSVG(colorName){
    var bg='#cfd6df';
    return '<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">'+
      '<rect width="320" height="190" fill="'+bg+'"/>'+
      '<rect x="0" y="120" width="320" height="70" fill="'+shade(COLORHEX[colorName]||"#444",-30)+'"/>'+
      '<rect x="30" y="70" width="260" height="60" rx="10" fill="#2b2e35"/>'+
      '<circle cx="95" cy="100" r="22" fill="#11131a"/><circle cx="95" cy="100" r="22" fill="none" stroke="#6fa8ff" stroke-width="3"/>'+
      '<circle cx="160" cy="100" r="18" fill="#11131a"/>'+
      '<circle cx="225" cy="100" r="22" fill="#11131a"/><circle cx="225" cy="100" r="22" fill="none" stroke="#5fd08a" stroke-width="3"/>'+
      '<rect x="120" y="150" width="80" height="30" rx="6" fill="#1b1d24"/>'+
      '<circle cx="160" cy="40" r="26" fill="none" stroke="#3a3d44" stroke-width="9"/>'+
      '</svg>';
  }
  function wheelSVG(){
    return '<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">'+
      '<rect width="320" height="190" fill="#c7ccd4"/>'+
      '<circle cx="160" cy="100" r="78" fill="#1c1f25"/><circle cx="160" cy="100" r="48" fill="#aeb4bd"/>'+
      '<circle cx="160" cy="100" r="14" fill="#5b6068"/>'+
      [0,72,144,216,288].map(function(a){var rad=a*Math.PI/180;var x=160+Math.cos(rad)*36;var y=100+Math.sin(rad)*36;return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="6" fill="#5b6068"/>';}).join('')+
      '</svg>';
  }
  function homeSVG(opts){
    opts=opts||{};
    var fac=opts.fac||'#cdb89a', roof=shade(fac,-25), id=opts.id||'';
    var win='#bcd4ec';
    var s='<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">';
    s+='<defs><linearGradient id="hs'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3f6"/><stop offset="1" stop-color="#eaf1f8"/></linearGradient></defs>';
    s+='<rect width="320" height="190" fill="url(#hs'+id+')"/>';
    s+='<rect x="0" y="150" width="320" height="40" fill="#d8d2c4"/>';
    s+='<rect x="60" y="40" width="200" height="120" fill="'+fac+'"/>';
    s+='<rect x="52" y="32" width="216" height="14" fill="'+roof+'"/>';
    // window grid
    for(var r=0;r<3;r++){for(var c=0;c<4;c++){
      s+='<rect x="'+(74+c*46)+'" y="'+(56+r*34)+'" width="30" height="22" rx="2" fill="'+win+'" stroke="'+roof+'" stroke-width="1.5"/>';
    }}
    // door
    s+='<rect x="146" y="120" width="28" height="40" rx="3" fill="'+roof+'"/>';
    // little tree
    s+='<rect x="288" y="120" width="6" height="34" fill="#6b4f2a"/><circle cx="291" cy="116" r="16" fill="#5e8a47"/>';
    s+='</svg>';
    return s;
  }
  function roomSVG(opts){
    opts=opts||{};var wall=opts.wall||'#e7e0d4';
    return '<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">'+
      '<rect width="320" height="190" fill="'+wall+'"/>'+
      '<rect x="0" y="140" width="320" height="50" fill="#caa978"/>'+
      '<rect x="40" y="40" width="80" height="70" rx="3" fill="#bcd4ec" stroke="#9aa6b3" stroke-width="2"/>'+
      '<rect x="150" y="96" width="130" height="48" rx="8" fill="'+shade(wall,-22)+'"/>'+
      '<rect x="158" y="78" width="40" height="22" rx="6" fill="'+shade(wall,-14)+'"/>'+
      '<rect x="212" y="78" width="40" height="22" rx="6" fill="'+shade(wall,-14)+'"/>'+
      '<circle cx="100" cy="150" r="6" fill="#7a8a3a"/>'+
      '</svg>';
  }
  function laptopSVG(opts){
    opts=opts||{};var lid=opts.lid||'#b9c0c9',scr=opts.scr||'#1d2330',id=opts.id||'';
    var s='<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg">';
    s+='<defs><linearGradient id="lp'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f3f6"/><stop offset="1" stop-color="#dde2e8"/></linearGradient></defs>';
    s+='<rect width="320" height="190" fill="url(#lp'+id+')"/>';
    // screen
    s+='<rect x="78" y="36" width="164" height="104" rx="8" fill="'+lid+'"/>';
    s+='<rect x="86" y="44" width="148" height="88" rx="4" fill="'+scr+'"/>';
    // desktop ui bars
    s+='<rect x="94" y="52" width="60" height="8" rx="3" fill="#6fa8ff"/>';
    s+='<rect x="94" y="66" width="100" height="6" rx="3" fill="#3a4151"/>';
    s+='<rect x="94" y="78" width="80" height="6" rx="3" fill="#3a4151"/>';
    s+='<rect x="94" y="100" width="120" height="22" rx="4" fill="#2a3142"/>';
    // base
    s+='<path d="M58 140 L262 140 L278 156 L42 156 Z" fill="'+shade(lid,-10)+'"/>';
    s+='<rect x="146" y="140" width="28" height="5" rx="2" fill="'+shade(lid,-24)+'"/>';
    s+='</svg>';
    return s;
  }

  /* ---------- navigation / view ---------- */
  var curView=null;
  function showView(id,fromHistory){
    $$('.view').forEach(function(v){v.classList.remove('active');});
    var v=document.getElementById('view-'+id);
    if(v){v.classList.add('active');window.scrollTo(0,0);}
    if(!fromHistory && id!==curView){
      try{history.pushState({view:id},'');}catch(e){}
    }
    curView=id;
    updateBackBtn();
  }
  function updateBackBtn(){var b=$('#backBtn');if(b)b.style.display=(curView&&curView!=='home')?'inline-flex':'none';}
  function goBack(){
    if($('#overlay').classList.contains('on')){closeModal();return;}
    history.back();
  }
  window.addEventListener('popstate',function(e){
    if($('#overlay').classList.contains('on'))closeModal();
    var id=(e.state&&e.state.view)||'home';
    showView(id,true);
  });
  function wireNav(root){
    $$('[data-nav]',root).forEach(function(el){if(el.__nav)return;el.__nav=1;el.addEventListener('click',function(){showView(el.getAttribute('data-nav'));});});
    $$('[data-toast]',root).forEach(function(el){if(el.__t)return;el.__t=1;el.addEventListener('click',function(e){e.stopPropagation();toast(el.getAttribute('data-toast'));});});
  }

  /* ---------- toast / modal ---------- */
  var toastTimer;
  function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove('on');},2000);}
  function openModal(title,bodyHtml){
    $('#modal').innerHTML='<div class="mhead"><h3>'+title+'</h3><span class="x" id="modalX">&times;</span></div><div class="mbody">'+bodyHtml+'</div>';
    $('#overlay').classList.add('on');
    $('#modalX').addEventListener('click',closeModal);
    wireNav($('#modal'));
  }
  function closeModal(){$('#overlay').classList.remove('on');}
  $('#overlay').addEventListener('click',function(e){if(e.target===$('#overlay'))closeModal();});

  /* ---------- favorites ---------- */
  var FAV={};
  function favKey(t,id){return t+':'+id;}
  function toggleFav(t,id){var k=favKey(t,id);if(FAV[k])delete FAV[k];else FAV[k]=true;updateFavCount();}
  function updateFavCount(){var n=Object.keys(FAV).length;var c=$('#favCount');c.textContent=n;c.style.display=n?'flex':'none';}
  $('#favBtn').addEventListener('click',function(){toast(Object.keys(FAV).length+' saved item(s)');});

  /* ---------- shared card builders ---------- */
  function favHtml(t,id){return '<span class="fav'+(FAV[favKey(t,id)]?' on':'')+'" data-fav="'+t+':'+id+'"><i class="ti ti-heart'+(FAV[favKey(t,id)]?'-filled':'')+'"></i></span>';}
  function wireFav(scope){
    $$('[data-fav]',scope).forEach(function(el){
      el.addEventListener('click',function(e){
        e.stopPropagation();
        var parts=el.getAttribute('data-fav').split(':');
        toggleFav(parts[0],parts[1]);
        var on=FAV[favKey(parts[0],parts[1])];
        el.classList.toggle('on',on);
        el.querySelector('i').className='ti ti-heart'+(on?'-filled':'');
      });
    });
  }

  /* =================== DATA: CARS =================== */
  var MODELS={
    BMW:['1 Series','3 Series','5 Series','X1','X3','X5','M3','M4'],
    Audi:['A4','A6','Q3','Q5','Q7'],
    Mercedes:['C-Class','E-Class','GLC','GLE'],
    Toyota:['Corolla','Camry','RAV4','Highlander','Tacoma'],
    Honda:['Civic','Accord','CR-V','Odyssey'],
    Ford:['Focus','Mustang','Escape','F-150'],
    Tesla:['Model 3','Model Y','Model S'],
    Jeep:['Wrangler','Cherokee','Grand Cherokee'],
    Subaru:['Impreza','Outback','Forester'],
    Volkswagen:['Golf','Jetta','Tiguan']
  };
  var CARS=[
    {id:1,year:2019,make:'BMW',model:'X3',trim:'xDrive 30i',price:22500,mi:62,loc:'Brooklyn',body:'SUV',color:'Blue',trans:'Automatic',fuel:'Gasoline',cyl:'6 cyl',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.8,reviews:31,sales:12,posted:'2 days ago',desc:'One owner, garage-kept. Recent service with new brakes and all-season tires. Heated seats, panoramic roof, Apple CarPlay. No accidents, clean title in hand. Selling because I am relocating.'},
    {id:2,year:2018,make:'BMW',model:'X5',trim:'xDrive 40i',price:28900,mi:78,loc:'Queens',body:'SUV',color:'Black',trans:'Automatic',fuel:'Gasoline',cyl:'6 cyl',drive:'AWD',title:'Clean',dealer:true,verified:true,rating:4.6,reviews:120,sales:340,posted:'5 hours ago',desc:'Dealer-certified pre-owned with full inspection and 2-year limited warranty. Premium package, third-row seating, adaptive cruise. Financing available on site.'},
    {id:3,year:2017,make:'BMW',model:'X1',trim:'sDrive 28i',price:17200,mi:89,loc:'Bronx',body:'SUV',color:'Silver',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'FWD',title:'Clean',dealer:false,verified:true,rating:4.5,reviews:18,sales:6,posted:'1 day ago',desc:'Great commuter SUV, very fuel efficient. New battery and tires last month. Some minor wear on the driver seat, otherwise excellent condition.'},
    {id:4,year:2020,make:'BMW',model:'M3',trim:'Competition',price:38900,mi:42,loc:'Manhattan',body:'Sedan',color:'Black',trans:'Manual',fuel:'Gasoline',cyl:'6 cyl',drive:'RWD',title:'Clean',dealer:false,verified:false,rating:4.9,reviews:9,sales:4,posted:'3 days ago',desc:'Enthusiast-owned, never tracked, adult-driven on weekends only. Carbon trim, upgraded exhaust, full service records. A true driver\u2019s car.'},
    {id:5,year:2020,make:'Audi',model:'Q5',trim:'Premium Plus',price:26900,mi:54,loc:'Brooklyn',body:'SUV',color:'Gray',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:true,verified:true,rating:4.7,reviews:88,sales:210,posted:'6 hours ago',desc:'Quattro all-wheel drive, virtual cockpit, Bang & Olufsen sound. Clean CarFax, one corporate owner. Trade-ins welcome.'},
    {id:6,year:2018,make:'Mercedes',model:'C-Class',trim:'C300 4MATIC',price:21500,mi:66,loc:'Queens',body:'Sedan',color:'White',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.4,reviews:22,sales:7,posted:'4 days ago',desc:'Luxury sedan in excellent shape. Burmester audio, ambient lighting, fresh oil change. Non-smoker, no pets. Ready to drive away.'},
    {id:7,year:2021,make:'Tesla',model:'Model 3',trim:'Long Range',price:31900,mi:31,loc:'Manhattan',body:'Sedan',color:'White',trans:'Automatic',fuel:'Electric',cyl:'Electric',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.9,reviews:14,sales:3,posted:'12 hours ago',desc:'Long Range dual motor, full self-driving capability included. Battery health 96%. Free supercharging never used. Software up to date.'},
    {id:8,year:2019,make:'Toyota',model:'RAV4',trim:'XLE',price:23400,mi:48,loc:'Staten Island',body:'SUV',color:'Red',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:true,verified:true,rating:4.8,reviews:64,sales:150,posted:'1 day ago',desc:'Reliable family SUV, Toyota Safety Sense, backup camera, blind-spot monitor. Inspected and detailed. 30-day return policy.'},
    {id:9,year:2017,make:'Honda',model:'Civic',trim:'EX',price:14900,mi:71,loc:'Brooklyn',body:'Sedan',color:'Gray',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'FWD',title:'Clean',dealer:false,verified:false,rating:4.3,reviews:11,sales:5,posted:'2 days ago',desc:'Dependable and economical. Sunroof, lane-keep assist, great on gas. Minor curb rash on one wheel. Priced to sell quickly.'},
    {id:10,year:2018,make:'Honda',model:'CR-V',trim:'EX-L',price:20100,mi:59,loc:'Queens',body:'SUV',color:'Silver',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.6,reviews:19,sales:8,posted:'3 days ago',desc:'Spacious and comfortable. Leather seats, power tailgate, well maintained with all records. No accidents, smoke-free.'},
    {id:11,year:2016,make:'Ford',model:'F-150',trim:'XLT SuperCrew',price:24800,mi:84,loc:'Bronx',body:'Truck',color:'Blue',trans:'Automatic',fuel:'Gasoline',cyl:'6 cyl',drive:'4WD',title:'Clean',dealer:true,verified:true,rating:4.5,reviews:42,sales:96,posted:'8 hours ago',desc:'Work-ready truck with tow package and bed liner. New tires, recent brakes. Strong runner, no leaks. Financing and warranty options.'},
    {id:12,year:2019,make:'Jeep',model:'Wrangler',trim:'Sport S',price:27600,mi:46,loc:'Staten Island',body:'SUV',color:'Green',trans:'Automatic',fuel:'Gasoline',cyl:'6 cyl',drive:'4WD',title:'Clean',dealer:false,verified:true,rating:4.7,reviews:16,sales:6,posted:'1 day ago',desc:'Adventure-ready, removable top and doors, upgraded all-terrain tires. Garaged, never off-roaded hard. Clean and rust-free.'},
    {id:13,year:2020,make:'Subaru',model:'Outback',trim:'Premium',price:25300,mi:39,loc:'Brooklyn',body:'Hatch',color:'Beige',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.8,reviews:21,sales:9,posted:'2 days ago',desc:'Symmetrical AWD, EyeSight driver assist, roof rails. Perfect for weekend trips. One owner, dealer-serviced, pristine interior.'},
    {id:14,year:2018,make:'Volkswagen',model:'Golf',trim:'GTI',price:18700,mi:63,loc:'Manhattan',body:'Hatch',color:'Red',trans:'Manual',fuel:'Gasoline',cyl:'4 cyl',drive:'FWD',title:'Clean',dealer:false,verified:false,rating:4.6,reviews:13,sales:4,posted:'4 days ago',desc:'Fun hot hatch, 6-speed manual, plaid seats. Recent timing service. Stock and unmodified. A blast to drive in the city.'},
    {id:15,year:2017,make:'Honda',model:'Odyssey',trim:'EX-L',price:19500,mi:77,loc:'Queens',body:'Van',color:'Gray',trans:'Automatic',fuel:'Gasoline',cyl:'6 cyl',drive:'FWD',title:'Clean',dealer:true,verified:true,rating:4.5,reviews:55,sales:130,posted:'1 day ago',desc:'Family minivan with rear entertainment, power doors, 8 seats. Inspected, detailed, and ready for road trips. Warranty available.'},
    {id:16,year:2019,make:'Audi',model:'A4',trim:'Premium quattro',price:23900,mi:51,loc:'Brooklyn',body:'Sedan',color:'Black',trans:'Automatic',fuel:'Gasoline',cyl:'4 cyl',drive:'AWD',title:'Clean',dealer:false,verified:true,rating:4.7,reviews:17,sales:7,posted:'3 days ago',desc:'Sporty and refined. Virtual cockpit, heated seats, sunroof. Meticulously maintained with full Audi service history.'}
  ];
  function carName(c){return c.year+' '+c.make+' '+c.model+' '+c.trim;}
  function carHL(c){
    var h=['No accidents','Clean title','Recent service'];
    if(c.fuel==='Electric')h=['96% battery health','Full self-driving','No accidents'];
    if(c.body==='Truck')h=['Tow package','New tires','Bed liner'];
    if(c.dealer)h.push('Dealer warranty');
    return h;
  }

  var carState={make:'',models:[],body:'',color:'',yearFrom:'',yearTo:'',priceMin:'',priceMax:'',mileage:'',verified:false,dealer:false,q:'',sort:'best'};

  function carMatches(c){
    if(carState.make && c.make!==carState.make)return false;
    if(carState.models.length && carState.models.indexOf(c.model)===-1)return false;
    if(carState.body && c.body!==carState.body)return false;
    if(carState.color && c.color!==carState.color)return false;
    if(carState.yearFrom && c.year<+carState.yearFrom)return false;
    if(carState.yearTo && c.year>+carState.yearTo)return false;
    if(carState.priceMin && c.price<+carState.priceMin)return false;
    if(carState.priceMax && c.price>+carState.priceMax)return false;
    if(carState.mileage && c.mi>+carState.mileage)return false;
    if(carState.verified && !c.verified)return false;
    if(carState.dealer && !c.dealer)return false;
    if(carState.q){var q=carState.q.toLowerCase();if((carName(c)+' '+c.loc+' '+c.body).toLowerCase().indexOf(q)===-1)return false;}
    return true;
  }
  function sortCars(list){
    var s=carState.sort;var a=list.slice();
    if(s==='plow')a.sort(function(x,y){return x.price-y.price;});
    else if(s==='phigh')a.sort(function(x,y){return y.price-x.price;});
    else if(s==='ynew')a.sort(function(x,y){return y.year-x.year;});
    else if(s==='mlow')a.sort(function(x,y){return x.mi-y.mi;});
    return a;
  }
  function carCard(c){
    var badge=c.dealer?'<span class="badge feat">Dealer</span>':(c.verified?'<span class="badge tr">Verified</span>':'');
    return '<div class="lcard" data-car="'+c.id+'">'+
      '<div class="ph">'+carSVG(c.color,c.body,{id:'c'+c.id})+
        '<span class="badge year">'+c.year+'</span>'+badge+
        '<span class="photon"><i class="ti ti-camera"></i> 1/8</span>'+favHtml('car',c.id)+
      '</div>'+
      '<div class="bd"><div class="nm">'+c.make+' '+c.model+' '+c.trim+'</div>'+
      '<div class="pr">'+money(c.price)+'</div>'+
      '<div class="mt"><span><i class="ti ti-calendar"></i>'+c.year+'</span><span><i class="ti ti-gauge"></i>'+c.mi+'k mi</span><span><i class="ti ti-map-pin"></i>'+c.loc+'</span></div>'+
      '<div class="rt"><i class="ti ti-star" style="color:#BA7517"></i> '+c.rating+' · '+c.sales+' sales · '+c.posted+'</div></div></div>';
  }
  function renderCars(){
    var list=sortCars(CARS.filter(carMatches));
    $('#carCount').textContent=list.length;
    var grid=$('#carGrid');
    grid.innerHTML=list.length?list.map(carCard).join(''):'<div class="empty">No matching listings. Try removing a filter.</div>';
    $('#carMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length+' · <a data-toast="That\u2019s all in the demo">Load more</a>'):'';
    $$('#carGrid [data-car]').forEach(function(el){el.addEventListener('click',function(){openCar(+el.getAttribute('data-car'));});});
    wireFav(grid);wireNav(grid);
    renderCarChips();
  }
  function renderCarChips(){
    var bar=$('#carsChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(label,clear){var s=document.createElement('span');s.className='achip';s.innerHTML=label+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clear);bar.appendChild(s);}
    if(carState.q)chip('“'+carState.q+'”',function(){carState.q='';$('#carsSearch').value='';renderCars();});
    if(carState.make)chip(carState.make,function(){setMake('');});
    carState.models.forEach(function(m){chip(m,function(){toggleModel(m,false);});});
    if(carState.body)chip(carState.body,function(){setBody('');});
    if(carState.color)chip(carState.color,function(){setColor('');});
    if(carState.yearFrom||carState.yearTo)chip('Year '+(carState.yearFrom||'…')+'–'+(carState.yearTo||'…'),function(){carState.yearFrom='';carState.yearTo='';$('#yearFrom').value='';$('#yearTo').value='';renderCars();});
    if(carState.priceMin||carState.priceMax)chip('$'+(carState.priceMin||'0')+'–'+(carState.priceMax||'∞'),function(){carState.priceMin='';carState.priceMax='';$('#priceMin').value='';$('#priceMax').value='';renderCars();});
    if(carState.mileage)chip('< '+carState.mileage+'k mi',function(){carState.mileage='';$('#mileageSel').value='';renderCars();});
    if(carState.verified)chip('Verified only',function(){carState.verified=false;$('#verifiedOnly').checked=false;renderCars();});
    if(carState.dealer)chip('Dealers only',function(){carState.dealer=false;$('#dealerOnly').checked=false;renderCars();});
    var right=document.createElement('span');right.className='right';right.textContent=$('#carCount').textContent+' results · auto-applied';bar.appendChild(right);
    if(!bar.querySelector('.achip'))bar.querySelector('.k').textContent='No active filters';
  }
  function setMake(v){
    carState.make=v;carState.models=[];$('#makeSel').value=v;
    var opts=$('#modelOpts');opts.innerHTML='';
    if(v&&MODELS[v]){MODELS[v].forEach(function(m){
      var lab=document.createElement('label');lab.className='check';lab.innerHTML='<input type="checkbox" value="'+m+'"> '+m;
      lab.querySelector('input').addEventListener('change',function(){toggleModel(m,this.checked);});opts.appendChild(lab);
    });}else{opts.innerHTML='<div style="font-size:12px;color:var(--muted2)">Select a make first.</div>';}
    updateModelSummary();renderCars();
  }
  function toggleModel(m,on){
    var i=carState.models.indexOf(m);
    if(on&&i===-1)carState.models.push(m);if(!on&&i>-1)carState.models.splice(i,1);
    $$('#modelOpts input').forEach(function(cb){if(cb.value===m)cb.checked=on;});
    updateModelSummary();renderCars();
  }
  function updateModelSummary(){$('#modelSummary').textContent=carState.models.length?carState.models.join(', '):(carState.make?'Any '+carState.make+' model':'Any model');}
  function setBody(v){carState.body=(carState.body===v?'':v);$$('#bodyChips .chip').forEach(function(ch){ch.classList.toggle('on',ch.getAttribute('data-body')===carState.body);});renderCars();}
  function setColor(v){carState.color=(carState.color===v?'':v);$$('#colorSwatches .swatch').forEach(function(sw){sw.classList.toggle('on',sw.getAttribute('data-color')===carState.color);});renderCars();}

  function buildCarControls(){
    var ms=$('#makeSel');ms.innerHTML='<option value="">Any make</option>'+Object.keys(MODELS).map(function(m){return '<option value="'+m+'">'+m+'</option>';}).join('');
    ms.addEventListener('change',function(){setMake(this.value);});
    var bodies=['SUV','Sedan','Coupe','Truck','Hatch','Van'];
    $('#bodyChips').innerHTML=bodies.map(function(b){return '<div class="chip" data-body="'+b+'">'+b+'</div>';}).join('');
    $$('#bodyChips .chip').forEach(function(ch){ch.addEventListener('click',function(){setBody(ch.getAttribute('data-body'));});});
    var cols=['White','Black','Silver','Blue','Red','Gray','Green','Beige'];
    var styleMap={White:'#fff',Black:'#222',Silver:'#c7c7cc',Blue:'#2f6fd0',Red:'#a4322c',Gray:'#6b6b70',Green:'#3c7a2f',Beige:'#d8c9a8'};
    $('#colorSwatches').innerHTML=cols.map(function(c){return '<div class="swatch" data-color="'+c+'" title="'+c+'" style="background:'+styleMap[c]+'"></div>';}).join('');
    $$('#colorSwatches .swatch').forEach(function(sw){sw.addEventListener('click',function(){setColor(sw.getAttribute('data-color'));});});
    ['yearFrom','yearTo','priceMin','priceMax'].forEach(function(id){$('#'+id).addEventListener('input',function(){carState[id]=this.value;renderCars();});});
    $('#mileageSel').addEventListener('change',function(){carState.mileage=this.value;renderCars();});
    $('#verifiedOnly').addEventListener('change',function(){carState.verified=this.checked;renderCars();});
    $('#dealerOnly').addEventListener('change',function(){carState.dealer=this.checked;renderCars();});
    $('#carSort').addEventListener('change',function(){carState.sort=this.value;renderCars();});
    $('#carsSearchBtn').addEventListener('click',function(){carState.q=$('#carsSearch').value.trim();renderCars();});
    $('#carsSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){carState.q=this.value.trim();renderCars();}});
  }

  /* ---------- car detail ---------- */
  function galleryImgs(c){
    return [
      {lab:'Exterior',svg:carSVG(c.color,c.body,{id:'g1'+c.id})},
      {lab:'Side',svg:carSVG(c.color,c.body,{id:'g2'+c.id,flip:true})},
      {lab:'Wheels',svg:wheelSVG()},
      {lab:'Interior',svg:dashSVG(c.color)},
      {lab:'Three-quarter',svg:carSVG(c.color,c.body,{id:'g3'+c.id,bg:'#e7ded0'})}
    ];
  }
  function openCar(id){
    var c=CARS.filter(function(x){return x.id===id;})[0];if(!c)return;
    $('#dTitleCrumb').textContent=c.make+' '+c.model;
    $('#dTtl').textContent=carName(c);
    $('#dSub').textContent=c.body+' · '+c.trans+' · '+c.fuel+' · '+c.loc;
    $('#dPrice').textContent=money(c.price);
    var imgs=galleryImgs(c);
    $('#dMain').innerHTML=imgs[0].svg+'<span class="lab">'+imgs[0].lab+'</span>';
    $('#dThumbs').innerHTML=imgs.map(function(im,i){return '<div class="thumb'+(i===0?' on':'')+'" data-th="'+i+'">'+im.svg+'</div>';}).join('');
    $$('#dThumbs .thumb').forEach(function(t){t.addEventListener('click',function(){
      $$('#dThumbs .thumb').forEach(function(x){x.classList.remove('on');});t.classList.add('on');
      var im=imgs[+t.getAttribute('data-th')];$('#dMain').innerHTML=im.svg+'<span class="lab">'+im.lab+'</span>';
    });});
    $('#dSellerAv').textContent=c.dealer?'DL':c.make.substr(0,2).toUpperCase();
    $('#dSellerName').textContent=c.dealer?(c.make+' Certified Motors'):'Private seller';
    $('#dSellerVer').style.display=c.verified?'inline-flex':'none';
    $('#dSellerMeta').innerHTML='<i class="ti ti-star" style="color:#BA7517"></i> '+c.rating+' · '+c.reviews+' reviews · '+c.sales+' sales · '+(c.dealer?'Dealer':'Member since 2021');
    $('#dDesc').textContent=c.desc;
    var cells=[['Year',c.year],['Make',c.make],['Model',c.model],['Trim',c.trim],['Mileage',c.mi+'k mi'],['Transmission',c.trans],['Fuel',c.fuel],['Cylinders',c.cyl],['Drivetrain',c.drive],['Body',c.body],['Color',c.color],['Title',c.title]];
    $('#dVgrid').innerHTML=cells.map(function(p){return '<div class="vcell"><div class="l">'+p[0]+'</div><div class="v">'+p[1]+'</div></div>';}).join('');
    $('#dHl').innerHTML=carHL(c).map(function(h){return '<span class="c"><i class="ti ti-check"></i> '+h+'</span>';}).join('');
    $('#dVin').textContent='VIN '+(c.make.substr(0,1)+c.model.replace(/\s/g,'').substr(0,2)).toUpperCase()+c.id+'***'+(1000+c.id);
    // similar
    var sim=CARS.filter(function(x){return x.id!==c.id&&(x.body===c.body||x.make===c.make);}).slice(0,3);
    $('#dSimilar').innerHTML=sim.map(carCard).join('');
    $$('#dSimilar [data-car]').forEach(function(el){el.addEventListener('click',function(){openCar(+el.getAttribute('data-car'));});});
    wireFav($('#dSimilar'));
    showView('listing');
  }
  $$('[data-contact]').forEach(function(b){b.addEventListener('click',function(){toast('Message sent to seller (demo)');});});
  $('#dSave').addEventListener('click',function(){toast('Listing saved (demo)');});

  /* =================== DATA: HOUSING =================== */
  var HOODS=['Williamsburg','Park Slope','Bushwick','Bay Ridge','Astoria','Long Island City','Harlem','Bed-Stuy','Crown Heights','Sunnyside'];
  var FAC=['#cdb89a','#b6483c','#c8855b','#7d97a6','#9a8f7a','#c2a25e'];
  var HOUSES=[
    {id:1,bed:1,bath:1,sqft:680,price:2300,loc:'Williamsburg',furn:true,fee:false,verified:true,rating:4.8,reviews:24,amen:['In-unit laundry','Dishwasher'],type:'rent',desc:'Bright top-floor one-bedroom with exposed brick and oversized windows. Steps from the L train, cafes, and the waterfront. Heat and hot water included.'},
    {id:2,bed:1,bath:1,sqft:720,price:2450,loc:'Park Slope',furn:false,fee:true,verified:true,rating:4.6,reviews:31,amen:['Air conditioning'],type:'rent',desc:'Newly renovated apartment in a classic brownstone. Quartz counters, stainless appliances, and a quiet tree-lined block near Prospect Park.'},
    {id:3,bed:2,bath:1,sqft:850,price:2150,loc:'Bushwick',furn:true,fee:false,verified:false,rating:4.4,reviews:12,amen:['Pets allowed','In-unit laundry'],type:'rent',desc:'Spacious loft-style two-bedroom with high ceilings and a private balcony. Great natural light, flexible move-in, pet friendly.'},
    {id:4,bed:1,bath:1,sqft:600,price:1950,loc:'Bay Ridge',furn:false,fee:false,verified:true,rating:4.5,reviews:18,amen:['Air conditioning','Dishwasher'],type:'rent',desc:'Cozy and well-kept unit close to the R train and the waterfront promenade. Quiet building with a responsive live-in super.'},
    {id:5,bed:0,bath:1,sqft:420,price:1750,loc:'Astoria',furn:true,fee:false,verified:true,rating:4.7,reviews:22,amen:['Air conditioning'],type:'rent',desc:'Efficient furnished studio perfect for a single professional. Walk to the N/W and to Astoria\u2019s famous food scene. All utilities included.'},
    {id:6,bed:2,bath:2,sqft:980,price:3200,loc:'Long Island City',furn:false,fee:true,verified:true,rating:4.8,reviews:40,amen:['In-unit laundry','Dishwasher','Air conditioning'],type:'rent',desc:'Modern high-rise two-bedroom with skyline views, gym, and roof deck. Floor-to-ceiling windows and an open chef\u2019s kitchen.'},
    {id:7,bed:1,bath:1,sqft:650,price:2050,loc:'Harlem',furn:false,fee:false,verified:false,rating:4.3,reviews:9,amen:['Pets allowed'],type:'rent',desc:'Charming pre-war one-bedroom with original details and a decorative fireplace. Near the A/B/C/D and Marcus Garvey Park.'},
    {id:8,bed:3,bath:2,sqft:1150,price:3600,loc:'Bed-Stuy',furn:false,fee:false,verified:true,rating:4.6,reviews:27,amen:['In-unit laundry','Dishwasher','Pets allowed'],type:'rent',desc:'Full-floor three-bedroom in a renovated townhouse. Private outdoor space, central air, and a finished basement for storage.'},
    {id:9,bed:2,bath:1,sqft:800,price:2400,loc:'Crown Heights',furn:true,fee:false,verified:true,rating:4.5,reviews:15,amen:['Air conditioning'],type:'rent',desc:'Sunny furnished two-bedroom near the Brooklyn Museum and Botanic Garden. Move-in ready with flexible lease terms.'},
    {id:10,bed:1,bath:1,sqft:560,price:1850,loc:'Sunnyside',furn:false,fee:false,verified:true,rating:4.4,reviews:11,amen:['Dishwasher'],type:'rent',desc:'Quiet garden-block one-bedroom one stop from Manhattan on the 7 train. Hardwood floors, plenty of closets, no broker fee.'}
  ];
  var houseState={hood:'',beds:[],rentMax:'',furn:'',amen:[],noFee:false,mode:'rent',sort:'best'};
  function houseMatches(h){
    if(houseState.hood&&h.loc!==houseState.hood)return false;
    if(houseState.beds.length){var b=h.bed===0?'Studio':(h.bed>=4?'4+':String(h.bed));if(houseState.beds.indexOf(b)===-1)return false;}
    if(houseState.rentMax&&h.price>+houseState.rentMax)return false;
    if(houseState.furn==='Furnished'&&!h.furn)return false;
    if(houseState.furn==='Unfurnished'&&h.furn)return false;
    if(houseState.noFee&&h.fee)return false;
    if(houseState.amen.length){for(var i=0;i<houseState.amen.length;i++){if(h.amen.indexOf(houseState.amen[i])===-1)return false;}}
    return true;
  }
  function bedLabel(h){return h.bed===0?'Studio':(h.bed+'BR');}
  function houseCard(h){
    var i=h.id%FAC.length;
    var badge=h.fee?'':'<span class="badge tr">No fee</span>';
    return '<div class="lcard" data-house="'+h.id+'">'+
      '<div class="ph">'+homeSVG({fac:FAC[i],id:'h'+h.id})+
        '<span class="badge year">'+bedLabel(h)+'</span>'+badge+
        '<span class="photon"><i class="ti ti-camera"></i> 1/6</span>'+favHtml('house',h.id)+
      '</div>'+
      '<div class="bd"><div class="nm">'+bedLabel(h)+' · '+h.loc+'</div>'+
      '<div class="pr">'+money(h.price)+'<span style="font-size:11px;color:var(--muted);font-weight:500">/mo</span></div>'+
      '<div class="mt"><span><i class="ti ti-bed"></i>'+(h.bed===0?'Studio':h.bed+' bd')+'</span><span><i class="ti ti-bath"></i>'+h.bath+' ba</span><span><i class="ti ti-ruler-2"></i>'+h.sqft+' ft²</span></div>'+
      '<div class="rt"><i class="ti ti-star" style="color:#BA7517"></i> '+h.rating+' · '+h.reviews+' reviews'+(h.verified?' · <i class="ti ti-rosette-discount-check-filled" style="color:var(--green)"></i> Verified':'')+'</div></div></div>';
  }
  function renderHouses(){
    var list=HOUSES.filter(houseMatches);
    if(houseState.sort==='plow')list.sort(function(a,b){return a.price-b.price;});
    else if(houseState.sort==='phigh')list.sort(function(a,b){return b.price-a.price;});
    else if(houseState.sort==='sqft')list.sort(function(a,b){return b.sqft-a.sqft;});
    $('#houseCount').textContent=list.length;
    var grid=$('#houseGrid');
    grid.innerHTML=list.length?list.map(houseCard).join(''):'<div class="empty">No apartments match these filters.</div>';
    $('#houseMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length):'';
    $$('#houseGrid [data-house]').forEach(function(el){el.addEventListener('click',function(){openHouse(+el.getAttribute('data-house'));});});
    wireFav(grid);
    renderHouseChips();
  }
  function renderHouseChips(){
    var bar=$('#houseChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l,clr){var s=document.createElement('span');s.className='achip';s.innerHTML=l+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clr);bar.appendChild(s);}
    chip($('#houseMode .seg.on').textContent,function(){toast('Switch mode from the top-right toggle');});
    if(houseState.hood)chip(houseState.hood,function(){houseState.hood='';$('#hoodSel').value='';renderHouses();});
    houseState.beds.forEach(function(b){chip(b+(b==='Studio'?'':' BR'),function(){setBed(b,false);});});
    if(houseState.rentMax)chip('Under $'+houseState.rentMax,function(){houseState.rentMax='';$('#rentMax').value='';renderHouses();});
    if(houseState.furn)chip(houseState.furn,function(){houseState.furn='';$$('#furnChips .chip').forEach(function(c){c.classList.remove('on');});renderHouses();});
    houseState.amen.forEach(function(a){chip(a,function(){var cb=$$('#view-housing input[data-amen]').filter(function(x){return x.getAttribute('data-amen')===a;})[0];if(cb)cb.checked=false;houseState.amen=houseState.amen.filter(function(x){return x!==a;});renderHouses();});});
    if(houseState.noFee)chip('No fee',function(){houseState.noFee=false;$('#noFee').checked=false;renderHouses();});
    var right=document.createElement('span');right.className='right';right.textContent=$('#houseCount').textContent+' results · auto-applied · saved';bar.appendChild(right);
  }
  function setBed(b,on){var i=houseState.beds.indexOf(b);if(on&&i===-1)houseState.beds.push(b);if(!on&&i>-1)houseState.beds.splice(i,1);$$('#bedChips .chip').forEach(function(ch){if(ch.getAttribute('data-bed')===b)ch.classList.toggle('on',on);});renderHouses();}
  function openHouse(id){
    var h=HOUSES.filter(function(x){return x.id===id;})[0];if(!h)return;
    var imgs=[{lab:'Living room',svg:roomSVG({wall:'#e7e0d4'})},{lab:'Building',svg:homeSVG({fac:FAC[h.id%FAC.length],id:'hm'+h.id})},{lab:'Bedroom',svg:roomSVG({wall:'#dde4ea'})}];
    var body='<div class="gallery-main" style="height:240px">'+imgs[0].svg+'<span class="lab">'+imgs[0].lab+'</span></div>'+
      '<div class="thumbs" id="hThumbs">'+imgs.map(function(im,i){return '<div class="thumb'+(i===0?' on':'')+'" data-hth="'+i+'">'+im.svg+'</div>';}).join('')+'</div>'+
      '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:14px"><div style="font-size:22px;font-weight:700;color:var(--green-d)">'+money(h.price)+'<span style="font-size:12px;color:var(--muted);font-weight:500">/mo</span></div>'+(h.fee?'':'<span class="achip" style="background:var(--green);color:#fff;border:none">No broker fee</span>')+'</div>'+
      '<div style="color:var(--muted);font-size:13px;margin:4px 0 12px">'+(h.bed===0?'Studio':h.bed+' bed')+' · '+h.bath+' bath · '+h.sqft+' ft² · '+h.loc+', NY</div>'+
      '<div class="hl">'+h.amen.map(function(a){return '<span class="c"><i class="ti ti-check"></i> '+a+'</span>';}).join('')+(h.furn?'<span class="c"><i class="ti ti-check"></i> Furnished</span>':'')+'</div>'+
      '<div class="desc" style="margin-top:12px">'+h.desc+'</div>'+
      '<div class="sellercard"><div class="av">LL</div><div style="flex:1"><div style="font-weight:600">Verified landlord</div><div style="font-size:12px;color:var(--muted)"><i class="ti ti-star" style="color:#BA7517"></i> '+h.rating+' · '+h.reviews+' reviews · responds in ~3h</div></div></div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="Tour request sent (demo)"><i class="ti ti-calendar"></i> Request a tour</button>';
    openModal(bedLabel(h)+' in '+h.loc, body);
    $$('#hThumbs .thumb').forEach(function(t){t.addEventListener('click',function(){$$('#hThumbs .thumb').forEach(function(x){x.classList.remove('on');});t.classList.add('on');var im=imgs[+t.getAttribute('data-hth')];$('#modal .gallery-main').innerHTML=im.svg+'<span class="lab">'+im.lab+'</span>';});});
  }
  function buildHouseControls(){
    $('#hoodSel').innerHTML='<option value="">Any neighborhood</option>'+HOODS.map(function(h){return '<option>'+h+'</option>';}).join('');
    $('#hoodSel').addEventListener('change',function(){houseState.hood=this.value;renderHouses();});
    var beds=['Studio','1','2','3','4+'];
    $('#bedChips').innerHTML=beds.map(function(b){return '<div class="chip" data-bed="'+b+'">'+b+'</div>';}).join('');
    $$('#bedChips .chip').forEach(function(ch){ch.addEventListener('click',function(){var b=ch.getAttribute('data-bed');setBed(b,!ch.classList.contains('on'));});});
    $('#rentMax').addEventListener('input',function(){houseState.rentMax=this.value;renderHouses();});
    $$('#furnChips .chip').forEach(function(ch){ch.addEventListener('click',function(){var was=ch.classList.contains('on');$$('#furnChips .chip').forEach(function(c){c.classList.remove('on');});if(!was){ch.classList.add('on');houseState.furn=ch.getAttribute('data-furn');}else{houseState.furn='';}renderHouses();});});
    $$('#view-housing input[data-amen]').forEach(function(cb){cb.addEventListener('change',function(){var a=cb.getAttribute('data-amen');if(cb.checked)houseState.amen.push(a);else houseState.amen=houseState.amen.filter(function(x){return x!==a;});renderHouses();});});
    $('#noFee').addEventListener('change',function(){houseState.noFee=this.checked;renderHouses();});
    $('#houseSort').addEventListener('change',function(){houseState.sort=this.value;renderHouses();});
    $('#houseSearchBtn').addEventListener('click',function(){var v=$('#houseSearch').value.trim();var m=HOODS.filter(function(h){return h.toLowerCase().indexOf(v.toLowerCase())>-1;})[0];if(v&&m){houseState.hood=m;$('#hoodSel').value=m;}renderHouses();});
    $$('#houseMode .seg').forEach(function(seg){seg.addEventListener('click',function(){$$('#houseMode .seg').forEach(function(s){s.classList.remove('on');});seg.classList.add('on');houseState.mode=seg.getAttribute('data-mode');renderHouseChips();toast('Mode: '+seg.textContent+' (demo data is rentals)');});});
  }

  /* =================== DATA: COMPUTERS =================== */
  var COMPS=[
    {id:1,brand:'Apple',name:'MacBook Air 13"',year:2017,price:280,cpu:'Intel i5',ram:8,ssd:'256GB SSD',screen:'13"',loc:'Brooklyn',cond:'Good',rating:4.8,reviews:12,best:true,desc:'Lightweight and reliable everyday laptop. Battery recently replaced, holds a full day. Includes original charger. Minor scuffs on the lid.'},
    {id:2,brand:'Apple',name:'MacBook Pro 13"',year:2015,price:295,cpu:'Intel i5',ram:8,ssd:'128GB SSD',screen:'13"',loc:'Manhattan',cond:'Like new',rating:4.6,reviews:8,best:false,desc:'Retina display, excellent condition, barely used. Great for students. Comes with a sleeve and charger. Fresh macOS install.'},
    {id:3,brand:'Apple',name:'MacBook Air 11"',year:2015,price:220,cpu:'Intel i5',ram:4,ssd:'128GB SSD',screen:'11"',loc:'Queens',cond:'Good',rating:4.3,reviews:6,best:false,desc:'Ultra-portable, perfect for travel and notes. Some wear on the corners. Works perfectly, no issues. Charger included.'},
    {id:4,brand:'Apple',name:'MacBook Pro 13"',year:2014,price:260,cpu:'Intel i5',ram:8,ssd:'256GB SSD',screen:'13"',loc:'Bronx',cond:'Good',rating:4.4,reviews:9,best:false,desc:'Solid workhorse with plenty of storage. Healthy battery, clean keyboard. Ideal for browsing, writing, and light editing.'},
    {id:5,brand:'Dell',name:'XPS 13',year:2019,price:340,cpu:'Intel i7',ram:16,ssd:'512GB SSD',screen:'13"',loc:'Brooklyn',cond:'Like new',rating:4.7,reviews:14,best:false,desc:'Premium ultrabook with InfinityEdge display. Fast i7, 16GB RAM. Cared for, no dents. Windows 11 ready.'},
    {id:6,brand:'Lenovo',name:'ThinkPad X1 Carbon',year:2018,price:310,cpu:'Intel i7',ram:16,ssd:'512GB SSD',screen:'14"',loc:'Manhattan',cond:'Good',rating:4.6,reviews:11,best:false,desc:'Business-class durability with a great keyboard. Light and tough. Battery solid. Perfect for work and coding.'},
    {id:7,brand:'HP',name:'Spectre x360',year:2019,price:330,cpu:'Intel i7',ram:8,ssd:'256GB SSD',screen:'13"',loc:'Queens',cond:'Like new',rating:4.5,reviews:7,best:false,desc:'Convertible 2-in-1 with touchscreen and stylus. Gorgeous build. Flips into tablet mode. Minimal use, like new.'},
    {id:8,brand:'ASUS',name:'ZenBook 14',year:2020,price:300,cpu:'AMD Ryzen 5',ram:8,ssd:'256GB SSD',screen:'14"',loc:'Bronx',cond:'Good',rating:4.4,reviews:5,best:false,desc:'Slim and stylish with long battery life. Backlit keyboard, fingerprint reader. Great value for everyday productivity.'}
  ];
  var compState={brand:'',max:'',ram:[],cond:[],q:''};
  function compMatches(c){
    if(compState.brand&&c.brand!==compState.brand)return false;
    if(compState.max&&c.price>+compState.max)return false;
    if(compState.ram.length){var ok=compState.ram.some(function(r){return c.ram>=+r;});if(!ok)return false;}
    if(compState.cond.length&&compState.cond.indexOf(c.cond)===-1)return false;
    if(compState.q){var q=compState.q.toLowerCase().replace(/under.*$/,'').trim();if(q&&(c.brand+' '+c.name).toLowerCase().indexOf(q)===-1&&q!=='macbook')return false;}
    return true;
  }
  var compareSet=[];
  function compCard(c){
    var on=compareSet.indexOf(c.id)>-1;
    return '<div class="lcard'+(on?' cmp':'')+'" data-comp="'+c.id+'">'+
      '<div class="ph">'+laptopSVG({id:'k'+c.id,scr:c.brand==='Apple'?'#1d2330':'#10204a'})+
        '<label class="cmpbox"><input type="checkbox" '+(on?'checked':'')+' data-cmp="'+c.id+'"> Compare</label>'+
        (c.best?'<span class="badge tr" style="background:#3B6D11">Best value</span>':'')+
        '<span class="photon"><i class="ti ti-camera"></i> 1/5</span>'+favHtml('comp',c.id)+
      '</div>'+
      '<div class="bd"><div class="nm">'+c.name+' · '+c.year+'</div>'+
      '<div class="pr">'+money(c.price)+'</div>'+
      '<div style="margin:2px 0 5px"><span class="spec">'+c.cpu+'</span><span class="spec">'+c.ram+'GB</span><span class="spec">'+c.ssd+'</span></div>'+
      '<div class="mt"><span><i class="ti ti-map-pin"></i>'+c.loc+'</span><span>'+c.cond+'</span></div>'+
      '<div class="rt"><i class="ti ti-star" style="color:#BA7517"></i> '+c.rating+' · '+c.reviews+' reviews</div></div></div>';
  }
  function renderComps(){
    var list=COMPS.filter(compMatches);
    $('#compCount').textContent=list.length;
    var grid=$('#compGrid');
    grid.innerHTML=list.length?list.map(compCard).join(''):'<div class="empty">No laptops match these filters.</div>';
    $('#compMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length+' · <a data-toast="That\u2019s all in the demo">Load more</a>'):'';
    $$('#compGrid [data-comp]').forEach(function(el){el.addEventListener('click',function(){openComp(+el.getAttribute('data-comp'));});});
    $$('#compGrid input[data-cmp]').forEach(function(cb){
      cb.addEventListener('click',function(e){e.stopPropagation();});
      cb.addEventListener('change',function(){
        var id=+cb.getAttribute('data-cmp');
        if(cb.checked){if(compareSet.length>=3){cb.checked=false;toast('Compare up to 3 items');return;}compareSet.push(id);}
        else compareSet=compareSet.filter(function(x){return x!==id;});
        $('#compareCount').textContent=compareSet.length;$('#compareBtn').disabled=compareSet.length<2;renderComps();
      });
    });
    wireFav(grid);wireNav(grid);
    renderCompChips();
  }
  function renderCompChips(){
    var bar=$('#compChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l){var s=document.createElement('span');s.className='achip';s.innerHTML=l;bar.appendChild(s);}
    chip('Apple');chip('MacBook');chip('Under $300');chip('No accessories');
    if(compState.brand&&compState.brand!=='Apple')chip(compState.brand);
    if(compState.max)chip('Under $'+compState.max);
    compState.ram.forEach(function(r){chip(r+'GB+');});
    compState.cond.forEach(function(c){chip(c);});
    var right=document.createElement('span');right.className='right';right.textContent=$('#compCount').textContent+' results · auto-applied';bar.appendChild(right);
  }
  function openComp(id){
    var c=COMPS.filter(function(x){return x.id===id;})[0];if(!c)return;
    var body='<div class="gallery-main" style="height:230px">'+laptopSVG({id:'mm'+c.id,scr:c.brand==='Apple'?'#1d2330':'#10204a'})+'<span class="lab">'+c.name+'</span></div>'+
      '<div style="font-size:22px;font-weight:700;color:var(--green-d);margin-top:12px">'+money(c.price)+'</div>'+
      '<div style="color:var(--muted);font-size:13px;margin:2px 0 12px">'+c.brand+' · '+c.year+' · '+c.cond+' · '+c.loc+'</div>'+
      '<div class="vgrid" style="grid-template-columns:repeat(3,1fr)">'+
        [['Processor',c.cpu],['Memory',c.ram+'GB'],['Storage',c.ssd],['Screen',c.screen],['Condition',c.cond],['Year',c.year]].map(function(p){return '<div class="vcell"><div class="l">'+p[0]+'</div><div class="v">'+p[1]+'</div></div>';}).join('')+
      '</div>'+
      '<div class="desc" style="margin-top:12px">'+c.desc+'</div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="Message sent to seller (demo)"><i class="ti ti-message"></i> Contact Seller</button>';
    openModal(c.name+' · '+c.year, body);
  }
  $('#compareBtn').addEventListener('click',function(){
    if(compareSet.length<2)return;
    var picked=COMPS.filter(function(c){return compareSet.indexOf(c.id)>-1;});
    var cols='repeat('+picked.length+',1fr)';
    var col=function(c){return '<div class="cmp-col"><div class="nm">'+c.name+' · '+c.year+'</div><div class="pr">'+money(c.price)+'</div>'+
      [['Brand',c.brand],['Processor',c.cpu],['Memory',c.ram+'GB'],['Storage',c.ssd],['Screen',c.screen],['Condition',c.cond],['Location',c.loc],['Rating','★ '+c.rating]].map(function(p){return '<div class="row"><span>'+p[0]+'</span><b>'+p[1]+'</b></div>';}).join('')+'</div>';};
    openModal('Compare ('+picked.length+')','<div class="cmp-cols" style="grid-template-columns:'+cols+'">'+picked.map(col).join('')+'</div>');
  });
  function buildCompControls(){
    $('#brandSel').innerHTML='<option value="">All brands</option>'+['Apple','Dell','Lenovo','HP','ASUS'].map(function(b){return '<option>'+b+'</option>';}).join('');
    $('#brandSel').value='';
    $('#brandSel').addEventListener('change',function(){compState.brand=this.value;renderComps();});
    $('#compMax').addEventListener('input',function(){compState.max=this.value;renderComps();});
    $$('#ramChips .chip').forEach(function(ch){ch.addEventListener('click',function(){var r=ch.getAttribute('data-ram');ch.classList.toggle('on');if(ch.classList.contains('on'))compState.ram.push(r);else compState.ram=compState.ram.filter(function(x){return x!==r;});renderComps();});});
    $$('#condChips .chip').forEach(function(ch){ch.addEventListener('click',function(){var c=ch.getAttribute('data-cond');ch.classList.toggle('on');if(ch.classList.contains('on'))compState.cond.push(c);else compState.cond=compState.cond.filter(function(x){return x!==c;});renderComps();});});
    $('#compSearchBtn').addEventListener('click',function(){compState.q=$('#compSearch').value.trim();renderComps();});
    $('#compSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){compState.q=this.value.trim();renderComps();}});
    $$('#compTabs .tab').forEach(function(tab){tab.addEventListener('click',function(){$$('#compTabs .tab').forEach(function(t){t.classList.remove('on');});tab.classList.add('on');var name=tab.getAttribute('data-tab');$('#compTabName').textContent=name;var lap=name==='Laptops';$('#compGrid').style.display=lap?'grid':'none';$('#compEmpty').style.display=lap?'none':'block';$('#compMore').style.display=lap?'block':'none';});});
  }

  /* =================== HOME trending =================== */
  function buildHomeTrending(){
    var items=[CARS[6],CARS[0],HOUSES[0],COMPS[0],HOUSES[5],CARS[11]];
    var html='';
    html+=trendCard('car',CARS[6]);html+=trendCard('house',HOUSES[0]);html+=trendCard('comp',COMPS[0]);
    var grid=$('#homeTrending');grid.innerHTML=html;
    $$('#homeTrending [data-go]').forEach(function(el){el.addEventListener('click',function(){
      var g=el.getAttribute('data-go');
      if(g==='car')openCar(+el.getAttribute('data-id'));
      else if(g==='house'){showView('housing');setTimeout(function(){openHouse(+el.getAttribute('data-id'));},120);}
      else {showView('computers');setTimeout(function(){openComp(+el.getAttribute('data-id'));},120);}
    });});
  }
  function trendCard(type,o){
    if(type==='car')return '<div class="lcard" data-go="car" data-id="'+o.id+'"><div class="ph">'+carSVG(o.color,o.body,{id:'t'+o.id})+'<span class="badge year">'+o.year+'</span><span class="badge tr">Verified</span></div><div class="bd"><div class="nm">'+o.make+' '+o.model+'</div><div class="pr">'+money(o.price)+'</div><div class="rt"><i class="ti ti-map-pin"></i> '+o.loc+'</div></div></div>';
    if(type==='house')return '<div class="lcard" data-go="house" data-id="'+o.id+'"><div class="ph">'+homeSVG({fac:FAC[o.id%FAC.length],id:'th'+o.id})+'<span class="badge year">'+(o.bed===0?'Studio':o.bed+'BR')+'</span></div><div class="bd"><div class="nm">'+o.loc+'</div><div class="pr">'+money(o.price)+'/mo</div><div class="rt"><i class="ti ti-star" style="color:#BA7517"></i> '+o.rating+'</div></div></div>';
    return '<div class="lcard" data-go="comp" data-id="'+o.id+'"><div class="ph">'+laptopSVG({id:'tk'+o.id})+'<span class="badge tr" style="background:#3B6D11">Best value</span></div><div class="bd"><div class="nm">'+o.name+'</div><div class="pr">'+money(o.price)+'</div><div class="rt">'+o.cond+'</div></div></div>';
  }

  /* ---------- home search routing ---------- */
  function route(q){
    var s=(q||'').toLowerCase();
    if(/macbook|laptop|computer|electronic|dell|lenovo|thinkpad/.test(s)){showView('computers');}
    else if(/bmw|suv|car|truck|sedan|vehicle|audi|mercedes|tesla|honda|toyota|jeep|ford|subaru/.test(s)){showView('cars');}
    else if(/apartment|brooklyn|housing|studio|rent|bedroom|williamsburg|astoria|harlem|queens/.test(s)){showView('housing');}
    else if(/job|hiring|gig|developer|barista|nurse|cook|tutor/.test(s)){showView('jobs');}
    else if(/cleaning|mover|moving|repair|handyman|service|tutoring|photographer/.test(s)){showView('services');}
    else if(/event|class|group|volunteer|meetup|community/.test(s)){showView('community');}
    else if(/sofa|furniture|desk|tv|phone|bike|guitar|fridge|sale|free/.test(s)){showView('forsale');}
    else if(/forum|discuss|thread|question/.test(s)){showView('forums');}
    else toast('Try: MacBook · BMW SUV · sofa · barista job · cleaning · running club');
  }
  $('#homeSearchBtn').addEventListener('click',function(){route($('#homeSearch').value);});
  $('#homeSearch').addEventListener('keydown',function(e){if(e.key==='Enter')route(this.value);});
  $$('[data-search]').forEach(function(a){a.addEventListener('click',function(){route(a.getAttribute('data-search'));});});

  /* =================== EXTRA ART =================== */
  function svgWrap(vb,bg,inner){return '<svg viewBox="0 0 '+vb+'" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><rect width="'+vb.split(' ')[0]+'" height="'+vb.split(' ')[1]+'" fill="'+bg+'"/>'+inner+'</svg>';}
  function productSVG(type,colorName){
    var hex=COLORHEX[colorName]||'#6b76b8',bg='#e7ebf0';
    var inner;
    switch(type){
      case 'sofa': inner='<rect x="50" y="70" width="220" height="70" rx="14" fill="'+hex+'"/><rect x="58" y="58" width="204" height="36" rx="12" fill="'+shade(hex,12)+'"/><rect x="70" y="96" width="80" height="36" rx="8" fill="'+shade(hex,18)+'"/><rect x="170" y="96" width="80" height="36" rx="8" fill="'+shade(hex,18)+'"/><rect x="46" y="90" width="22" height="56" rx="8" fill="'+shade(hex,-8)+'"/><rect x="252" y="90" width="22" height="56" rx="8" fill="'+shade(hex,-8)+'"/><rect x="64" y="142" width="14" height="16" fill="#5b4a35"/><rect x="242" y="142" width="14" height="16" fill="#5b4a35"/>';break;
      case 'desk': inner='<rect x="40" y="86" width="240" height="14" rx="4" fill="'+hex+'"/><rect x="52" y="100" width="12" height="52" fill="'+shade(hex,-16)+'"/><rect x="256" y="100" width="12" height="52" fill="'+shade(hex,-16)+'"/><rect x="120" y="46" width="80" height="52" rx="4" fill="#2b2e35"/><rect x="126" y="52" width="68" height="40" fill="#3a6ad4"/><rect x="150" y="98" width="20" height="8" fill="#222"/>';break;
      case 'tv': inner='<rect x="60" y="38" width="200" height="114" rx="8" fill="#1b1d24"/><rect x="68" y="46" width="184" height="88" fill="#33507f"/><rect x="150" y="152" width="20" height="12" fill="#555"/><rect x="118" y="164" width="84" height="8" rx="3" fill="#8a8f98"/>';break;
      case 'phone': inner='<rect x="128" y="36" width="64" height="122" rx="13" fill="'+hex+'"/><rect x="134" y="46" width="52" height="94" rx="4" fill="#11141c"/><rect x="146" y="42" width="28" height="4" rx="2" fill="#33363f"/><circle cx="160" cy="150" r="5" fill="#33363f"/><circle cx="176" cy="58" r="4" fill="#33507f"/>';break;
      case 'bike': inner='<circle cx="92" cy="120" r="36" fill="none" stroke="#2b2e35" stroke-width="7"/><circle cx="228" cy="120" r="36" fill="none" stroke="#2b2e35" stroke-width="7"/><polyline points="92,120 150,120 185,72 130,72 92,120" fill="none" stroke="'+hex+'" stroke-width="7" stroke-linejoin="round"/><line x1="150" y1="120" x2="185" y2="72" stroke="'+hex+'" stroke-width="7"/><line x1="228" y1="120" x2="185" y2="72" stroke="'+hex+'" stroke-width="7"/><line x1="116" y1="62" x2="130" y2="72" stroke="#2b2e35" stroke-width="6"/><rect x="176" y="64" width="28" height="7" rx="3" fill="#2b2e35"/>';break;
      case 'fridge': inner='<rect x="116" y="34" width="88" height="128" rx="11" fill="'+hex+'"/><line x1="116" y1="92" x2="204" y2="92" stroke="'+shade(hex,-24)+'" stroke-width="3"/><rect x="124" y="46" width="6" height="32" rx="3" fill="'+shade(hex,-26)+'"/><rect x="124" y="100" width="6" height="32" rx="3" fill="'+shade(hex,-26)+'"/>';break;
      case 'guitar': inner='<rect x="150" y="40" width="12" height="92" rx="4" fill="#6b4a2a"/><rect x="146" y="32" width="20" height="16" rx="3" fill="#4a321a"/><ellipse cx="156" cy="140" rx="48" ry="34" fill="'+hex+'"/><ellipse cx="156" cy="126" rx="24" ry="17" fill="'+hex+'"/><circle cx="156" cy="140" r="11" fill="#11141c"/>';break;
      case 'camera': inner='<rect x="92" y="72" width="136" height="82" rx="12" fill="'+hex+'"/><rect x="118" y="60" width="44" height="16" rx="4" fill="'+shade(hex,-10)+'"/><circle cx="160" cy="116" r="30" fill="#1b1d24"/><circle cx="160" cy="116" r="18" fill="#3a6ad4"/><circle cx="206" cy="92" r="5" fill="#ffe39a"/>';break;
      case 'lamp': inner='<rect x="150" y="118" width="20" height="38" rx="3" fill="#555"/><rect x="118" y="150" width="84" height="10" rx="4" fill="#555"/><polygon points="128,78 192,78 178,118 142,118" fill="'+hex+'"/>';break;
      default: inner='<polygon points="82,82 238,82 222,150 98,150" fill="'+hex+'"/><polygon points="82,82 160,62 238,82 160,100" fill="'+shade(hex,14)+'"/><line x1="160" y1="100" x2="160" y2="150" stroke="'+shade(hex,-16)+'" stroke-width="3"/><rect x="140" y="66" width="40" height="10" fill="'+shade(hex,-10)+'"/>';
    }
    return svgWrap('320 190',bg,inner);
  }
  function jobSVG(colorName){var h=COLORHEX[colorName]||'#4a5fae';return svgWrap('320 120',shade(h,32),'<rect x="118" y="44" width="84" height="58" rx="8" fill="'+h+'"/><rect x="140" y="34" width="40" height="14" rx="5" fill="none" stroke="'+shade(h,-15)+'" stroke-width="5"/><rect x="118" y="64" width="84" height="6" fill="'+shade(h,-18)+'"/><rect x="150" y="62" width="20" height="12" rx="3" fill="'+shade(h,-26)+'"/>');}
  function serviceSVG(colorName){var h=COLORHEX[colorName]||'#3c7a55';return svgWrap('320 120',shade(h,32),'<circle cx="128" cy="60" r="26" fill="none" stroke="'+h+'" stroke-width="9"/><circle cx="128" cy="60" r="9" fill="'+h+'"/><g transform="rotate(38 180 60)"><rect x="174" y="32" width="12" height="58" rx="4" fill="'+shade(h,-6)+'"/><rect x="170" y="30" width="20" height="14" rx="5" fill="'+shade(h,-14)+'"/></g>');}
  function eventSVG(colorName){var h=COLORHEX[colorName]||'#b25b86';var dots='';for(var r=0;r<3;r++){for(var c=0;c<3;c++){dots+='<rect x="'+(132+c*22)+'" y="'+(60+r*11)+'" width="12" height="7" rx="2" fill="'+shade(h,16)+'"/>';}}return svgWrap('320 120',shade(h,34),'<rect x="118" y="34" width="84" height="64" rx="8" fill="#fff" stroke="'+shade(h,-6)+'" stroke-width="2"/><rect x="118" y="34" width="84" height="18" rx="8" fill="'+h+'"/><rect x="134" y="26" width="6" height="16" rx="3" fill="'+shade(h,-22)+'"/><rect x="180" y="26" width="6" height="16" rx="3" fill="'+shade(h,-22)+'"/>'+dots);}
  function forumSVG(colorName){var h=COLORHEX[colorName]||'#4a5fae';return svgWrap('320 120',shade(h,34),'<rect x="92" y="32" width="96" height="50" rx="12" fill="'+h+'"/><polygon points="108,82 108,98 128,82" fill="'+h+'"/><rect x="150" y="56" width="80" height="42" rx="12" fill="'+shade(h,18)+'"/><polygon points="216,98 216,110 198,98" fill="'+shade(h,18)+'"/><rect x="106" y="46" width="62" height="6" rx="3" fill="#fff" opacity=".75"/><rect x="106" y="60" width="44" height="6" rx="3" fill="#fff" opacity=".55"/>');}

  function prodGallery(o){
    return [{lab:'Photo 1',svg:productSVG(o.art,o.color)},
            {lab:'Photo 2',svg:productSVG(o.art,o.color==='Black'?'Gray':'Black')},
            {lab:'Photo 3',svg:productSVG(o.art,o.color==='Blue'?'Silver':'Blue')}];
  }
  function modalGallery(imgs,h){
    return '<div class="gallery-main" style="height:'+(h||230)+'px">'+imgs[0].svg+'<span class="lab">'+imgs[0].lab+'</span></div>'+
      '<div class="thumbs" id="mThumbs">'+imgs.map(function(im,i){return '<div class="thumb'+(i===0?' on':'')+'" data-mth="'+i+'">'+im.svg+'</div>';}).join('')+'</div>';
  }
  function wireModalThumbs(imgs){$$('#mThumbs .thumb').forEach(function(t){t.addEventListener('click',function(){$$('#mThumbs .thumb').forEach(function(x){x.classList.remove('on');});t.classList.add('on');var im=imgs[+t.getAttribute('data-mth')];$('#modal .gallery-main').innerHTML=im.svg+'<span class="lab">'+im.lab+'</span>';});});}

  /* =================== FOR SALE =================== */
  var FS_SUBS=['All','Furniture','Electronics','Appliances','Bikes','Phones','Home & Garden','Musical','Sporting','Free'];
  var FS=[
    {id:1,sub:'Furniture',art:'sofa',color:'Gray',title:'3-seat fabric sofa, very comfortable',price:240,cond:'Good',loc:'Brooklyn',posted:'1 day ago',desc:'Comfortable grey three-seater in good shape. Light wear on one cushion. Smoke-free home. You haul — easy to carry, fits a standard doorway.'},
    {id:2,sub:'Furniture',art:'desk',color:'Beige',title:'Solid wood writing desk',price:120,cond:'Good',loc:'Queens',posted:'3 days ago',desc:'Sturdy wooden desk with two drawers. Great for a home office or student. Minor scratches on the top, structurally perfect.'},
    {id:3,sub:'Furniture',art:'lamp',color:'Green',title:'Mid-century floor lamp',price:45,cond:'Like new',loc:'Manhattan',posted:'6 hours ago',desc:'Stylish floor lamp with a warm shade. Barely used, works perfectly. Adds a cozy glow to any living room.'},
    {id:4,sub:'Electronics',art:'tv',color:'Black',title:'55-inch 4K smart TV',price:280,cond:'Like new',loc:'Bronx',posted:'2 days ago',desc:'Crisp 4K panel with streaming apps built in. Includes remote and stand. No dead pixels, used lightly in a guest room.'},
    {id:5,sub:'Electronics',art:'camera',color:'Black',title:'Mirrorless camera with kit lens',price:340,cond:'Good',loc:'Brooklyn',posted:'4 days ago',desc:'Great starter mirrorless setup. Comes with the 18-55mm lens, battery, charger, and strap. Shutter count low.'},
    {id:6,sub:'Phones',art:'phone',color:'Blue',title:'Unlocked smartphone, 128GB',price:230,cond:'Good',loc:'Queens',posted:'1 day ago',desc:'Factory unlocked, works on all carriers. Battery health 89%. Small scratch on the back, screen is flawless. Case included.'},
    {id:7,sub:'Appliances',art:'fridge',color:'Silver',title:'Compact refrigerator, energy efficient',price:160,cond:'Good',loc:'Staten Island',posted:'5 days ago',desc:'Apartment-size fridge with freezer compartment. Runs cold and quiet. Perfect for a dorm, office, or small kitchen.'},
    {id:8,sub:'Bikes',art:'bike',color:'Red',title:'Hybrid commuter bike, 21-speed',price:185,cond:'Good',loc:'Brooklyn',posted:'2 days ago',desc:'Reliable commuter with new tires and tuned brakes. Smooth shifting. Fits riders 5\u20196\u201d to 6\u20191\u201d. Lock included.'},
    {id:9,sub:'Musical',art:'guitar',color:'Beige',title:'Acoustic guitar with soft case',price:130,cond:'Good',loc:'Manhattan',posted:'3 days ago',desc:'Warm-sounding dreadnought acoustic. New strings. Minor pick wear. Includes a padded gig bag and a clip-on tuner.'},
    {id:10,sub:'Sporting',art:'box',color:'Blue',title:'Adjustable dumbbell set, 5\u201352 lb',price:210,cond:'Like new',loc:'Queens',posted:'1 day ago',desc:'Space-saving adjustable dumbbells, like new. Smooth weight changes. Great for a home gym. Selling because I upgraded.'},
    {id:11,sub:'Home & Garden',art:'box',color:'Green',title:'Set of ceramic planters (4)',price:35,cond:'New',loc:'Bed-Stuy',posted:'8 hours ago',desc:'Four matching ceramic planters with drainage trays. Brand new, never used. Perfect for herbs or succulents.'},
    {id:12,sub:'Electronics',art:'tv',color:'Gray',title:'27-inch monitor, 144Hz',price:175,cond:'Like new',loc:'Manhattan',posted:'2 days ago',desc:'Fast 144Hz IPS monitor, great for work and gaming. Includes stand and cables. No scratches, boxed.'},
    {id:13,sub:'Furniture',art:'sofa',color:'Blue',title:'Loveseat, navy blue',price:0,cond:'Fair',loc:'Astoria',posted:'today',desc:'Free navy loveseat — moving out this weekend, must go. Some fading and a small tear on the back. Still comfy. First come, first served.'},
    {id:14,sub:'Home & Garden',art:'lamp',color:'White',title:'Table lamp — free, works great',price:0,cond:'Good',loc:'Harlem',posted:'today',desc:'Giving away a clean white table lamp, fully working. Pick up only, lobby handoff. Bulb included.'},
    {id:15,sub:'Bikes',art:'bike',color:'Black',title:'Kids bike, ages 5\u20138 — free',price:0,cond:'Fair',loc:'Sunnyside',posted:'1 day ago',desc:'Free kids bike, training wheels included. Some rust on the chain but rides fine. Great first bike for a little one.'},
    {id:16,sub:'Phones',art:'phone',color:'Silver',title:'Older smartphone, good for parts',price:0,cond:'Fair',loc:'Bronx',posted:'2 days ago',desc:'Free phone, screen works but battery is weak. Good for parts or a backup. No charger. Pick up only.'}
  ];
  var fsState={sub:'All',max:'',cond:[],q:'',sort:'best'};
  function fsMatch(o){
    if(fsState.sub==='Free'){if(o.price!==0)return false;}
    else if(fsState.sub!=='All'&&o.sub!==fsState.sub)return false;
    if(fsState.max&&o.price>+fsState.max)return false;
    if(fsState.cond.length&&fsState.cond.indexOf(o.cond)===-1)return false;
    if(fsState.q){var q=fsState.q.toLowerCase();if((o.title+' '+o.sub+' '+o.loc).toLowerCase().indexOf(q)===-1)return false;}
    return true;
  }
  function fsCard(o){
    var free=o.price===0;
    return '<div class="lcard" data-fs="'+o.id+'"><div class="ph">'+productSVG(o.art,o.color)+
      '<span class="badge year">'+o.sub+'</span>'+(free?'<span class="badge tr">Free</span>':'')+
      '<span class="photon"><i class="ti ti-camera"></i> 1/'+(2+o.id%4)+'</span>'+favHtml('fs',o.id)+'</div>'+
      '<div class="bd"><div class="nm">'+o.title+'</div><div class="pr">'+(free?'Free':money(o.price))+'</div>'+
      '<div class="mt"><span><i class="ti ti-map-pin"></i>'+o.loc+'</span><span>'+o.cond+'</span></div>'+
      '<div class="rt">'+o.posted+'</div></div></div>';
  }
  function renderFs(){
    var list=FS.filter(fsMatch);
    if(fsState.sort==='plow')list.sort(function(a,b){return a.price-b.price;});
    else if(fsState.sort==='phigh')list.sort(function(a,b){return b.price-a.price;});
    $('#fsCount').textContent=list.length;
    var grid=$('#fsGrid');grid.innerHTML=list.length?list.map(fsCard).join(''):'<div class="empty">No items match these filters.</div>';
    $('#fsMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length):'';
    $$('#fsGrid [data-fs]').forEach(function(el){el.addEventListener('click',function(){openFs(+el.getAttribute('data-fs'));});});
    wireFav(grid);
    // chipbar
    var bar=$('#fsChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l,clr){var s=document.createElement('span');s.className='achip';s.innerHTML=l+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clr);bar.appendChild(s);}
    if(fsState.sub!=='All')chip(fsState.sub,function(){setFsSub('All');});
    if(fsState.q)chip('“'+fsState.q+'”',function(){fsState.q='';$('#fsSearch').value='';renderFs();});
    if(fsState.max)chip('Under $'+fsState.max,function(){fsState.max='';$('#fsMax').value='';renderFs();});
    fsState.cond.forEach(function(c){chip(c,function(){fsState.cond=fsState.cond.filter(function(x){return x!==c;});$$('#fsCond .chip').forEach(function(ch){if(ch.getAttribute('data-c')===c)ch.classList.remove('on');});renderFs();});});
    var right=document.createElement('span');right.className='right';right.textContent=list.length+' results';bar.appendChild(right);
  }
  function setFsSub(s){fsState.sub=s;$$('#fsTabs .tab').forEach(function(t){t.classList.toggle('on',t.getAttribute('data-tab')===s);});renderFs();}
  function openFs(id){
    var o=FS.filter(function(x){return x.id===id;})[0];if(!o)return;
    var imgs=prodGallery(o);
    var body=modalGallery(imgs)+
      '<div style="font-size:22px;font-weight:700;color:var(--green-d);margin-top:12px">'+(o.price===0?'Free':money(o.price))+'</div>'+
      '<div style="color:var(--muted);font-size:13px;margin:2px 0 12px">'+o.sub+' · '+o.cond+' · '+o.loc+', NY · '+o.posted+'</div>'+
      '<div class="desc">'+o.desc+'</div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="Message sent to seller (demo)"><i class="ti ti-message"></i> Reply to seller</button>';
    openModal(o.title,body);wireModalThumbs(imgs);
  }
  function buildFs(){
    $('#fsTabs').innerHTML=FS_SUBS.map(function(s){return '<div class="tab'+(s==='All'?' on':'')+'" data-tab="'+s+'">'+s+'</div>';}).join('');
    $$('#fsTabs .tab').forEach(function(t){t.addEventListener('click',function(){setFsSub(t.getAttribute('data-tab'));});});
    $('#fsMax').addEventListener('input',function(){fsState.max=this.value;renderFs();});
    $$('#fsCond .chip').forEach(function(ch){ch.addEventListener('click',function(){var c=ch.getAttribute('data-c');ch.classList.toggle('on');if(ch.classList.contains('on'))fsState.cond.push(c);else fsState.cond=fsState.cond.filter(function(x){return x!==c;});renderFs();});});
    $('#fsSort').addEventListener('change',function(){fsState.sort=this.value;renderFs();});
    $('#fsSearchBtn').addEventListener('click',function(){fsState.q=$('#fsSearch').value.trim();renderFs();});
    $('#fsSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){fsState.q=this.value.trim();renderFs();}});
    renderFs();
  }

  /* =================== JOBS =================== */
  var JOB_FIELDS=['Technology','Food & Beverage','Retail','Healthcare','Admin & Office','Creative & Media','Skilled Labor','Education'];
  var JOBS=[
    {id:1,title:'Frontend Developer',field:'Technology',type:'Full-time',pay:'$95k\u2013120k/yr',company:'Early-stage startup',loc:'Manhattan',remote:true,posted:'2 days ago',desc:'Build and maintain our customer-facing web app. You should know modern JavaScript and have an eye for clean UI. Small team, lots of ownership, flexible hours, remote-friendly.'},
    {id:2,title:'Barista (morning shift)',field:'Food & Beverage',type:'Part-time',pay:'$18/hr + tips',company:'Neighborhood coffee bar',loc:'Brooklyn',remote:false,posted:'6 hours ago',desc:'Friendly, reliable barista needed for early shifts. Latte art a plus but we will train. Free coffee, great regulars, supportive team.'},
    {id:3,title:'Retail Sales Associate',field:'Retail',type:'Part-time',pay:'$17\u201320/hr',company:'Boutique clothing shop',loc:'Queens',remote:false,posted:'1 day ago',desc:'Help customers, manage the floor, and keep the shop looking sharp. Weekend availability required. Employee discount and a fun environment.'},
    {id:4,title:'Registered Nurse — Clinic',field:'Healthcare',type:'Full-time',pay:'$80k\u2013100k/yr',company:'Community health clinic',loc:'Bronx',remote:false,posted:'3 days ago',desc:'Provide patient care in a busy outpatient clinic. Active RN license required. Day shifts, no overnights. Benefits and continuing-education support.'},
    {id:5,title:'Office Administrator',field:'Admin & Office',type:'Full-time',pay:'$50k\u201360k/yr',company:'Architecture firm',loc:'Manhattan',remote:false,posted:'4 days ago',desc:'Keep the office running: scheduling, vendors, supplies, and front-desk support. Organized, calm under pressure, great with people.'},
    {id:6,title:'Graphic Designer (contract)',field:'Creative & Media',type:'Contract',pay:'$40\u201360/hr',company:'Marketing agency',loc:'Brooklyn',remote:true,posted:'2 days ago',desc:'Three-month contract designing social and print assets for several brands. Strong portfolio required. Remote with occasional studio visits.'},
    {id:7,title:'Apartment Mover (weekend gig)',field:'Skilled Labor',type:'Gig',pay:'$25/hr cash',company:'Local moving crew',loc:'Queens',remote:false,posted:'12 hours ago',desc:'Need two extra hands this Saturday for a 2-bedroom move. Must be able to lift 50 lbs and be on time. Paid same day in cash.'},
    {id:8,title:'Math Tutor (high school)',field:'Education',type:'Part-time',pay:'$35/hr',company:'Private family',loc:'Manhattan',remote:true,posted:'1 day ago',desc:'Seeking a patient tutor for algebra and geometry, twice a week. Online or in person. Education or tutoring experience preferred.'},
    {id:9,title:'Line Cook',field:'Food & Beverage',type:'Full-time',pay:'$22\u201326/hr',company:'Farm-to-table restaurant',loc:'Brooklyn',remote:false,posted:'5 days ago',desc:'Experienced line cook for a busy dinner service. Knife skills and consistency a must. Meals provided, growth opportunities in a respectful kitchen.'},
    {id:10,title:'Backend Engineer',field:'Technology',type:'Full-time',pay:'$110k\u2013140k/yr',company:'Fintech scale-up',loc:'Manhattan',remote:true,posted:'3 days ago',desc:'Design and scale APIs and data pipelines. Experience with databases and cloud infra expected. Strong mentoring culture, fully remote option.'},
    {id:11,title:'Dog Walker (afternoons)',field:'Skilled Labor',type:'Gig',pay:'$20/walk',company:'Busy pet parents',loc:'Astoria',remote:false,posted:'9 hours ago',desc:'Reliable dog walker needed for weekday afternoon walks. Must love dogs and be comfortable with medium breeds. Flexible, recurring gig.'},
    {id:12,title:'Social Media Coordinator',field:'Creative & Media',type:'Part-time',pay:'$25/hr',company:'Local nonprofit',loc:'Harlem',remote:true,posted:'2 days ago',desc:'Plan and post content across our channels, engage the community, and track results. Creative, organized, and mission-driven. Mostly remote.'}
  ];
  var jobState={field:'',type:[],remote:false,q:'',sort:'new'};
  function jobMatch(j){
    if(jobState.field&&j.field!==jobState.field)return false;
    if(jobState.type.length&&jobState.type.indexOf(j.type)===-1)return false;
    if(jobState.remote&&!j.remote)return false;
    if(jobState.q){var q=jobState.q.toLowerCase();if((j.title+' '+j.field+' '+j.company).toLowerCase().indexOf(q)===-1)return false;}
    return true;
  }
  function payNum(p){var m=p.match(/\$(\d+)/);return m?+m[1]:0;}
  function jobCard(j){
    return '<div class="lcard" data-job="'+j.id+'"><div class="ph short">'+jobSVG(['Blue','Green','Gray','Beige','Red'][j.id%5])+
      '<span class="badge year">'+j.type+'</span>'+(j.remote?'<span class="badge tr">Remote</span>':'')+'</div>'+
      '<div class="bd"><div class="nm">'+j.title+'</div><div class="pr" style="font-size:14px">'+j.pay+'</div>'+
      '<div class="mt"><span><i class="ti ti-building"></i>'+j.company+'</span><span><i class="ti ti-map-pin"></i>'+j.loc+'</span></div>'+
      '<div class="rt">'+j.field+' · '+j.posted+'</div></div></div>';
  }
  function renderJobs(){
    var list=JOBS.filter(jobMatch);
    if(jobState.sort==='payhigh')list.sort(function(a,b){return payNum(b.pay)-payNum(a.pay);});
    $('#jobCount').textContent=list.length;
    var grid=$('#jobGrid');grid.innerHTML=list.length?list.map(jobCard).join(''):'<div class="empty">No openings match these filters.</div>';
    $('#jobMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length):'';
    $$('#jobGrid [data-job]').forEach(function(el){el.addEventListener('click',function(){openJob(+el.getAttribute('data-job'));});});
    var bar=$('#jobChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l,clr){var s=document.createElement('span');s.className='achip';s.innerHTML=l+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clr);bar.appendChild(s);}
    if(jobState.q)chip('“'+jobState.q+'”',function(){jobState.q='';$('#jobSearch').value='';renderJobs();});
    if(jobState.field)chip(jobState.field,function(){jobState.field='';$('#jobField').value='';renderJobs();});
    jobState.type.forEach(function(t){chip(t,function(){jobState.type=jobState.type.filter(function(x){return x!==t;});$$('#jobType .chip').forEach(function(ch){if(ch.getAttribute('data-t')===t)ch.classList.remove('on');});renderJobs();});});
    if(jobState.remote)chip('Remote',function(){jobState.remote=false;$('#jobRemote').checked=false;renderJobs();});
    var right=document.createElement('span');right.className='right';right.textContent=list.length+' results';bar.appendChild(right);
  }
  function openJob(id){
    var j=JOBS.filter(function(x){return x.id===id;})[0];if(!j)return;
    var body='<div style="display:flex;align-items:center;gap:12px"><div class="av" style="width:46px;height:46px;border-radius:10px;background:var(--purple-l);color:var(--purple);display:flex;align-items:center;justify-content:center"><i class="ti ti-briefcase" style="font-size:22px"></i></div>'+
      '<div><div style="font-size:13px;color:var(--muted)">'+j.company+' · '+j.loc+'</div><div style="font-size:20px;font-weight:700;color:var(--green-d)">'+j.pay+'</div></div></div>'+
      '<div class="hl" style="margin:12px 0"><span class="c">'+j.type+'</span><span class="c">'+j.field+'</span>'+(j.remote?'<span class="c"><i class="ti ti-check"></i> Remote</span>':'<span class="c">On-site</span>')+'<span class="c">Posted '+j.posted+'</span></div>'+
      '<div class="desc">'+j.desc+'</div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="Application sent (demo)"><i class="ti ti-send"></i> Apply now</button>';
    openModal(j.title,body);
  }
  function buildJobs(){
    $('#jobField').innerHTML='<option value="">All categories</option>'+JOB_FIELDS.map(function(f){return '<option>'+f+'</option>';}).join('');
    $('#jobField').addEventListener('change',function(){jobState.field=this.value;renderJobs();});
    $$('#jobType .chip').forEach(function(ch){ch.addEventListener('click',function(){var t=ch.getAttribute('data-t');ch.classList.toggle('on');if(ch.classList.contains('on'))jobState.type.push(t);else jobState.type=jobState.type.filter(function(x){return x!==t;});renderJobs();});});
    $('#jobRemote').addEventListener('change',function(){jobState.remote=this.checked;renderJobs();});
    $('#jobSort').addEventListener('change',function(){jobState.sort=this.value;renderJobs();});
    $('#jobSearchBtn').addEventListener('click',function(){jobState.q=$('#jobSearch').value.trim();renderJobs();});
    $('#jobSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){jobState.q=this.value.trim();renderJobs();}});
    renderJobs();
  }

  /* =================== SERVICES =================== */
  var SVC_CATS=['Moving & Hauling','Cleaning','Home Repair','Tutoring','Beauty & Wellness','Computer Help','Pet Care','Photography'];
  var SVCS=[
    {id:1,cat:'Moving & Hauling',title:'Two movers + van, hourly',rate:'$80/hr',loc:'Brooklyn',rating:4.8,reviews:64,desc:'Friendly, careful movers with a clean van. Furniture, apartments, and small offices. Blankets and straps included. Same-week availability.'},
    {id:2,cat:'Cleaning',title:'Deep apartment cleaning',rate:'$35/hr',loc:'Queens',rating:4.9,reviews:120,desc:'Detailed, eco-friendly cleaning for apartments and condos. Move-in/move-out specials. Supplies included. Background-checked and insured.'},
    {id:3,cat:'Home Repair',title:'Handyman — small jobs welcome',rate:'$60/hr',loc:'Manhattan',rating:4.7,reviews:48,desc:'Mounting, patching, fixtures, furniture assembly, and odd jobs. No task too small. Tools and parts available. Free estimates.'},
    {id:4,cat:'Tutoring',title:'Spanish & ESL tutoring',rate:'$40/hr',loc:'Bronx',rating:4.8,reviews:33,desc:'Patient, experienced tutor for all levels. Conversational practice, grammar, and test prep. Online or in person. First session discounted.'},
    {id:5,cat:'Beauty & Wellness',title:'Mobile haircut & styling',rate:'$45/visit',loc:'Brooklyn',rating:4.6,reviews:71,desc:'Licensed stylist who comes to you. Cuts, fades, and styling in the comfort of your home. Flexible evenings and weekends.'},
    {id:6,cat:'Computer Help',title:'PC & Mac setup, repair, backups',rate:'$50/hr',loc:'Queens',rating:4.9,reviews:55,desc:'Slow computer? Setup, virus cleanup, data recovery, and backups. Patient and clear explanations. House calls or remote support.'},
    {id:7,cat:'Pet Care',title:'Dog walking & pet sitting',rate:'$25/walk',loc:'Astoria',rating:4.8,reviews:90,desc:'Loving, reliable care for your pets. Daily walks, drop-in visits, and overnight sitting. Photo updates every visit. Insured.'},
    {id:8,cat:'Photography',title:'Portrait & event photography',rate:'$150/session',loc:'Manhattan',rating:4.7,reviews:29,desc:'Natural-light portraits, headshots, and small events. Quick turnaround on edited photos. Portfolio available on request.'},
    {id:9,cat:'Cleaning',title:'Post-renovation cleanup crew',rate:'$45/hr',loc:'Bed-Stuy',rating:4.5,reviews:18,desc:'Specialized cleanup after renovations and construction. Dust, debris, and detailing. Bring our own equipment. Flexible scheduling.'}
  ];
  var svcState={cat:'',q:'',sort:'best'};
  function svcMatch(s){
    if(svcState.cat&&s.cat!==svcState.cat)return false;
    if(svcState.q){var q=svcState.q.toLowerCase();if((s.title+' '+s.cat+' '+s.loc).toLowerCase().indexOf(q)===-1)return false;}
    return true;
  }
  function svcCard(s){
    return '<div class="lcard" data-svc="'+s.id+'"><div class="ph short">'+serviceSVG(['Green','Blue','Gray','Beige'][s.id%4])+
      '<span class="badge year">'+s.cat.split(' ')[0]+'</span></div>'+
      '<div class="bd"><div class="nm">'+s.title+'</div><div class="pr" style="font-size:15px">'+s.rate+'</div>'+
      '<div class="mt"><span><i class="ti ti-map-pin"></i>'+s.loc+'</span></div>'+
      '<div class="rt"><i class="ti ti-star" style="color:#BA7517"></i> '+s.rating+' · '+s.reviews+' reviews</div></div></div>';
  }
  function renderSvc(){
    var list=SVCS.filter(svcMatch);
    if(svcState.sort==='rating')list.sort(function(a,b){return b.rating-a.rating;});
    else if(svcState.sort==='ratelow')list.sort(function(a,b){return parseInt(a.rate.replace(/\D/g,''))-parseInt(b.rate.replace(/\D/g,''));});
    $('#svcCount').textContent=list.length;
    var grid=$('#svcGrid');grid.innerHTML=list.length?list.map(svcCard).join(''):'<div class="empty">No providers match.</div>';
    $('#svcMore').innerHTML=list.length?('Showing '+list.length+' of '+list.length):'';
    $$('#svcGrid [data-svc]').forEach(function(el){el.addEventListener('click',function(){openSvc(+el.getAttribute('data-svc'));});});
    var bar=$('#svcChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l,clr){var s=document.createElement('span');s.className='achip';s.innerHTML=l+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clr);bar.appendChild(s);}
    if(svcState.cat)chip(svcState.cat,function(){svcState.cat='';$('#svcCat').value='';renderSvc();});
    if(svcState.q)chip('“'+svcState.q+'”',function(){svcState.q='';$('#svcSearch').value='';renderSvc();});
    var right=document.createElement('span');right.className='right';right.textContent=list.length+' results';bar.appendChild(right);
  }
  function openSvc(id){
    var s=SVCS.filter(function(x){return x.id===id;})[0];if(!s)return;
    var body='<div style="display:flex;align-items:center;gap:12px"><div class="av" style="width:46px;height:46px;border-radius:10px;background:#E1F5EE;color:#0F6E56;display:flex;align-items:center;justify-content:center"><i class="ti ti-tool" style="font-size:22px"></i></div>'+
      '<div><div style="font-size:13px;color:var(--muted)">'+s.cat+' · '+s.loc+'</div><div style="font-size:20px;font-weight:700;color:var(--green-d)">'+s.rate+'</div></div></div>'+
      '<div class="rt" style="margin:8px 0"><i class="ti ti-star" style="color:#BA7517"></i> '+s.rating+' · '+s.reviews+' reviews · responds quickly</div>'+
      '<div class="desc">'+s.desc+'</div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="Message sent (demo)"><i class="ti ti-message"></i> Contact provider</button>';
    openModal(s.title,body);
  }
  function buildSvc(){
    $('#svcCat').innerHTML='<option value="">All categories</option>'+SVC_CATS.map(function(c){return '<option>'+c+'</option>';}).join('');
    $('#svcCat').addEventListener('change',function(){svcState.cat=this.value;renderSvc();});
    $('#svcSort').addEventListener('change',function(){svcState.sort=this.value;renderSvc();});
    $('#svcSearchBtn').addEventListener('click',function(){svcState.q=$('#svcSearch').value.trim();renderSvc();});
    $('#svcSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){svcState.q=this.value.trim();renderSvc();}});
    renderSvc();
  }

  /* =================== COMMUNITY =================== */
  var COMM_TABS=['All','Events','Groups','Classes','Volunteer','Activities'];
  var COMM=[
    {id:1,type:'Events',title:'Saturday outdoor flea market',date:'Sat, Jun 14 · 10am',loc:'Williamsburg',desc:'Local makers, vintage finds, and food trucks along the waterfront. Free entry, family and dog friendly. Vendors welcome — sign up at the info booth.'},
    {id:2,type:'Groups',title:'Beginner running club',date:'Tue & Thu · 7am',loc:'Prospect Park',desc:'All paces welcome. We meet at the park entrance for an easy 5k and coffee after. Great way to stay active and meet neighbors.'},
    {id:3,type:'Classes',title:'Free intro to pottery',date:'Sun, Jun 15 · 2pm',loc:'Bushwick',desc:'Try the wheel for the first time in a relaxed studio. All materials provided. Limited spots — reserve early. Ages 16+.'},
    {id:4,type:'Volunteer',title:'Community garden cleanup',date:'Sun, Jun 22 · 9am',loc:'Bed-Stuy',desc:'Help us prep beds for summer planting. Gloves and tools provided. Snacks and good company guaranteed. No experience needed.'},
    {id:5,type:'Activities',title:'Weekly board game night',date:'Wed · 7pm',loc:'Astoria',desc:'Casual, friendly board game meetup at a local cafe. Bring a game or learn a new one. Newcomers always welcome.'},
    {id:6,type:'Events',title:'Neighborhood live music night',date:'Fri, Jun 20 · 8pm',loc:'Harlem',desc:'Local bands and open mic at a community venue. Suggested donation supports young musicians. All ages until 9pm.'},
    {id:7,type:'Groups',title:'Parents & toddlers meetup',date:'Mon · 10am',loc:'Park Slope',desc:'A welcoming group for caregivers and little ones. Playtime, snacks, and support. Meets at the community center playroom.'},
    {id:8,type:'Classes',title:'Conversational French circle',date:'Thu · 6:30pm',loc:'Manhattan',desc:'Practice French in a friendly, low-pressure setting. All levels. A native speaker guides each session. First visit free.'},
    {id:9,type:'Volunteer',title:'Food pantry packing shift',date:'Sat, Jun 14 · 1pm',loc:'Bronx',desc:'Sort and pack groceries for families in need. Two-hour shifts, all ages with a guardian. Sign up online or just show up.'},
    {id:10,type:'Activities',title:'Sunday pickup soccer',date:'Sun · 11am',loc:'Long Island City',desc:'Friendly co-ed pickup games on the turf field. Bring water and cleats. All skill levels — we just want to have fun.'}
  ];
  var commState={tab:'All',q:''};
  function commMatch(c){
    if(commState.tab!=='All'&&c.type!==commState.tab)return false;
    if(commState.q){var q=commState.q.toLowerCase();if((c.title+' '+c.type+' '+c.loc).toLowerCase().indexOf(q)===-1)return false;}
    return true;
  }
  function commCard(c){
    var clr={Events:'Red',Groups:'Blue',Classes:'Green',Volunteer:'Beige',Activities:'Gray'}[c.type]||'Blue';
    return '<div class="lcard" data-comm="'+c.id+'"><div class="ph short">'+eventSVG(clr)+'<span class="badge year">'+c.type+'</span></div>'+
      '<div class="bd"><div class="nm">'+c.title+'</div>'+
      '<div class="mt" style="margin-top:4px"><span><i class="ti ti-calendar"></i>'+c.date+'</span></div>'+
      '<div class="mt"><span><i class="ti ti-map-pin"></i>'+c.loc+'</span></div></div></div>';
  }
  function renderComm(){
    var list=COMM.filter(commMatch);
    $('#commCount').textContent=list.length;
    var grid=$('#commGrid');grid.innerHTML=list.length?list.map(commCard).join(''):'<div class="empty">Nothing here yet.</div>';
    $$('#commGrid [data-comm]').forEach(function(el){el.addEventListener('click',function(){openComm(+el.getAttribute('data-comm'));});});
    var bar=$('#commChipbar');bar.innerHTML='<span class="k">ACTIVE:</span>';
    function chip(l,clr){var s=document.createElement('span');s.className='achip';s.innerHTML=l+' <i class="ti ti-x"></i>';s.querySelector('i').addEventListener('click',clr);bar.appendChild(s);}
    if(commState.tab!=='All')chip(commState.tab,function(){setCommTab('All');});
    if(commState.q)chip('“'+commState.q+'”',function(){commState.q='';$('#commSearch').value='';renderComm();});
    var right=document.createElement('span');right.className='right';right.textContent=list.length+' results';bar.appendChild(right);
  }
  function setCommTab(t){commState.tab=t;$$('#commTabs .tab').forEach(function(x){x.classList.toggle('on',x.getAttribute('data-tab')===t);});renderComm();}
  function openComm(id){
    var c=COMM.filter(function(x){return x.id===id;})[0];if(!c)return;
    var body='<div class="hl" style="margin-bottom:12px"><span class="c">'+c.type+'</span><span class="c"><i class="ti ti-calendar"></i> '+c.date+'</span><span class="c"><i class="ti ti-map-pin"></i> '+c.loc+'</span></div>'+
      '<div class="desc">'+c.desc+'</div>'+
      '<button class="btn btn-primary cta" style="width:100%;margin-top:12px;justify-content:center" data-toast="You\u2019re in (demo)"><i class="ti ti-calendar-plus"></i> '+(c.type==='Groups'?'Join group':(c.type==='Volunteer'?'Sign up':'I\u2019m interested'))+'</button>';
    openModal(c.title,body);
  }
  function buildComm(){
    $('#commTabs').innerHTML=COMM_TABS.map(function(t){return '<div class="tab'+(t==='All'?' on':'')+'" data-tab="'+t+'">'+t+'</div>';}).join('');
    $$('#commTabs .tab').forEach(function(t){t.addEventListener('click',function(){setCommTab(t.getAttribute('data-tab'));});});
    $('#commSearchBtn').addEventListener('click',function(){commState.q=$('#commSearch').value.trim();renderComm();});
    $('#commSearch').addEventListener('keydown',function(e){if(e.key==='Enter'){commState.q=this.value.trim();renderComm();}});
    renderComm();
  }

  /* =================== FORUMS =================== */
  var FORUM_BOARDS=['All','Apartments','Pets','Help','Gardening','Tech','Politics'];
  var THREADS=[
    {id:1,board:'Apartments',title:'Best neighborhoods for a quiet 1BR under $2,200?',author:'newtoBK',replies:24,last:'12m ago',body:'Relocating next month and looking for somewhere calm but still close to a train. Open to outer boroughs. What areas should I focus on, and any blocks to avoid?'},
    {id:2,board:'Pets',title:'Vet recommendations near the park?',author:'dogmom_q',replies:11,last:'1h ago',body:'My pup is due for a checkup and our old vet moved. Looking for someone gentle and reasonably priced. Bonus if they have weekend hours.'},
    {id:3,board:'Help',title:'How do I spot a rental scam?',author:'firstapt',replies:38,last:'3h ago',body:'Saw a listing way below market price and the “landlord” wants a deposit before a viewing. Feels off. What are the red flags I should watch for?'},
    {id:4,board:'Gardening',title:'Balcony herbs that survive low light?',author:'greenthumb',replies:9,last:'5h ago',body:'My balcony only gets a couple hours of sun. Which herbs are forgiving? Tried basil and it sulked. Mint seems happy so far.'},
    {id:5,board:'Tech',title:'Worth buying a used laptop for a student?',author:'budgetbuilds',replies:16,last:'2h ago',body:'Trying to keep costs down for my kid heading to college. Is a 2017-era used laptop fine for writing and browsing, or will it feel slow in a year?'},
    {id:6,board:'Apartments',title:'Broker fee vs no-fee: is it ever worth it?',author:'leaseseason',replies:21,last:'30m ago',body:'A no-fee place I like is a bit pricier monthly than a fee place. Trying to do the math on which is cheaper over a year. How do you all think about this?'},
    {id:7,board:'Help',title:'Moving on a budget — tips that actually helped?',author:'boxlife',replies:14,last:'6h ago',body:'First real move without family helping. What saved you money? Looking for honest tips on trucks, supplies, and timing.'},
    {id:8,board:'Tech',title:'Phone battery health — when to replace?',author:'89percent',replies:7,last:'4h ago',body:'My battery health just dropped under 90% and it dies faster. Is it worth replacing the battery or just living with it for now?'}
  ];
  var forumBoard='All';
  function forumIcon(b){return {Apartments:'ti-building',Pets:'ti-paw',Help:'ti-help',Gardening:'ti-plant-2',Tech:'ti-device-laptop',Politics:'ti-speakerphone'}[b]||'ti-message-circle';}
  function renderForums(){
    var list=THREADS.filter(function(t){return forumBoard==='All'||t.board===forumBoard;});
    $('#forumCount').textContent=list.length;
    var grid=$('#forumGrid');
    grid.innerHTML=list.map(function(t){
      return '<div class="frow" data-thread="'+t.id+'"><div class="fi" style="background:var(--purple-l);color:var(--purple)"><i class="ti '+forumIcon(t.board)+'"></i></div>'+
        '<div style="flex:1"><div class="ft">'+t.title+'</div><div class="fm">'+t.board+' · by '+t.author+'</div></div>'+
        '<div class="fr">'+t.replies+' replies<br>'+t.last+'</div></div>';
    }).join('');
    $$('#forumGrid [data-thread]').forEach(function(el){el.addEventListener('click',function(){openThread(+el.getAttribute('data-thread'));});});
  }
  function openThread(id){
    var t=THREADS.filter(function(x){return x.id===id;})[0];if(!t)return;
    var replies=[
      {a:'localguide',txt:'Welcome! A few areas come to mind depending on your commute — visit at different times of day before committing.'},
      {a:'longtimer',txt:'Agree with the above. Also check the block on a weekend night, not just a quiet weekday afternoon.'},
      {a:'helpfulneighbor',txt:'Whatever you do, never send money before seeing a place in person. That alone avoids most problems.'}
    ];
    var body='<div style="font-size:12px;color:var(--muted);margin-bottom:10px">'+t.board+' · started by '+t.author+' · '+t.replies+' replies</div>'+
      '<div class="desc"><b>'+t.author+':</b> '+t.body+'</div>'+
      replies.map(function(r){return '<div class="desc" style="margin-top:8px"><b>'+r.a+':</b> '+r.txt+'</div>';}).join('')+
      '<div style="display:flex;gap:8px;margin-top:12px"><input class="txtin" placeholder="Write a reply…" style="flex:1"><button class="btn btn-primary" style="padding:0 16px" data-toast="Reply posted (demo)">Reply</button></div>';
    openModal(t.title,body);
  }
  function buildForums(){
    $('#forumBoards').innerHTML=FORUM_BOARDS.map(function(b){return '<div class="chip'+(b==='All'?' on':'')+'" data-board="'+b+'" style="text-align:left">'+b+'</div>';}).join('');
    $$('#forumBoards .chip').forEach(function(ch){ch.addEventListener('click',function(){forumBoard=ch.getAttribute('data-board');$$('#forumBoards .chip').forEach(function(x){x.classList.remove('on');});ch.classList.add('on');renderForums();});});
    renderForums();
  }

  /* ---------- init ---------- */
  wireNav(document);
  buildCarControls();setMake('');
  buildHouseControls();
  buildCompControls();
  buildFs();buildJobs();buildSvc();buildComm();buildForums();
  $('#catFree').addEventListener('click',function(){showView('forsale');setFsSub('Free');});
  renderCars();renderHouses();renderComps();buildHomeTrending();
  updateFavCount();
  $('#backBtn').addEventListener('click',goBack);
  showView('home');
})();

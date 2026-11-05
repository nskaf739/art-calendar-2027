/* ===== Settings: change these two values ===== */
var CONFIG={
  price:25,                                   /* PLACEHOLDER: price per calendar */
  currency:"€",
  paypalMe:"sujinprk", /* the name in your link paypal.me/NAME */
  currencyCode:"EUR",
  endpoint:"/api/order"                              /* Vercel function in /api/order.js */
};
var TOPICS=[
 {id:"art",title:"Art"},
 {id:"order",title:"Order"}
];
var ART_GALLERY=["assets/img/art01.jpg","assets/img/art02.jpg","assets/img/art03.jpg","assets/img/art04.jpg","assets/img/art05.jpg","assets/img/art06.jpg","assets/img/art07.jpg","assets/img/art08.jpg","assets/img/art09.jpg","assets/img/art10.jpg","assets/img/art11.jpg","assets/img/art12.jpg"];
var ORG_GALLERY=["assets/img/org01.jpg","assets/img/org02.jpg","assets/img/org03.jpg"];
var ART_INFO=[{title:"Elephant",date:"October 04, 2026",notes:""},{title:"Red horse and iris",date:"April 10, 2026",notes:""},{title:"Two birds",date:"May 19, 2026",notes:""},{title:"Fish",date:"June 17, 2026",notes:""},{title:"Black cat",date:"June 17, 2026",notes:""},{title:"Blue moon",date:"June 17, 2026",notes:""},{title:"Duck",date:"June 24, 2026",notes:""},{title:"Butterfly",date:"July 10, 2026",notes:""},{title:"Bug",date:"July 11, 2026",notes:""},{title:"Tiger",date:"July 22, 2026",notes:""},{title:"Hill",date:"August 09, 2026",notes:""},{title:"Swans' dance",date:"August 09, 2026",notes:""}];
var CAL_GALLERY=["assets/img/cal08.jpg","assets/img/cal10.jpg","assets/img/cal01.jpg","assets/img/cal02.jpg","assets/img/cal03.jpg","assets/img/cal04.jpg","assets/img/cal09.jpg","assets/img/cal05.jpg","assets/img/cal06.jpg"];
var CAL_INFO=[{title:"The cover",notes:"Year 2027 \u2013 Edition 01."},{title:"The letter",notes:"A note printed inside the calendar."},{title:"October on the wall",notes:"The tiger spread, hanging."},{title:"September on the wall",notes:"The beetle spread, hanging."},{title:"Spiral binding",notes:"Wire-o binding with a hanging notch."},{title:"November",notes:"The elephant, seen from the side."},{title:"March",notes:"The red horse and iris."},{title:"October on the desk",notes:"Lays flat next to your coffee."},{title:"September by the lamp",notes:"The beetle spread on a shelf."}];
var ORG_INFO=[{title:"",date:"",notes:""},{title:"",date:"",notes:""},{title:"",date:"",notes:""}];
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}
function calfig(src,info,alt){return '<figure><img src="'+src+'" alt="'+alt+'" loading="lazy"><figcaption class="type"><span>'+esc(info.title)+'</span><span>'+esc(info.notes)+'</span></figcaption></figure>'}
function fig(src,info,alt){info=info||{};function v(k){return info[k]&&String(info[k]).trim()?esc(info[k]):"-"}
  return '<figure><img src="'+src+'" alt="'+alt+'" loading="lazy"><figcaption class="type"><span>Title: '+v("title")+'</span><span>Date: '+v("date")+'</span><span>Notes: '+v("notes")+'</span></figcaption></figure>'}

/* ===== Rendering ===== */
var app=document.getElementById("app"),chips=document.getElementById("chips"),first=true,lastOrder=null;
function topic(id){return TOPICS.filter(function(t){return t.id===id})[0]}
function payUrl(t){return 'https://www.paypal.me/'+encodeURIComponent(CONFIG.paypalMe)+'/'+(Math.round(t*100)/100).toFixed(2).replace(/\.00$/,'')+CONFIG.currencyCode}
function money(n){return CONFIG.currency+(Math.round(n*100)/100).toFixed(2).replace(/\.00$/,"")}
var STONE="assets/img/stone.webp";
var STUDIO="assets/img/studio.jpg";
var DROPS={1:"assets/img/drop1.webp",2:"assets/img/drop2.webp"};
function renderChips(cur){
  chips.innerHTML=TOPICS.map(function(t,i){
    return '<a class="drop" href="#'+t.id+'"'+(t.id===cur?' aria-current="page"':'')+'><span class="gem"><img src="'+DROPS[i+1]+'" alt=""></span><span class="lbl">'+t.title+'</span></a>';
  }).join("");
}
function stone(){return '<img class="stone" src="'+STONE+'" alt="">'}

function home(){
    app.innerHTML='<div>'+
  '<section class="hero"><div class="wrap hero-grid"><div>'+
    '<p class="type" style="color:var(--muted);margin-bottom:20px">Calendar Series 01 · Year of 2027</p>'+
    '<h1>Art <mark>calendar</mark></h1>'+
    '<p class="lead"><strong>Twelve paintings, one calendar for 2027.</strong> Every page is one of my own paintings. Order yours, then have it shipped to your home or get it from me in person.</p>'+
    '<div class="actions"><a class="pill" href="#order">Order a print</a><a class="btn line" href="#art">See all paintings</a></div>'+
  '</div><div class="polwrap"><img class="studio" src="'+STUDIO+'" alt="Paintings and colour swatches in my studio">'+
    '<div class="sticker"><div><b>12</b><span>art<br>pages</span></div></div></div></div></section>'+

  '<section class="sec"><div class="wrap"><div class="prevcap"><p class="type galcap">A peek inside</p><a class="type" href="#art">All twelve →</a></div>'+
    '<div class="gallery prev">'+[1,9,7,2,11,4].map(function(n){var s=ART_GALLERY[n];return '<figure><a href="#art"><img src="'+s+'" alt="'+esc(ART_INFO[n].title)+'" loading="lazy"></a></figure>'}).join("")+'</div></div></section>'+

  '<section class="sec"><div class="wrap"><article class="letter sheet"><p class="type lh">Dear friend,</p>'+
    '<p>This series explores art as a way of navigating emotional uncertainty. When emotions resist clear naming or expression, visual language can give form to the intangible.</p>'+
    '<p>Through animals and abstract, graphic elements, emotions are translated into symbolic representations. What is difficult to articulate becomes perceptible, opening a space for reflection and understanding.</p>'+
    '<p class="type lh">Beauty lies in contrast and ambiguity.</p>'+
    '<p>This edition explores how emotions can become tangible without losing their complexity or having the goal to resolve their ambiguity. By balancing detailed perception with abstract form, the compositions invite you to embrace ambiguity as an essential part of that complexity, rather than searching for a definitive interpretation.</p>'+
    '<p class="lh sign">\u2013 Love, Sujin</p>'+
  '</article></div></section>'+
  '<section class="sec"><div class="wrap"><div class="ticket"><h2>Want one for your wall?</h2><a class="pill" href="#order">Order a print</a></div></div></section>'+
  stone()+'</div>';
}

function art(){
  app.innerHTML='<div><section class="sub"><div class="wrap">'+
    '<div class="crumb type"><a href="#home">Home</a><span>/</span><span>Art</span></div>'+
    '<div class="titlerow"><h1><mark>Art</mark></h1></div></div></section>'+
  '<section class="sec"><div class="wrap"><p class="type galcap">Calendar Series 01 / Year of 2027</p><div class="gallery">'+ART_GALLERY.map(function(src,n){return fig(src,ART_INFO[n],"Artwork "+(n+1))}).join("")+'</div></div></section>'+
  /* Organic row hidden for now: add it back here with ORG_GALLERY/ORG_INFO */
  '<section class="sec"><div class="wrap"><div class="ticket"><h2>Want one for your wall?</h2><a class="pill" href="#order">Order a print</a></div></div></section>'+
  stone()+'</div>';
}

function orderPage(){
  app.innerHTML='<div><section class="sub tight"><div class="wrap">'+
    '<div class="crumb type"><a href="#home">Home</a><span>/</span><span>Order</span></div>'+
    '<div class="titlerow"><h1><mark>Order</mark></h1></div>'+
    '</div></section>'+
  '<section class="sec"><div class="wrap"><p class="type galcap">The calendar \u00b7 Year of 2027</p><div class="gallery">'+CAL_GALLERY.map(function(src,n){return calfig(src,CAL_INFO[n],"Calendar photo "+(n+1))}).join("")+'</div></div></section>'+
  '<section class="sec" style="padding-top:0"><div class="wrap"><div class="specs"><p class="type galcap">Product details</p><ul class="type">'+
    '<li>300 gsm high-quality matte print (metal spiral, Wire-O binding)</li>'+
    '<li>Spiral colour: black</li>'+
    '<li>Width: 21.0 cm \u00d7 height: 14.8 cm</li>'+
    '<li>Monthly calendar, 15 sheets (12 months + 2 cover sheets + 1 closing sheet)</li>'+
  '</ul></div></div></section>'+
  '<section class="sec"><div class="wrap"><form class="order sheet" id="orderform" novalidate>'+
    '<div class="row2"><div class="field"><label for="f-first">First name</label><input type="text" id="f-first" name="first" autocomplete="given-name" required></div>'+
    '<div class="field"><label for="f-last">Last name</label><input type="text" id="f-last" name="last" autocomplete="family-name" required></div></div>'+
    '<div class="field"><label for="f-mail">Email</label><input type="email" id="f-mail" name="email" autocomplete="email" required></div>'+
    '<div class="field"><label for="f-qty">Quantity</label><input type="number" id="f-qty" name="qty" min="1" max="99" step="1" value="1" inputmode="numeric" required></div>'+
    '<fieldset class="field"><legend>Delivery</legend><div class="choices">'+
      '<label class="choice"><input type="radio" name="delivery" value="Receive it in person" checked><span class="ck"></span><span>Receive it in person<small>I\'ll hand it to you when we meet</small></span></label>'+
'<label class="choice"><input type="radio" name="delivery" value="Shipping to my home"><span class="ck"></span><span>Shipping to my home</span></label>'+
    '</div></fieldset>'+
    '<div id="addrbox"><div class="row2 r-street"><div class="field"><label for="f-street">Street</label><input type="text" id="f-street" name="street" autocomplete="address-line1"></div>'+
    '<div class="field"><label for="f-nr">House number</label><input type="text" id="f-nr" name="nr" autocomplete="off"></div></div>'+
    '<div class="row2 r-city"><div class="field"><label for="f-zip">Postcode</label><input type="text" id="f-zip" name="zip" autocomplete="postal-code" inputmode="numeric"></div>'+
    '<div class="field"><label for="f-city">City</label><input type="text" id="f-city" name="city" autocomplete="address-level2"></div></div>'+
    '<div class="field"><label for="f-country">Country</label><input type="text" id="f-country" name="country" autocomplete="country-name"></div></div>'+
    '<div class="total"><span class="type calc" id="calc"></span><span class="sum" id="sum"></span></div>'+
    '<div class="err" id="err" role="alert"></div>'+
    '<div class="formact"><button class="pill" type="submit">Place order</button><span class="type" style="color:var(--muted)">You pay after ordering.</span></div>'+
  '</form></div></section>'+stone()+'</div>';
  var f=document.getElementById("orderform");
  function upd(){
    var q=Math.max(0,Math.floor(Number(f.qty.value))||0);
    document.getElementById("calc").textContent=q+" × "+money(CONFIG.price);
    document.getElementById("sum").textContent=money(q*CONFIG.price);
    var ship=f.delivery.value==="Shipping to my home";
    document.getElementById("addrbox").hidden=!ship;
    ['street','nr','zip','city','country'].forEach(function(k){f[k].required=ship});
  }
  f.addEventListener("input",upd);f.addEventListener("change",upd);upd();
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var err=document.getElementById("err"),q=Math.floor(Number(f.qty.value)),ship=f.delivery.value==="Shipping to my home";
    var addrOk=!ship||['street','nr','zip','city','country'].every(function(k){return f[k].value.trim()});
    var m=!(f.first.value.trim()&&f.last.value.trim())?"Please enter your first and last name.":!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())?"Please enter a valid email.":!(q>=1&&q<=99)?"Quantity must be between 1 and 99.":!addrOk?"Please fill in all address fields.":"";
    if(m){err.textContent=m;return}
    err.textContent="";
    var o={first:f.first.value.trim(),last:f.last.value.trim(),name:f.first.value.trim()+" "+f.last.value.trim(),email:f.email.value.trim(),qty:q,delivery:f.delivery.value,address:ship?(f.street.value.trim()+" "+f.nr.value.trim()+", "+f.zip.value.trim()+" "+f.city.value.trim()+", "+f.country.value.trim()):"",street:f.street.value.trim(),nr:f.nr.value.trim(),zip:f.zip.value.trim(),city:f.city.value.trim(),country:f.country.value.trim(),total:q*CONFIG.price,date:new Date().toISOString().slice(0,10)};
    var btn=f.querySelector("button");btn.disabled=true;
    function done(){lastOrder=o;location.hash="#thanks"}
    if(!CONFIG.endpoint){done();return}
    fetch(CONFIG.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})
      .then(function(r){if(!r.ok)throw 0;done()})
      .catch(function(){btn.disabled=false;err.textContent="Sorry, your order could not be sent. Please try again or write to sujin.park@gmx.de."});
  });
}

function thanks(){
  var o=lastOrder;
  if(!o){location.hash="#order";return}
  app.innerHTML='<div><section class="sub"><div class="wrap">'+
    '<div class="crumb type"><a href="#home">Home</a><span>/</span><span>Thank you</span></div></div></section>'+
  '<section class="sec"><div class="wrap"><div class="thanks sheet"><h2>Thank you, '+esc(o.first)+'!</h2>'+
    '<p class="lead" style="margin-top:0">Your order is noted. One more step to make it final:</p>'+
    '<ol><li>Pay <strong>'+money(o.total)+'</strong> via PayPal.</li><li>I confirm your order by email once the payment has arrived.</li></ol>'+
    '<div class="recap type"><span>'+o.qty+' × Art calendar 2027</span><span>'+esc(o.delivery)+'</span>'+(o.address?'<span>'+esc(o.address).replace(/\n/g,", ")+'</span>':'')+'<span>Total: '+money(o.total)+'</span></div>'+
    '<div class="actions"><a class="pill" href="'+esc(payUrl(o.total))+'" target="_blank" rel="noopener">Pay with PayPal</a></div>'+
    '<p class="hint">I will confirm your order by email to '+esc(o.email)+'.<br><br>Questions? sujin.park@gmx.de</p>'+
  '</div></div></section>'+stone()+'</div>';
}

function route(){
  var h=(location.hash||"").replace("#","");
  if(h==="art"){art();renderChips("art")}
  else if(h==="order"){orderPage();renderChips("order")}
  else if(h==="thanks"){thanks();renderChips("")}
  else{home();renderChips("")}
  window.scrollTo(0,0);
  if(!first){app.classList.remove("flip");void app.offsetWidth;app.classList.add("flip")}
  first=false;
}
document.addEventListener("wheel",function(e){
  var g=e.target.closest&&e.target.closest(".gallery"); if(!g||Math.abs(e.deltaY)<=Math.abs(e.deltaX)) return;
  var max=g.scrollWidth-g.clientWidth, x=g.scrollLeft;
  if((e.deltaY>0&&x<max-1)||(e.deltaY<0&&x>1)){e.preventDefault();g.scrollLeft=x+e.deltaY}
},{passive:false});
window.addEventListener("hashchange",route);
route();

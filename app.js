// Word Garden: card-based English practice for young children.
// The word bank, levels, unlocking and star rules are the original game's; this file adds the
// Kolam UI, line icons, accessibility, native text-to-speech in the Android app and a few bug fixes.

// ---------- word bank (pictures are emoji so every word has a clear, consistent picture) ----------
const W3=[["cat","🐱"],["dog","🐶"],["sun","☀️"],["bus","🚌"],["hat","🎩"],["pig","🐷"],["cup","☕"],["bed","🛏️"],["egg","🥚"],["fox","🦊"],["ant","🐜"],["bee","🐝"],["owl","🦉"],["cow","🐮"],["key","🔑"],["box","📦"],["car","🚗"],["map","🗺️"],["bat","🦇"],["cap","🧢"],["web","🕸️"],["nut","🥜"],["pan","🍳"],["pen","🖊️"],["gem","💎"],["van","🚐"],["axe","🪓"],["ear","👂"],["hen","🐔"],["log","🪵"],["bag","👜"],["bow","🎀"],["leg","🦵"],["eye","👁️"],["pie","🥧"],["tea","🍵"],["ice","🧊"],["saw","🪚"]];
const W4=[["fish","🐟"],["frog","🐸"],["duck","🦆"],["cake","🍰"],["star","⭐"],["moon","🌙"],["tree","🌳"],["ship","🚢"],["lion","🦁"],["bear","🐻"],["milk","🥛"],["ball","⚽"],["boat","⛵"],["kite","🪁"],["rain","🌧️"],["book","📖"],["drum","🥁"],["sock","🧦"],["corn","🌽"],["bell","🔔"],["bone","🦴"],["crab","🦀"],["deer","🦌"],["gift","🎁"],["goat","🐐"],["rose","🌹"],["seal","🦭"],["tent","⛺"],["wolf","🐺"],["bird","🐦"],["door","🚪"],["shoe","👟"],["hand","✋"],["foot","🦶"],["nose","👃"],["king","🤴"],["ring","💍"],["leaf","🍃"],["bike","🚲"],["lock","🔒"],["taxi","🚕"],["pear","🍐"],["kiwi","🥝"],["dove","🕊️"],["coat","🧥"],["salt","🧂"],["snow","❄️"],["fire","🔥"],["wave","🌊"],["rock","🪨"],["sled","🛷"],["bowl","🥣"],["soap","🧼"],["worm","🪱"],["dice","🎲"],["flag","🚩"],["sofa","🛋️"],["swan","🦢"],["yarn","🧶"],["taco","🌮"],["bulb","💡"],["vest","🦺"],["soup","🍲"],["lips","👄"]];
const W5=[["apple","🍎"],["house","🏠"],["horse","🐴"],["grape","🍇"],["train","🚆"],["snake","🐍"],["tiger","🐯"],["zebra","🦓"],["clock","⏰"],["bread","🍞"],["chair","🪑"],["whale","🐳"],["pizza","🍕"],["robot","🤖"],["camel","🐫"],["crown","👑"],["ghost","👻"],["koala","🐨"],["lemon","🍋"],["panda","🐼"],["piano","🎹"],["shark","🦈"],["snail","🐌"],["tulip","🌷"],["sheep","🐑"],["mouse","🐭"],["juice","🧃"],["heart","❤️"],["cloud","☁️"],["plane","✈️"],["truck","🚚"],["shell","🐚"],["squid","🦑"],["sloth","🦥"],["otter","🦦"],["eagle","🦅"],["llama","🦙"],["salad","🥗"],["mango","🥭"],["scarf","🧣"],["peach","🍑"],["onion","🧅"],["candy","🍬"],["chick","🐤"],["dress","👗"],["shirt","👕"],["torch","🔦"],["ruler","📏"],["bacon","🥓"],["sushi","🍣"],["spoon","🥄"],["olive","🫒"],["tooth","🦷"],["watch","⌚"],["phone","📱"],["fries","🍟"],["globe","🌍"],["daisy","🌼"],["queen","👸"]];
const BY_LEN={3:W3,4:W4,5:W5};
const SENT=[
 {s:"The sun is ___.",a:"hot",o:["cold","wet","sad"],e:"☀️"},
 {s:"A fish can ___.",a:"swim",o:["fly","read","sing"],e:"🐟"},
 {s:"I drink ___.",a:"milk",o:["shoes","rocks","socks"],e:"🥛"},
 {s:"Birds can ___.",a:"fly",o:["bark","cook","read"],e:"🐦"},
 {s:"I sleep in a ___.",a:"bed",o:["cup","car","shoe"],e:"🛏️"},
 {s:"Snow is ___.",a:"cold",o:["hot","loud","sweet"],e:"❄️"},
 {s:"A cow says ___.",a:"moo",o:["woof","meow","quack"],e:"🐮"},
 {s:"I read a ___.",a:"book",o:["shoe","cake","fish"],e:"📖"},
 {s:"A dog says ___.",a:"woof",o:["moo","quack","baa"],e:"🐶"},
 {s:"I brush my ___.",a:"teeth",o:["shoes","cake","bus"],e:"🪥"},
 {s:"Bananas are ___.",a:"yellow",o:["blue","black","pink"],e:"🍌"},
 {s:"The grass is ___.",a:"green",o:["red","purple","orange"],e:"🌱"},
 {s:"A duck says ___.",a:"quack",o:["moo","woof","oink"],e:"🦆"},
 {s:"I wear a ___ on my head.",a:"hat",o:["sock","shoe","glove"],e:"🎩"},
 {s:"We see with our ___.",a:"eyes",o:["ears","feet","hands"],e:"👁️"},
 {s:"A frog can ___.",a:"jump",o:["read","cook","drive"],e:"🐸"},
 {s:"Ice cream is ___.",a:"sweet",o:["loud","sad","tall"],e:"🍦"},
 {s:"At night I see the ___.",a:"moon",o:["sun","rainbow","bus"],e:"🌙"},
 {s:"A bee makes ___.",a:"honey",o:["milk","bread","juice"],e:"🐝"},
 {s:"I eat soup with a ___.",a:"spoon",o:["shoe","hat","ball"],e:"🥣"}];
// [word, opposite, picture, picture of the opposite, words that must not be offered as wrong choices]
const OPP=[["big","small","🐘","🐭",["short"]],["hot","cold","🔥","🧊"],["up","down","⬆️","⬇️"],["happy","sad","😀","😢"],["fast","slow","🐇","🐢"],
 ["day","night","☀️","🌙"],["wet","dry","💧","🏜️"],["tall","short","🦒","🐭",["small"]],["old","young","👴","👶"],["loud","quiet","📢","🤫",["soft"]],
 ["hard","soft","🪨","🧸",["quiet"]],["left","right","⬅️","➡️"],["sweet","sour","🍬","🍋"],["awake","asleep","😃","😴"],["open","closed","🔓","🔒"]];
const RHY=[["cat","hat","🐱","🎩"],["bee","tree","🐝","🌳"],["cake","lake","🍰","🏞️"],["moon","spoon","🌙","🥄"],["star","car","⭐","🚗"],
 ["fox","box","🦊","📦"],["king","ring","🤴","💍"],["bug","mug","🐞","☕"],["frog","log","🐸","🪵"],["goat","boat","🐐","⛵"],
 ["mouse","house","🐭","🏠"],["bear","chair","🐻","🪑"],["sock","clock","🧦","⏰"],["bell","shell","🔔","🐚"],["fish","dish","🐟","🍽️"]];

// ---------- line icons (Kolam style: 24px grid, 2px stroke) ----------
const ICON={
  seedling:'<path d="M12 21v-7"/><path d="M12 14c0-4.4-3-7-7.5-7 0 4.4 3 7 7.5 7z"/><path d="M12 12c0-3.9 2.6-6.5 7-6.5 0 4-2.8 6.5-7 6.5z"/>',
  sprout:'<path d="M12 21V8"/><path d="M12 8C12 4.7 9.5 3 6 3c0 3.3 2.5 5 6 5z"/><path d="M12 13.5c0-3 2.4-5 6.5-5 0 3.2-2.6 5-6.5 5z"/><path d="M12 16.5c0-2.4-2-4-5-4 0 2.5 2 4 5 4z"/><path d="M7 21h10"/>',
  sunflower:'<circle cx="12" cy="8" r="2.6"/><path d="M12 2.4v1.4M12 12.2v1.4M6.4 8H5M19 8h-1.4M8 4l1 1M15 11l1 1M8 12l1-1M15 5l1-1"/><path d="M12 13.6V22"/><path d="M12 19c-1.8-2-3.8-2.4-5.6-1.6 1.4 1.8 3.4 2.4 5.6 1.6z"/>',
  tree:'<path d="M12 22v-6"/><path d="M9 19l3-3 3 3"/><path d="M12 16H7.5a4 4 0 0 1-1.3-7.8A5.8 5.8 0 0 1 12 3a5.8 5.8 0 0 1 5.8 5.2A4 4 0 0 1 16.5 16H12z"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  unlock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.7-1.5"/>',
  speaker:'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  mute:'<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="m16 9 6 6M22 9l-6 6"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M16 6h3a3 3 0 0 1-3 4M8 6H5a3 3 0 0 0 3 4"/><path d="M12 13v4M8 21h8M9 17h6v4H9z"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  next:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  undo:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  replay:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
};
// Card pictures: Microsoft Fluent Emoji 3D (MIT), one PNG per emoji in img/, named by code points without FE0F.
const artSrc=e=>"img/u"+[...e.replace(/\uFE0F/g,"")].map(c=>c.codePointAt(0).toString(16)).join("-")+".png";
const art=(e,cls="")=>`<img class="art ${cls}" src="${artSrc(e)}" alt="" draggable="false" onerror="this.replaceWith(document.createTextNode('${e}'))">`;
// Every screen except the map itself has the same labelled Home button (Esc also goes home).
const homeBtn=id=>`<button class="k-btn k-btn-outline chunky homebtn" id="${id}" title="Back to the level map (Esc)">${art("🏠")}Home</button>`;
const levelPic=L=>L.words?L.words[0][1]:L.type==="sent"?L.items[0].e:L.items[0][2];
const ic=(n,cls="k-icon")=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
const STAR='<path d="M12 2.8l2.8 5.7 6.3.9-4.55 4.4 1.07 6.25L12 17.1l-5.62 2.95 1.07-6.25L2.9 9.4l6.3-.9z"/>';
const oneStar=`<svg class="star on" viewBox="0 0 24 24" aria-hidden="true">${STAR}</svg>`;
const starRow=(s,cls="star")=>[1,2,3].map(i=>`<svg class="${cls}${i<=s?" on":""}" viewBox="0 0 24 24" aria-hidden="true">${STAR}</svg>`).join("");

const TIERS=[
 {name:"Seedling",icon:"seedling",e:"🌱",skill:"Match the picture to its word"},
 {name:"Sprout",icon:"sprout",e:"🌿",skill:"Find the missing letter"},
 {name:"Sunflower",icon:"sunflower",e:"🌻",skill:"Spell the whole word"},
 {name:"Big Tree",icon:"tree",e:"🌳",skill:"Sentences, opposites and rhymes"}];
// 4 stages × 10 levels, 5 cards each. Difficulty rises inside every stage.
const PER_STAGE=10, PER_LEVEL=5;
const CHOICES=[2,2,3,3,3,3,4,4,4,4], DECOYS=[0,0,0,1,1,1,2,2,2,3], BIG_CHOICES=[3,3,3,3,4,4,4,4,4,4];
// Deal each length group round-robin into the three word stages, so every stage runs from short to long words
// and each level asks its own fixed words: no word is a question in two levels.
const STAGE_WORDS=[[],[],[]];
[W3,W4,W5].forEach(g=>g.forEach((w,i)=>STAGE_WORDS[i%3].push(w)));
const LEVELS=[];
["pick","miss","spell"].forEach((type,s)=>{for(let k=0;k<PER_STAGE;k++)LEVELS.push({type,words:STAGE_WORDS[s].slice(k*PER_LEVEL,(k+1)*PER_LEVEL),count:PER_LEVEL,opts:CHOICES[k],extra:DECOYS[k]})});
// Big Tree: 20 sentences, then 15 opposites, then 15 rhymes, 5 per level.
const BIG=[...SENT.map(x=>["sent",x]),...OPP.map(x=>["opp",x]),...RHY.map(x=>["rhy",x])];
for(let k=0;k<PER_STAGE;k++){const it=BIG.slice(k*PER_LEVEL,(k+1)*PER_LEVEL);LEVELS.push({type:it[0][0],items:it.map(x=>x[1]),count:PER_LEVEL,opts:BIG_CHOICES[k]})}
// Dev-time check (localhost only): every level is full, of one card type, and no question is asked in two levels.
function checkLevels(){
  const seen=new Map(), problems=[];
  LEVELS.forEach((L,i)=>{
    const qs=L.words?L.words.map(w=>"word:"+w[0]):L.items.map(x=>L.type+":"+(L.type==="sent"?x.s:x[0]));
    if(qs.length!==L.count)problems.push(`level ${i+1} has ${qs.length} of ${L.count} cards`);
    if(L.items&&!L.items.every(x=>BIG.find(b=>b[1]===x)[0]===L.type))problems.push(`level ${i+1} mixes card types`);
    qs.forEach(q=>{if(seen.has(q))problems.push(`${q} is asked in level ${seen.get(q)} and level ${i+1}`);seen.set(q,i+1)});
  });
  return problems;
}
if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){const p=checkLevels();if(p.length)console.error("Word Garden levels:",p)}
const ALPHA="abcdefghijklmnoprstuwy";

// ---------- helpers ----------
const $=s=>document.querySelector(s);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
// The Android app's WebView has no speechSynthesis, so the shell's native text-to-speech plugin reads the words there.
const NATIVE_TTS=window.Capacitor?.isNativePlatform?.()?window.Capacitor.Plugins?.TextToSpeech:null;
let voice=null;
function pickVoice(){try{const v=speechSynthesis.getVoices();voice=v.find(x=>x.lang==="en-US"&&/samantha|google us/i.test(x.name))||v.find(x=>x.lang==="en-US")||v.find(x=>x.lang.startsWith("en"))||null}catch(e){}}
if("speechSynthesis" in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function say(t){
  if(NATIVE_TTS){NATIVE_TTS.stop().catch(()=>{}).then(()=>NATIVE_TTS.speak({text:t,lang:"en-US",rate:.85})).catch(()=>{});return}
  try{const u=new SpeechSynthesisUtterance(t);u.rate=.8;u.lang="en-US";if(voice)u.voice=voice;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}
}
function hush(){try{NATIVE_TTS?NATIVE_TTS.stop().catch(()=>{}):speechSynthesis.cancel()}catch(e){}}
// ---------- sound effects (Web Audio, no files) ----------
// Right: a rising triangle chime C5-E5-G5-C6. Wrong: a soft low sawtooth "uh-oh". The toggle mutes these only, not the spoken word.
let AC=null;
const soundOn=()=>P.sound!==false;
function unlockAudio(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume()}catch(e){}}
function tone(f,at,dur,type,vol){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,at);g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(vol,at+.015);g.gain.exponentialRampToValueAtTime(.0001,at+dur);o.connect(g).connect(AC.destination);o.start(at);o.stop(at+dur+.05)}
function sfx(kind){if(!soundOn())return;try{unlockAudio();const t=AC.currentTime+.01;
  if(kind==="right")[523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,t+i*.08,.32,"triangle",.22));
  else{tone(196,t,.14,"sawtooth",.07);tone(147,t+.13,.26,"sawtooth",.07)}}catch(e){}}
// Browsers only start audio after a gesture; unlock on the first tap or key so the delayed spelling result can still play.
document.addEventListener("pointerdown",unlockAudio);
document.addEventListener("keydown",unlockAudio);
const announce=t=>{const n=$("#say");n.textContent="";setTimeout(()=>n.textContent=t,30)};
const KEY="word-garden-v2"; // v2: 40 levels (v1 had 12 with different numbering)
function load(){try{const p=JSON.parse(localStorage.getItem(KEY));return p&&p.stars?p:{stars:{}}}catch(e){return{stars:{}}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}
let P=load();
const finished=()=>Object.keys(P.stars).length;
const unlockedUpTo=()=>{let n=1;while(P.stars[n])n++;return Math.min(n,LEVELS.length)};
const totalStars=()=>Object.values(P.stars).reduce((a,b)=>a+b,0);
const tierOf=lv=>Math.floor((lv-1)/PER_STAGE);
const LOGO='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+ICON.seedling+'</svg>';

// ---------- home ----------
let confirmReset=false;
function home(focusSel){
  stopAdvance();G=null;hush();
  const next=unlockedUpTo(), done=finished(), t=TIERS[tierOf(next)];
  const allDone=done>=LEVELS.length;
  let h=`<div class="top"><h1 class="brand">${LOGO}Word <span>Garden</span></h1><div class="topr"><div class="pill" role="img" aria-label="${totalStars()} of ${LEVELS.length*3} stars">${oneStar} ${totalStars()} / ${LEVELS.length*3}</div><button class="k-btn k-btn-outline k-btn-sm soundbtn" id="snd" aria-pressed="${soundOn()}">${ic(soundOn()?"speaker":"mute","k-icon sm")}Sound ${soundOn()?"on":"off"}</button></div></div>
  <p class="hello">${done?`You finished ${done} level${done>1?"s":""}. Your garden is growing!`:"Hi! Let’s grow your first words."}</p>
  <div class="now"><span class="badge">${art(allDone?"🏆":t.e)}</span><div><small>${allDone?"Every level finished":"Your difficulty now"}</small><b>${allDone?"Word Master!":`${t.name} · Level ${next}`}</b><small>${allDone?"Replay any level to collect more stars":t.skill}</small></div>
  <button class="k-btn k-btn-primary k-btn-lg chunky go" data-play="${allDone?1:next}">${allDone?"Play again":"Play level "+next}${ic("next")}</button></div><div class="home-grid">`;
  TIERS.forEach((tr,ti)=>{
    h+=`<section class="tier" aria-labelledby="tier${ti}"><h2 id="tier${ti}"><span class="ti">${art(tr.e)}</span>${tr.name} <em>${tr.skill}</em></h2><div class="levels">`;
    for(let k=1;k<=PER_STAGE;k++){
      const lv=ti*PER_STAGE+k, s=P.stars[lv]||0, locked=lv>next, isNext=lv===next&&!P.stars[lv];
      h+=`<button class="lv${isNext?" next":""}" data-play="${lv}" ${locked?"disabled":""} aria-label="Level ${lv}${locked?", locked":s?`, ${s} star${s>1?"s":""}`:isNext?", play next":""}">
        <span class="n">${lv}</span>${locked?`<span class="lk">${ic("lock")}</span>`:""}<span class="thumb">${art(levelPic(LEVELS[lv-1]))}</span>
        <div class="st">${starRow(s)}</div></button>`;
    }
    h+=`</div></section>`;
  });
  h+=`</div><div class="foot">${confirmReset?`<div class="confirm" role="group" aria-label="Start over">Start over? All stars will be cleared. <button class="k-btn k-btn-outline k-btn-sm" id="no">Keep my stars</button><button class="k-btn k-btn-danger k-btn-sm" id="yes">Clear progress</button></div>`:`<button class="linkbtn" id="reset">Start over</button>`}</div>
  <p class="credit">Progress stays on this device. Words are read aloud by the device’s own voice.</p>`;
  $("#app").innerHTML=h;
  document.querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>start(+b.dataset.play));
  $("#snd").onclick=()=>{P.sound=!soundOn();save();if(P.sound){unlockAudio();sfx("right")}home("#snd");announce(P.sound?"Sound on":"Sound off")};
  const r=$("#reset");if(r)r.onclick=()=>{confirmReset=true;home("#no")};
  const y=$("#yes");if(y)y.onclick=()=>{P={stars:{},sound:P.sound};save();confirmReset=false;home("#reset");announce("Progress cleared")};
  const n=$("#no");if(n)n.onclick=()=>{confirmReset=false;home("#reset")};
  if(focusSel&&$(focusSel))$(focusSel).focus();
}

// ---------- build cards ----------
const picFront=(e,sm)=>`<div class="pic${sm?" sm":""}" role="img" aria-label="Picture clue">${art(e)}</div>`;
function buildCards(L){
  if(L.type==="sent")return shuffle(L.items).map(x=>({kind:"choice",prompt:`${picFront(x.e,1)}<div class="sentence">${x.s.replace("___",'<span class="blank" aria-label="blank">?</span>')}</div>`,ask:"Finish the sentence",answer:x.a,opts:shuffle([x.a,...sample(x.o,L.opts-1)]),back:x.e,backWord:x.s.replace("___",x.a)}));
  if(L.type==="opp")return shuffle(L.items).map(x=>({kind:"choice",ask:"What is the opposite?",prompt:`${picFront(x[2],1)}<div class="word">${x[0]}</div>`,answer:x[1],opts:shuffle([x[1],...sample(OPP.filter(o=>o!==x&&!(x[4]||[]).includes(o[1])).map(o=>o[1]),L.opts-1)]),back:x[3],backWord:x[1],sayExtra:`${x[0]} and ${x[1]}`}));
  if(L.type==="rhy")return shuffle(L.items).map(x=>({kind:"choice",ask:"Which word rhymes?",prompt:`${picFront(x[2],1)}<div class="word">${x[0]}</div>`,answer:x[1],opts:shuffle([x[1],...sample(RHY.filter(o=>o!==x).map(o=>o[1]),L.opts-1)]),back:x[3],backWord:x[1],sayExtra:`${x[0]}, ${x[1]}`}));
  return shuffle(L.words).map(([w,e])=>{
    // Wrong picture choices come from words of the same length, which makes them harder to rule out.
    if(L.type==="pick")return{kind:"choice",ask:"Which word is this?",prompt:picFront(e),answer:w,opts:shuffle([w,...sample(BY_LEN[w.length].filter(p=>p[0]!==w).map(p=>p[0]),L.opts-1)]),back:e,backWord:w};
    if(L.type==="miss"){const i=Math.floor(Math.random()*w.length),c=w[i];
      return{kind:"choice",letter:true,ask:"Which letter is missing?",prompt:`${picFront(e)}<div class="word" aria-label="${w.slice(0,i).split("").join(" ")} blank ${w.slice(i+1).split("").join(" ")}">${w.slice(0,i)}<span class="blank">_</span>${w.slice(i+1)}</div>`,answer:c,opts:shuffle([c,...sample([...ALPHA].filter(a=>a!==c),L.opts-1)]),back:e,backWord:w}}
    return{kind:"spell",ask:"Spell the word",prompt:picFront(e),answer:w,tiles:shuffle([...w,...sample([...ALPHA].filter(a=>!w.includes(a)),L.extra)]),back:e,backWord:w};
  });
}

// ---------- play ----------
let G=null;
function start(lv){confirmReset=false;const L=LEVELS[lv-1];G={lv,L,cards:buildCards(L),i:0,miss:0};renderCard()}
function header(){
  const pct=G.i/G.cards.length*100, t=TIERS[tierOf(G.lv)], L=G.L;
  const diff=L.type==="spell"?`${L.extra?L.extra+" decoy letter"+(L.extra>1?"s":""):"No decoys"}`:L.opts?`${L.opts} choices`:"";
  return `<div class="bar">${homeBtn("quit")}<div class="k-progress-track" role="progressbar" aria-label="Cards done" aria-valuemin="0" aria-valuemax="${G.cards.length}" aria-valuenow="${G.i}"><div class="k-progress-fill" style="width:${pct}%"></div></div><div class="count" aria-label="Card ${G.i+1} of ${G.cards.length}">${G.i+1}/${G.cards.length}</div></div>
  <div class="meta"><span class="k-badge k-badge-pill k-badge-primary">Level ${G.lv}</span><span class="k-badge k-badge-pill">${ic(t.icon,"k-icon")} ${t.name}</span><span class="k-badge k-badge-pill">${G.cards.length} cards</span>${diff?`<span class="k-badge k-badge-pill">${diff}</span>`:""}</div>`;
}
let keyHandler=null, advance=null;
const WAIT=2000; // after a right answer, move on by itself after 2 s (Next skips the wait)
function stopAdvance(){if(advance){clearTimeout(advance);advance=null}}
function goNext(){stopAdvance();if(!G)return;G.i++;G.i<G.cards.length?renderCard():finish()}
const CHEERS=["Great job!","Super!","You got it!","Awesome!","Well done!"];
function renderCard(){
  stopAdvance();
  const c=G.cards[G.i], last=G.i===G.cards.length-1;
  let body=`<h1 class="ask" id="ask" tabindex="-1">${c.ask}</h1>${c.prompt}`;
  if(c.kind==="choice"){
    body+=`<div class="opts${c.opts.length===3?" n3":""}" role="group" aria-labelledby="ask">${c.opts.map(o=>`<button class="opt${c.letter?" letter":""}" data-o="${o}">${o}</button>`).join("")}</div>`;
  }else{
    body+=`<div class="slots" id="slots" role="status" aria-label="Your word so far">${[...c.answer].map(()=>`<div class="slot"></div>`).join("")}</div>
    <div class="tiles" id="tiles" role="group" aria-label="Letter tiles">${c.tiles.map((t,i)=>`<button class="tile" data-t="${i}">${t}</button>`).join("")}</div><button class="k-btn k-btn-ghost k-btn-sm undo" id="undo">${ic("undo","k-icon sm")}Undo</button>`;
  }
  body+=`<div class="done" id="done" hidden><button class="k-btn k-btn-secondary hear" id="hear">${ic("speaker","k-icon sm")}Hear it</button><button class="k-btn k-btn-primary k-btn-lg chunky nextcard" id="next"><span class="tick" aria-hidden="true"></span>${last?"Finish level":"Next card"}${ic("next")}</button></div>`;
  $("#app").innerHTML=header()+`<div class="deck${last?" last":""}"><div class="card" id="card">${body}</div></div>`;
  $("#quit").onclick=()=>home();
  $("#hear").onclick=()=>say(c.sayExtra||c.backWord);
  $("#next").onclick=goNext;
  const card=$("#card");
  let solved=false;
  const wrong=el=>{G.miss++;sfx("wrong");card.classList.remove("shake");void card.offsetWidth;card.classList.add("shake");if(el){el.classList.add("wrong");el.setAttribute("aria-disabled","true");el.setAttribute("aria-label",`${el.textContent}, not this one`)}announce("Not quite. Try again.")};
  const right=el=>{
    if(solved)return;solved=true;keyHandler=null;
    card.classList.remove("shake");card.classList.add("solved");
    $("#ask").textContent=CHEERS[G.i%5];
    // Show the completed answer where the question was.
    const blank=card.querySelector(".blank");
    if(blank){blank.textContent=c.answer;blank.classList.add("filled");blank.removeAttribute("aria-label");const w=blank.closest(".word");if(w)w.setAttribute("aria-label",c.backWord)}
    if(c.kind==="choice"){card.querySelectorAll(".opt").forEach(b=>{b.disabled=true;if(b===el)b.classList.add("right")})}
    else{card.querySelectorAll(".slot").forEach(s=>s.classList.add("ok"));$("#slots").setAttribute("aria-label","You spelled "+c.answer);$("#tiles").hidden=true;$("#undo").hidden=true}
    const done=$("#done"), next=$("#next");done.hidden=false;
    sfx("right");
    const spoken=c;setTimeout(()=>{if(G&&G.cards[G.i]===spoken)say(c.sayExtra||c.backWord)},450); // after the chime
    announce(`Correct! ${c.backWord}. ${last?"Finishing the level":"Next card"} in ${WAIT/1000} seconds.`);
    next.focus({preventScroll:true});
    next.style.setProperty("--wait",WAIT+"ms");void next.offsetWidth;next.classList.add("counting");
    const here=G;advance=setTimeout(()=>{advance=null;if(G===here&&G.cards[G.i]===c)goNext()},WAIT);
  };
  keyHandler=null;
  if(c.kind==="choice"){
    document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(solved||b.classList.contains("wrong"))return;b.dataset.o===c.answer?right(b):wrong(b)});
  }else{
    let typed=[], busy=false;
    const slots=[...document.querySelectorAll(".slot")], tiles=[...document.querySelectorAll(".tile")];
    const draw=()=>{slots.forEach((s,i)=>{const t=typed[i];s.textContent=t!=null?c.tiles[t]:"";s.classList.toggle("full",t!=null)});$("#slots").setAttribute("aria-label",typed.length?"Your word so far: "+typed.map(t=>c.tiles[t]).join(" "):"No letters yet")};
    const place=i=>{
      // Ignore taps while a full word is being checked (fixes extra letters slipping in during the check).
      if(busy||solved||typed.length>=c.answer.length||tiles[i].disabled)return;
      typed.push(i);tiles[i].disabled=true;draw();
      if(typed.length===c.answer.length){
        busy=true;
        if(typed.map(t=>c.tiles[t]).join("")===c.answer)setTimeout(right,250);
        else setTimeout(()=>{wrong();typed=[];tiles.forEach(t=>t.disabled=false);draw();busy=false;tiles[0].focus()},350);
      }else{const nx=tiles.find(t=>!t.disabled);if(document.activeElement===document.body&&nx)nx.focus()}
    };
    tiles.forEach((b,i)=>b.onclick=()=>place(i));
    const undo=()=>{if(busy||solved)return;const t=typed.pop();if(t!=null){tiles[t].disabled=false;draw()}};
    $("#undo").onclick=undo;
    // Keyboard: type the letters, Backspace to undo.
    keyHandler=e=>{
      if(solved||e.metaKey||e.ctrlKey||e.altKey)return;
      if(e.key==="Backspace"){e.preventDefault();undo();return}
      const k=e.key.toLowerCase();if(k.length!==1)return;
      const i=tiles.findIndex((t,j)=>!t.disabled&&c.tiles[j]===k);if(i>=0)place(i);
    };
  }
  $("#ask").focus({preventScroll:true});
}
addEventListener("keydown",e=>{if(e.key==="Escape"&&G){home();return}if(keyHandler&&G)keyHandler(e)});
function finish(){
  stopAdvance();keyHandler=null;
  const s=G.miss===0?3:G.miss<=2?2:1, lv=G.lv, wasNew=!P.stars[lv];
  P.stars[lv]=Math.max(P.stars[lv]||0,s);save();
  const nextLv=lv+1, hasNext=nextLv<=LEVELS.length, newTier=hasNext&&tierOf(nextLv)!==tierOf(lv);
  const t=hasNext?TIERS[tierOf(nextLv)]:null, miss=G.miss;
  G=null;
  $("#app").innerHTML=`<div class="result"><div class="stars" role="img" aria-label="${s} of 3 stars">${starRow(s)}</div>
  <h1 id="done" tabindex="-1">Level ${lv} done!</h1><p>${miss===0?"Perfect, not a single slip!":`You found every answer, with ${miss} slip${miss>1?"s":""} along the way.`}${s<3?" A perfect round earns 3 stars.":""}</p>
  ${hasNext&&wasNew?`<div class="unlock">${newTier?`${art(t.e)}<span>New difficulty unlocked: <b>${t.name}</b><br>${t.skill}</span>`:`${ic("unlock")}<span>Level ${nextLv} is open. It’s a little harder!</span>`}</div>`:""}
  ${!hasNext?`<div class="unlock">${art("🏆")}<span>You finished the whole garden!</span></div>`:""}
  <div class="row">${s<3?`<button class="k-btn k-btn-outline chunky" id="again">${ic("replay","k-icon sm")}Try for 3 stars</button>`:""}${hasNext?`<button class="k-btn k-btn-primary chunky" id="go">Level ${nextLv}${ic("next","k-icon sm")}</button>`:""}${homeBtn("map")}</div></div>`;
  const a=$("#again");if(a)a.onclick=()=>start(lv);
  const g=$("#go");if(g)g.onclick=()=>start(nextLv);
  $("#map").onclick=()=>home();
  $("#done").focus();
  announce(`Level ${lv} done. ${s} star${s>1?"s":""}.`);
}
home();

// Plays every card of all 40 levels in headless Chrome and reports problems:
//   node tools/check.mjs [width=375] [pictures=photos|cartoons]
// Checks: checkLevels() (full levels, no repeated questions), every card can be solved, no broken
// pictures (img.art with naturalWidth 0), nothing wider than the screen, and the map tiles fit.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const W = +process.argv[2] || 375, PICS = process.argv[3] || 'photos';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tmp = fs.mkdtempSync(path.join(ROOT, '.check-'));
const port = 5900 + Math.floor(Math.random() * 90), dbg = port + 1000;
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', ROOT], { stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${dbg}`, `--user-data-dir=${tmp}/p`, 'about:blank'], { stdio: 'ignore' });
try {
  let ws;
  for (let i = 0; i < 60 && !ws; i++) { try { const p = (await (await fetch(`http://127.0.0.1:${dbg}/json`)).json()).find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {} if (!ws) await sleep(250); }
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {};
  ws.onmessage = e => { const m = JSON.parse(e.data); if (pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: 812, deviceScaleFactor: 1, mobile: W < 600 });
  await send('Page.navigate', { url: `http://localhost:${port}/index.html` }); await sleep(1500);
  await send('Runtime.evaluate', { expression: `localStorage.setItem('word-garden-v2', JSON.stringify({stars:{}, pics:'${PICS}', sound:false})); location.reload()` }); await sleep(2500);
  const expr = `(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const hov=el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+0.5||r.left<-0.5};
  const ld=async root=>{const im=[...root.querySelectorAll('img.art')];await Promise.all(im.map(i=>i.complete?0:new Promise(r=>{i.addEventListener('load',r);i.addEventListener('error',r)})));await wait(30);return [...root.querySelectorAll('img.art')]};
  const bad=[];let maxH=0,cards=0,photos=0,horiz=[],errs=checkLevels();
  for(let lv=1;lv<=40;lv++){start(lv);
   while(G&&G.lv===lv){const c=G.cards[G.i];const card=$('#card');
    (await ld(card)).forEach(i=>{if(i.naturalWidth===0)bad.push(lv+':'+i.src.split('/').pop());if(i.classList.contains('photo'))photos++});
    if(c.kind==='choice'){[...document.querySelectorAll('.opt')].find(b=>b.dataset.o===c.answer).click()}
    else{const t=[...document.querySelectorAll('.tile')];const used=new Set();for(const ch of c.answer){const i=c.tiles.findIndex((x,j)=>x===ch&&!used.has(j));used.add(i);t[i].click()}await wait(300)}
    if(!card.classList.contains('solved'))errs.push('unsolved L'+lv);
    maxH=Math.max(maxH,card.offsetHeight);if([...card.querySelectorAll('*')].some(hov))horiz.push(lv);cards++;
    $('#next').click()}}
  const all={};for(let i=1;i<=40;i++)all[i]=3;P.stars=all;home();const tim=await ld(document);
  return JSON.stringify({pics:P.pics,width:innerWidth,cards,photosOnCards:photos,broken:bad,maxCardH:maxH,overflowLevels:horiz,errors:errs,mapImages:tim.length,mapPhotos:tim.filter(i=>i.classList.contains('photo')).length,mapBroken:tim.filter(i=>i.naturalWidth===0).length,pageOverflow:document.documentElement.scrollWidth>innerWidth,tileOverflow:[...document.querySelectorAll('.lv')].filter(t=>t.scrollWidth>t.clientWidth+1||t.scrollHeight>t.clientHeight+1).length})})()`;
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  console.log(r.result.result.value || JSON.stringify(r.result));
  ws.close();
} finally {
  chrome.kill(); server.kill(); await sleep(800);
  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

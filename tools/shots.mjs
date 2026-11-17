// Captures the screenshots used on the portfolio card: node tools/shots.mjs
// Phone shots: 600-wide JPEGs in prototype/shots. Desktop shot: prototype/shots/web.jpg (1440×900).
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const SHOTS = path.join(ROOT, 'prototype', 'shots');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// A child part-way through the garden: Seedling done, two Sprout levels done, Sprout level 13 up next.
const stars = n => ({ stars: Object.fromEntries(Array.from({ length: n }, (_, i) => [i + 1, [3, 3, 2, 3, 2, 3, 3, 1, 3, 3][i % 10]])) });
const me = { name: 'Asha', avatar: '🦊', cheer: 'cheerful', sound: true };
const seed = { ...stars(12), ...me }, later = { ...stars(30), ...me };

fs.mkdirSync(SHOTS, { recursive: true });
const tmp = fs.mkdtempSync(path.join(ROOT, '.shots-'));
const port = 5700 + Math.floor(Math.random() * 200), dbg = port + 1000;
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', ROOT], { stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${dbg}`, `--user-data-dir=${tmp}/profile`, 'about:blank'], { stdio: 'ignore' });
try {
  let ws;
  for (let i = 0; i < 60 && !ws; i++) {
    try { const p = (await (await fetch(`http://127.0.0.1:${dbg}/json`)).json()).find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {}
    if (!ws) await sleep(250);
  }
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = {};
  ws.onmessage = e => { const m = JSON.parse(e.data); if (pending[m.id]) { pending[m.id](m); delete pending[m.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const origin = `http://127.0.0.1:${port}`;
  await send('Page.enable');
  // Fixed random numbers so every run picks the same cards.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: 'let __s=7;Math.random=()=>{__s=(__s*16807)%2147483647;return (__s-1)/2147483646};' });
  const phone = () => send('Emulation.setDeviceMetricsOverride', { width: 390, height: 849, deviceScaleFactor: 2, mobile: true });
  const grab = async (file, { state = seed, js, width = 600, dark = false } = {}) => {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
    await send('Page.navigate', { url: `${origin}/index.html` }); await sleep(1000);
    await send('Runtime.evaluate', { expression: `localStorage.clear(); localStorage.setItem('word-garden-v2', ${JSON.stringify(JSON.stringify(state))})` });
    await send('Page.navigate', { url: `${origin}/index.html?shot=${file}` }); await sleep(2200);
    if (js) { await send('Runtime.evaluate', { expression: `speechSynthesis.speak=()=>{};(async()=>{${js}})()`, awaitPromise: true }); await sleep(1500); }
    const s = await send('Page.captureScreenshot', { format: 'png' });
    const png = path.join(tmp, file + '.png');
    fs.writeFileSync(png, Buffer.from(s.result.data, 'base64'));
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '84', '--resampleWidth', String(width), png, '--out', path.join(SHOTS, file + '.jpg')], { stdio: 'pipe' });
  };
  const wait = 'const wait=ms=>new Promise(r=>setTimeout(r,ms));';
  await phone();
  await grab('home');
  // Sprout: one wrong letter crossed out.
  await grab('missing', { js: `${wait} start(18); await wait(200); const c=G.cards[G.i]; [...document.querySelectorAll('.opt')].find(b=>b.dataset.o!==c.answer).click(); await wait(500); document.querySelector('#card').classList.remove('shake'); document.activeElement.blur();` });
  // Sunflower: two letters placed, decoys still in the tray.
  await grab('spell', { state: later, js: `${wait} start(30); await wait(200); const c=G.cards[0]; const t=[...document.querySelectorAll('.tile')]; for (const ch of c.answer.slice(0,2)) t[c.tiles.findIndex((x,j)=>x===ch&&!t[j].disabled)].click(); document.activeElement.blur();` });
  // Big Tree: a sentence card answered; the answer shows on the same card (auto-advance stopped for the shot).
  await grab('answer', { state: later, js: `${wait} start(32); await wait(200); const c=G.cards[0]; [...document.querySelectorAll('.opt')].find(b=>b.dataset.o===c.answer).click(); stopAdvance(); document.querySelector('#next').classList.remove('counting'); await wait(300); document.activeElement.blur();` });
  await grab('dark', { dark: true, state: { ...later, color: 'grape' } });
  // Settings: name, buddy, colour, cheer style, reading voice and sound effects.
  await grab('settings', { js: `settings(); document.activeElement.blur();` });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await grab('web', { width: 1440 });
  console.log('captured', fs.readdirSync(SHOTS).join(', '));
  ws.close();
} finally {
  const exited = new Promise(r => chrome.once('exit', r));
  chrome.kill(); server.kill();
  await Promise.race([exited, sleep(5000)]);
  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

/* Misi Desainer: Pecahkan Design Brief
   Gim edukasi DKV · SMK PGRI 2 Badung · Kreator: Ni Luh Putu Kurniawati, S.Kom., M.Kom.
   Semua nama usaha, harga, tanggal, dan kontak dalam gim ini bersifat fiktif. */
(function () {
'use strict';

/* =========================================================
   1. UTILITAS
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const tunggu = ms => new Promise(r => setTimeout(r, ms));
const acak = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const IMG = {
  kirana: { sapa: 'assets/img/kirana_sapa.webp', tunjuk: 'assets/img/kirana_tunjuk.webp', pikir: 'assets/img/kirana_pikir.webp', bangga: 'assets/img/kirana_bangga.webp', ava: 'assets/img/avatar_kirana.webp' },
  sari: { sapa: 'assets/img/sari_sapa.webp', jelas: 'assets/img/sari_jelas.webp', ragu: 'assets/img/sari_ragu.webp', setuju: 'assets/img/sari_setuju.webp', ava: 'assets/img/avatar_sari.webp' },
};
const NAMA = { kirana: 'Kak Kirana', sari: 'Bu Sari', pemain: 'Kamu' };
const LENC = n => `assets/ui/lencana_misi_${n}.svg`;
const BINTANG = 'assets/ui/ikon_bintang.svg';

const ICON = {
  suara: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  bisu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 5M22 9l-5 5"/></svg>',
  tanya: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.3a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/></svg>',
  peta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4z"/><path d="M9 4v13.5M15 6.5V20"/></svg>',
  catatan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  ulang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4v4.5H8"/></svg>',
  putar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
  lampu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg>',
  mata: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  lanjut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  kirim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10 14"/><path d="M21 3 14.5 21l-4.5-7-7-4.5L21 3z"/></svg>',
  tutup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};

/* =========================================================
   2. PENYIMPANAN PROGRES (hanya di perangkat)
   ========================================================= */
const KUNCI = 'misiDesainer_pecahkanBrief_v1';
const awal = () => ({ skor: {}, selesai: {}, konfirmasi: false, refleksi: ['', '', ''], lihatPanduan: false,
  set: { musik: true, tokoh: true, efek: true, volMusik: 0.45, volTokoh: 1, suara: '' } });
let S = awal();
let bisaSimpan = true;
try { const raw = localStorage.getItem(KUNCI); if (raw) { const d = JSON.parse(raw); S = Object.assign(awal(), d); S.set = Object.assign(awal().set, d.set || {}); } localStorage.setItem(KUNCI + '_tes', '1'); localStorage.removeItem(KUNCI + '_tes'); }
catch (e) { bisaSimpan = false; }
function simpan() { if (!bisaSimpan) return; try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch (e) { bisaSimpan = false; } }

/* =========================================================
   3. AUDIO: musik latar, efek, suara tokoh
   ========================================================= */
const Audio2 = {
  ctx: null, gMusik: null, gEfek: null, buf: {}, src: null, el: null, siap: false, dimatikan: false,
  file: { backsound: 'assets/audio/backsound.mp3', benar: 'assets/audio/benar.wav', salah: 'assets/audio/coba_lagi.wav', klik: 'assets/audio/klik.wav', selesai: 'assets/audio/misi_selesai.wav', notif: 'assets/audio/notifikasi.mp3', jingle: 'assets/audio/jingle_akhir.mp3' },
  async muat(onProg) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) { try { this.ctx = new AC(); } catch (e) { this.ctx = null; } }
    const kunci = Object.keys(this.file); let n = 0;
    await Promise.all(kunci.map(async k => {
      try {
        if (!this.ctx) throw 0;
        const r = await fetch(this.file[k]); if (!r.ok) throw 0;
        const ab = await r.arrayBuffer();
        this.buf[k] = await new Promise((res, rej) => this.ctx.decodeAudioData(ab, res, rej));
      } catch (e) { const a = new Audio(this.file[k]); a.preload = 'auto'; this.buf[k] = a; }
      onProg && onProg(++n / kunci.length);
    }));
    if (this.ctx) {
      this.gMusik = this.ctx.createGain(); this.gMusik.gain.value = 0; this.gMusik.connect(this.ctx.destination);
      this.gEfek = this.ctx.createGain(); this.gEfek.gain.value = 0.8; this.gEfek.connect(this.ctx.destination);
    }
  },
  buka() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  efek(k) {
    if (!S.set.efek) return; const b = this.buf[k]; if (!b) return;
    if (b instanceof AudioBuffer) { const s = this.ctx.createBufferSource(); s.buffer = b; s.connect(this.gEfek); s.start(); }
    else { try { const a = b.cloneNode(); a.volume = .8; a.play().catch(() => {}); } catch (e) {} }
  },
  volTarget() { return S.set.musik ? S.set.volMusik * (Suara.bicara ? 0.35 : 1) : 0; },
  musik() {
    const b = this.buf.backsound; if (!b) return;
    if (b instanceof AudioBuffer) {
      if (!this.src) {
        const s = this.ctx.createBufferSource(); s.buffer = b; s.loop = true;
        s.loopStart = 0.026; s.loopEnd = Math.min(b.duration, 0.026 + 45.7142857);
        s.connect(this.gMusik); s.start(0, 0.026); this.src = s;
      }
      const g = this.gMusik.gain, t = this.ctx.currentTime; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(this.volTarget(), t + 0.6);
    } else {
      this.el = b; b.loop = true; b.volume = this.volTarget();
      if (S.set.musik) b.play().catch(() => {}); else b.pause();
    }
  },
};

/* --- Pengucapan: mengubah teks tulis menjadi teks lisan --- */
function terbilang(n) {
  const s = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
  const f = x => x === 0 ? '' : terbilang(x);
  if (n < 12) return s[n];
  if (n < 20) return terbilang(n - 10) + ' belas';
  if (n < 100) return terbilang(Math.floor(n / 10)) + ' puluh ' + f(n % 10);
  if (n < 200) return 'seratus ' + f(n - 100);
  if (n < 1000) return terbilang(Math.floor(n / 100)) + ' ratus ' + f(n % 100);
  if (n < 2000) return 'seribu ' + f(n - 1000);
  if (n < 1e6) return terbilang(Math.floor(n / 1000)) + ' ribu ' + f(n % 1000);
  return String(n);
}
function lisan(t) {
  return String(t)
    .replace(/<[^>]+>/g, '')
    .replace(/08xx-xxxx-xxxx/g, 'nomor kontak usaha')
    .replace(/Rp\s?([\d.]+)/g, (m, a) => terbilang(+a.replace(/\./g, '')) + ' rupiah')
    .replace(/(\d+)\s?[–-]\s?(\d+)/g, '$1 sampai $2')
    .replace(/(\d+)\s?×\s?(\d+)/g, '$1 kali $2')
    .replace(/\bA3\b/g, 'A tiga')
    .replace(/\d+/g, m => terbilang(+m).trim())
    .replace(/\bbrief\b/gi, 'brif').replace(/\bdesign\b/gi, 'desain').replace(/\bDKV\b/g, 'D K V')
    .replace(/\bInstagram\b/g, 'Instagram').replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim();
}

/* --- Suara tokoh: rekaman asli (bila ada) atau suara perangkat --- */
const REKAMAN = new Set(window.REKAMAN_SUARA || []);
const Suara = {
  semua: [], bicara: false, token: 0, el: null, simpanUtt: [],
  GAYA: { kirana: { pitch: 1.06, rate: 1.0 }, sari: { pitch: 0.9, rate: 0.93 }, pemain: { pitch: 1.0, rate: 1.03 } },
  muat() {
    if (!('speechSynthesis' in window)) return;
    const isi = () => { this.semua = speechSynthesis.getVoices(); };
    isi(); speechSynthesis.onvoiceschanged = isi;
  },
  kandidat() {
    let v = this.semua.filter(x => /^(id|in)([-_]|$)/i.test(x.lang));
    if (!v.length) v = this.semua.filter(x => /^ms([-_]|$)/i.test(x.lang));
    return v.sort((a, b) => this.nilai(b) - this.nilai(a));
  },
  nilai(v) {
    const n = v.name; let s = 0;
    if (/natural|neural/i.test(n)) s += 10; if (/online/i.test(n)) s += 4; if (/google/i.test(n)) s += 3;
    if (/gadis|damayanti|female|wanita|perempuan/i.test(n)) s += 2; if (/ardi|male\b/i.test(n)) s -= 1;
    if (/^(id|in)/i.test(v.lang)) s += 5; return s;
  },
  suaraDipilih() { const k = this.kandidat(); return k.find(v => v.name === S.set.suara) || k[0] || null; },
  stop() {
    this.token++; this.bicara = false;
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    if (this.el) { this.el.pause(); this.el = null; }
    Audio2.musik(); tandaBicara(false);
  },
  async ucap(siapa, teks, id) {
    this.stop();
    if (!S.set.tokoh) return;
    const tok = ++this.token;
    this.bicara = true; Audio2.musik(); tandaBicara(true, siapa);
    try {
      if (id && REKAMAN.has(id)) {
        await new Promise(res => { const a = new Audio('assets/vo/' + id + '.mp3'); this.el = a; a.volume = S.set.volTokoh; a.onended = a.onerror = res; a.play().catch(res); });
      } else if ('speechSynthesis' in window) {
        const v = this.suaraDipilih(); if (!v) { throw 'tanpa-suara'; }
        const g = this.GAYA[siapa] || this.GAYA.kirana;
        const kal = (lisan(teks).match(/[^.!?…]+[.!?…]*/g) || []).map(s => s.trim()).filter(Boolean);
        for (let i = 0; i < kal.length; i++) {
          if (tok !== this.token) break;
          const k = kal[i]; const tanya = /\?$/.test(k), seru = /!$/.test(k);
          await new Promise(res => {
            const u = new SpeechSynthesisUtterance(k);
            u.voice = v; u.lang = v.lang; u.volume = S.set.volTokoh;
            u.pitch = Math.max(0.5, Math.min(2, g.pitch + (tanya ? 0.12 : seru ? 0.06 : 0) + (i === 0 ? 0.03 : 0) + (Math.random() * 0.04 - 0.02)));
            u.rate = g.rate * (seru ? 1.04 : 1) * (k.length < 22 ? 0.96 : 1);
            const batas = setTimeout(res, 1500 + k.length * 110);
            u.onend = u.onerror = () => { clearTimeout(batas); res(); };
            this.simpanUtt.push(u); if (this.simpanUtt.length > 20) this.simpanUtt.shift();
            speechSynthesis.speak(u);
          });
          if (tok === this.token && i < kal.length - 1) await tunggu(tanya ? 260 : 180);
        }
      }
    } catch (e) { if (e === 'tanpa-suara' && !this._peringat) { this._peringat = true; toast('Suara bahasa Indonesia belum tersedia di perangkat ini. Teks tetap tampil.'); } }
    if (tok === this.token) { this.bicara = false; Audio2.musik(); tandaBicara(false); }
  },
};
function tandaBicara(on, siapa) {
  $$('.tokoh').forEach(t => t.classList.toggle('bicara', !!on && t.dataset.siapa === siapa));
  const g = $('#dialog .gelombang'); if (g) g.classList.toggle('on', !!on);
}

/* =========================================================
   4. KOMPONEN TAMPILAN
   ========================================================= */
const layar = $('#screen'), hud = $('#hud'), dialog = $('#dialog'), modal = $('#modal');
function toast(t, ms = 2600) { const d = document.createElement('div'); d.className = 't'; d.textContent = t; $('#toast').append(d); setTimeout(() => d.remove(), ms); }
function umumkan(t) { const s = $('#sr-live'); s.textContent = ''; setTimeout(() => s.textContent = t, 30); }

function latar(mode) { const b = $('#bg'); b.className = mode || ''; }
function tokoh(sisi, siapa, pose) {
  const el = $('#tokoh-' + sisi);
  if (!siapa) { el.classList.add('sembunyi'); el.dataset.siapa = ''; return; }
  const src = IMG[siapa][pose]; const img = el.querySelector('img');
  if (el.dataset.siapa !== siapa || el.classList.contains('sembunyi')) { el.classList.add('sembunyi'); requestAnimationFrame(() => setTimeout(() => el.classList.remove('sembunyi'), 30)); }
  if (img.getAttribute('src') !== src) img.src = src;
  el.dataset.siapa = siapa;
}
function tanpaTokoh() { tokoh('l'); tokoh('r'); }

/* --- Dialog bertahap dengan suara --- */
let dlgAktif = null;
function bicara(siapa, teks, o = {}) {
  return new Promise(res => {
    if (o.pose) { const sisi = o.sisi || ($('#tokoh-l').dataset.siapa === siapa ? 'l' : 'r'); tokoh(sisi, siapa, o.pose); }
    const ava = siapa === 'pemain' ? '' : `style="background-image:url(${IMG[siapa].ava})"`;
    dialog.innerHTML = `<div class="dlg ${siapa}">
      ${siapa === 'pemain' ? '<div class="ava" style="background:#203943;display:grid;place-items:center;color:#E9BA4A;font-weight:800;font-size:26px">K</div>' : `<div class="ava" ${ava}></div>`}
      <span class="nama">${NAMA[siapa]}</span>
      <p id="dlg-teks"></p>
      <div class="aksi">
        <span class="gelombang" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span>berbicara…</span></span>
        <button class="btn sek kecil" id="dlg-ulang" aria-label="Putar ulang suara">${ICON.ulang}<span>Putar ulang</span></button>
        <button class="btn kecil" id="dlg-lanjut">${esc(o.tombol || 'Lanjut')} ${ICON.lanjut}</button>
      </div></div>`;
    dialog.classList.add('buka'); layar.classList.add('ada-dialog');
    const p = $('#dlg-teks'); let i = 0, selesaiKetik = false; const penuh = teks;
    const ketik = setInterval(() => { i += 2; p.textContent = penuh.slice(0, i); if (i >= penuh.length) { clearInterval(ketik); selesaiKetik = true; } }, 22);
    const ucap = () => Suara.ucap(siapa, teks, o.id);
    ucap();
    $('#dlg-ulang').onclick = () => { Audio2.efek('klik'); ucap(); };
    const lanjut = $('#dlg-lanjut');
    lanjut.onclick = () => {
      if (!selesaiKetik) { clearInterval(ketik); p.textContent = penuh; selesaiKetik = true; return; }
      Audio2.efek('klik'); Suara.stop(); dialog.classList.remove('buka'); layar.classList.remove('ada-dialog'); dialog.innerHTML = ''; dlgAktif = null; res();
    };
    dlgAktif = lanjut; setTimeout(() => lanjut.focus({ preventScroll: true }), 50);
  });
}
async function cerita(baris) { for (const b of baris) await bicara(b[0], b[1], b[2] || {}); }

/* --- Modal --- */
function bukaModal(html, o = {}) {
  modal.innerHTML = `<div class="kotak" ${o.lebar ? `style="max-width:${o.lebar}px"` : ''}>${o.tanpaTutup ? '' : `<button class="ikonbtn tutup" aria-label="Tutup" data-tutup>${ICON.tutup}</button>`}${html}</div>`;
  modal.classList.add('buka');
  $$('[data-tutup]', modal).forEach(b => b.onclick = () => { Audio2.efek('klik'); tutupModal(); });
  const f = modal.querySelector('button,[href],input,select,textarea'); f && f.focus({ preventScroll: true });
}
function tutupModal() { modal.classList.remove('buka'); modal.innerHTML = ''; }
modal.addEventListener('click', e => { if (e.target === modal && !modal.querySelector('[data-wajib]')) tutupModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('buka') && !modal.querySelector('[data-wajib]')) tutupModal(); });

function konfeti() {
  const k = document.createElement('div'); k.className = 'konfeti'; const w = ['#157A64', '#E9BA4A', '#203943', '#F08A5D', '#6FCFAE'];
  for (let i = 0; i < 70; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 100 + 'vw'; c.style.background = w[i % w.length]; c.style.animationDuration = (1.8 + Math.random() * 1.8) + 's'; c.style.animationDelay = (Math.random() * .5) + 's'; k.append(c); }
  document.body.append(k); setTimeout(() => k.remove(), 4200);
}

/* --- Skor --- */
const MISI = [
  null,
  { nama: 'Pesan awal', tempat: 'Meja resepsionis', lenc: 'Detektif Informasi', x: 17, y: 52 },
  { nama: 'Bertanya kepada klien', tempat: 'Ruang tunggu', lenc: 'Komunikator', x: 21, y: 76 },
  { nama: 'Susun brief', tempat: 'Meja desain', lenc: 'Penyusun Brief', x: 50, y: 27 },
  { nama: 'Negosiasi perubahan', tempat: 'Ruang rapat', lenc: 'Negosiator', x: 82, y: 60 },
  { nama: 'Periksa ringkasan', tempat: 'Area produksi', lenc: 'Brief Terkonfirmasi', x: 80, y: 23 },
];
const totalMisi = n => S.skor[n] ? S.skor[n].total : 0;
const totalSemua = () => [1, 2, 3, 4, 5].reduce((a, n) => a + totalMisi(n), 0);
let M = null; // misi yang sedang berjalan
function skorTampil() { let t = totalSemua(); if (M) t = t - totalMisi(M.no) + Object.values(M.pts).reduce((a, b) => a + b, 0); return t; }
function perbaruiSkor(naik) { const el = $('#hud-skor'); if (!el) return; el.querySelector('b').textContent = skorTampil(); if (naik) { el.classList.remove('naik'); void el.offsetWidth; el.classList.add('naik'); } }

function mulaiMisi(no) { M = { no, pts: {}, salahSejak: false, adaSalah: false }; }
function nilai(kunci, lihat) {
  const p = lihat ? 0 : (M.salahSejak ? 3 : 5);
  M.pts[kunci] = p; M.salahSejak = false; perbaruiSkor(p > 0);
  return p;
}
function catatSalah() { M.salahSejak = true; M.adaSalah = true; }

/* --- HUD --- */
function pasangHUD(o = {}) {
  hud.hidden = false;
  const titik = [1, 2, 3, 4, 5].map(n => `<i class="${S.selesai[n] ? 'ok' : ''} ${o.no === n ? 'on' : ''}"></i>`).join('');
  hud.innerHTML = `
    <div class="judul-misi">${o.no ? `<img src="${LENC(o.no)}" alt="">` : ''}<b><span class="pj">${esc(o.judul || 'Studio Kreativa')}</span>${o.no ? `<span class="pd" aria-hidden="true">Misi ${o.no}/5</span>` : ''}</b>${o.no ? `<span class="titik" aria-label="Progres misi">${titik}</span>` : ''}</div>
    <div class="spacer"></div>
    <div class="skor" id="hud-skor" aria-label="Skor"><img src="${BINTANG}" alt=""><span class="sr">Skor</span><b>${skorTampil()}</b></div>
    ${S.selesai[2] ? `<button class="pilbtn" id="hud-catatan" aria-label="Catatan Klien">${ICON.catatan}<span class="tx">Catatan</span></button>` : ''}
    ${o.peta === false ? '' : `<button class="ikonbtn" id="hud-peta" aria-label="Peta studio">${ICON.peta}</button>`}
    <button class="ikonbtn" id="hud-panduan" aria-label="Panduan bermain">${ICON.tanya}</button>
    <button class="ikonbtn" id="hud-suara" aria-label="Pengaturan suara">${S.set.musik || S.set.tokoh || S.set.efek ? ICON.suara : ICON.bisu}</button>`;
  $('#hud-suara').onclick = () => { Audio2.efek('klik'); bukaSuara(); };
  $('#hud-panduan').onclick = () => { Audio2.efek('klik'); modalPanduan(); };
  const pt = $('#hud-peta'); if (pt) pt.onclick = () => { Audio2.efek('klik'); if (M && !confirmKeluar()) return; keScene('peta'); };
  const ct = $('#hud-catatan'); if (ct) ct.onclick = () => { Audio2.efek('klik'); modalCatatan(); };
}
function confirmKeluar() { return true; }

/* --- Pengaturan suara --- */
function bukaSuara() {
  const k = Suara.kandidat();
  const opsi = k.length ? k.map(v => `<option value="${esc(v.name)}" ${Suara.suaraDipilih() && Suara.suaraDipilih().name === v.name ? 'selected' : ''}>${esc(v.name)}${/natural|neural|online/i.test(v.name) ? ' ★' : ''}</option>`).join('') : '<option>Tidak ada suara bahasa Indonesia di perangkat ini</option>';
  const saklar = (id, on, judul, ket) => `<div class="set-row"><div><b id="lb-${id}">${judul}</b><small>${ket}</small></div><button class="saklar" role="switch" aria-labelledby="lb-${id}" aria-checked="${on}" data-s="${id}"></button></div>`;
  bukaModal(`<h2>Pengaturan suara</h2><p class="sub" style="margin:0 0 6px">Teks selalu tampil, jadi gim tetap dapat dimainkan tanpa suara.</p>
    ${saklar('musik', S.set.musik, 'Musik latar', 'Musik lembut selama bermain')}
    <div class="set-row"><label for="vm"><b>Volume musik</b></label><input id="vm" type="range" min="0" max="1" step="0.05" value="${S.set.volMusik}" style="width:50%"></div>
    ${saklar('tokoh', S.set.tokoh, 'Suara tokoh', 'Kak Kirana dan Bu Sari membacakan dialog')}
    ${saklar('efek', S.set.efek, 'Efek suara', 'Bunyi benar, coba lagi, dan klik')}
    <div class="set-row" style="display:block"><label for="pilih-suara"><b>Pilih suara tokoh</b><small style="display:block">Pilihan bertanda ★ terdengar paling alami. Hasil terbaik: Microsoft Edge atau Google Chrome.</small></label>
      <div style="display:flex;gap:8px;margin-top:8px"><select id="pilih-suara">${opsi}</select><button class="btn sek kecil" id="tes-suara">${ICON.putar}Tes</button></div></div>
    <div class="alat"><button class="btn sek" id="semua-mati">${ICON.bisu}Matikan semua</button><button class="btn" data-tutup>Selesai</button></div>`);
  $$('.saklar', modal).forEach(b => b.onclick = () => {
    const k = b.dataset.s; S.set[k] = !S.set[k]; b.setAttribute('aria-checked', S.set[k]); simpan();
    if (k === 'musik') Audio2.musik(); if (k === 'tokoh' && !S.set.tokoh) Suara.stop(); Audio2.efek('klik'); perbaruiIkonSuara();
  });
  $('#vm').oninput = e => { S.set.volMusik = +e.target.value; Audio2.musik(); simpan(); };
  $('#pilih-suara').onchange = e => { S.set.suara = e.target.value; simpan(); };
  $('#tes-suara').onclick = () => { const t = S.set.tokoh; S.set.tokoh = true; Suara.ucap('kirana', 'Halo! Aku Kak Kirana. Apakah suaraku terdengar jelas?'); S.set.tokoh = t; };
  $('#semua-mati').onclick = () => { S.set.musik = S.set.tokoh = S.set.efek = false; simpan(); Suara.stop(); Audio2.musik(); perbaruiIkonSuara(); tutupModal(); toast('Semua suara dimatikan'); };
}
function perbaruiIkonSuara() { const b = $('#hud-suara'); if (b) b.innerHTML = S.set.musik || S.set.tokoh || S.set.efek ? ICON.suara : ICON.bisu; const m = $('#muka-suara'); if (m) m.innerHTML = b ? b.innerHTML : (S.set.musik || S.set.tokoh || S.set.efek ? ICON.suara : ICON.bisu); }

/* --- Catatan klien --- */
const CATATAN = [
  ['Usaha', 'Herba Sari Bali'], ['Produk', 'Kunyit Asam Segar'], ['Harga', 'Rp15.000'], ['Audiens', '16–25 tahun'],
  ['Tujuan', 'Mengenalkan produk dan mengajak memesan'], ['Media', 'Instagram, format persegi'],
  ['Pesan utama', '“Segarnya Alami, Semangatnya Hari Ini”'], ['Warna', 'Hijau dan kuning'],
  ['Arahan visual', 'Segar, alami, modern'], ['Aset', 'Logo akan dikirim klien'], ['Kontak', '08xx-xxxx-xxxx'], ['Tenggat', S => S.selesai[4] ? '7 November 2026 (disepakati)' : '7 November 2026'],
];
const htmlCatatan = () => `<dl class="catatan">${CATATAN.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(typeof v === 'function' ? v(S) : v)}</dd></div>`).join('')}</dl>`;
function modalCatatan() { bukaModal(`<h2>Catatan Klien <span class="fiktif">data fiktif</span></h2><p class="sub">Jawaban Bu Sari dari Misi 2. Gunakan untuk memeriksa pekerjaanmu.</p>${htmlCatatan()}<div class="alat"><button class="btn" data-tutup>Tutup</button></div>`, { lebar: 720 }); }

/* --- Panduan (modal ringkas) --- */
function htmlAturan() {
  return `<div class="angka3"><div><b>5</b>misi</div><div><b>4</b>item per misi</div><div class="e"><b>100</b>poin maksimal</div></div>
  <ul class="aturan">
    <li><i style="background:#157A64"></i><span><b>5 poin</b> jika benar pada percobaan pertama.</span></li>
    <li><i style="background:#E9BA4A"></i><span><b>3 poin</b> jika benar setelah memperbaiki.</span></li>
    <li><i style="background:#8A968D"></i><span><b>0 poin</b> jika memakai <b>Lihat jawaban</b> (muncul setelah satu jawaban salah).</span></li>
    <li><i style="background:#203943"></i><span><b>Petunjuk</b> gratis dan boleh dipakai kapan saja. Tidak ada batas waktu.</span></li>
    <li><i style="background:#B4500F"></i><span>Misi dapat diulang dari <b>peta studio</b>; hanya skor misi itu yang diganti.</span></li>
  </ul>`;
}
function modalPanduan() {
  bukaModal(`<h2>Cara bermain</h2>${htmlAturan()}<p class="sub" style="font-size:13px">${bisaSimpan ? 'Progres tersimpan otomatis di perangkat ini.' : 'Penyimpanan perangkat tidak tersedia; progres hilang jika halaman ditutup.'} Gim tidak mengumpulkan data pribadi.</p><div class="alat"><button class="btn" data-tutup>Mengerti</button></div>`, { lebar: 620 });
}

/* =========================================================
   5. SCENE
   ========================================================= */
const SCENE = {};
async function keScene(nama, arg) {
  Suara.stop(); tutupModal(); dialog.classList.remove('buka'); dialog.innerHTML = ''; layar.classList.remove('ada-dialog');
  layar.innerHTML = ''; layar.scrollTop = 0; M = null;
  await SCENE[nama](arg);
  layar.focus({ preventScroll: true });
}

/* ---------- 01 Laman muka ---------- */
SCENE.muka = async () => {
  hud.hidden = true; latar(''); tokoh('l'); tokoh('r', 'kirana', 'sapa');
  const ada = Object.keys(S.selesai).length > 0;
  layar.innerHTML = `<div class="layar muka lebar-tokoh" style="min-height:100%">
    <div style="display:flex;justify-content:flex-end;margin-bottom:12px"><button class="ikonbtn" id="muka-suara" aria-label="Pengaturan suara"></button></div>
    <div class="kartu-judul">
      <span class="logo-studio" style="color:var(--teal)">Studio Kreativa · DKV</span>
      <h1>Misi Desainer</h1>
      <span class="pita">Pecahkan Design Brief</span>
      <p>Hari pertamamu sebagai desainer magang. Pahami kebutuhan klien, lalu susun design brief yang jelas.</p>
      <div class="notif"><span class="bulat" style="background-image:url(${IMG.sari.ava})"></span><span>1 pesan baru dari klien menunggu di meja resepsionis</span></div>
      <div class="tombol-tumpuk">
        <button class="btn" id="b-mulai">${ada ? 'Lanjutkan' : 'Mulai'} ${ICON.lanjut}</button>
        <button class="btn sek" id="b-panduan">Panduan</button>
        <button class="btn sek" id="b-tentang">Tentang</button>
      </div>
      ${ada ? `<p style="margin:14px 0 0;font-size:13px">Skor tersimpan: <b>${totalSemua()}</b> · <button class="btn sek kecil" id="b-reset" style="min-height:36px;box-shadow:none">Main dari awal</button></p>` : ''}
      ${bisaSimpan ? '' : '<p class="umpan info" style="margin-top:14px">Penyimpanan perangkat tidak tersedia. Progres tidak tersimpan jika halaman ditutup.</p>'}
    </div></div>`;
  perbaruiIkonSuara();
  $('#muka-suara').onclick = () => { Audio2.efek('klik'); bukaSuara(); };
  $('#b-mulai').onclick = () => { Audio2.efek('klik'); keScene(ada ? 'peta' : 'panduan'); };
  $('#b-panduan').onclick = () => { Audio2.efek('klik'); keScene('panduan'); };
  $('#b-tentang').onclick = () => { Audio2.efek('klik'); modalTentang(); };
  const r = $('#b-reset'); if (r) r.onclick = () => { Audio2.efek('klik'); bukaModal(`<h2>Main dari awal?</h2><p>Semua skor, lencana, dan jawaban refleksi di perangkat ini akan dihapus.</p><div class="alat"><button class="btn sek" data-tutup>Batal</button><button class="btn" id="ya-reset">Ya, mulai baru</button></div>`); $('#ya-reset').onclick = () => { const set = S.set; S = awal(); S.set = set; simpan(); tutupModal(); keScene('muka'); }; };
  await tunggu(500);
  if (!layar.querySelector('.muka')) return;
  Suara.ucap('kirana', 'Selamat datang di Studio Kreativa! Aku Kak Kirana, pendamping brief di sini. Ada pesan dari klien yang menunggumu.', 'vo_01');
};
function modalTentang() {
  bukaModal(`<h2>Tentang gim ini</h2>
  <p class="sub">Gim edukasi untuk mata pelajaran <b>Desain Komunikasi Visual</b> (Fase F, SMK) tentang memahami dan menyusun <b>design brief</b>.</p>
  <p class="label">Tujuan pembelajaran</p>
  <ol style="margin:6px 0 14px;padding-left:20px;line-height:1.6">
    <li>Mengidentifikasi informasi yang sudah ada dalam pesan klien.</li>
    <li>Mengajukan pertanyaan yang relevan dan sopan untuk melengkapi brief.</li>
    <li>Mengelompokkan informasi ke dalam komponen design brief.</li>
    <li>Merespons perubahan kebutuhan klien melalui negosiasi.</li>
    <li>Memeriksa konsistensi ringkasan brief dengan catatan klien.</li>
  </ol>
  <p class="label">Kredit</p>
  <p style="margin:6px 0 14px;line-height:1.6">Kreator: <b>Ni Luh Putu Kurniawati, S.Kom., M.Kom.</b> · SMK PGRI 2 Badung<br>Ilustrasi tokoh dan latar dibuat dengan bantuan AI. Antarmuka, efek suara, dan musik latar dibuat secara programatis (orisinal). Suara tokoh memakai sintesis suara perangkat atau rekaman yang ditambahkan guru.</p>
  <p class="label">Privasi</p>
  <p style="margin:6px 0 14px;line-height:1.6">Tidak ada data pribadi yang dikumpulkan atau dikirim. Progres dan jawaban refleksi hanya tersimpan di perangkat ini. Semua nama usaha, harga, tanggal, dan kontak bersifat fiktif.</p>
  <div class="alat"><button class="btn" data-tutup>Tutup</button></div>`, { lebar: 680 });
}

/* ---------- 02 Panduan ---------- */
SCENE.panduan = async () => {
  pasangHUD({ judul: 'Panduan permainan', peta: false }); latar('redup'); tokoh('r'); tokoh('l', 'kirana', 'tunjuk');
  layar.innerHTML = `<div class="layar lebar-tokoh-kiri"><div class="panel" style="max-width:680px;margin-left:auto">
    <span class="label">Papan panduan</span><h2>Cara bermain</h2>
    <p class="sub">Baca pesan klien, temukan informasinya, tanyakan yang kurang, lalu susun dan periksa brief.</p>
    ${htmlAturan()}
    <p class="umpan info">${bisaSimpan ? 'Progres tersimpan otomatis di perangkat ini.' : 'Penyimpanan perangkat tidak tersedia; progres hilang jika halaman ditutup.'} Gim tidak mengumpulkan data pribadi.</p>
    <div class="alat"><button class="btn sek" id="p-kembali">Kembali</button><button class="btn sek" id="p-contoh">${ICON.lampu}Coba contoh</button><button class="btn" id="p-mulai">Mulai misi ${ICON.lanjut}</button></div>
  </div></div>`;
  $('#p-kembali').onclick = () => { Audio2.efek('klik'); keScene('muka'); };
  $('#p-mulai').onclick = () => { Audio2.efek('klik'); S.lihatPanduan = true; simpan(); keScene('peta'); };
  $('#p-contoh').onclick = () => { Audio2.efek('klik'); contohLatihan(); };
  await tunggu(400);
  if (layar.querySelector('#p-mulai')) Suara.ucap('kirana', 'Baca pesan klien, temukan informasinya, lalu susun brief. Tenang saja, kesalahan adalah kesempatan belajar. Petunjuk boleh dipakai kapan pun.', 'vo_02');
};
function contohLatihan() {
  bukaModal(`<span class="label">Contoh latihan · tidak dinilai</span><h2>Mana yang termasuk informasi <i>media</i>?</h2>
    <p class="sub">Media menjawab pertanyaan: desainnya akan dipasang <b>di mana</b>?</p>
    <div class="daftar-opsi" id="cl">
      <button class="kartu opsi" data-h="A" data-b="1">Poster untuk Instagram</button>
      <button class="kartu opsi" data-h="B" data-b="0">Warna hijau dan kuning</button>
    </div><div class="umpan" id="cl-u" aria-live="polite"></div>
    <div class="alat"><button class="btn" data-tutup>Selesai</button></div>`, { lebar: 560 });
  $$('#cl .kartu').forEach(b => b.onclick = () => {
    const ok = b.dataset.b === '1'; b.classList.add(ok ? 'benar' : 'salah'); Audio2.efek(ok ? 'benar' : 'salah');
    const u = $('#cl-u'); u.className = 'umpan ' + (ok ? 'ok' : 'no');
    u.innerHTML = ok ? '<div><b>Tepat!</b>Instagram adalah tempat poster dipasang, jadi termasuk media. Seperti inilah cara kartu dinilai.</div>' : '<div><b>Belum tepat.</b>Warna menjelaskan seperti apa tampilannya (arahan visual), bukan di mana dipasang. Coba pilih yang lain.</div>';
    Suara.ucap('kirana', ok ? 'Tepat! Instagram adalah tempat poster dipasang, jadi termasuk media.' : 'Belum tepat. Warna menjelaskan tampilan, bukan tempat. Coba lagi ya.');
  });
}

/* ---------- Peta studio (hub misi) ---------- */
function terbuka(n) { return n === 1 || !!S.selesai[n - 1]; }
function misiBerikut() { for (let n = 1; n <= 5; n++) if (!S.selesai[n]) return n; return S.konfirmasi ? 'hasil' : 'konfirmasi'; }
SCENE.peta = async () => {
  pasangHUD({ judul: 'Peta Studio Kreativa', peta: false }); latar('redup'); tanpaTokoh();
  const nx = misiBerikut();
  const bintang = n => { const t = totalMisi(n); const b = t >= 20 ? 3 : t >= 14 ? 2 : 1; return S.selesai[n] ? `<span class="bnt" aria-hidden="true">${Array.from({ length: 3 }, (_, i) => `<img src="${BINTANG}" alt="" style="${i < b ? '' : 'filter:grayscale(1);opacity:.4'}">`).join('')}</span>` : ''; };
  const titik = [1, 2, 3, 4, 5].map(n => {
    const m = MISI[n], buka = terbuka(n);
    const ket = `Misi ${n}: ${m.nama}, ${m.tempat}. ${S.selesai[n] ? 'Selesai, skor ' + totalMisi(n) + ' dari 20.' : buka ? 'Terbuka.' : 'Terkunci.'}`;
    return `<button class="titik-misi ${buka ? '' : 'kunci'} ${nx === n ? 'aktif' : ''}" style="left:${m.x}%;top:${m.y}%" data-n="${n}" aria-label="${esc(ket)}" ${buka ? '' : 'aria-disabled="true"'}>
      <img class="lenc" src="${LENC(n)}" alt=""><span class="nm">${n}. ${m.tempat}</span>${bintang(n)}</button>`;
  }).join('');
  const ks = S.selesai[5];
  const pin = typeof nx === 'number' ? MISI[nx] : { x: 50, y: 66 };
  layar.innerHTML = `<div class="layar">
    <div class="peta-wrap" role="group" aria-label="Peta studio. Pilih misi.">
      ${titik}
      <button class="titik-misi ${ks ? '' : 'kunci'} ${nx === 'konfirmasi' ? 'aktif' : ''}" style="left:50%;top:66%" data-n="k" aria-label="Konfirmasi brief kepada klien ${ks ? '' : '(terkunci sampai Misi 5 selesai)'}">
        <span class="lenc" style="display:grid;place-items:center;width:clamp(44px,6vw,70px);height:clamp(44px,6vw,70px);border-radius:50%;background:#fff;border:4px solid #157A64;color:#157A64">${ICON.kirim.replace('<svg', '<svg width="60%" height="60%"')}</span><span class="nm">Konfirmasi brief</span></button>
      <span class="pin-kirana" id="pin" style="left:${pin.x}%;top:${pin.y}%"></span>
    </div>
    <div class="daftar-hp">${[1, 2, 3, 4, 5].map(n => `<button class="baris ${S.selesai[n] ? 'ok' : ''}" data-hp="${n}" ${terbuka(n) ? '' : 'aria-disabled="true" style="opacity:.6"'}><img src="${LENC(n)}" alt=""><span class="v">${n}. ${MISI[n].nama}<small style="display:block;font-weight:400;font-size:12px">${MISI[n].tempat}</small></span><span class="st">${S.selesai[n] ? totalMisi(n) + '/20' : terbuka(n) ? 'buka' : 'terkunci'}</span></button>`).join('')}
      <button class="baris ${S.konfirmasi ? 'ok' : ''}" data-hp="k" ${ks ? '' : 'style="opacity:.6"'}><span class="v">Konfirmasi brief</span><span class="st">${S.konfirmasi ? 'selesai' : ks ? 'buka' : 'terkunci'}</span></button></div>
    <div class="peta-info">
      ${S.konfirmasi ? `<button class="btn emas" id="ke-hasil">Lihat hasil &amp; refleksi</button>` : ''}
      <button class="btn sek" id="ke-muka">Laman muka</button>
    </div></div>`;
  $$('.titik-misi').forEach(b => b.onclick = () => {
    const n = b.dataset.n;
    if (n === 'k') { if (!ks) { Audio2.efek('salah'); toast('Selesaikan Misi 5 dulu.'); return; } Audio2.efek('klik'); keScene('konfirmasi'); return; }
    if (!terbuka(+n)) { Audio2.efek('salah'); toast(`Selesaikan Misi ${n - 1} dulu.`); return; }
    Audio2.efek('klik'); bukaMisi(+n);
  });
  $$('[data-hp]').forEach(b => b.onclick = () => $(`.titik-misi[data-n="${b.dataset.hp}"]`).click());
  $('#ke-muka').onclick = () => { Audio2.efek('klik'); keScene('muka'); };
  const h = $('#ke-hasil'); if (h) h.onclick = () => { Audio2.efek('klik'); keScene('hasil'); };
  await tunggu(350);
  if (!$('#pin')) return;
  if (nx === 1 && !S.skor[1]) Suara.ucap('kirana', 'Ini peta studio kita. Mulailah dari meja resepsionis. Pesan Bu Sari sudah menunggu.', 'vo_03');
  else if (nx === 'konfirmasi') Suara.ucap('kirana', 'Semua misi selesai! Sekarang kirim ringkasan brief kepada Bu Sari untuk dikonfirmasi.', 'vo_04');
  else if (typeof nx === 'number') Suara.ucap('kirana', `Bagus! Berikutnya, Misi ${nx}: ${MISI[nx].nama}, di ${MISI[nx].tempat.toLowerCase()}.`);
}
function bukaMisi(n) {
  const m = MISI[n];
  bukaModal(`<div style="display:flex;gap:16px;align-items:center"><img src="${LENC(n)}" alt="" style="width:74px">
    <div><span class="label">Misi ${n} dari 5 · ${esc(m.tempat)}</span><h2 style="margin:2px 0">${esc(m.nama)}</h2>
    <p style="margin:0;font-size:14px">${S.selesai[n] ? `Skor terakhir <b>${totalMisi(n)}/20</b>. Mengulang misi akan mengganti skor misi ini.` : 'Lencana: <b>' + esc(m.lenc) + '</b> · 4 item × 5 poin'}</p></div></div>
    <div class="alat"><button class="btn sek" data-tutup>Nanti</button><button class="btn" id="go">${S.selesai[n] ? 'Ulangi misi' : 'Mulai misi'} ${ICON.lanjut}</button></div>`, { lebar: 560 });
  $('#go').onclick = () => { Audio2.efek('klik'); keScene('misi' + n); };
}

/* --- Akhir misi --- */
async function selesaiMisi(nextScene) {
  const total = Object.values(M.pts).reduce((a, b) => a + b, 0);
  const no = M.no;
  S.skor[no] = { pts: Object.assign({}, M.pts), total }; S.selesai[no] = true; simpan();
  const b = total >= 20 ? 3 : total >= 14 ? 2 : 1;
  Audio2.efek('selesai'); konfeti(); perbaruiSkor(true);
  const kalimat = total === 20 ? 'Sempurna! Semua benar pada percobaan pertama.' : total >= 14 ? 'Kerja bagus! Kamu memperbaiki jawaban dengan tepat.' : 'Misi selesai. Pelajari umpan baliknya, kamu boleh mengulang misi ini kapan saja.';
  bukaModal(`<div style="text-align:center" data-wajib>
    <img src="${LENC(no)}" alt="Lencana ${esc(MISI[no].lenc)}" style="width:130px;animation:zoom .6s">
    <div style="display:flex;justify-content:center;gap:6px;margin:6px 0">${Array.from({ length: 3 }, (_, i) => `<img src="${BINTANG}" alt="" style="width:40px;${i < b ? '' : 'filter:grayscale(1);opacity:.35'}">`).join('')}</div>
    <span class="label">Misi ${no} selesai · Lencana ${esc(MISI[no].lenc)}</span>
    <h2 style="font-size:40px;margin:4px 0">${total}<small style="font-size:18px;color:var(--navy-2)"> / 20</small></h2>
    <p>${kalimat}</p>
    <div class="alat" style="justify-content:center"><button class="btn sek" id="ke-peta">${ICON.peta}Peta studio</button><button class="btn" id="ke-lanjut">Lanjut ${ICON.lanjut}</button></div></div>`, { tanpaTutup: true, lebar: 520 });
  Suara.ucap('kirana', kalimat);
  $('#ke-peta').onclick = () => { Audio2.efek('klik'); keScene('peta'); };
  $('#ke-lanjut').onclick = () => { Audio2.efek('klik'); keScene(nextScene); };
}

/* --- Bagian umum misi: umpan balik + petunjuk + lihat jawaban --- */
function umpan(jenis, judul, isi, ucap = true, siapa = 'kirana') {
  const u = $('#umpan'); if (!u) return;
  u.className = 'umpan ' + jenis; u.innerHTML = `<div><b>${esc(judul)}</b>${isi}</div>`;
  umumkan(judul + '. ' + isi.replace(/<[^>]+>/g, ''));
  if (ucap) Suara.ucap(siapa, judul + '. ' + isi.replace(/<[^>]+>/g, ''));
}
function alatMisi(o) {
  return `<div class="alat"><button class="btn sek kecil" id="b-petunjuk">${ICON.lampu}Petunjuk</button>
    <button class="btn sek kecil" id="b-lihat" hidden>${ICON.mata}Lihat jawaban</button>
    ${o && o.kanan ? o.kanan : ''}</div>`;
}
function pasangAlat(petunjuk, lihat) {
  let i = 0;
  $('#b-petunjuk').onclick = () => { Audio2.efek('klik'); const p = typeof petunjuk === 'function' ? petunjuk() : petunjuk[i++ % petunjuk.length]; umpan('tip', 'Petunjuk', p); };
  $('#b-lihat').onclick = () => { Audio2.efek('klik'); lihat(); };
}
function tampilLihat(on) { const b = $('#b-lihat'); if (b) b.hidden = !on; }

/* ---------- 03 Misi 1: Pesan awal ---------- */
SCENE.misi1 = async () => {
  mulaiMisi(1); pasangHUD({ no: 1, judul: 'Misi 1 dari 5 · Pesan awal' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'pikir');
  const KARTU = [
    { k: 'jenis', t: 'Jenis usaha', b: true, bukti: 'minuman herbal' },
    { k: 'nama', t: 'Nama usaha', s: 'Bu Sari belum menyebut nama usahanya.' },
    { k: 'media', t: 'Media', b: true, bukti: 'poster promosi Instagram' },
    { k: 'harga', t: 'Harga produk', s: 'Pesan belum menyebut harga produk.' },
    { k: 'audiens', t: 'Audiens umum', b: true, bukti: 'anak muda' },
    { k: 'kontak', t: 'Nomor kontak', s: 'Tidak ada nomor kontak di pesan.' },
    { k: 'waktu', t: 'Waktu perkiraan', b: true, bukti: 'minggu depan' },
    { k: 'tanggal', t: 'Tanggal pasti', s: '“Minggu depan” baru perkiraan, belum tanggal pasti.' },
  ];
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua">
    <div class="panel"><span class="label">Meja resepsionis</span><h2>Pesan masuk</h2>
      <div class="chat"><div class="kepala"><span class="ava" style="background-image:url(${IMG.sari.ava})"></span><div><b>Bu Sari</b><small>Klien · pesan baru</small></div></div>
        <div class="isi" id="chat"><div class="gel klien mengetik"><i></i><i></i><i></i></div></div></div>
      <div class="alat"><button class="btn sek kecil" id="putar">${ICON.putar}Putar pesan</button></div>
    </div>
    <div class="panel"><span class="label">Tujuan misi</span><h2>Tandai 4 informasi yang <u>sudah ada</u></h2>
      <p class="sub">Baca pesan Bu Sari. Pilih kartu yang informasinya benar-benar tertulis di pesan.</p>
      <p><span class="hitung" id="hitung">Ditemukan 0 dari 4</span></p>
      <div class="grid-kartu" id="kartu">${KARTU.map(c => `<button class="kartu" data-k="${c.k}">${c.t}<small></small></button>`).join('')}</div>
      <div class="umpan" id="umpan" aria-live="polite"></div>
      ${alatMisi()}
    </div></div></div>`;
  const PESAN = 'Halo, saya pemilik usaha <span class="sorot" data-s="jenis">minuman herbal</span>. Saya ingin <span class="sorot" data-s="media">poster promosi Instagram</span> untuk <span class="sorot" data-s="audiens">anak muda</span>. Harap selesai <span class="sorot" data-s="waktu">minggu depan</span>.';
  const PESAN_T = 'Halo, saya pemilik usaha minuman herbal. Saya ingin poster promosi Instagram untuk anak muda. Harap selesai minggu depan.';
  $('#kartu').style.pointerEvents = 'none';
  await tunggu(900); Audio2.efek('notif');
  $('#chat').innerHTML = `<div class="gel klien">${PESAN}<small>08.15</small></div>`;
  $('#putar').onclick = () => { Audio2.efek('klik'); Suara.ucap('sari', PESAN_T, 'vo_m1_pesan'); };
  await cerita([
    ['kirana', 'Ada pesan baru dari Bu Sari, klien kita. Sebelum mendesain, kita harus tahu dulu informasi apa saja yang sudah ia berikan.', { pose: 'tunjuk', id: 'vo_m1_1' }],
    ['sari', PESAN_T, { id: 'vo_m1_pesan' }],
    ['kirana', 'Sekarang giliranmu. Tandai empat informasi yang sudah ada di pesan itu. Hati-hati, ada kartu yang informasinya belum disebut!', { pose: 'pikir', id: 'vo_m1_2', tombol: 'Mulai' }],
  ]);
  $('#kartu').style.pointerEvents = '';
  let ketemu = 0;
  const hitung = () => $('#hitung').textContent = `Ditemukan ${ketemu} dari 4`;
  const tandai = (btn, c, lihat) => {
    const p = nilai(c.k, lihat); ketemu++; hitung();
    btn.classList.remove('salah'); btn.classList.add(lihat ? 'dilihat' : 'benar'); btn.disabled = true;
    btn.querySelector('small').textContent = '“' + c.bukti + '”'; btn.insertAdjacentHTML('beforeend', `<span class="poin">+${p}</span>`);
    const s = $(`.sorot[data-s="${c.k}"]`); s && s.classList.add('on');
    if (!lihat) Audio2.efek('benar');
    tampilLihat(false);
    if (ketemu === 4) akhir();
  };
  $$('#kartu .kartu').forEach(btn => btn.onclick = () => {
    const c = KARTU.find(x => x.k === btn.dataset.k);
    if (c.b) { tandai(btn, c, false); umpan('ok', 'Benar!', `Pesan menyebut “${c.bukti}”. Informasi <b>${c.t.toLowerCase()}</b> sudah ada.`, ketemu < 4); }
    else { catatSalah(); Audio2.efek('salah'); btn.classList.remove('salah'); void btn.offsetWidth; btn.classList.add('salah'); umpan('no', 'Belum ada pada pesan', c.s + ' Baca kembali pesannya.'); tampilLihat(true); }
  });
  pasangAlat(() => {
    const sisa = KARTU.filter(c => c.b && !M.pts.hasOwnProperty(c.k));
    return sisa.length ? `Cari kata di pesan yang menjawab: <b>${sisa[0].t.toLowerCase()}</b>. Informasi yang benar harus tertulis jelas, bukan ditebak.` : 'Semua informasi sudah ditemukan.';
  }, () => {
    const c = KARTU.find(x => x.b && !M.pts.hasOwnProperty(x.k)); if (!c) return;
    tandai($(`#kartu [data-k="${c.k}"]`), c, true);
    umpan('info', 'Jawaban ditampilkan', `<b>${c.t}</b> ada di pesan: “${c.bukti}”. Item ini bernilai 0 poin.`, ketemu < 4);
  });
  async function akhir() {
    $$('#kartu .kartu:not(:disabled)').forEach(b => { b.disabled = true; b.style.opacity = '.55'; });
    umpan('info', 'Informasi yang masih kurang', 'Nama usaha, produk, harga, kontak, dan tanggal pasti belum ada. Di misi berikutnya, kamu akan menanyakannya kepada Bu Sari.', false);
    await tunggu(700);
    await bicara('kirana', 'Hebat! Kamu sudah menemukan semua informasi yang ada. Tapi lihat, nama usaha, produk, kontak, dan tanggal pastinya belum ada. Kita perlu bertanya kepada Bu Sari.', { pose: 'bangga', id: 'vo_m1_3', tombol: 'Selesaikan misi' });
    selesaiMisi('misi2');
  }
};

/* ---------- 04 Misi 2: Bertanya kepada klien ---------- */
SCENE.misi2 = async () => {
  mulaiMisi(2); pasangHUD({ no: 2, judul: 'Misi 2 dari 5 · Bertanya' }); latar('redup'); tokoh('l'); tokoh('r', 'sari', 'sapa');
  const KEL = [
    { k: 'usaha', nama: 'Usaha & produk', benar: 'Boleh tahu nama usaha dan produk yang ingin dipromosikan, Bu?', salah: 'Produknya enak tidak, Bu?', alasan: 'Rasa produk tidak membantu kebutuhan desain. Tanyakan identitas usaha dan produknya.',
      jawab: 'Nama usaha saya Herba Sari Bali. Produk yang ingin dipromosikan Kunyit Asam Segar, harganya Rp15.000 per botol.' },
    { k: 'tujuan', nama: 'Tujuan & sasaran', benar: 'Poster ini untuk tujuan apa, Bu, dan siapa yang ingin Ibu jangkau?', salah: 'Pokoknya dibuat ramai dan heboh saja ya, Bu?', alasan: 'Pertanyaan ini menebak-nebak dan tidak menggali tujuan maupun sasaran.',
      jawab: 'Tujuannya mengenalkan produk dan mengajak orang memesan. Sasarannya anak muda usia 16–25 tahun.' },
    { k: 'pesan', nama: 'Pesan & kontak', benar: 'Pesan utama dan kontak apa yang wajib dicantumkan di poster, Bu?', salah: 'Kontaknya nanti saya cari sendiri saja ya, Bu.', alasan: 'Kontak usaha harus berasal dari klien. Mencari sendiri berisiko salah.',
      jawab: 'Pesan utamanya “Segarnya Alami, Semangatnya Hari Ini”. Cantumkan nomor pemesanan kami, 08xx-xxxx-xxxx.' },
    { k: 'waktu', nama: 'Waktu & aset', benar: 'Kapan tanggal pastinya, Bu, dan aset apa saja yang sudah Ibu punya?', salah: 'Pokoknya minggu depan ya, Bu.', alasan: '“Minggu depan” masih perkiraan. Desainer perlu tanggal pasti dan daftar aset.',
      jawab: 'Final tanggal 7 November 2026. Logo akan saya kirim nanti. Saya ingin tampilannya segar, alami, dan modern, dengan warna hijau dan kuning.' },
  ];
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua">
    <div class="panel"><div class="mentor"><span class="ava" style="background-image:url(${IMG.kirana.ava})"></span><p><b>Kak Kirana</b>Bertanyalah dengan sopan agar brief lebih lengkap. Jangan menebak-nebak.</p></div>
      <span class="label">Ruang tunggu · percakapan</span>
      <div class="chat" style="margin-top:8px"><div class="kepala"><span class="ava" style="background-image:url(${IMG.sari.ava})"></span><div><b>Bu Sari</b><small>Klien · Herba Sari Bali</small></div></div>
      <div class="isi" id="chat"><div class="gel info">Jawaban klien disimpan ke Catatan Klien</div></div></div></div>
    <div class="panel"><span class="label">Tujuan misi</span><h2>Pilih pertanyaan yang paling membantu</h2>
      <div class="langkah" id="langkah">${KEL.map((g, i) => `<span data-i="${i}">${i + 1}. ${g.nama}</span>`).join('')}</div>
      <p class="sub" id="kel-judul"></p>
      <div class="daftar-opsi" id="opsi"></div>
      <div class="umpan" id="umpan" aria-live="polite"></div>
      ${alatMisi({ kanan: '<button class="btn" id="b-kirim" disabled>' + ICON.kirim + 'Kirim pertanyaan</button>' })}
    </div></div></div>`;
  await cerita([
    ['sari', 'Halo, Kak! Saya Sari. Silakan tanya apa saja yang Kakak perlukan untuk poster saya.', { pose: 'sapa', id: 'vo_m2_1' }],
    ['kirana', 'Pilih satu pertanyaan di setiap kelompok, lalu tekan Kirim pertanyaan. Pertanyaan yang baik itu sopan dan membantu kebutuhan desain.', { id: 'vo_m2_2', tombol: 'Mulai' }],
  ]);
  let idx = 0, pilih = null;
  const tampil = () => {
    const g = KEL[idx];
    $$('#langkah span').forEach((s, i) => { s.className = i < idx ? 'ok' : i === idx ? 'aktif' : ''; });
    $('#kel-judul').innerHTML = `Kelompok ${idx + 1} dari 4 · <b>${g.nama}</b>`;
    const ops = acak([{ t: g.benar, b: 1 }, { t: g.salah, b: 0 }]);
    $('#opsi').innerHTML = ops.map((o, i) => `<button class="kartu opsi" data-h="${'AB'[i]}" data-b="${o.b}" aria-pressed="false">${esc(o.t)}</button>`).join('');
    pilih = null; $('#b-kirim').disabled = true;
    $$('#opsi .kartu').forEach(b => b.onclick = () => { Audio2.efek('klik'); $$('#opsi .kartu').forEach(x => { x.classList.remove('pilih'); x.setAttribute('aria-pressed', 'false'); }); b.classList.add('pilih'); b.setAttribute('aria-pressed', 'true'); pilih = b; $('#b-kirim').disabled = false; });
  };
  const kirim = async (lihat) => {
    const g = KEL[idx];
    const btn = lihat ? $('#opsi .kartu[data-b="1"]') : pilih; if (!btn) return;
    const ok = btn.dataset.b === '1';
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel saya">${esc(btn.textContent)}<small>Kamu</small></div>`);
    if (!ok) {
      catatSalah(); Audio2.efek('salah'); btn.classList.remove('pilih'); btn.classList.add('salah'); btn.disabled = true; pilih = null; $('#b-kirim').disabled = true;
      tokoh('r', 'sari', 'ragu');
      $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien">Hmm, maksudnya bagaimana ya, Kak?<small>Bu Sari</small></div>`);
      umpan('no', 'Pertanyaan ini belum membantu kebutuhan desain', g.alasan + ' Coba pilih pertanyaan lain.');
      tampilLihat(true); return;
    }
    const p = nilai(g.k, !!lihat);
    if (!lihat) Audio2.efek('benar');
    btn.classList.remove('pilih'); btn.classList.add(lihat ? 'dilihat' : 'benar'); $$('#opsi .kartu').forEach(x => x.disabled = true); $('#b-kirim').disabled = true; tampilLihat(false);
    umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : `Pertanyaan tepat! +${p} poin`, 'Pertanyaannya sopan dan menggali informasi yang dibutuhkan desainer.', false);
    tokoh('r', 'sari', 'jelas');
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien mengetik" id="ketik"><i></i><i></i><i></i></div>`);
    await tunggu(700); $('#ketik').remove();
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien">${esc(g.jawab)}<small>Bu Sari · disimpan ke Catatan</small></div>`);
    Audio2.efek('notif');
    await bicara('sari', g.jawab, { pose: 'jelas', id: 'vo_m2_jawab' + (idx + 1), tombol: idx < 3 ? 'Kelompok berikutnya' : 'Selesai' });
    tokoh('r', 'sari', 'sapa'); $('#umpan').className = 'umpan'; $('#umpan').innerHTML = '';
    idx++;
    if (idx < 4) tampil();
    else { $$('#langkah span').forEach(s => s.className = 'ok'); await bicara('kirana', 'Bagus sekali! Sekarang semua informasi penting sudah terkumpul di Catatan Klien.', { pose: 'bangga', sisi: 'r', id: 'vo_m2_3', tombol: 'Selesaikan misi' }); selesaiMisi('infoKlien'); }
  };
  $('#b-kirim').onclick = () => { Audio2.efek('klik'); kirim(false); };
  pasangAlat(() => {
    const t = ['Desainer perlu tahu siapa kliennya dan apa produknya.', 'Tujuan dan sasaran menentukan gaya bahasa dan tampilan poster.', 'Informasi kontak harus berasal langsung dari klien.', 'Perkiraan waktu belum cukup. Tanyakan tanggal pasti dan aset yang sudah ada.'];
    return t[idx] + ' Pilih pertanyaan yang sopan, jelas, dan tidak menebak.';
  }, () => kirim(true));
  tampil();
};

/* ---------- 05 Informasi klien ---------- */
SCENE.infoKlien = async () => {
  pasangHUD({ judul: 'Misi 2 selesai · Catatan Klien' }); latar('redup'); tokoh('l'); tokoh('r', 'sari', 'jelas');
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="panel" style="max-width:780px">
    <span class="label">Rangkuman jawaban klien</span><h2>Catatan Klien <span class="fiktif">data fiktif</span></h2>
    <p class="sub">Baca dengan tenang. Catatan ini dapat dibuka lagi kapan saja dari tombol <b>Catatan</b> di bagian atas.</p>
    ${htmlCatatan()}
    <div class="alat"><button class="btn" id="lanjut3">Lanjut ke Misi 3 ${ICON.lanjut}</button></div></div></div>`;
  $('#lanjut3').onclick = () => { Audio2.efek('klik'); keScene('misi3'); };
  await tunggu(400);
  if ($('#lanjut3')) await bicara('sari', 'Saya ingin tampilannya segar, alami, dan modern. Logonya saya kirim nanti ya, Kak.', { pose: 'jelas', id: 'vo_05' });
};

/* ---------- 06 Misi 3: Susun brief ---------- */
SCENE.misi3 = async () => {
  mulaiMisi(3); pasangHUD({ no: 3, judul: 'Misi 3 dari 5 · Susun brief' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'tunjuk');
  const KOTAK = [{ k: 'tujuan', t: 'Tujuan', q: 'untuk apa?' }, { k: 'audiens', t: 'Audiens', q: 'siapa?' }, { k: 'media', t: 'Media', q: 'di mana?' }, { k: 'visual', t: 'Arahan visual', q: 'seperti apa?' }];
  const KARTU = acak([
    { k: 'tujuan', t: 'Mengenalkan produk dan mengajak memesan' },
    { k: 'audiens', t: 'Anak muda usia 16–25 tahun' },
    { k: 'media', t: 'Instagram, format persegi' },
    { k: 'visual', t: 'Segar, alami, modern; hijau dan kuning' },
  ]);
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)">
    <div class="panel"><span class="label">Meja desain · lembar brief</span><h2>Susun brief</h2>
      <p class="sub">Ketuk kartu, lalu ketuk kotak yang sesuai. Di komputer, kartu juga bisa diseret.</p>
      <div class="kotak4" id="kotak">${KOTAK.map(b => `<button class="slot" data-k="${b.k}" aria-label="Kotak ${b.t}, ${b.q}"><h3>${b.t}</h3><span class="tq">${b.q}</span></button>`).join('')}</div>
      <div class="umpan" id="umpan" aria-live="polite"></div>${alatMisi()}</div>
    <div class="panel baki-panel"><span class="label">Kartu dari klien</span> <p><span class="hitung" id="sisa">4 kartu tersisa</span></p>
      <div class="baki" id="baki">${KARTU.map(c => `<button class="kartu" draggable="true" data-k="${c.k}" aria-pressed="false">${esc(c.t)}</button>`).join('')}</div></div>
  </div></div>`;
  await bicara('kirana', 'Kelompokkan informasi dari klien agar tim memahami tugasnya. Setiap kartu menjawab satu pertanyaan: untuk apa, siapa, di mana, atau seperti apa.', { id: 'vo_m3_1', tombol: 'Mulai' });
  let pilih = null, sisa = 4;
  const pilihKartu = b => { $$('#baki .kartu').forEach(x => { x.classList.remove('pilih'); x.setAttribute('aria-pressed', 'false'); }); pilih = b; if (b) { b.classList.add('pilih'); b.setAttribute('aria-pressed', 'true'); } $$('.slot:not(.isi)').forEach(s => s.classList.toggle('siap', !!b)); };
  const pasang = (kartu, slot, lihat) => {
    if (!kartu || slot.classList.contains('isi')) return;
    const k = kartu.dataset.k;
    if (slot.dataset.k !== k) {
      catatSalah(); Audio2.efek('salah'); kartu.classList.add('salah'); setTimeout(() => kartu.classList.remove('salah'), 600); pilihKartu(null);
      umpan('no', 'Kartu kembali ke baki', 'Perhatikan apakah informasi itu menjawab untuk apa, siapa, di mana, atau seperti apa.'); tampilLihat(true); return;
    }
    const p = nilai(k, lihat); if (!lihat) Audio2.efek('benar');
    slot.classList.add('isi'); slot.classList.remove('siap'); slot.insertAdjacentHTML('beforeend', `<div class="kartu-kecil">${esc(kartu.textContent)} <b style="color:var(--teal)">+${p}</b></div>`);
    slot.setAttribute('aria-label', slot.getAttribute('aria-label') + ': ' + kartu.textContent);
    kartu.remove(); pilihKartu(null); sisa--; $('#sisa').textContent = sisa + ' kartu tersisa'; tampilLihat(false);
    const nm = KOTAK.find(x => x.k === k).t;
    if (sisa) umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : 'Tepat!', `Kartu ini masuk ke <b>${nm}</b>.`, !lihat);
    else akhir();
  };
  $('#baki').addEventListener('click', e => { const b = e.target.closest('.kartu'); if (!b) return; Audio2.efek('klik'); pilihKartu(pilih === b ? null : b); });
  $$('.slot').forEach(s => {
    s.onclick = () => { if (!pilih) { if (!s.classList.contains('isi')) toast('Pilih kartu dulu, lalu ketuk kotaknya.'); return; } pasang(pilih, s, false); };
    s.addEventListener('dragover', e => { e.preventDefault(); s.classList.add('over'); });
    s.addEventListener('dragleave', () => s.classList.remove('over'));
    s.addEventListener('drop', e => { e.preventDefault(); s.classList.remove('over'); const k = e.dataTransfer.getData('text/plain'); pasang($(`#baki .kartu[data-k="${k}"]`), s, false); });
  });
  $('#baki').addEventListener('dragstart', e => { const b = e.target.closest('.kartu'); if (b) { e.dataTransfer.setData('text/plain', b.dataset.k); pilihKartu(b); } });
  pasangAlat(() => {
    const k = pilih ? pilih.dataset.k : ($('#baki .kartu') || {}).dataset?.k; if (!k) return 'Semua kartu sudah terpasang.';
    const tip = { tujuan: 'Kata “mengenalkan” dan “mengajak” menjawab pertanyaan untuk apa poster dibuat.', audiens: 'Usia menunjukkan siapa yang ingin dijangkau.', media: 'Instagram adalah tempat poster akan dipasang.', visual: 'Kata sifat dan warna menggambarkan tampilan desain.' };
    return tip[k];
  }, () => { const k = pilih ? pilih.dataset.k : $('#baki .kartu').dataset.k; pasang($(`#baki .kartu[data-k="${k}"]`), $(`.slot[data-k="${k}"]`), true); });
  async function akhir() {
    umpan('ok', 'Brief tersusun!', 'Keempat komponen brief sudah terisi dengan tepat.', false);
    await bicara('kirana', 'Rapi sekali! Sekarang tim bisa langsung memahami untuk apa, untuk siapa, di mana, dan seperti apa poster ini.', { pose: 'bangga', id: 'vo_m3_2', tombol: 'Selesaikan misi' });
    selesaiMisi('misi4');
  }
};

/* ---------- 07 Misi 4: Negosiasi perubahan ---------- */
SCENE.misi4 = async () => {
  mulaiMisi(4); pasangHUD({ no: 4, judul: 'Misi 4 dari 5 · Negosiasi' }); latar('redup'); tokoh('l'); tokoh('r', 'sari', 'ragu');
  const LANGKAH = [
    { k: 'alasan', nama: 'Tanya alasan', q: 'Bu Sari meminta poster final lebih cepat. Apa yang kamu lakukan pertama kali?',
      ops: [{ t: 'Bertanya: “Boleh tahu, Bu, apa yang membuat poster perlu selesai lebih cepat?”', b: 1 }, { t: 'Langsung menjawab: “Pasti bisa, Bu!”', s: 'Berjanji tanpa tahu alasannya bisa membuat tim kewalahan.' }, { t: 'Menolak: “Maaf, tidak bisa. Jadwalnya sudah tetap.”', s: 'Menolak tanpa mendengar alasan klien membuat komunikasi buntu.' }],
      jawab: ['sari', 'Ada bazar kampus tanggal 8 November. Saya ingin promosi sudah tayang sebelum itu.', 'ragu'] },
    { k: 'kapasitas', nama: 'Cek kapasitas', q: 'Sebelum menjawab Bu Sari, apa langkahmu berikutnya?',
      ops: [{ t: 'Cek kapasitas tim dan dampaknya pada jadwal produksi.', b: 1 }, { t: 'Langsung jawab “Pasti bisa, Bu!” tanpa memeriksa pekerjaan.', s: 'Janji tanpa cek kapasitas berisiko tenggat terlewat dan kualitas turun.' }, { t: 'Ubah tenggat di brief menjadi 5 November tanpa konfirmasi.', s: 'Mengubah brief sepihak membuat tim dan klien tidak sepakat.' }],
      jawab: ['kirana', 'Aku sudah cek. Tim sedang mengerjakan dua proyek lain. Jika final 5 November, waktu revisi jadi sangat sempit.', 'pikir'] },
    { k: 'tawar', nama: 'Tawarkan solusi', q: 'Apa tawaran yang paling realistis untuk Bu Sari?',
      ops: [{ t: 'Tawarkan draf pertama 5 November untuk dicek, final tetap 7 November, masih sebelum bazar.', b: 1 }, { t: 'Paksa tim lembur agar final 5 November, tanpa waktu revisi.', s: 'Menghapus waktu revisi berisiko menghasilkan desain yang belum sesuai.' }, { t: 'Sarankan Bu Sari mencari desainer lain.', s: 'Ini tidak menyelesaikan masalah dan merusak hubungan dengan klien.' }],
      jawab: ['sari', 'Oh, begitu. Draf tanggal 5 dan final tetap 7 November? Baik, saya setuju. Masih sempat untuk bazar.', 'setuju'] },
    { k: 'catat', nama: 'Catat kesepakatan', q: 'Kesepakatan sudah tercapai. Bagaimana mencatatnya?',
      ops: [{ t: 'Catat di brief: draf 5 November, final 7 November 2026, disetujui klien.', b: 1 }, { t: 'Tidak perlu dicatat, cukup diingat saja.', s: 'Kesepakatan yang tidak dicatat mudah terlupa atau disalahpahami.' }, { t: 'Catat tenggat final 5 November karena itu permintaan terakhir klien.', s: 'Permintaan itu sudah berubah. Catat hasil kesepakatan terakhir, bukan permintaan awal.' }],
      jawab: ['kirana', 'Tepat. Kesepakatan dicatat, bukan diasumsikan.', 'bangga'] },
  ];
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua">
    <div class="panel"><span class="label">Ruang rapat</span>
      <div class="chat" style="margin-top:8px"><div class="kepala"><span class="ava" style="background-image:url(${IMG.sari.ava})"></span><div><b>Bu Sari</b><small>pesan baru · perubahan</small></div></div>
      <div class="isi" id="chat"><div class="gel klien mengetik"><i></i><i></i><i></i></div></div></div>
      <p class="label" style="margin-top:16px">Papan agenda · November 2026</p>
      <div class="agenda" aria-label="Agenda 2 sampai 7 November 2026">
        ${[['Sen', 2], ['Sel', 3], ['Rab', 4], ['Kam', 5], ['Jum', 6], ['Sab', 7]].map(([h, d]) => `<div class="${d === 7 ? 'lama' : d === 5 ? 'baru' : ''}" id="ag-${d}">${h}<b>${d}</b></div>`).join('')}
      </div>
      <div class="keter"><span><i style="background:#E3F5EC;border:2px solid #157A64"></i>7 Nov · kesepakatan awal</span><span><i style="background:#FCE6D6;border:2px dashed #B4500F"></i>5 Nov · permintaan baru</span></div>
    </div>
    <div class="panel"><span class="label">Tujuan misi</span><h2>Apa langkahmu berikutnya?</h2>
      <div class="langkah" id="langkah">${LANGKAH.map((l, i) => `<span>${i + 1}. ${l.nama}</span>`).join('')}</div>
      <p class="sub" id="soal"></p>
      <div class="daftar-opsi" id="opsi"></div>
      <div class="umpan" id="umpan" aria-live="polite"></div>${alatMisi()}
      <div class="mentor" style="margin:14px 0 0"><span class="ava" style="background-image:url(${IMG.kirana.ava})"></span><p><b>Kak Kirana</b>Pastikan kesepakatan sebelum mengubah brief.</p></div>
    </div></div></div>`;
  const PESAN = 'Kak, apakah posternya bisa final 5 November? Saya butuh lebih cepat dua hari dari jadwal semula.';
  await tunggu(800); Audio2.efek('notif');
  $('#chat').innerHTML = `<div class="gel klien"><span class="lbl">PERUBAHAN</span><br>${esc(PESAN)}<small>10.42</small></div>`;
  await cerita([
    ['sari', PESAN, { pose: 'ragu', id: 'vo_m4_pesan' }],
    ['kirana', 'Klien meminta perubahan tenggat. Jangan panik, dan jangan langsung berjanji. Kita selesaikan langkah demi langkah.', { id: 'vo_m4_1', tombol: 'Mulai' }],
  ]);
  let idx = 0;
  const tampil = () => {
    const l = LANGKAH[idx];
    $$('#langkah span').forEach((s, i) => s.className = i < idx ? 'ok' : i === idx ? 'aktif' : '');
    $('#soal').textContent = `Keputusan ${idx + 1} dari 4 · ${l.q}`;
    $('#opsi').innerHTML = acak(l.ops).map((o, i) => `<button class="kartu opsi" data-h="${'ABC'[i]}" data-b="${o.b ? 1 : 0}" data-s="${esc(o.s || '')}">${esc(o.t)}</button>`).join('');
    $$('#opsi .kartu').forEach(b => b.onclick = () => jawab(b, false));
  };
  const jawab = async (b, lihat) => {
    const l = LANGKAH[idx];
    if (b.dataset.b !== '1') { catatSalah(); Audio2.efek('salah'); b.classList.add('salah'); b.disabled = true; umpan('no', 'Berisiko', b.dataset.s + ' Coba pilih langkah lain.'); tampilLihat(true); return; }
    const p = nilai(l.k, lihat); if (!lihat) Audio2.efek('benar');
    b.classList.add(lihat ? 'dilihat' : 'benar'); $$('#opsi .kartu').forEach(x => x.disabled = true); tampilLihat(false);
    umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : `Langkah tepat! +${p} poin`, 'Lanjutkan percakapan.', false);
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel ${l.jawab[0] === 'sari' ? 'klien' : 'info'}">${esc(l.jawab[1])}<small>${NAMA[l.jawab[0]]}</small></div>`);
    if (l.jawab[0] === 'sari') tokoh('r', 'sari', l.jawab[2]);
    if (l.k === 'tawar') { $('#ag-5').className = 'acara'; $('#ag-5').innerHTML = 'Kam<b>5</b>draf'; }
    await bicara(l.jawab[0], l.jawab[1], { pose: l.jawab[0] === 'sari' ? l.jawab[2] : undefined, id: 'vo_m4_' + l.k, tombol: idx < 3 ? 'Keputusan berikutnya' : 'Selesai' });
    $('#umpan').className = 'umpan'; $('#umpan').innerHTML = '';
    idx++;
    if (idx < 4) tampil();
    else { $$('#langkah span').forEach(s => s.className = 'ok'); tokoh('r', 'sari', 'setuju'); await bicara('sari', 'Terima kasih, Kak. Penjelasannya jelas. Tenggat final tetap 7 November.', { pose: 'setuju', id: 'vo_m4_2', tombol: 'Selesaikan misi' }); selesaiMisi('misi5'); }
  };
  pasangAlat(() => ['Dengarkan dulu alasan klien sebelum menjawab.', 'Periksa kemampuan tim sebelum berjanji.', 'Cari jalan tengah: kebutuhan klien terpenuhi dan tim tetap punya waktu revisi.', 'Catat hasil kesepakatan terakhir yang disetujui kedua pihak.'][idx], () => jawab($('#opsi .kartu[data-b="1"]'), true));
  tampil();
};

/* ---------- 08 Misi 5: Periksa ringkasan ---------- */
SCENE.misi5 = async () => {
  mulaiMisi(5); pasangHUD({ no: 5, judul: 'Misi 5 dari 5 · Periksa ringkasan' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'pikir');
  const BARIS = [
    { k: 'usaha', l: 'Usaha', v: 'Herba Sari Bali', ok: true },
    { k: 'audiens', l: 'Audiens', v: '35–50 tahun', ops: ['16–25 tahun', '25–35 tahun', 'Semua umur'], why: 'Catatan klien: audiens 16–25 tahun.' },
    { k: 'media', l: 'Media', v: 'Poster cetak A3', ops: ['Instagram, format persegi', 'Spanduk 3×1 m', 'Brosur lipat'], why: 'Catatan klien: media Instagram, format persegi.' },
    { k: 'harga', l: 'Harga', v: 'Rp25.000', ops: ['Rp15.000', 'Rp12.000', 'Rp20.000'], why: 'Catatan klien: harga Rp15.000.' },
    { k: 'warna', l: 'Warna', v: 'Hijau dan kuning', ok: true },
    { k: 'tenggat', l: 'Tenggat', v: '5 November 2026', ops: ['7 November 2026 (disepakati)', '8 November 2026', '2 November 2026'], why: 'Hasil negosiasi Misi 4: final tetap 7 November 2026.' },
  ];
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)">
    <div class="panel"><span class="label">Area produksi</span><h2>Ringkasan tim punya 4 kesalahan</h2>
      <p class="sub">Ketuk baris yang keliru, lalu pilih koreksinya. <span class="hitung" id="hit">0 dari 4 diperbaiki</span></p>
      <div id="baris">${BARIS.map(b => `<button class="baris" data-k="${b.k}" aria-expanded="false"><span class="k">${b.l}</span><span class="v">${esc(b.v)}</span><span class="st">cek</span></button><div class="opsi-baris" id="o-${b.k}" hidden></div>`).join('')}</div>
      <div class="umpan" id="umpan" aria-live="polite"></div>${alatMisi()}</div>
    <div class="pembanding"><h3>Pembanding · Catatan Klien</h3><ul><li>Usaha: Herba Sari Bali</li><li>Audiens: 16–25 tahun</li><li>Media: Instagram, persegi</li><li>Harga: Rp15.000</li><li>Warna: hijau dan kuning</li></ul>
      <h3>Hasil negosiasi Misi 4</h3><ul><li>Draf: 5 November 2026</li><li>Final: <b>7 November 2026</b>, disetujui klien</li></ul>
      <div class="mentor" style="margin:0"><span class="ava" style="background-image:url(${IMG.kirana.ava})"></span><p><b>Kak Kirana</b>Bandingkan dengan kesepakatan.</p></div></div>
  </div></div>`;
  await bicara('kirana', 'Tim membuat ringkasan brief, tapi ada empat kesalahan. Bandingkan setiap baris dengan catatan klien dan hasil negosiasi terakhir.', { id: 'vo_m5_1', tombol: 'Mulai' });
  let fix = 0;
  const benarkan = (b, nilaiBaru, lihat) => {
    const p = nilai(b.k, lihat); if (!lihat) Audio2.efek('benar');
    const row = $(`.baris[data-k="${b.k}"]`); row.classList.remove('buka'); row.classList.add('ok'); row.disabled = true; row.setAttribute('aria-expanded', 'false');
    row.querySelector('.v').innerHTML = `<s>${esc(b.v)}</s>${esc(nilaiBaru)}`; row.querySelector('.st').textContent = lihat ? 'dilihat' : '+' + p;
    $('#o-' + b.k).hidden = true; fix++; $('#hit').textContent = `${fix} dari 4 diperbaiki`; tampilLihat(false);
    if (fix < 4) umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : 'Koreksi tepat!', b.why, !lihat); else akhir();
  };
  $$('#baris .baris').forEach(row => row.onclick = () => {
    Audio2.efek('klik');
    const b = BARIS.find(x => x.k === row.dataset.k);
    if (b.ok) { row.classList.add('ok'); row.disabled = true; row.querySelector('.st').textContent = 'sesuai'; umpan('info', 'Baris ini sudah sesuai', 'Datanya cocok dengan catatan klien. Cari baris lain yang keliru.'); return; }
    $$('.opsi-baris').forEach(o => o.hidden = true); $$('.baris.buka').forEach(r => { r.classList.remove('buka'); r.setAttribute('aria-expanded', 'false'); });
    row.classList.add('buka'); row.setAttribute('aria-expanded', 'true');
    const o = $('#o-' + b.k); o.hidden = false;
    o.innerHTML = acak(b.ops.map((t, i) => ({ t, b: i === 0 }))).map((x, i) => `<button class="kartu opsi" data-h="${'ABC'[i]}" data-b="${x.b ? 1 : 0}">${esc(x.t)}</button>`).join('');
    $$('.kartu', o).forEach(btn => btn.onclick = () => {
      if (btn.dataset.b === '1') benarkan(b, btn.textContent, false);
      else { catatSalah(); Audio2.efek('salah'); btn.classList.add('salah'); btn.disabled = true; umpan('no', 'Belum sesuai', 'Bandingkan dengan catatan klien atau hasil negosiasi.'); tampilLihat(true); }
    });
    $('.kartu', o).focus({ preventScroll: true });
  });
  pasangAlat(() => { const b = BARIS.find(x => !x.ok && !M.pts.hasOwnProperty(x.k)); return b ? `Periksa baris <b>${b.l}</b>. Cocokkan dengan panel pembanding di sebelah kanan.` : 'Semua baris sudah diperbaiki.'; },
    () => { const open = $('.baris.buka'); const b = open ? BARIS.find(x => x.k === open.dataset.k) : BARIS.find(x => !x.ok && !M.pts.hasOwnProperty(x.k)); if (b) benarkan(b, b.ops[0], true); });
  async function akhir() {
    umpan('ok', 'Ringkasan sudah benar!', 'Semua data cocok dengan catatan klien dan kesepakatan terakhir.', false);
    await bicara('kirana', 'Teliti sekali! Ringkasan brief sekarang sudah konsisten. Saatnya dikirim ke Bu Sari untuk dikonfirmasi.', { pose: 'bangga', id: 'vo_m5_2', tombol: 'Selesaikan misi' });
    selesaiMisi('konfirmasi');
  }
};

/* ---------- 09 Konfirmasi klien ---------- */
SCENE.konfirmasi = async () => {
  if (!S.selesai[5]) return keScene('peta');
  pasangHUD({ judul: 'Konfirmasi brief' }); latar('redup'); tokoh('l'); tokoh('r', 'sari', 'sapa');
  const R = [['Usaha', 'Herba Sari Bali'], ['Produk', 'Kunyit Asam Segar · Rp15.000'], ['Tujuan', 'Mengenalkan produk, mengajak memesan'], ['Audiens', '16–25 tahun'], ['Media', 'Poster Instagram, format persegi'], ['Pesan', '“Segarnya Alami, Semangatnya Hari Ini”'], ['Kontak', '08xx-xxxx-xxxx'], ['Visual', 'Segar, alami, modern; hijau dan kuning'], ['Aset', 'Logo dikirim klien'], ['Tenggat', 'Draf 5 Nov · Final 7 November 2026 (disepakati)']];
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua">
    <div class="dok"><span class="label">Ringkasan Design Brief · Final</span><h3>Poster Promosi Kunyit Asam Segar</h3>
      <table>${R.map(([k, v]) => `<tr><td>${k}</td><td>${esc(v)}</td></tr>`).join('')}</table>
      <div class="cap" id="cap">DISETUJUI<small>SIMULASI</small></div></div>
    <div class="panel"><span class="label">Kirim ke klien</span><h2>Konfirmasi brief</h2>
      <div class="chat"><div class="kepala"><span class="ava" style="background-image:url(${IMG.sari.ava})"></span><div><b>Bu Sari</b><small>Klien</small></div></div><div class="isi" id="chat"><div class="gel info">Periksa ringkasan, lalu kirim.</div></div></div>
      <div class="umpan" id="umpan"></div>
      <div class="alat" id="alat-k"><button class="btn sek" id="k-kembali">Kembali perbaiki</button><button class="btn" id="k-kirim">${ICON.kirim}Kirim untuk konfirmasi</button></div>
    </div></div></div>`;
  $('#k-kembali').onclick = () => { Audio2.efek('klik'); keScene('peta'); };
  $('#k-kirim').onclick = async () => {
    Audio2.efek('klik'); $('#alat-k').hidden = true;
    const msg = 'Bu, ini ringkasan brief-nya. Mohon dicek dan dikonfirmasi.';
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel saya">${msg}<small>Kamu · terkirim</small></div>`);
    Suara.ucap('pemain', msg, 'vo_09_pemain'); await tunggu(2600);
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien mengetik" id="ketik"><i></i><i></i><i></i></div>`); await tunggu(1200); $('#ketik').remove();
    const jwb = 'Ya, ringkasan sudah sesuai. Logo akan saya kirim hari ini. Terima kasih, Kak!';
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien">${jwb}<small>Bu Sari</small></div>`);
    Audio2.efek('notif'); tokoh('r', 'sari', 'setuju');
    await tunggu(400); $('#cap').classList.add('on'); Audio2.efek('selesai'); konfeti();
    S.konfirmasi = true; simpan();
    await bicara('sari', jwb, { pose: 'setuju', id: 'vo_09' });
    $('#umpan').className = 'umpan info'; $('#umpan').innerHTML = '<div><b>Langkah berikutnya</b>Riset kreatif dan ideasi. Persetujuan ini hanya berlaku di dalam simulasi.</div>';
    await bicara('kirana', 'Brief sudah disetujui. Langkah berikutnya adalah riset kreatif dan ideasi. Ingat, persetujuan ini hanya simulasi ya.', { pose: 'bangga', sisi: 'l', id: 'vo_09_kirana', tombol: 'Lihat hasil' });
    keScene('hasil');
  };
  await tunggu(300);
  if ($('#k-kirim')) Suara.ucap('kirana', 'Periksa sekali lagi ringkasan final ini. Jika sudah yakin, kirim kepada Bu Sari.', 'vo_09_awal');
};

/* ---------- 10 Hasil dan refleksi ---------- */
SCENE.hasil = async () => {
  pasangHUD({ judul: 'Hasil dan refleksi' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'bangga');
  const t = totalSemua();
  const kat = t >= 85 ? 'Siap menganalisis brief' : t >= 70 ? 'Berkembang, pelajari umpan balik' : 'Perlu latihan, ulangi misi yang sulit';
  const SARAN = { 1: 'Baca pesan klien kata demi kata; tandai hanya yang tertulis.', 2: 'Pilih pertanyaan yang sopan dan menggali kebutuhan, bukan menebak.', 3: 'Ingat empat pertanyaan: untuk apa, siapa, di mana, seperti apa.', 4: 'Dengarkan alasan, cek kapasitas, tawarkan solusi, lalu catat kesepakatan.', 5: 'Cocokkan ringkasan dengan catatan klien dan kesepakatan terakhir.' };
  const C = 2 * Math.PI * 80;
  layar.innerHTML = `<div class="layar lebar-tokoh"><div class="dua" style="grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)">
    <div class="panel" style="text-align:center"><span class="label">Hasil misi</span>
      <div class="ring"><svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="80" fill="none" stroke="#efe6cc" stroke-width="16"/><circle id="ring" cx="90" cy="90" r="80" fill="none" stroke="#157A64" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.6s ease-out"/></svg>
        <div class="n"><div><b id="angka">0</b><small>dari 100</small></div></div></div>
      <span class="kategori">${kat}</span>
      <div style="text-align:left;margin-top:14px">${[1, 2, 3, 4, 5].map(n => `<div class="bar-misi"><img src="${LENC(n)}" alt=""><div><div style="font-size:13px;font-weight:700">${n}. ${MISI[n].nama}</div><div class="tr"><i style="width:0" data-w="${totalMisi(n) * 5}"></i></div></div><span class="nl">${totalMisi(n)}/20</span><button class="ikonbtn" style="width:44px;height:44px;box-shadow:none;background:#fff" data-u="${n}" aria-label="Ulangi misi ${n}">${ICON.ulang}</button></div>${totalMisi(n) < 20 ? `<p class="saran">Saran: ${SARAN[n]}</p>` : ''}`).join('')}</div>
    </div>
    <div class="panel refl"><span class="label">Refleksi · tidak dinilai otomatis</span><h2>Apa yang kamu pelajari?</h2>
      <p class="sub">Jawabanmu hanya tersimpan di perangkat ini dan tidak dikirim ke mana pun. Diskusikan bersama guru.</p>
      ${['Mengapa desainer perlu bertanya kepada klien?', 'Apa akibatnya jika brief salah?', 'Bagaimana merespons perubahan dari klien?'].map((q, i) => `<label for="r${i}">${i + 1}. ${q}</label><textarea id="r${i}" data-i="${i}" placeholder="Tulis jawabanmu…">${esc(S.refleksi[i] || '')}</textarea>`).join('')}
      <div class="alat"><button class="btn sek" id="h-ringkas">${ICON.catatan}Ringkasan brief</button><button class="btn sek" id="h-salin">Salin jawaban</button><button class="btn" id="h-selesai">Selesai</button></div>
    </div></div></div>`;
  $$('textarea').forEach(ta => ta.oninput = () => { S.refleksi[+ta.dataset.i] = ta.value; simpan(); });
  $$('[data-u]').forEach(b => b.onclick = () => { Audio2.efek('klik'); bukaMisi(+b.dataset.u); });
  $('#h-selesai').onclick = () => { Audio2.efek('klik'); keScene('muka'); };
  $('#h-ringkas').onclick = () => { Audio2.efek('klik'); modalCatatan(); };
  $('#h-salin').onclick = async () => {
    const teks = `Misi Desainer: Pecahkan Design Brief\nSkor: ${t}/100 (${kat})\n\n` + ['Mengapa desainer perlu bertanya kepada klien?', 'Apa akibatnya jika brief salah?', 'Bagaimana merespons perubahan dari klien?'].map((q, i) => `${i + 1}. ${q}\n${S.refleksi[i] || '-'}`).join('\n\n');
    try { await navigator.clipboard.writeText(teks); toast('Jawaban disalin. Tempel di tugas atau pesan untuk guru.'); } catch (e) { toast('Tidak dapat menyalin otomatis di perangkat ini.'); }
  };
  await tunggu(200);
  $('#ring').style.strokeDashoffset = C * (1 - t / 100);
  $$('.tr i').forEach(i => i.style.width = i.dataset.w + '%');
  let a = 0; const step = () => { a = Math.min(t, a + Math.max(1, Math.round(t / 40))); const el = $('#angka'); if (!el) return; el.textContent = a; if (a < t) requestAnimationFrame(step); }; step();
  Audio2.efek('jingle');
  await tunggu(1200);
  if ($('#h-selesai')) Suara.ucap('kirana', `Skor totalmu ${t} dari 100. ${kat}. Brief yang jelas membantu kita melanjutkan riset dan ideasi. Sekarang, jawab pertanyaan refleksi ya!`, 'vo_10');
};

/* =========================================================
   6. MULAI: pramuat aset, buka audio dengan ketukan
   ========================================================= */
async function pramuat() {
  const gambar = ['assets/img/latar.webp', 'assets/img/peta.webp', ...Object.values(IMG.kirana), ...Object.values(IMG.sari), ...[1, 2, 3, 4, 5].map(LENC), BINTANG];
  const total = gambar.length + 1; let n = 0;
  const maju = () => { n++; $('#muatbar').style.width = Math.round(n / total * 100) + '%'; };
  const pImg = Promise.all(gambar.map(src => new Promise(r => { const i = new Image(); i.onload = i.onerror = () => { maju(); r(); }; i.src = src; })));
  const pAud = Audio2.muat().then(maju);
  await Promise.all([pImg, pAud]);
}
Suara.muat();
pramuat().then(() => {
  $('#muatteks').textContent = 'Studio siap!';
  const b = $('#masuk'); b.hidden = false; b.focus({ preventScroll: true });
  b.onclick = () => {
    Audio2.buka();
    try { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) {}
    Audio2.efek('klik'); Audio2.musik();
    $('#splash').style.transition = 'opacity .5s'; $('#splash').style.opacity = 0; setTimeout(() => $('#splash').remove(), 500);
    keScene('muka');
  };
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { Suara.stop(); if (Audio2.ctx) Audio2.ctx.suspend(); else if (Audio2.el) Audio2.el.pause(); }
  else { if (Audio2.ctx) Audio2.ctx.resume(); Audio2.musik(); }
});
// untuk pengujian & naskah suara
window.__MD = { S: () => S, keScene, lisan };
})();

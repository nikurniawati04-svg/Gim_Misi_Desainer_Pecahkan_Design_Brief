/* Misi Desainer: Pecahkan Design Brief — 3 studi kasus
   Gim edukasi DKV · SMK PGRI 2 Badung · Kreator: Ni Luh Putu Kurniawati, S.Kom., M.Kom.
   Semua nama usaha, harga, tanggal, dan kontak dalam gim ini bersifat fiktif. */
(function () {
'use strict';

/* =========================================================
   1. UTILITAS & ASET
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const tunggu = ms => new Promise(r => setTimeout(r, ms));
const acak = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const polos = s => String(s).replace(/<[^>]+>/g, '');

const SVGURI = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
const AVA_WAYAN = SVGURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#2E6F8F"/><path d="M16 120c2-26 20-36 44-36s42 10 44 36z" fill="#F4F0E4"/><path d="M48 86l12 14 12-14" fill="#E2DCC9"/><path d="M52 84h16v10H52z" fill="#A86E45"/><ellipse cx="60" cy="58" rx="24" ry="27" fill="#B97A4F"/><path d="M35 50c0-14 11-24 25-24s25 10 25 24c-8-6-16-8-25-8s-17 2-25 8z" fill="#1E1A17"/><path d="M33 47c4-14 15-21 27-21s23 7 27 21l-4 4c-6-7-14-10-23-10s-17 3-23 10z" fill="#F8F6EF" stroke="#C9B98D" stroke-width="1.5"/><path d="M60 27l7 13H53z" fill="#F8F6EF" stroke="#C9B98D" stroke-width="1.5"/><path d="M40 44h40" stroke="#C59A3A" stroke-width="2.5"/><circle cx="51" cy="60" r="2.8" fill="#1E1A17"/><circle cx="69" cy="60" r="2.8" fill="#1E1A17"/><path d="M50 72c4 2 7 3 10 3s6-1 10-3" stroke="#1E1A17" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M52 70q8-4 16 0" stroke="#2A1F18" stroke-width="3" fill="none"/></svg>`);
const AVA_AYU = SVGURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#B23A48"/><path d="M14 120c2-26 21-36 46-36s44 10 46 36z" fill="#F2A7B5"/><path d="M47 84l13 18 13-18" fill="#fff" opacity=".7"/><path d="M52 82h16v10H52z" fill="#B07A52"/><circle cx="84" cy="34" r="15" fill="#1C1512"/><ellipse cx="60" cy="58" rx="23" ry="26" fill="#C48A5C"/><path d="M36 58c-2-20 9-32 24-32s26 12 24 32c-4-12-12-18-24-18s-20 6-24 18z" fill="#1C1512"/><g fill="#fff"><circle cx="90" cy="24" r="5"/><circle cx="97" cy="29" r="5"/><circle cx="95" cy="37" r="5"/><circle cx="87" cy="36" r="5"/><circle cx="85" cy="28" r="5"/></g><circle cx="91" cy="31" r="3" fill="#E9BA4A"/><circle cx="51" cy="60" r="2.8" fill="#1C1512"/><circle cx="69" cy="60" r="2.8" fill="#1C1512"/><path d="M51 70q9 7 18 0" stroke="#7A2B2B" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="37" cy="66" r="2.5" fill="#E9BA4A"/><circle cx="83" cy="66" r="2.5" fill="#E9BA4A"/></svg>`);
const AVA_PEMAIN = SVGURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#203943"/><text x="60" y="78" text-anchor="middle" font-family="Poppins,Arial" font-weight="800" font-size="52" fill="#E9BA4A">K</text></svg>`);

const IMG = {
  kirana: { sapa: 'assets/img/kirana_sapa.webp', tunjuk: 'assets/img/kirana_tunjuk.webp', pikir: 'assets/img/kirana_pikir.webp', bangga: 'assets/img/kirana_bangga.webp', ava: 'assets/img/avatar_kirana.webp' },
  sari: { sapa: 'assets/img/sari_sapa.webp', jelas: 'assets/img/sari_jelas.webp', ragu: 'assets/img/sari_ragu.webp', setuju: 'assets/img/sari_setuju.webp', ava: 'assets/img/avatar_sari.webp' },
  wayan: { ava: AVA_WAYAN }, ayu: { ava: AVA_AYU }, pemain: { ava: AVA_PEMAIN },
};
const NAMA = { kirana: 'Kak Kirana', sari: 'Bu Sari', wayan: 'Pak Wayan', ayu: 'Bu Ayu', pemain: 'Kamu' };
const LENC = n => `assets/ui/lencana_misi_${n}.svg`;
const BINTANG = 'assets/ui/ikon_bintang.svg';
const PATH = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  suara: PATH('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>'),
  bisu: PATH('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 5M22 9l-5 5"/>'),
  tanya: PATH('<circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.3a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.4-2.7 4"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/>'),
  peta: PATH('<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4z"/><path d="M9 4v13.5M15 6.5V20"/>'),
  catatan: PATH('<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>'),
  ulang: PATH('<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4v4.5H8"/>'),
  putar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
  lampu: PATH('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/>'),
  mata: PATH('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  lanjut: PATH('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  kirim: PATH('<path d="M21 3 10 14"/><path d="M21 3 14.5 21l-4.5-7-7-4.5L21 3z"/>'),
  tutup: PATH('<path d="M6 6l12 12M18 6 6 18"/>'),
  layar: PATH('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  orang: PATH('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.6c2.8.1 4.8 1.8 5.5 5.4"/>'),
};

/* =========================================================
   2. DATA 3 STUDI KASUS (semua data fiktif)
   ========================================================= */
const KASUS = [
{
  id: 'sari', no: 1, klien: { id: 'sari', nama: 'Bu Sari', panggil: 'Bu', ilustrasi: true, peran: 'Pemilik Herba Sari Bali' },
  jenis: 'Poster Instagram', produkDesain: 'poster', tantangan: 'Klien meminta tenggat lebih cepat', usaha: 'Herba Sari Bali',
  ringkas: 'Usaha minuman herbal ingin mempromosikan produk barunya kepada anak muda lewat media sosial.',
  pesan: { jam: '08.15', html: 'Halo, saya pemilik usaha <span class="sorot" data-s="jenis">minuman herbal</span>. Saya ingin <span class="sorot" data-s="media">poster promosi Instagram</span> untuk <span class="sorot" data-s="audiens">anak muda</span>. Harap selesai <span class="sorot" data-s="waktu">minggu depan</span>.' },
  kartu: [
    { k: 'jenis', t: 'Jenis usaha', b: 1, bukti: 'minuman herbal' }, { k: 'nama', t: 'Nama usaha', s: 'Bu Sari belum menyebut nama usahanya.' },
    { k: 'media', t: 'Media', b: 1, bukti: 'poster promosi Instagram' }, { k: 'harga', t: 'Harga produk', s: 'Pesan belum menyebut harga produk.' },
    { k: 'audiens', t: 'Audiens umum', b: 1, bukti: 'anak muda' }, { k: 'kontak', t: 'Nomor kontak', s: 'Tidak ada nomor kontak di pesan.' },
    { k: 'waktu', t: 'Waktu perkiraan', b: 1, bukti: 'minggu depan' }, { k: 'tanggal', t: 'Tanggal pasti', s: '“Minggu depan” baru perkiraan, belum tanggal pasti.' },
  ],
  kurang: 'Nama usaha, produk, harga, kontak, dan tanggal pasti',
  salam: 'Halo, Kak! Saya Sari. Silakan tanya apa saja yang Kakak perlukan untuk poster saya.',
  tanya: [
    { k: 'usaha', nama: 'Usaha & produk', benar: 'Boleh tahu nama usaha dan produk yang ingin dipromosikan, Bu?', salah: 'Produknya enak tidak, Bu?', alasan: 'Rasa produk tidak membantu kebutuhan desain. Tanyakan identitas usaha dan produknya.', tip: 'Desainer perlu tahu siapa kliennya dan apa produknya.',
      jawab: 'Nama usaha saya Herba Sari Bali. Produk yang ingin dipromosikan Kunyit Asam Segar, harganya Rp15.000 per botol.' },
    { k: 'tujuan', nama: 'Tujuan & sasaran', benar: 'Poster ini untuk tujuan apa, Bu, dan siapa yang ingin Ibu jangkau?', salah: 'Pokoknya dibuat ramai dan heboh saja ya, Bu?', alasan: 'Pertanyaan ini menebak-nebak dan tidak menggali tujuan maupun sasaran.', tip: 'Tujuan dan sasaran menentukan gaya bahasa dan tampilan poster.',
      jawab: 'Tujuannya mengenalkan produk dan mengajak orang memesan. Sasarannya anak muda usia 16–25 tahun.' },
    { k: 'pesan', nama: 'Pesan & kontak', benar: 'Pesan utama dan kontak apa yang wajib dicantumkan di poster, Bu?', salah: 'Kontaknya nanti saya cari sendiri saja ya, Bu.', alasan: 'Kontak usaha harus berasal dari klien. Mencari sendiri berisiko salah.', tip: 'Informasi kontak harus berasal langsung dari klien.',
      jawab: 'Pesan utamanya “Segarnya Alami, Semangatnya Hari Ini”. Cantumkan nomor pemesanan kami, 08xx-xxxx-xxxx.' },
    { k: 'waktu', nama: 'Waktu & aset', benar: 'Kapan tanggal pastinya, Bu, dan aset apa saja yang sudah Ibu punya?', salah: 'Pokoknya minggu depan ya, Bu.', alasan: '“Minggu depan” masih perkiraan. Desainer perlu tanggal pasti dan daftar aset.', tip: 'Perkiraan waktu belum cukup. Tanyakan tanggal pasti dan aset yang sudah ada.',
      jawab: 'Final tanggal 7 November 2026. Logo akan saya kirim nanti. Saya ingin tampilannya segar, alami, dan modern, dengan warna hijau dan kuning.' },
  ],
  kesan: 'Saya ingin tampilannya segar, alami, dan modern. Logonya saya kirim nanti ya, Kak.',
  catatan: [['Usaha', 'Herba Sari Bali'], ['Produk', 'Kunyit Asam Segar'], ['Harga', 'Rp15.000'], ['Audiens', '16–25 tahun'], ['Tujuan', 'Mengenalkan produk dan mengajak memesan'], ['Media', 'Instagram, format persegi'], ['Pesan utama', '“Segarnya Alami, Semangatnya Hari Ini”'], ['Warna', 'Hijau dan kuning'], ['Arahan visual', 'Segar, alami, modern'], ['Aset', 'Logo akan dikirim klien'], ['Kontak', '08xx-xxxx-xxxx'], ['Tenggat', '7 November 2026']],
  catatanSepakat: { Tenggat: 'Draf 5 Nov · final 7 November 2026 (disepakati)' },
  susun: [{ k: 'tujuan', t: 'Mengenalkan produk dan mengajak memesan' }, { k: 'audiens', t: 'Anak muda usia 16–25 tahun' }, { k: 'media', t: 'Instagram, format persegi' }, { k: 'visual', t: 'Segar, alami, modern; hijau dan kuning' }],
  nego: {
    pesan: 'Kak, apakah posternya bisa final 5 November? Saya butuh lebih cepat dua hari dari jadwal semula.',
    awal: 'Final 7 November 2026', baru: 'Final 5 November 2026 (2 hari lebih cepat)',
    pembuka: 'Klien meminta tenggat lebih cepat. Jangan panik, dan jangan langsung berjanji. Kita selesaikan langkah demi langkah.',
    langkah: [
      { k: 'alasan', nama: 'Tanya alasan', q: 'Bu Sari meminta poster final lebih cepat. Apa yang kamu lakukan pertama kali?',
        ops: [{ t: 'Bertanya: “Boleh tahu, Bu, apa yang membuat poster perlu selesai lebih cepat?”', b: 1 }, { t: 'Langsung menjawab: “Pasti bisa, Bu!”', s: 'Berjanji tanpa tahu alasannya bisa membuat tim kewalahan.' }, { t: 'Menolak: “Maaf, tidak bisa. Jadwalnya sudah tetap.”', s: 'Menolak tanpa mendengar alasan klien membuat komunikasi buntu.' }],
        jawab: ['klien', 'Ada bazar kampus tanggal 8 November. Saya ingin promosi sudah tayang sebelum itu.', 'ragu'] },
      { k: 'dampak', nama: 'Cek kapasitas', q: 'Sebelum menjawab Bu Sari, apa langkahmu berikutnya?',
        ops: [{ t: 'Cek kapasitas tim dan dampaknya pada jadwal produksi.', b: 1 }, { t: 'Langsung jawab “Pasti bisa, Bu!” tanpa memeriksa pekerjaan.', s: 'Janji tanpa cek kapasitas berisiko tenggat terlewat dan kualitas turun.' }, { t: 'Ubah tenggat di brief menjadi 5 November tanpa konfirmasi.', s: 'Mengubah brief sepihak membuat tim dan klien tidak sepakat.' }],
        jawab: ['kirana', 'Aku sudah cek. Tim sedang mengerjakan dua proyek lain. Jika final 5 November, waktu revisi jadi sangat sempit.'] },
      { k: 'tawar', nama: 'Tawarkan solusi', q: 'Apa tawaran yang paling realistis untuk Bu Sari?',
        ops: [{ t: 'Tawarkan draf 5 November untuk dicek, final tetap 7 November, masih sebelum bazar.', b: 1 }, { t: 'Paksa tim lembur agar final 5 November, tanpa waktu revisi.', s: 'Menghapus waktu revisi berisiko menghasilkan desain yang belum sesuai.' }, { t: 'Sarankan Bu Sari mencari desainer lain.', s: 'Ini tidak menyelesaikan masalah dan merusak hubungan dengan klien.' }],
        jawab: ['klien', 'Oh, begitu. Draf tanggal 5 dan final tetap 7 November? Baik, saya setuju. Masih sempat untuk bazar.', 'setuju'] },
      { k: 'catat', nama: 'Catat kesepakatan', q: 'Kesepakatan sudah tercapai. Bagaimana mencatatnya?',
        ops: [{ t: 'Catat di brief: draf 5 November, final 7 November 2026, disetujui klien.', b: 1 }, { t: 'Tidak perlu dicatat, cukup diingat saja.', s: 'Kesepakatan yang tidak dicatat mudah terlupa atau disalahpahami.' }, { t: 'Catat tenggat final 5 November karena itu permintaan terakhir klien.', s: 'Permintaan itu sudah berubah. Catat hasil kesepakatan terakhir.' }],
        jawab: ['kirana', 'Tepat. Kesepakatan dicatat, bukan diasumsikan.'] },
    ],
    sepakat: 'Draf 5 November · final tetap 7 November 2026',
    akhir: 'Terima kasih, Kak. Penjelasannya jelas. Tenggat final tetap 7 November.',
    hasil: ['Draf: 5 November 2026', 'Final: 7 November 2026, disetujui klien'],
  },
  periksa: [
    { k: 'usaha', l: 'Usaha', v: 'Herba Sari Bali', ok: 1 },
    { k: 'audiens', l: 'Audiens', v: '35–50 tahun', ops: ['16–25 tahun', '25–35 tahun', 'Semua umur'], why: 'Catatan klien: audiens 16–25 tahun.' },
    { k: 'media', l: 'Media', v: 'Poster cetak A3', ops: ['Instagram, format persegi', 'Spanduk 3 × 1 m', 'Brosur lipat'], why: 'Catatan klien: Instagram, format persegi.' },
    { k: 'harga', l: 'Harga', v: 'Rp25.000', ops: ['Rp15.000', 'Rp12.000', 'Rp20.000'], why: 'Catatan klien: harga Rp15.000.' },
    { k: 'warna', l: 'Warna', v: 'Hijau dan kuning', ok: 1 },
    { k: 'tenggat', l: 'Tenggat', v: 'Final 5 November 2026', ops: ['Final 7 November 2026 (disepakati)', 'Final 8 November 2026', 'Final 2 November 2026'], why: 'Hasil negosiasi Misi 4: final tetap 7 November 2026.' },
  ],
  pembanding: ['Usaha: Herba Sari Bali', 'Audiens: 16–25 tahun', 'Media: Instagram, persegi', 'Harga: Rp15.000', 'Warna: hijau dan kuning'],
  brief: { judul: 'Poster Promosi Kunyit Asam Segar', rows: [['Usaha', 'Herba Sari Bali'], ['Produk', 'Kunyit Asam Segar · Rp15.000'], ['Tujuan', 'Mengenalkan produk, mengajak memesan'], ['Audiens', '16–25 tahun'], ['Media', 'Poster Instagram, format persegi'], ['Pesan', '“Segarnya Alami, Semangatnya Hari Ini”'], ['Kontak', '08xx-xxxx-xxxx'], ['Visual', 'Segar, alami, modern; hijau dan kuning'], ['Aset', 'Logo dikirim klien'], ['Tenggat', 'Draf 5 Nov · final 7 November 2026 (disepakati)']] },
  setuju: 'Ya, ringkasan sudah sesuai. Logo akan saya kirim hari ini. Terima kasih, Kak!',
},
{
  id: 'wayan', no: 2, klien: { id: 'wayan', nama: 'Pak Wayan', panggil: 'Pak', ilustrasi: false, peran: 'Pemilik Kopi Bukit Wayan' },
  jenis: 'Label kemasan', produkDesain: 'label', tantangan: 'Klien ingin menambah banyak teks di label kecil', usaha: 'Kopi Bukit Wayan',
  ringkas: 'Usaha kopi bubuk rumahan ingin kemasannya tampil menarik sebagai oleh-oleh untuk wisatawan.',
  pesan: { jam: '09.30', html: 'Om swastiastu, Kak. Saya punya usaha <span class="sorot" data-s="jenis">kopi bubuk</span> rumahan. Saya perlu desain <span class="sorot" data-s="media">label kemasan</span> supaya kopi saya menarik untuk <span class="sorot" data-s="audiens">wisatawan</span>. Kalau bisa selesai <span class="sorot" data-s="waktu">pertengahan bulan depan</span>.' },
  kartu: [
    { k: 'jenis', t: 'Jenis usaha', b: 1, bukti: 'kopi bubuk' }, { k: 'nama', t: 'Nama usaha', s: 'Pak Wayan belum menyebut nama usahanya.' },
    { k: 'media', t: 'Media', b: 1, bukti: 'label kemasan' }, { k: 'ukuran', t: 'Ukuran label', s: 'Ukuran label belum disebut sama sekali.' },
    { k: 'audiens', t: 'Audiens umum', b: 1, bukti: 'wisatawan' }, { k: 'harga', t: 'Harga produk', s: 'Pesan belum menyebut harga kopinya.' },
    { k: 'waktu', t: 'Waktu perkiraan', b: 1, bukti: 'pertengahan bulan depan' }, { k: 'tanggal', t: 'Tanggal pasti', s: '“Pertengahan bulan depan” baru perkiraan, belum tanggal pasti.' },
  ],
  kurang: 'Nama usaha, nama produk, ukuran label, harga, dan tanggal pasti',
  salam: 'Om swastiastu, Kak. Silakan, apa saja yang perlu Kakak tanyakan untuk label kopi saya?',
  tanya: [
    { k: 'usaha', nama: 'Usaha & produk', benar: 'Boleh tahu nama usaha dan nama produk kopinya, Pak?', salah: 'Kopinya pahit atau manis, Pak?', alasan: 'Rasa kopi tidak membantu kebutuhan desain label. Tanyakan identitas usaha dan produknya.', tip: 'Label harus memuat identitas usaha dan nama produk.',
      jawab: 'Nama usahanya Kopi Bukit Wayan. Produknya Kopi Arabika Bubuk isi 250 gram, harganya Rp65.000.' },
    { k: 'tujuan', nama: 'Tujuan & sasaran', benar: 'Label ini untuk tujuan apa, Pak, dan siapa pembeli yang ingin dijangkau?', salah: 'Pokoknya dibuat mewah saja ya, Pak?', alasan: 'Kata “mewah” hanya tebakan. Desainer perlu tahu tujuan dan calon pembelinya.', tip: 'Tujuan dan calon pembeli menentukan gaya label.',
      jawab: 'Saya ingin kopi saya terlihat sebagai oleh-oleh khas Bali dan dibeli wisatawan. Sasarannya wisatawan usia 25–45 tahun.' },
    { k: 'isi', nama: 'Isi & ukuran', benar: 'Informasi apa yang wajib ada di label, dan berapa ukurannya, Pak?', salah: 'Isi labelnya saya karang sendiri saja ya, Pak.', alasan: 'Informasi kemasan seperti berat bersih harus dari klien, tidak boleh dikarang.', tip: 'Label kemasan punya informasi wajib dan ukuran yang tetap.',
      jawab: 'Ukuran label 8 × 12 cm. Wajib ada nama produk, berat bersih 250 gram, dan nomor izin produk yang nanti saya kirim. Slogannya “Aroma Bukit, Rasa Bali”.' },
    { k: 'waktu', nama: 'Waktu & aset', benar: 'Kapan tanggal pastinya, Pak, dan aset apa yang sudah Bapak punya?', salah: 'Pokoknya pertengahan bulan ya, Pak.', alasan: 'Perkiraan waktu belum cukup. Desainer perlu tanggal pasti dan daftar aset.', tip: 'Tanyakan tanggal pasti dan aset yang sudah ada.',
      jawab: 'Final tanggal 14 November 2026. Saya punya foto biji kopi dan logo. Saya ingin kesannya alami dan hangat, warna cokelat dan krem.' },
  ],
  kesan: 'Saya ingin kesannya alami dan hangat, seperti suasana kebun kopi di pagi hari, Kak.',
  catatan: [['Usaha', 'Kopi Bukit Wayan'], ['Produk', 'Kopi Arabika Bubuk 250 g'], ['Harga', 'Rp65.000'], ['Audiens', 'Wisatawan 25–45 tahun'], ['Tujuan', 'Tampil sebagai oleh-oleh khas Bali agar dibeli'], ['Media', 'Label kemasan 8 × 12 cm'], ['Pesan utama', '“Aroma Bukit, Rasa Bali”'], ['Warna', 'Cokelat dan krem'], ['Arahan visual', 'Alami, hangat'], ['Aset', 'Foto biji kopi dan logo'], ['Info wajib', 'Berat bersih, nomor izin produk'], ['Tenggat', '14 November 2026']],
  catatanSepakat: { Tenggat: 'Final 16 November 2026 (disepakati)', Media: 'Label 8 × 12 cm, dua bahasa + kode QR' },
  susun: [{ k: 'tujuan', t: 'Tampil sebagai oleh-oleh khas Bali agar dibeli' }, { k: 'audiens', t: 'Wisatawan usia 25–45 tahun' }, { k: 'media', t: 'Label kemasan 8 × 12 cm' }, { k: 'visual', t: 'Alami, hangat; cokelat dan krem' }],
  nego: {
    pesan: 'Kak, bisa labelnya ditambah tulisan bahasa Inggris dan seluruh cerita tentang kebun kopi saya? Banyak pembeli dari luar negeri.',
    awal: 'Label 8 × 12 cm, bahasa Indonesia, final 14 November', baru: 'Tambah bahasa Inggris + cerita kebun yang panjang',
    pembuka: 'Klien ingin menambah isi label. Ruang label terbatas, jadi kita perlu memahami kebutuhannya dulu sebelum menjawab.',
    langkah: [
      { k: 'alasan', nama: 'Tanya alasan', q: 'Pak Wayan ingin banyak teks tambahan. Apa yang kamu lakukan pertama kali?',
        ops: [{ t: 'Bertanya: “Boleh tahu, Pak, pembeli seperti apa yang ingin dijangkau dengan teks bahasa Inggris?”', b: 1 }, { t: 'Langsung setuju dan memasukkan semua teks ke label.', s: 'Label kecil yang penuh teks menjadi sesak dan sulit dibaca.' }, { t: 'Menolak: “Tidak bisa, Pak. Labelnya sudah fix.”', s: 'Menolak tanpa mendengar alasan membuat klien merasa tidak didengar.' }],
        jawab: ['klien', 'Banyak wisatawan mancanegara mampir ke toko saya. Mereka sering bertanya asal-usul kopinya.'] },
      { k: 'dampak', nama: 'Cek dampak', q: 'Sebelum menjawab Pak Wayan, apa yang perlu diperiksa?',
        ops: [{ t: 'Cek dampaknya pada ruang label 8 × 12 cm, keterbacaan teks, dan jadwal.', b: 1 }, { t: 'Langsung perkecil semua huruf agar teks muat.', s: 'Huruf yang terlalu kecil tidak terbaca oleh pembeli.' }, { t: 'Ganti ukuran label tanpa bertanya ke klien.', s: 'Ukuran kemasan adalah keputusan klien dan memengaruhi biaya cetak.' }],
        jawab: ['kirana', 'Aku sudah cek. Kalau semua cerita masuk, huruf harus sangat kecil dan label jadi sesak. Perubahan isi juga butuh tambahan dua hari.'] },
      { k: 'tawar', nama: 'Tawarkan solusi', q: 'Apa tawaran yang paling realistis untuk Pak Wayan?',
        ops: [{ t: 'Tawarkan: info wajib dua bahasa di label, cerita kebun lewat kode QR, final mundur ke 16 November.', b: 1 }, { t: 'Paksakan semua teks masuk dengan huruf sangat kecil.', s: 'Pembeli tidak akan bisa membaca labelnya.' }, { t: 'Hapus info berat bersih agar ada ruang.', s: 'Informasi wajib pada kemasan tidak boleh dihapus.' }],
        jawab: ['klien', 'Ide kode QR itu bagus sekali! Baik, saya setuju, final tanggal 16 November.'] },
      { k: 'catat', nama: 'Catat kesepakatan', q: 'Kesepakatan sudah tercapai. Bagaimana mencatatnya?',
        ops: [{ t: 'Catat di brief: label dua bahasa + kode QR, final 16 November 2026, disetujui klien.', b: 1 }, { t: 'Tidak perlu dicatat, cukup diingat saja.', s: 'Perubahan yang tidak dicatat mudah terlupa atau disalahpahami.' }, { t: 'Catat: semua cerita kebun dimasukkan ke label.', s: 'Itu permintaan awal, bukan hasil kesepakatan.' }],
        jawab: ['kirana', 'Tepat. Perubahan isi dan jadwal dicatat, bukan diasumsikan.'] },
    ],
    sepakat: 'Dua bahasa + kode QR cerita kebun · final 16 November 2026',
    akhir: 'Suksma, Kak. Jadi label dua bahasa, ada kode QR, dan final tanggal 16 November.',
    hasil: ['Isi: dua bahasa + kode QR cerita kebun', 'Final: 16 November 2026, disetujui klien'],
  },
  periksa: [
    { k: 'usaha', l: 'Usaha', v: 'Kopi Bukit Wayan', ok: 1 },
    { k: 'audiens', l: 'Audiens', v: 'Pelajar 13–18 tahun', ops: ['Wisatawan 25–45 tahun', 'Pekerja kantor 30–50 tahun', 'Semua umur'], why: 'Catatan klien: wisatawan usia 25–45 tahun.' },
    { k: 'media', l: 'Media', v: 'Label 5 × 5 cm', ops: ['Label kemasan 8 × 12 cm', 'Label 10 × 15 cm', 'Stiker bulat 5 cm'], why: 'Catatan klien: label kemasan 8 × 12 cm.' },
    { k: 'bahasa', l: 'Bahasa', v: 'Bahasa Indonesia saja', ops: ['Indonesia + Inggris, kode QR', 'Bahasa Inggris saja', 'Indonesia, Inggris, Jepang'], why: 'Hasil negosiasi Misi 4: dua bahasa dan kode QR.' },
    { k: 'warna', l: 'Warna', v: 'Cokelat dan krem', ok: 1 },
    { k: 'tenggat', l: 'Tenggat', v: 'Final 14 November 2026', ops: ['Final 16 November 2026 (disepakati)', 'Final 12 November 2026', 'Final 30 November 2026'], why: 'Hasil negosiasi Misi 4: final mundur ke 16 November 2026.' },
  ],
  pembanding: ['Usaha: Kopi Bukit Wayan', 'Audiens: wisatawan 25–45 tahun', 'Media: label kemasan 8 × 12 cm', 'Warna: cokelat dan krem'],
  brief: { judul: 'Label Kemasan Kopi Arabika Bubuk', rows: [['Usaha', 'Kopi Bukit Wayan'], ['Produk', 'Kopi Arabika Bubuk 250 g · Rp65.000'], ['Tujuan', 'Tampil sebagai oleh-oleh khas Bali agar dibeli'], ['Audiens', 'Wisatawan 25–45 tahun'], ['Media', 'Label kemasan 8 × 12 cm, dua bahasa + kode QR'], ['Pesan', '“Aroma Bukit, Rasa Bali”'], ['Info wajib', 'Berat bersih 250 g, nomor izin produk'], ['Visual', 'Alami, hangat; cokelat dan krem'], ['Aset', 'Foto biji kopi dan logo'], ['Tenggat', 'Final 16 November 2026 (disepakati)']] },
  setuju: 'Ya, ringkasannya sudah sesuai. Foto dan logo saya kirim hari ini. Suksma, Kak!',
},
{
  id: 'ayu', no: 3, klien: { id: 'ayu', nama: 'Bu Ayu', panggil: 'Bu', ilustrasi: false, peran: 'Pengelola Sanggar Tari Laras Ayu' },
  jenis: 'Spanduk', produkDesain: 'spanduk', tantangan: 'Klien ingin memasukkan 12 foto ke spanduk', usaha: 'Sanggar Tari Laras Ayu',
  ringkas: 'Sanggar tari anak membuka pendaftaran murid baru dan perlu spanduk yang terbaca dari jalan.',
  pesan: { jam: '13.05', html: 'Selamat siang, Kak. Saya mengelola <span class="sorot" data-s="jenis">sanggar tari anak</span>. Kami mau <span class="sorot" data-s="tujuan">membuka pendaftaran murid baru</span> dan perlu <span class="sorot" data-s="media">spanduk di depan sanggar</span>. Sasarannya <span class="sorot" data-s="audiens">para orang tua</span>. Mohon dibantu secepatnya.' },
  kartu: [
    { k: 'jenis', t: 'Jenis usaha', b: 1, bukti: 'sanggar tari anak' }, { k: 'nama', t: 'Nama sanggar', s: 'Bu Ayu belum menyebut nama sanggarnya.' },
    { k: 'media', t: 'Media', b: 1, bukti: 'spanduk di depan sanggar' }, { k: 'ukuran', t: 'Ukuran spanduk', s: 'Ukuran spanduk belum disebut.' },
    { k: 'audiens', t: 'Audiens umum', b: 1, bukti: 'para orang tua' }, { k: 'biaya', t: 'Biaya pendaftaran', s: 'Pesan belum menyebut biaya pendaftaran.' },
    { k: 'tujuan', t: 'Tujuan umum', b: 1, bukti: 'membuka pendaftaran murid baru' }, { k: 'tanggal', t: 'Tanggal pasti', s: '“Secepatnya” bukan tanggal. Waktunya belum jelas.' },
  ],
  kurang: 'Nama sanggar, ukuran spanduk, biaya, kontak, dan tanggal pasti',
  salam: 'Selamat siang, Kak. Silakan tanyakan apa saja supaya spanduk sanggar kami tepat sasaran.',
  tanya: [
    { k: 'usaha', nama: 'Sanggar & kelas', benar: 'Boleh tahu nama sanggar dan kelas apa saja yang dibuka, Bu?', salah: 'Ibu sendiri bisa menari tari apa saja?', alasan: 'Pertanyaan pribadi ini tidak membantu isi spanduk. Tanyakan identitas sanggar dan kelasnya.', tip: 'Spanduk perlu memuat nama sanggar dan program yang ditawarkan.',
      jawab: 'Nama sanggarnya Laras Ayu. Kami membuka kelas tari Bali untuk anak usia 6–12 tahun, biayanya Rp100.000 per bulan.' },
    { k: 'tujuan', nama: 'Tujuan & sasaran', benar: 'Apa yang Ibu harapkan setelah orang tua melihat spanduk ini?', salah: 'Pokoknya dibuat seramai mungkin ya, Bu?', alasan: '“Seramai mungkin” hanya tebakan dan tidak menggali tujuan.', tip: 'Tanyakan tindakan yang diharapkan dari orang yang melihat spanduk.',
      jawab: 'Saya ingin orang tua tertarik dan mendaftarkan anaknya. Sasarannya orang tua usia 30–45 tahun yang lewat di depan sanggar.' },
    { k: 'isi', nama: 'Isi & ukuran', benar: 'Berapa ukuran spanduk, dan informasi apa yang wajib tercantum, Bu?', salah: 'Kontaknya saya ambil dari internet saja ya, Bu.', alasan: 'Kontak dari internet bisa salah. Informasi wajib harus dari klien.', tip: 'Ukuran dan isi wajib menentukan tata letak spanduk.',
      jawab: 'Ukurannya 3 × 1 meter. Tulis “Ayo Menari, Lestarikan Budaya!”, jadwal latihan Sabtu dan Minggu, serta nomor pendaftaran 08xx-xxxx-xxxx.' },
    { k: 'waktu', nama: 'Waktu & aset', benar: 'Kapan spanduk harus terpasang, Bu, dan foto apa yang sudah ada?', salah: 'Secepatnya saja ya, Bu, nanti saya kira-kira sendiri.', alasan: '“Secepatnya” bukan tanggal. Desainer perlu tanggal pasti dan daftar aset.', tip: 'Tanyakan tanggal pasti dan aset foto yang tersedia.',
      jawab: 'Harus terpasang 10 November 2026. Saya punya foto anak-anak menari. Warnanya merah dan emas, kesannya ceria dan khas Bali.' },
  ],
  kesan: 'Saya ingin spanduknya ceria dan khas Bali, supaya orang tua langsung tertarik, Kak.',
  catatan: [['Sanggar', 'Sanggar Tari Laras Ayu'], ['Program', 'Kelas tari Bali anak 6–12 tahun'], ['Biaya', 'Rp100.000/bulan'], ['Audiens', 'Orang tua 30–45 tahun'], ['Tujuan', 'Mengajak orang tua mendaftarkan anak'], ['Media', 'Spanduk 3 × 1 m di depan sanggar'], ['Pesan utama', '“Ayo Menari, Lestarikan Budaya!”'], ['Warna', 'Merah dan emas'], ['Arahan visual', 'Ceria, khas Bali'], ['Aset', 'Foto anak-anak menari'], ['Kontak', '08xx-xxxx-xxxx'], ['Tenggat', '10 November 2026']],
  catatanSepakat: { Aset: '2 foto utama; kolase 12 foto untuk media sosial (12 Nov)' },
  susun: [{ k: 'tujuan', t: 'Mengajak orang tua mendaftarkan anak' }, { k: 'audiens', t: 'Orang tua usia 30–45 tahun' }, { k: 'media', t: 'Spanduk 3 × 1 m di depan sanggar' }, { k: 'visual', t: 'Ceria, khas Bali; merah dan emas' }],
  nego: {
    pesan: 'Kak, saya ingin semua 12 foto murid dimasukkan ke spanduk, biar semua orang tua senang.',
    awal: 'Spanduk 3 × 1 m: 1–2 foto + teks besar', baru: 'Masukkan 12 foto murid ke spanduk',
    pembuka: 'Klien ingin mengubah isi spanduk. Spanduk dibaca dari jauh, jadi kita perlu menimbang dampaknya bersama klien.',
    langkah: [
      { k: 'alasan', nama: 'Tanya alasan', q: 'Bu Ayu ingin 12 foto masuk spanduk. Apa yang kamu lakukan pertama kali?',
        ops: [{ t: 'Bertanya: “Boleh tahu, Bu, apa yang ingin dicapai dengan memasukkan semua foto?”', b: 1 }, { t: 'Langsung setuju dan menata 12 foto kecil-kecil.', s: 'Spanduk jadi ramai dan pesan utamanya sulit terbaca dari jalan.' }, { t: 'Menolak: “Tidak bisa, Bu, nanti jelek.”', s: 'Menolak tanpa penjelasan terdengar tidak sopan dan tidak membantu.' }],
        jawab: ['klien', 'Saya ingin semua orang tua murid merasa anaknya dihargai.'] },
      { k: 'dampak', nama: 'Cek dampak', q: 'Sebelum menjawab Bu Ayu, apa yang perlu diperiksa?',
        ops: [{ t: 'Cek dampaknya: spanduk dibaca dari jauh, pesan utama harus tetap terbaca.', b: 1 }, { t: 'Perkecil huruf pesan utama agar semua foto muat.', s: 'Pesan utama yang kecil tidak terbaca oleh orang yang lewat.' }, { t: 'Ganti ukuran spanduk menjadi 6 × 2 m tanpa bertanya.', s: 'Ukuran dan biaya cetak adalah keputusan klien.' }],
        jawab: ['kirana', 'Aku sudah cek. Orang yang lewat hanya melihat spanduk beberapa detik. Dua belas foto kecil akan menenggelamkan pesan utamanya.'] },
      { k: 'tawar', nama: 'Tawarkan solusi', q: 'Apa tawaran yang paling tepat untuk Bu Ayu?',
        ops: [{ t: 'Tawarkan: spanduk cukup 2 foto utama; kolase 12 foto untuk media sosial sanggar.', b: 1 }, { t: 'Masukkan 12 foto dan hapus nomor pendaftaran.', s: 'Tanpa nomor pendaftaran, orang tua tidak tahu cara mendaftar.' }, { t: 'Biarkan Bu Ayu menata sendiri fotonya.', s: 'Itu melepas tanggung jawab desainer kepada klien.' }],
        jawab: ['klien', 'Wah, kolase di media sosial itu ide bagus! Saya setuju, spanduk cukup dua foto. Kolasenya tanggal 12 November ya.'] },
      { k: 'catat', nama: 'Catat kesepakatan', q: 'Kesepakatan sudah tercapai. Bagaimana mencatatnya?',
        ops: [{ t: 'Catat di brief: spanduk 2 foto (10 Nov), kolase 12 foto (12 Nov), disetujui klien.', b: 1 }, { t: 'Tidak perlu dicatat, cukup diingat saja.', s: 'Pekerjaan tambahan yang tidak dicatat mudah terlupa.' }, { t: 'Catat: 12 foto dimasukkan ke spanduk.', s: 'Itu permintaan awal, bukan hasil kesepakatan.' }],
        jawab: ['kirana', 'Tepat. Kesepakatan dicatat, termasuk pekerjaan tambahannya.'] },
    ],
    sepakat: 'Spanduk 2 foto (10 Nov) · kolase 12 foto media sosial (12 Nov)',
    akhir: 'Terima kasih, Kak. Spanduk dua foto tetap tanggal 10, kolasenya menyusul tanggal 12 November.',
    hasil: ['Spanduk: 2 foto utama, terpasang 10 November 2026', 'Tambahan: kolase 12 foto, 12 November 2026'],
  },
  periksa: [
    { k: 'usaha', l: 'Sanggar', v: 'Sanggar Tari Laras Ayu', ok: 1 },
    { k: 'audiens', l: 'Audiens', v: 'Anak usia 6–12 tahun', ops: ['Orang tua usia 30–45 tahun', 'Remaja 15–20 tahun', 'Guru tari'], why: 'Sasaran spanduk adalah orang tua 30–45 tahun; anak 6–12 tahun adalah peserta kelas.' },
    { k: 'ukuran', l: 'Ukuran', v: 'Spanduk 1 × 1 m', ops: ['Spanduk 3 × 1 m', 'Spanduk 2 × 1 m', 'Spanduk 5 × 2 m'], why: 'Catatan klien: spanduk 3 × 1 meter.' },
    { k: 'foto', l: 'Foto', v: '12 foto murid', ops: ['2 foto utama (kolase di media sosial)', 'Tanpa foto', '6 foto murid'], why: 'Hasil negosiasi Misi 4: spanduk cukup 2 foto utama.' },
    { k: 'biaya', l: 'Biaya', v: 'Rp150.000/bulan', ops: ['Rp100.000/bulan', 'Rp50.000/bulan', 'Gratis'], why: 'Catatan klien: biaya Rp100.000 per bulan.' },
    { k: 'tenggat', l: 'Tenggat', v: 'Terpasang 10 November 2026', ok: 1 },
  ],
  pembanding: ['Sanggar: Laras Ayu', 'Audiens: orang tua 30–45 tahun', 'Media: spanduk 3 × 1 m', 'Biaya: Rp100.000/bulan', 'Tenggat: 10 November 2026'],
  brief: { judul: 'Spanduk Pendaftaran Sanggar Tari', rows: [['Sanggar', 'Sanggar Tari Laras Ayu'], ['Program', 'Kelas tari Bali anak 6–12 tahun · Rp100.000/bulan'], ['Tujuan', 'Mengajak orang tua mendaftarkan anak'], ['Audiens', 'Orang tua 30–45 tahun'], ['Media', 'Spanduk 3 × 1 m di depan sanggar'], ['Pesan', '“Ayo Menari, Lestarikan Budaya!”'], ['Kontak', '08xx-xxxx-xxxx · latihan Sabtu & Minggu'], ['Visual', 'Ceria, khas Bali; merah dan emas'], ['Aset', '2 foto utama; kolase 12 foto (12 Nov)'], ['Tenggat', 'Spanduk terpasang 10 November 2026']] },
  setuju: 'Ya, sudah sesuai semuanya. Foto-fotonya saya kirim sore ini. Terima kasih, Kak!',
},
];
KASUS.forEach(k => { k.pesan.teks = polos(k.pesan.html); });

/* --- Naskah suara (kode baris untuk rekaman asli) --- */
const NASKAH_UMUM = {
  umum_muka: ['kirana', 'Selamat datang di Studio Kreativa! Aku Kak Kirana, pendamping brief di sini. Hari ini ada tiga klien yang menunggu bantuanmu.'],
  umum_panduan: ['kirana', 'Baca pesan klien, temukan informasinya, lalu susun brief. Tenang saja, kesalahan adalah kesempatan belajar. Petunjuk boleh dipakai kapan pun.'],
  umum_kasus: ['kirana', 'Pilih satu klien untuk kamu bantu. Setiap klien punya kebutuhan desain yang berbeda. Selesaikan ketiganya, ya!'],
  umum_peta: ['kirana', 'Ini peta studio kita. Mulailah dari meja resepsionis. Pesan klien sudah menunggu.'],
  umum_peta_konf: ['kirana', 'Semua misi selesai! Sekarang kirim ringkasan brief kepada klien untuk dikonfirmasi.'],
  umum_m1_2: ['kirana', 'Sekarang giliranmu. Tandai empat informasi yang sudah ada di pesan itu. Hati-hati, ada kartu yang informasinya belum disebut!'],
  umum_m2_2: ['kirana', 'Pilih satu pertanyaan di setiap kelompok, lalu tekan Kirim pertanyaan. Pertanyaan yang baik itu sopan dan membantu kebutuhan desain.'],
  umum_m2_3: ['kirana', 'Bagus sekali! Sekarang semua informasi penting sudah terkumpul di Catatan Klien.'],
  umum_m3_1: ['kirana', 'Kelompokkan informasi dari klien agar tim memahami tugasnya. Setiap kartu menjawab satu pertanyaan: untuk apa, siapa, di mana, atau seperti apa.'],
  umum_m5_1: ['kirana', 'Tim membuat ringkasan brief, tapi ada empat kesalahan. Bandingkan setiap baris dengan catatan klien dan hasil negosiasi terakhir.'],
  umum_k_kirana: ['kirana', 'Brief sudah disetujui. Langkah berikutnya adalah riset kreatif dan ideasi. Ingat, persetujuan ini hanya simulasi ya.'],
};
function naskahKasus(k) {
  const n = k.klien.nama, id = k.klien.id, N = {};
  const add = (kode, s, t) => { N[k.id + '_' + kode] = [s, t]; };
  add('m1_1', 'kirana', `Ada pesan baru dari ${n}, klien kita. Sebelum mendesain, kita harus tahu dulu informasi apa saja yang sudah diberikan.`);
  add('m1_pesan', id, k.pesan.teks);
  add('m1_3', 'kirana', `Hebat! Semua informasi yang ada sudah ditemukan. Tapi ${k.kurang.toLowerCase()} belum ada. Kita perlu bertanya kepada ${n}.`);
  add('m2_1', id, k.salam);
  k.tanya.forEach((g, i) => add('m2_jawab' + (i + 1), id, g.jawab));
  add('info', id, k.kesan);
  add('m3_2', 'kirana', `Rapi sekali! Sekarang tim bisa langsung memahami untuk apa, untuk siapa, di mana, dan seperti apa ${k.produkDesain} ini.`);
  add('m4_pesan', id, k.nego.pesan);
  add('m4_1', 'kirana', k.nego.pembuka);
  k.nego.langkah.forEach(l => add('m4_' + l.k, l.jawab[0] === 'klien' ? id : 'kirana', l.jawab[1]));
  add('m4_2', id, k.nego.akhir);
  add('m5_2', 'kirana', `Teliti sekali! Ringkasan brief sekarang sudah konsisten. Saatnya dikirim ke ${n} untuk dikonfirmasi.`);
  add('k_awal', 'kirana', `Periksa sekali lagi ringkasan final ini. Jika sudah yakin, kirim kepada ${n}.`);
  add('k_pemain', 'pemain', `${k.klien.panggil}, ini ringkasan brief-nya. Mohon dicek dan dikonfirmasi.`);
  add('k_setuju', id, k.setuju);
  return N;
}
const NASKAH = Object.assign({}, NASKAH_UMUM, ...KASUS.map(naskahKasus));

/* =========================================================
   3. PROGRES (hanya di perangkat)
   ========================================================= */
const KUNCI = 'misiDesainer_3kasus_v2';
const awal = () => ({ kasus: null, data: {}, lihatPanduan: false, set: { musik: true, tokoh: true, efek: true, volMusik: 0.45, volTokoh: 1, suara: '' } });
let S = awal(), bisaSimpan = true;
try { const raw = localStorage.getItem(KUNCI); if (raw) { const d = JSON.parse(raw); S = Object.assign(awal(), d); S.set = Object.assign(awal().set, d.set || {}); } localStorage.setItem(KUNCI + '_t', '1'); localStorage.removeItem(KUNCI + '_t'); }
catch (e) { bisaSimpan = false; }
function simpan() { if (!bisaSimpan) return; try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch (e) { bisaSimpan = false; } }
const K = () => KASUS.find(k => k.id === S.kasus) || KASUS[0];
function D(id) { id = id || K().id; if (!S.data[id]) S.data[id] = { skor: {}, selesai: {}, konfirmasi: false, refleksi: ['', '', ''] }; return S.data[id]; }

/* =========================================================
   4. AUDIO: musik latar, efek, suara tokoh
   ========================================================= */
const Audio2 = {
  ctx: null, gMusik: null, gEfek: null, buf: {}, src: null, el: null,
  file: { backsound: 'assets/audio/backsound.mp3', benar: 'assets/audio/benar.wav', salah: 'assets/audio/coba_lagi.wav', klik: 'assets/audio/klik.wav', selesai: 'assets/audio/misi_selesai.wav', notif: 'assets/audio/notifikasi.mp3', jingle: 'assets/audio/jingle_akhir.mp3' },
  async muat() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) { try { this.ctx = new AC(); } catch (e) { this.ctx = null; } }
    await Promise.all(Object.keys(this.file).map(async k => {
      try {
        if (!this.ctx) throw 0;
        const r = await fetch(this.file[k]); if (!r.ok) throw 0;
        const ab = await r.arrayBuffer();
        this.buf[k] = await new Promise((res, rej) => this.ctx.decodeAudioData(ab, res, rej));
      } catch (e) { const a = new Audio(this.file[k]); a.preload = 'auto'; this.buf[k] = a; }
    }));
    if (this.ctx) {
      this.gMusik = this.ctx.createGain(); this.gMusik.gain.value = 0; this.gMusik.connect(this.ctx.destination);
      this.gEfek = this.ctx.createGain(); this.gEfek.gain.value = 0.8; this.gEfek.connect(this.ctx.destination);
    }
  },
  buka() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  efek(k) {
    if (!S.set.efek) return; const b = this.buf[k]; if (!b) return;
    if (typeof AudioBuffer !== 'undefined' && b instanceof AudioBuffer) { const s = this.ctx.createBufferSource(); s.buffer = b; s.connect(this.gEfek); s.start(); }
    else { try { const a = b.cloneNode(); a.volume = .8; a.play().catch(() => {}); } catch (e) {} }
  },
  volTarget() { return S.set.musik ? S.set.volMusik * (Suara.bicara ? 0.35 : 1) : 0; },
  musik() {
    const b = this.buf.backsound; if (!b) return;
    if (typeof AudioBuffer !== 'undefined' && b instanceof AudioBuffer) {
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
  return polos(t)
    .replace(/08xx-xxxx-xxxx/g, 'nomor kontak usaha')
    .replace(/Rp\s?([\d.]+)/g, (m, a) => terbilang(+a.replace(/\./g, '')) + ' rupiah')
    .replace(/(\d+)\s?[–-]\s?(\d+)/g, '$1 sampai $2')
    .replace(/(\d+)\s?×\s?(\d+)/g, '$1 kali $2')
    .replace(/\bA3\b/g, 'A tiga').replace(/\b(\d+)\s?g\b/g, '$1 gram').replace(/\bcm\b/g, 'senti').replace(/\b(\d+) m\b/g, '$1 meter')
    .replace(/\d+/g, m => terbilang(+m).trim())
    .replace(/\bbrief\b/gi, 'brif').replace(/\bdesign\b/gi, 'desain').replace(/\bQR\b/g, 'Q R').replace(/\bDKV\b/g, 'D K V')
    .replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim();
}

const REKAMAN = new Set(window.REKAMAN_SUARA || []);
const Suara = {
  semua: [], bicara: false, token: 0, el: null, simpanUtt: [],
  GAYA: { kirana: { pitch: 1.06, rate: 1.0 }, sari: { pitch: 0.9, rate: 0.93 }, wayan: { pitch: 0.78, rate: 0.92, pria: 1 }, ayu: { pitch: 1.0, rate: 0.97 }, pemain: { pitch: 1.0, rate: 1.03 } },
  muat() { if (!('speechSynthesis' in window)) return; const isi = () => { this.semua = speechSynthesis.getVoices(); }; isi(); speechSynthesis.onvoiceschanged = isi; },
  kandidat() {
    let v = this.semua.filter(x => /^(id|in)([-_]|$)/i.test(x.lang));
    if (!v.length) v = this.semua.filter(x => /^ms([-_]|$)/i.test(x.lang));
    return v.sort((a, b) => this.nilai(b) - this.nilai(a));
  },
  nilai(v) { const n = v.name; let s = 0; if (/natural|neural/i.test(n)) s += 10; if (/online/i.test(n)) s += 4; if (/google/i.test(n)) s += 3; if (/gadis|damayanti|female|wanita/i.test(n)) s += 2; if (/ardi|\bmale\b|pria/i.test(n)) s -= 1; if (/^(id|in)/i.test(v.lang)) s += 5; return s; },
  suaraDipilih(pria) {
    const k = this.kandidat();
    if (pria) { const p = k.find(v => /ardi|\bmale\b|pria|laki/i.test(v.name)); if (p) return p; }
    return k.find(v => v.name === S.set.suara) || k[0] || null;
  },
  stop() {
    this.token++; this.bicara = false;
    try { if ('speechSynthesis' in window) { if (speechSynthesis.speaking || speechSynthesis.pending) this.baruBatal = performance.now(); speechSynthesis.cancel(); } } catch (e) {}
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
        const g = this.GAYA[siapa] || this.GAYA.kirana;
        if (!this.semua.length) this.semua = speechSynthesis.getVoices();
        // Chrome Android mengabaikan suara yang diputar tepat setelah dibatalkan: beri jeda singkat
        if (this.baruBatal && performance.now() - this.baruBatal < 400) { await tunggu(220); if (tok !== this.token) return; }
        try { speechSynthesis.resume(); } catch (e) {}
        const v = this.suaraDipilih(g.pria);
        const priaAsli = !!(v && g.pria && /ardi|\bmale\b|pria|laki/i.test(v.name));
        const kal = (lisan(teks).match(/[^.!?…]+[.!?…]*/g) || []).map(s => s.trim()).filter(Boolean);
        for (let i = 0; i < kal.length; i++) {
          if (tok !== this.token) break;
          const k = kal[i], tanya = /\?$/.test(k), seru = /!$/.test(k);
          await new Promise(res => {
            const u = new SpeechSynthesisUtterance(k);
            if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'id-ID';
            u.volume = S.set.volTokoh;
            const dasar = priaAsli ? 1.0 : g.pitch;
            u.pitch = Math.max(0.5, Math.min(2, dasar + (tanya ? 0.12 : seru ? 0.06 : 0) + (i === 0 ? 0.03 : 0) + (Math.random() * 0.04 - 0.02)));
            u.rate = g.rate * (seru ? 1.04 : 1) * (k.length < 22 ? 0.96 : 1);
            const batas = setTimeout(res, 1500 + k.length * 110);
            u.onend = () => { clearTimeout(batas); this.berhasil = true; res(); };
            u.onerror = ev => { clearTimeout(batas); if (ev && /unavailable|not-allowed|synthesis/.test(ev.error || '')) this.peringat(ev.error); res(); };
            this.simpanUtt.push(u); if (this.simpanUtt.length > 20) this.simpanUtt.shift();
            speechSynthesis.speak(u);
          });
          if (tok === this.token && i < kal.length - 1) await tunggu(tanya ? 260 : 180);
        }
      }
      else this.peringat('tidak-didukung');
    } catch (e) {}
    if (tok === this.token) { this.bicara = false; Audio2.musik(); tandaBicara(false); }
  },
  kode(id) { const n = NASKAH[id]; if (n) this.ucap(n[0], n[1], id); },
  dalamAplikasi() { return /; wv\)|FBAN|FBAV|Instagram|Line\/|MicroMessenger|TikTok/i.test(navigator.userAgent); },
  peringat(sebab) {
    if (this._peringat) return; this._peringat = true;
    const pesan = (!('speechSynthesis' in window) || this.dalamAplikasi())
      ? 'Suara tokoh tidak didukung di aplikasi ini. Buka gim di Chrome atau Safari agar percakapan terdengar. Teks tetap tampil.'
      : 'Suara bahasa Indonesia belum tersedia di perangkat ini. Pasang "Bahasa Indonesia" di pengaturan Text-to-speech HP. Teks tetap tampil.';
    toast(pesan, 6000);
  },
  status() {
    if (!('speechSynthesis' in window)) return { ok: false, teks: this.dalamAplikasi() ? 'Tidak didukung di aplikasi ini. Buka gim di Chrome atau Safari.' : 'Peramban ini tidak mendukung suara bacaan.' };
    const k = this.kandidat();
    if (!k.length) return { ok: false, teks: 'Suara bahasa Indonesia belum terdeteksi. Tekan Tes. Jika tetap diam, pasang "Bahasa Indonesia" di pengaturan Text-to-speech HP.' };
    return { ok: true, teks: 'Suara siap: ' + this.suaraDipilih().name };
  },
};
function tandaBicara(on, siapa) {
  $$('.tokoh').forEach(t => t.classList.toggle('bicara', !!on && t.dataset.siapa === siapa));
  const g = $('#dialog .gelombang'); if (g) g.classList.toggle('on', !!on);
}

/* =========================================================
   5. KOMPONEN TAMPILAN
   ========================================================= */
const layar = $('#screen'), hud = $('#hud'), dialog = $('#dialog'), modal = $('#modal');
function toast(t, ms = 2600) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; $('#toast').append(d); setTimeout(() => d.remove(), ms); }
function umumkan(t) { const s = $('#sr-live'); s.textContent = ''; setTimeout(() => s.textContent = t, 30); }
function latar(mode) { $('#bg').className = mode || ''; }
const ava = id => (IMG[id] || IMG.pemain).ava;

const POSE_PENGGANTI = { sapa: 'sapa', jelas: 'tunjuk', ragu: 'pikir', setuju: 'bangga' };
function tokoh(sisi, siapa, pose) {
  const el = $('#tokoh-' + sisi);
  if (!siapa) { el.classList.add('sembunyi'); el.dataset.siapa = ''; return; }
  if (!IMG[siapa][pose]) { siapa = 'kirana'; pose = IMG.kirana[pose] ? pose : (POSE_PENGGANTI[pose] || 'sapa'); }
  const src = IMG[siapa][pose], img = el.querySelector('img');
  if (el.dataset.siapa !== siapa || el.classList.contains('sembunyi')) { el.classList.add('sembunyi'); requestAnimationFrame(() => setTimeout(() => el.classList.remove('sembunyi'), 30)); }
  if (img.getAttribute('src') !== src) img.src = src;
  el.dataset.siapa = siapa;
}
function tokohKlien(pose) { tokoh('r', K().klien.id, pose); }
function tanpaTokoh() { tokoh('l'); tokoh('r'); }

function bicara(siapa, teks, o = {}) {
  return new Promise(res => {
    if (o.pose) tokoh(o.sisi || 'r', siapa, o.pose);
    const kelas = siapa === 'kirana' ? '' : siapa === 'pemain' ? 'pemain' : 'klien';
    dialog.className = 'buka' + (o.kanan ? ' kanan' : '');
    dialog.innerHTML = `<div class="dlg ${kelas}"><div class="ava" style="background-image:url('${ava(siapa)}')"></div>
      <span class="nama">${NAMA[siapa]}</span><p id="dlg-teks"></p>
      <div class="aksi"><span class="gelombang" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span>berbicara…</span></span>
        <button class="btn sek kecil" id="dlg-ulang" aria-label="Putar ulang suara">${ICON.ulang}<span>Putar ulang</span></button>
        <button class="btn kecil" id="dlg-lanjut">${esc(o.tombol || 'Lanjut')} ${ICON.lanjut}</button></div></div>`;
    $('#tirai').classList.add('on'); document.body.classList.add('dlg-buka');
    const p = $('#dlg-teks'); let i = 0, selesaiKetik = false;
    const ketik = setInterval(() => { i += 2; p.textContent = teks.slice(0, i); if (i >= teks.length) { clearInterval(ketik); selesaiKetik = true; } }, 22);
    const ucap = () => Suara.ucap(siapa, teks, o.id); ucap();
    $('#dlg-ulang').onclick = () => { Audio2.efek('klik'); ucap(); };
    const lanjut = $('#dlg-lanjut');
    lanjut.onclick = () => {
      if (!selesaiKetik) { clearInterval(ketik); p.textContent = teks; selesaiKetik = true; return; }
      Audio2.efek('klik'); Suara.stop(); dialog.className = ''; dialog.innerHTML = ''; $('#tirai').classList.remove('on'); document.body.classList.remove('dlg-buka'); res();
    };
    setTimeout(() => lanjut.focus({ preventScroll: true }), 50);
  });
}
const bicaraKode = (id, o = {}) => bicara(NASKAH[id][0], NASKAH[id][1], Object.assign({ id }, o));

function bukaModal(html, o = {}) {
  modal.innerHTML = `<div class="kotak" style="${o.lebar ? 'width:' + o.lebar + 'px' : ''}">${o.tanpaTutup ? '' : `<button class="ikonbtn tutup" aria-label="Tutup" data-tutup>${ICON.tutup}</button>`}${html}</div>`;
  modal.classList.add('buka'); document.body.classList.add('mdl-buka');
  $$('[data-tutup]', modal).forEach(b => b.onclick = () => { Audio2.efek('klik'); tutupModal(); });
  const f = modal.querySelector('button:not(.tutup),[href],input,select,textarea') || modal.querySelector('button'); f && f.focus({ preventScroll: true });
}
function tutupModal() { modal.classList.remove('buka'); modal.innerHTML = ''; document.body.classList.remove('mdl-buka'); }
modal.addEventListener('click', e => { if (e.target === modal && !modal.querySelector('[data-wajib]')) tutupModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('buka') && !modal.querySelector('[data-wajib]')) tutupModal(); });

function konfeti() {
  const k = document.createElement('div'); k.className = 'konfeti'; const w = ['#157A64', '#E9BA4A', '#203943', '#F08A5D', '#6FCFAE'];
  for (let i = 0; i < 70; i++) { const c = document.createElement('i'); c.style.left = Math.random() * 1280 + 'px'; c.style.background = w[i % w.length]; c.style.animationDuration = (1.8 + Math.random() * 1.8) + 's'; c.style.animationDelay = (Math.random() * .5) + 's'; k.append(c); }
  $('#stage').append(k); setTimeout(() => k.remove(), 4200);
}

/* --- Skor --- */
const MISI = [null,
  { nama: 'Pesan awal', tempat: 'Meja resepsionis', lenc: 'Detektif Informasi', x: 17, y: 52 },
  { nama: 'Bertanya kepada klien', tempat: 'Ruang tunggu', lenc: 'Komunikator', x: 21, y: 76 },
  { nama: 'Susun brief', tempat: 'Meja desain', lenc: 'Penyusun Brief', x: 50, y: 27 },
  { nama: 'Negosiasi perubahan', tempat: 'Ruang rapat', lenc: 'Negosiator', x: 82, y: 60 },
  { nama: 'Periksa ringkasan', tempat: 'Area produksi', lenc: 'Brief Terkonfirmasi', x: 80, y: 23 },
];
const totalMisi = (n, id) => { const d = D(id); return d.skor[n] ? d.skor[n].total : 0; };
const totalSemua = id => [1, 2, 3, 4, 5].reduce((a, n) => a + totalMisi(n, id), 0);
const jumlahSelesai = id => [1, 2, 3, 4, 5].filter(n => D(id).selesai[n]).length;
let M = null;
function skorTampil() { if (!S.kasus) return 0; let t = totalSemua(); if (M) t = t - totalMisi(M.no) + Object.values(M.pts).reduce((a, b) => a + b, 0); return t; }
function perbaruiSkor(naik) { const el = $('#hud-skor'); if (!el) return; el.querySelector('b').textContent = skorTampil(); if (naik) { el.classList.remove('naik'); void el.offsetWidth; el.classList.add('naik'); } }
function mulaiMisi(no) { M = { no, pts: {}, salahSejak: false }; }
function nilai(kunci, lihat) { const p = lihat ? 0 : (M.salahSejak ? 3 : 5); M.pts[kunci] = p; M.salahSejak = false; perbaruiSkor(p > 0); return p; }
function catatSalah() { M.salahSejak = true; }

/* --- HUD --- */
const adaSuara = () => S.set.musik || S.set.tokoh || S.set.efek;
function pasangHUD(o = {}) {
  hud.hidden = false;
  const d = S.kasus ? D() : null;
  const titik = o.no ? `<span class="titik" aria-hidden="true">${[1, 2, 3, 4, 5].map(n => `<i class="${d.selesai[n] ? 'ok' : ''} ${o.no === n ? 'on' : ''}"></i>`).join('')}</span>` : '';
  const sub = o.sub !== undefined ? o.sub : (S.kasus ? `Kasus ${K().no} · ${K().klien.nama} · ${K().jenis}` : 'Studio Kreativa');
  hud.innerHTML = `
    <div class="judul-misi">${o.no ? `<img src="${LENC(o.no)}" alt="">` : ''}<span class="tx"><small>${esc(sub)}</small><b>${esc(o.judul || 'Studio Kreativa')}</b></span>${titik}</div>
    <div class="spacer"></div>
    ${o.skor === false ? '' : `<div class="skor" id="hud-skor" aria-label="Skor"><img src="${BINTANG}" alt=""><b>${skorTampil()}</b></div>`}
    ${d && d.selesai[2] ? `<button class="pilbtn" id="hud-catatan">${ICON.catatan}<span>Catatan</span></button>` : ''}
    ${o.peta === false ? '' : `<button class="ikonbtn" id="hud-peta" aria-label="Kembali ke studio">${ICON.peta}</button>`}
    <button class="ikonbtn" id="hud-panduan" aria-label="Panduan bermain">${ICON.tanya}</button>
    <button class="ikonbtn" id="hud-suara" aria-label="Pengaturan suara">${adaSuara() ? ICON.suara : ICON.bisu}</button>
    <button class="ikonbtn" id="hud-layar" aria-label="Layar penuh">${ICON.layar}</button>`;
  $('#hud-suara').onclick = () => { Audio2.efek('klik'); bukaSuara(); };
  $('#hud-panduan').onclick = () => { Audio2.efek('klik'); modalPanduan(); };
  $('#hud-layar').onclick = () => { Audio2.efek('klik'); layarPenuh(); };
  const pt = $('#hud-peta'); if (pt) pt.onclick = () => { Audio2.efek('klik'); keScene(S.kasus ? 'jelajah' : 'pilihKasus'); };
  const ct = $('#hud-catatan'); if (ct) ct.onclick = () => { Audio2.efek('klik'); modalCatatan(); };
}
function perbaruiIkonSuara() { ['#hud-suara', '#muka-suara'].forEach(s => { const b = $(s); if (b) b.innerHTML = adaSuara() ? ICON.suara : ICON.bisu; }); }
function layarPenuh() {
  const d = document, el = d.documentElement;
  if (!d.fullscreenElement && !d.webkitFullscreenElement) {
    const req = el.requestFullscreen || el.webkitRequestFullscreen; if (!req) { toast('Layar penuh tidak didukung di perangkat ini.'); return; }
    Promise.resolve(req.call(el)).then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }).catch(() => {});
  } else { (d.exitFullscreen || d.webkitExitFullscreen).call(d); }
}

/* --- Pengaturan suara --- */
function bukaSuara() {
  const k = Suara.kandidat(), dip = Suara.suaraDipilih();
  const opsi = k.length ? k.map(v => `<option value="${esc(v.name)}" ${dip && dip.name === v.name ? 'selected' : ''}>${esc(v.name)}${/natural|neural|online/i.test(v.name) ? ' ★' : ''}</option>`).join('') : '<option>Tidak ada suara bahasa Indonesia di perangkat ini</option>';
  const saklar = (id, on, judul, ket) => `<div class="set-row"><div><b id="lb-${id}">${judul}</b><small>${ket}</small></div><button class="saklar" role="switch" aria-labelledby="lb-${id}" aria-checked="${on}" data-s="${id}"></button></div>`;
  bukaModal(`<h2>Pengaturan suara</h2><p class="sub" style="margin:0 0 4px;font-size:14px">Teks selalu tampil, jadi gim tetap dapat dimainkan tanpa suara.</p>
    ${saklar('musik', S.set.musik, 'Musik latar', 'Musik lembut selama bermain')}
    <div class="set-row"><label for="vm"><b>Volume musik</b></label><input id="vm" type="range" min="0" max="1" step="0.05" value="${S.set.volMusik}" style="width:50%"></div>
    ${saklar('tokoh', S.set.tokoh, 'Suara tokoh', 'Kak Kirana dan klien membacakan dialog')}
    ${saklar('efek', S.set.efek, 'Efek suara', 'Bunyi benar, coba lagi, dan klik')}
    <div class="set-row" style="display:block"><b style="color:${Suara.status().ok ? 'var(--teal-d)' : 'var(--oranye)'}">${esc(Suara.status().teks)}</b></div>
    <div class="set-row" style="display:block"><label for="pilih-suara"><b>Pilih suara tokoh</b><small style="display:block">Bertanda ★ terdengar paling alami. Hasil terbaik: Microsoft Edge atau Google Chrome.</small></label>
      <div style="display:flex;gap:8px;margin-top:8px"><select id="pilih-suara">${opsi}</select><button class="btn sek kecil" id="tes-suara">${ICON.putar}Tes</button></div></div>
    <div class="alat" style="margin-top:14px"><button class="btn sek" id="semua-mati">${ICON.bisu}Matikan semua</button><button class="btn" data-tutup>Selesai</button></div>`);
  $$('.saklar', modal).forEach(b => b.onclick = () => {
    const k = b.dataset.s; S.set[k] = !S.set[k]; b.setAttribute('aria-checked', S.set[k]); simpan();
    if (k === 'musik') Audio2.musik(); if (k === 'tokoh' && !S.set.tokoh) Suara.stop(); Audio2.efek('klik'); perbaruiIkonSuara();
  });
  $('#vm').oninput = e => { S.set.volMusik = +e.target.value; Audio2.musik(); simpan(); };
  $('#pilih-suara').onchange = e => { S.set.suara = e.target.value; simpan(); };
  $('#tes-suara').onclick = () => { const t = S.set.tokoh; S.set.tokoh = true; Suara.ucap('kirana', 'Halo! Aku Kak Kirana. Apakah suaraku terdengar jelas?'); S.set.tokoh = t; };
  $('#semua-mati').onclick = () => { S.set.musik = S.set.tokoh = S.set.efek = false; simpan(); Suara.stop(); Audio2.musik(); perbaruiIkonSuara(); tutupModal(); toast('Semua suara dimatikan'); };
}

/* --- Catatan klien & panduan --- */
function htmlCatatan(kolom = 3) {
  const k = K(), sep = D().selesai[4] ? k.catatanSepakat : {};
  return `<dl class="catatan ${kolom === 2 ? 'dua' : ''}">${k.catatan.map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(sep[a] || b)}</dd></div>`).join('')}</dl>`;
}
function modalCatatan() { bukaModal(`<h2>Catatan Klien <span class="fiktif">data fiktif</span></h2><p class="sub" style="margin:0 0 12px;font-size:14px">${esc(K().klien.nama)} · ${esc(K().usaha)}</p>${htmlCatatan(3)}<div class="alat" style="margin-top:14px"><button class="btn" data-tutup>Tutup</button></div>`, { lebar: 900 }); }
function htmlAturan() {
  return `<div class="angka3"><div><b>5</b>misi per kasus</div><div><b>4</b>item per misi</div><div class="e"><b>100</b>poin per kasus</div></div>
  <ul class="aturan">
    <li><i style="background:#157A64"></i><span><b>5 poin</b> jika benar pada percobaan pertama, <b>3 poin</b> jika benar setelah memperbaiki.</span></li>
    <li><i style="background:#8A968D"></i><span><b>0 poin</b> jika memakai <b>Lihat jawaban</b> (muncul setelah satu jawaban salah).</span></li>
    <li><i style="background:#203943"></i><span><b>Petunjuk</b> gratis dan boleh dipakai kapan saja. Tidak ada batas waktu.</span></li>
    <li><i style="background:#E9BA4A"></i><span>Ada <b>3 klien</b> dengan kebutuhan berbeda. Pilih kasus dari menu, selesaikan semuanya.</span></li>
    <li><i style="background:#B4500F"></i><span>Misi dapat diulang dari <b>peta studio</b>; hanya skor misi itu yang diganti.</span></li>
  </ul>`;
}
function modalPanduan() {
  bukaModal(`<h2>Cara bermain</h2><div style="display:flex;flex-direction:column;gap:12px">${htmlAturan()}<p class="sub" style="margin:0;font-size:13px">${bisaSimpan ? 'Progres tersimpan otomatis di perangkat ini.' : 'Penyimpanan perangkat tidak tersedia; progres hilang jika halaman ditutup.'} Gim tidak mengumpulkan data pribadi.</p></div><div class="alat" style="margin-top:14px"><button class="btn" data-tutup>Mengerti</button></div>`, { lebar: 660 });
}

/* =========================================================
   6. SCENE
   ========================================================= */
const SCENE = {};
async function keScene(nama, arg) {
  Suara.stop(); tutupModal(); dialog.className = ''; dialog.innerHTML = ''; $('#tirai').classList.remove('on'); document.body.classList.remove('dlg-buka');
  layar.innerHTML = ''; M = null;
  if (nama === 'peta') nama = 'jelajah';
  $('#stage').classList.toggle('muka', nama === 'muka');
  if (nama !== 'jelajah') Dunia.keluar();
  await SCENE[nama](arg);
}

/* ---------- Laman muka ---------- */
SCENE.muka = async () => {
  hud.hidden = false; hud.innerHTML = `<div class="spacer"></div><button class="ikonbtn" id="muka-suara" aria-label="Pengaturan suara"></button><button class="ikonbtn" id="muka-layar" aria-label="Layar penuh">${ICON.layar}</button>`; latar(''); tokoh('l'); tokoh('r', 'kirana', 'sapa');
  const ada = Object.keys(S.data).some(id => jumlahSelesai(id) > 0);
  layar.innerHTML = `<div class="layar ka" data-p="muka" style="top:-60px;bottom:0;align-items:center">
    <div class="kartu-judul">
      <span class="logo-studio" style="color:var(--teal)">Studio Kreativa · DKV</span>
      <h1>Misi Desainer</h1>
      <span class="pita">Pecahkan Design Brief</span>
      <p>Hari pertamamu sebagai desainer magang. Bantu tiga klien memahami kebutuhan mereka, lalu susun design brief yang jelas.</p>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px">${KASUS.map(k => `<span class="ava-bulat" style="width:44px;height:44px;border:3px solid var(--emas);background-image:url('${ava(k.klien.id)}')"></span>`).join('')}<span style="font-size:14px;font-weight:600;margin-left:4px">3 klien menunggu di meja resepsionis</span></div>
      <div class="tombol-baris">
        <button class="btn" id="b-mulai">${ada ? 'Lanjutkan' : 'Mulai'} ${ICON.lanjut}</button>
        <button class="btn sek" id="b-panduan">Panduan</button>
        <button class="btn sek" id="b-tentang">Tentang</button>
      </div>
      ${ada ? `<p style="margin:14px 0 0;font-size:13px">Progres tersimpan di perangkat ini. <button class="btn sek kecil" id="b-reset" style="min-height:34px;box-shadow:none;margin-left:6px">Main dari awal</button></p>` : ''}
      ${bisaSimpan ? '' : '<p style="margin:14px 0 0;font-size:13px;color:var(--oranye)">Penyimpanan perangkat tidak tersedia. Progres tidak tersimpan jika halaman ditutup.</p>'}
    </div></div>`;
  perbaruiIkonSuara();
  $('#muka-suara').onclick = () => { Audio2.efek('klik'); bukaSuara(); };
  $('#muka-layar').onclick = () => { Audio2.efek('klik'); layarPenuh(); };
  $('#b-mulai').onclick = () => { Audio2.efek('klik'); keScene(S.lihatPanduan ? 'pilihKasus' : 'panduan'); };
  $('#b-panduan').onclick = () => { Audio2.efek('klik'); keScene('panduan'); };
  $('#b-tentang').onclick = () => { Audio2.efek('klik'); modalTentang(); };
  const r = $('#b-reset'); if (r) r.onclick = () => { Audio2.efek('klik'); bukaModal(`<h2>Main dari awal?</h2><p>Semua skor, lencana, dan jawaban refleksi dari ketiga kasus di perangkat ini akan dihapus.</p><div class="alat"><button class="btn sek" data-tutup>Batal</button><button class="btn" id="ya-reset">Ya, mulai baru</button></div>`, { lebar: 520 }); $('#ya-reset').onclick = () => { const set = S.set; S = awal(); S.set = set; simpan(); tutupModal(); keScene('muka'); }; };
  await tunggu(500);
  if ($('#b-mulai')) Suara.kode('umum_muka');
};
function modalTentang() {
  bukaModal(`<h2>Tentang gim ini</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;font-size:14px;line-height:1.55">
  <div><p style="margin:0 0 10px">Gim edukasi mata pelajaran <b>Desain Komunikasi Visual</b> (Fase F, SMK) tentang memahami dan menyusun <b>design brief</b> melalui tiga studi kasus: poster Instagram, label kemasan, dan spanduk.</p>
    <span class="label">Tujuan pembelajaran</span>
    <ol style="margin:4px 0 0;padding-left:18px">
      <li>Mengidentifikasi informasi yang sudah ada dalam pesan klien.</li>
      <li>Mengajukan pertanyaan yang relevan dan sopan untuk melengkapi brief.</li>
      <li>Mengelompokkan informasi ke dalam komponen design brief.</li>
      <li>Merespons perubahan kebutuhan klien melalui negosiasi.</li>
      <li>Memeriksa konsistensi ringkasan brief dengan catatan klien.</li></ol></div>
  <div><span class="label">Kredit</span>
    <p style="margin:4px 0 10px">Kreator: <b>Ni Luh Putu Kurniawati, S.Kom., M.Kom.</b> · SMK PGRI 2 Badung. Ilustrasi tokoh dan latar dibuat dengan bantuan AI. Antarmuka, efek suara, musik latar, dan avatar klien dibuat secara programatis (orisinal). Suara tokoh memakai sintesis suara perangkat atau rekaman yang ditambahkan guru.</p>
    <span class="label">Privasi</span>
    <p style="margin:4px 0 0">Tidak ada data pribadi yang dikumpulkan atau dikirim. Progres dan refleksi hanya tersimpan di perangkat ini. Semua nama usaha, harga, tanggal, dan kontak bersifat fiktif.</p></div></div>
  <div class="alat" style="margin-top:16px"><button class="btn" data-tutup>Tutup</button></div>`, { lebar: 940 });
}

/* ---------- Panduan ---------- */
SCENE.panduan = async () => {
  pasangHUD({ judul: 'Panduan permainan', sub: 'Studio Kreativa', peta: false, skor: false }); latar('redup'); tokoh('r'); tokoh('l', 'kirana', 'tunjuk');
  layar.innerHTML = `<div class="layar ki" data-p="panduan"><div class="panel" style="flex:1;gap:14px">
    <span class="label">Papan panduan</span><h2 style="font-size:28px">Cara bermain</h2>
    <p class="sub" style="font-size:15px">Baca pesan klien, temukan informasinya, tanyakan yang kurang, lalu susun dan periksa brief.</p>
    ${htmlAturan()}
    <p class="sub" style="font-size:13px">${bisaSimpan ? 'Progres tersimpan otomatis di perangkat ini.' : 'Penyimpanan perangkat tidak tersedia; progres hilang jika halaman ditutup.'} Gim tidak mengumpulkan data pribadi.</p>
    <div class="alat" style="margin-top:auto"><button class="btn sek" id="p-kembali">Kembali</button><button class="btn sek" id="p-contoh">${ICON.lampu}Coba contoh</button><button class="btn" id="p-mulai">Pilih klien ${ICON.lanjut}</button></div>
  </div></div>`;
  $('#p-kembali').onclick = () => { Audio2.efek('klik'); keScene('muka'); };
  $('#p-mulai').onclick = () => { Audio2.efek('klik'); S.lihatPanduan = true; simpan(); keScene('pilihKasus'); };
  $('#p-contoh').onclick = () => { Audio2.efek('klik'); contohLatihan(); };
  await tunggu(400);
  if ($('#p-mulai')) Suara.kode('umum_panduan');
};
function contohLatihan() {
  bukaModal(`<span class="label">Contoh latihan · tidak dinilai</span><h2>Mana yang termasuk informasi <i>media</i>?</h2>
    <p class="sub" style="margin:0 0 12px">Media menjawab pertanyaan: desainnya akan dipasang <b>di mana</b>?</p>
    <div class="daftar-opsi" id="cl"><button class="kartu opsi" data-h="A" data-b="1">Poster untuk Instagram</button><button class="kartu opsi" data-h="B" data-b="0">Warna hijau dan kuning</button></div>
    <div class="umpan" id="cl-u" aria-live="polite" style="margin-top:12px">Pilih salah satu jawaban.</div>
    <div class="alat" style="margin-top:14px"><button class="btn" data-tutup>Selesai</button></div>`, { lebar: 580 });
  $$('#cl .kartu').forEach(b => b.onclick = () => {
    const ok = b.dataset.b === '1'; b.classList.add(ok ? 'benar' : 'salah'); Audio2.efek(ok ? 'benar' : 'salah');
    const u = $('#cl-u'); u.className = 'umpan ' + (ok ? 'ok' : 'no');
    u.innerHTML = ok ? '<div><b>Tepat!</b>Instagram adalah tempat poster dipasang, jadi termasuk media.</div>' : '<div><b>Belum tepat.</b>Warna menjelaskan tampilan (arahan visual), bukan tempat. Coba yang lain.</div>';
    Suara.ucap('kirana', ok ? 'Tepat! Instagram adalah tempat poster dipasang, jadi termasuk media.' : 'Belum tepat. Warna menjelaskan tampilan, bukan tempat. Coba lagi ya.');
  });
}

/* ---------- Pilih kasus ---------- */
SCENE.pilihKasus = async () => {
  pasangHUD({ judul: 'Pilih klien', sub: 'Tiga studi kasus', peta: false, skor: false }); latar('redup'); tanpaTokoh();
  layar.innerHTML = `<div class="layar" data-p="kasus">${KASUS.map(k => {
    const d = D(k.id), n = jumlahSelesai(k.id), t = totalSemua(k.id);
    const status = d.konfirmasi ? `Selesai · skor ${t}/100` : n ? `${n} dari 5 misi · skor ${t}` : 'Belum dimulai';
    return `<div class="kasus-kartu ${S.kasus === k.id ? 'aktif' : ''}">
      <span class="no">Kasus ${k.no}</span>
      <span class="ava-bulat" style="width:96px;height:96px;border:4px solid var(--emas);background-image:url('${ava(k.klien.id)}')"></span>
      <span class="jenis">${esc(k.jenis)}</span>
      <h3>${esc(k.klien.nama)}<br><span style="font-size:16px;color:var(--navy-2)">${esc(k.usaha)}</span></h3>
      <p>${esc(k.ringkas)}</p>
      <blockquote><b>Pesan masuk</b>“${esc(k.pesan.teks.length > 120 ? k.pesan.teks.slice(0, 118).replace(/\s\S*$/, '') + '…' : k.pesan.teks)}”</blockquote>
      <dl><dt>Desain</dt><dd>${esc(k.jenis)}</dd><dt>Tantangan</dt><dd>${esc(k.tantangan)}</dd><dt>Lencana</dt><dd>5 lencana · 100 poin</dd></dl>
      <div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><span style="font-size:13px;font-weight:700">${status}</span><div class="kemajuan"><i style="width:${n * 20}%"></i></div></div>
      <button class="btn ${d.konfirmasi ? 'sek' : ''}" data-k="${k.id}" aria-label="${n ? 'Lanjutkan' : 'Pilih'} kasus ${k.no}, ${esc(k.klien.nama)}">${d.konfirmasi ? 'Lihat hasil' : n ? 'Lanjutkan' : 'Pilih kasus'} ${ICON.lanjut}</button>
    </div>`; }).join('')}</div>`;
  $$('[data-k]').forEach(b => b.onclick = () => { Audio2.efek('klik'); S.kasus = b.dataset.k; simpan(); keScene(D().konfirmasi ? 'hasil' : 'jelajah'); });
  await tunggu(400);
  if ($('[data-k]')) Suara.kode('umum_kasus');
};

/* ---------- Studio (mode jelajah, lihat Dunia) ---------- */
const terbuka = n => n === 1 || !!D().selesai[n - 1];
function misiBerikut() { for (let n = 1; n <= 5; n++) if (!D().selesai[n]) return n; return D().konfirmasi ? 'hasil' : 'konfirmasi'; }
SCENE.jelajah = async () => { if (!S.kasus) return keScene('pilihKasus'); hud.hidden = true; tanpaTokoh(); Dunia.masuk(); };
function bukaMisi(n) {
  const m = MISI[n], d = D();
  bukaModal(`<div style="display:flex;gap:18px;align-items:center"><img src="${LENC(n)}" alt="" style="width:80px">
    <div><span class="label">Misi ${n} dari 5 · ${esc(m.tempat)}</span><h2 style="margin:2px 0">${esc(m.nama)}</h2>
    <p style="margin:0;font-size:14px">${d.selesai[n] ? `Skor terakhir <b>${totalMisi(n)}/20</b>. Mengulang misi akan mengganti skor misi ini.` : 'Lencana: <b>' + esc(m.lenc) + '</b> · 4 item × 5 poin'}</p></div></div>
    <div class="alat" style="margin-top:18px"><button class="btn sek" data-tutup>Nanti</button><button class="btn" id="go">${d.selesai[n] ? 'Ulangi misi' : 'Mulai misi'} ${ICON.lanjut}</button></div>`, { lebar: 580 });
  $('#go').onclick = () => { Audio2.efek('klik'); keScene('misi' + n); };
}

async function selesaiMisi(nextScene, berikut) {
  const total = Object.values(M.pts).reduce((a, b) => a + b, 0), no = M.no, d = D();
  d.skor[no] = { pts: Object.assign({}, M.pts), total }; d.selesai[no] = true; simpan();
  const b = total >= 20 ? 3 : total >= 14 ? 2 : 1;
  Audio2.efek('selesai'); konfeti(); perbaruiSkor(true);
  const kalimat = total === 20 ? 'Sempurna! Semua benar pada percobaan pertama.' : total >= 14 ? 'Kerja bagus! Kamu memperbaiki jawaban dengan tepat.' : 'Misi selesai. Pelajari umpan baliknya, kamu boleh mengulang misi ini kapan saja.';
  bukaModal(`<div style="text-align:center" data-wajib>
    <img src="${LENC(no)}" alt="Lencana ${esc(MISI[no].lenc)}" style="width:120px;animation:zoom .6s">
    <div style="display:flex;justify-content:center;gap:6px;margin:6px 0">${[0, 1, 2].map(i => `<img src="${BINTANG}" alt="" style="width:40px;${i < b ? '' : 'filter:grayscale(1);opacity:.35'}">`).join('')}</div>
    <span class="label">Misi ${no} selesai · Lencana ${esc(MISI[no].lenc)}</span>
    <h2 style="font-size:40px;margin:4px 0">${total}<small style="font-size:18px;color:var(--navy-2)"> / 20</small></h2>
    <p style="margin:0 0 16px">${kalimat}</p>
    <div class="alat" style="justify-content:center">${nextScene === 'infoKlien' ? `<button class="btn" id="ke-lanjut">Lihat Catatan Klien ${ICON.lanjut}</button>` : `<button class="btn sek" id="ke-lanjut">Langsung ${berikut === 'k' ? 'ke konfirmasi' : 'ke Misi ' + berikut}</button><button class="btn" id="ke-peta">${ICON.peta}Jelajahi studio</button>`}</div></div>`, { tanpaTutup: true, lebar: 560 });
  Suara.ucap('kirana', kalimat);
  const kp = $('#ke-peta'); if (kp) kp.onclick = () => { Audio2.efek('klik'); keScene('jelajah'); };
  $('#ke-lanjut').onclick = () => { Audio2.efek('klik'); keScene(nextScene); };
}

/* --- Bagian umum misi --- */
function umpan(jenis, judul, isi, ucap = true) {
  const u = $('#umpan'); if (!u) return;
  u.className = 'umpan ' + jenis; u.innerHTML = `<div><b>${esc(judul)}</b>${isi}</div>`;
  const t = judul + '. ' + polos(isi); umumkan(t); if (ucap) Suara.ucap('kirana', t);
}
const UMPAN_AWAL = t => `<div class="umpan" id="umpan" aria-live="polite">${t}</div>`;
function alatMisi(kanan = '') { return `<div class="alat"><button class="btn sek kecil" id="b-petunjuk">${ICON.lampu}Petunjuk</button><button class="btn sek kecil" id="b-lihat" hidden>${ICON.mata}Lihat jawaban</button>${kanan}</div>`; }
function pasangAlat(petunjuk, lihat) {
  $('#b-petunjuk').onclick = () => { Audio2.efek('klik'); umpan('tip', 'Petunjuk', petunjuk()); };
  $('#b-lihat').onclick = () => { Audio2.efek('klik'); lihat(); };
}
function tampilLihat(on) { const b = $('#b-lihat'); if (b) b.hidden = !on; }
const kepalaChat = sub => `<div class="kepala"><span class="ava-bulat" style="background-image:url('${ava(K().klien.id)}')"></span><div><b>${esc(K().klien.nama)}</b><small>${esc(sub)}</small></div></div>`;
const kode = s => K().id + '_' + s;

/* ---------- Misi 1: Pesan awal ---------- */
SCENE.misi1 = async () => {
  const k = K(); mulaiMisi(1); pasangHUD({ no: 1, judul: 'Misi 1 dari 5 · Pesan awal' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'pikir');
  const KARTU = k.kartu;
  layar.innerHTML = `<div class="layar ka" data-p="m1">
    <div class="panel" style="width:330px;flex:none"><span class="label">Meja resepsionis</span><h2>Pesan masuk</h2>
      <div class="chat isi-sisa">${kepalaChat('Klien · pesan baru')}<div class="isi" id="chat"><div class="gel klien mengetik"><i></i><i></i><i></i></div></div></div>
      <div class="alat"><button class="btn sek kecil" id="putar-pesan">${ICON.putar}Putar pesan</button></div></div>
    <div class="panel" style="flex:1"><span class="label">Tujuan misi</span><h2>Tandai 4 informasi yang <u>sudah ada</u></h2>
      <p class="sub">Pilih kartu yang informasinya benar-benar tertulis di pesan ${esc(k.klien.nama)}.</p>
      <span class="hitung" id="hitung">Ditemukan 0 dari 4</span>
      <div class="grid-kartu" id="kartu">${KARTU.map(c => `<button class="kartu" data-k="${c.k}">${c.t}<small></small></button>`).join('')}</div>
      <div class="isi-sisa"></div>
      ${UMPAN_AWAL('Baca pesan klien, lalu pilih kartu.')}
      ${alatMisi()}</div></div>`;
  $('#kartu').style.pointerEvents = 'none';
  await tunggu(900); Audio2.efek('notif');
  $('#chat').innerHTML = `<div class="gel klien">${k.pesan.html}<small>${k.pesan.jam}</small></div>`;
  $('#putar-pesan').onclick = () => { Audio2.efek('klik'); Suara.kode(kode('m1_pesan')); };
  await bicaraKode(kode('m1_1'), { pose: 'tunjuk' });
  await bicaraKode(kode('m1_pesan'));
  await bicaraKode('umum_m1_2', { pose: 'pikir', tombol: 'Mulai' });
  $('#kartu').style.pointerEvents = '';
  let ketemu = 0;
  const tandai = (btn, c, lihat) => {
    const p = nilai(c.k, lihat); ketemu++; $('#hitung').textContent = `Ditemukan ${ketemu} dari 4`;
    btn.classList.remove('salah'); btn.classList.add(lihat ? 'dilihat' : 'benar'); btn.disabled = true;
    btn.querySelector('small').textContent = '“' + c.bukti + '”'; btn.insertAdjacentHTML('beforeend', `<span class="poin">+${p}</span>`);
    const s = $(`.sorot[data-s="${c.k}"]`); s && s.classList.add('on');
    if (!lihat) Audio2.efek('benar'); tampilLihat(false);
    if (ketemu === 4) akhir();
  };
  $$('#kartu .kartu').forEach(btn => btn.onclick = () => {
    const c = KARTU.find(x => x.k === btn.dataset.k);
    if (c.b) { tandai(btn, c, false); if (ketemu < 4) umpan('ok', 'Benar!', `Pesan menyebut “${c.bukti}”. Informasi <b>${c.t.toLowerCase()}</b> sudah ada.`); }
    else { catatSalah(); Audio2.efek('salah'); btn.classList.remove('salah'); void btn.offsetWidth; btn.classList.add('salah'); umpan('no', 'Belum ada pada pesan', c.s + ' Baca kembali pesannya.'); tampilLihat(true); }
  });
  pasangAlat(() => { const s = KARTU.find(c => c.b && !(c.k in M.pts)); return s ? `Cari kata di pesan yang menjawab: <b>${s.t.toLowerCase()}</b>. Informasi yang benar harus tertulis jelas, bukan ditebak.` : 'Semua informasi sudah ditemukan.'; },
    () => { const c = KARTU.find(x => x.b && !(x.k in M.pts)); if (!c) return; tandai($(`#kartu [data-k="${c.k}"]`), c, true); if (ketemu < 4) umpan('info', 'Jawaban ditampilkan (0 poin)', `<b>${c.t}</b> ada di pesan: “${c.bukti}”.`); });
  async function akhir() {
    $$('#kartu .kartu:not(:disabled)').forEach(b => { b.disabled = true; b.style.opacity = '.55'; });
    umpan('info', 'Informasi yang masih kurang', `${k.kurang}. Di misi berikutnya, kamu akan menanyakannya.`, false);
    await tunggu(600);
    await bicaraKode(kode('m1_3'), { pose: 'bangga', tombol: 'Selesaikan misi' });
    selesaiMisi('misi2', 2);
  }
};

/* ---------- Misi 2: Bertanya ---------- */
SCENE.misi2 = async () => {
  const k = K(); mulaiMisi(2); pasangHUD({ no: 2, judul: 'Misi 2 dari 5 · Bertanya' }); latar('redup'); tokoh('l'); tokohKlien('sapa');
  const KEL = k.tanya;
  layar.innerHTML = `<div class="layar ka" data-p="m2">
    <div class="panel" style="width:380px;flex:none"><div class="mentor"><span class="ava-bulat" style="background-image:url('${IMG.kirana.ava}')"></span><p><b>Kak Kirana</b>Bertanyalah dengan sopan agar brief lengkap. Jangan menebak-nebak.</p></div>
      <div class="chat isi-sisa">${kepalaChat('Klien · ruang tunggu')}<div class="isi" id="chat"><div class="gel info">Jawaban klien disimpan ke Catatan Klien</div></div></div></div>
    <div class="panel" style="flex:1"><span class="label">Tujuan misi</span><h2>Pilih pertanyaan yang paling membantu</h2>
      <div class="langkah" id="langkah">${KEL.map((g, i) => `<span>${i + 1}. ${g.nama}</span>`).join('')}</div>
      <p class="sub" id="kel-judul"></p>
      <div class="daftar-opsi" id="opsi"></div>
      <div class="isi-sisa"></div>
      ${UMPAN_AWAL('Pilih satu pertanyaan, lalu tekan Kirim pertanyaan.')}
      ${alatMisi('<button class="btn kecil" id="b-kirim" disabled style="margin-left:auto">' + ICON.kirim + 'Kirim pertanyaan</button>')}</div></div>`;
  await bicaraKode(kode('m2_1'), { pose: 'sapa' });
  await bicaraKode('umum_m2_2', { tombol: 'Mulai' });
  let idx = 0, pilih = null;
  const chat = html => { $('#chat').insertAdjacentHTML('beforeend', html); };
  const tampil = () => {
    const g = KEL[idx];
    $$('#langkah span').forEach((s, i) => s.className = i < idx ? 'ok' : i === idx ? 'aktif' : '');
    $('#kel-judul').innerHTML = `Kelompok ${idx + 1} dari 4 · <b>${g.nama}</b>`;
    $('#opsi').innerHTML = acak([{ t: g.benar, b: 1 }, { t: g.salah, b: 0 }]).map((o, i) => `<button class="kartu opsi" data-h="${'AB'[i]}" data-b="${o.b}" aria-pressed="false">${esc(o.t)}</button>`).join('');
    pilih = null; $('#b-kirim').disabled = true;
    $$('#opsi .kartu').forEach(b => b.onclick = () => { Audio2.efek('klik'); $$('#opsi .kartu').forEach(x => { x.classList.remove('pilih'); x.setAttribute('aria-pressed', 'false'); }); b.classList.add('pilih'); b.setAttribute('aria-pressed', 'true'); pilih = b; $('#b-kirim').disabled = false; });
  };
  const kirim = async lihat => {
    const g = KEL[idx], btn = lihat ? $('#opsi .kartu[data-b="1"]') : pilih; if (!btn) return;
    chat(`<div class="gel saya">${esc(btn.textContent)}<small>Kamu</small></div>`);
    if (btn.dataset.b !== '1') {
      catatSalah(); Audio2.efek('salah'); btn.classList.remove('pilih'); btn.classList.add('salah'); btn.disabled = true; pilih = null; $('#b-kirim').disabled = true;
      tokohKlien('ragu'); chat(`<div class="gel klien">Hmm, maksudnya bagaimana ya, Kak?<small>${esc(k.klien.nama)}</small></div>`);
      umpan('no', 'Pertanyaan ini belum membantu kebutuhan desain', g.alasan + ' Coba pilih pertanyaan lain.'); tampilLihat(true); return;
    }
    const p = nilai(g.k, !!lihat); if (!lihat) Audio2.efek('benar');
    btn.classList.remove('pilih'); btn.classList.add(lihat ? 'dilihat' : 'benar'); $$('#opsi .kartu').forEach(x => x.disabled = true); $('#b-kirim').disabled = true; tampilLihat(false);
    umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : `Pertanyaan tepat! +${p} poin`, 'Pertanyaannya sopan dan menggali informasi yang dibutuhkan desainer.', false);
    tokohKlien('jelas'); chat(`<div class="gel klien mengetik" id="ketik"><i></i><i></i><i></i></div>`);
    await tunggu(700); $('#ketik').remove();
    chat(`<div class="gel klien">${esc(g.jawab)}<small>${esc(k.klien.nama)} · disimpan ke Catatan</small></div>`); Audio2.efek('notif');
    await bicaraKode(kode('m2_jawab' + (idx + 1)), { pose: 'jelas', tombol: idx < 3 ? 'Kelompok berikutnya' : 'Selesai' });
    tokohKlien('sapa'); $('#umpan').className = 'umpan'; $('#umpan').textContent = 'Pilih satu pertanyaan, lalu tekan Kirim pertanyaan.';
    idx++;
    if (idx < 4) tampil();
    else { $$('#langkah span').forEach(s => s.className = 'ok'); await bicaraKode('umum_m2_3', { pose: 'bangga', tombol: 'Selesaikan misi' }); selesaiMisi('infoKlien', 3); }
  };
  $('#b-kirim').onclick = () => { Audio2.efek('klik'); kirim(false); };
  pasangAlat(() => KEL[idx].tip + ' Pilih pertanyaan yang sopan, jelas, dan tidak menebak.', () => kirim(true));
  tampil();
};

/* ---------- Informasi klien ---------- */
SCENE.infoKlien = async () => {
  const k = K(); pasangHUD({ judul: 'Misi 2 selesai · Catatan Klien' }); latar('redup'); tokoh('l'); tokohKlien('jelas');
  layar.innerHTML = `<div class="layar ka" data-p="info"><div class="panel" style="flex:1;gap:12px">
    <span class="label">Rangkuman jawaban klien</span><h2>Catatan Klien <span class="fiktif">data fiktif</span></h2>
    <p class="sub">${esc(k.klien.nama)} · ${esc(k.usaha)}. Catatan ini dapat dibuka lagi kapan saja dari tombol <b>Catatan</b> di bagian atas.</p>
    ${htmlCatatan(3)}
    <div class="alat" style="margin-top:auto"><button class="btn sek" id="lanjut3b">Langsung ke Misi 3</button><button class="btn" id="lanjut3">${ICON.peta}Jelajahi studio</button></div></div></div>`;
  $('#lanjut3').onclick = () => { Audio2.efek('klik'); keScene('jelajah'); };
  $('#lanjut3b').onclick = () => { Audio2.efek('klik'); keScene('misi3'); };
  await tunggu(400);
  if ($('#lanjut3')) await bicaraKode(kode('info'), { pose: 'jelas' });
};

/* ---------- Misi 3: Susun brief ---------- */
SCENE.misi3 = async () => {
  const k = K(); mulaiMisi(3); pasangHUD({ no: 3, judul: 'Misi 3 dari 5 · Susun brief' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'tunjuk');
  const KOTAK = [{ k: 'tujuan', t: 'Tujuan', q: 'untuk apa?' }, { k: 'audiens', t: 'Audiens', q: 'siapa?' }, { k: 'media', t: 'Media', q: 'di mana?' }, { k: 'visual', t: 'Arahan visual', q: 'seperti apa?' }];
  const KARTU = acak(k.susun);
  layar.innerHTML = `<div class="layar ka" data-p="m3">
    <div class="panel" style="flex:1"><span class="label">Meja desain · lembar brief</span><h2>Susun brief ${esc(k.produkDesain)}</h2>
      <p class="sub">Ketuk kartu, lalu ketuk kotak yang sesuai. Di komputer, kartu juga bisa diseret.</p>
      <div class="kotak4" id="kotak">${KOTAK.map(b => `<button class="slot" data-k="${b.k}" aria-label="Kotak ${b.t}, ${b.q}"><h3>${b.t}</h3><span class="tq">${b.q}</span></button>`).join('')}</div>
      ${UMPAN_AWAL('Pilih kartu di sebelah kanan terlebih dahulu.')}${alatMisi()}</div>
    <div class="panel" style="width:300px;flex:none"><span class="label">Kartu dari klien</span><span class="hitung" id="sisa">4 kartu tersisa</span>
      <div class="baki" id="baki">${KARTU.map(c => `<button class="kartu" draggable="true" data-k="${c.k}" aria-pressed="false">${esc(c.t)}</button>`).join('')}</div></div></div>`;
  await bicaraKode('umum_m3_1', { tombol: 'Mulai' });
  let pilih = null, sisa = 4;
  const pilihKartu = b => { $$('#baki .kartu').forEach(x => { x.classList.remove('pilih'); x.setAttribute('aria-pressed', 'false'); }); pilih = b; if (b) { b.classList.add('pilih'); b.setAttribute('aria-pressed', 'true'); } $$('.slot:not(.isi)').forEach(s => s.classList.toggle('siap', !!b)); };
  const pasang = (kartu, slot, lihat) => {
    if (!kartu || slot.classList.contains('isi')) return;
    const kk = kartu.dataset.k;
    if (slot.dataset.k !== kk) { catatSalah(); Audio2.efek('salah'); kartu.classList.add('salah'); setTimeout(() => kartu.classList.remove('salah'), 600); pilihKartu(null); umpan('no', 'Kartu kembali ke baki', 'Perhatikan apakah informasi itu menjawab untuk apa, siapa, di mana, atau seperti apa.'); tampilLihat(true); return; }
    const p = nilai(kk, lihat); if (!lihat) Audio2.efek('benar');
    slot.classList.add('isi'); slot.classList.remove('siap'); slot.insertAdjacentHTML('beforeend', `<div class="kartu-kecil">${esc(kartu.textContent)} <b style="color:var(--teal)">+${p}</b></div>`);
    slot.setAttribute('aria-label', slot.getAttribute('aria-label') + ': ' + kartu.textContent);
    kartu.remove(); pilihKartu(null); sisa--; $('#sisa').textContent = sisa + ' kartu tersisa'; tampilLihat(false);
    const nm = KOTAK.find(x => x.k === kk).t;
    if (sisa) umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : 'Tepat!', `Kartu ini masuk ke <b>${nm}</b>.`, !lihat); else akhir();
  };
  $('#baki').addEventListener('click', e => { const b = e.target.closest('.kartu'); if (!b) return; Audio2.efek('klik'); pilihKartu(pilih === b ? null : b); });
  $$('.slot').forEach(s => {
    s.onclick = () => { if (!pilih) { if (!s.classList.contains('isi')) toast('Pilih kartu dulu, lalu ketuk kotaknya.'); return; } pasang(pilih, s, false); };
    s.addEventListener('dragover', e => { e.preventDefault(); s.classList.add('over'); });
    s.addEventListener('dragleave', () => s.classList.remove('over'));
    s.addEventListener('drop', e => { e.preventDefault(); s.classList.remove('over'); pasang($(`#baki .kartu[data-k="${e.dataTransfer.getData('text/plain')}"]`), s, false); });
  });
  $('#baki').addEventListener('dragstart', e => { const b = e.target.closest('.kartu'); if (b) { e.dataTransfer.setData('text/plain', b.dataset.k); pilihKartu(b); } });
  const TIP = { tujuan: 'Kartu yang menjelaskan hasil yang diharapkan klien menjawab pertanyaan untuk apa.', audiens: 'Usia atau kelompok orang menunjukkan siapa yang ingin dijangkau.', media: 'Bentuk dan tempat desain dipasang menjawab pertanyaan di mana.', visual: 'Kata sifat dan warna menggambarkan seperti apa tampilannya.' };
  pasangAlat(() => { const b = pilih || $('#baki .kartu'); return b ? TIP[b.dataset.k] : 'Semua kartu sudah terpasang.'; },
    () => { const b = pilih || $('#baki .kartu'); if (b) pasang(b, $(`.slot[data-k="${b.dataset.k}"]`), true); });
  async function akhir() {
    umpan('ok', 'Brief tersusun!', 'Keempat komponen brief sudah terisi dengan tepat.', false);
    await bicaraKode(kode('m3_2'), { pose: 'bangga', tombol: 'Selesaikan misi' });
    selesaiMisi('misi4', 4);
  }
};

/* ---------- Misi 4: Negosiasi ---------- */
SCENE.misi4 = async () => {
  const k = K(), N = k.nego; mulaiMisi(4); pasangHUD({ no: 4, judul: 'Misi 4 dari 5 · Negosiasi' }); latar('redup'); tokoh('l'); tokohKlien('ragu');
  layar.innerHTML = `<div class="layar ka" data-p="m4">
    <div class="panel" style="width:360px;flex:none"><span class="label">Ruang rapat</span>
      <div class="chat isi-sisa">${kepalaChat('pesan baru · perubahan')}<div class="isi" id="chat"><div class="gel klien mengetik"><i></i><i></i><i></i></div></div></div>
      <span class="label">Papan perubahan</span>
      <div class="banding" id="banding"><div class="awal"><small>Kesepakatan awal</small>${esc(N.awal)}</div><div class="baru"><small>Permintaan baru</small>${esc(N.baru)}</div></div></div>
    <div class="panel" style="flex:1"><span class="label">Tujuan misi</span><h2>Apa langkahmu berikutnya?</h2>
      <div class="langkah" id="langkah">${N.langkah.map((l, i) => `<span>${i + 1}. ${l.nama}</span>`).join('')}</div>
      <p class="sub" id="soal" style="font-weight:600;color:var(--navy)"></p>
      <div class="daftar-opsi" id="opsi"></div>
      <div class="isi-sisa"></div>
      ${UMPAN_AWAL('Pastikan kesepakatan sebelum mengubah brief.')}${alatMisi()}</div></div>`;
  await tunggu(800); Audio2.efek('notif');
  $('#chat').innerHTML = `<div class="gel klien"><span class="lbl">PERUBAHAN</span><br>${esc(N.pesan)}<small>10.42</small></div>`;
  await bicaraKode(kode('m4_pesan'), { pose: 'ragu' });
  await bicaraKode(kode('m4_1'), { tombol: 'Mulai' });
  let idx = 0;
  const tampil = () => {
    const l = N.langkah[idx];
    $$('#langkah span').forEach((s, i) => s.className = i < idx ? 'ok' : i === idx ? 'aktif' : '');
    $('#soal').textContent = `Keputusan ${idx + 1} dari 4 · ${l.q}`;
    $('#opsi').innerHTML = acak(l.ops).map((o, i) => `<button class="kartu opsi" data-h="${'ABC'[i]}" data-b="${o.b ? 1 : 0}" data-s="${esc(o.s || '')}">${esc(o.t)}</button>`).join('');
    $$('#opsi .kartu').forEach(b => b.onclick = () => jawab(b, false));
  };
  const jawab = async (b, lihat) => {
    const l = N.langkah[idx];
    if (b.dataset.b !== '1') { catatSalah(); Audio2.efek('salah'); b.classList.add('salah'); b.disabled = true; umpan('no', 'Berisiko', b.dataset.s + ' Coba pilih langkah lain.'); tampilLihat(true); return; }
    const p = nilai(l.k, lihat); if (!lihat) Audio2.efek('benar');
    b.classList.add(lihat ? 'dilihat' : 'benar'); $$('#opsi .kartu').forEach(x => x.disabled = true); tampilLihat(false);
    umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : `Langkah tepat! +${p} poin`, 'Lanjutkan percakapan.', false);
    const dariKlien = l.jawab[0] === 'klien', siapa = dariKlien ? k.klien.id : 'kirana';
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel ${dariKlien ? 'klien' : 'info'}">${esc(l.jawab[1])}<small>${NAMA[siapa]}</small></div>`);
    if (l.k === 'tawar') $('#banding').insertAdjacentHTML('beforeend', `<div class="sepakat"><small>Kesepakatan baru</small>${esc(N.sepakat)}</div>`);
    await bicaraKode(kode('m4_' + l.k), { pose: dariKlien ? (l.jawab[2] || 'jelas') : undefined, tombol: idx < 3 ? 'Keputusan berikutnya' : 'Selesai' });
    $('#umpan').className = 'umpan'; $('#umpan').textContent = 'Pastikan kesepakatan sebelum mengubah brief.';
    idx++;
    if (idx < 4) tampil();
    else { $$('#langkah span').forEach(s => s.className = 'ok'); await bicaraKode(kode('m4_2'), { pose: 'setuju', tombol: 'Selesaikan misi' }); selesaiMisi('misi5', 5); }
  };
  pasangAlat(() => ['Dengarkan dulu alasan klien sebelum menjawab.', 'Periksa kemampuan tim dan dampak teknis sebelum berjanji.', 'Cari jalan tengah: kebutuhan klien terpenuhi dan kualitas desain tetap terjaga.', 'Catat hasil kesepakatan terakhir yang disetujui kedua pihak.'][idx], () => jawab($('#opsi .kartu[data-b="1"]'), true));
  tampil();
};

/* ---------- Misi 5: Periksa ringkasan ---------- */
SCENE.misi5 = async () => {
  const k = K(); mulaiMisi(5); pasangHUD({ no: 5, judul: 'Misi 5 dari 5 · Periksa ringkasan' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'pikir');
  const BARIS = k.periksa;
  layar.innerHTML = `<div class="layar ka" data-p="m5">
    <div class="panel" style="flex:1"><span class="label">Area produksi</span><h2>Ringkasan tim punya 4 kesalahan</h2>
      <div style="display:flex;align-items:center;gap:10px"><p class="sub" style="flex:1">Ketuk baris yang keliru, lalu pilih koreksinya di kanan.</p><span class="hitung" id="hit">0 dari 4 diperbaiki</span></div>
      <div class="daftar-baris" id="baris">${BARIS.map(b => `<button class="baris" data-k="${b.k}" aria-expanded="false"><span class="k">${b.l}</span><span class="v">${esc(b.v)}</span><span class="st">cek</span></button>`).join('')}</div>
      <div class="isi-sisa"></div>
      ${UMPAN_AWAL('Bandingkan setiap baris dengan panel pembanding.')}${alatMisi()}</div>
    <div class="panel" style="width:320px;flex:none">
      <div class="koreksi kosong" id="koreksi">Ketuk baris yang keliru untuk melihat pilihan koreksinya.</div>
      <div class="pembanding"><h3>Catatan Klien</h3><ul>${k.pembanding.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h3>Hasil negosiasi Misi 4</h3><ul style="margin:0">${k.nego.hasil.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div></div>`;
  await bicaraKode('umum_m5_1', { tombol: 'Mulai' });
  let fix = 0, aktif = null;
  const kor = $('#koreksi');
  const kosong = () => { aktif = null; kor.className = 'koreksi kosong'; kor.innerHTML = fix < 4 ? 'Ketuk baris yang keliru untuk melihat pilihan koreksinya.' : 'Semua baris sudah benar.'; };
  const benarkan = (b, nilaiBaru, lihat) => {
    const p = nilai(b.k, lihat); if (!lihat) Audio2.efek('benar');
    const row = $(`.baris[data-k="${b.k}"]`); row.classList.remove('buka'); row.classList.add('ok'); row.disabled = true; row.setAttribute('aria-expanded', 'false');
    row.querySelector('.v').innerHTML = `<s>${esc(b.v)}</s>${esc(nilaiBaru)}`; row.querySelector('.st').textContent = lihat ? 'dilihat' : '+' + p;
    fix++; $('#hit').textContent = `${fix} dari 4 diperbaiki`; tampilLihat(false); kosong();
    if (fix < 4) umpan(lihat ? 'info' : 'ok', lihat ? 'Jawaban ditampilkan (0 poin)' : 'Koreksi tepat!', b.why, !lihat); else akhir();
  };
  $$('#baris .baris').forEach(row => row.onclick = () => {
    Audio2.efek('klik');
    const b = BARIS.find(x => x.k === row.dataset.k);
    if (b.ok) { row.classList.add('ok'); row.disabled = true; row.querySelector('.st').textContent = 'sesuai'; umpan('info', 'Baris ini sudah sesuai', 'Datanya cocok dengan catatan klien. Cari baris lain yang keliru.'); return; }
    $$('.baris.buka').forEach(r => { r.classList.remove('buka'); r.setAttribute('aria-expanded', 'false'); });
    row.classList.add('buka'); row.setAttribute('aria-expanded', 'true'); aktif = b;
    kor.className = 'koreksi'; kor.innerHTML = `<span class="label" style="color:var(--emas-d)">Koreksi baris ${esc(b.l)}</span>` + acak(b.ops.map((t, i) => ({ t, b: i === 0 }))).map((x, i) => `<button class="kartu opsi" data-h="${'ABC'[i]}" data-b="${x.b ? 1 : 0}">${esc(x.t)}</button>`).join('');
    $$('.kartu', kor).forEach(btn => btn.onclick = () => {
      if (btn.dataset.b === '1') benarkan(b, btn.textContent, false);
      else { catatSalah(); Audio2.efek('salah'); btn.classList.add('salah'); btn.disabled = true; umpan('no', 'Belum sesuai', 'Bandingkan dengan catatan klien atau hasil negosiasi.'); tampilLihat(true); }
    });
    $('.kartu', kor).focus({ preventScroll: true });
  });
  pasangAlat(() => { const b = BARIS.find(x => !x.ok && !(x.k in M.pts)); return b ? `Periksa baris <b>${b.l}</b>. Cocokkan dengan panel pembanding di sebelah kanan.` : 'Semua baris sudah diperbaiki.'; },
    () => { const b = aktif || BARIS.find(x => !x.ok && !(x.k in M.pts)); if (b) benarkan(b, b.ops[0], true); });
  async function akhir() {
    umpan('ok', 'Ringkasan sudah benar!', 'Semua data cocok dengan catatan klien dan kesepakatan terakhir.', false);
    await bicaraKode(kode('m5_2'), { pose: 'bangga', tombol: 'Selesaikan misi' });
    selesaiMisi('konfirmasi', 'k');
  }
};

/* ---------- Konfirmasi ---------- */
SCENE.konfirmasi = async () => {
  if (!D().selesai[5]) return keScene('peta');
  const k = K(); pasangHUD({ judul: 'Konfirmasi brief' }); latar('redup'); tokoh('l'); tokohKlien('sapa');
  layar.innerHTML = `<div class="layar ka" data-p="konf">
    <div class="dok" style="flex:1"><span class="label">Ringkasan Design Brief · Final</span><h3>${esc(k.brief.judul)}</h3>
      <table>${k.brief.rows.map(([a, b]) => `<tr><td>${a}</td><td>${esc(b)}</td></tr>`).join('')}</table>
      <div class="cap" id="cap">DISETUJUI<small>SIMULASI</small></div></div>
    <div class="panel" style="width:360px;flex:none"><span class="label">Kirim ke klien</span><h2>Konfirmasi brief</h2>
      <div class="chat isi-sisa">${kepalaChat('Klien')}<div class="isi" id="chat"><div class="gel info">Periksa ringkasan, lalu kirim.</div></div></div>
      <div class="alat" id="alat-k"><button class="btn sek kecil" id="k-kembali">Kembali perbaiki</button><button class="btn kecil" id="k-kirim">${ICON.kirim}Kirim</button></div>
      <div class="umpan info" id="lanjutan" hidden><div><b>Langkah berikutnya</b>Riset kreatif dan ideasi. Persetujuan ini hanya berlaku di simulasi.</div></div></div></div>`;
  $('#k-kembali').onclick = () => { Audio2.efek('klik'); keScene('peta'); };
  $('#k-kirim').onclick = async () => {
    Audio2.efek('klik'); $('#alat-k').hidden = true;
    const id = kode('k_pemain');
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel saya">${esc(NASKAH[id][1])}<small>Kamu · terkirim</small></div>`);
    Suara.kode(id); await tunggu(2600);
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien mengetik" id="ketik"><i></i><i></i><i></i></div>`); await tunggu(1200); $('#ketik').remove();
    $('#chat').insertAdjacentHTML('beforeend', `<div class="gel klien">${esc(k.setuju)}<small>${esc(k.klien.nama)}</small></div>`);
    Audio2.efek('notif'); tokohKlien('setuju');
    await tunggu(400); $('#cap').classList.add('on'); Audio2.efek('selesai'); konfeti();
    D().konfirmasi = true; simpan();
    await bicaraKode(kode('k_setuju'), { pose: 'setuju' });
    $('#lanjutan').hidden = false;
    await bicaraKode('umum_k_kirana', { tombol: 'Lihat hasil' });
    keScene('hasil');
  };
  await tunggu(300);
  if ($('#k-kirim')) Suara.kode(kode('k_awal'));
};

/* ---------- Umpan balik refleksi ---------- */
const IDE_REFLEKSI = [
  [ // 1. Mengapa desainer perlu bertanya kepada klien?
    { nama: 'Memahami kebutuhan dan tujuan klien', kata: ['butuh', 'tujuan', 'paham', 'mengerti', 'tahu apa', 'ingin', 'keinginan', 'maksud', 'harap', 'mau'] },
    { nama: 'Melengkapi informasi yang belum ada', kata: ['informasi', 'info', 'data', 'lengkap', 'kurang', 'belum ada', 'detail', 'jelas'] },
    { nama: 'Tidak menebak, menghindari salah paham', kata: ['tebak', 'nebak', 'duga', 'asal', 'salah paham', 'asumsi', 'keliru', 'salah', 'menduga', 'kira-kira', 'mengira', 'pasti'] },
    { nama: 'Agar desain tepat sasaran', kata: ['tepat', 'sesuai', 'sasaran', 'audiens', 'hasil', 'efektif', 'cocok', 'bagus', 'puas'] },
  ],
  [ // 2. Apa akibatnya jika brief salah?
    { nama: 'Desain tidak sesuai kebutuhan klien', kata: ['tidak sesuai', 'tak sesuai', 'salah sasaran', 'tidak tepat', 'keliru', 'berbeda', 'melenceng', 'tidak cocok', 'salah'] },
    { nama: 'Revisi berulang, waktu dan biaya terbuang', kata: ['revisi', 'ulang', 'waktu', 'biaya', 'rugi', 'buang', 'lama', 'tenggat', 'terlambat', 'telat', 'tenaga', 'kerja dua kali'] },
    { nama: 'Klien kecewa, kepercayaan menurun', kata: ['kecewa', 'percaya', 'marah', 'tidak puas', 'komplain', 'keluh', 'hubungan', 'reputasi', 'nama baik'] },
    { nama: 'Pesan tidak sampai ke audiens', kata: ['pesan', 'audiens', 'pembeli', 'konsumen', 'promosi', 'gagal', 'tidak efektif', 'tidak laku', 'tidak tersampaikan'] },
  ],
  [ // 3. Bagaimana merespons perubahan dari klien?
    { nama: 'Mendengarkan dan menanyakan alasannya', kata: ['alasan', 'tanya', 'dengar', 'mengapa', 'kenapa', 'pahami', 'memahami', 'sebab'] },
    { nama: 'Mengecek dampak dan kemampuan tim', kata: ['cek', 'periksa', 'kapasitas', 'dampak', 'jadwal', 'kemampuan', 'pertimbang', 'mampu', 'sanggup'] },
    { nama: 'Menawarkan solusi atau jalan tengah', kata: ['tawar', 'solusi', 'alternatif', 'jalan tengah', 'opsi', 'saran', 'usul', 'kompromi', 'diskusi', 'negosiasi'] },
    { nama: 'Mencatat dan mengonfirmasi kesepakatan', kata: ['catat', 'sepakat', 'konfirmasi', 'setuju', 'tertulis', 'brief', 'persetujuan', 'dokumentasi'] },
  ],
];
function nilaiRefleksi(i, teks) {
  const t = ' ' + teks.toLowerCase().replace(/\s+/g, ' ') + ' ';
  const kata = teks.trim().split(/\s+/).filter(Boolean).length;
  const ide = IDE_REFLEKSI[i].map(x => ({ nama: x.nama, ada: x.kata.some(k => t.includes(k)) }));
  const n = ide.filter(x => x.ada).length;
  const kurang = ide.filter(x => !x.ada).map(x => x.nama.toLowerCase());
  if (kata === 0) return { skor: 0, kelas: 'no', judul: 'Jawaban masih kosong.', pesan: 'Tulis pendapatmu dulu, minimal dua kalimat. Ingat lagi apa yang kamu alami di misi tadi.', ide: [] };
  if (kata < 6) return { skor: 0, kelas: 'no', judul: 'Jawabanmu masih terlalu singkat.', pesan: 'Coba jelaskan dengan dua atau tiga kalimat, dan berikan alasannya.', ide };
  const sambung = kurang.length ? ` Kamu bisa menambahkan: ${kurang.slice(0, 2).join(' dan ')}.` : '';
  if (n >= 3) return { skor: n, kelas: 'ok', judul: n === 4 ? 'Luar biasa! Jawabanmu lengkap.' : 'Jawaban yang kuat!', pesan: (n === 4 ? 'Semua ide penting sudah kamu tulis.' : 'Hampir semua ide penting sudah ada.') + sambung + ' Bagus jika kamu juga memberi contoh dari kasus tadi.', ide };
  if (n === 2) return { skor: n, kelas: 'tip', judul: 'Sudah baik, tinggal dilengkapi.', pesan: 'Dua ide penting sudah kamu tulis.' + sambung, ide };
  if (n === 1) return { skor: n, kelas: 'tip', judul: 'Sudah ada idenya, ayo kembangkan.', pesan: 'Satu ide penting sudah muncul.' + sambung, ide };
  return { skor: 0, kelas: 'no', judul: 'Coba kaitkan dengan misi tadi.', pesan: 'Jawabanmu belum menyebut ide-ide penting di bawah. Ingat lagi apa yang kamu lakukan bersama klien, lalu tulis ulang.', ide };
}
function contohRefleksi(k) {
  const salah = k.periksa.find(x => !x.ok);
  return [
    `Desainer perlu bertanya agar memahami kebutuhan dan tujuan klien serta melengkapi informasi yang belum ada. Contohnya, pesan awal ${k.klien.nama} belum menyebut ${k.kurang.toLowerCase()}. Dengan bertanya, desainer tidak menebak-nebak sehingga ${k.produkDesain} yang dibuat tepat sasaran.`,
    `Jika brief salah, desain tidak sesuai kebutuhan klien dan pesannya tidak sampai ke audiens. Contohnya, jika ${salah.l.toLowerCase()} ditulis “${salah.v}” padahal seharusnya “${salah.ops[0]}”, ${k.produkDesain} akan dibuat keliru. Akibatnya perlu revisi berulang, waktu dan biaya terbuang, dan klien bisa kecewa.`,
    `Saya mendengarkan dan menanyakan alasan perubahan dengan sopan, lalu mengecek dampaknya pada pekerjaan dan jadwal tim. Setelah itu saya menawarkan solusi yang realistis, misalnya ${k.nego.sepakat.replace(' · ', ', ')}. Terakhir, kesepakatan dicatat di brief dan dikonfirmasi kepada klien.`,
  ];
}

/* ---------- Hasil dan refleksi ---------- */
SCENE.hasil = async () => {
  const k = K(), d = D(); pasangHUD({ judul: 'Hasil dan refleksi' }); latar('redup'); tokoh('l'); tokoh('r', 'kirana', 'bangga');
  const t = totalSemua();
  const kat = t >= 85 ? 'Siap menganalisis brief' : t >= 70 ? 'Berkembang, pelajari umpan balik' : 'Perlu latihan, ulangi misi yang sulit';
  const SARAN = { 1: 'Baca pesan klien kata demi kata; tandai hanya yang tertulis.', 2: 'Pilih pertanyaan yang sopan dan menggali kebutuhan, bukan menebak.', 3: 'Ingat empat pertanyaan: untuk apa, siapa, di mana, seperti apa.', 4: 'Dengarkan alasan, cek dampak, tawarkan solusi, lalu catat kesepakatan.', 5: 'Cocokkan ringkasan dengan catatan klien dan kesepakatan terakhir.' };
  const terendah = [1, 2, 3, 4, 5].reduce((a, n) => totalMisi(n) < totalMisi(a) ? n : a, 1);
  const lain = KASUS.find(x => !D(x.id).konfirmasi && x.id !== k.id);
  const C = 2 * Math.PI * 64;
  const Q = ['Mengapa desainer perlu bertanya kepada klien?', 'Apa akibatnya jika brief salah?', 'Bagaimana merespons perubahan dari klien?'];
  layar.innerHTML = `<div class="layar ka" data-p="hasil">
    <div class="panel" style="width:390px;flex:none;gap:8px"><span class="label" style="text-align:center">Hasil kasus ${k.no} · ${esc(k.klien.nama)}</span>
      <div class="ring"><svg viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="64" fill="none" stroke="#efe6cc" stroke-width="14"/><circle id="ring" cx="75" cy="75" r="64" fill="none" stroke="#157A64" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.6s ease-out"/></svg>
        <div class="n"><div><b id="angka">0</b><small>dari 100</small></div></div></div>
      <span class="kategori">${kat}</span>
      ${[1, 2, 3, 4, 5].map(n => `<div class="bar-misi"><img src="${LENC(n)}" alt=""><div><div style="font-size:13px;font-weight:700">${n}. ${MISI[n].nama}</div><div class="tr"><i style="width:0" data-w="${totalMisi(n) * 5}"></i></div></div><span class="nl">${totalMisi(n)}/20</span><button class="ikonbtn" data-u="${n}" aria-label="Ulangi misi ${n}">${ICON.ulang}</button></div>`).join('')}
      ${totalMisi(terendah) < 20 ? `<div class="saran"><b>Saran:</b> ${SARAN[terendah]}</div>` : ''}</div>
    <div class="panel refl" style="flex:1;gap:8px"><div style="display:flex;align-items:baseline;gap:10px"><h2 style="flex:1">Refleksi</h2><span class="label">tidak memengaruhi skor</span></div>
      <div class="tab-refl" role="tablist">${Q.map((q, i) => `<button role="tab" data-t="${i}" aria-selected="${i === 0}">Pertanyaan ${i + 1}<i></i></button>`).join('')}</div>
      <label for="r-isi" id="r-tanya" class="tanya-refl"></label>
      <textarea id="r-isi" placeholder="Tulis jawabanmu dengan kalimatmu sendiri…"></textarea>
      <div class="alat" style="flex-wrap:nowrap"><button class="btn kecil" id="r-periksa">${ICON.lampu}Periksa jawaban</button><button class="btn sek kecil" id="r-contoh">${ICON.mata}Contoh</button><button class="btn sek kecil" id="r-next" style="margin-left:auto">Lanjut ${ICON.lanjut}</button></div>
      <div class="umpan-refl" id="r-umpan" aria-live="polite"></div>
      <div class="alat"><button class="btn sek kecil" id="h-studio">${ICON.peta}Studio</button><button class="btn sek kecil" id="h-ringkas">${ICON.catatan}Catatan</button><button class="btn sek kecil" id="h-salin">Salin</button>
        ${lain ? `<button class="btn kecil" id="h-lain" style="margin-left:auto">${ICON.orang}Kasus berikutnya</button>` : `<button class="btn kecil" id="h-kasus" style="margin-left:auto">${ICON.orang}Semua kasus</button>`}</div></div></div>`;
  /* --- Refleksi dengan umpan balik --- */
  if (!d.cekRefl) d.cekRefl = [0, 0, 0];
  let qi = 0;
  const ta = $('#r-isi'), ub = $('#r-umpan');
  const tandaTab = () => $$('[data-t]').forEach((b, i) => { b.setAttribute('aria-selected', i === qi); b.classList.toggle('ok', d.cekRefl[i] >= 2); b.classList.toggle('isi', !!(d.refleksi[i] || '').trim()); });
  const awalUmpan = () => { ub.className = 'umpan-refl'; ub.innerHTML = `<b>Tulis jawabanmu, lalu tekan Periksa jawaban.</b><span>Kak Kirana akan melihat ide-ide penting yang sudah kamu tulis. Refleksi tidak memengaruhi skor dan hanya tersimpan di perangkat ini.</span>`; };
  const bukaQ = i => { qi = i; $('#r-tanya').textContent = `${i + 1}. ${Q[i]}`; ta.value = d.refleksi[i] || ''; tandaTab(); if (d.refleksi[i] && d.cekRefl[i] !== undefined && (d.refleksi[i] || '').trim()) periksa(false); else awalUmpan(); $('#r-next').innerHTML = (i < 2 ? 'Lanjut ' : 'Ke no. 1 ') + ICON.lanjut; };
  const periksa = (suara = true) => {
    const h = nilaiRefleksi(qi, ta.value);
    d.cekRefl[qi] = h.skor; simpan(); tandaTab();
    ub.className = 'umpan-refl ' + h.kelas;
    ub.innerHTML = `<b>${esc(h.judul)}</b><span>${esc(h.pesan)}</span>${h.ide.length ? `<ul class="ide">${h.ide.map(x => `<li class="${x.ada ? 'ada' : ''}">${x.ada ? '✓' : '○'} ${esc(x.nama)}</li>`).join('')}</ul>` : ''}`;
    if (suara) { Audio2.efek(h.skor >= 2 ? 'benar' : 'klik'); Suara.ucap('kirana', h.judul + ' ' + h.pesan); }
  };
  ta.oninput = () => { d.refleksi[qi] = ta.value; simpan(); tandaTab(); };
  $$('[data-t]').forEach(b => b.onclick = () => { Audio2.efek('klik'); Suara.stop(); bukaQ(+b.dataset.t); });
  $('#r-periksa').onclick = () => { Audio2.efek('klik'); periksa(true); };
  $('#r-next').onclick = () => { Audio2.efek('klik'); Suara.stop(); bukaQ((qi + 1) % 3); ta.focus({ preventScroll: true }); };
  $('#r-contoh').onclick = () => {
    Audio2.efek('klik'); const c = contohRefleksi(k)[qi];
    ub.className = 'umpan-refl contoh';
    ub.innerHTML = `<b>Contoh jawaban · kasus ${esc(k.klien.nama)}</b><span>${esc(c)}</span><small>Bandingkan dengan jawabanmu. Tulis ulang dengan kalimatmu sendiri, jangan disalin.</small>`;
    Suara.ucap('kirana', c);
  };
  bukaQ(0);
  $$('[data-u]').forEach(b => b.onclick = () => { Audio2.efek('klik'); bukaMisi(+b.dataset.u); });
  $('#h-ringkas').onclick = () => { Audio2.efek('klik'); modalCatatan(); };
  $('#h-studio').onclick = () => { Audio2.efek('klik'); keScene('jelajah'); };
  const hl = $('#h-lain'); if (hl) hl.onclick = () => { Audio2.efek('klik'); S.kasus = lain.id; simpan(); keScene('jelajah'); };
  const hk = $('#h-kasus'); if (hk) hk.onclick = () => { Audio2.efek('klik'); keScene('pilihKasus'); };
  $('#h-salin').onclick = async () => {
    const teks = `Misi Desainer: Pecahkan Design Brief\nKasus ${k.no}: ${k.klien.nama} (${k.jenis})\nSkor: ${t}/100 (${kat})\n\n` + Q.map((q, i) => `${i + 1}. ${q}\n${d.refleksi[i] || '-'}`).join('\n\n');
    try { await navigator.clipboard.writeText(teks); toast('Jawaban disalin. Tempel di tugas atau pesan untuk guru.'); } catch (e) { toast('Tidak dapat menyalin otomatis di perangkat ini.'); }
  };
  await tunggu(200);
  $('#ring').style.strokeDashoffset = C * (1 - t / 100);
  $$('.tr i').forEach(i => i.style.width = i.dataset.w + '%');
  let a = 0; const step = () => { a = Math.min(t, a + Math.max(1, Math.round(t / 40))); const el = $('#angka'); if (!el) return; el.textContent = a; if (a < t) requestAnimationFrame(step); }; step();
  Audio2.efek('jingle');
  await tunggu(1200);
  if ($('#ring')) Suara.ucap('kirana', `Skor kasus ini ${t} dari 100. ${kat}. ${lain ? 'Masih ada klien lain yang menunggu bantuanmu.' : 'Hebat, semua klien sudah kamu bantu!'} Sekarang, jawab pertanyaan refleksi ya.`);
};

/* =========================================================
   6b. MODE JELAJAH: berjalan di peta Studio Kreativa (RPG 2D)
   Koordinat dunia = piksel gambar peta (1672 x 941)
   ========================================================= */
const AVA_JALAN = SVGURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#E9BA4A"/><path d="M14 120c2-26 21-36 46-36s44 10 46 36z" fill="#2C6E91"/><path d="M44 86q16 12 32 0" stroke="#fff" stroke-width="4" fill="none"/><path d="M52 82h16v10H52z" fill="#C08A5E"/><ellipse cx="60" cy="58" rx="23" ry="26" fill="#D9A273"/><path d="M36 54c-1-18 10-28 24-28s26 10 24 28c-6-9-12-12-24-12-9 0-15 4-24 12z" fill="#2B1E17"/><path d="M33 62a27 27 0 0 1 54 0" stroke="#203943" stroke-width="5" fill="none"/><rect x="28" y="56" width="10" height="16" rx="4" fill="#157A64"/><rect x="82" y="56" width="10" height="16" rx="4" fill="#157A64"/><circle cx="51" cy="61" r="2.8" fill="#1E1A17"/><circle cx="69" cy="61" r="2.8" fill="#1E1A17"/><path d="M51 71q9 7 18 0" stroke="#7A3B2B" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`);
const Dunia = {
  W: 1672, H: 941, aktif: false, siap: false, cv: null, ctx: null, peta: null, kepala: {},
  p: { x: 845, y: 745, arah: 1, fase: 0, jalan: false }, tuju: null, keys: {}, pad: {}, cam: { x: 845, y: 600 }, z: 1, t0: 0, macet: 0, raf: 0,
  // area yang bisa dilalui [x, y, lebar, tinggi]
  JALAN: [[595, 375, 495, 400], [750, 765, 190, 75], [130, 410, 470, 210], [140, 612, 415, 155], [125, 115, 450, 255], [335, 360, 85, 60],
    [595, 125, 490, 255], [1100, 165, 435, 203], [1075, 190, 35, 85], [1115, 395, 425, 245], [1080, 500, 45, 90]],
  // perabot dan dinding yang menghalangi
  BLOK: [[95, 478, 325, 134], [205, 455, 72, 60], [140, 638, 135, 135], [312, 660, 105, 92], [448, 648, 92, 107], [185, 140, 305, 215], [55, 100, 90, 255],
    [705, 95, 75, 95], [890, 95, 75, 95], [665, 185, 345, 150], [700, 322, 80, 45], [895, 322, 80, 45], [1130, 195, 380, 148],
    [1205, 425, 300, 210], [1530, 410, 70, 220], [1140, 395, 60, 65], [605, 560, 35, 215], [1035, 560, 60, 215], [625, 690, 70, 75], [970, 690, 70, 75]],
  STASIUN: { 1: { x: 300, y: 450, r: 85, nama: 'Meja resepsionis' }, 3: { x: 640, y: 258, r: 92, nama: 'Meja desain' }, 5: { x: 1320, y: 352, r: 95, nama: 'Area produksi' } },
  POS_KLIEN: { lobi: { x: 294, y: 690, nama: 'Ruang tunggu' }, rapat: { x: 1180, y: 520, nama: 'Ruang rapat' }, presentasi: { x: 525, y: 250, nama: 'Ruang presentasi' } },
  KIRANA: { x: 935, y: 640 },
  BAJU: { pemain: ['#2C6E91', '#2B2B33'], kirana: ['#3F7A85', '#1F2A4A'], sari: ['#E3A52B', '#234D3A'], wayan: ['#F2EFE4', '#3B3B3B'], ayu: ['#EF9AAB', '#7A1F2B'] },

  init() {
    this.cv = $('#dunia'); this.ctx = this.cv.getContext('2d');
    this.peta = new Image(); this.peta.src = 'assets/img/peta_dunia.webp';
    const muat = (id, src) => { const i = new Image(); i.src = src; this.kepala[id] = i; };
    muat('pemain', AVA_JALAN); muat('kirana', IMG.kirana.ava); muat('sari', IMG.sari.ava); muat('wayan', AVA_WAYAN); muat('ayu', AVA_AYU);
    this.lencana = [1, 2, 3, 4, 5].map(n => { const i = new Image(); i.src = LENC(n); return i; });
    const kunci = { arrowup: 'u', w: 'u', arrowdown: 'd', s: 'd', arrowleft: 'l', a: 'l', arrowright: 'r', d: 'r' };
    window.addEventListener('keydown', e => {
      if (!this.aktif) return;
      const k = e.key.toLowerCase();
      if (this.beku()) return;
      if (kunci[k]) { this.keys[kunci[k]] = true; this.tuju = null; e.preventDefault(); }
      else if (k === 'e' || k === 'enter' || k === ' ') { e.preventDefault(); this.interaksi(); }
      else if (k === 'm') { e.preventDefault(); this.modalPeta(); }
    });
    window.addEventListener('keyup', e => { const k = kunci[e.key.toLowerCase()]; if (k) this.keys[k] = false; });
    window.addEventListener('blur', () => { this.keys = {}; this.pad = {}; });
    this.cv.addEventListener('pointerdown', e => {
      if (!this.aktif || this.beku()) return;
      if (e.pointerType !== 'mouse') document.body.classList.add('sentuh');
      const w = this.layarKeDunia(e.clientX, e.clientY);
      const t = this.terdekatDari(w.x, w.y, 60);
      if (t && this.jarak(t) <= t.r) { this.interaksi(t); return; }
      const jl = this.jalur(t ? t.x : w.x, t ? t.y + 10 : w.y);
      this.tuju = jl && jl.length ? { jalur: jl, obj: t } : null; this.macet = 0;
      this.ketuk = { x: w.x, y: w.y, t: performance.now() };
    });
    if (matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) document.body.classList.add('sentuh');
  },
  beku() { return modal.classList.contains('buka') || dialog.classList.contains('buka'); },
  ukur() {
    if (!this.cv) return;
    const W = innerWidth, H = innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cv.width = Math.round(W * dpr); this.cv.height = Math.round(H * dpr); this.dpr = dpr;
    this.z = Math.max(Math.min(Math.min(W, H) / 600, 1.5), H / this.H, W / this.W);
  },
  statik(x, y) {
    const isi = (a, b, r) => a >= r[0] && a <= r[0] + r[2] && b >= r[1] && b <= r[1] + r[3];
    return [[x - 10, y], [x + 10, y], [x, y - 5], [x, y + 6]].every(([a, b]) => this.JALAN.some(r => isi(a, b, r)) && !this.BLOK.some(r => isi(a, b, r)));
  },
  bisa(x, y) { return this.statik(x, y) && !this.npc().some(n => Math.hypot(n.x - x, n.y - y) < 22); },
  // pencarian jalur A* pada kisi 12 px agar pemain memutari dinding saat lantai diketuk
  jalur(tx, ty) {
    const G = 12, C = Math.ceil(this.W / G), Rw = Math.ceil(this.H / G);
    if (!this.kisi) { this.kisi = new Uint8Array(C * Rw); for (let r = 0; r < Rw; r++) for (let c = 0; c < C; c++) this.kisi[r * C + c] = this.statik(c * G + G / 2, r * G + G / 2) ? 1 : 0; }
    const npcSel = new Set(this.npc().map(n => Math.floor(n.y / G) * C + Math.floor(n.x / G)));
    const ok = i => this.kisi[i] && !npcSel.has(i);
    const sel = (x, y) => Math.max(0, Math.min(Rw - 1, Math.floor(y / G))) * C + Math.max(0, Math.min(C - 1, Math.floor(x / G)));
    const dekatOk = i => { if (ok(i)) return i; const c0 = i % C, r0 = (i / C) | 0; for (let d = 1; d < 12; d++) { let best = -1, bd = 1e9; for (let r = r0 - d; r <= r0 + d; r++) for (let c = c0 - d; c <= c0 + d; c++) { if (r < 0 || c < 0 || r >= Rw || c >= C) continue; const j = r * C + c; if (ok(j)) { const dd = (r - r0) ** 2 + (c - c0) ** 2; if (dd < bd) { bd = dd; best = j; } } } if (best >= 0) return best; } return -1; };
    const s = dekatOk(sel(this.p.x, this.p.y)), e = dekatOk(sel(tx, ty)); if (s < 0 || e < 0) return null;
    const gS = new Float32Array(C * Rw).fill(1e9), dari = new Int32Array(C * Rw).fill(-1), tutup = new Uint8Array(C * Rw);
    const ex = e % C, ey = (e / C) | 0, h = i => Math.hypot(i % C - ex, ((i / C) | 0) - ey);
    const heap = [[h(s), s]]; gS[s] = 0;
    const push = it => { heap.push(it); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
    let n = 0;
    while (heap.length && n++ < 20000) {
      const [, i] = pop(); if (tutup[i]) continue; tutup[i] = 1; if (i === e) break;
      const c = i % C, r = (i / C) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue; const nc = c + dx, nr = r + dy; if (nc < 0 || nr < 0 || nc >= C || nr >= Rw) continue;
        const j = nr * C + nc; if (!ok(j) || tutup[j]) continue;
        if (dx && dy && (!ok(r * C + nc) || !ok(nr * C + c))) continue;
        const g2 = gS[i] + (dx && dy ? 1.414 : 1); if (g2 < gS[j]) { gS[j] = g2; dari[j] = i; push([g2 + h(j), j]); }
      }
    }
    if (dari[e] < 0 && e !== s) return null;
    const jalan = []; for (let i = e; i !== s && i >= 0; i = dari[i]) jalan.push({ x: (i % C) * G + G / 2, y: ((i / C) | 0) * G + G / 2 });
    jalan.reverse();
    // rapikan: lewati titik yang bisa dicapai lurus
    const lurus = (a, b) => { const L = Math.hypot(b.x - a.x, b.y - a.y), k = Math.ceil(L / 6); for (let q = 1; q <= k; q++) { const x = a.x + (b.x - a.x) * q / k, y = a.y + (b.y - a.y) * q / k; if (!this.statik(x, y)) return false; } return true; };
    const hasil = []; let dariT = { x: this.p.x, y: this.p.y }, i = 0;
    while (i < jalan.length) { let j = jalan.length - 1; while (j > i && !lurus(dariT, jalan[j])) j--; hasil.push(jalan[j]); dariT = jalan[j]; i = j + 1; }
    return hasil;
  },
  posKlien() { const nx = misiBerikut(); return nx === 4 || nx === 5 ? this.POS_KLIEN.rapat : (nx === 'konfirmasi' || nx === 'hasil') ? this.POS_KLIEN.presentasi : this.POS_KLIEN.lobi; },
  npc() {
    const k = K(), pk = this.posKlien();
    return [{ id: 'kirana', jenis: 'npc', nama: 'Kak Kirana', x: this.KIRANA.x, y: this.KIRANA.y, r: 72 },
      { id: k.klien.id, jenis: 'klien', nama: k.klien.nama, x: pk.x, y: pk.y, r: 72 }];
  },
  benda() {
    const d = D(), list = this.npc();
    [1, 3, 5].forEach(n => { const s = this.STASIUN[n]; list.push({ id: 'm' + n, jenis: 'stasiun', n, nama: `Misi ${n} · ${s.nama}`, x: s.x, y: s.y, r: s.r }); });
    return list;
  },
  tujuan() {
    const nx = misiBerikut(), k = K();
    if (nx === 1 || nx === 3 || nx === 5) { const s = this.STASIUN[nx]; return { x: s.x, y: s.y - 40, teks: `Misi ${nx} · ${MISI[nx].nama}`, sub: `Pergi ke ${s.nama.toLowerCase()}` }; }
    const pk = this.posKlien();
    if (nx === 2 || nx === 4) return { x: pk.x, y: pk.y - 70, teks: `Misi ${nx} · ${MISI[nx].nama}`, sub: `Temui ${k.klien.nama} di ${pk.nama.toLowerCase()}` };
    if (nx === 'konfirmasi') return { x: pk.x, y: pk.y - 70, teks: 'Konfirmasi brief', sub: `Temui ${k.klien.nama} di ruang presentasi` };
    return { x: this.KIRANA.x, y: this.KIRANA.y - 70, teks: 'Kasus selesai!', sub: 'Bicara dengan Kak Kirana untuk melihat hasil' };
  },
  jarak(o) { return Math.hypot(o.x - this.p.x, o.y - this.p.y); },
  terdekat() { let best = null, bd = 1e9; this.benda().forEach(o => { const d = this.jarak(o); if (d <= o.r && d < bd) { bd = d; best = o; } }); return best; },
  terdekatDari(x, y, rad) { let best = null, bd = rad; this.benda().forEach(o => { const d = Math.hypot(o.x - x, (o.y - (o.jenis === 'stasiun' ? 0 : 25)) - y); if (d < bd) { bd = d; best = o; } }); return best; },
  layarKeDunia(cx, cy) { return { x: this.cam.x + (cx - innerWidth / 2) / this.z, y: this.cam.y + (cy - innerHeight / 2) / this.z }; },

  async masuk() {
    if (!this.cv) this.init();
    document.body.classList.add('jelajah'); latar(''); hud.hidden = true;
    const d = D();
    if (!d.posisi) d.posisi = { x: 845, y: 745 };
    this.p.x = d.posisi.x; this.p.y = d.posisi.y; if (!this.bisa(this.p.x, this.p.y)) { this.p.x = 845; this.p.y = 745; }
    this.cam.x = this.p.x; this.cam.y = this.p.y; this.keys = {}; this.pad = {}; this.tuju = null;
    this.ukur(); this.pasangHUD();
    this.aktif = true; cancelAnimationFrame(this.raf); this.t0 = performance.now(); this.raf = requestAnimationFrame(t => this.loop(t));
    await tunggu(400);
    if (!this.aktif) return;
    const nx = misiBerikut();
    if (!d.introJelajah) {
      d.introJelajah = true; simpan();
      const kontrol = document.body.classList.contains('sentuh') ? 'Geser dengan tombol arah di kiri bawah, atau ketuk lantai untuk berjalan. Tekan tombol Bicara saat berada di dekat orang atau meja.' : 'Berjalanlah dengan tombol panah atau W A S D. Tekan E untuk berbicara atau memulai misi, dan M untuk membuka peta.';
      await bicara('kirana', `Selamat datang di Studio Kreativa! Hari ini kamu membantu ${K().klien.nama}. ${kontrol} Ikuti bintang kuning untuk menemukan tujuanmu.`);
    } else if (nx === 'konfirmasi') Suara.kode('umum_peta_konf');
  },
  keluar() {
    if (!this.aktif) return;
    this.aktif = false; cancelAnimationFrame(this.raf); document.body.classList.remove('jelajah'); $('#hud-dunia').hidden = true;
    const d = S.kasus ? D() : null; if (d) { d.posisi = { x: Math.round(this.p.x), y: Math.round(this.p.y) }; simpan(); }
  },
  pasangHUD() {
    const h = $('#hud-dunia'), k = K();
    const panah = r => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="transform:rotate(${r}deg)"><path d="M12 5l7 9H5z"/></svg>`;
    h.hidden = false;
    h.innerHTML = `
      <div class="hd-tujuan" aria-live="polite"><span class="ava-bulat" style="background-image:url('${ava(k.klien.id)}')"></span><div><small>Kasus ${k.no} · ${esc(k.klien.nama)} · ${esc(k.jenis)}</small><b id="hd-teks"></b><span id="hd-sub" style="font-size:.85em;opacity:.85"></span></div></div>
      <div class="hd-kanan"><div class="skor" aria-label="Skor"><img src="${BINTANG}" alt=""><b>${totalSemua()}</b></div>
        <button class="ikonbtn" id="hd-peta" aria-label="Buka peta (M)">${ICON.peta}</button>
        ${D().selesai[2] ? `<button class="ikonbtn" id="hd-catatan" aria-label="Catatan klien">${ICON.catatan}</button>` : ''}
        <button class="ikonbtn" id="hd-menu" aria-label="Menu">${ICON.orang}</button>
        <button class="ikonbtn" id="hd-panduan" aria-label="Panduan">${ICON.tanya}</button>
        <button class="ikonbtn" id="hd-suara" aria-label="Pengaturan suara">${adaSuara() ? ICON.suara : ICON.bisu}</button>
        <button class="ikonbtn" id="hd-layar" aria-label="Layar penuh">${ICON.layar}</button></div>
      <div class="dpad" aria-label="Tombol arah">
        <button class="u" data-d="u" aria-label="Atas">${panah(0)}</button><button class="l" data-d="l" aria-label="Kiri">${panah(-90)}</button>
        <span class="tengah"></span>
        <button class="r" data-d="r" aria-label="Kanan">${panah(90)}</button><button class="d" data-d="d" aria-label="Bawah">${panah(180)}</button></div>
      <div class="aksi-dunia"><span class="label-aksi" id="hd-label" hidden></span><button class="tbl-aksi" id="hd-aksi" disabled>Bicara<kbd>E</kbd></button></div>
      <div class="petunjuk-kunci"><kbd>W A S D</kbd>/<kbd>↑↓←→</kbd> berjalan · <kbd>E</kbd> bicara · <kbd>M</kbd> peta</div>`;
    $('#hd-peta').onclick = () => { Audio2.efek('klik'); this.modalPeta(); };
    const c = $('#hd-catatan'); if (c) c.onclick = () => { Audio2.efek('klik'); modalCatatan(); };
    $('#hd-panduan').onclick = () => { Audio2.efek('klik'); modalPanduan(); };
    $('#hd-suara').onclick = () => { Audio2.efek('klik'); bukaSuara(); };
    $('#hd-layar').onclick = () => { Audio2.efek('klik'); layarPenuh(); };
    $('#hd-aksi').onclick = () => { Audio2.efek('klik'); this.interaksi(); };
    $('#hd-menu').onclick = () => { Audio2.efek('klik'); bukaModal(`<h2>Menu</h2><p class="sub" style="margin:0 0 14px">Kasus ${k.no} · ${esc(k.klien.nama)} · ${jumlahSelesai(k.id)}/5 misi selesai</p>
      <div class="alat"><button class="btn sek" id="mn-kasus">${ICON.orang}Ganti klien</button>${D().konfirmasi ? `<button class="btn emas" id="mn-hasil">Hasil &amp; refleksi</button>` : ''}<button class="btn sek" id="mn-muka">Laman muka</button></div>`, { lebar: 560 });
      $('#mn-kasus').onclick = () => { Audio2.efek('klik'); keScene('pilihKasus'); };
      $('#mn-muka').onclick = () => { Audio2.efek('klik'); keScene('muka'); };
      const mh = $('#mn-hasil'); if (mh) mh.onclick = () => { Audio2.efek('klik'); keScene('hasil'); }; };
    $$('.dpad button').forEach(b => {
      const on = e => { e.preventDefault(); this.pad[b.dataset.d] = true; b.classList.add('on'); this.tuju = null; try { b.setPointerCapture(e.pointerId); } catch (x) {} };
      const off = () => { this.pad[b.dataset.d] = false; b.classList.remove('on'); };
      b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
    });
    const tj = this.tujuan(); $('#hd-teks').textContent = tj.teks; $('#hd-sub').textContent = tj.sub;
  },
  modalPeta() {
    const tj = this.tujuan(), pc = (x, y) => `left:${x / this.W * 100}%;top:${y / this.H * 100}%`;
    const tanda = this.benda().map(o => `<span class="mp-titik ${o.jenis}" style="${pc(o.x, o.y)}"><i></i><b>${esc(o.jenis === 'stasiun' ? o.nama.split(' · ')[1] : o.nama)}</b></span>`).join('');
    bukaModal(`<h2>Peta Studio Kreativa</h2><p class="sub" style="margin:0 0 10px;font-size:14px">★ tujuan aktif: <b>${esc(tj.teks)}</b> · ● posisimu</p>
      <div class="mini-peta">${tanda}<span class="mp-bintang" style="${pc(tj.x, tj.y + 30)}">★</span><span class="mp-saya" style="${pc(this.p.x, this.p.y)}"></span></div>
      <div class="alat" style="margin-top:12px"><button class="btn" data-tutup>Tutup</button></div>`, { lebar: potret ? 672 : 960 });
  },
  async interaksi(o) {
    o = o || this.terdekat(); if (!o || this.beku()) return;
    this.keys = {}; this.pad = {}; this.tuju = null;
    const k = K(), nx = misiBerikut(), d = D();
    if (o.jenis === 'stasiun') {
      if (!terbuka(o.n)) { Audio2.efek('salah'); toast(`Selesaikan Misi ${o.n - 1} dulu.`); Suara.ucap('kirana', `Meja ini untuk Misi ${o.n}. Selesaikan dulu Misi ${o.n - 1}, ya.`); return; }
      bukaMisi(o.n); return;
    }
    if (o.jenis === 'klien') {
      if (nx === 2 || nx === 4) { bukaMisi(nx); return; }
      if (nx === 'konfirmasi') { this.keluar(); keScene('konfirmasi'); return; }
      if (d.selesai[2] && (nx === 'hasil')) { await bicara(k.klien.id, `Terima kasih banyak, Kak. Brief-nya sangat membantu!`, { pose: 'setuju' }); return; }
      if (nx === 1) { await bicara(k.klien.id, `Halo, Kak! Saya sudah mengirim pesan ke meja resepsionis. Silakan dibaca dulu, ya.`); return; }
      const ulang = [2, 4].filter(n => d.selesai[n]);
      await bicara(k.klien.id, ulang.length ? `Saya tunggu kabar baiknya ya, Kak. Kalau ada yang perlu ditanyakan lagi, saya di sini.` : `Saya tunggu kabar baiknya ya, Kak.`);
      return;
    }
    // Kak Kirana memberi arahan
    const nama = k.klien.nama;
    const arah = { 1: `Pesan dari ${nama} sudah masuk di komputer meja resepsionis, di sebelah kiri aula. Masuk lewat belakang meja, lalu tekan Bicara di dekat komputer.`,
      2: `${nama} sudah menunggu di ruang tunggu, di bawah meja resepsionis. Hampiri dan ajukan pertanyaan yang tepat.`,
      3: `Saatnya menyusun brief di meja desain, ruangan di atas aula.`,
      4: `${nama} menunggumu di ruang rapat sebelah kanan. Ada perubahan yang perlu dibicarakan.`,
      5: `Tim sudah membuat ringkasan. Periksa di area produksi, lewat pintu kanan ruang meja desain.`,
      konfirmasi: `Ringkasan sudah benar. Temui ${nama} di ruang presentasi kiri atas untuk konfirmasi.` };
    if (nx === 'hasil') {
      await bicara('kirana', `Kasus ${nama} sudah selesai. Hebat! Mau melihat hasil dan menulis refleksi?`, { tombol: 'Lihat hasil' });
      this.keluar(); keScene('hasil'); return;
    }
    await bicara('kirana', arah[nx]);
  },

  loop(t) {
    if (!this.aktif) return;
    const dt = Math.min(0.05, (t - this.t0) / 1000); this.t0 = t;
    this.gerak(dt); this.gambar(t / 1000);
    this.raf = requestAnimationFrame(tt => this.loop(tt));
  },
  gerak(dt) {
    let dx = 0, dy = 0;
    if (!this.beku()) {
      const a = Object.assign({}, this.keys); Object.keys(this.pad).forEach(k => { if (this.pad[k]) a[k] = true; });
      dx = (a.r ? 1 : 0) - (a.l ? 1 : 0); dy = (a.d ? 1 : 0) - (a.u ? 1 : 0);
      if (!dx && !dy && this.tuju) {
        const ob = this.tuju.obj;
        if (ob && this.jarak(ob) <= ob.r * 0.75) { this.tuju = null; this.interaksi(ob); }
        else {
          let wp = this.tuju.jalur[0];
          while (wp && Math.hypot(wp.x - this.p.x, wp.y - this.p.y) < 6) { this.tuju.jalur.shift(); wp = this.tuju.jalur[0]; }
          if (!wp) { this.tuju = null; if (ob && this.jarak(ob) <= ob.r) this.interaksi(ob); }
          else { const vx = wp.x - this.p.x, vy = wp.y - this.p.y, L = Math.hypot(vx, vy); dx = vx / L; dy = vy / L; }
        }
      }
    }
    const L = Math.hypot(dx, dy);
    this.p.jalan = L > 0;
    if (L) {
      dx /= L; dy /= L; const v = 175 * dt;
      const x0 = this.p.x, y0 = this.p.y;
      if (this.bisa(this.p.x + dx * v, this.p.y)) this.p.x += dx * v;
      if (this.bisa(this.p.x, this.p.y + dy * v)) this.p.y += dy * v;
      if (dx) this.p.arah = dx > 0 ? 1 : -1;
      this.p.fase += dt * 11;
      const pindah = Math.hypot(this.p.x - x0, this.p.y - y0);
      if (this.tuju) { this.macet = pindah < v * 0.2 ? this.macet + dt : 0; if (this.macet > 0.35) { this.tuju = null; this.macet = 0; } }
      if (pindah < 0.01) this.p.jalan = false;
    }
    // kamera mengikuti pemain
    const W = innerWidth / this.z, H = innerHeight / this.z;
    const tx = W >= this.W ? this.W / 2 : Math.max(W / 2, Math.min(this.W - W / 2, this.p.x));
    const ty = H >= this.H ? this.H / 2 : Math.max(H / 2, Math.min(this.H - H / 2, this.p.y - 20));
    this.cam.x += (tx - this.cam.x) * Math.min(1, dt * 7); this.cam.y += (ty - this.cam.y) * Math.min(1, dt * 7);
    // tombol aksi
    const o = this.terdekat(), b = $('#hd-aksi'), lb = $('#hd-label');
    if (b) {
      const ada = !!o && !this.beku();
      if (b.disabled === ada) b.disabled = !ada;
      const teks = o ? (o.jenis === 'stasiun' ? (terbuka(o.n) ? (D().selesai[o.n] ? `Ulangi ${o.nama}` : `Mulai ${o.nama}`) : `${o.nama} (terkunci)`) : `Bicara dengan ${o.nama}`) : '';
      if (lb.textContent !== teks) lb.textContent = teks;
      lb.hidden = !ada;
    }
  },
  orang(c, x, y, id, jalan, fase, arah, nama, sorot) {
    const [baju, celana] = this.BAJU[id] || this.BAJU.pemain;
    const ay = jalan ? Math.sin(fase) * 4 : 0, bob = jalan ? -Math.abs(Math.sin(fase)) * 2.5 : Math.sin(performance.now() / 600 + x) * 0.6;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x, y + 1, 14, 5, 0, 0, 7); c.fill();
    c.fillStyle = celana; c.fillRect(x - 8, y - 15 + bob, 6, 14 + ay * 0.5); c.fillRect(x + 2, y - 15 + bob, 6, 14 - ay * 0.5);
    c.fillStyle = '#2a2320'; c.fillRect(x - 9, y - 2 + ay * 0.5, 8, 3); c.fillRect(x + 1, y - 2 - ay * 0.5, 8, 3);
    c.fillStyle = baju; c.beginPath(); c.roundRect(x - 11, y - 33 + bob, 22, 20, 7); c.fill();
    c.fillRect(x - 14, y - 30 + bob - ay * 0.6, 4, 13); c.fillRect(x + 10, y - 30 + bob + ay * 0.6, 4, 13);
    const img = this.kepala[id], hy = y - 48 + bob;
    c.save(); c.beginPath(); c.arc(x, hy, 16, 0, 7); c.closePath(); c.fillStyle = '#fff'; c.fill(); c.clip();
    if (img && img.complete && img.naturalWidth) { if (arah < 0) { c.translate(2 * x, 0); c.scale(-1, 1); } c.drawImage(img, x - 16, hy - 16, 32, 32); }
    c.restore();
    c.lineWidth = sorot ? 3 : 2; c.strokeStyle = sorot ? '#E9BA4A' : '#fff'; c.beginPath(); c.arc(x, hy, 16, 0, 7); c.stroke();
    if (nama) {
      c.font = '700 11px Poppins, sans-serif'; const w = c.measureText(nama).width + 14;
      c.fillStyle = id === 'pemain' ? 'rgba(233,186,74,.95)' : 'rgba(32,57,67,.9)'; c.beginPath(); c.roundRect(x - w / 2, hy - 36, w, 17, 8); c.fill();
      c.fillStyle = id === 'pemain' ? '#203943' : '#fff'; c.textAlign = 'center'; c.fillText(nama, x, hy - 24);
    }
  },
  bintang(c, x, y, r) {
    c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath();
    c.fillStyle = '#E9BA4A'; c.fill(); c.lineWidth = 2.5; c.strokeStyle = '#fff'; c.stroke();
  },
  gambar(ts) {
    const c = this.ctx, dpr = this.dpr, z = this.z, W = innerWidth, H = innerHeight;
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#BBA895'; c.fillRect(0, 0, this.cv.width, this.cv.height);
    c.setTransform(dpr * z, 0, 0, dpr * z, dpr * (W / 2 - this.cam.x * z), dpr * (H / 2 - this.cam.y * z));
    c.imageSmoothingEnabled = true;
    if (this.peta.complete) c.drawImage(this.peta, 0, 0, this.W, this.H);
    const d = D(), dekat = this.terdekat(), nx = misiBerikut();
    // stasiun misi
    [1, 3, 5].forEach(n => {
      const s = this.STASIUN[n], buka = terbuka(n), aktif = nx === n, pul = 1 + Math.sin(ts * 3) * 0.08;
      c.save(); c.globalAlpha = buka ? 0.9 : 0.45;
      c.fillStyle = aktif ? 'rgba(233,186,74,.35)' : 'rgba(21,122,100,.22)'; c.beginPath(); c.ellipse(s.x, s.y + 8, 40 * (aktif ? pul : 1), 15 * (aktif ? pul : 1), 0, 0, 7); c.fill();
      c.lineWidth = 2; c.strokeStyle = aktif ? '#E9BA4A' : '#157A64'; c.stroke();
      const L = this.lencana[n - 1]; if (L.complete) { if (!buka) c.filter = 'grayscale(1)'; c.drawImage(L, s.x - 17, s.y - 34, 34, 37); c.filter = 'none'; }
      if (d.selesai[n]) { c.fillStyle = '#1f8a5a'; c.beginPath(); c.arc(s.x + 15, s.y - 30, 8, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; c.beginPath(); c.moveTo(s.x + 11, s.y - 30); c.lineTo(s.x + 14, s.y - 27); c.lineTo(s.x + 19, s.y - 33); c.stroke(); }
      c.restore();
    });
    // orang, diurutkan berdasarkan posisi y
    const daftar = this.npc().map(n => ({ ...n, jalan: false, fase: 0, arah: n.x > this.p.x ? -1 : 1 }));
    daftar.push({ id: 'pemain', nama: 'Kamu', x: this.p.x, y: this.p.y, jalan: this.p.jalan, fase: this.p.fase, arah: this.p.arah });
    daftar.sort((a, b) => a.y - b.y).forEach(o => this.orang(c, o.x, o.y, o.id, o.jalan, o.fase, o.arah, o.nama, dekat && dekat.id === o.id));
    // penanda ketukan
    if (this.ketuk && performance.now() - this.ketuk.t < 600) { const a = 1 - (performance.now() - this.ketuk.t) / 600; c.strokeStyle = `rgba(233,186,74,${a})`; c.lineWidth = 3; c.beginPath(); c.ellipse(this.ketuk.x, this.ketuk.y, 18 * (1.4 - a * .4), 7 * (1.4 - a * .4), 0, 0, 7); c.stroke(); }
    // penanda interaksi
    if (dekat && !this.beku()) {
      const yy = dekat.jenis === 'stasiun' ? dekat.y - 52 : dekat.y - 98;
      c.fillStyle = '#fff'; c.beginPath(); c.roundRect(dekat.x - 13, yy - 13, 26, 24, 7); c.fill(); c.strokeStyle = '#157A64'; c.lineWidth = 2; c.stroke();
      c.fillStyle = '#157A64'; c.font = '800 14px Poppins, sans-serif'; c.textAlign = 'center'; c.fillText(document.body.classList.contains('sentuh') ? '!' : 'E', dekat.x, yy + 4);
    }
    // bintang tujuan
    const tj = this.tujuan(), by = tj.y - 22 + Math.sin(ts * 4) * 5;
    if (!dekat || Math.hypot(dekat.x - tj.x, dekat.y - tj.y - 40) > 60) this.bintang(c, tj.x, by, 12);
    // panah di tepi layar bila tujuan di luar pandangan
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sx = W / 2 + (tj.x - this.cam.x) * z, sy = H / 2 + (tj.y - this.cam.y) * z, m = 46;
    if (sx < m || sx > W - m || sy < m + 60 || sy > H - m) {
      const cx = W / 2, cy = H / 2, ang = Math.atan2(sy - cy, sx - cx);
      const kx = Math.max(m, Math.min(W - m, sx)), ky = Math.max(m + 70, Math.min(H - m - 10, sy));
      c.save(); c.translate(kx, ky); c.rotate(ang);
      c.fillStyle = 'rgba(32,57,67,.85)'; c.beginPath(); c.arc(0, 0, 22, 0, 7); c.fill();
      c.fillStyle = '#E9BA4A'; c.beginPath(); c.moveTo(14, 0); c.lineTo(-6, -10); c.lineTo(-2, 0); c.lineTo(-6, 10); c.closePath(); c.fill(); c.restore();
    }
  },
};

/* =========================================================
   7. SKALA LAYAR, PRAMUAT, MULAI
   ========================================================= */
let potret = null;
function skala() {
  const w = window.innerWidth, h = window.innerHeight, p = h > w;
  if (p !== potret) { potret = p; $('#stage').classList.toggle('potret', p); }
  document.documentElement.style.setProperty('--s', p ? Math.min(w / 720, h / 1280) : Math.min(w / 1280, h / 720));
  Dunia.ukur();
}
window.addEventListener('resize', skala); window.addEventListener('orientationchange', () => setTimeout(skala, 250));
skala();

async function pramuat() {
  const gambar = ['assets/img/latar.webp', 'assets/img/peta_dunia.webp', ...Object.values(IMG.kirana), ...Object.values(IMG.sari), ...[1, 2, 3, 4, 5].map(LENC), BINTANG];
  const total = gambar.length + 1; let n = 0;
  const maju = () => { n++; $('#muatbar').style.width = Math.round(n / total * 100) + '%'; };
  await Promise.all([Promise.all(gambar.map(src => new Promise(r => { const i = new Image(); i.onload = i.onerror = () => { maju(); r(); }; i.src = src; }))), Audio2.muat().then(maju)]);
}
Suara.muat();
pramuat().then(() => {
  $('#muatteks').textContent = 'Studio siap!';
  const b = $('#masuk'); b.hidden = false; b.focus({ preventScroll: true });
  b.onclick = () => {
    Audio2.buka();
    try { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) {}
    Audio2.efek('klik'); Audio2.musik();
    if (!('speechSynthesis' in window) || Suara.dalamAplikasi()) setTimeout(() => Suara.peringat('awal'), 1500);
    $('#splash').style.transition = 'opacity .5s'; $('#splash').style.opacity = 0; setTimeout(() => $('#splash').remove(), 500);
    keScene('muka');
  };
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { Suara.stop(); if (Audio2.ctx) Audio2.ctx.suspend(); else if (Audio2.el) Audio2.el.pause(); }
  else { if (Audio2.ctx) Audio2.ctx.resume(); Audio2.musik(); }
});
window.__MD = { S: () => S, keScene, NASKAH, KASUS, Dunia };
})();

export const moduleInfo = {
  title: "BEDAH INFORMASI!",
  subtitle: "Membedah Fakta, Opini, dan Keabsahan Data dalam Artikel Ilmiah Populer",
  author: "Hanunah Rizqi Mumtaz",
  school: "SMA Muhammadiyah 2 Tangerang",
  duration: "2 × 45 menit",
  goals: [
    "Menganalisis struktur dan kaidah kebahasaan artikel ilmiah populer secara kritis dan tepat.",
    "Mengevaluasi akurasi data, fakta, dan opini penulis secara cermat dan logis.",
  ],
};

export const journey = [
  { id: "article", label: "Kenali Artikel", target: "materi", color: "secondary" },
  { id: "facts", label: "Bedah Fakta & Opini", target: "tantangan", color: "accent" },
  { id: "data", label: "Uji Keabsahan Data", target: "verifikasi", color: "primary" },
  { id: "digital", label: "Verifikasi Digital", target: "materi", color: "highlight" },
  { id: "editorial", label: "Jadi Editor", target: "editorial", color: "accent" },
  { id: "practice", label: "Latihan", target: "latihan", color: "secondary" },
  { id: "evaluation", label: "Evaluasi", target: "evaluasi", color: "primary" },
  { id: "reflection", label: "Refleksi", target: "refleksi", color: "highlight" },
] as const;

export const aperception = [
  { question: "Angka 80% itu berasal dari penelitian siapa?", options: ["Angka yang besar pasti benar", "Cari peneliti dan sumber aslinya"], answer: 1, explanation: "Angka perlu ditelusuri ke penelitian asli: siapa penelitinya, kapan dilakukan, berapa respondennya, dan bagaimana metodenya." },
  { question: "Apakah kata ‘karena’ menunjukkan hubungan sebab-akibat yang benar-benar terbukti?", options: ["Belum; periksa bukti kausalitas", "Ya, karena dua hal terjadi bersamaan"], answer: 0, explanation: "Korelasi bukan otomatis kausalitas. Periksa desain penelitian dan faktor lain sebelum menyimpulkan sebab-akibat." },
  { question: "Apakah judulnya informatif atau justru dibuat untuk memancing klik?", options: ["Judul menarik cukup menjadi bukti", "Bandingkan judul dengan isi dan buktinya"], answer: 1, explanation: "Judul yang terlihat ilmiah belum tentu valid. Pastikan simpulan judul sesuai dengan bukti dalam artikel." },
];

export const chapters = [
  {
    id: "article", label: "Kenali artikel", eyebrow: "BAB 01", title: "Ilmiah isinya. Populer bahasanya.",
    intro: "Artikel ilmiah populer menyampaikan pengetahuan, hasil penelitian, fenomena ilmiah, atau isu berbasis data dengan bahasa komunikatif. Informasi mudah dipahami tanpa menghilangkan ketepatan makna.",
    sections: [
      { title: "Lima karakteristik utama", body: "Berbasis pengetahuan atau data; berbahasa komunikatif; aktual dan relevan; mengandung fakta dan dapat memuat opini; memiliki alur penjelasan dari masalah menuju pembahasan dan penutup." },
      { title: "Struktur: judul → pendahuluan → isi → penutup", body: "Judul mewakili pokok bahasan tanpa menyesatkan. Pendahuluan memperkenalkan fenomena, masalah, atau data awal. Isi memuat data, penjelasan, kutipan, dan argumentasi. Penutup berisi simpulan, rekomendasi, penegasan, atau refleksi." },
      { title: "Kaidah kebahasaan yang perlu dikenali", body: "Istilah ilmiah: PM2.5, ISPU, hotspot, El Niño. Kata kerja material: meningkat, menurun, mencatat, menyebabkan. Kata kerja mental: menilai, menduga, memperkirakan. Konjungsi kausalitas: karena, sehingga, akibatnya. Kata rujukan: ini, tersebut. Data numerik: angka, persentase, waktu, ukuran." },
      { title: "Populer dan akademik: apa bedanya?", body: "Artikel populer ditujukan kepada masyarakat umum dengan bahasa komunikatif dan penyajian kontekstual. Artikel akademik ditujukan kepada komunitas ilmiah dengan bahasa teknis, metodologi, analisis, dan sitasi akademik. Keduanya tetap membutuhkan sumber yang dapat dipertanggungjawabkan." },
    ],
  },
  {
    id: "facts", label: "Fakta & opini", eyebrow: "BAB 02", title: "Angka bukan jaminan. Pendapat bukan kesalahan.",
    intro: "Fakta dapat dibuktikan melalui data, dokumen, peristiwa, pengamatan, atau sumber yang dapat diperiksa. Opini merupakan pendapat, penilaian, dugaan, prediksi, saran, atau interpretasi. Opini dapat kuat jika ditopang fakta valid dan alasan logis.",
    sections: [
      { title: "Fakta: objektif dan dapat diverifikasi", body: "Sering memuat angka, waktu, tempat, atau sumber. Ciri pentingnya adalah dapat diperiksa, bukan sekadar terdengar pasti. Contoh: ‘Pada pekan pertama September tercatat 412 titik panas’ — jika angka dan waktunya dapat ditemukan pada sumber kredibel." },
      { title: "Opini: menilai, menafsirkan, menyarankan", body: "Sering ditandai sebaiknya, dinilai, dianggap, diduga, tampaknya. Contoh: ‘Pengawasan kawasan gambut sangat buruk’ dan ‘Pemerintah sebaiknya menunda izin pembukaan lahan’. Periksa indikator dan kekuatan alasannya." },
      { title: "Kasus abu-abu: fakta tentang prediksi", body: "‘BMKG memprediksi musim hujan mundur hingga akhir Oktober.’ Fakta yang dapat diverifikasi adalah BMKG memang mengeluarkan prediksi itu. Isi prediksi tetap menyangkut peristiwa yang belum terjadi." },
      { title: "Jangan terjebak empat kesalahan ini", body: "Tidak semua angka pasti fakta; tidak semua isi kutipan narasumber adalah fakta; prediksi lembaga resmi bukan kepastian masa depan; jangan menentukan kategori hanya dari satu kata tanpa membaca konteks." },
    ],
  },
  {
    id: "data", label: "Keabsahan data", eyebrow: "BAB 03", title: "Faktual belum tentu valid.",
    intro: "Kalimat yang terlihat faktual dapat menggunakan data palsu, sumber tidak jelas, angka tanpa konteks, atau hubungan sebab-akibat yang terlalu disederhanakan.",
    sections: [
      { title: "Lima pertanyaan untuk menguji klaim", body: "Siapa sumbernya? Kapan data dikumpulkan atau diterbitkan? Di mana konteks kejadiannya? Bagaimana data diperoleh? Apakah ada sumber lain yang mengonfirmasi?" },
      { title: "Naik 100%: selalu luar biasa?", body: "Jika jumlah awal 1 kasus dan menjadi 2 kasus, kenaikannya memang 100%. Persentase perlu dibaca bersama jumlah absolut, periode waktu, dan populasi pembanding." },
      { title: "Korelasi bukan otomatis kausalitas", body: "Dua hal yang terjadi bersamaan belum tentu saling menyebabkan. Jika penggunaan gawai meningkat bersamaan dengan gangguan tidur, periksa desain penelitian, faktor lain, dan kualitas bukti sebelum menyimpulkan penyebab." },
      { title: "Tanda klaim perlu diperiksa", body: "Angka besar tanpa sumber; nama lembaga tanpa laporan; judul bombastis; kata ‘terbukti’ tanpa bukti; data lama untuk menggambarkan kondisi kini; simpulan lebih luas daripada data." },
    ],
  },
  {
    id: "digital", label: "Verifikasi digital", eyebrow: "BAB 04", title: "Cari sumbernya. Baca konteksnya.",
    intro: "Lakukan verifikasi terhadap klaim spesifik. Utamakan dokumen asli dan bandingkan sumber kredibel sebelum mencatat putusan.",
    sections: [
      { title: "Enam langkah verifikasi digital", body: "1. Isolasi klaim. 2. Susun kata kunci: nama lembaga + angka + lokasi + waktu. 3. Cari sumber primer. 4. Bandingkan sumber. 5. Cek kesamaan angka, periode, wilayah, dan definisi. 6. Catat putusan: terkonfirmasi, belum terkonfirmasi, atau bertentangan." },
      { title: "Contoh kata kunci dari modul", body: "ISPU Dumai 185 BPBD • hotspot September KLHK 412 • BMKG El Nino akhir Oktober. Tambahkan tahun dan lokasi saat tersedia agar hasil tidak tercampur dengan peristiwa lain." },
      { title: "Checklist sumber digital", body: "Ada penulis atau redaksi; ada tanggal terbit; sumber data jelas; judul sesuai isi; tidak hanya mengandalkan tangkapan layar; informasi dapat dibandingkan dengan sumber lain." },
      { title: "Etika menggunakan gawai", body: "Gunakan untuk kebutuhan verifikasi. Catat sumber. Jangan menyalin jawaban tanpa memahami. Diskusikan perbedaan temuan dengan pasangan secara logis." },
    ],
  },
] as const;

export const verificationQuestions = ["Siapa sumbernya?", "Kapan data dikumpulkan?", "Di mana konteksnya?", "Bagaimana data diperoleh?", "Apakah ada sumber lain?"];
export const credibility = [
  { label: "Sangat kuat", examples: "Dokumen resmi, laporan lembaga, data pemerintah, publikasi penelitian.", reason: "Telusuri dokumen asli dan tetap periksa metode, waktu, dan konteks. Nama lembaga bukan jaminan bahwa setiap klaim sudah tepat.", color: "secondary" },
  { label: "Kuat", examples: "Media arus utama dengan identitas redaksi jelas dan menyebut sumber primer.", reason: "Ikuti rujukannya ke sumber primer dan bandingkan cara data dikutip.", color: "primary" },
  { label: "Perlu diperiksa", examples: "Blog, akun media sosial, video pendek, unggahan tanpa sumber.", reason: "Cari penulis, tanggal, rujukan asli, dan konteks sebelum menggunakannya sebagai bukti.", color: "accent" },
  { label: "Lemah", examples: "Pesan berantai, tangkapan layar tanpa konteks, klaim anonim.", reason: "Jangan jadikan dasar putusan tanpa menelusuri sumber asli yang dapat dipertanggungjawabkan.", color: "highlight" },
] as const;

export const gameQuestions = [
  { text: "BPBD mencatat kualitas udara berada pada kategori tidak sehat.", answer: "Fakta", explanation: "Ini informasi tentang catatan BPBD yang dapat diperiksa. Kategorinya faktual; validitasnya tetap membutuhkan laporan asli." },
  { text: "Pemerintah seharusnya memperketat pengawasan kawasan gambut.", answer: "Opini", explanation: "‘Seharusnya’ menunjukkan rekomendasi kebijakan, bukan laporan peristiwa." },
  { text: "Sebanyak 500 siswa mengikuti kegiatan penanaman pohon pada hari Senin.", answer: "Fakta", explanation: "Jumlah peserta dan waktu dapat diverifikasi melalui catatan kegiatan. Angka saja belum membuktikan bahwa laporannya valid." },
  { text: "Program tersebut merupakan kegiatan lingkungan terbaik di sekolah.", answer: "Opini", explanation: "‘Terbaik’ adalah penilaian yang membutuhkan kriteria dan pembanding." },
  { text: "BMKG memperkirakan curah hujan akan menurun pada periode tertentu.", answer: "Perlu konteks", explanation: "Bedakan fakta bahwa BMKG mengeluarkan prediksi dengan isi prediksi yang belum terjadi. Periksa rilis dan periode yang dimaksud." },
  { text: "Menurut warga, jarak pandang terasa semakin terbatas.", answer: "Opini", explanation: "‘Terasa’ menyampaikan pengalaman atau penilaian warga. Fakta bahwa warga mengucapkannya berbeda dari bukti pengukuran jarak pandang." },
] as const;

export const editorCategories = ["Fakta", "Opini", "Kandidat Fakta", "Fakta tentang Prediksi", "Opini Ahli", "Opini/Rekomendasi", "Perlu Konteks"] as const;
export const editorActions = ["Verifikasi sumber", "Cek konteks", "Bandingkan data", "Identifikasi narasumber", "Periksa bukti kausalitas"] as const;
export const editorialClaims = [
  { text: "tercatat 412 titik panas dengan tingkat kepercayaan di atas 80% pada pekan pertama September", category: "Kandidat Fakta", actions: ["Verifikasi sumber", "Cek konteks", "Bandingkan data"], explanation: "Cari laporan KLHK; cocokkan angka, periode, serta definisi tingkat kepercayaan." },
  { text: "dianggap lebih hemat oleh sebagian pemilik lahan", category: "Opini", actions: ["Identifikasi narasumber", "Verifikasi sumber"], explanation: "Ini opini/interpretasi. Siapa yang menganggap lebih hemat, dan berdasarkan data apa?" },
  { text: "dinilai masih belum optimal", category: "Opini", actions: ["Cek konteks", "Identifikasi narasumber"], explanation: "Penilaian ‘optimal’ membutuhkan indikator dan pihak yang memberi penilaian." },
  { text: "ISPU di Kota Dumai mencapai angka 185 dan masuk kategori tidak sehat", category: "Kandidat Fakta", actions: ["Verifikasi sumber", "Cek konteks"], explanation: "Periksa laporan BPBD dan waktu pengukuran; angka dan kategori harus sesuai sumber." },
  { text: "Sedikitnya 1.200 warga dilaporkan mengalami ISPA dalam kurun dua pekan terakhir", category: "Kandidat Fakta", actions: ["Verifikasi sumber", "Periksa bukti kausalitas"], explanation: "Periksa sumber data kesehatan. Jangan otomatis menyimpulkan penyebab dari dua kejadian yang bersamaan." },
  { text: "pemadaman melalui udara kurang efektif apabila tinggi muka air tanah di kawasan gambut terus menyusut", category: "Opini Ahli", actions: ["Identifikasi narasumber", "Cek konteks"], explanation: "Identifikasi pengamat lingkungan, konteks gambut, dan dasar pendapat tentang water bombing." },
  { text: "BMKG memprediksi fenomena El Niño fase lemah berpotensi menunda awal musim hujan hingga akhir Oktober", category: "Fakta tentang Prediksi", actions: ["Verifikasi sumber", "Cek konteks"], explanation: "Cek apakah pernyataan BMKG benar ada. Isi prediksinya bukan kepastian peristiwa masa depan." },
  { text: "penundaan sementara izin pembukaan kawasan gambut wajar dipertimbangkan", category: "Opini/Rekomendasi", actions: ["Cek konteks", "Bandingkan data"], explanation: "Ini penilaian kebijakan. Uji kesesuaian rekomendasi dengan bukti yang disajikan." },
] as const;
// Teks simulasi Bab 5. Angka-angka di sini bukan laporan kondisi terkini.
export const editorialParagraphs = [
  ["Isu kebakaran hutan dan lahan kembali berdampak pada kualitas lingkungan dan aktivitas masyarakat di wilayah Sumatra dan Kalimantan. Berdasarkan laporan pemantauan data satelit Modis dan Terra/Aqua yang dirilis KLHK, ", 0, ". Tingginya jumlah titik panas ini menunjukkan bahwa metode pembersihan lahan secara manual masih belum dapat dihentikan sepenuhnya karena ", 1, "."],
  ["Kerja sama lintas instansi antara pemerintah pusat dan daerah ", 2, " dalam pengawasan izin pemanfaatan lahan konsesi. Di sisi lain, laporan BPBD Riau mencatat ", 3, ". ", 4, "."],
  ["Beberapa pengamat lingkungan berpendapat bahwa ", 5, ". ", 6, ". Dengan mempertimbangkan kondisi kering tersebut, ", 7, "."],
] as const;

export const practiceReasons = [
  { question: "Mengapa angka dalam sebuah kalimat tidak otomatis membuatnya valid?", guide: "Periksa sumber, metode, waktu, jumlah awal, dan konteks. Angka dapat salah dikutip atau tidak dapat ditelusuri." },
  { question: "Mengapa kutipan narasumber belum tentu merupakan fakta?", guide: "Kutipan bisa benar-benar diucapkan, tetapi isinya dapat berupa pendapat. Bedakan fakta pengucapan dengan kategori isi kutipan." },
  { question: "Apa perbedaan ‘fakta tentang prediksi’ dan ‘kepastian isi prediksi’?", guide: "Rilis prediksi dapat diperiksa keberadaannya. Peristiwa yang diprediksi belum tentu terjadi." },
  { question: "Mengapa sumber dan tahun data penting saat memeriksa artikel?", guide: "Identitas sumber memungkinkan penelusuran. Tahun menunjukkan apakah data sesuai dengan periode yang dibahas." },
];
export const hotsScenario = "Sebuah artikel menulis: ‘Penggunaan AI membuat kemampuan berpikir kritis siswa turun 60%.’ Artikel hanya menyebut ‘berdasarkan penelitian terbaru’ tanpa nama peneliti, jumlah responden, tahun, atau tautan sumber.";
export const hotsQuestions = ["Apakah kalimat tersebut dapat langsung dianggap fakta? Jelaskan.", "Informasi apa yang perlu dicari sebelum mempercayainya?", "Tuliskan tiga kata kunci pencarian yang efektif.", "Buat putusan redaksi sementara: layak terbit atau butuh revisi? Berikan alasan."];

export const evaluationQuestions = [
  { question: "Pernyataan yang paling tepat tentang fakta adalah ...", options: ["selalu berupa angka", "dapat diverifikasi melalui bukti/sumber", "harus berasal dari pendapat ahli", "selalu benar tanpa perlu dicek"], answer: 1, explanation: "Ciri fakta adalah dapat diverifikasi. Angka, pendapat ahli, atau kesan meyakinkan belum cukup menjamin validitas." },
  { question: "Kalimat ‘pemerintah sebaiknya menunda izin pembukaan lahan’ termasuk ...", options: ["fakta", "data statistik", "opini/rekomendasi", "kutipan ilmiah"], answer: 2, explanation: "Kata ‘sebaiknya’ menyatakan saran atau rekomendasi." },
  { question: "Langkah pertama saat memverifikasi klaim digital adalah ...", options: ["membagikan ke teman", "menentukan klaim spesifik yang akan dicek", "mencari komentar terbanyak", "memilih hasil pencarian teratas tanpa membaca"], answer: 1, explanation: "Isolasi klaim terlebih dahulu agar penelusuran bukti terarah." },
  { question: "Angka ‘naik 100%’ perlu dibaca bersama ...", options: ["warna grafik saja", "jumlah awal, periode, dan konteks", "judul artikel", "jumlah likes"], answer: 1, explanation: "Kenaikan dari 1 menjadi 2 juga 100%. Baca angka absolut dan konteksnya." },
  { question: "Kutipan seorang warga dalam artikel ...", options: ["pasti fakta", "pasti salah", "dapat menjadi fakta bahwa ia mengucapkannya, tetapi isi kutipan bisa opini", "tidak boleh dipakai"], answer: 2, explanation: "Bedakan fakta adanya ucapan dengan sifat isi pernyataan yang diucapkan." },
] as const;
export const essayQuestions = ["Jelaskan perbedaan fakta, opini, dan fakta yang belum terverifikasi.", "Mengapa hubungan sebab-akibat perlu diperiksa lebih ketat daripada sekadar dua peristiwa yang terjadi bersamaan?", "Tuliskan prosedur singkat untuk menilai keabsahan data dalam artikel ilmiah populer.", "Apa yang membuat sebuah artikel layak diterbitkan menurut sudut pandang tim editor?"];
export const reflectionItems = ["Saya dapat membedakan fakta dan opini.", "Saya dapat menjelaskan mengapa sebuah fakta tetap perlu diverifikasi.", "Saya dapat menyusun kata kunci pencarian untuk memeriksa klaim.", "Saya dapat membandingkan sumber digital.", "Saya dapat memberikan putusan kelayakan artikel disertai alasan."];
export const summary = ["Artikel ilmiah populer menyampaikan pengetahuan ilmiah dengan bahasa yang komunikatif.", "Fakta dapat diverifikasi; opini berupa penilaian, tafsiran, prediksi, atau rekomendasi.", "Angka, nama lembaga, dan istilah ilmiah tidak otomatis membuat sebuah klaim valid.", "Keabsahan data diperiksa melalui sumber, waktu, konteks, metode, dan konfirmasi sumber lain.", "Editor yang baik menilai kualitas bukti dan logika sebelum memutuskan kelayakan artikel."];
export const glossary = [
  { term: "Artikel ilmiah populer", definition: "Tulisan berbasis pengetahuan ilmiah yang disajikan untuk pembaca umum." },
  { term: "Fakta", definition: "Informasi yang dapat diverifikasi melalui bukti atau sumber." },
  { term: "Opini", definition: "Pendapat, penilaian, dugaan, prediksi, atau rekomendasi." },
  { term: "Klaim", definition: "Pernyataan yang diajukan sebagai sesuatu yang dianggap benar." },
  { term: "Verifikasi", definition: "Proses memeriksa kebenaran atau keabsahan informasi." },
  { term: "Sumber primer", definition: "Sumber asli tempat data atau pernyataan pertama kali diterbitkan." },
  { term: "Korelasi", definition: "Hubungan atau keterkaitan antara dua variabel." },
  { term: "Kausalitas", definition: "Hubungan sebab-akibat." },
  { term: "ISPU", definition: "Indeks Standar Pencemar Udara." },
  { term: "Hotspot", definition: "Titik panas yang terdeteksi melalui pengamatan tertentu dan dapat digunakan sebagai indikator awal potensi kebakaran." },
];

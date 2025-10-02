import { useEffect, useRef, useState } from 'react';
import { Heart, Music, MessageCircle, Sparkles, Gift } from 'lucide-react';
// Import gambar lokal (pastikan file ada di src/assets/images)
import via1 from './assets/images/via1.jpg';
import via2 from './assets/images/via2.jpg';
import via3 from './assets/images/via3.jpg';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    // Create confetti on load
    createConfetti();
    // Create floating hearts
    const heartInterval = setInterval(createFloatingHeart, 2000);
    return () => clearInterval(heartInterval);
  }, []);

  const createConfetti = () => {
    const colors = ['#FFB6C1', '#DDA0DD', '#FFC0CB', '#E6E6FA', '#FFE4E1'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
      }, i * 50);
    }
  };

  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = '6283837949882'; // ganti nomor sesuai kebutuhan
    const message = `Wow terima kasih sayang 🥰\n\nAku bener-bener terharu sama semua yang kamu siapin ini. Setiap detailnya kerasa penuh perhatian dan cinta – dari tulisan yang panjang, suasana warna lembut, sampai musik yang nemenin. Rasanya hangat banget dan aku nggak bisa berhenti senyum. Kamu selalu punya cara unik bikin aku ngerasa dihargai, dipilih, dan dijaga.\n\nAku bersyukur banget bisa jalanin semua hari sama kamu. Makasih karena kamu tetap sabar di saat aku lagi nggak sempurna, makasih sudah percaya sama kita bahkan waktu keadaan nggak gampang. Kamu itu rumah paling nyaman buat pulang.\n\nPeluk erat dari sini ya 🤍 Aku sayang kamu lebih dari apa yang bisa aku tulis atau jelasin. Kita terus bareng ya, hari ini, besok, dan seterusnya.\n\n(aku balas ini sambil senyum lebar) 🤍`;    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Cari file audio lokal pertama jika ada
  const localAudio = (() => {
    try {
  const modules = import.meta.glob('./assets/audio/*.mp3', { eager: true }) as Record<string, { default: string } | string>;
      const first = Object.values(modules)[0];
      if (first) {
        // Vite eager import hasilkan object { default: url } atau langsung url
        return typeof first === 'string' ? first : first.default;
      }
    } catch (e) {
      console.warn('Audio glob error', e);
    }
    return undefined;
  })();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-white -z-10"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-pink-100 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
            <h2 className="text-xl md:text-2xl font-script text-pink-600 font-bold">
              Happy Birthday
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            <span className="text-sm md:text-base text-gray-600 font-medium">
              Hari Spesialmu
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl text-pink-600 mb-6 font-script animate-fade-in">
          Selamat Ulang Tahun Sayang 🤍
        </h1>
        <p className="text-lg md:text-xl text-gray-600 animate-fade-in-delay italic max-w-2xl">
          Sebuah ucapan dari hati untukmu di hari spesial ini.
        </p>
      </section>

      {/* Gallery Section with Flip Cards */}
  <section className="max-w-7xl mx-auto px-4 py-16 mb-36 overflow-visible">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-script text-pink-600 mb-3">Galeri Kenangan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Beberapa potongan momen yang selalu bikin aku bersyukur punya kamu. Klik setiap kartu untuk membaca pesan yang tersembunyi di baliknya.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="flip-card animate-slide-up" onClick={() => toggleFlip(0)}>
            <div className={`flip-card-inner ${flippedCards[0] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <img
                  src={via1}
                  alt="Birthday balloons"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  loading="lazy"
                />
                <div className="flip-hint">
                  <Heart className="w-5 h-5 text-white fill-white" />
                  <span>Klik untuk pesan</span>
                </div>
              </div>
              <div className="flip-card-back glass-effect p-6 rounded-2xl border border-pink-200 flex items-center justify-center text-center">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic max-h-full overflow-y-auto no-scrollbar">
                  Kamu adalah jawaban dari semua doa yang nggak pernah aku ucapkan dengan kata-kata, tapi selalu aku rasakan di dalam hati. Setiap detik bersamamu adalah hadiah yang nggak ternilai harganya, dan aku bersyukur banget bisa jadi bagian dari hidupmu. Aku ingin kamu tau, bahwa kehadiranmu dalam hidupku bukan sekadar kebetulan, tapi adalah takdir terindah yang pernah aku terima.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flip-card animate-slide-up" style={{ animationDelay: '0.2s' }} onClick={() => toggleFlip(1)}>
            <div className={`flip-card-inner ${flippedCards[1] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <img
                  src={via2}
                  alt="Birthday cake"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  loading="lazy"
                />
                <div className="flip-hint">
                  <Heart className="w-5 h-5 text-white fill-white" />
                  <span>Klik untuk pesan</span>
                </div>
              </div>
              <div className="flip-card-back glass-effect p-6 rounded-2xl border border-pink-200 flex items-center justify-center text-center">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic max-h-full overflow-y-auto no-scrollbar">
                  Setiap kali aku liat senyummu, rasanya dunia berhenti sejenak dan yang ada cuma kamu di hadapanku. Kamu punya cara tersendiri buat bikin hari-hari biasa jadi luar biasa, bikin momen sederhana jadi kenangan yang nggak terlupakan. Aku nggak butuh tempat mewah atau hal-hal mahal buat bahagia, karena cukup dengan ada kamu di sisiku, itu udah lebih dari cukup.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flip-card animate-slide-up" style={{ animationDelay: '0.4s' }} onClick={() => toggleFlip(2)}>
            <div className={`flip-card-inner ${flippedCards[2] ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <img
                  src={via3}
                  alt="Roses"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  loading="lazy"
                />
                <div className="flip-hint">
                  <Heart className="w-5 h-5 text-white fill-white" />
                  <span>Klik untuk pesan</span>
                </div>
              </div>
              <div className="flip-card-back glass-effect p-6 rounded-2xl border border-pink-200 flex items-center justify-center text-center">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic max-h-full overflow-y-auto no-scrollbar">
                  Aku tahu kita nggak sempurna, dan hubungan kita pun jauh dari kata sempurna, tapi justru itulah yang bikin semuanya terasa nyata dan berharga. Kita belajar dari setiap kesalahan, kita tumbuh dari setiap pertengkaran, dan kita jadi lebih kuat dari setiap ujian yang kita hadapi bersama. Aku nggak pernah berharap hubungan yang sempurna, karena yang aku cari adalah seseorang yang mau berjuang bersamaku, dan itu adalah kamu.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Message Section */}
  <section className="max-w-4xl mx-auto px-4 py-16 mt-0">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-script text-pink-600 mb-3">Untuk Kamu</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Ini semua adalah kata-kata yang mungkin nggak sempat selalu aku ucapin langsung. Bacalah pelan-pelan, setiap kalimatnya untuk kamu.
          </p>
        </div>
        <div className="message-card glass-effect p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/40 border border-pink-200 animate-fade-in">
          <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
              <p>
                Happy birthday ya sayang 🤍. Hari ini bener-bener spesial banget buat aku, karena ini hari di mana orang yang paling aku sayang lahir ke dunia. Aku nggak bisa ngebayangin gimana kalau aku nggak pernah ketemu sama kamu, pasti hidupku hambar banget, nggak ada warna, nggak ada arah, dan nggak ada alasan buat bahagia kayak sekarang. Kamu tuh kayak hadiah yang Tuhan kasih tanpa aku minta, tapi ternyata jadi bagian terpenting dalam hidupku. Aku bersyukur banget bisa kenal sama kamu, bisa deket sama kamu, dan bisa nyebut kamu sebagai orang yang paling aku sayang. Ulang tahunmu buatku bukan cuma soal nambah umur, tapi pengingat kalau aku makin lama makin jatuh cinta sama kamu. Aku juga ngerasa kayak hari ini bukan cuma hari ulang tahunmu, tapi juga hari syukur buatku karena aku punya kamu. Aku pengen kamu tau, nggak ada satu pun hal yang bikin aku ragu sama kamu. Dan hari ini aku cuma mau bilang: makasih udah lahir, makasih udah jadi kamu, dan makasih karena udah bikin aku sebahagia ini.
              </p>
              <p>
                Aku tau mungkin kamu nganggap ulang tahun itu cuma hari biasa, sekadar tanggal di kalender yang berubah, tapi buat aku itu jauh lebih dari itu. Ulang tahunmu adalah hari yang aku tunggu, karena aku punya alasan buat nulis sepanjang ini, buat ngomongin betapa berharganya kamu, dan buat bikin kamu inget kalau kamu dicintai. Kamu tuh rumah buat aku, tempat aku pulang kalau lagi capek, tempat aku cerita tanpa takut dihakimi, tempat aku nemuin tenang walau dunia lagi ribut. Aku kadang suka mikir, kok bisa ya ada orang kayak kamu yang sesabar itu, setulus itu, dan secinta itu sama aku. Aku nggak pernah nyangka bisa seberuntung ini punya kamu. Kalau aku lagi sedih, cukup bayangin senyum kamu aja udah bikin hati aku adem. Kalau aku lagi bete, cukup kamu ngomong hal receh aja bisa bikin aku ketawa lagi. Kamu itu obatnya semua resahku, dan aku pengen kamu tau, aku sayang banget sama kamu, lebih dari apa pun.
              </p>
              <p>
                Aku nggak bilang hubungan kita sempurna, malah jauh dari kata sempurna. Kita pernah ribut, pernah salah paham, bahkan pernah saling nyakitin tanpa sadar. Tapi justru itu yang bikin aku makin yakin sama kita, karena kita nggak pernah nyerah buat balik lagi ke satu sama lain. Kamu tuh bikin aku ngerti kalau cinta bukan cuma soal momen indah, tapi juga tentang bertahan, belajar sabar, dan tetep milih meski keadaan nggak gampang. Setiap kali kita ribut, aku selalu takut kehilangan kamu, tapi aku juga sadar kalau perbedaan itu bikin kita makin ngerti satu sama lain. Aku seneng banget kita bisa terus bertahan, bisa terus ketawa lagi setelah nangis, bisa terus gandeng tangan meskipun sempet ngelepas sebentar. Aku nggak pernah nyesel jatuh cinta sama kamu, bahkan kalau aku dikasih kesempatan buat ngulang hidup, aku tetep bakal milih kamu. Kamu adalah pilihanku, dan bakal terus jadi pilihanku sampai kapan pun.
              </p>
              <p>
                Di usiamu yang baru ini, aku punya banyak doa buat kamu. Aku berdoa semoga kamu selalu sehat, karena aku nggak mau liat kamu sakit atau capek sendirian. Aku berdoa semoga semua mimpi kamu satu per satu bisa tercapai, sekecil apa pun itu, karena aku tau kamu pantas dapet semua yang terbaik. Aku juga berdoa semoga hatimu selalu bahagia, nggak banyak beban, dan nggak sering ngerasa sendiri. Aku pengen kamu jalanin hari-harimu dengan senyum, bukan dengan air mata. Kamu punya banyak potensi, banyak hal yang luar biasa, dan aku nggak sabar buat liat kamu jadi versi terbaik dari dirimu. Aku yakin banget kamu bisa ngelewatin semua rintangan, bahkan yang paling berat sekalipun. Jangan pernah ragu sama dirimu, karena aku ada di sini buat percaya sama kamu. Dan aku janji bakal terus ada di sisimu, apapun yang terjadi.
              </p>
              <p>
                Tapi sayang, aku juga mau kamu inget satu hal penting: jangan terlalu keras sama dirimu sendiri. Aku sering liat kamu maksa diri buat kuat, padahal aku tau di dalam hati kamu capek banget. Kamu nggak perlu jadi sempurna buat aku, nggak perlu pura-pura bahagia kalau sebenernya lagi sedih. Kamu boleh nangis, boleh cerita panjang, boleh curhat apa aja sama aku, karena aku bakal selalu dengerin. Aku nggak peduli kekuranganmu, karena justru itu yang bikin kamu nyata dan bikin aku jatuh cinta lagi setiap hari. Aku mau kamu belajar sayang sama dirimu, kayak aku yang sayang banget sama kamu. Kamu berharga, kamu cukup, kamu layak dicintai tanpa harus jadi orang lain. Dan aku akan selalu ingetin itu ke kamu, biar kamu nggak pernah lupa betapa berharganya dirimu.
              </p>
              <p>
                Aku nggak tau gimana cara yang pas buat bilang terima kasih ke kamu, karena rasanya kata "makasih" aja nggak cukup. Makasih karena kamu selalu ada buat aku, bahkan di saat aku sendiri susah ngehargain diriku. Makasih karena kamu selalu sabar sama semua sikapku, bahkan yang kadang ngeselin. Makasih karena kamu bisa bikin aku ketawa di hari paling burukku, dan makasih karena kamu bisa bikin aku ngerasa aman cuma dengan ngomong "nggak papa, aku ada di sini". Semua hal kecil yang kamu lakuin itu punya arti besar banget buatku. Kamu mungkin nggak sadar, tapi kamu adalah alasan kenapa aku masih kuat sampai sekarang. Aku nggak akan pernah bisa ngebales semua kebaikanmu, tapi aku janji bakal berusaha bikin kamu bahagia dengan caraku.
              </p>
              <p>
                Aku pengen ulang tahunmu kali ini jadi awal dari banyak hal indah yang bakal datang ke hidupmu. Aku pengen kamu punya banyak alasan buat senyum, banyak momen buat ketawa, dan banyak kesempatan buat dapet kebahagiaan. Aku tau hidup kadang nggak gampang, tapi aku nggak mau kamu pernah ngerasa sendirian. Aku bakal selalu ada buat nemenin kamu, buat jagain kamu, buat dengerin kamu, dan buat dukung semua langkahmu. Aku nggak janji semua akan mulus, tapi aku janji kamu nggak akan pernah jalan sendirian. Aku mau jadi orang yang selalu kamu inget pertama kali waktu kamu bahagia, dan orang yang selalu kamu cari pertama kali waktu kamu lagi sedih. Karena aku pengen jadi bagian dari semua ceritamu, entah itu indah atau nggak.
              </p>
              <p>
                Aku juga pengen kita bikin lebih banyak kenangan bareng tahun ini. Aku nggak butuh hal-hal besar, karena buat aku, momen sederhana bareng kamu aja udah cukup bikin aku bahagia. Jalan bareng sambil ngobrol receh, nonton film sampai ketiduran, atau sekadar tukeran chat panjang sampai lupa waktu, itu semua priceless banget buat aku. Aku pengen pas kita liat ke belakang nanti, kita bisa senyum bareng sambil bilang "kita udah sejauh ini ya, udah banyak banget cerita yang kita punya". Aku nggak sabar buat nambahin lagi momen-momen kecil bareng kamu, yang suatu hari bakal jadi kenangan paling berharga dalam hidupku. Kamu adalah bagian dari semua cerita itu, dan aku nggak mau ada yang lain selain kamu.
              </p>
              <p>
                Sayang, aku tau kata-kataku panjang banget, mungkin keliatan lebay, tapi ini semua jujur dari hati. Aku nulis ini bukan buat keliatan manis, tapi karena aku bener-bener ngerasain semuanya. Aku nggak tau cara lain buat ngungkapin selain dengan kata-kata kayak gini. Aku cuma pengen kamu tau, kamu itu berharga banget buatku. Kamu adalah alasanku bertahan, alasanku semangat, dan alasanku percaya kalau masa depan bisa indah. Aku nggak tau apa aku pantes dapetin kamu, tapi aku janji bakal jagain kamu sebisa aku. Kamu itu orang paling penting buatku, dan aku nggak akan pernah capek bilang aku sayang sama kamu.
              </p>
              <p>
                Jadi sekali lagi, happy birthday sayangku cantik 🤍. Aku berharap tahun ini jadi tahun paling indah buatmu, penuh kebahagiaan, penuh doa baik yang terkabul, dan penuh alasan buat tersenyum. Aku ingin kamu selalu sehat, selalu bahagia, dan selalu punya aku di sampingmu. Aku sayang banget sama kamu, lebih dari yang bisa aku tulis, lebih dari yang bisa aku jelasin, lebih dari yang bisa kamu bayangin. Aku janji bakal terus ada, nemenin kamu, jagain kamu, dan dukung kamu di setiap langkahmu. Jangan pernah ragu sama perasaanku, karena aku nggak pernah main-main sama hati ini. Kamu adalah satu-satunya orang yang akan selalu aku pilih, hari ini, besok, dan selamanya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleMusic}
          className="music-player bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3"
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="hidden md:block text-sm font-medium">
            {isPlaying ? 'Pause Lagu 🎶' : 'Putar Lagu Romantis 🎶'}
          </span>
        </button>
        <audio ref={audioRef} loop>
          <source src={localAudio || 'assets/audio/lagu.mp3'} type="audio/mpeg" />
          Browser kamu tidak mendukung tag audio.
        </audio>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-slow flex flex-col items-center gap-2 max-w-[180px]"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="text-xs md:text-sm font-medium text-center leading-tight">
          Apakah kamu suka? Tekan aku ya 💌
        </span>
      </button>

      {/* Footer */}
      <footer className="glass-effect border-t border-pink-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
                <h3 className="text-lg font-script text-pink-600 font-bold">
                  Untuk Sayangku
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Setiap hari bersamamu adalah hadiah terindah dalam hidupku
              </p>
            </div>

            {/* Center Section */}
            <div className="text-center">
              <p className="text-gray-500 italic text-sm md:text-base mb-2">
                Dibuat khusus untukmu, dari aku yang selalu sayang sama kamu 🤍
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-500">2025 - Hari Spesialmu</span>
                <Sparkles className="w-4 h-4 text-pink-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 mb-2">
                Dengan sepenuh hati
              </p>
              <p className="text-base font-medium text-pink-600">
                Dari aku, untuk kamu
              </p>
              <div className="flex items-center justify-center md:justify-end gap-1 mt-2">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <Heart className="w-4 h-4 text-pink-600 fill-pink-600" />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-pink-100 pt-6 text-center">
            <p className="text-xs text-gray-500">
              Semoga hari ini dan selamanya dipenuhi dengan kebahagiaan, cinta, dan kenangan indah
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

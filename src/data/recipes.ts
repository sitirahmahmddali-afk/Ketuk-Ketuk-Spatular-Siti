import rendangImg from '../assets/images/rendang_daging_tok_1790908323016.jpg';
import masakLemakImg from '../assets/images/masak_lemak_cili_padi_1790908333391.jpg';
import kuihSeriMukaImg from '../assets/images/kuih_seri_muka_pandan_1790908345959.jpg';
import kitchenHeroImg from '../assets/images/hero_mama_siti_kitchen_1790908309572.jpg';

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerMinutes?: number;
  petua?: string;
  actionSfx?: 'spatula' | 'sizzle' | 'mortar' | 'chime';
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Lauk Kenduri' | 'Masakan Berkuah' | 'Sambal & Goreng' | 'Nasi & Sarapan' | 'Kuih Muih' | 'Minuman Segar';
  image: string;
  timeMinutes: number;
  servings: number;
  difficulty: 'Mudah' | 'Sederhana' | 'Istimewa';
  spiceLevel: 'Tidak Pedas' | 'Pedas Manja' | 'Pedas Sedang' | 'Pedas Berapi';
  pantun: string[];
  iramaTitle: string;
  iramaRentak: string;
  petuaMamaSiti: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags: string[];
}

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'rendang-daging-tok-warisan',
    title: 'Rendang Daging Tok Warisan',
    subtitle: 'Rendang gelap berkilat rempah ratus asli Perak dengan kerisik kelapa wangi',
    category: 'Lauk Kenduri',
    image: rendangImg,
    timeMinutes: 120,
    servings: 6,
    difficulty: 'Istimewa',
    spiceLevel: 'Pedas Sedang',
    pantun: [
      'Ketuk kuali berbunyi nyaring,',
      'Gulai kawah masak sekata;',
      'Rempah ditumis kelapa digaring,',
      'Rendang Tok siap santapan jelita.'
    ],
    iramaTitle: 'Joget Ketuk Spatula',
    iramaRentak: 'Rentak Joget 6/8 - Kacau tenang bila santan mula memekat',
    petuaMamaSiti: 'Anakanda, petua rendang tahan lama dan berkilat elok: garingkan kerisik sampai naik minyak gelap, dan gunakan spatula kayu mengacau dari tepi kuali ke tengah membentuk nombor 8!',
    ingredients: [
      { name: 'Daging Batang Pinang (dipotong kiub tebal)', amount: 1, unit: 'kg' },
      { name: 'Santan Pekat Segar', amount: 500, unit: 'ml' },
      { name: 'Santan Cair', amount: 300, unit: 'ml' },
      { name: 'Kerisik Kelapa Sangai Wangi', amount: 4, unit: 'sudu besar' },
      { name: 'Gula Melaka Asli', amount: 2, unit: 'keping' },
      { name: 'Asam Keping Gelugur', amount: 2, unit: 'keping' },
      { name: 'Daun Kunyit (dihiris halus bak rambut)', amount: 2, unit: 'helai' },
      { name: 'Serai (dititik)', amount: 4, unit: 'batang' },
      { name: 'Bawang Merah Kecil (kisar)', amount: 15, unit: 'biji' },
      { name: 'Bawang Putih (kisar)', amount: 6, unit: 'ulas' },
      { name: 'Cili Kering Rebus (kisar)', amount: 20, unit: 'tangkai' },
      { name: 'Halia Tua (kisar)', amount: 2, unit: 'inci' },
      { name: 'Lengkuas Segar (kisar)', amount: 2, unit: 'inci' },
      { name: 'Jintan Manis & Jintan Putih (sangai & kisar)', amount: 1.5, unit: 'sudu besar' },
      { name: 'Garam Kasar Bukit', amount: 1.5, unit: 'sudu teh' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Menumis Rempah Kisar & Serai',
        instruction: 'Panaskan kuali tembaga atau non-stick. Masukkan minyak secukupnya, tumis bahan kisar bersama serai titik hingga naik bau harum dan pecah minyak.',
        timerMinutes: 10,
        petua: 'Gunakan api sederhana perlahan, jangan gopoh anakanda. Biar cili betul-betul masak.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 2,
        title: 'Memasukkan Daging & Air Daging Meresap',
        instruction: 'Masukkan ketulan daging. Gaul sebati bersama pes rempah tumis. Biarkan air daging keluar dan meresap bersama rempah hingga agak kering.',
        timerMinutes: 15,
        petua: 'Ketuk perlahan spatula pada kuali untuk pastikan daging tidak melekat di dasar kuali.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 3,
        title: 'Tuangkan Santan & Masak Perlahan',
        instruction: 'Tuangkan santan cair dan santan pekat. Masukkan asam keping dan garam bukit. Kacau perlahan-lahan supaya santan tidak berketul.',
        timerMinutes: 45,
        petua: 'Kacau secara berkala. Lagu "Dondang Sayang di Dapur" sangat padan dinyanyikan di fasa ini!',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 4,
        title: 'Kerisik, Gula Melaka & Karamelisasi Gelap',
        instruction: 'Bila kuah mula pekat dan warna bertukar perang, masukkan kerisik wangi dan gula melaka. Reneh dengan api kecil hingga rendang kering berkilat dan bertukar warna gelap menawan.',
        timerMinutes: 30,
        petua: 'Ini dia rahsia Rendang Tok! Gula melaka dan kerisik akan memberikan warna hitam manis berkilau.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 5,
        title: 'Taburan Daun Kunyit Penutup Bicara',
        instruction: 'Taburkan hirisan daun kunyit segar. Kacau seminit dan tutup api. Hidangkan bersama lemang panas atau ketupat palas.',
        timerMinutes: 2,
        petua: 'Biarkan rendang rehat 20 minit sebelum dihidang supaya minyak berpisah cantik.',
        actionSfx: 'chime'
      }
    ],
    tags: ['Daging', 'Rendang', 'Kenduri', 'Warisan', 'Perak', 'Hari Raya']
  },
  {
    id: 'masak-lemak-cili-padi-udang-nenas',
    title: 'Masak Lemak Cili Padi Udang Galah & Nenas',
    subtitle: 'Kuah santan kuning pekat berkilat dengan paduan masam manis nenas dan udang segar',
    category: 'Masakan Berkuah',
    image: masakLemakImg,
    timeMinutes: 35,
    servings: 4,
    difficulty: 'Mudah',
    spiceLevel: 'Pedas Berapi',
    pantun: [
      'Kuning kunyit harum berseri,',
      'Cili padi membakar lidah;',
      'Udang galah lauk kenduri,',
      'Kacau kuah bertambah mudah.'
    ],
    iramaTitle: 'Inang Santan & Serai',
    iramaRentak: 'Rentak Inang Lemah Gemalai - Jangan tinggal kuali, timang kuah sentiasa',
    petuaMamaSiti: 'Masak lemak Negeri Sembilan pantang sekali bawang putih anakanda! Tumbuk kunyit hidup dengan cili padi guna lesung batu. Dan ingat, masukkan santan dari awal, jangan biar mendidih mengejut!',
    ingredients: [
      { name: 'Udang Galah Segar (dibersihkan belah belakang)', amount: 600, unit: 'g' },
      { name: 'Nenas Manis (dipotong kipas sederhana)', amount: 0.5, unit: 'biji' },
      { name: 'Santan Pekat Perahan Pertama', amount: 400, unit: 'ml' },
      { name: 'Air / Santan Cair', amount: 300, unit: 'ml' },
      { name: 'Cili Padi Kampung Merah & Hijau', amount: 25, unit: 'biji' },
      { name: 'Kunyit Hidup Segar', amount: 2, unit: 'inci' },
      { name: 'Serai (diketuk lebam)', amount: 3, unit: 'batang' },
      { name: 'Asam Keping (jika nenas kurang masam)', amount: 1, unit: 'keping' },
      { name: 'Daun Kunyit (disiat kasar)', amount: 1, unit: 'helai' },
      { name: 'Garam Kasar secukup rasa', amount: 1.5, unit: 'sudu teh' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tumbuk Kunyit & Cili Padi',
        instruction: 'Tumbuk cili padi bersama kunyit hidup dan sedikit garam kasar di dalam lesung batu hingga separa lumat. Aroma kunyit segar jangan disia-siakan!',
        timerMinutes: 5,
        petua: 'Lesung batu menghasilkan pes berjus berbanding pengisar elektrik.',
        actionSfx: 'mortar'
      },
      {
        stepNumber: 2,
        title: 'Rebus Nenas Bersama Bahan Tumbuk & Serai',
        instruction: 'Masukkan bahan tumbuk, nenas potong, serai ketuk, dan sedikit air ke dalam periuk. Masak sekejap hingga nenas sedikit layu dan mengeluarkan jus manisnya.',
        timerMinutes: 8,
        petua: 'Ini petua Mama Siti agar jus nenas bersatu padu dengan kepedasan cili padi.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 3,
        title: 'Tuang Santan & Timang Kuah',
        instruction: 'Tuang santan pekat. Pasang api sederhana. Kacau kuah tanpa henti dengan spatula secara perlahan-lahan dari bawah ke atas agar santan tidak pecah minyak (berkepala).',
        timerMinutes: 12,
        petua: 'Alunkan lagu Inang Santan sambil mengacau, santan suka dilayan dengan penuh kasih sayang!',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 4,
        title: 'Masukkan Udang Galah & Daun Kunyit',
        instruction: 'Bila kuah sudah mendidih mesra, masukkan udang galah dan daun kunyit siat. Biarkan udang bertukar warna jingga kemerahan selama 4-5 minit sahaja.',
        timerMinutes: 5,
        petua: 'Jangan terlebih masak udang anakanda, nanti isinya keras dan manisnya hilang.',
        actionSfx: 'chime'
      }
    ],
    tags: ['Udang', 'Masak Lemak', 'Negeri Sembilan', 'Cili Padi', 'Kuah Santan', 'Nenas']
  },
  {
    id: 'kuih-seri-muka-pandan-asli',
    title: 'Kuih Seri Muka Pandan Asli',
    subtitle: 'Lapisan hijau kastard pandan licin berkaca di atas pulut lemak bersantan',
    category: 'Kuih Muih',
    image: kuihSeriMukaImg,
    timeMinutes: 50,
    servings: 8,
    difficulty: 'Sederhana',
    spiceLevel: 'Tidak Pedas',
    pantun: [
      'Pandan wangi daun semerbak,',
      'Pulut ditanak santan kelapa;',
      'Kuih seri muka manis berlemak,',
      'Sekali rasa tak lupa-lupa.'
    ],
    iramaTitle: 'Dondang Sayang di Dapur',
    iramaRentak: 'Rentak Lembut Mendayu - Sesuai dinikmati waktu petang bersama secawan kopi o',
    petuaMamaSiti: 'Bila mengukus lapisan hijau atas, lapik penutup periuk kukus dengan kain tuala bersih! Titisan air wap kalau jatuh atas kastard akan buat kuih berlubang-lubang dan hilang seri mukanya!',
    ingredients: [
      { name: 'Beras Pulut Susu (rendam 2 jam)', amount: 300, unit: 'g' },
      { name: 'Santan Sederhana Pekat (lapisan bawah)', amount: 250, unit: 'ml' },
      { name: 'Garam Halus', amount: 1, unit: 'sudu teh' },
      { name: 'Air Jus Daun Pandan Asli (dari 8 helai daun)', amount: 100, unit: 'ml' },
      { name: 'Santan Pekat (lapisan atas)', amount: 300, unit: 'ml' },
      { name: 'Telur Ayam Gred A', amount: 2, unit: 'biji' },
      { name: 'Tepung Gandum', amount: 80, unit: 'g' },
      { name: 'Tepung Ubi Kayu (untuk kilat)', amount: 2, unit: 'sudu besar' },
      { name: 'Gula Pasir', amount: 120, unit: 'g' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Kukus Lapisan Pulut',
        instruction: 'Toskan pulut. Masukkan ke dalam loyang beralas daun pisang. Gaulkan dengan santan dan garam. Kukus api sederhana selama 20 minit.',
        timerMinutes: 20,
        petua: 'Pulut susu menghasilkan tekstur yang lebih lembut dan melekat elok.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 2,
        title: 'Mampatkan Pulut Panas',
        instruction: 'Keluarkan loyang pulut yang masak. Tekan dan padatkan permukaan pulut menggunakan penekan plastik atau daun pisang hingga betul-betul rata dan padat.',
        timerMinutes: 5,
        petua: 'Mesti tekan padat anakanda, kalau longgar nanti adunan hijau akan meresap ke dasar.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 3,
        title: 'Bancuh Lapisan Hijau Pandan',
        instruction: 'Satukan jus pandan, santan pekat, telur, tepung gandum, tepung ubi dan gula. Tapis adunan 2 kali agar tiada ketulan tepung.',
        timerMinutes: 5,
        petua: 'Masak adunan sekejap atas api sangat kecil (kaedah suam-suam kuku) selama 2 minit sambil dikacau sebelum dituang ke atas pulut.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 4,
        title: 'Kukus Lapisan Kastard Pandan',
        instruction: 'Tuang adunan hijau perlahan-lahan ke atas pulut. Tutup periuk kukus dengan penutup berbalut kain. Kukus dengan api kecil selama 25 minit.',
        timerMinutes: 25,
        petua: 'Gunakan api kecil sahaja! Api kuat akan menyebabkan permukaan kuih menggelembung.',
        actionSfx: 'chime'
      }
    ],
    tags: ['Kuih Tradisional', 'Pandan', 'Pulut', 'Minum Petang', 'Manisan Warisan']
  },
  {
    id: 'ayam-masak-merah-kenduri',
    title: 'Ayam Masak Merah Kenduri Kahwin',
    subtitle: 'Ayam bersalut rempah madu tumis wangi dengan sos tomato pekat dan kacang pis',
    category: 'Lauk Kenduri',
    image: kitchenHeroImg,
    timeMinutes: 45,
    servings: 5,
    difficulty: 'Mudah',
    spiceLevel: 'Pedas Manja',
    pantun: [
      'Merah menyala kuah berempah,',
      'Ayam digoreng garing di kuali;',
      'Nasi minyak hidang berlimpah,',
      'Lauk kenduri pikat di hati.'
    ],
    iramaTitle: 'Rentak Kenduri Beraya',
    iramaRentak: 'Rentak Zapin Masakan - Riuh rendah semangat dapur kenduri',
    petuaMamaSiti: 'Goreng ayam separa masak sahaja (3/4 masak), jangan sampai kering kontang. Bila direneh dalam kuah merah, jus ayam akan meresap dan buat ayam kekal lembut bersari!',
    ingredients: [
      { name: 'Ayam Segar (dipotong sederhana)', amount: 1, unit: 'ekor' },
      { name: 'Serbuk Kunyit & Garam (perap ayam)', amount: 1, unit: 'sudu besar' },
      { name: 'Cili Kering Kisar (pedas sederhana)', amount: 6, unit: 'sudu besar' },
      { name: 'Sos Tomato Berkualiti', amount: 4, unit: 'sudu besar' },
      { name: 'Sos Cili Manis', amount: 2, unit: 'sudu besar' },
      { name: 'Susu Cair / Susu Sejat', amount: 100, unit: 'ml' },
      { name: 'Bawang Besar Holand (dihiris bulat)', amount: 2, unit: 'biji' },
      { name: 'Kulit Kayu Manis, Bunga Lawang, Pelaga', amount: 1, unit: 'set' },
      { name: 'Kacang Pis Hijau Segar', amount: 0.5, unit: 'cawan' },
      { name: 'Madu Lebah Asli / Gula Merah', amount: 1.5, unit: 'sudu besar' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Perap & Goreng Ayam Emas',
        instruction: 'Gaul ayam bersama kunyit dan garam. Goreng dalam minyak panas sederhana hingga berkulit keemasan tapi masih basah di dalam. Angkat dan toskan.',
        timerMinutes: 12,
        petua: 'Minyak bekas goreng ayam boleh guna 2 senduk untuk menumis kuah merah agar aromanya lebih kaw!',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 2,
        title: 'Menumis 3 Sekawan & Bahan Kisar',
        instruction: 'Tumis kayu manis, bunga lawang dan pelaga. Masukkan bawang merah, bawang putih dan halia kisar hingga wangi. Masukkan cili kisar dan masak sampai pecah minyak cantik.',
        timerMinutes: 10,
        petua: 'Ketuk spatula dua kali ke bibir kuali tanda kuah mula mesra!',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 3,
        title: 'Sebatikan Sos, Susu Cair & Madu',
        instruction: 'Masukkan sos tomato, sos cili, madu, dan susu cair. Kacau sebati hingga kuah bertukar warna merah baldu yang berkilau.',
        timerMinutes: 6,
        petua: 'Susu cair melembutkan rasa pedas cili dan memberi kilatan mewah persis lauk catering kenduri.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 4,
        title: 'Reneh Ayam Bersama Bawang & Pis',
        instruction: 'Masukkan ayam goreng tadi bersama gelung bawang besar dan kacang pis. Gaul rata selama 6-8 minit hingga kuah pekat menyaluti ayam.',
        timerMinutes: 8,
        petua: 'Bawang besar jangan layu sangat, biar ada rasa rangup manis.',
        actionSfx: 'chime'
      }
    ],
    tags: ['Ayam', 'Kenduri', 'Lauk Pengantin', 'Nasi Minyak', 'Sambal Merah']
  },
  {
    id: 'sambal-sotong-kering-petai',
    title: 'Sambal Sotong Kering Petai Merecik',
    subtitle: 'Sambal tumis cili giling legam dengan sotong kembang kenyal dan biji petai segar',
    category: 'Sambal & Goreng',
    image: kitchenHeroImg,
    timeMinutes: 40,
    servings: 4,
    difficulty: 'Sederhana',
    spiceLevel: 'Pedas Berapi',
    pantun: [
      'Petai seulas kutip di rimba,',
      'Sotong kering rendam berjam;',
      'Ketuk spatula sambal pun tiba,',
      'Makan sepinggan terus bertalam.'
    ],
    iramaTitle: 'Joget Ketuk Spatula',
    iramaRentak: 'Rentak Cepat Bersemangat - Api kecil tapi hati girang',
    petuaMamaSiti: 'Rendam sotong kering bersama abu batang pisang atau sedikit soda bikarbonat semalaman agar lembut elok tapi masih ada kekenyalan gigitan "chewy" istimewa!',
    ingredients: [
      { name: 'Sotong Kembang / Rendam (dihiris gelang)', amount: 400, unit: 'g' },
      { name: 'Biji Petai Papan Segar', amount: 2, unit: 'papan' },
      { name: 'Cili Kering Pedas (dikisar)', amount: 15, unit: 'tangkai' },
      { name: 'Cili Kering Kerinting (untuk warna gelap)', amount: 10, unit: 'tangkai' },
      { name: 'Bawang Besar India (kisar)', amount: 3, unit: 'biji' },
      { name: 'Belacan Bakar Wangi', amount: 1, unit: 'inci' },
      { name: 'Air Asam Jawa Pekat', amount: 3, unit: 'sudu besar' },
      { name: 'Gula Melaka Hancur', amount: 2.5, unit: 'sudu besar' },
      { name: 'Garam Kasar', amount: 1, unit: 'sudu teh' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Tumis Cili Giling Pecah Minyak',
        instruction: 'Panaskan minyak yang mencukupi. Tumis pes bawang dan belacan, diikuti cili kisar. Masak api perlahan sehingga minyak merah naik ke permukaan.',
        timerMinutes: 15,
        petua: 'Ulang masukkan sedikit air sebanyak 2-3 kali untuk pastikan cili masak sempurna dan tidak pijar perut.',
        actionSfx: 'sizzle'
      },
      {
        stepNumber: 2,
        title: 'Seimbangkan Rasa Asam Manis',
        instruction: 'Masukkan air asam jawa, gula melaka dan garam kasar. Kacau sampai sambal bertukar warna merah gelap berkilat.',
        timerMinutes: 6,
        petua: 'Rasa sambal mesti ada manis, masam asam jawa, dan masin yang berpadu.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 3,
        title: 'Masukkan Sotong Kembang',
        instruction: 'Masukkan hirisan sotong kembang. Kacau rata bersama sambal selama 8 minit. Sotong akan menyerap kuah pekat sambal.',
        timerMinutes: 8,
        petua: 'Jangan masak terlalu lama nanti sotong jadi liat anakanda.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 4,
        title: 'Sentuhan Akhir Biji Petai',
        instruction: 'Masukkan biji petai segar. Gaul sebati selama 2-3 minit sahaja agar petai kekal rangup hijau. Siap diangkat!',
        timerMinutes: 3,
        petua: 'Aroma petai bila bersatu dengan sambal legam memang membangkit selera satu kampung!',
        actionSfx: 'chime'
      }
    ],
    tags: ['Sambal', 'Petai', 'Sotong', 'Nasi Lemak', 'Pedas Gila']
  },
  {
    id: 'air-sirap-bandung-selasih-ais',
    title: 'Air Sirap Bandung Selasih Ais Padu',
    subtitle: 'Minuman pencuci mulut sejuk merah jambu bersusu lemak manis dengan aroma mawar',
    category: 'Minuman Segar',
    image: kuihSeriMukaImg,
    timeMinutes: 10,
    servings: 6,
    difficulty: 'Mudah',
    spiceLevel: 'Tidak Pedas',
    pantun: [
      'Merah jambu sirap bandung,',
      'Biji selasih kembang di cawan;',
      'Ais ketul di bawah bumbung,',
      'Hilang dahaga bersama kawan.'
    ],
    iramaTitle: 'Dondang Sayang di Dapur',
    iramaRentak: 'Rentak Santai Petang Sambil Menikmati Ais Sejuk',
    petuaMamaSiti: 'Bancuh pati sirap bersama air mawar dan sedikit susu pekat dahulu dalam jug kecil. Kacau rata baru curah susu sejat dan ais bongkah. Ini elak susu pecah atau bergentel!',
    ingredients: [
      { name: 'Pati Sirap Ros Wangi', amount: 5, unit: 'sudu besar' },
      { name: 'Susu Sejat / Evaporated Milk', amount: 1, unit: 'tin' },
      { name: 'Susu Pekat Manis', amount: 4, unit: 'sudu besar' },
      { name: 'Biji Selasih (direndam kembang)', amount: 2, unit: 'sudu besar' },
      { name: 'Air Mawar Asli', amount: 1, unit: 'sudu teh' },
      { name: 'Ketulan Ais Padu', amount: 4, unit: 'cawan' },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Kembangkan Biji Selasih',
        instruction: 'Rendam biji selasih dalam air suam selama 5 minit hingga lapisan jeli lutsinar kembang sepenuhnya. Toskan.',
        timerMinutes: 5,
        petua: 'Biji selasih bukan sahaja sedap digigit, malah elok menyejukkan badan selepas makan lauk pedas.',
        actionSfx: 'mortar'
      },
      {
        stepNumber: 2,
        title: 'Campurkan Pati Sirap & Susu',
        instruction: 'Dalam jag kaca, larutkan pati sirap, air mawar, dan susu pekat manis. Tuangkan susu sejat penuh berkrim dan kacau sebati.',
        timerMinutes: 3,
        petua: 'Pukul sedikit dengan spatula atau sudu panjang sampai buih halus naik di permukaan.',
        actionSfx: 'spatula'
      },
      {
        stepNumber: 3,
        title: 'Ais & Selasih Dingin',
        instruction: 'Penuhkan jag dengan ketulan ais padu. Masukkan biji selasih di atas ais. Kacau sekali lagi dan hidangkan dingin bercahaya!',
        timerMinutes: 2,
        petua: 'Sesuai sangat digandingkan dengan lauk Rendang Tok atau Ayam Masak Merah!',
        actionSfx: 'chime'
      }
    ],
    tags: ['Minuman', 'Sirap Bandung', 'Selasih', 'Kenduri', 'Penyejuk Tekak']
  }
];

export const COOKING_SONGS_COLLECTION = [
  {
    title: 'Joget Ketuk Spatula',
    rentak: 'Rentak Joget 6/8',
    tempo: 'Cepat & Ceria',
    lirik: `Ketuk kuali tang tang tang,
Bunyi bersahut dapur berdentang;
Spatula digoyang lauk pun kembang,
Aroma memikat seisi gelanggang.

(Korus)
Garam secubit gula sejemput,
Kasih disulam hati terpaut;
Masakan bonda takkan luput,
Kenyang perut sedap disebut!`,
    pantun: 'Ketuk kuali berdering ria, Masak rendang api sekata; Ketuk spatula penambat jiwa, Seisi keluarga senyum ceria.'
  },
  {
    title: 'Dondang Sayang di Dapur',
    rentak: 'Rentak Asli Melayu',
    tempo: 'Santai & Mendayu',
    lirik: `Bunga cengkih bunga lawang,
Harum semerbak di waktu petang;
Kacau kuah berteman sayang,
Biar mendidih gulai bertandang.

(Korus)
Lengkuas serai kunyit seikat,
Air tangan ibu penuh berkat;
Makan bersama terasa dekat,
Nikmat warisan kekal terlekat.`,
    pantun: 'Burung merpati hinggap di dahan, Singgah sebentar makan kelapa; Makanan enak berkah tuhan, Resepi bonda jangan dilupa.'
  },
  {
    title: 'Inang Santan & Serai',
    rentak: 'Rentak Inang Tradisi',
    tempo: 'Sederhana & Berbuai',
    lirik: `Pohon kelapa melambai-lambai,
Perah santan putih berkilau;
Tumbuk cili di lesung tembaga,
Kuah lemak sedap merayau.

(Korus)
Kacau santan jangan pecah minyak,
Pesan bonda ingat sentiasa;
Rezeki bertambah berkat banyak,
Makan sepinggan tak rasa biasa!`,
    pantun: 'Daun kesum di tepi kolam, Patah seranting bawa ke pekan; Harum masakan semerbak malam, Sekeluarga mesra di meja makan.'
  }
];

import { caseSilentStage } from './caseSilentStage.js';
import { caseShadowGallery } from './caseShadowGallery.js';


export const INITIAL_NODE_ID = 'node_scene_arrival';

export const CASE_INFO = {
  title: 'Kırmızı Mühür',
  subtitle: 'Cem Arman Cinayeti Soruşturması',
  location: 'Arman Köşkü, Boğaz Sırtları',
  time: '28 Ekim, 23:45 — Fırtınalı Gece',
  victim: 'Cem Arman (58, Tanınmış Antika Koleksiyoncusu)',
  briefing:
    'Yağmurlu bir sonbahar gecesinde, antika koleksiyoncusu Cem Arman köşkteki kilitli çalışma odasında ölü bulundu. Masasındaki tarihi değere sahip "Kırmızı Mühürlü Osmanlı Vakfiyesi" kayıp. Polis ilk bakışta olayı soygun sansa da, detaylar soğukkanlı bir cinayete işaret ediyor.',
  suspects: [
    {
      id: 'murat',
      name: 'Murat Soyer',
      role: 'İş Ortağı',
      motive: 'Ortaklıktan doğan yüklü borç ve kayıp vasiyet senedi.',
      alibi: 'Saat 22:45\'te köşkten ayrıldığını, otoyolda olduğunu iddia ediyor.',
      initialStatus: 'Gergin ve suçlayıcı bir tavır sergiliyor.',
    },
    {
      id: 'leyla',
      name: 'Leyla Erdem',
      role: 'Kişisel Asistan',
      motive: 'Arşiv belgelerine erişimi olan tek kişi, şüpheli hareketler.',
      alibi: '22:30\'dan beri alt kattaki kütüphanede kataloglama yaptığını söylüyor.',
      initialStatus: 'Ağlamaklı, korkmuş ve bir şeyler gizler gibi.',
    },
    {
      id: 'selin',
      name: 'Selin Arman',
      role: 'Yeğeni / Mirasçı',
      motive: 'Kumar borçları ve amcası tarafından mirastan çıkarılma tehdidi.',
      alibi: 'Bütün gece Kadıköy\'deki atölyesinde tek başına olduğunu söylüyor.',
      initialStatus: 'Panik içinde tırnaklarını yiyor, sorulara ters yanıtlar veriyor.',
    },
  ],
};

export const CLUES = {
  clue_broken_clock: {
    id: 'clue_broken_clock',
    title: 'Durmuş Masa Saati',
    category: 'Olay Yeri',
    location: 'Çalışma Masası',
    suspect: 'Murat Soyer',
    icon: 'clock',
    shortDesc: '23:15\'te durmuş antika masa saati.',
    description:
      'Masa saati sert bir darbeyle 23:15\'te durmuş. Dikkat çekici olan, cam kırıklarının Cem Arman\'ın kolunun üzerinde olması. Bu da saatin Cem yere yığıldıktan sonra, sahte bir ölüm saati yaratmak için bilerek kırıldığını gösteriyor.',
  },
  clue_poisoned_glass: {
    id: 'clue_poisoned_glass',
    title: 'Konyak Kadehi ve Acı Badem Kokusu',
    category: 'Adli Tıp',
    location: 'Çalışma Masası',
    suspect: 'Murat Soyer',
    icon: 'flask',
    shortDesc: 'Siyanür kalıntısı içeren kristal kadeh.',
    description:
      'Masadaki yarım konyak kadehinden hafif bir acı badem kokusu yükseliyor. Kurbanda boğuşma veya darp izi yok; ölüm sebebi kalp krizi değil, kadehe katılan hızlı etkili bir potasyum siyanür bileşiği.',
  },
  clue_wet_scarf: {
    id: 'clue_wet_scarf',
    title: 'Islak İpek Fular',
    category: 'Fiziksel Kanıt',
    location: 'Giriş Holü Vestiyeri',
    suspect: 'Selin Arman',
    icon: 'scarf',
    shortDesc: 'Selin Arman\'a ait, yağmurdan sırılsıklam olmuş fular.',
    description:
      'Vestiyerde asılı duran fuların üzerinde Selin\'in kullandığı özel Fransız parfümü kokuyor ve kumaşı henüz kurumamış. Bu durum, Selin\'in "Bütün gece Kadıköy\'deydim" yalanını çürütüyor.',
  },
  clue_muddy_footprints: {
    id: 'clue_muddy_footprints',
    title: 'Çamurlu Ayak İzleri',
    category: 'Olay Yeri',
    location: 'Balkon Eşiği',
    suspect: 'Murat Soyer',
    icon: 'footprints',
    shortDesc: 'Fransız balkonuna uzanan 44 numara kösele izleri.',
    description:
      'Bahçe kapısından balkon camına ve oradan çalışma masasına uzanan derin çamur izleri. Ayakkabı kalıbı 44 numara İtalyan kösele ayakkabıya ait. Murat Soyer\'in ayağındaki ayakkabılarla birebir örtüşüyor.',
  },
  clue_torn_ledger: {
    id: 'clue_torn_ledger',
    title: 'Şöminedeki Tehdit Notu',
    category: 'Belge',
    location: 'Şömine Külleri',
    suspect: 'Murat Soyer',
    icon: 'file-text',
    shortDesc: 'Murat\'ın el yazısıyla yazılmış tehdit mektubu parçası.',
    description:
      'Sönmüş şömineden kurtarılan yarı yanmış kağıt: "...o kırmızı mühürlü borç senedini bu gece bana teslim etmezsen, yarını göremezsin Cem! M. Soyer". Cinayetin arkasındaki doğrudan tehdidi kanıtlıyor.',
  },
  clue_sealed_envelope: {
    id: 'clue_sealed_envelope',
    title: 'Kırmızı Mühürlü Zarf',
    category: 'Kritik Belge',
    location: 'Kütüphane Gizli Bölmesi',
    suspect: 'Leyla Erdem & Murat Soyer',
    icon: 'stamp',
    shortDesc: 'Cem Arman\'ın kırmızı balmumuyla mühürlediği gizli vasiyetname ve borç senedi.',
    description:
      'Kasadan çalındığı sanılan asıl belge. Leyla Erdem, Murat Soyer\'in kasayı açmaya çalışacağını anlayınca belgeyi saklamış. Zarfın içinde Murat\'ın 10 milyon liralık karşılıksız borç senedi ve Cem\'in tüm mirasını yeğeninden alıp bir vakfa bıraktığı resmi vasiyet var.',
  },
  clue_gas_station_receipt: {
    id: 'clue_gas_station_receipt',
    title: 'Benzinlik Fişi ve Kamera Görüntüsü',
    category: 'Dış Kanıt',
    location: 'Polis Telsiz Raporu / Selin\'in Çantası',
    suspect: 'Selin Arman',
    icon: 'camera',
    shortDesc: 'Saat 23:30 tarihli benzinlik fişi ve köşk yakınındaki araç kaydı.',
    description:
      'Köşkün 400 metre ilerisindeki benzin istasyonundan alınmış fiş. Güvenlik kamerası, Selin\'in panik içinde köşkten arabasıyla uzaklaştığını kaydediyor.',
  },
};

export const STORY_NODES = {
  node_scene_arrival: {
    id: 'node_scene_arrival',
    chapter: 1,
    chapterTitle: 'Bölüm 1: Fırtınalı Gece',
    title: 'Konağa Varış',
    sceneType: 'manor_front',
    text: [
      'Gök gürültüsü Boğaz yamaçlarını sarsarken, eski Arman Malikanesi\'nin demir kapısından içeri adımını atıyorsun. Asırlık çınar ağaçlarının arasından süzülen soğuk yağmur damlaları yüzünü yalıyor.',
      'Olay yeri inceleme ekipleri bahçede fenerlerle dolaşıyor. Genç Komiser Yardımcısı Barış seni kapıda karşılıyor: "Başkomiserim, Cem Arman ikinci kattaki çalışma odasında. İlk incelemeye göre hırsızlık amaçlı bir baskın gibi görünüyor, ancak kasadaki bazı evraklar ve masadaki durum kafamızı karıştırdı."',
      'Köşkün salonunda kurbanın asistanı, iş ortağı ve yeğeni gözaltında tutuluyor. Önce nereye odaklanmak istersin?',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_arrival_inspect_desk',
        text: 'Cem Arman\'ın cesedini ve çalışma masasını ayrıntılı incele.',
        nextNodeId: 'node_inspect_desk',
        decisionTag: 'Olay yeri çalışma masası önceliklendirildi.',
      },
      {
        id: 'choice_arrival_inspect_hall',
        text: 'Giriş holünü, vestiyeri ve ıslak eşyaları kontrol et.',
        nextNodeId: 'node_inspect_hall',
        decisionTag: 'Giriş holü ve vestiyer araştırıldı.',
      },
      {
        id: 'choice_arrival_go_suspects',
        text: 'Vakit kaybetmeden salondaki şüphelileri genel bir sorgudan geçir.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Delil toplamadan doğrudan sorguya geçildi.',
      },
    ],
  },

  node_inspect_desk: {
    id: 'node_inspect_desk',
    chapter: 1,
    chapterTitle: 'Bölüm 1: Çalışma Odası',
    title: 'Çalışma Masasındaki Sırlar',
    sceneType: 'study_room',
    text: [
      'Çalışma odası masif ceviz ağacı kokuyor. Cem Arman geniş koltuğunda geriye yaslanmış, başı omzuna düşmüş halde cansız yatıyor. Yüzünde acı dolu bir kasılma var ama vücudunda hiçbir boğuşma izi yok.',
      'Önündeki maun masada durmuş bir antika masa saati ve yarıya kadar konyak dolu kristal bir kadeh dikkatini çekiyor. Eğilip kadehi kokladığında burun deliklerini keskin bir acı badem rayihası yakıyor — bariz bir siyanür zehirlenmesi!',
      'Masa saati ise 23:15\'te durmuş. Fakat cam kırıkları Cem\'in ceketi ve masadaki parmak izi koruyucularının üzerinde dağılmış vaziyette. Biri cinayetten sonra saati bilerek kırmış ve sahte bir ölüm saati imajı yaratmış.',
    ],
    clues: ['clue_broken_clock', 'clue_poisoned_glass'],
    choices: [
      {
        id: 'choice_desk_balcony',
        text: 'Aralık duran Fransız balkonuna yaklaş ve zemini tara.',
        nextNodeId: 'node_inspect_balcony',
        decisionTag: 'Balkon çıkışı incelendi.',
      },
      {
        id: 'choice_desk_fireplace',
        text: 'Şöminenin içindeki yarı yanmış kül ve kağıtları karıştır.',
        nextNodeId: 'node_inspect_fireplace',
        decisionTag: 'Şömine külleri araştırıldı.',
      },
      {
        id: 'choice_desk_to_lounge',
        text: 'Topladığın iki delille birlikte salondaki şüphelilerin yanına in.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Çalışma odası delilleriyle salona dönüldü.',
      },
    ],
  },

  node_inspect_hall: {
    id: 'node_inspect_hall',
    chapter: 1,
    chapterTitle: 'Bölüm 1: Giriş Katı',
    title: 'Giriş Holü ve Islak İzler',
    sceneType: 'mansion_hall',
    text: [
      'Giriş holündeki kristal avize fırtınanın etkisiyle hafifçe sallanıyor. Mermer zeminde kurumaya yüz tutmuş su damlacıkları var.',
      'Paltoların asılı olduğu vestiyere yöneliyorsun. Koyu yeşil bir ipek fular askıdan aşağıya damlatıyor. Eline aldığında fuların henüz sırılsıklam olduğunu ve üzerinde pahalı vanilya-bergamot esanslı bir parfüm koktuğunu fark ediyorsun.',
      'Bu Selin Arman\'ın kullandığı imza parfüm. Oysa Selin, polis ifadesinde bütün akşam Kadıköy\'deki atölyesinde olduğunu ve köşke ancak polis aradıktan sonra sabah gelebildiğini öne sürmüştü!',
    ],
    clues: ['clue_wet_scarf'],
    choices: [
      {
        id: 'choice_hall_go_upstairs',
        text: 'Cem Arman\'ın üst kattaki çalışma odasına ve cesede çık.',
        nextNodeId: 'node_inspect_desk',
        decisionTag: 'Holdeki fuların ardından çalışma odasına geçildi.',
      },
      {
        id: 'choice_hall_go_suspects',
        text: 'Bu fuları alıp doğrudan salondaki Selin Arman\'ın karşısına dikil.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Islak fular deliliyle doğrudan sorguya gidildi.',
      },
    ],
  },

  node_inspect_balcony: {
    id: 'node_inspect_balcony',
    chapter: 1,
    chapterTitle: 'Bölüm 1: Olay Yeri',
    title: 'Balkondaki Ayak İzleri',
    sceneType: 'balcony_rain',
    text: [
      'Fransız balkonunun kapısı hafifçe aralık, içeriye soğuk sonbahar rüzgarı doluyor. Tül perdeler savruluyor.',
      'El fenerini balkonun mermer eşiğine tutuyorsun. Yağmur suyuna karışmış koyu kırmızı bahçe balçığı net bir ayakkabı izi bırakmış: 44 numara, geniş tabanlı bir İtalyan köselesi.',
      'İzler bahçeden tırmanış değil; çalışma odasından dışarıya, yangın merdivenine doğru koşulduğunu gösteriyor. Katil veya suç ortağı cinayetten sonra bu balkondan kaçmış.',
    ],
    clues: ['clue_muddy_footprints'],
    choices: [
      {
        id: 'choice_balcony_fireplace',
        text: 'Şöminedeki yanık evrakları kontrol et.',
        nextNodeId: 'node_inspect_fireplace',
        decisionTag: 'Balkon izlerinden sonra şömine incelendi.',
      },
      {
        id: 'choice_balcony_library',
        text: 'Yan koridordaki arşiv ve kütüphane odasına yönel.',
        nextNodeId: 'node_inspect_library',
        decisionTag: 'Gizli kütüphaneye geçildi.',
      },
      {
        id: 'choice_balcony_lounge',
        text: 'Ayak izi kalıbını alıp salondaki şüphelilerin ayakkabılarıyla karşılaştır.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Ayak izi deliliyle salona dönüldü.',
      },
    ],
  },

  node_inspect_fireplace: {
    id: 'node_inspect_fireplace',
    chapter: 1,
    chapterTitle: 'Bölüm 1: Olay Yeri',
    title: 'Şöminedeki Küller',
    sceneType: 'study_fireplace',
    text: [
      'Çalışma odasındaki mermer şöminenin içinde henüz hafif bir ısı var. Üzerine su serpilmiş kömürlerin arasında beyaz bir kağıt parçası kısmen yanmış.',
      'Cımbızla kağıt parçasını çekip çıkarıyorsun. Antetli kağıdın üzerinde telaşlı, sert vuruşlarla yazılmış bir el yazısı okunabiliyor:',
      '"...o kırmızı mühürlü borç senedini bu gece bana teslim etmezsen, yarını göremezsin Cem! M. Soyer"',
      'Murat Soyer ile Cem Arman arasındaki gerilim sıradan bir iş uyuşmazlığı değil, ölümcül bir şantaj seviyesine tırmanmış.',
    ],
    clues: ['clue_torn_ledger'],
    choices: [
      {
        id: 'choice_fireplace_library',
        text: 'Tehdit edilen "kırmızı mühürlü senet"i aramak için kütüphaneye geç.',
        nextNodeId: 'node_inspect_library',
        decisionTag: 'Kütüphanede kırmızı mühürlü senet arandı.',
      },
      {
        id: 'choice_fireplace_lounge',
        text: 'Bu tehdit mektubuyla doğrudan Murat Soyer\'in üzerine yürü.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Tehdit notuyla salona gidildi.',
      },
    ],
  },

  node_inspect_library: {
    id: 'node_inspect_library',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Gizli Arşiv',
    title: 'Kütüphanedeki Gizli Bölme',
    sceneType: 'library_archive',
    text: [
      'Köşkün alt katındaki kütüphane tavan boyu ciltli tarihi kitaplarla dolu. Masanın üzerinde Asistan Leyla Erdem\'in düzenlediği katalog fişleri duruyor.',
      'Üçüncü rafın arkasındaki meşe paneli yokladığında küçük bir mekanizma tık sesiyle açılıyor. Gizli bir duvara gömülü çelik kasa değil, ahşap bir saklama kutusu ortaya çıkıyor.',
      'Kutunun içinde ağır, kırmızı balmumu mührü henüz sağlam bir zarf var! Zarfın içinde Murat Soyer\'in Cem Arman\'a olan 10 milyon liralık karşılıksız borç senedi ve Cem\'in mirasını koruyan vasiyeti duruyor. Leyla bunu katilden korumak için buraya gizlemiş.',
    ],
    clues: ['clue_sealed_envelope'],
    choices: [
      {
        id: 'choice_library_police_call',
        text: 'Dışarıdan gelen polis telsiz anonsunu dinlemek için bahçe kapısına çık.',
        nextNodeId: 'node_police_report',
        decisionTag: 'Polis telsiz anonsu dinlendi.',
      },
      {
        id: 'choice_library_to_lounge',
        text: 'Kırmızı mühürlü zarfı cebine koyup salondaki şüphelilerin karşısına dikil.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Kırmızı mühürlü zarfla şüphelilerin karşısına çıkıldı.',
      },
    ],
  },

  node_police_report: {
    id: 'node_police_report',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Dış İstihbarat',
    title: 'Karakol Telsiz Raporu',
    sceneType: 'police_radio',
    text: [
      'Komiser Yardımcısı Barış telsizi sana uzatıyor: "Başkomiserim, köşkün 400 metre aşağısındaki benzin istasyonunun güvenlik kamera kayıtları geldi!"',
      'Telsizden merkez memuru aktarıyor: Saat tam 23:30\'da, fırtınanın en şiddetli anında, Selin Arman\'a ait siyah spor araba benzinliğe yanaşmış. Pompacıya elden nakit ödeme yapıp kahve almış ve hızla sahile doğru sürmüş.',
      'Selin\'in "Saat 22:00\'den beri Kadıköy\'deki atölyemde uyuyordum" ifadesi kesin olarak çöktü. Selin cinayet saatinde bu malikanenin hemen dibindeydi.',
    ],
    clues: ['clue_gas_station_receipt'],
    choices: [
      {
        id: 'choice_police_to_suspects',
        text: 'Tüm delillerle birlikte salondaki şüphelileri çapraz sorguya al.',
        nextNodeId: 'node_living_room',
        decisionTag: 'Telsiz raporu sonrası salona dönüldü.',
      },
      {
        id: 'choice_police_direct_selin',
        text: 'Doğrudan Selin Arman\'ın karşısına çık ve benzinlik fişini göster.',
        nextNodeId: 'node_interrogate_selin',
        decisionTag: 'Doğrudan Selin sorgusuna odaklanıldı.',
      },
    ],
  },

  node_living_room: {
    id: 'node_living_room',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Şüpheliler Masası',
    title: 'Şüphelilerle Yüzleşme',
    sceneType: 'suspects_lounge',
    text: [
      'Köşkün büyük salonunda şöminenin önünde üç şüpheli oturuyor. Ağır bir sessizlik hakim.',
      'İş ortağı Murat Soyer ayakta, deri ceketiyle huzursuz adımlarla volta atıyor ve saatine bakıp duruyor. Asistan Leyla Erdem berjer koltukta ellerini ovuşturuyor, gözleri kızarmış. Yeğen Selin Arman ise bacak bacak üstüne atmış, sigarasını söndürmeden yenisini yakıyor.',
      'Soruşturmayı derinleştirmek için kimi önce sorgulamak istersin?',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_lounge_murat',
        text: 'İş Ortağı Murat Soyer\'in üzerine git.',
        nextNodeId: 'node_interrogate_murat',
        decisionTag: 'Murat Soyer sorgulandı.',
      },
      {
        id: 'choice_lounge_leyla',
        text: 'Kişisel Asistan Leyla Erdem\'i sorgula.',
        nextNodeId: 'node_interrogate_leyla',
        decisionTag: 'Leyla Erdem sorgulandı.',
      },
      {
        id: 'choice_lounge_selin',
        text: 'Yeğen Selin Arman\'ı çapraz sorguya çek.',
        nextNodeId: 'node_interrogate_selin',
        decisionTag: 'Selin Arman sorgulandı.',
      },
      {
        id: 'choice_lounge_accuse_chamber',
        text: 'Yeterince delil topladığını düşünüyorsan Nihai Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Erken nihai karar aşamasına geçildi.',
      },
    ],
  },

  node_interrogate_murat: {
    id: 'node_interrogate_murat',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Sorgu',
    title: 'Murat Soyer\'in Savunması',
    sceneType: 'interrogation_murat',
    text: [
      'Murat Soyer sertçe sana dönüyor: "Bakın komiserim, zamanımı boşa harcıyorsunuz! Cem benim kadim dostumdu. Evet, iş yüzünden tartıştık ama saat 22:45\'te köşkten çıktım. Masadaki saat 23:15\'te durmuş! Ben o sırada otoyoldaydım, telefon sinyallerime bakın!"',
      'Murat ölüm saatini özellikle 23:15 olarak vurguluyor — oysa o saatte Cem\'in yanında olduğunu bilmeyen biri, çalışma odasındaki kırık saatten bu kadar emin söz edemezdi.',
      'Ayrıca Murat\'ın 44 numara İtalyan deri ayakkabılarının burnunda taze çamur lekeleri dikkat çekiyor.',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_murat_corner',
        text: 'Balkondaki çamurlu ayak izlerini ve tehdit notunu önüne fırlat.',
        nextNodeId: 'node_murat_cornered',
        requiredClueIds: ['clue_muddy_footprints', 'clue_torn_ledger'],
        decisionTag: 'Murat çamurlu izler ve tehdit notuyla köşeye sıkıştırıldı.',
      },
      {
        id: 'choice_murat_to_leyla',
        text: 'Murat\'ın söylediklerini Asistan Leyla ile doğrulamak için Leyla\'ya dön.',
        nextNodeId: 'node_interrogate_leyla',
        decisionTag: 'Murat\'tan sonra Leyla\'ya geçildi.',
      },
      {
        id: 'choice_murat_to_accusation',
        text: 'Tüm bulguları tartmak için Nihai Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Murat sorgusu sonrası karar odasına geçildi.',
      },
    ],
  },

  node_murat_cornered: {
    id: 'node_murat_cornered',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Köşeye Sıkışma',
    title: 'Murat\'ın Maskesi Düşüyor',
    sceneType: 'murat_panic',
    text: [
      'Şömineden çıkardığın yanık tehdit mektubunu ve balkondaki 44 numara çamur kalıbını masaya çarpıyorsun. Murat\'ın yüzündeki kibirli ifade bir anda buz kesiyor.',
      '"Bu... bu saçmalık!" diye kekeliyor. Alnında boncuk boncuk terler birikiyor. "Ben sadece... bahçeden çıkarken balkona uğradım. Cem konyak içiyordu, iyiydi diyorum size!"',
      'Kadehteki siyanürden henüz bahsetmemiş olmana rağmen konyaktan kendiliğinden söz etmesi, kadehe zehri bizzat koyduğunu gizleyemediğini kanıtlıyor.',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_cornered_to_selin',
        text: 'Yeğen Selin\'in rolünü de kesinleştirmek için Selin\'i sorgula.',
        nextNodeId: 'node_interrogate_selin',
        decisionTag: 'Murat köşeye sıkıştıktan sonra Selin incelendi.',
      },
      {
        id: 'choice_cornered_to_accusation',
        text: 'Bütün taşlar oturdu. Katili resmen suçlamak için Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Murat\'ın itirafımsı tepkisi sonrası karar odasına geçildi.',
      },
    ],
  },

  node_interrogate_leyla: {
    id: 'node_interrogate_leyla',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Sorgu',
    title: 'Asistan Leyla Erdem\'in İfadesi',
    sceneType: 'interrogation_leyla',
    text: [
      'Leyla titreyen elleriyle mendilini sıkıyor: "Komiserim, Cem Bey son bir aydır can güvenliğinden endişe ediyordu. Murat Bey ile ortak oldukları antika fonunda büyük bir usulsüzlük ortaya çıkmıştı. Cem Bey o kırmızı mühürlü senedi savcılığa verecekti."',
      '"Murat Bey gece 22:30\'da çalışma odasına fırtına gibi girdi. Bağırışmaları alt kattan duyuyordum. Sonra bir kadeh şıngırtısı ve derin bir sessizlik oldu..."',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_leyla_show_envelope',
        text: 'Kütüphanede bulduğun Kırmızı Mühürlü Zarf\'ı Leyla\'ya göster.',
        nextNodeId: 'node_leyla_confession',
        requiredClueIds: ['clue_sealed_envelope'],
        decisionTag: 'Kırmızı mühürlü zarf Leyla\'ya gösterildi.',
      },
      {
        id: 'choice_leyla_to_selin',
        text: 'Leyla\'nın anlattıklarından sonra Yeğen Selin\'in yanına geç.',
        nextNodeId: 'node_interrogate_selin',
        decisionTag: 'Leyla\'dan sonra Selin\'e geçildi.',
      },
      {
        id: 'choice_leyla_to_murat',
        text: 'Leyla\'nın suçlamalarını Murat Soyer\'in yüzüne vur.',
        nextNodeId: 'node_interrogate_murat',
        decisionTag: 'Leyla\'nın ifadesiyle Murat\'a dönüldü.',
      },
    ],
  },

  node_leyla_confession: {
    id: 'node_leyla_confession',
    chapter: 2,
    chapterTitle: 'Bölüm 2: İtiraf',
    title: 'Leyla\'nın Koruma Hamlesi',
    sceneType: 'leyla_relief',
    text: [
      'Mühürlü zarfı masaya koyduğunda Leyla derin bir nefes alıp ağlamaya başlıyor: "Tanrım... onu bulmuşsunuz! Evet, o zarfı ben gizli bölmeye sakladım!"',
      '"Murat Soyer, Cem Bey\'i tehdit edip kasayı açtırmaya çalışıyordu. Cem Bey zehirlenip yere yığıldığında Murat kasayı karıştırırken sesimi duyup balkondan kaçtı. Ben yukarı çıktığımda Cem Bey nefes almıyordu. Belgeyi Murat çalmasın diye kütüphaneye sakladım. Cem Bey benim öz babam gibiydi, ona asla zarar vermem!"',
      'Leyla\'nın gözlerindeki keder sahici. Kırmızı mühürlü zarfın saklanması cinayeti örtbas etmek için değil, kurbanın vasiyetini korumak içindi.',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_leyla_conf_to_accuse',
        text: 'Gerçek artık netleşti. Hükmü vermek için Nihai Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Leyla aklanarak doğrudan karar odasına geçildi.',
      },
      {
        id: 'choice_leyla_conf_to_selin',
        text: 'Selin\'in gece köşkteki varlığını da netleştirmek için Selin\'e dön.',
        nextNodeId: 'node_interrogate_selin',
        decisionTag: 'Leyla sonrası Selin de sorgulandı.',
      },
    ],
  },

  node_interrogate_selin: {
    id: 'node_interrogate_selin',
    chapter: 2,
    chapterTitle: 'Bölüm 2: Sorgu',
    title: 'Yeğen Selin Arman\'ın Yalanları',
    sceneType: 'interrogation_selin',
    text: [
      'Selin küstah bir tebessümle sana bakıyor: "Boşuna beni sıkıştırmayın Başkomiserim. Amcam öldüğünde ben Kadıköy Moda\'daki atölyemde tuval boyuyordum. Telefonumu kapatmıştım. Sabah polis arayınca haberim oldu. Amcam zengin bir adamdı, beni mirastan atacağını söylerdi ama yapamazdı."',
      'Fakat Selin\'in parmakları titriyor ve tırnaklarını kanatacak kadar ısırıyor.',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_selin_confront_receipt',
        text: 'Vestiyerdeki ıslak fuları ve 23:30 tarihli benzinlik fişini önüne koy.',
        nextNodeId: 'node_selin_confession',
        requiredClueIds: ['clue_wet_scarf', 'clue_gas_station_receipt'],
        decisionTag: 'Selin ıslak fular ve kamera kayıtlarıyla sıkıştırıldı.',
      },
      {
        id: 'choice_selin_to_murat',
        text: 'Selin\'i bırakıp Murat Soyer\'in üzerine git.',
        nextNodeId: 'node_interrogate_murat',
        decisionTag: 'Selin\'den sonra Murat\'a geçildi.',
      },
      {
        id: 'choice_selin_to_accusation',
        text: 'Şüphelilerle yeterince konuştun. Nihai Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Selin sorgusu sonrası karar odasına geçildi.',
      },
    ],
  },

  node_selin_confession: {
    id: 'node_selin_confession',
    chapter: 2,
    chapterTitle: 'Bölüm 2: İtiraf',
    title: 'Selin\'in Hırsızlık İtirafı',
    sceneType: 'selin_breakdown',
    text: [
      'Islak fuları ve benzin istasyonu kamerasından alınan görüntüyü görünce Selin\'in rengi kül gibi oluyor. Hıçkırıklara boğuluyor:',
      '"Lanet olsun! Evet, gece buradaydım! Amcam tefecilere olan 3 milyonluk borcumu ödemeyi reddetti ve beni mirastan çıkaracağını söyledi. Kasayı açıp borç senedimi çalmak için gizlice gelmiştim!"',
      '"Fakat çalışma odasına girdiğimde amcam zaten masanın arkasında yerde yatıyordu! Dudakları mordu, kadeh kırılmıştı... Korkudan aklımı kaçıracaktım! Kasaya bile dokunamadan fularımı vestiyerde unutup arabama atladım ve kaçtım! Yemin ederim onu ben öldürmedim, geldiğimde çoktan ölmüştü!"',
      'Selin fırsatçı bir hırsızdı ancak cinayeti işleyen o değildi; cesedi gördüğünde panikleyip kaçmıştı.',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_selin_conf_to_accusation',
        text: 'Artık tüm parçalar birleşti. Katili işaret etmek için Karar Odası\'na geç.',
        nextNodeId: 'node_accusation_chamber',
        decisionTag: 'Selin\'in itirafı sonrası karar odasına geçildi.',
      },
      {
        id: 'choice_selin_conf_to_murat',
        text: 'Murat Soyer ile son bir kez yüzleş.',
        nextNodeId: 'node_interrogate_murat',
        decisionTag: 'Son hamle öncesi Murat\'a son kez gidildi.',
      },
    ],
  },

  node_accusation_chamber: {
    id: 'node_accusation_chamber',
    chapter: 3,
    chapterTitle: 'Bölüm 3: Büyük Hüküm',
    title: 'Nihai Karar Anı',
    sceneType: 'accusation_room',
    text: [
      'Salondaki herkes ayağa kalkmış, nefeslerini tutmuş senin ağzından çıkacak sözleri bekliyor. Dışarıda şimşekler çakıyor ve köşkün loş ışıkları bir anlığına titriyor.',
      'Elindeki dosya, topladığın deliller ve dinlediğin ifadeler masanın üzerinde duruyor. Cem Arman\'ın katilini ilan etmek ve adaleti sağlamak senin ellerinde.',
      'Dedektif, bu gece Cem Arman\'ı kim öldürdü ve dosya nasıl kapanacak?',
    ],
    clues: [],
    choices: [
      {
        id: 'choice_accuse_murat',
        text: 'KATİL MURAT SOYER! (Borç şantajı, siyanürlü konyak ve sahte saat hilesi)',
        nextNodeId: 'node_final_murat',
        decisionTag: 'Murat Soyer resmen katil olarak suçlandı.',
      },
      {
        id: 'choice_accuse_selin',
        text: 'KATİL SELİN ARMAN! (Miras öfkesi, gece köşkte bulunması ve hırsızlık teşebbüsü)',
        nextNodeId: 'node_final_selin',
        decisionTag: 'Selin Arman cinayetle suçlandı.',
      },
      {
        id: 'choice_accuse_leyla',
        text: 'KATİL LEYLA ERDEM! (Kırmızı mühürlü belgeyi gizlemesi ve kasaya tek erişim sahibi olması)',
        nextNodeId: 'node_final_leyla',
        decisionTag: 'Leyla Erdem cinayetle suçlandı.',
      },
      {
        id: 'choice_accuse_unsolved',
        text: 'Deliller yetersiz; kimseyi kesin olarak suçlamadan dosyayı savcılığa devret.',
        nextNodeId: 'node_final_unsolved',
        decisionTag: 'Yetersiz delil nedeniyle soruşturma sonlandırıldı.',
      },
    ],
  },

  // Final Düğümleri (Ending Trigger Nodes)
  node_final_murat: {
    id: 'node_final_murat',
    chapter: 3,
    chapterTitle: 'Final Kararı',
    title: 'Murat Soyer Suçlaması',
    sceneType: 'ending_murat',
    text: ['Murat Soyer suçlanıyor ve kanıtlar adli heyete sunuluyor...'],
    clues: [],
    choices: [],
  },

  node_final_selin: {
    id: 'node_final_selin',
    chapter: 3,
    chapterTitle: 'Final Kararı',
    title: 'Selin Arman Suçlaması',
    sceneType: 'ending_selin',
    text: ['Selin Arman suçlanıyor ve kelepçeler takılıyor...'],
    clues: [],
    choices: [],
  },

  node_final_leyla: {
    id: 'node_final_leyla',
    chapter: 3,
    chapterTitle: 'Final Kararı',
    title: 'Leyla Erdem Suçlaması',
    sceneType: 'ending_leyla',
    text: ['Leyla Erdem suçlanıyor ve gözaltına alınıyor...'],
    clues: [],
    choices: [],
  },

  node_final_unsolved: {
    id: 'node_final_unsolved',
    chapter: 3,
    chapterTitle: 'Final Kararı',
    title: 'Dosyanın Kapatılması',
    sceneType: 'ending_unsolved',
    text: ['Soruşturma delil yetersizliğinden askıya alınıyor...'],
    clues: [],
    choices: [],
  },
};

export const ENDINGS = {
  ending_perfect: {
    id: 'ending_perfect',
    type: 'correct',
    badge: 'Mükemmel Çözüm — Adalet Yerini Buldu',
    title: 'Kırmızı Mührün Zaferi',
    rank: 'Efsanevi Başkomiser',
    summary:
      'Tüm kritik kanıtları eksiksiz topladın, sahte alibileri bir bir çürüttün ve asıl katil Murat Soyer\'i inkâr edilemez delillerle köşeye sıkıştırdın.',
    narrative: [
      'Murat Soyer, masaya vurduğun kırık saat delili, siyanür kokan konyak kadehi, balkondaki 44 numara çamur izleri ve şöminedeki tehdit mektubu karşısında çöktü. Ceketinin gizli astarında siyanür ampulünün boş şişesi bulundu.',
      'İtirafında, Cem\'in kendisini savcılığa vermesini engellemek için konyak kadehine zehir koyduğunu, ardından masadaki saati kasten kırarak 23:15 alibisi kurmaya çalıştığını anlattı. Fakat kurbandan sonra kırılan cam parçaları bu tuzağı ele vermişti.',
      'Leyla Erdem\'in sakladığı Kırmızı Mühürlü Zarf mahkemeye sunuldu. Cem Arman\'ın vakfiyesi ve mirası korundu; Selin ise cinayetten beraat etti ama izinsiz mülke girme suçundan denetimli serbestlik aldı.',
      'İstanbul Emniyeti\'nin koridorlarında bu soruşturma, ders kitaplarına geçecek kusursuz bir dedektiflik örneği olarak anılacak.',
    ],
  },

  ending_insufficient_evidence: {
    id: 'ending_insufficient_evidence',
    type: 'wrong',
    badge: 'Kusurlu Suçlama — Delil Yetersizliği',
    title: 'Katilin Kaçışı',
    rank: 'Dikkatsiz Müfettiş',
    summary:
      'Doğru şüpheli olan Murat Soyer\'i suçladın ancak elinde mahkemeyi ikna edecek yeterli maddi delil yoktu.',
    narrative: [
      'Murat Soyer\'i işaret ettin. Ancak ne çamurlu ayak izlerini aldın ne de şöminedeki tehdit notunu kanıt olarak dosyaya ekleyebildin.',
      'Murat\'ın pahalı avukat ordusu devreye girdi: "Müvekkilimin olay saatinde orada olduğuna dair tek bir somut delil yok, saat 22:45\'te ayrıldığını tanıklar doğruluyor" diyerek ilk duruşmada tahliye kararı aldırdılar.',
      'Murat Soyer o gece yurt dışına kaçtı. Gerçek katili bilmene rağmen adalete teslim edemedin. Cem Arman cinayeti dosyasında senin adın büyük bir fiyaskoyla anılacak.',
    ],
  },

  ending_wrong_selin: {
    id: 'ending_wrong_selin',
    type: 'wrong',
    badge: 'Yanlış Suçlama — Masumun Mahkûmiyeti',
    title: 'Adaletin Yanılgısı',
    rank: 'Önyargılı Dedektif',
    summary:
      'Yeğen Selin Arman\'ın miras açgözlülüğüne ve olay yerindeki varlığına aldanarak cinayeti onun üzerine yıktın.',
    narrative: [
      'Selin Arman tutuklandı. Genç kadın cezaevine gönderilirken gözyaşları içinde masum olduğunu haykırıyordu.',
      'Üç hafta sonra bağımsız adli tıp kurulu konyaktaki siyanür bileşeninin kurbana 22:30 civarında verildiğini, Selin\'in ise o saatte köşke henüz varmadığını ispatladı. Ancak asıl katil Murat Soyer çoktan tüm şirket varlıklarını nakde çevirip İsviçre\'ye uçmuştu.',
      'Selin beraat ettiğinde sana ve emniyete tazminat davası açtı. Yanlış kişiyi suçlamanın bedelini mesleki itibarınla ödedin.',
    ],
  },

  ending_wrong_leyla: {
    id: 'ending_wrong_leyla',
    type: 'wrong',
    badge: 'Yanlış Suçlama — Sadık Asistan Kurban Oldu',
    title: 'Kör Düğüm',
    rank: 'Yanıltılmış Soruşturmacı',
    summary:
      'Kırmızı mühürlü belgeyi sakladığı için Asistan Leyla Erdem\'i suçladın; oysa o sadece kurbanın vasiyetini korumaya çalışıyordu.',
    narrative: [
      'Leyla Erdem kelepçelenerek nezarethaneye atıldı. Sessizce gözyaşı döktü ve "Cem Bey\'in vasiyetini korumak suç oldu" dedi.',
      'Asıl katil Murat Soyer, Cem\'in tüm hisselerini ve mülklerini ele geçirdi. Murat\'ın tehditleri ve konyaktaki siyanür göz ardı edildi.',
      'Vicdanın hiçbir zaman rahat etmeyecek; gerçek katil Cem Arman\'ın mezarı başında zaferle sırıtırken, masum bir kadın senin kararın yüzünden hapis yattı.',
    ],
  },

  ending_unsolved: {
    id: 'ending_unsolved',
    type: 'unsolved',
    badge: 'Çözülemeyen Vaka — Faili Meçhul',
    title: 'Karanlıkta Kalan Köşk',
    rank: 'Çaresiz Dedektif',
    summary:
      'Yeterli ipucu toplamadan soruşturmayı yarım bıraktın veya hiçbir şüpheliyi suçlayamayarak dosyayı rafa kaldırdın.',
    narrative: [
      'Köşkteki sırlar çözülemedi. Şüphelilerin ifadelerindeki derin çelişkileri ve delilleri birleştirmeyi başaramadın.',
      'Savcılık, somut bir fail gösterilemediği için dosyayı "Faili Meçhul Vakalar" arşivine kaldırdı. Arman Malikanesi karanlığa ve dedikodulara terk edildi.',
      'Gazeteler günlerce polisin yetersizliğini manşetlere taşıdı. Yağmurlu gecede kurban giden Cem Arman\'ın ruhu huzur bulamadı.',
    ],
  },
};

/**
 * Oyuncunun seçimleri ve topladığı delillere göre doğru finali değerlendirir.
 * @param {string} targetNodeId - Hedef final düğümü ID'si
 * @param {string[]} collectedClueIds - Oyuncunun topladığı ipucu ID'leri listesi
 * @param {Array} decisionHistory - Karar geçmişi
 * @returns {Object} ENDINGS nesnesinden ilgili final
 */
export function evaluateEnding(targetNodeId, collectedClueIds = [], _decisionHistory = []) {
  const clueCount = collectedClueIds.length;
  const hasMuratEvidence =
    collectedClueIds.includes('clue_broken_clock') &&
    collectedClueIds.includes('clue_poisoned_glass') &&
    (collectedClueIds.includes('clue_muddy_footprints') || collectedClueIds.includes('clue_torn_ledger'));

  if (targetNodeId === 'node_final_murat') {
    // Murat'ı suçladı: Yeterli kritik delili var mı ve en az 4 delil topladı mı?
    if (hasMuratEvidence && clueCount >= 4) {
      return ENDINGS.ending_perfect;
    }
    return ENDINGS.ending_insufficient_evidence;
  }

  if (targetNodeId === 'node_final_selin') {
    return ENDINGS.ending_wrong_selin;
  }

  if (targetNodeId === 'node_final_leyla') {
    return ENDINGS.ending_wrong_leyla;
  }

  // Varsayılan / Çözülemeyen Vaka
  return ENDINGS.ending_unsolved;
}

export const caseRedSeal = {
  id: 'case_red_seal',
  title: CASE_INFO.title,
  subtitle: CASE_INFO.subtitle,
  difficulty: 'Orta',
  duration: '15 Dk',
  location: CASE_INFO.location,
  time: CASE_INFO.time,
  victim: CASE_INFO.victim,
  briefing: CASE_INFO.briefing,
  suspects: CASE_INFO.suspects,
  clues: CLUES,
  initialNodeId: INITIAL_NODE_ID,
  nodes: STORY_NODES,
  endings: ENDINGS,
  evaluateEnding,
};

export const ALL_CASES = [caseRedSeal, caseSilentStage, caseShadowGallery];

export function getCaseById(caseId) {
  return ALL_CASES.find((c) => c.id === caseId) || caseRedSeal;
}


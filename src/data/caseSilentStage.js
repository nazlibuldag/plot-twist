/**
 * Vaka 2: Sessiz Sahne (The Silent Stage)
 * 
 * Vaka: Başrol Oyuncusu Hazal Kaya Cinayeti
 * Şüpheliler: Bora Tekin (Yönetmen), Melis Vardarlı (Yedek Oyuncu), Rıza Çetin (Işık Amiri)
 */

export const caseSilentStage = {
  id: 'case_silent_stage',
  title: 'Sessiz Sahne',
  subtitle: 'Şehir Tiyatrosu Prömiyer Cinayeti',
  difficulty: 'Orta',
  duration: '15-20 Dk',
  location: 'Tarihi Şehir Tiyatrosu, Beyoğlu',
  time: '14 Kasım, 21:30 — Prömiyer Gecesi',
  victim: 'Hazal Kaya (32, Başrol Oyuncusu)',
  briefing:
    'Alkışlar yükselirken perde iner inmez, oyunun başrol oyuncusu Hazal Kaya kulis koridorunda sırtından antika bir sahne hançeriyle bıçaklanmış olarak bulundu. Işıkların kesildiği 90 saniyelik elektrik arızasında kimse koridordan kimin geçtiğini görmediğini söylüyor.',
  suspects: [
    {
      id: 'bora',
      name: 'Bora Tekin',
      role: 'Oyun Yönetmeni',
      motive: 'Hazal ile aralarındaki 5 milyonluk sözleşme fesih kavgası ve basına sızan skandallar.',
      alibi: 'Cinayet anında salondaki reji masasından ışık teknisyenlerine talimat verdiğini iddia ediyor.',
      initialStatus: 'Öfkeli, basının içeri girmesini engellemeye çalışıyor.',
    },
    {
      id: 'melis',
      name: 'Melis Vardarlı',
      role: 'Yedek (Understudy) Oyuncu',
      motive: 'Hazal\'ın gölgesinde kalmaktan bıkmış, başrolü kapmak için her şeyi göze alabilecek hırslı bir oyuncu.',
      alibi: 'Işıklar kesildiğinde kostüm odasında tek başına makyaj tazelediğini söylüyor.',
      initialStatus: 'Gözyaşları içinde ama gözlerinde gizli bir zafer parıltısı var.',
    },
    {
      id: 'riza',
      name: 'Rıza Çetin',
      role: 'Işık ve Sahne Amiri',
      motive: 'Hazal tarafından tiyatrodan hırsızlıkla suçlanıp kovulma tehdidi almıştı.',
      alibi: 'Sigorta kutusundaki arızayı çözmek için jeneratör odasında olduğunu iddia ediyor.',
      initialStatus: 'Elleri yağlı ve titriyor, polis sorularından kaçıyor.',
    },
  ],

  clues: {
    clue_stage_dagger: {
      id: 'clue_stage_dagger',
      title: 'Antika Sahne Hançeri',
      category: 'Cinayet Aleti',
      location: 'Kulis Koridoru',
      suspect: 'Melis Vardarlı',
      icon: 'dagger',
      shortDesc: 'Sahne dekorundan alınmış, gerçek çelikten bilenmiş hançer.',
      description:
        'Kör olması gereken antika tiyatro hançerinin ucu zımparalanarak öldürücü bir silaha dönüştürülmüş. Sapındaki kumaş lifleri Melis Vardarlı\'nın saten kostüm eldiveniyle eşleşiyor.',
    },
    clue_fuse_timer: {
      id: 'clue_fuse_timer',
      title: 'Kasıtlı Zaman Ayarlı Röle',
      category: 'Teknik Delil',
      location: 'Ana Pano Odası',
      suspect: 'Rıza Çetin',
      icon: 'zap',
      shortDesc: 'Işıkları tam 21:28\'de kesmek üzere kurulan mekanik röle.',
      description:
        'Elektrik kesintisi tesadüfi bir arıza değildi. Ana panoya bağlanan zamanlayıcı, katile karanlıkta hareket etmesi için 90 saniyelik kör bir pencere sağladı.',
    },
    clue_torn_contract: {
      id: 'clue_torn_contract',
      title: 'Feshedilmiş Sözleşme Taslağı',
      category: 'Belge',
      location: 'Yönetmen Masası',
      suspect: 'Bora Tekin',
      icon: 'file-text',
      shortDesc: 'Hazal\'ın Bora\'yı mahkemeye vermekle tehdit ettiği ihtarname.',
      description:
        'Bora Tekin\'in çekmecesinden çıkan belgede Hazal\'ın yönetmeni yapım bütçesini zimmete geçirmekle suçladığı ve savcılığa gideceğini belirttiği resmi mektup bulunuyor.',
    },
    clue_makeup_gloves: {
      id: 'clue_makeup_gloves',
      title: 'Kan Damlalı Saten Eldiven',
      category: 'Fiziksel Kanıt',
      location: 'Makyaj Odası Çöpü',
      suspect: 'Melis Vardarlı',
      icon: 'eye',
      shortDesc: 'Üzerinde kurbanın kan grubu ve Melis\'in makyaj tozu bulunan eldiven.',
      description:
        'Kostüm odasındaki çöp kutusunun dibine tıkıştırılmış saten eldiven. Cinayet hançerini tutan eldivenle birebir aynı dokuya ve kurbanın kanına sahip.',
    },
    clue_bribe_envelope: {
      id: 'clue_bribe_envelope',
      title: 'Para Dolu Zarf ve Not',
      category: 'Maddi Kanıt',
      location: 'Rıza\'nın Takım Çantası',
      suspect: 'Bora Tekin & Rıza Çetin',
      icon: 'dollar-sign',
      shortDesc: 'Işıkları kesmesi karşılığında Rıza\'ya verilen 200 bin liralık nakit rüşvet.',
      description:
        'Zarfın üzerinde Bora Tekin\'in kulüp anteti var: "Işıkları tam selamdan sonra 2 dakika karart, gerisine karışma."',
    },
  },

  initialNodeId: 'node_stage_arrival',

  nodes: {
    node_stage_arrival: {
      id: 'node_stage_arrival',
      chapter: 1,
      chapterTitle: 'Bölüm 1: Kanlı Prömiyer',
      title: 'Tiyatronun Perde Arkası',
      sceneType: 'theatre_stage',
      text: [
        'Tarihi Şehir Tiyatrosu\'nun kırmızı kadife perdeleri kapalı. Seyirciler polisin megafon anonslarıyla tahliye ediliyor. Sahne arkasındaki ahşap koridorda genç başrol Hazal Kaya yerde yatıyor.',
        'Sırtına saplanan süslü hançer sahne ışıklarının altında parlıyor. Yanındaki aynalı kulis kapılarında kan sıçramaları var. Olay yeri teknisyeni yaklaşıyor: "Başkomiserim, kurban oyun bitip selam verildikten hemen sonra arkadan bıçaklanmış. O sırada 90 saniyelik gizemli bir elektrik kesintisi yaşandı."',
      ],
      clues: ['clue_stage_dagger'],
      choices: [
        {
          id: 'choice_stage_inspect_fuse',
          text: 'Elektrik kesintisini araştırmak için bodrumdaki elektrik pano odasına in.',
          nextNodeId: 'node_stage_fuse_box',
          decisionTag: 'Elektrik pano odası incelendi.',
        },
        {
          id: 'choice_stage_inspect_dressing',
          text: 'Oyuncuların makyaj ve kostüm odalarını ara.',
          nextNodeId: 'node_stage_dressing_room',
          decisionTag: 'Kulis makyaj odaları arandı.',
        },
        {
          id: 'choice_stage_to_interrogation',
          text: 'Yönetmen ve oyuncuları sorgulamak için tiyatro fuayesine geç.',
          nextNodeId: 'node_stage_foyer_interrogate',
          decisionTag: 'Doğrudan fuayedeki şüphelilere gidildi.',
        },
      ],
    },

    node_stage_fuse_box: {
      id: 'node_stage_fuse_box',
      chapter: 1,
      chapterTitle: 'Bölüm 1: Bodrum Katı',
      title: 'Jeneratör ve Pano Odası',
      sceneType: 'fuse_room',
      text: [
        'Tiyatronun rutubetli bodrumunda dev şalterlerin yer aldığı elektrik odasına giriyorsun. Işık Amiri Rıza Çetin panonun önünde ter içinde bekliyor.',
        'Panoya yakından baktığında ana şalterin üzerine harici bir mekanik zaman rölesi monte edildiğini fark ediyorsun! Bu basit bir voltaj dalgalanması değil; tam 21:28\'de salonu zifiri karanlığa boğmak için profesyonelce kurulmuş bir sabotaj düzeneği!',
      ],
      clues: ['clue_fuse_timer'],
      choices: [
        {
          id: 'choice_fuse_search_riza',
          text: 'Rıza\'nın takım çantasını ve dolabını didik didik ara.',
          nextNodeId: 'node_stage_search_riza',
          decisionTag: 'Rıza\'nın eşyaları arandı.',
        },
        {
          id: 'choice_fuse_to_dressing',
          text: 'Kostüm ve makyaj odasına geri dön.',
          nextNodeId: 'node_stage_dressing_room',
          decisionTag: 'Kostüm odasına geçildi.',
        },
      ],
    },

    node_stage_search_riza: {
      id: 'node_stage_search_riza',
      chapter: 1,
      chapterTitle: 'Bölüm 1: Rıza\'nın Sırrı',
      title: 'Takım Çantasındaki Zarf',
      sceneType: 'riza_drawer',
      text: [
        'Ağır metal takım çantasını devirdiğinde penselerin arasından kalın sarı bir zarf düşüyor. İçinde deste halinde 200 bin lira nakit para ve antetli bir not kağıdı var:',
        '"Işıkları tam selamdan sonra 2 dakika karart, gerisine karışma. B.T."',
        'Yönetmen Bora Tekin, elektrik kesintisini planlaması için sahne amirine yüklü bir rüşvet vermiş!',
      ],
      clues: ['clue_bribe_envelope'],
      choices: [
        {
          id: 'choice_search_to_foyer',
          text: 'Bu rüşvet kanıtıyla doğruca Yönetmen Bora\'nın karşısına dikil.',
          nextNodeId: 'node_stage_foyer_interrogate',
          decisionTag: 'Rüşvet kanıtıyla fuayeye gidildi.',
        },
      ],
    },

    node_stage_dressing_room: {
      id: 'node_stage_dressing_room',
      chapter: 2,
      chapterTitle: 'Bölüm 2: Kulis Odaları',
      title: 'Aynalı Makyaj Odası',
      sceneType: 'dressing_room',
      text: [
        'Hazal ile Melis\'in paylaştığı kulis odasında pudra ve taze çiçek kokusu birbirine karışmış. Aynanın üzerine rujla yazılmış bir not var: "Bu gece son gecen."',
        'Makyaj masasının altındaki çöp sepetini karıştırdığında buruşturulup atılmış saten bir kostüm eldiveni buluyorsun. Eldivenin avuç içinde kan izleri var ve cinayette kullanılan hançerin sapındaki liflerle birebir örtüşüyor!',
      ],
      clues: ['clue_makeup_gloves'],
      choices: [
        {
          id: 'choice_dressing_search_director',
          text: 'Yönetmen Bora Tekin\'in kulis ofisine geçip evrakları tara.',
          nextNodeId: 'node_stage_director_office',
          decisionTag: 'Yönetmen ofisi arandı.',
        },
        {
          id: 'choice_dressing_to_foyer',
          text: 'Kanlı eldivenle fuayedeki şüphelileri çapraz sorguya çek.',
          nextNodeId: 'node_stage_foyer_interrogate',
          decisionTag: 'Kanlı eldivenle fuayeye geçildi.',
        },
      ],
    },

    node_stage_director_office: {
      id: 'node_stage_director_office',
      chapter: 2,
      chapterTitle: 'Bölüm 2: Yönetmen Masası',
      title: 'Yönetmenin Gizli Çekmecesi',
      sceneType: 'director_office',
      text: [
        'Yönetmen Bora Tekin\'in deri kaplı çalışma masasını inceliyorsun. Kilitli üst çekmeceyi açtığında resmi bir ihtarname taslağı ortaya çıkıyor.',
        'Hazal Kaya, Bora\'nın yapım fonlarını zimmete geçirdiğini kanıtlamış ve eğer Bora istifa etmezse tüm belgeleri Kültür Bakanlığı\'na ve basına vereceğini bildirmiş. Bora köşeye sıkışmış durumdaydı.',
      ],
      clues: ['clue_torn_contract'],
      choices: [
        {
          id: 'choice_office_to_foyer',
          text: 'Tüm delilleri toparladın. Fuayedeki şüphelileri nihai sorguya al.',
          nextNodeId: 'node_stage_foyer_interrogate',
          decisionTag: 'İhtarname ile fuaye sorgusuna geçildi.',
        },
      ],
    },

    node_stage_foyer_interrogate: {
      id: 'node_stage_foyer_interrogate',
      chapter: 2,
      chapterTitle: 'Bölüm 2: Yüzleşme',
      title: 'Tiyatro Fuayesindeki Şüpheliler',
      sceneType: 'foyer_suspects',
      text: [
        'Görkemli avizelerin altında Yönetmen Bora, Yedek Oyuncu Melis ve Işık Amiri Rıza polis çemberinde bekliyor.',
        'Bora öfkeyle bağırıyor: "Oyunumu mahvettiniz!" Melis titreyerek köşede tırnaklarını inceliyor. Rıza ise gözlerini yere dikmiş.',
        'Artık cinayetin arkasındaki komployu kimin kurduğunu ve tetiği (hançeri) kimin çektiğini açıklama vakti geldi.',
      ],
      clues: [],
      choices: [
        {
          id: 'choice_stage_accuse_chamber',
          text: 'Nihai Hüküm Sahnesi\'ne geç ve katili açıkla.',
          nextNodeId: 'node_stage_verdict',
          decisionTag: 'Nihai karar aşamasına geçildi.',
        },
      ],
    },

    node_stage_verdict: {
      id: 'node_stage_verdict',
      chapter: 3,
      chapterTitle: 'Bölüm 3: Perde Kapanıyor',
      title: 'Nihai Karar Sahnesi',
      sceneType: 'theatre_verdict',
      text: [
        'Tiyatronun sahnesinde ışıklar bir kez daha açılıyor. Katili ilan etmek için sahnenin ortasında duruyorsun.',
        'Hazal Kaya\'yı kim öldürdü, cinayet nasıl planlandı?',
      ],
      clues: [],
      choices: [
        {
          id: 'choice_stage_accuse_melis_and_bora',
          text: 'KATİL ORTAKLIĞI! (Bora ışıkları kararttı ve azmettirdi, Melis hançerleyip başrolü aldı)',
          nextNodeId: 'node_stage_final_conspiracy',
          decisionTag: 'Bora ve Melis ortaklığı suçlandı.',
        },
        {
          id: 'choice_stage_accuse_only_riza',
          text: 'KATİL RIZA ÇETİN! (Işıkları kesti ve kurbanı intikam için öldürdü)',
          nextNodeId: 'node_stage_final_wrong_riza',
          decisionTag: 'Sadece Rıza suçlandı.',
        },
        {
          id: 'choice_stage_accuse_only_melis',
          text: 'KATİL SADECE MELİS VARDARLI! (Kıskançlık krizinde tek başına hareket etti)',
          nextNodeId: 'node_stage_final_wrong_melis',
          decisionTag: 'Sadece Melis bireysel olarak suçlandı.',
        },
        {
          id: 'choice_stage_unsolved',
          text: 'Deliller yetersiz; tiyatro cinayetini faili meçhul bırak.',
          nextNodeId: 'node_stage_final_unsolved',
          decisionTag: 'Soruşturma kapatıldı.',
        },
      ],
    },

    node_stage_final_conspiracy: {
      id: 'node_stage_final_conspiracy',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Komplo Suçlaması',
      sceneType: 'ending_stage_success',
      text: ['Kanıtlar sunuluyor...'],
      clues: [],
      choices: [],
    },
    node_stage_final_wrong_riza: {
      id: 'node_stage_final_wrong_riza',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Rıza Suçlaması',
      sceneType: 'ending_stage_wrong',
      text: ['Rıza kelepçeleniyor...'],
      clues: [],
      choices: [],
    },
    node_stage_final_wrong_melis: {
      id: 'node_stage_final_wrong_melis',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Melis Suçlaması',
      sceneType: 'ending_stage_wrong',
      text: ['Melis kelepçeleniyor...'],
      clues: [],
      choices: [],
    },
    node_stage_final_unsolved: {
      id: 'node_stage_final_unsolved',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Faili Meçhul',
      sceneType: 'ending_stage_unsolved',
      text: ['Dosya rafa kaldırılıyor...'],
      clues: [],
      choices: [],
    },
  },

  endings: {
    ending_stage_perfect: {
      id: 'ending_stage_perfect',
      type: 'correct',
      badge: 'Mükemmel Çözüm — Kanlı Perde İndi',
      title: 'Kulis Kumpasının Sonu',
      rank: 'Efsanevi Başkomiser',
      summary:
        'Yönetmen Bora Tekin ile Yedek Oyuncu Melis arasındaki gizli cinayet ittifakını ve Rıza\'ya ödenen rüşveti eksiksiz deşifre ettin.',
      narrative: [
        'Zaman rölesi kanıtı, rüşvet zarfı, ihtarname ve kanlı saten eldiven mahkemeye sunuldu.',
        'Bora Tekin zimmet suçlamasından kurtulmak için ışıkları sabote ettirmiş, Melis ise başrolü kapma hırsıyla hançeri bizzat saplamıştı. İkisi de ağırlaştırılmış müebbet hapis cezasına çarptırıldı.',
        'Rıza Çetin cinayete yardım ve rüşvetten tutuklandı. Şehir Tiyatrosu\'nda adalet geç de olsa yerini buldu.',
      ],
    },
    ending_stage_insufficient: {
      id: 'ending_stage_insufficient',
      type: 'wrong',
      badge: 'Kusurlu Suçlama — Delil Yetersizliği',
      title: 'Bora\'nın Avukatları Kazandı',
      rank: 'Dikkatsiz Müfettiş',
      summary:
        'Komployu doğru tahmin ettin ancak rüşvet zarfını veya ihtarnameyi bulamadığın için azmettirici serbest kaldı.',
      narrative: [
        'Yönetmen Bora Tekin aleyhine yeterli maddi kanıt sunulamadı. Melis tüm suçu üstlenmek zorunda kaldı ve Bora tiyatrodan yüklü bir tazminat alarak kaçtı.',
      ],
    },
    ending_stage_wrong_riza: {
      id: 'ending_stage_wrong_riza',
      type: 'wrong',
      badge: 'Yanlış Suçlama — Maşa Yandı, Kuklacı Kurtuldu',
      title: 'Eksik Adalet',
      rank: 'Yanıltılmış Soruşturmacı',
      summary:
        'Sadece Işık Amiri Rıza\'yı suçladın; oysa o yalnızca rüşvet alan bir maşaydı.',
      narrative: [
        'Rıza cinayeti işlemediğini, sadece para için şalteri indirdiğini haykırdı. Asıl katil Melis ve azmettirici Bora ellerini kollarını sallayarak tiyatroyu terk etti.',
      ],
    },
    ending_stage_wrong_melis: {
      id: 'ending_stage_wrong_melis',
      type: 'wrong',
      badge: 'Kısmi Çözüm — Azmettirici Gölgede Kaldı',
      title: 'Gölgedeki Yönetmen',
      rank: 'Eksik Soruşturmacı',
      summary:
        'Melis hapse girdi fakat cinayeti planlayan ve ışıkları karartan Yönetmen Bora ceza almadı.',
      narrative: [
        'Melis cinayetten mahkûm edildi. Ancak Bora\'nın zimmet suçu ve cinayetteki kilit planlayıcı rolü açığa çıkarılamadı.',
      ],
    },
    ending_stage_unsolved: {
      id: 'ending_stage_unsolved',
      type: 'unsolved',
      badge: 'Çözülemeyen Vaka — Sessiz Kulis',
      title: 'Tiyatronun Kanlı Sırrı',
      rank: 'Çaresiz Dedektif',
      summary:
        'Hazal Kaya cinayeti delil yetersizliğinden faili meçhul kaldı. Şehir Tiyatrosu uzun süre perdelerini açamadı.',
      narrative: [
        'Soruşturma derinleştirilemedi ve dosya tozlu raflara kaldırıldı.',
      ],
    },
  },

  evaluateEnding(targetNodeId, collectedClueIds = [], _decisionHistory = []) {
    const count = collectedClueIds.length;
    const hasFullConspiracyProof =
      collectedClueIds.includes('clue_stage_dagger') &&
      collectedClueIds.includes('clue_makeup_gloves') &&
      (collectedClueIds.includes('clue_bribe_envelope') || collectedClueIds.includes('clue_torn_contract'));

    if (targetNodeId === 'node_stage_final_conspiracy') {
      if (hasFullConspiracyProof && count >= 3) {
        return this.endings.ending_stage_perfect;
      }
      return this.endings.ending_stage_insufficient;
    }

    if (targetNodeId === 'node_stage_final_wrong_riza') {
      return this.endings.ending_stage_wrong_riza;
    }

    if (targetNodeId === 'node_stage_final_wrong_melis') {
      return this.endings.ending_stage_wrong_melis;
    }

    return this.endings.ending_stage_unsolved;
  },
};

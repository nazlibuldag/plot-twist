/**
 * Vaka 3: Gölgeli Galeri (The Shadow Gallery)
 * 
 * Vaka: Sanat Galerisi Sahibi Ender Taner Cinayeti
 * Şüpheliler: Doğan Alkan (Ressam), Nilüfer Sezgin (Sigorta Müfettişi), Kerem Saygın (Koleksiyoner)
 */

export const caseShadowGallery = {
  id: 'case_shadow_gallery',
  title: 'Gölgeli Galeri',
  subtitle: 'Pera Çağdaş Sanat Galerisi Cinayeti',
  difficulty: 'Zor',
  duration: '20 Dk',
  location: 'Pera Sanat Galerisi, Beyoğlu',
  time: '22 Ekim, 22:15 — Özel Müzayede Gecesi',
  victim: 'Ender Taner (52, Sanat Tüccarı ve Galeri Sahibi)',
  briefing:
    'Milyonluk özel bir müzayede gecesinin ardından, ünlü galeri sahibi Ender Taner VIP dinlenme odasındaki deri koltuğunda ölü bulundu. Duvardaki gizli kasada sergilenen paha biçilmez antika tablo kayıp, masadaki şampanya kadehinde ise ender bulunan bir yüksükotu zehri kalıntısı var.',
  suspects: [
    {
      id: 'dogan',
      name: 'Doğan Alkan',
      role: 'Baş Ressam',
      motive: 'Ender\'in kendi tablolarını sahte imzalarla satıp milyonlar kazandığını öğrenmişti.',
      alibi: 'Cinayet saatinde galeri terasında sigara içtiğini öne sürüyor.',
      initialStatus: 'Ellerinde boya lekeleri var, öfkeli ve fevri.',
    },
    {
      id: 'nilufer',
      name: 'Nilüfer Sezgin',
      role: 'Sigorta Müfettişi',
      motive: 'Çalınan tablonun 20 milyonluk sigorta poliçesini düzenleyen kilit isim.',
      alibi: 'Galerinin güvenlik odasında kamera kayıtlarını incelediğini iddia ediyor.',
      initialStatus: 'Aşırı soğukkanlı, evrak çantasını sıkıca tutuyor.',
    },
    {
      id: 'kerem',
      name: 'Kerem Saygın',
      role: 'Zengin Koleksiyoner',
      motive: 'Tabloyu satın almak istemiş ancak Ender tarafından açık artırmada aşağılanmıştı.',
      alibi: 'Özel şoförünün kendisini saat 22:00\'de aldığını söylüyor.',
      initialStatus: 'Korumaları kapıda bekliyor, sorguya direnç gösteriyor.',
    },
  ],

  clues: {
    clue_digitalis_flute: {
      id: 'clue_digitalis_flute',
      title: 'Zehirli Şampanya Flütü',
      category: 'Adli Tıp',
      location: 'VIP Dinlenme Masası',
      suspect: 'Nilüfer Sezgin & Kerem Saygın',
      icon: 'glass',
      shortDesc: 'İçinde ölümcül Digitalis (yüksükotu ekstresi) bulunan kristal kadeh.',
      description:
        'Kadehteki zehir kalp atışını yavaşlatıp kalp krizini taklit eden saf yüksükotu ekstresi. Kadehin kenarında parmak izi yok, özel bir silikonla silinmiş.',
    },
    clue_uv_forgery: {
      id: 'clue_uv_forgery',
      title: 'Sahte Tablo & UV Fener İzi',
      category: 'Sanat Analizi',
      location: 'Gizli Kasa Arkası',
      suspect: 'Doğan Alkan',
      icon: 'image',
      shortDesc: 'UV ışığı altında boyası henüz 2 günlük olan sahte replika tuval.',
      description:
        'Kasadan çalınan orijinal tablonun yerine aceleyle yerleştirilmiş sahte bir kopya. Kullanılan pigment Doğan Alkan\'ın atölyesindeki özel akrilik boyayla eşleşiyor.',
    },
    clue_insurance_payout: {
      id: 'clue_insurance_payout',
      title: 'Gizli İsviçre Sigorta Protokolü',
      category: 'Finansal Belge',
      location: 'Nilüfer\'in Evrak Çantası',
      suspect: 'Nilüfer Sezgin',
      icon: 'briefcase',
      shortDesc: 'Tablo çalınırsa 15 milyon Euro\'nun offshore hesaba aktarılacağı gizli fon sözleşmesi.',
      description:
        'Nilüfer Sezgin ile Ender Taner\'in ortaklaşa kurduğu sigorta dolandırıcılığı planı. Ancak Nilüfer parayı paylaşmak yerine Ender\'i ortadan kaldırmayı seçmiş.',
    },
    clue_security_dongle: {
      id: 'clue_security_dongle',
      title: 'Manyetik Güvenlik Şifreleyici',
      category: 'Elektronik Kanıt',
      location: 'Galeri Yangın Merdiveni',
      suspect: 'Nilüfer Sezgin',
      icon: 'key',
      shortDesc: 'Kamera kayıtlarını saat 22:00 ile 22:20 arasında döngüye sokan USB cihazı.',
      description:
        'Güvenlik kameralarını donduran cihaz. Güvenlik odasına giriş kartı Nilüfer Sezgin\'in adına kayıtlı.',
    },
  },

  initialNodeId: 'node_gallery_arrival',

  nodes: {
    node_gallery_arrival: {
      id: 'node_gallery_arrival',
      chapter: 1,
      chapterTitle: 'Bölüm 1: Müzayede Gecesi',
      title: 'Pera Galerisi\'ne Giriş',
      sceneType: 'gallery_hall',
      text: [
        'Pera\'nın taş sokaklarında son model arabalar dizili. Galerinin cam cephesinde "Büyük Usta Koleksiyonu" afişleri dalgalanıyor.',
        'VIP odasında kurban Ender Taner kadife koltukta geriye düşmüş, elindeki şampanya kadehi yere devrilmiş. Duvardaki tablonun arkasındaki kasa boşaltılmış. Olay yeri uzmanı: "Başkomiserim, kurban zehirlenmiş ve 20 milyonluk şaheser kayıp!"',
      ],
      clues: ['clue_digitalis_flute'],
      choices: [
        {
          id: 'choice_gallery_inspect_vault',
          text: 'Boş kasayı ve çerçeveyi UV ışığıyla incele.',
          nextNodeId: 'node_gallery_vault',
          decisionTag: 'Kasa ve çerçeve incelendi.',
        },
        {
          id: 'choice_gallery_inspect_security',
          text: 'Galerinin güvenlik ve kamera kontrol odasına git.',
          nextNodeId: 'node_gallery_security_room',
          decisionTag: 'Güvenlik odası incelendi.',
        },
        {
          id: 'choice_gallery_to_lounge',
          text: 'Bekleyen şüphelileri galeri salonunda topla.',
          nextNodeId: 'node_gallery_lounge',
          decisionTag: 'Galeri salonuna geçildi.',
        },
      ],
    },

    node_gallery_vault: {
      id: 'node_gallery_vault',
      chapter: 1,
      chapterTitle: 'Bölüm 1: Sanat Sahteciliği',
      title: 'Gizli Kasa ve Sahte Tablo',
      sceneType: 'gallery_vault',
      text: [
        'Kasaya ultraviyole feneri tutuyorsun. Çerçevedeki tuvalin kurumamış verniği mor ışık altında parlıyor! Bu orijinal bir klasik değil, henüz birkaç gün önce tamamlanmış kusursuz bir replika!',
        'Tuvalin kenarındaki imza Doğan Alkan\'ın fırça darbesi stilini taşıyor.',
      ],
      clues: ['clue_uv_forgery'],
      choices: [
        {
          id: 'choice_vault_to_security',
          text: 'Kamera kayıtlarını incelemek için güvenlik odasına in.',
          nextNodeId: 'node_gallery_security_room',
          decisionTag: 'Kasa ardından güvenlik odasına geçildi.',
        },
        {
          id: 'choice_vault_to_lounge',
          text: 'Ressam Doğan\'ı sorgulamak için salona dön.',
          nextNodeId: 'node_gallery_lounge',
          decisionTag: 'Sahte tuvalle salona dönüldü.',
        },
      ],
    },

    node_gallery_security_room: {
      id: 'node_gallery_security_room',
      chapter: 2,
      chapterTitle: 'Bölüm 2: Silinen Kayıtlar',
      title: 'Güvenlik Odasındaki Tuzak',
      sceneType: 'security_room',
      text: [
        'Sunucu odasında monitörler karıncalanıyor. Yangın çıkışına giden kapının pervazında yere düşmüş küçük siyah bir dongle buluyorsun.',
        'Dongle sisteme takıldığında saat 22:00 ile 22:20 arasındaki kayıtları dondurmuş. Kapı giriş logunda Sigorta Müfettişi Nilüfer Sezgin\'in kartı var!',
        'Nilüfer\'in masasında unuttuğu deri çantada ise 15 milyon Euro\'luk sahte sigorta poliçesi ve İsviçre hesap evrakları duruyor.',
      ],
      clues: ['clue_security_dongle', 'clue_insurance_payout'],
      choices: [
        {
          id: 'choice_security_to_lounge',
          text: 'Tüm deliller toplandı. Salondaki şüphelilerle büyük yüzleşmeye geç.',
          nextNodeId: 'node_gallery_lounge',
          decisionTag: 'Sigorta delilleriyle salona dönüldü.',
        },
      ],
    },

    node_gallery_lounge: {
      id: 'node_gallery_lounge',
      chapter: 2,
      chapterTitle: 'Bölüm 2: Şüpheliler Masası',
      title: 'Galeri Salonundaki Yüzleşme',
      sceneType: 'gallery_suspects',
      text: [
        'Modern heykellerin arasında Ressam Doğan, Sigorta Müfettişi Nilüfer ve Koleksiyoner Kerem gergin bekleyiş içinde.',
        'Doğan: "Ender eserlerimi çaldı ama ben katil değilim!" Nilüfer çantasını arıyor, Kerem ise avukatını aramakla tehdit ediyor.',
        'Bu cinayeti kim planladı, zehri kim verdi?',
      ],
      clues: [],
      choices: [
        {
          id: 'choice_gallery_to_verdict',
          text: 'Nihai Hüküm Odası\'na geç ve suçlamayı yap.',
          nextNodeId: 'node_gallery_verdict',
          decisionTag: 'Galeri nihai kararına geçildi.',
        },
      ],
    },

    node_gallery_verdict: {
      id: 'node_gallery_verdict',
      chapter: 3,
      chapterTitle: 'Bölüm 3: Hüküm',
      title: 'Sanat Cinayetinin Sonu',
      sceneType: 'gallery_verdict',
      text: [
        'Ender Taner\'in katilini ve tablo soygununu aydınlatma vakti.',
      ],
      clues: [],
      choices: [
        {
          id: 'choice_gallery_accuse_nilufer',
          text: 'KATİL NİLÜFER SEZGİN! (15 Milyon Euro sigorta vurgunu, kamera sabotajı ve zehirleme)',
          nextNodeId: 'node_gallery_final_nilufer',
          decisionTag: 'Nilüfer suçlandı.',
        },
        {
          id: 'choice_gallery_accuse_dogan',
          text: 'KATİL DOĞAN ALKAN! (Telif öfkesi ve sahte replika tuval)',
          nextNodeId: 'node_gallery_final_wrong_dogan',
          decisionTag: 'Doğan suçlandı.',
        },
        {
          id: 'choice_gallery_accuse_kerem',
          text: 'KATİL KEREM SAYGIN! (Koleksiyon hırsı ve müzayede intikamı)',
          nextNodeId: 'node_gallery_final_wrong_kerem',
          decisionTag: 'Kerem suçlandı.',
        },
        {
          id: 'choice_gallery_unsolved',
          text: 'Dosyayı delil yetersizliğinden faili meçhul bırak.',
          nextNodeId: 'node_gallery_final_unsolved',
          decisionTag: 'Galeri vakası kapatıldı.',
        },
      ],
    },

    node_gallery_final_nilufer: {
      id: 'node_gallery_final_nilufer',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Nilüfer Suçlaması',
      sceneType: 'ending_nilufer',
      text: ['Nilüfer suçlanıyor...'],
      clues: [],
      choices: [],
    },
    node_gallery_final_wrong_dogan: {
      id: 'node_gallery_final_wrong_dogan',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Doğan Suçlaması',
      sceneType: 'ending_wrong_dogan',
      text: ['Doğan suçlanıyor...'],
      clues: [],
      choices: [],
    },
    node_gallery_final_wrong_kerem: {
      id: 'node_gallery_final_wrong_kerem',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Kerem Suçlaması',
      sceneType: 'ending_wrong_kerem',
      text: ['Kerem suçlanıyor...'],
      clues: [],
      choices: [],
    },
    node_gallery_final_unsolved: {
      id: 'node_gallery_final_unsolved',
      chapter: 3,
      chapterTitle: 'Final',
      title: 'Faili Meçhul',
      sceneType: 'ending_gallery_unsolved',
      text: ['Dosya kapatılıyor...'],
      clues: [],
      choices: [],
    },
  },

  endings: {
    ending_gallery_perfect: {
      id: 'ending_gallery_perfect',
      type: 'correct',
      badge: 'Mükemmel Çözüm — Sahte Şaheserin Sonu',
      title: 'Pera Vurgununun Çöküşü',
      rank: 'Efsanevi Başkomiser',
      summary:
        'Sigorta Müfettişi Nilüfer Sezgin\'in kusursuz sandığı 15 milyon Euro\'luk cinayet ve soygun planını maddi delillerle çökerttin.',
      narrative: [
        'Zehirli kadeh, kamera sabotaj dongle\'ı ve gizli İsviçre offshore poliçesi masaya kondu.',
        'Nilüfer suçunu itiraf etti: Ender ile birlikte tabloyu sahtesiyle değiştirip sigortadan para koparacaklardı; ancak Nilüfer parayı paylaşmamak için Ender\'in kadehine yüksükotu zehri koymuştu.',
        'Orijinal tablo Nilüfer\'in özel kasasında bulundu ve müzeye iade edildi.',
      ],
    },
    ending_gallery_insufficient: {
      id: 'ending_gallery_insufficient',
      type: 'wrong',
      badge: 'Kusurlu Suçlama — Delil Yetersizliği',
      title: 'Müfettişin Tahliyesi',
      rank: 'Dikkatsiz Müfettiş',
      summary:
        'Nilüfer\'i suçladın ancak kamera dongle\'ını ve İsviçre hesap evrakını bulamadığın için serbest kaldı.',
      narrative: [
        'Somut delil eksikliğinden Nilüfer beraat etti ve İsviçre\'ye kaçarak milyonluk sigorta parasını tahsil etti.',
      ],
    },
    ending_gallery_wrong_dogan: {
      id: 'ending_gallery_wrong_dogan',
      type: 'wrong',
      badge: 'Yanlış Suçlama — Ressamın Kahrı',
      title: 'Haksız Mahkûmiyet',
      rank: 'Yanıltılmış Soruşturmacı',
      summary:
        'Doğan sahte kopyayı çizmişti ancak cinayetten haberi yoktu; asıl katil Nilüfer kurtuldu.',
      narrative: [
        'Doğan cezaevine gönderildi, asıl katil Nilüfer ise tablonun sigorta bedeliyle yurt dışına kaçtı.',
      ],
    },
    ending_gallery_wrong_kerem: {
      id: 'ending_gallery_wrong_kerem',
      type: 'wrong',
      badge: 'Yanlış Suçlama — Masum Koleksiyoner',
      title: 'Zengin Şüphelinin Zaferi',
      rank: 'Önyargılı Dedektif',
      summary:
        'Kerem sadece zengin bir alıcıydı; cinayetle hiçbir ilgisi olmadığı anlaşıldı.',
      narrative: [
        'Kerem tazminat davası açtı, gerçek katil Nilüfer izini kaybettirdi.',
      ],
    },
    ending_gallery_unsolved: {
      id: 'ending_gallery_unsolved',
      type: 'unsolved',
      badge: 'Çözülemeyen Vaka — Gölgeli Tablo',
      title: 'Pera\'nın Kayıp Şaheseri',
      rank: 'Çaresiz Dedektif',
      summary:
        'Dosya çözülemedi; Pera Galerisi kapandı ve vaka arşivlerde unutuldu.',
      narrative: [
        'Cinayet ve soygun faili meçhul kaldı.',
      ],
    },
  },

  evaluateEnding(targetNodeId, collectedClueIds = [], _decisionHistory = []) {
    const count = collectedClueIds.length;
    const hasFullProof =
      collectedClueIds.includes('clue_digitalis_flute') &&
      collectedClueIds.includes('clue_security_dongle') &&
      collectedClueIds.includes('clue_insurance_payout');

    if (targetNodeId === 'node_gallery_final_nilufer') {
      if (hasFullProof && count >= 3) {
        return this.endings.ending_gallery_perfect;
      }
      return this.endings.ending_gallery_insufficient;
    }

    if (targetNodeId === 'node_gallery_final_wrong_dogan') {
      return this.endings.ending_gallery_wrong_dogan;
    }

    if (targetNodeId === 'node_gallery_final_wrong_kerem') {
      return this.endings.ending_gallery_wrong_kerem;
    }

    return this.endings.ending_gallery_unsolved;
  },
};

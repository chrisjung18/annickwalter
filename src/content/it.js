/**
 * Tutti i testi del sito in italiano. Modificali liberamente.
 * I segnaposto tra parentesi graffe, come {deadline}, vengono riempiti dal sito.
 * Mantieni la stessa struttura di fr.js ed en.js.
 */
export default {
  docTitle: names => `${names} si sposano`,

  intro: {
    hook: 'Tratto da una storia vera…',
    open: 'Clicca per aprire',
    openLabel: 'Apri l’invito',
    skip: 'Salta l’intro'
  },

  top: {
    label: 'MATRIMONIO',
    badge: 'TOP 10 IN ITALIA',
    home: 'Torna in alto',
    language: 'Lingua'
  },

  hero: {
    countdown: 'IL NOSTRO MATRIMONIO TRA',
    days: 'GIORNI',
    hours: 'ORE',
    minutes: 'MINUTI',
    seconds: 'SECONDI',
    today: 'Oggi è il grande giorno!'
  },

  invite: {
    script: 'Sì, per la vita!',
    lead: 'Siete invitati a condividere con noi il giorno del nostro matrimonio',
    dateLead: 'IL {date}',
    text: 'Per una festa di amore e gioia, circondati dalle persone che amiamo, in un giorno che per noi vale tutto.',
    tag: '100% ROMANTICO',
    rsvp: 'Conferma ora'
  },

  actions: {
    list: 'La mia lista',
    listAdded: 'Aggiunto',
    listHint: 'Aggiungi al mio calendario',
    rate: 'Mi piace',
    rated: 'Grazie!',
    share: 'Condividi',
    copied: 'Link copiato',
    copyFail: 'Copia questo link: {url}'
  },

  film: {
    ring: 'CLICCA QUI PER GUARDARE IL VIDEO',
    play: 'Guarda il video',
    replay: 'Guarda di nuovo'
  },

  venues: {
    label: 'LOVE',
    title: 'LUOGHI DEL MATRIMONIO',
    sub: 'DOVE ANDARE',
    route: 'Indicazioni stradali',
    kinds: ['Cerimonia religiosa', 'Ricevimento serale']
  },

  programme: {
    title: 'Programma',
    sub: 'DEL MATRIMONIO',
    play: 'Riproduci',
    info: 'Altre info',
    less: 'Meno info',
    items: ['Cerimonia religiosa', 'Ricevimento serale'],
    more: 'Le porte della chiesa aprono alle 16:30. Dopo la cerimonia ci sarà un aperitivo, poi ci trasferiremo nella sala del ricevimento per la cena e le danze. L’ultimo brano sarà suonato verso le 3 di notte.'
  },

  story: {
    title: 'La nostra storia',
    paragraphs: [
      'La nostra storia non è iniziata come nei film. C’è stato un malinteso, un ombrello dimenticato e un lungo viaggio in tram in cui nessuno osava parlare per primo.',
      'Poi gli anni sono passati: traslochi, risate, litigi sulla playlist e albe passate a sognare in grande. Ogni tappa ci ha insegnato ad ascoltarci meglio.',
      'Oggi vogliamo festeggiare ciò che abbiamo costruito con le persone che ci hanno sostenuti. Il meglio deve ancora essere scritto, e vogliamo cominciare con voi.'
    ]
  },

  dress: {
    label: 'FASHION',
    title: 'DRESS CODE',
    theme: 'Red carpet a colori',
    dayLabel: 'Idea di outfit per il giorno:',
    dayValue: 'colorato',
    dayNote: 'I cappelli sono i benvenuti.',
    eveningLabel: 'Idea di outfit per la sera:',
    eveningValue: 'chic ed elegante',
    eveningNote: 'Portate scarpe comode per ballare.',
    dayAlt: 'Idea di outfit per il giorno',
    eveningAlt: 'Idea di outfit per la sera'
  },

  stay: {
    title: 'Dove dormire',
    sub: 'suggerimenti',
    play: 'Riproduci',
    info: 'Altre info',
    less: 'Meno info',
    more: 'Questi hotel sono vicini alla chiesa. Prenotate presto: nel weekend del matrimonio le camere vanno a ruba.',
    from: 'DA',
    distance: n => `A ${n} min in auto dalla cerimonia religiosa`,
    maps: 'MAPPA',
    book: 'PRENOTA'
  },

  faq: {
    note: 'Questo invito è personale. Vi preghiamo di non portare persone che non sono indicate sul vostro invito.',
    title: 'FAQ',
    items: [
      {
        q: 'Entro quando devo rispondere all’invito?',
        a: 'Vi chiediamo di rispondere entro il {deadline}. Se non poteste più venire, avvisateci il prima possibile.'
      },
      {
        q: 'Posso portare un accompagnatore?',
        a: 'Per ragioni organizzative, vi chiediamo di venire solo con le persone indicate sul vostro invito. Non potremo accogliere ospiti a sorpresa.'
      },
      {
        q: 'C’è un dress code?',
        a: 'Sì: outfit colorati e cappelli benvenuti di giorno, chic ed eleganti la sera. Troverete qualche idea nella sezione «Dress code».'
      },
      {
        q: 'I bambini sono invitati?',
        a: 'Sono attesi solo i bambini indicati sul vostro invito. È previsto un menù per bambini.'
      },
      {
        q: 'Dove posso condividere le mie foto?',
        a: 'Con l’hashtag {hashtag}. Raccoglieremo tutte le vostre foto dopo il matrimonio.'
      }
    ]
  },

  rsvp: {
    label: 'RSVP',
    title: 'Festeggerete con noi?',
    text: 'Basta un minuto. Vi chiediamo di rispondere entro il {deadline} per permetterci di organizzare i tavoli e il pranzo.',
    name: 'Nome e cognome',
    nameError: 'Inserite il vostro nome e cognome',
    email: 'E-mail',
    emailHint: 'Usata solo per inviarvi le informazioni sul grande giorno.',
    emailError: 'Inserite un indirizzo e-mail valido',
    attendingLegend: 'Potete venire?',
    yes: 'Sì, ci sarò',
    no: 'Mi dispiace, non posso',
    attendingError: 'Diteci se potete venire.',
    guests: 'Numero di persone, voi inclusi',
    guestsLess: 'Una persona in meno',
    guestsMore: 'Una persona in più',
    menu: 'Menù della cena',
    menuError: 'Scegliete un menù',
    menus: {
      meat: 'Carne',
      fish: 'Pesce',
      vegetarian: 'Vegetariano',
      vegan: 'Vegano',
      children: 'Menù bambini'
    },
    note: 'Allergie, una canzone per ballare, due parole per noi',
    submit: 'Invia la mia risposta',
    error: 'Non è stato possibile inviare la risposta. Controllate la connessione e riprovate.',
    doneYesTitle: 'A presto, {name}!',
    doneNoTitle: 'Ci mancherai, {name}.',
    doneYesText: 'La vostra risposta è arrivata. Contiamo i giorni fino al {date}.',
    doneNoText: 'Grazie di avercelo detto. Alzeremo un calice alla vostra salute.',
    ticketTitle: 'Posto riservato',
    ticketGuests: n => `${n} ${n > 1 ? 'persone' : 'persona'}`,
    change: 'Modifica la mia risposta'
  },

  end: {
    script: 'A presto!',
    terms: 'Condizioni e assistenza',
    privacy: 'Informativa sulla privacy',
    legalText: 'Sostituite questo testo con le vostre informazioni pratiche o legali (contatti, trattamento dei dati degli ospiti, ecc.).',
    close: 'Chiudi',
    shareHashtag: 'Condividete le vostre foto con {hashtag}'
  }
}

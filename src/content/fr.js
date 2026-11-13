/**
 * All the French texts of the site. Edit freely.
 * Placeholders in curly braces, like {deadline}, are filled in by the site.
 * The English version is in en.js and must keep the same structure.
 */
export default {
  docTitle: names => `${names} se marient`,

  intro: {
    hook: 'D’après une histoire vraie…',
    open: 'Cliquez pour ouvrir',
    openLabel: 'Ouvrir l’invitation',
    skip: 'Passer l’intro'
  },

  top: {
    label: 'WEDDING',
    badge: 'TOP 10 EN ITALIE',
    home: 'Retour en haut',
    language: 'Langue'
  },

  hero: {
    countdown: 'NOTRE MARIAGE DANS',
    days: 'JOURS',
    hours: 'HEURES',
    minutes: 'MINUTES',
    seconds: 'SECONDES',
    today: 'C’est aujourd’hui !'
  },

  invite: {
    script: 'Oui pour la vie !',
    lead: 'Vous êtes conviés à prendre part à notre mariage',
    dateLead: 'LE {date}',
    text: 'Pour une célébration d’amour et de joie, entourés de ceux qu’on aime, pour un jour qui compte à nos yeux.',
    tag: '100% ROMANCE',
    rsvp: 'RSVP dès maintenant'
  },

  actions: {
    list: 'Ma liste',
    listAdded: 'Ajouté',
    listHint: 'Ajouter à mon agenda',
    rate: 'J’aime',
    rated: 'Merci !',
    share: 'Partager',
    copied: 'Lien copié',
    copyFail: 'Copiez ce lien : {url}'
  },

  film: {
    ring: 'CLIQUEZ ICI POUR LANCER LA VIDÉO',
    play: 'Lancer la vidéo',
    replay: 'Revoir la vidéo'
  },

  venues: {
    label: 'LOVE',
    title: 'LIEU DE LA CÉRÉMONIE',
    sub: 'DE MARIAGE',
    route: 'Itinéraire ici',
    kinds: ['Cérémonie religieuse', 'Réception de la soirée']
  },

  programme: {
    title: 'Programme',
    sub: 'DU MARIAGE',
    play: 'Lecture',
    info: 'Plus d’infos',
    less: 'Moins d’infos',
    items: ['Cérémonie religieuse', 'Réception soirée'],
    more: 'Les portes de l’église ouvrent à 16h30. Un vin d’honneur suivra la cérémonie, puis nous rejoindrons la salle de réception pour le dîner et la soirée dansante. Le dernier morceau sera joué vers 3h00.'
  },

  story: {
    title: 'Notre histoire',
    paragraphs: [
      'Notre histoire n’a pas commencé comme dans les films. Il y a eu un malentendu, un parapluie oublié et un long trajet en tramway où personne n’osait parler en premier.',
      'Puis les années ont passé : des déménagements, des fous rires, des désaccords sur la playlist et des petits matins à rêver trop grand. Chaque étape nous a appris à mieux nous écouter.',
      'Aujourd’hui, nous avons envie de fêter ce que nous avons construit avec les personnes qui nous ont portés. Le meilleur reste à écrire, et nous voulons le commencer avec vous.'
    ]
  },

  dress: {
    label: 'FASHION',
    title: 'DRESS CODE',
    theme: 'Tapis rouge en couleurs',
    dayLabel: 'Idée tenue journée :',
    dayValue: 'colorée',
    dayNote: 'Les chapeaux sont les bienvenus.',
    eveningLabel: 'Idée tenue soirée :',
    eveningValue: 'chic et élégante',
    eveningNote: 'Pensez à des chaussures confortables pour danser.',
    dayAlt: 'Idée de tenue de journée',
    eveningAlt: 'Idée de tenue de soirée'
  },

  stay: {
    title: 'Hébergements',
    sub: 'suggérés',
    play: 'Lecture',
    info: 'Plus d’infos',
    less: 'Moins d’infos',
    more: 'Ces hôtels sont proches de l’église. Pensez à réserver tôt : le week-end du mariage, les chambres partent vite.',
    from: 'À PARTIR DE',
    distance: n => `À ${n} min en voiture de la cérémonie religieuse`,
    maps: 'MAPS',
    book: 'RÉSERVER'
  },

  faq: {
    note: 'Cette invitation est personnelle. Merci de ne pas prévoir d’accompagnement qui ne figure pas sur votre invitation.',
    title: 'FAQ',
    items: [
      {
        q: 'Quand dois-je répondre à l’invitation ?',
        a: 'Merci de répondre avant le {deadline}. Si vous ne pouvez finalement plus venir, prévenez-nous dès que possible.'
      },
      {
        q: 'Puis-je venir accompagné(e) ?',
        a: 'Par souci de logistique, nous vous prions de ne venir qu’avec les personnes mentionnées sur votre invitation. Aucun invité surprise ne pourra être accueilli.'
      },
      {
        q: 'Y a-t-il un dress code ?',
        a: 'Oui : tenue colorée et chapeaux bienvenus pour la journée, tenue chic et élégante pour la soirée. Vous trouverez des idées dans la section « Dress code ».'
      },
      {
        q: 'Les enfants sont-ils invités ?',
        a: 'Seuls les enfants mentionnés sur votre invitation sont attendus. Un menu enfant est prévu pour eux.'
      },
      {
        q: 'Où partager mes photos ?',
        a: 'Avec le hashtag {hashtag}. Nous réunirons toutes vos photos après le mariage.'
      }
    ]
  },

  rsvp: {
    label: 'RSVP',
    title: 'Serez-vous des nôtres ?',
    text: 'Une minute suffit. Merci de répondre avant le {deadline} pour que nous puissions organiser les tables et le repas.',
    name: 'Nom complet',
    nameError: 'Entrez votre nom complet',
    email: 'E-mail',
    emailHint: 'Uniquement pour vous envoyer les informations sur le grand jour.',
    emailError: 'Entrez une adresse e-mail valide',
    attendingLegend: 'Pouvez-vous venir ?',
    yes: 'Oui, je serai là',
    no: 'Désolé, je ne peux pas',
    attendingError: 'Dites-nous si vous pouvez venir.',
    guests: 'Nombre de personnes, vous inclus',
    guestsLess: 'Une personne de moins',
    guestsMore: 'Une personne de plus',
    menu: 'Menu du dîner',
    menuError: 'Choisissez un menu',
    menus: {
      meat: 'Viande',
      fish: 'Poisson',
      vegetarian: 'Végétarien',
      vegan: 'Vegan',
      children: 'Menu enfant'
    },
    note: 'Allergies, chanson à danser, un mot pour nous',
    submit: 'Envoyer ma réponse',
    error: 'Votre réponse n’a pas pu être envoyée. Vérifiez votre connexion et réessayez.',
    doneYesTitle: 'À très vite, {name} !',
    doneNoTitle: 'Vous allez nous manquer, {name}.',
    doneYesText: 'Votre réponse est bien reçue. Nous comptons les jours jusqu’au {date}.',
    doneNoText: 'Merci de nous l’avoir dit. Nous lèverons un verre à votre santé.',
    ticketTitle: 'Place réservée',
    ticketGuests: n => `${n} personne${n > 1 ? 's' : ''}`,
    change: 'Modifier ma réponse'
  },

  end: {
    script: 'À très bientôt !',
    terms: 'Conditions et assistance',
    privacy: 'Politique de confidentialité',
    legalText: 'Remplacez ce texte par vos informations pratiques ou légales (contact, gestion des données des invités, etc.).',
    close: 'Fermer',
    shareHashtag: 'Partagez vos photos avec {hashtag}'
  }
}

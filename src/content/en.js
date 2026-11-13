/**
 * All the English texts of the site. Edit freely.
 * Placeholders in curly braces, like {deadline}, are filled in by the site.
 * Keep the same structure as fr.js.
 */
export default {
  docTitle: names => `${names} are getting married`,

  intro: {
    hook: 'Based on a true story…',
    open: 'Click to open',
    openLabel: 'Open the invitation',
    skip: 'Skip intro'
  },

  top: {
    label: 'WEDDING',
    badge: 'TOP 10 IN ITALY',
    home: 'Back to the top',
    language: 'Language'
  },

  hero: {
    countdown: 'OUR WEDDING IN',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS',
    today: 'Today is the day!'
  },

  invite: {
    script: 'Yes, for life!',
    lead: 'You are invited to join us at our wedding',
    dateLead: 'ON {date}',
    text: 'For a celebration of love and joy, surrounded by the people we love, on a day that means the world to us.',
    tag: '100% ROMANCE',
    rsvp: 'RSVP now'
  },

  actions: {
    list: 'My list',
    listAdded: 'Added',
    listHint: 'Add to my calendar',
    rate: 'Like',
    rated: 'Thank you!',
    share: 'Share',
    copied: 'Link copied',
    copyFail: 'Copy this link: {url}'
  },

  film: {
    ring: 'CLICK HERE TO PLAY THE VIDEO',
    play: 'Play the video',
    replay: 'Watch again'
  },

  venues: {
    label: 'LOVE',
    title: 'WEDDING VENUES',
    sub: 'WHERE TO GO',
    route: 'Get directions',
    kinds: ['Religious ceremony', 'Evening reception']
  },

  programme: {
    title: 'Programme',
    sub: 'OF THE WEDDING',
    play: 'Play',
    info: 'More info',
    less: 'Less info',
    items: ['Religious ceremony', 'Evening reception'],
    more: 'The church doors open at 4:30 pm. A drinks reception follows the ceremony, then we move to the reception hall for dinner and dancing. The last song is played around 3 am.'
  },

  story: {
    title: 'Our story',
    paragraphs: [
      'Our story did not begin like in the movies. There was a misunderstanding, a forgotten umbrella and a long tram ride where nobody dared to speak first.',
      'Then the years went by: moves, laughter, arguments about the playlist and early mornings spent dreaming too big. Each step taught us to listen to each other better.',
      'Today we want to celebrate what we built with the people who carried us. The best is still to be written, and we want to start it with you.'
    ]
  },

  dress: {
    label: 'FASHION',
    title: 'DRESS CODE',
    theme: 'Red carpet in colour',
    dayLabel: 'Daytime outfit idea:',
    dayValue: 'colourful',
    dayNote: 'Hats are welcome.',
    eveningLabel: 'Evening outfit idea:',
    eveningValue: 'chic and elegant',
    eveningNote: 'Bring comfortable shoes for dancing.',
    dayAlt: 'Daytime outfit idea',
    eveningAlt: 'Evening outfit idea'
  },

  stay: {
    title: 'Where to stay',
    sub: 'suggestions',
    play: 'Play',
    info: 'More info',
    less: 'Less info',
    more: 'These hotels are close to the church. Book early: rooms go fast on the wedding weekend.',
    from: 'FROM',
    distance: n => `${n} min by car from the religious ceremony`,
    maps: 'MAPS',
    book: 'BOOK'
  },

  faq: {
    note: 'This invitation is personal. Please do not bring anyone who is not named on your invitation.',
    title: 'FAQ',
    items: [
      {
        q: 'When should I reply to the invitation?',
        a: 'Please reply before {deadline}. If you can no longer make it, let us know as soon as possible.'
      },
      {
        q: 'Can I bring a guest?',
        a: 'For logistical reasons, please come only with the people named on your invitation. We cannot welcome surprise guests.'
      },
      {
        q: 'Is there a dress code?',
        a: 'Yes: colourful outfits and hats are welcome for the day, chic and elegant for the evening. You will find ideas in the "Dress code" section.'
      },
      {
        q: 'Are children invited?',
        a: 'Only the children named on your invitation are expected. A children’s menu is available.'
      },
      {
        q: 'Where can I share my photos?',
        a: 'With the hashtag {hashtag}. We will gather all your photos after the wedding.'
      }
    ]
  },

  rsvp: {
    label: 'RSVP',
    title: 'Will you celebrate with us?',
    text: 'It takes a minute. Please reply before {deadline} so we can plan the tables and the food.',
    name: 'Full name',
    nameError: 'Enter your full name',
    email: 'Email',
    emailHint: 'Only used to send you updates about the big day.',
    emailError: 'Enter a valid email address',
    attendingLegend: 'Can you come?',
    yes: 'Yes, I’ll be there',
    no: 'Sorry, I can’t',
    attendingError: 'Tell us whether you can come.',
    guests: 'Number of guests, including you',
    guestsLess: 'One fewer guest',
    guestsMore: 'One more guest',
    menu: 'Dinner menu',
    menuError: 'Choose a menu',
    menus: {
      meat: 'Meat',
      fish: 'Fish',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      children: 'Children’s menu'
    },
    note: 'Allergies, a song to dance to, a word for us',
    submit: 'Send my reply',
    error: 'We could not send your reply. Check your connection and try again.',
    doneYesTitle: 'See you there, {name}!',
    doneNoTitle: 'We will miss you, {name}.',
    doneYesText: 'Your reply is in. We are counting down to {date}.',
    doneNoText: 'Thank you for letting us know. We will raise a glass to you.',
    ticketTitle: 'Seat reserved',
    ticketGuests: n => `${n} guest${n > 1 ? 's' : ''}`,
    change: 'Change my reply'
  },

  end: {
    script: 'See you there!',
    terms: 'Terms and support',
    privacy: 'Privacy policy',
    legalText: 'Replace this text with your practical or legal information (contact, how guest data is handled, etc.).',
    close: 'Close',
    shareHashtag: 'Share your photos with {hashtag}'
  }
}

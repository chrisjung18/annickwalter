import { defineStore } from 'pinia'

export const useWeddingStore = defineStore('wedding', {
  state: () => ({
    partnerA: 'Annick',
    partnerB: 'Walter',

    // Date and time of the ceremony, with the UTC offset of the venue
    dateISO: '2027-06-19T17:00:00+02:00',
    timeZone: 'Europe/Rome',

    defaultLang: 'en',

    showIntro: true,

    hashtag: '#AnnickEWalter',
    rsvpDeadlineISO: '2027-05-08T12:00:00+02:00',

    maxGuests: 2,

    // RSVP replies are POSTed here as JSON (Formspree, Google Apps Script, your API...).
    // Leave empty to keep replies in the visitor's browser only (demo mode).
    rsvpEndpoint: '',

    images: {
      hero: '/images/hero-couple.jpg',
      dateStrip: '/images/date-strip.svg',
      filmPoster: '/images/film-poster.svg',
      end: '/images/end-couple.jpg'
    },

    // The video of the couple. Replace the file or point this to a hosted .mp4
    video: '/media/film.mp4',

    // Same order as `venues.kinds` in the content files
    venues: [
      {
        place: 'Chiesa di San Gaetano',
        address: 'Via Altinate 12, 35121 Padova PD, Italia',
        image: '/images/venue-church.jpg'
      },
      {
        place: 'Sala Ricevimenti Prato',
        address: 'Via Umberto I 48, 35123 Padova PD, Italia',
        image: '/images/venue-hall.jpg'
      }
    ],

    // Same order as `programme.items` in the content files
    schedule: [
      { start: '17:00', end: '18:00', image: '/images/venue-church.jpg' },
      { start: '18:30', end: '03:00', image: '/images/venue-hall.jpg' }
    ],

    storyPhotos: ['/images/story-1.jpg', '/images/story-2.jpg', '/images/story-3.jpg'],

    dressDay: ['/images/dress-day-1.svg', '/images/dress-day-2.svg', '/images/dress-day-3.svg'],
    dressEvening: ['/images/dress-eve-1.svg', '/images/dress-eve-2.svg', '/images/dress-eve-3.svg'],

    hotels: [
      {
        name: 'Hotel Santa Giustina',
        category: '3 ★',
        distanceMin: 6,
        price: '125€',
        image: '/images/hotel-1.jpg',
        address: 'Via Roma 3, 35122 Padova PD, Italia',
        bookUrl: 'https://example.com/book/santa-giustina'
      },
      {
        name: 'Palazzo Euganeo',
        category: '4 ★',
        distanceMin: 9,
        price: '161€',
        image: '/images/hotel-2.jpg',
        address: 'Via San Francesco 27, 35121 Padova PD, Italia',
        bookUrl: 'https://example.com/book/palazzo-euganeo'
      },
      {
        name: 'Hotel Prato della Valle',
        category: '2 ★',
        distanceMin: 12,
        price: '89€',
        image: '/images/hotel-3.jpg',
        address: 'Via Cavour 9, 35137 Padova PD, Italia',
        bookUrl: 'https://example.com/book/prato-della-valle'
      },
      {
        name: 'Locanda della Stazione',
        category: '2 ★',
        distanceMin: 15,
        price: '91€',
        image: '/images/hotel-4.jpg',
        address: 'Piazzale Stazione 1, 35131 Padova PD, Italia',
        bookUrl: 'https://example.com/book/stazione'
      }
    ]
  }),

  getters: {
    names: state => `${state.partnerA} & ${state.partnerB}`,
    initials: state => `${state.partnerA.charAt(0)}&${state.partnerB.charAt(0)}`,
    monogram: state => state.partnerA.charAt(0).toUpperCase(),
    date: state => new Date(state.dateISO),
    deadline: state => new Date(state.rsvpDeadlineISO)
  }
})

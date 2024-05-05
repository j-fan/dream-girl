import type { GiftType } from './types';

export const allGifts: GiftType[] = [
  'AlarmClock',
  'Ring',
  'Rose',
  'Handbag',
  'Car',
  'FortuneCookie',
  'CrystalBall',
  'Handcuffs',
  'Elixir',
  'Puzzle'
];

type GiftDetail = {
  title: string;
  description: string;
  cost: number;
  image: string;
};

export const giftDetails: Record<GiftType, GiftDetail> = {
  AlarmClock: {
    title: 'Affectionate Alarm Clock',
    description:
      "An alarm clock that wakes you up with loving messages from your partner, reminding you that you're cherished and loved even before you start your day.",
    cost: 200,
    image: '/img/alarm.png'
  },
  Car: {
    title: 'Loyalty Leasing Luxury Vehicle',
    description:
      "A luxury sports car available for lease on a monthly basis, with the option to renew the lease contingent on your partner's fidelity. If they stray, the lease automatically terminates, and the car is repossessed until they prove their loyalty.",
    cost: 750,
    image: '/img/car.png'
  },
  CrystalBall: {
    title: 'Communication Crystal Ball',
    description:
      'A crystal ball that grants the ability for your lover to instantly see your point of view when they disagree with you',
    cost: 250,
    image: '/img/crystal-ball.png'
  },
  Elixir: {
    title: 'Intimacy Elixir',
    description:
      'A potion that enhances emotional connection and intimacy between partners, helping to overcome barriers to vulnerability and deepen bonds.',
    cost: 300,
    image: '/img/elixir.png'
  },
  FortuneCookie: {
    title: 'Commitment Confirming Cookies',
    description:
      'A batch of cookies with fortunes that all predict a long and happy future together.',
    cost: 100,
    image: '/img/fortune-cookie.png'
  },
  Handbag: {
    title: 'Comparison Crushing Clutch',
    description:
      "A designer clutch purse with a built-in holographic display that projects images of you and your partner sharing happy moments together. Whenever you're tempted to compare your relationship to others', just glance at your clutch for a reminder of the unique bond you share.",
    cost: 250,
    image: '/img/handbag.png'
  },
  Handcuffs: {
    title: 'Matching Shackle Bracelets',
    description: 'A reminder that you will never leave each other',
    cost: 200,
    image: '/img/handcuffs.png'
  },
  Puzzle: {
    title: 'Jealousy Jester Jigsaw Puzzle',
    description:
      "A puzzle featuring funny caricatures of you and your partner laughing at all the silly things that used to make you jealous. As you piece it together, you'll realize how ridiculous jealousy can be.",
    cost: 100,
    image: '/img/puzzle.png'
  },
  Ring: {
    title: 'Trusty Tracker Ring',
    description: `A ring embedded with a trusty tracker that provides real-time updates on a partner's whereabouts and activities, soothing fears of betrayal or infidelity.`,
    cost: 150,
    image: '/img/ring.png'
  },
  Rose: {
    title: 'Rejection Resistant Roses',
    description:
      "A bouquet of roses that never wilt, symbolizing your resilience in the face of rejection. Because even if your love life feels thorny, you'll always bloom again.",
    cost: 150,
    image: '/img/rose.png'
  }
};

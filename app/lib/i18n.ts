export type Lang = 'en' | 'mr';

type InvitationBlock =
  | { type: 'phrase'; lines: string[] }
  | { type: 'names' }
  | { type: 'honor'; lines: string[] };

export interface Dictionary {
  ganpati: string;
  invitation: {
    blocks: InvitationBlock[];
    name1: string;
    name2: string;
    ampersand: string;
  };
  scroll: string;
  tapToReveal: string;
  scratch: {
    heading: string;
    instruction: string;
    celebration: string;
    coinDay: string;
    coinMonth: string;
    coinYear: string;
    ariaDay: string;
    ariaMonth: string;
    ariaYear: string;
  };
  countdown: {
    heading: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    footer: string;
  };
  venue: {
    intro: string;
    name: string;
    imageAlt: string;
    addressLines: string[];
    mapLink: string;
  };
  itinerary: {
    heading: string;
    day1: string;
    day2: string;
    morning: string;
    afternoon: string;
    evening: string;
    haldi: string;
    mayra: string;
    sangeet: string;
    wedding: string;
  };
}

const en: Dictionary = {
  ganpati: '\u0965\u00A0\u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903\u00A0\u0965',
  invitation: {
    blocks: [
      { type: 'phrase', lines: ['You are cordially invited', 'to the wedding of'] },
      { type: 'names' },
      { type: 'honor', lines: ['It would be our honor to have you', 'as we begin a life together', 'on this auspicious occasion'] },
    ],
    name1: 'Satvik',
    name2: 'Shalin',
    ampersand: '&',
  },
  scroll: 'Scroll',
  tapToReveal: 'Tap to reveal',
  scratch: {
    heading: 'Reveal',
    instruction: 'Scratch to discover the date',
    celebration: "We\u2019re getting married!",
    coinDay: '27',
    coinMonth: 'DEC',
    coinYear: '2026',
    ariaDay: 'Day',
    ariaMonth: 'Month',
    ariaYear: 'Year',
  },
  countdown: {
    heading: 'Until we marry',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MINUTES',
    seconds: 'SECONDS',
    footer: 'Until we celebrate together',
  },
  venue: {
    intro: 'The celebration will take place at',
    name: 'Hill Rock Resort & Villa',
    imageAlt: 'Hill Rock Resort & Villa \u2014 wedding venue in Karjat',
    addressLines: [
      'Samir Farms No. 1646 Jite Village,',
      'Karjat Jite Village, Karjat \u2013 Neral Rd,',
      'Karjat, Maharashtra 410101, India',
    ],
    mapLink: 'View on Google Maps',
  },
  itinerary: {
    heading: 'The Celebrations',
    day1: '26th December',
    day2: '27th December',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    haldi: 'Haldi',
    mayra: 'Mayra',
    sangeet: 'Sangeet',
    wedding: 'Wedding',
  },
};

const mr: Dictionary = {
  ganpati: '\u0965\u00A0\u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903\u00A0\u0965',
  invitation: {
    blocks: [
      { type: 'names' },
      { type: 'phrase', lines: ['\u092F\u093E\u0902\u091A\u094D\u092F\u093E \u0936\u0941\u092D \u0935\u093F\u0935\u093E\u0939\u093E\u0938', '\u0906\u092A\u0923\u093E\u0938 \u0938\u093E\u0926\u0930 \u0928\u093F\u092E\u0902\u0924\u094D\u0930\u093F\u0924'] },
      { type: 'honor', lines: ['\u092F\u093E \u092E\u0902\u0917\u0932 \u092A\u094D\u0930\u0938\u0902\u0917\u0940', '\u0906\u092A\u0932\u0947 \u0938\u0939\u0915\u0941\u091F\u0941\u0902\u092C', '\u0939\u093E\u0930\u094D\u0926\u093F\u0915 \u0938\u094D\u0935\u093E\u0917\u0924'] },
    ],
    name1: '\u0938\u0924\u094D\u0935\u093F\u0915',
    name2: '\u0936\u093E\u0932\u093F\u0928',
    ampersand: '\u0906\u0923\u093F',
  },
  scroll: '\u0938\u094D\u0915\u094D\u0930\u094B\u0932 \u0915\u0930\u093E',
  tapToReveal: '\u091F\u0945\u092A \u0915\u0930\u093E',
  scratch: {
    heading: '\u0909\u0932\u0917\u0921\u093E',
    instruction: '\u0924\u093E\u0930\u0940\u0916 \u091C\u093E\u0923\u0942\u0928 \u0918\u0947\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0938\u094D\u0915\u094D\u0930\u0945\u091A \u0915\u0930\u093E',
    celebration: '\u0906\u092E\u091A\u0902 \u0932\u0917\u094D\u0928 \u0939\u094B\u0924\u0902\u092F!',
    coinDay: '27',
    coinMonth: '\u0921\u093F\u0938\u0947\u0902',
    coinYear: '2026',
    ariaDay: '\u0926\u093F\u0935\u0938',
    ariaMonth: '\u092E\u0939\u093F\u0928\u093E',
    ariaYear: '\u0935\u0930\u094D\u0937',
  },
  countdown: {
    heading: '\u0932\u0917\u094D\u0928\u093E\u0932\u093E \u0905\u0935\u0915\u093E\u0936',
    days: '\u0926\u093F\u0935\u0938',
    hours: '\u0924\u093E\u0938',
    minutes: '\u092E\u093F\u0928\u093F\u091F\u0947',
    seconds: '\u0938\u0947\u0915\u0902\u0926',
    footer: '\u0938\u094B\u0939\u0933\u094D\u092F\u093E\u092A\u0930\u094D\u092F\u0902\u0924',
  },
  venue: {
    intro: '\u0938\u094B\u0939\u0933\u094D\u092F\u093E\u091A\u0947 \u0920\u093F\u0915\u093E\u0923',
    name: 'Hill Rock Resort & Villa',
    imageAlt: '\u0939\u093F\u0932 \u0930\u0949\u0915 \u0930\u093F\u0938\u0949\u0930\u094D\u091F \u2014 \u0915\u0930\u091C\u0924, \u0935\u093F\u0935\u093E\u0939\u0938\u094D\u0925\u0933',
    addressLines: [
      'Samir Farms No. 1646 Jite Village,',
      'Karjat Jite Village, Karjat \u2013 Neral Rd,',
      'Karjat, Maharashtra 410101, India',
    ],
    mapLink: '\u0917\u0942\u0917\u0932 \u092E\u0945\u092A\u094D\u0938\u0935\u0930 \u092A\u0939\u093E',
  },
  itinerary: {
    heading: '\u0938\u094B\u0939\u0933\u0947',
    day1: '\u0968\u096C \u0921\u093F\u0938\u0947\u0902\u092C\u0930',
    day2: '\u0968\u096D \u0921\u093F\u0938\u0947\u0902\u092C\u0930',
    morning: '\u0938\u0915\u093E\u0933',
    afternoon: '\u0926\u0941\u092A\u093E\u0930',
    evening: '\u0938\u0902\u0927\u094D\u092F\u093E\u0915\u093E\u0933',
    haldi: '\u0939\u0933\u0926',
    mayra: '\u092E\u093E\u092F\u0930\u093E',
    sangeet: '\u0938\u0902\u0917\u0940\u0924',
    wedding: '\u0932\u0917\u094D\u0928\u0938\u094B\u0939\u0933\u093E',
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, mr };

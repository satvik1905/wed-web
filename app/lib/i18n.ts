export type Lang = "en" | "mr";

export interface Dictionary {
  ganpati: string;
  invitation: {
    blessing: string;
    hostLine: string;
    name1: string;
    name1Parents: string;
    conjunction: string;
    name2: string;
    name2Parents: string;
    closing: string;
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
    location: string;
    imageAlt: string;
    image2Alt: string;
    addressLines: string[];
    mapLink: string;
    stayHeading: string;
    stayLines: string[];
  };
  rsvp: {
    heading: string;
    name: string;
    attending: string;
    attendingYes: string;
    attendingNo: string;
    guestCount: string;
    submit: string;
    submitted: string;
  };
  itinerary: {
    heading: string;
    day1: string;
    day2: string;
    morning: string;
    afternoon: string;
    evening: string;
    haldi: string;
    haldiTime: string;
    haldiDesc: string;
    haldiDress: string;
    mayra: string;
    mayraTime: string;
    mayraDesc: string;
    mayraDress: string;
    sangeet: string;
    sangeetTime: string;
    sangeetDesc: string;
    sangeetDress: string;
    wedding: string;
    weddingDesc: string;
    weddingDress: string;
    reception: string;
    receptionTime: string;
    receptionDesc: string;
    receptionDress: string;
    dressLabel: string;
    muhuratLabel: string;
    muhuratTime: string;
  };
  closing: {
    message: string;
    heading: string;
    familyMembers: string[];
    familyClosing: string;
  };
}

const en: Dictionary = {
  ganpati:
    "\u0935\u0915\u094D\u0930\u0924\u0941\u0902\u0921 \u092E\u0939\u093E\u0915\u093E\u092F \u0938\u0942\u0930\u094D\u092F\u0915\u094B\u091F\u0940 \u0938\u092E\u092A\u094D\u0930\u092D\u0964\n\u0928\u093F\u0930\u094D\u0935\u093F\u0918\u094D\u0928\u0902 \u0915\u0941\u0930\u0941 \u092E\u0947 \u0926\u0947\u0935 \u0938\u0930\u094D\u0935\u0915\u093E\u0930\u094D\u092F\u0947\u0937\u0941 \u0938\u0930\u094D\u0935\u0926\u093E\u0965",
  invitation: {
    blessing: "",
    hostLine:
      "With love and the blessings of our families, we invite you to celebrate the wedding of",
    name1: "Shalin",
    name1Parents:
      "(daughter of Shri Kunal Rajnikant Deshmukh & Sau. Sarita Kunal Deshmukh)",
    conjunction: "and",
    name2: "Satvik",
    name2Parents:
      "(son of Late Shri Jayant Ramachandra Khopkar & Smt. Jyostna Jayant Khopkar)",
    closing: "",
  },
  scroll: "Scroll",
  tapToReveal: "Tap to reveal",
  scratch: {
    heading: "Reveal",
    instruction: "Scratch to discover the date",
    celebration: "We\u2019re getting married!",
    coinDay: "27",
    coinMonth: "DEC",
    coinYear: "2026",
    ariaDay: "Day",
    ariaMonth: "Month",
    ariaYear: "Year",
  },
  countdown: {
    heading: "Until we marry",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    footer: "Until we celebrate together",
  },
  venue: {
    intro: "The venue",
    name: "Hill Rock Resort\nand Villas",
    location: "Karjat, Maharashtra",
    imageAlt: "Hill Rock Resort & Villa \u2014 wedding venue in Karjat",
    image2Alt: "Hill Rock Resort & Villa \u2014 grounds",
    addressLines: [
      "Samir Farms No. 1646 Jite Village,",
      "Karjat Jite Village, Karjat \u2013 Neral Rd,",
      "Karjat, Maharashtra 410101, India",
    ],
    mapLink: "View on Google Maps",
    stayHeading: "Stay details",
    stayLines: [
      "Accommodation will be arranged at the venue.",
      "More details to follow soon.",
    ],
  },
  rsvp: {
    heading: "RSVP",
    name: "Name",
    attending: "Will you be attending?",
    attendingYes: "Yes",
    attendingNo: "No",
    guestCount: "Number of Guests",
    submit: "Submit",
    submitted: "Thank you for your response!",
  },
  itinerary: {
    heading: "The Celebrations",
    day1: "26th December",
    day2: "27th December",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    haldi: "Haldi & Hues",
    haldiTime: "",
    haldiDesc: "",
    haldiDress: "",
    mayra: "Laadli ka Mayra",
    mayraTime: "",
    mayraDesc: "",
    mayraDress: "",
    sangeet: "Mehfil-e-Ishq",
    sangeetTime: "7 PM",
    sangeetDesc: "",
    sangeetDress: "",
    wedding: "SATVachanSHALwe",
    weddingDesc: "",
    weddingDress: "",
    reception: "The Happily Ever After Party",
    receptionTime: "",
    receptionDesc: "",
    receptionDress: "",
    dressLabel: "Wear",
    muhuratLabel: "Shubh Muhurat",
    muhuratTime: "",
  },
  closing: {
    message: "Your presence and blessings will make our celebration complete.",
    heading: "Eagerly awaiting you",
    familyMembers: [
      "[Family Member 1]",
      "[Family Member 2]",
      "[Family Member 3]",
      "[Family Member 4]",
      "[Family Member 5]",
      "[Family Member 6]",
    ],
    familyClosing: "All of Deshmukh family",
  },
};

const mr: Dictionary = {
  ganpati:
    "\u0935\u0915\u094D\u0930\u0924\u0941\u0902\u0921 \u092E\u0939\u093E\u0915\u093E\u092F \u0938\u0942\u0930\u094D\u092F\u0915\u094B\u091F\u0940 \u0938\u092E\u092A\u094D\u0930\u092D\u0964\n\u0928\u093F\u0930\u094D\u0935\u093F\u0918\u094D\u0928\u0902 \u0915\u0941\u0930\u0941 \u092E\u0947 \u0926\u0947\u0935 \u0938\u0930\u094D\u0935\u0915\u093E\u0930\u094D\u092F\u0947\u0937\u0941 \u0938\u0930\u094D\u0935\u0926\u093E\u0965",
  invitation: {
    blessing: "",
    hostLine:
      "\u0936\u094D\u0930\u0940 \u0915\u0941\u0923\u093E\u0932 \u0926\u0947\u0936\u092E\u0941\u0916 \u0935 \u0938\u094C. \u0938\u0930\u093F\u0924\u093E \u0926\u0947\u0936\u092E\u0941\u0916 \u0906\u092A\u0923\u093E\u0938 \u0924\u094D\u092F\u093E\u0902\u091A\u094D\u092F\u093E \u0915\u0928\u094D\u092F\u0947\u091A\u094D\u092F\u093E",
    name1: "\u0936\u093E\u0932\u093F\u0928",
    name1Parents:
      "(\u0936\u094D\u0930\u0940 \u0915\u0941\u0923\u093E\u0932 \u0930\u091C\u0928\u0940\u0915\u093E\u0902\u0924 \u0926\u0947\u0936\u092E\u0941\u0916 \u0935 \u0938\u094C. \u0938\u0930\u093F\u0924\u093E \u0915\u0941\u0923\u093E\u0932 \u0926\u0947\u0936\u092E\u0941\u0916 \u092F\u093E\u0902\u091A\u0940 \u0938\u0941\u0915\u0928\u094D\u092F\u093E)",
    conjunction: "\u0906\u0923\u093F",
    name2: "\u0938\u093E\u0924\u094D\u0935\u093F\u0915",
    name2Parents:
      "(\u0915\u0948. \u0936\u094D\u0930\u0940 \u091C\u092F\u0902\u0924 \u0930\u093E\u092E\u091A\u0902\u0926\u094D\u0930 \u0916\u094B\u092A\u0915\u0930 \u0935 \u0938\u094C. \u091C\u094D\u092F\u094B\u0924\u094D\u0938\u094D\u0928\u093E \u091C\u092F\u0902\u0924 \u0916\u094B\u092A\u0915\u0930 \u092F\u093E\u0902\u091A\u0947 \u0938\u0941\u092A\u0941\u0924\u094D\u0930)",
    closing:
      "\u092F\u093E\u0902\u091A\u094D\u092F\u093E \u0936\u0941\u092D\u0935\u093F\u0935\u093E\u0939 \u0938\u094B\u0939\u0933\u094D\u092F\u093E\u0938 \u0938\u093E\u0926\u0930 \u0928\u093F\u092E\u0902\u0924\u094D\u0930\u093F\u0924 \u0915\u0930\u0924\u093E\u0924",
  },
  scroll: "\u0938\u094D\u0915\u094D\u0930\u094B\u0932 \u0915\u0930\u093E",
  tapToReveal: "\u091F\u0945\u092A \u0915\u0930\u093E",
  scratch: {
    heading: "\u0909\u0932\u0917\u0921\u093E",
    instruction:
      "\u0924\u093E\u0930\u0940\u0916 \u091C\u093E\u0923\u0942\u0928 \u0918\u0947\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0938\u094D\u0915\u094D\u0930\u0945\u091A \u0915\u0930\u093E",
    celebration:
      "\u0906\u092E\u091A\u0902 \u0932\u0917\u094D\u0928 \u0939\u094B\u0924\u0902\u092F!",
    coinDay: "27",
    coinMonth: "\u0921\u093F\u0938\u0947\u0902",
    coinYear: "2026",
    ariaDay: "\u0926\u093F\u0935\u0938",
    ariaMonth: "\u092E\u0939\u093F\u0928\u093E",
    ariaYear: "\u0935\u0930\u094D\u0937",
  },
  countdown: {
    heading:
      "\u0932\u0917\u094D\u0928\u093E\u0932\u093E \u0905\u0935\u0915\u093E\u0936",
    days: "\u0926\u093F\u0935\u0938",
    hours: "\u0924\u093E\u0938",
    minutes: "\u092E\u093F\u0928\u093F\u091F\u0947",
    seconds: "\u0938\u0947\u0915\u0902\u0926",
    footer:
      "\u0938\u094B\u0939\u0933\u094D\u092F\u093E\u092A\u0930\u094D\u092F\u0902\u0924",
  },
  venue: {
    intro:
      "\u0938\u094B\u0939\u0933\u094D\u092F\u093E\u091A\u0947 \u0920\u093F\u0915\u093E\u0923",
    name: "Hill Rock Resort\nand Villas",
    location:
      "\u0915\u0930\u091C\u0924, \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930",
    imageAlt:
      "\u0939\u093F\u0932 \u0930\u0949\u0915 \u0930\u093F\u0938\u0949\u0930\u094D\u091F \u2014 \u0915\u0930\u091C\u0924, \u0935\u093F\u0935\u093E\u0939\u0938\u094D\u0925\u0933",
    image2Alt:
      "\u0939\u093F\u0932 \u0930\u0949\u0915 \u0930\u093F\u0938\u0949\u0930\u094D\u091F \u2014 \u092A\u0930\u093F\u0938\u0930",
    addressLines: [
      "Samir Farms No. 1646 Jite Village,",
      "Karjat Jite Village, Karjat \u2013 Neral Rd,",
      "Karjat, Maharashtra 410101, India",
    ],
    mapLink:
      "\u0917\u0942\u0917\u0932 \u092E\u0945\u092A\u094D\u0938\u0935\u0930 \u092A\u0939\u093E",
    stayHeading:
      "\u0930\u093E\u0939\u0923\u094D\u092F\u093E\u091A\u0940 \u092E\u093E\u0939\u093F\u0924\u0940",
    stayLines: [
      "\u0930\u093E\u0939\u0923\u094D\u092F\u093E\u091A\u0940 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E \u0938\u094B\u0939\u0933\u094D\u092F\u093E\u091A\u094D\u092F\u093E \u0920\u093F\u0915\u093E\u0923\u0940 \u0915\u0947\u0932\u0940 \u091C\u093E\u0908\u0932.",
      "\u0905\u0927\u093F\u0915 \u092E\u093E\u0939\u093F\u0924\u0940 \u0932\u0935\u0915\u0930\u091A.",
    ],
  },
  rsvp: {
    heading: "RSVP",
    name: "\u0928\u093E\u0935",
    attending:
      "\u0924\u0941\u092E\u094D\u0939\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924 \u0930\u093E\u0939\u093E\u0932 \u0915\u093E?",
    attendingYes: "\u0939\u094B\u092F",
    attendingNo: "\u0928\u093E\u0939\u0940",
    guestCount:
      "\u092A\u093E\u0939\u0941\u0923\u094D\u092F\u093E\u0902\u091A\u0940 \u0938\u0902\u0916\u094D\u092F\u093E",
    submit: "\u0938\u0941\u092A\u0942\u0930\u094D\u0926 \u0915\u0930\u093E",
    submitted:
      "\u0924\u0941\u092E\u091A\u094D\u092F\u093E \u092A\u094D\u0930\u0924\u093F\u0938\u093E\u0926\u093E\u092C\u0926\u094D\u0926\u0932 \u0927\u0928\u094D\u092F\u0935\u093E\u0926!",
  },
  itinerary: {
    heading: "\u0938\u094B\u0939\u0933\u0947",
    day1: "\u0968\u096C \u0921\u093F\u0938\u0947\u0902\u092C\u0930",
    day2: "\u0968\u096D \u0921\u093F\u0938\u0947\u0902\u092C\u0930",
    morning: "\u0938\u0915\u093E\u0933",
    afternoon: "\u0926\u0941\u092A\u093E\u0930",
    evening: "\u0938\u0902\u0927\u094D\u092F\u093E\u0915\u093E\u0933",
    haldi: "Haldi & Hues",
    haldiTime: "",
    haldiDesc: "",
    haldiDress: "",
    mayra: "Laadli ka Mayra",
    mayraTime: "",
    mayraDesc: "",
    mayraDress: "",
    sangeet: "Mehfil-e-Ishq",
    sangeetTime: "7 PM",
    sangeetDesc: "",
    sangeetDress: "",
    wedding: "SATVachanSHALwe",
    weddingDesc: "",
    weddingDress: "",
    reception: "The Happily Ever After Party",
    receptionTime: "",
    receptionDesc: "",
    receptionDress: "",
    dressLabel: "\u092A\u094B\u0936\u093E\u0916",
    muhuratLabel:
      "\u0936\u0941\u092D \u092E\u0941\u0939\u0942\u0930\u094D\u0924",
    muhuratTime: "",
  },
  closing: {
    message: "\u0906\u092A\u0932\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u0940 \u0906\u0923\u093F \u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926 \u0906\u092E\u091A\u093E \u0938\u094B\u0939\u0933\u093E \u092A\u0942\u0930\u094D\u0923 \u0915\u0930\u0924\u0940\u0932.",
    heading: "\u0938\u094D\u0935\u093E\u0917\u0924\u094B\u0924\u094D\u0938\u0941\u0915",
    familyMembers: [
      "[Family Member 1]",
      "[Family Member 2]",
      "[Family Member 3]",
      "[Family Member 4]",
      "[Family Member 5]",
      "[Family Member 6]",
    ],
    familyClosing: "\u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u0926\u0947\u0936\u092E\u0941\u0916 \u092A\u0930\u093F\u0935\u093E\u0930",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, mr };

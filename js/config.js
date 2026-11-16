/* =====================================================================
   WEDDING CONTENT — edit everything here. No need to touch other files.
   Text below is copied from https://ashli-saliya.vercel.app
   Use \n inside a string, or an array of strings, for line breaks.
   ===================================================================== */
window.WEDDING = {
  meta: {
    title: "Mohammad Ashil & Dr. Mariyamath Saliya | Wedding Invitation",
    description: "With the blessing of Allah, we joyfully invite you to celebrate the marriage of Mohammad Ashil & Dr. Mariyamath Saliya."
  },

  monogram: "S & A",

  /* Falling rose petals over the opening screen */
  petals: true,

  nav: [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Ceremonies", href: "#venue" }
  ],

  /* Original rose images. Save the two PNGs from the original site into
     the /images folder with these exact names. Until they are there,
     the drawn stand-ins (the .svg files) are shown instead. */
  images: {
    floralCorner: "images/floral-corner.png",
    floralBranch: "images/floral-branch.png",
    fallbackCorner: "images/floral-corner.svg",
    fallbackBranch: "images/floral-branch.svg",
    /* Photo shown in the welcome section (replaces the rose branch).
       Set to "" to show the rose branch again. */
    welcomePhoto: "images/couple-photo.jpg",
    welcomePhotoAlt: "Wedding portrait"
  },

  /* Background music
     autoplay: starts when the website loads (phones start it on the first tap,
               because iPhone/Android block sound until the guest touches the page)
     loop:     repeats for as long as the invitation is open
     volume:   the music file itself is already set to 30% so it is the same
               on iPhone, Android and computers (iPhone ignores volume set in code).
               1 = play the file as it is.
     To change the song, replace audio/anlatmam.mp3 (keep the name). */
  music: {
    src: "audio/anlatmam.mp3",
    autoplay: true,
    loop: true,
    volume: 1,
    playOnOpen: true
  },

  hero: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    intro: "The Wedding Of",
    name1: "Mohammad Ashil",
    name2: "Dr. Mariyamath Saliya",
    tagline: "Together with their families, we invite you to celebrate the beginning of their forever.",
    date: "11 · DECEMBER · 2026",
    venue: "Seyyid Madani Dargah & Juma Masjid",
    city: "Ullal, Mangalore",
    button: "Open Invitation"
  },

  welcome: {
    greeting: "Assalamu Alaikum",
    title: "With the Blessings of Allah",
    lines: [
      "In the name of Allah, the Most Gracious, the Most Merciful.",
      "With the blessing of Allah, we joyfully invite you to celebrate the marriage of Mohammad Ashil & Dr. Mariyamath Saliya."
    ]
  },

  couple: {
    intro: "The Blessed Union",
    title: "Two Hearts, One Journey",
    bride: {
      initial: "S",
      role: "The Bride",
      name: "Dr. Mariyamath Saliya",
      details: [
        "Daughter of Abdul Rahiman & Amina",
        "Dharmanagar House, Vorkady Post,\nKasaragod"
      ]
    },
    groom: {
      initial: "A",
      role: "The Groom",
      name: "Mohammad Ashil",
      details: [
        "Son of Mrs. Mumthaz\n(Wife of Marhoom Haji Baithar Abdul Hameed)",
        "Grandson of Marhoom Haji K. Hasanabba\n& Marhoom Haji B. Hamabba"
      ]
    }
  },

  countdown: {
    intro: "Save the Date",
    title: "Counting Down to Our Forever",
    /* Exact moment the countdown reaches zero, with time-zone offset.
       The original only says "After Asar Namaz" — 16:00 IST is a guess. */
    target: "2026-12-11T16:00:00+05:30",
    /* showTimer: false shows the date below instead of the countdown boxes */
    showTimer: true,
    dateText: "11th December 2026",
    note: "11 · DECEMBER · 2026 (2 Rajab 1448 AH) — After Asar Namaz"
  },

  story: {
    intro: "Written by Destiny",
    title: "Our Story",
    text: "What began with a quiet meeting grew into a love rooted in faith, kindness, and cherished moments. With grateful hearts and the blessings of our families, we now begin our beautiful journey together, insha'Allah."
  },

  events: {
    intro: "Wedding Program",
    title: "Ceremonies & Venues",
    list: [
      {
        number: "01",
        label: "Mehndi",
        arabic: "حفل الحناء",
        title: "Mehndi Ceremony",
        venue: "Iqrit Grandeur Hills",
        date: "Friday, 11 Dec 2026",
        hijri: "2 Rajab 1448 AH",
        time: "12:00 PM (Afternoon)",
        place: "",
        mapUrl: "https://maps.google.com/?q=Iqrit+Grandeur+Hills"
      },
      {
        number: "02",
        label: "Nikah",
        arabic: "عقد النكاح",
        title: "Nikah Ceremony",
        venue: "Seyyid Madani Dargah & Juma Masjid",
        date: "Friday, 11 Dec 2026",
        hijri: "2 Rajab 1448 AH",
        time: "After Asar Namaz",
        place: "Ullal, Mangalore",
        mapUrl: "https://maps.google.com/?q=Seyyid+Madani+Dargah+and+Juma+Masjid+Ullal+Mangalore"
      },
      {
        number: "03",
        label: "Wedding",
        arabic: "حفل الزفاف",
        title: "Wedding Ceremony",
        venue: "AH Palace",
        date: "Sunday, 13 Dec 2026",
        hijri: "4 Rajab 1448 AH",
        time: "5:00 PM onwards",
        place: "Hosangady",
        mapUrl: "https://maps.google.com/?q=AH+Palace+Hosangady"
      },
      {
        number: "04",
        label: "Reception",
        arabic: "حفل الإستقبال",
        title: "Wedding Reception",
        venue: "Deccan Garden",
        date: "Monday, 14 Dec 2026",
        hijri: "",
        time: "1:00 PM onwards",
        place: "Kuthar, Mangalore",
        mapUrl: "https://maps.google.com/?q=Deccan+Garden+Kuthar+Mangalore"
      }
    ]
  },

  footer: {
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    translation: "“May Allah bless you, and shower His blessings upon you, and join you together in goodness.”",
    name1: "Mohammad Ashil",
    name2: "Dr. Mariyamath Saliya",
    date: "11 · DECEMBER · 2026",
    closing: "Your presence and prayers are the greatest gift as we begin our journey together, insha’Allah."
  }
};

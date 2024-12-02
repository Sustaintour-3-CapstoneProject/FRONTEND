// destinationData.js
const Datadestinations = [
  {
    id: 1,
    name: "Monas",
    address: "Jakarta, Jakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A stunning beach with crystal clear water and white sand.",
    openingHours: "08:00 - 18:00",
    city: "Jakarta",
    position: [-6.1754, 106.8272],
    cost: 50000,
    facilities: ["Parking", "Toilets", "Shops"],
    videoContent: [
      {
        title: "Diamond Beach Highlight",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 2,
    name: "Ancol",
    address: "Tanjung Priok, Jakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A sacred temple famous for its holy spring water.",
    openingHours: "07:00 - 17:00",
    position: [-6.1275, 106.8364],
    cost: 50000,
    facilities: ["Parking", "Guides", "Shops"],
    videoContent: [
      {
        title: "Diamond Beach Highlight",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 3,
    name: "Gedung Sate",
    address: "Dago, Bandung",
    image: "/homepage/TripWise.jpg",
    description: "A luxurious resort offering breathtaking ocean views.",
    openingHours: "Open 24 Hours",
    position: [-6.9147, 107.6098],
    city: "Bandung",
    cost: 30000,
    facilities: ["Swimming Pool", "Restaurants", "Bars", "Boats"],
    videoContent: [
      {
        title:
          "Diamond Beach Highlight lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum",
        video: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
      {
        title:
          "Diamond Beach Highlight lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum",
        video: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
    ],
  },
  {
    id: 4,
    name: "Lembang",
    address: "Lembang, Bandung",
    image: "/homepage/Ecotourism.jpg",
    description: "A majestic waterfall located in lush greenery.",
    openingHours: "06:00 - 18:00",
    position: [-6.8133, 107.6211],
    city: "Bandung",
    cost: 20000,
    facilities: ["Parking", "Hiking Trails"],
    videoContent: [
      {
        title: "Diamond Beach Highlight",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 5,
    name: "Suramadu",
    address: "Suramadu, Surabaya",
    image: "/homepage/rajaampat.jpg",
    description: "A tranquil beach known for its dolphin tours.",
    openingHours: "06:00 - 20:00",
    position: [-7.1907, 112.7508],
    city: "Surabaya",
    cost: 80000,
    facilities: ["Boats", "Guides", "Restaurants"],
    videoContent: [
      {
        title: "Diamond Beach Highlight",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 6,
    name: "Tugu Pahlawan",
    address: "Surabaya, Surabaya",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.2457, 112.7374],
    city: "Surabaya",
    cost: 30000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 7,
    name: "Malioboro",
    address: "Jl.Malioboro, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7956, 110.3646],
    city: "Yogyakarta",
    cost: 30000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 8,
    name: "Candi Prambanan",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.4911],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 9,
    name: "Candi Prambanan",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.4911],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 10,
    name: "Candi Prambanan",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.4911],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 11,
    name: "Candi Prambanan",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.4911],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 12,
    name: "Candi Prambanan",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.4911],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
  {
    id: 13,
    name: "Candi Kocak",
    address: "Klaten, Yogyakarta",
    image: "https://via.placeholder.com/300x200",
    description: "A famous temple on the shores of Lake Bratan.",
    openingHours: "07:00 - 19:00",
    position: [-7.7519, 110.49112],
    city: "Yogyakarta",
    cost: 80000,
    facilities: ["Parking", "Shops", "Guides"],
    videoContent: [
      {
        title: "Diamond Beach Highlight lorem ipsum dolor sit amet",
        video: "https://example.com/video-ayana.mp4",
      },
      {
        title: "Aerial View of Diamond Beach",
        video: "https://example.com/video-ayana.mp4",
      },
    ],
  },
];

export default Datadestinations;

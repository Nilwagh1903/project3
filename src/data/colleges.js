export const COLLEGES = [
  {
    id: "vit-pune",
    name: "VIT Pune",
    fullName: "Vishwakarma Institute of Technology",
    city: "Pune",
    locality: "Bibwewadi",
    established: 1983,
    popularNearby: ["Bibwewadi", "Upper Indira Nagar", "Salunke Vihar", "Market Yard"],
    mapCenter: { x: 50, y: 55 },
    stats: {
      housingCount: 38,
      messCount: 16,
      transportRoutes: 9,
    },
    landmarks: [
      { name: "VIT Gate 1", type: "gate", x: 49, y: 53 },
      { name: "Upper Depot", type: "transit", x: 58, y: 62 },
      { name: "Bibwewadi Chowk", type: "chowk", x: 42, y: 48 },
      { name: "KK Market", type: "commercial", x: 35, y: 60 }
    ],
    transitHub: "Swargate (4.5 km) / Upper Bus Stand (0.6 km)"
  },
  {
    id: "coep-pune",
    name: "COEP Technological University",
    fullName: "College of Engineering Pune",
    city: "Pune",
    locality: "Shivajinagar",
    established: 1854,
    popularNearby: ["Shivajinagar", "Wakadewadi", "FC Road", "Model Colony"],
    mapCenter: { x: 48, y: 40 },
    stats: {
      housingCount: 45,
      messCount: 22,
      transportRoutes: 14,
    },
    landmarks: [
      { name: "COEP Boat Club", type: "gate", x: 47, y: 38 },
      { name: "Shivajinagar Station", type: "transit", x: 42, y: 45 },
      { name: "Sancheti Hospital", type: "chowk", x: 54, y: 36 }
    ],
    transitHub: "Shivajinagar Metro & Railway Station (0.5 km)"
  },
  {
    id: "mit-wpu",
    name: "MIT-WPU",
    fullName: "MIT World Peace University",
    city: "Pune",
    locality: "Kothrud",
    established: 1983,
    popularNearby: ["Kothrud", "Paud Road", "Ideal Colony", "Karve Nagar"],
    mapCenter: { x: 35, y: 65 },
    stats: {
      housingCount: 52,
      messCount: 28,
      transportRoutes: 11,
    },
    landmarks: [
      { name: "MIT World Peace Dome", type: "gate", x: 36, y: 64 },
      { name: "Ideal Colony Metro", type: "transit", x: 40, y: 70 },
      { name: "Paud Phata", type: "chowk", x: 30, y: 58 }
    ],
    transitHub: "Ideal Colony Metro Station (0.8 km)"
  },
  {
    id: "fergusson",
    name: "Fergusson College",
    fullName: "Fergusson College (Autonomous)",
    city: "Pune",
    locality: "FC Road",
    established: 1885,
    popularNearby: ["FC Road", "Deccan Gymkhana", "Ghole Road", "Model Colony"],
    mapCenter: { x: 60, y: 45 },
    stats: {
      housingCount: 34,
      messCount: 20,
      transportRoutes: 12,
    },
    landmarks: [
      { name: "FC Main Gate", type: "gate", x: 59, y: 43 },
      { name: "Goodluck Chowk", type: "chowk", x: 65, y: 50 },
      { name: "Deccan Bus Stop", type: "transit", x: 68, y: 55 }
    ],
    transitHub: "Deccan Gymkhana Bus Stand (0.4 km)"
  },
  {
    id: "sppu",
    name: "SPPU (Pune University)",
    fullName: "Savitribai Phule Pune University",
    city: "Pune",
    locality: "Ganeshkhind",
    established: 1949,
    popularNearby: ["Aundh", "Senapati Bapat Road", "Ganeshkhind", "Range Hills"],
    mapCenter: { x: 40, y: 30 },
    stats: {
      housingCount: 40,
      messCount: 19,
      transportRoutes: 15,
    },
    landmarks: [
      { name: "SPPU Main Gate", type: "gate", x: 39, y: 28 },
      { name: "IUCAA Campus", type: "gate", x: 37, y: 32 },
      { name: "SB Road Chowk", type: "chowk", x: 46, y: 35 }
    ],
    transitHub: "University Circle & SB Road Bus Terminus"
  }
];

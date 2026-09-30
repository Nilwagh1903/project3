export const HOUSING_LISTINGS = [
  {
    id: "campus-view-pg",
    name: "Campus View PG",
    type: "PG",
    gender: "Girls PG",
    sharingTypes: ["2 sharing", "3 sharing", "Single"],
    price: 7500,
    deposit: 10000,
    collegeId: "vit-pune",
    distanceKm: 0.8,
    walkingMins: 10,
    address: "Plot 24, Near Lake Town Road, Bibwewadi, Pune",
    rating: 4.5,
    reviewsCount: 128,
    verified: true,
    verifiedDate: "Verified Aug 2026 by SettleIn Student Field Audit",
    mapCoords: { x: 53, y: 58 },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Quiet street, dedicated study desks, 2-minute walk to lake garden",
    description: "Campus View PG offers comfortable, student-friendly accommodation located just 800m from VIT Pune main campus. Features biometric entry, high-speed dual Wi-Fi connections, and wholesome 2-meal daily service with special Sunday breakfast. Safe neighborhood with streetlights.",
    amenities: [
      { name: "High-Speed Wi-Fi", icon: "Wifi", included: true },
      { name: "2 Times Food (Mon-Sat)", icon: "Utensils", included: true },
      { name: "Biometric & CCTV Entry", icon: "ShieldCheck", included: true },
      { name: "Hot Water Geyser", icon: "Flame", included: true },
      { name: "Power Backup (Inverter)", icon: "Zap", included: true },
      { name: "Washing Machine", icon: "Shirt", included: true },
      { name: "RO Water Purifier", icon: "Droplets", included: true },
      { name: "Daily Room Cleaning", icon: "Sparkles", included: true }
    ],
    roomOptions: [
      { type: "Single Occupancy", price: 11500, availability: "1 room vacant", features: "Attached washroom, private balcony, large study desk" },
      { type: "Double Sharing", price: 7500, availability: "3 beds vacant", features: "Shared wardrobe, twin beds, attached washroom" },
      { type: "Triple Sharing", price: 5800, availability: "2 beds vacant", features: "Economical, private locker, study table" }
    ],
    curfew: "10:00 PM (Late pass with parent SMS permitted for college festivals/exams)",
    owner: {
      name: "Mr. Rajendra Deshpande",
      role: "Property Owner & Resident In-charge",
      phone: "+91 98220 44129",
      responseRate: "Usually responds in under 15 minutes",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "VIT Pune Gate 1", distance: "0.8 km (10 min walk)" },
      { name: "Green Leaf Mess", distance: "0.3 km" },
      { name: "Apollo Pharmacy", distance: "0.2 km" },
      { name: "Upper Indira Nagar Auto Stand", distance: "0.5 km" }
    ]
  },
  {
    id: "student-nest-hostel",
    name: "Student Nest Hostel",
    type: "Hostel",
    gender: "Boys Hostel",
    sharingTypes: ["2 sharing", "3 sharing", "4 sharing"],
    price: 6200,
    deposit: 6000,
    collegeId: "vit-pune",
    distanceKm: 1.2,
    walkingMins: 14,
    address: "Lane 4, Behind Market Yard Police Chowki, Bibwewadi, Pune",
    rating: 4.3,
    reviewsCount: 86,
    verified: true,
    verifiedDate: "Verified July 2026 by SettleIn Student Reps",
    mapCoords: { x: 46, y: 52 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Terrace study deck, zero broker fees, active engineering peer group",
    description: "Student Nest is a dedicated multi-story hostel housing primarily engineering and management students. Spacious rooms with individual steel almirahs and dedicated study lamps. Managed by retired college administrator.",
    amenities: [
      { name: "Wi-Fi 100 Mbps", icon: "Wifi", included: true },
      { name: "Attached Mess Facility", icon: "Utensils", included: false, note: "Optional ₹2,600/mo" },
      { name: "CCTV & Security Guard", icon: "ShieldCheck", included: true },
      { name: "Solar Hot Water", icon: "Sun", included: true },
      { name: "Covered Bike Parking", icon: "Bike", included: true },
      { name: "RO Water Dispenser", icon: "Droplets", included: true },
      { name: "Laundry Area with Sinks", icon: "Shirt", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing (Twin)", price: 7800, availability: "2 beds vacant", features: "Balcony facing, cross ventilation" },
      { type: "3 Sharing", price: 6200, availability: "4 beds vacant", features: "Popular tier, triple wardrobes" },
      { type: "4 Sharing (Budget)", price: 4800, availability: "1 bed vacant", features: "Most economical for first-years" }
    ],
    curfew: "10:30 PM (Flexible for lab assignments)",
    owner: {
      name: "Sanjay Shinde",
      role: "Hostel Manager",
      phone: "+91 94235 11980",
      responseRate: "Responds in 30 minutes",
      livesOnProperty: false
    },
    nearbyPlaces: [
      { name: "VIT Campus", distance: "1.2 km" },
      { name: "Upper Bus Depot", distance: "0.4 km" },
      { name: "Shree Ganesh Mess", distance: "100 meters" }
    ]
  },
  {
    id: "kothrud-haven",
    name: "Kothrud Haven Co-Living",
    type: "PG",
    gender: "Co-ed (Separate Wings)",
    sharingTypes: ["Single", "2 sharing"],
    price: 11000,
    deposit: 15000,
    collegeId: "mit-wpu",
    distanceKm: 0.6,
    walkingMins: 7,
    address: "Near Paud Road, Opposite Ideal Colony Garden, Kothrud, Pune",
    rating: 4.8,
    reviewsCount: 112,
    verified: true,
    verifiedDate: "Verified Aug 2026 by SettleIn Audit Team",
    mapCoords: { x: 38, y: 62 },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Premium student living with ergonomic study tables & community lounge",
    description: "Designed for students who want a quiet, hassle-free lifestyle near MIT-WPU. Each room includes air-conditioning, ergonomic workspace, and high-speed mesh Wi-Fi. Separate secure wings for male and female residents with keycard access.",
    amenities: [
      { name: "Air Conditioning", icon: "Wind", included: true },
      { name: "Mesh Wi-Fi 300 Mbps", icon: "Wifi", included: true },
      { name: "Daily Housekeeping", icon: "Sparkles", included: true },
      { name: "Smart Keycard Access", icon: "Key", included: true },
      { name: "Fully Automatic Washing", icon: "Shirt", included: true },
      { name: "Microwave & Induction Area", icon: "Coffee", included: true }
    ],
    roomOptions: [
      { type: "Executive Single", price: 14500, availability: "Only 1 remaining", features: "Smart TV, private balcony, queen mattress" },
      { type: "Comfort 2 Sharing", price: 11000, availability: "3 beds available", features: "Separate study cubicles, orthopedic beds" }
    ],
    curfew: "11:00 PM",
    owner: {
      name: "Rohit Agashe",
      role: "Operations Manager",
      phone: "+91 98811 77203",
      responseRate: "Instant via WhatsApp",
      livesOnProperty: false
    },
    nearbyPlaces: [
      { name: "MIT-WPU Main Dome", distance: "0.6 km" },
      { name: "Ideal Colony Metro Station", distance: "0.4 km" },
      { name: "Cafe Goodluck Branch", distance: "0.3 km" }
    ]
  },
  {
    id: "bibwewadi-residency",
    name: "Bibwewadi Residency PG",
    type: "PG",
    gender: "Boys PG",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 5500,
    deposit: 5500,
    collegeId: "vit-pune",
    distanceKm: 0.5,
    walkingMins: 6,
    address: "Lane 2, Behind Chintamani Hospital, Bibwewadi, Pune",
    rating: 4.1,
    reviewsCount: 64,
    verified: true,
    verifiedDate: "Verified Sept 2026",
    mapCoords: { x: 51, y: 56 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Closest walk to VIT Pune lecture halls, zero commute hassle",
    description: "Straightforward student PG building with clean, well-lit rooms. Popular among VIT Mechanical and Electronics branches who spend long hours in campus workshops.",
    amenities: [
      { name: "Wi-Fi", icon: "Wifi", included: true },
      { name: "Hot Geyser Water", icon: "Flame", included: true },
      { name: "Filtered Water", icon: "Droplets", included: true },
      { name: "Daily Trash Collection", icon: "Trash2", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing", price: 6800, availability: "2 beds vacant", features: "Large window, wooden cots" },
      { type: "3 Sharing", price: 5500, availability: "3 beds vacant", features: "Budget saver, private lockers" }
    ],
    curfew: "10:30 PM",
    owner: {
      name: "Dattatray Kadam",
      role: "Owner",
      phone: "+91 98224 88310",
      responseRate: "Responds in 1 hour",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "VIT College Gate 2", distance: "0.5 km (6 min walk)" },
      { name: "Annapurna Mess", distance: "150m" }
    ]
  },
  {
    id: "saraswati-girls-pg",
    name: "Saraswati Girls PG",
    type: "PG",
    gender: "Girls PG",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 8200,
    deposit: 10000,
    collegeId: "vit-pune",
    distanceKm: 0.9,
    walkingMins: 11,
    address: "B-12, Sahakar Nagar 2, Near Padmavati Temple, Pune",
    rating: 4.7,
    reviewsCount: 94,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 44, y: 59 },
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Home-cooked Maharashtrian food included, strict 24/7 security",
    description: "Operated by a family residing on the ground floor. Includes nutritious lunch and dinner with home-style rotis and fresh vegetables. Verified by over 90 past and current women engineering students.",
    amenities: [
      { name: "Home Cooked Food Included", icon: "Utensils", included: true },
      { name: "Wi-Fi Included", icon: "Wifi", included: true },
      { name: "24/7 CCTV & Gate Guard", icon: "ShieldCheck", included: true },
      { name: "Washing Machine Access", icon: "Shirt", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing with Balcony", price: 8900, availability: "1 bed vacant", features: "Attached bath and balcony" },
      { type: "3 Sharing", price: 8200, availability: "2 beds vacant", features: "All meals included" }
    ],
    curfew: "9:45 PM",
    owner: {
      name: "Mrs. Sunita Kulkarni",
      role: "Homemaker & Owner",
      phone: "+91 97631 09244",
      responseRate: "Usually responds in 15 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "VIT Campus", distance: "0.9 km" },
      { name: "Sahakar Nagar Market", distance: "0.3 km" }
    ]
  },
  {
    id: "shivkrupa-boys-pg",
    name: "Shivkrupa Boys PG",
    type: "PG",
    gender: "Boys PG",
    sharingTypes: ["2 sharing", "3 sharing", "4 sharing"],
    price: 4900,
    deposit: 5000,
    collegeId: "vit-pune",
    distanceKm: 1.4,
    walkingMins: 16,
    address: "Survey 68, Upper Indira Nagar, Pune",
    rating: 4.4,
    reviewsCount: 71,
    verified: true,
    verifiedDate: "Verified July 2026",
    mapCoords: { x: 57, y: 64 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Pocket-friendly accommodation with flexible project hours",
    description: "Very popular among self-reliant students looking for economical rent under ₹5,000. Located right beside Upper Indira Nagar bus terminal with quick buses across Pune.",
    amenities: [
      { name: "High Speed Wi-Fi", icon: "Wifi", included: true },
      { name: "RO Water Plant", icon: "Droplets", included: true },
      { name: "Two-Wheeler Parking", icon: "Bike", included: true },
      { name: "Geysers", icon: "Flame", included: true }
    ],
    roomOptions: [
      { type: "3 Sharing", price: 4900, availability: "3 beds vacant", features: "Individual lockers and study corner" },
      { type: "2 Sharing", price: 6200, availability: "1 bed vacant", features: "Quiet corner room" }
    ],
    curfew: "11:00 PM (Late entry allowed with logbook)",
    owner: {
      name: "Vinod Tambe",
      role: "Owner",
      phone: "+91 93710 44521",
      responseRate: "Responds in 20 mins",
      livesOnProperty: false
    },
    nearbyPlaces: [
      { name: "Upper Depot Bus Stop", distance: "100 meters" },
      { name: "VIT Campus", distance: "1.4 km" }
    ]
  },
  {
    id: "coep-heritage-stays",
    name: "COEP Heritage Stays",
    type: "PG",
    gender: "Boys PG",
    sharingTypes: ["Single", "2 sharing"],
    price: 8500,
    deposit: 10000,
    collegeId: "coep-pune",
    distanceKm: 0.6,
    walkingMins: 7,
    address: "Near Sangam Bridge, Wakadewadi, Shivajinagar, Pune",
    rating: 4.6,
    reviewsCount: 104,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 50, y: 39 },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Walk to COEP campus, boat club, and Shivajinagar train station",
    description: "Prime location for COEP students. Well-ventilated rooms, high-speed fiber internet, and quiet study environment away from heavy traffic noise.",
    amenities: [
      { name: "Wi-Fi 200 Mbps", icon: "Wifi", included: true },
      { name: "Biometric Entry", icon: "ShieldCheck", included: true },
      { name: "Breakfast Included", icon: "Coffee", included: true },
      { name: "Study Library", icon: "BookOpen", included: true }
    ],
    roomOptions: [
      { type: "Single Room", price: 12000, availability: "1 vacant", features: "Attached bath and private desk" },
      { type: "2 Sharing", price: 8500, availability: "2 vacant", features: "Spacious with twin wardrobes" }
    ],
    curfew: "10:30 PM",
    owner: {
      name: "Prakash More",
      role: "Proprietor",
      phone: "+91 98221 34900",
      responseRate: "Responds in 10 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "COEP Main Gate", distance: "0.6 km" },
      { name: "Shivajinagar Station", distance: "0.4 km" }
    ]
  },
  {
    id: "fergusson-green-stays",
    name: "Ferguson Green Stays",
    type: "PG",
    gender: "Girls PG",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 8900,
    deposit: 12000,
    collegeId: "fergusson",
    distanceKm: 0.4,
    walkingMins: 5,
    address: "Lane Behind Starbucks, Off FC Road, Deccan, Pune",
    rating: 4.8,
    reviewsCount: 135,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 62, y: 46 },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Heart of FC Road, peaceful leafy by-lane, female warden 24/7",
    description: "One of the most sought-after student accommodations on FC Road. Surrounded by greenery with spotless rooms, modern washrooms, and strict safety guidelines.",
    amenities: [
      { name: "High Speed Fiber", icon: "Wifi", included: true },
      { name: "Female Warden on-site", icon: "ShieldCheck", included: true },
      { name: "Daily Housekeeping", icon: "Sparkles", included: true },
      { name: "Microwave & Kettle", icon: "Coffee", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing with Balcony", price: 9500, availability: "1 bed vacant", features: "Balcony garden view" },
      { type: "3 Sharing", price: 8900, availability: "2 beds vacant", features: "Ensuite bath" }
    ],
    curfew: "10:00 PM",
    owner: {
      name: "Mrs. Meera Chitale",
      role: "Owner",
      phone: "+91 98810 52319",
      responseRate: "Usually responds in 15 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "Fergusson College Main Gate", distance: "0.4 km" },
      { name: "Goodluck Cafe", distance: "0.3 km" }
    ]
  },
  {
    id: "hilltop-student-living",
    name: "Hilltop Student Living",
    type: "Hostel",
    gender: "Boys Hostel",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 7000,
    deposit: 8000,
    collegeId: "mit-wpu",
    distanceKm: 1.1,
    walkingMins: 13,
    address: "Mayur Colony, Near Dashbhuja Ganpati, Kothrud, Pune",
    rating: 4.4,
    reviewsCount: 58,
    verified: true,
    verifiedDate: "Verified July 2026",
    mapCoords: { x: 33, y: 68 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Indoor recreation hall, open terrace lounge, fast connectivity",
    description: "A well-managed boys hostel popular with MIT engineering and design scholars. Spacious open corridors with regular weekend cleaning and zero broker involvement.",
    amenities: [
      { name: "Wi-Fi", icon: "Wifi", included: true },
      { name: "Table Tennis & Carrom", icon: "Gamepad2", included: true },
      { name: "Inverter Power", icon: "Zap", included: true },
      { name: "Solar Water", icon: "Sun", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing", price: 8200, availability: "2 beds vacant", features: "Attached western toilet" },
      { type: "3 Sharing", price: 7000, availability: "3 beds vacant", features: "Standard student plan" }
    ],
    curfew: "10:30 PM",
    owner: {
      name: "Abhay Joshi",
      role: "Hostel Supervisor",
      phone: "+91 94220 90123",
      responseRate: "Responds in 25 mins",
      livesOnProperty: false
    },
    nearbyPlaces: [
      { name: "MIT-WPU Campus", distance: "1.1 km" },
      { name: "Dashbhuja Ganpati Chowk", distance: "0.3 km" }
    ]
  },
  {
    id: "modern-nest-pg",
    name: "Modern Nest PG",
    type: "PG",
    gender: "Girls PG",
    sharingTypes: ["Single", "2 sharing", "3 sharing"],
    price: 7800,
    deposit: 9000,
    collegeId: "sppu",
    distanceKm: 0.9,
    walkingMins: 11,
    address: "Off Senapati Bapat Road, Near Symbiosis & SPPU Gate, Pune",
    rating: 4.5,
    reviewsCount: 79,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 43, y: 33 },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Prime SB Road location, safe student enclave, 5G Wi-Fi",
    description: "Ideal for SPPU university postgraduates and researchers. Quiet residential building with pleasant natural light, study desks in every room, and easy bus links.",
    amenities: [
      { name: "Fiber 5G Wi-Fi", icon: "Wifi", included: true },
      { name: "Gated Security", icon: "ShieldCheck", included: true },
      { name: "Automatic Washing Machine", icon: "Shirt", included: true },
      { name: "Filtered Water Dispenser", icon: "Droplets", included: true }
    ],
    roomOptions: [
      { type: "Single Room", price: 11800, availability: "1 bed vacant", features: "Private washroom & desk" },
      { type: "2 Sharing", price: 7800, availability: "2 beds vacant", features: "Shared double wardrobe" }
    ],
    curfew: "10:15 PM",
    owner: {
      name: "Mrs. Shalini Rao",
      role: "Owner",
      phone: "+91 99229 65432",
      responseRate: "Responds in 20 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "SPPU Main Circle", distance: "0.9 km" },
      { name: "SB Road Crossword", distance: "0.5 km" }
    ]
  },
  {
    id: "pune-scholars-hostel",
    name: "Pune Central Scholars Hostel",
    type: "Hostel",
    gender: "Boys Hostel",
    sharingTypes: ["2 sharing", "3 sharing", "4 sharing"],
    price: 5200,
    deposit: 5000,
    collegeId: "coep-pune",
    distanceKm: 1.3,
    walkingMins: 15,
    address: "Rasta Peth, Near Apollo Cinema, Shivajinagar Hub, Pune",
    rating: 4.2,
    reviewsCount: 61,
    verified: false,
    verifiedDate: "Self-listed, audit scheduled",
    mapCoords: { x: 52, y: 44 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    tagline: "Budget hostel for outstation students, close to central stations",
    description: "Centrally positioned hostel catering to polytechnic and engineering students. Basic, functional accommodation with in-house mess options.",
    amenities: [
      { name: "Wi-Fi", icon: "Wifi", included: true },
      { name: "RO Water", icon: "Droplets", included: true },
      { name: "Security Guard", icon: "ShieldCheck", included: true }
    ],
    roomOptions: [
      { type: "3 Sharing", price: 5200, availability: "4 beds vacant", features: "Metal lockers, standard cots" },
      { type: "2 Sharing", price: 6500, availability: "2 beds vacant", features: "Cross-ventilated" }
    ],
    curfew: "10:00 PM",
    owner: {
      name: "Deepak Gaikwad",
      role: "Warden",
      phone: "+91 98230 18876",
      responseRate: "Responds within 2 hours",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "COEP Campus", distance: "1.3 km" },
      { name: "Shivajinagar Bus Stand", distance: "0.8 km" }
    ]
  },
  {
    id: "sai-krupa-living",
    name: "Sai Krupa Student Residency",
    type: "PG",
    gender: "Co-ed (Separate Floors)",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 6800,
    deposit: 8000,
    collegeId: "vit-pune",
    distanceKm: 1.1,
    walkingMins: 13,
    address: "Near Gangadham Chowk, Bibwewadi-Market Yard Link Road, Pune",
    rating: 4.4,
    reviewsCount: 52,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 56, y: 54 },
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Spacious balconies, attached bathrooms in every room, zero brokerage",
    description: "Newly painted building with dedicated male and female floors. Peaceful locality with multiple tiffin delivery hubs right around the corner.",
    amenities: [
      { name: "Wi-Fi", icon: "Wifi", included: true },
      { name: "Individual Geysers", icon: "Flame", included: true },
      { name: "CCTV in Common Areas", icon: "ShieldCheck", included: true },
      { name: "Fridge & Microwave Sharing", icon: "Coffee", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing", price: 7900, availability: "2 beds vacant", features: "Attached washroom, individual study tables" },
      { type: "3 Sharing", price: 6800, availability: "3 beds vacant", features: "Spacious cupboards" }
    ],
    curfew: "10:30 PM",
    owner: {
      name: "Anand Jagtap",
      role: "Property Owner",
      phone: "+91 97645 32189",
      responseRate: "Usually responds in 30 mins",
      livesOnProperty: false
    },
    nearbyPlaces: [
      { name: "Gangadham Chowk", distance: "0.3 km" },
      { name: "VIT Campus", distance: "1.1 km" }
    ]
  },
  {
    id: "techie-corner-pg",
    name: "Techie Corner PG",
    type: "PG",
    gender: "Boys PG",
    sharingTypes: ["Single", "2 sharing"],
    price: 8400,
    deposit: 10000,
    collegeId: "vit-pune",
    distanceKm: 0.7,
    walkingMins: 9,
    address: "Near Chintamani Garden, Bibwewadi, Pune",
    rating: 4.6,
    reviewsCount: 68,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 48, y: 57 },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    tagline: "Dedicated LAN ports, inverter backup for coding marathons & hackathons",
    description: "Built for engineers. Every desk has dedicated RJ-45 LAN port connected to redundant 300 Mbps fiber line. Late night access allowed for college coding hackathons.",
    amenities: [
      { name: "Dual ISP Fiber", icon: "Wifi", included: true },
      { name: "Uninterrupted Inverter", icon: "Zap", included: true },
      { name: "Ergonomic Chairs", icon: "Sparkles", included: true },
      { name: "Purified Water", icon: "Droplets", included: true }
    ],
    roomOptions: [
      { type: "Single Bed", price: 11000, availability: "1 vacant", features: "Dual monitors desk space" },
      { type: "Double Sharing", price: 8400, availability: "2 vacant", features: "Side by side workstations" }
    ],
    curfew: "Open 24/7 with digital passcode",
    owner: {
      name: "Ketan Bhalerao",
      role: "Tech Alum & Owner",
      phone: "+91 98901 22345",
      responseRate: "Responds in 5 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "VIT Gate 1", distance: "0.7 km" },
      { name: "Bibwewadi Main Road", distance: "0.2 km" }
    ]
  },
  {
    id: "pragati-boys-hostel",
    name: "Pragati Boys Hostel",
    type: "Hostel",
    gender: "Boys Hostel",
    sharingTypes: ["3 sharing", "4 sharing"],
    price: 4500,
    deposit: 4000,
    collegeId: "vit-pune",
    distanceKm: 1.8,
    walkingMins: 20,
    address: "Kondhwa Budruk Road, Near Lullanagar Cross, Pune",
    rating: 4.0,
    reviewsCount: 42,
    verified: true,
    verifiedDate: "Verified June 2026",
    mapCoords: { x: 61, y: 63 },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    tagline: "Lowest price guarantee for first-year engineering students",
    description: "Simple, honest, and very affordable hostel accommodation. Close to Kondhwa food joints and regular bus links straight to Bibwewadi.",
    amenities: [
      { name: "Basic Wi-Fi", icon: "Wifi", included: true },
      { name: "Solar Heated Water", icon: "Sun", included: true },
      { name: "Night Security", icon: "ShieldCheck", included: true }
    ],
    roomOptions: [
      { type: "4 Sharing", price: 4500, availability: "3 beds vacant", features: "Budget saver option" },
      { type: "3 Sharing", price: 5400, availability: "2 beds vacant", features: "Standard room" }
    ],
    curfew: "10:00 PM",
    owner: {
      name: "Pandurang Gawande",
      role: "Warden",
      phone: "+91 98226 77112",
      responseRate: "Responds in 45 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "VIT Campus", distance: "1.8 km" },
      { name: "Kondhwa Bus Stop", distance: "200m" }
    ]
  },
  {
    id: "royal-meadows-stay",
    name: "Royal Meadows Student Residency",
    type: "PG",
    gender: "Co-ed (Separate Wings)",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 9200,
    deposit: 12000,
    collegeId: "fergusson",
    distanceKm: 0.8,
    walkingMins: 9,
    address: "Ghole Road, Near Balgandharva Ranga Mandir, Shivajinagar, Pune",
    rating: 4.7,
    reviewsCount: 88,
    verified: true,
    verifiedDate: "Verified Aug 2026",
    mapCoords: { x: 57, y: 42 },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Prime cultural hub, modern furnishings, breakfast & dinner included",
    description: "Quiet residential lane between FC Road and JM Road. Offers high security, healthy food plans, and a community of Fergusson and BMCC students.",
    amenities: [
      { name: "Food Included (2 meals)", icon: "Utensils", included: true },
      { name: "Fiber Wi-Fi", icon: "Wifi", included: true },
      { name: "CCTV & Biometric", icon: "ShieldCheck", included: true },
      { name: "Daily Cleaning", icon: "Sparkles", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing Premium", price: 10500, availability: "2 vacant", features: "Attached washroom & balcony" },
      { type: "3 Sharing", price: 9200, availability: "1 vacant", features: "Food included" }
    ],
    curfew: "10:30 PM",
    owner: {
      name: "Sandeep Sathe",
      role: "Owner",
      phone: "+91 98904 43210",
      responseRate: "Usually responds in 15 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "Fergusson Main Gate", distance: "0.8 km" },
      { name: "JM Road Bus Stop", distance: "0.2 km" }
    ]
  },
  {
    id: "shanti-kunj-girls",
    name: "Shanti Kunj Girls Hostel",
    type: "Hostel",
    gender: "Girls Hostel",
    sharingTypes: ["2 sharing", "3 sharing"],
    price: 6600,
    deposit: 7000,
    collegeId: "mit-wpu",
    distanceKm: 0.9,
    walkingMins: 11,
    address: "Rambaug Colony, Paud Road, Kothrud, Pune",
    rating: 4.5,
    reviewsCount: 65,
    verified: true,
    verifiedDate: "Verified July 2026",
    mapCoords: { x: 37, y: 67 },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    ],
    tagline: "Caring resident warden, secure residential pocket, student mess nearby",
    description: "Safe and established girls hostel close to MIT-WPU engineering buildings. Includes laundry facilities, quiet night study hours, and welcoming atmosphere.",
    amenities: [
      { name: "Wi-Fi", icon: "Wifi", included: true },
      { name: "Resident Matron 24/7", icon: "ShieldCheck", included: true },
      { name: "Solar Water", icon: "Sun", included: true },
      { name: "Purified Water", icon: "Droplets", included: true }
    ],
    roomOptions: [
      { type: "2 Sharing", price: 7800, availability: "1 vacant", features: "Bright airy windows" },
      { type: "3 Sharing", price: 6600, availability: "2 vacant", features: "Comfortable layout" }
    ],
    curfew: "9:30 PM",
    owner: {
      name: "Mrs. Vandana Gupte",
      role: "Hostel Matron",
      phone: "+91 98229 01844",
      responseRate: "Responds in 20 mins",
      livesOnProperty: true
    },
    nearbyPlaces: [
      { name: "MIT Campus", distance: "0.9 km" },
      { name: "Paud Phata", distance: "0.4 km" }
    ]
  }
];

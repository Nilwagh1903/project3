export const TRANSPORT_ROUTES = [
  {
    id: "route-vit-station",
    from: "VIT Pune (Gate 2)",
    fromCollegeId: "vit-pune",
    to: "Pune Railway Station",
    distanceKm: 8.5,
    estimatedTime: "25 - 35 mins",
    options: [
      {
        mode: "Bus (PMPML)",
        routeNumber: "Bus 42 / 24",
        boardingPoint: "Upper Indira Nagar Depot (500m from college)",
        frequency: "Every 10 mins",
        fare: "₹15 - ₹20",
        studentTip: "PMPML monthly student pass works on this route (₹750/mo unlimited)."
      },
      {
        mode: "Shared Auto",
        routeNumber: "Station Line Auto",
        boardingPoint: "Bibwewadi Chowk",
        frequency: "Every 3 mins",
        fare: "₹35 per seat",
        studentTip: "Direct drop to Station South Gate without transfers."
      },
      {
        mode: "Direct Auto (Meter)",
        fare: "₹110 - ₹140",
        studentTip: "Make sure they run by meter or use Ola/Uber Auto."
      }
    ],
    stops: [
      "VIT College Gate",
      "Bibwewadi Chowk",
      "Padmavati Temple",
      "Swargate Flyover",
      "Nana Peth",
      "Pune Station South Exit"
    ],
    safetyNote: "Upper Depot bus route is well lit until 11:30 PM. Auto stands at Bibwewadi chowk have police presence."
  },
  {
    id: "route-vit-swargate",
    from: "VIT Pune",
    fromCollegeId: "vit-pune",
    to: "Swargate Bus Stand & Metro",
    distanceKm: 4.2,
    estimatedTime: "12 - 18 mins",
    options: [
      {
        mode: "Bus (PMPML)",
        routeNumber: "Bus 28, 29, 39",
        boardingPoint: "Chintamani Hospital Stop",
        frequency: "Every 5 mins",
        fare: "₹10",
        studentTip: "Takes direct BRTS lane to avoid Satara Road traffic."
      },
      {
        mode: "Shared Auto",
        routeNumber: "Swargate 6-seater",
        boardingPoint: "Bibwewadi Police Chowki",
        frequency: "Continuous",
        fare: "₹20",
        studentTip: "Get off at Swargate Underground Metro terminal."
      }
    ],
    stops: [
      "VIT Gate",
      "Chintamani Nagar",
      "Pushpa Mangal Karyalaya",
      "Laxmi Narayan Cinema",
      "Swargate Terminus"
    ],
    safetyNote: "High frequency daytime corridor. Always prefer BRTS bus in morning rush."
  },
  {
    id: "route-coep-station",
    from: "COEP Technological University",
    fromCollegeId: "coep-pune",
    to: "Pune Railway Station",
    distanceKm: 2.1,
    estimatedTime: "8 - 12 mins",
    options: [
      {
        mode: "Walk + Metro",
        routeNumber: "Pune Metro Purple Line",
        boardingPoint: "Shivajinagar Metro Station (400m)",
        frequency: "Every 7 mins",
        fare: "₹10 (₹7 with student card)",
        studentTip: "Fastest way to beat Sangam bridge traffic."
      },
      {
        mode: "City Auto",
        fare: "₹40 - ₹50",
        studentTip: "Shared autos also queue right under Shivajinagar flyover."
      }
    ],
    stops: [
      "COEP Boat Club Gate",
      "Shivajinagar Station",
      "Sangam Bridge",
      "Pune Station Gate 1"
    ],
    safetyNote: "Very safe 24/7 route due to heavy police patrolling near Collectorate and court."
  },
  {
    id: "route-mit-deccan",
    from: "MIT-WPU Kothrud",
    fromCollegeId: "mit-wpu",
    to: "Deccan Gymkhana & FC Road",
    distanceKm: 3.8,
    estimatedTime: "15 - 20 mins",
    options: [
      {
        mode: "Pune Metro Line 2 (Aqua)",
        routeNumber: "Ideal Colony → Deccan Gymkhana",
        boardingPoint: "Ideal Colony Metro (700m from MIT)",
        frequency: "Every 8 mins",
        fare: "₹15",
        studentTip: "Hop on the Aqua Line for a 5-minute cool ride without traffic."
      },
      {
        mode: "Bus (PMPML)",
        routeNumber: "Bus 94, 98",
        boardingPoint: "Paud Phata Stop",
        frequency: "Every 8 mins",
        fare: "₹10",
        studentTip: "Direct drop to Deccan Bus Stand."
      }
    ],
    stops: [
      "MIT Campus Main Road",
      "Ideal Colony",
      "Paud Phata",
      "Garware College",
      "Deccan Gymkhana"
    ],
    safetyNote: "One of the most student-dense and safest stretches in Pune with bike lanes."
  },
  {
    id: "route-fc-station",
    from: "Fergusson College (FC Road)",
    fromCollegeId: "fergusson",
    to: "Shivajinagar Railway & Bus Stand",
    distanceKm: 1.6,
    estimatedTime: "6 - 10 mins",
    options: [
      {
        mode: "Auto / Rickshaw",
        fare: "₹30 - ₹40",
        studentTip: "Auto stands stationed right outside Goodluck Cafe and FC Main Gate."
      },
      {
        mode: "Walk",
        estimatedTime: "15 mins",
        studentTip: "Scenic walk down Ghole Road or JM Road footpaths."
      }
    ],
    stops: [
      "FC Main Gate",
      "Goodluck Chowk",
      "Modern College Chowk",
      "Shivajinagar Station"
    ],
    safetyNote: "Vibrant pedestrian avenue with active shops open past midnight."
  },
  {
    id: "route-vit-katraj",
    from: "VIT Pune",
    fromCollegeId: "vit-pune",
    to: "Katraj Snake Park / Bus Depot",
    distanceKm: 4.8,
    estimatedTime: "15 - 20 mins",
    options: [
      {
        mode: "Bus (PMPML)",
        routeNumber: "Bus 103, 107",
        boardingPoint: "Upper Depot",
        frequency: "Every 12 mins",
        fare: "₹10 - ₹15",
        studentTip: "Great for weekend runs to Rajiv Gandhi Zoo or Bharati Vidyapeeth."
      },
      {
        mode: "Shared Auto",
        boardingPoint: "Bibwewadi Chowk",
        fare: "₹25",
        studentTip: "Popular for daily Bharati Vidyapeeth cross-campus visits."
      }
    ],
    stops: [
      "VIT College Gate",
      "Upper Depot",
      "Kondhwa Budruk",
      "Katraj Dairy",
      "Katraj Lake Terminus"
    ],
    safetyNote: "Frequent student transit throughout daytime and early evening."
  },
  {
    id: "route-kothrud-airport",
    from: "MIT-WPU / Kothrud",
    fromCollegeId: "mit-wpu",
    to: "Pune International Airport (Lohegaon)",
    distanceKm: 16.5,
    estimatedTime: "45 - 60 mins",
    options: [
      {
        mode: "Airport AC Express Bus",
        routeNumber: "AbhiBus PMPML AeroMall",
        boardingPoint: "Kothrud Stand / Deccan",
        frequency: "Every 30 mins",
        fare: "₹90",
        studentTip: "Luggage friendly with air-conditioned low-floor buses."
      },
      {
        mode: "Cab (Ola/Uber)",
        fare: "₹380 - ₹480",
        studentTip: "Pool with 2-3 college batchmates before semester breaks."
      }
    ],
    stops: [
      "Kothrud Depot",
      "Deccan",
      "RTO Pune",
      "Yerwada",
      "Viman Nagar",
      "Lohegaon Airport"
    ],
    safetyNote: "Pre-book airport cabs during festival rushes (Diwali & semester break)."
  },
  {
    id: "route-sppu-station",
    from: "SPPU (Pune University)",
    fromCollegeId: "sppu",
    to: "Pune Railway Station",
    distanceKm: 6.2,
    estimatedTime: "20 - 30 mins",
    options: [
      {
        mode: "Bus (PMPML)",
        routeNumber: "Bus 148, 177",
        boardingPoint: "University Main Gate BRTS",
        frequency: "Every 8 mins",
        fare: "₹15",
        studentTip: "Board from the sheltered BRTS platform at university circle."
      },
      {
        mode: "Auto",
        fare: "₹90 - ₹120",
        studentTip: "Direct prepaid auto booth available inside university campus gate."
      }
    ],
    stops: [
      "SPPU Main Gate",
      "E-Square Cinema",
      "Sancheti Hospital",
      "COEP Ground",
      "Pune Station"
    ],
    safetyNote: "Ganeshkhind Road has broad lit sidewalks and continuous traffic."
  }
];

export const AUTO_FARE_GUIDE = [
  { item: "Standard Day Meter (Minimum 1.5 km)", fare: "₹25" },
  { item: "Rate per subsequent kilometer", fare: "₹17 / km" },
  { item: "Night Charge (12:00 AM to 5:00 AM)", fare: "25% above meter" },
  { item: "Average Shared Auto Seat (Within 3 km)", fare: "₹20 - ₹35 / seat" }
];

export const STUDENT_TRANSIT_TIPS = [
  {
    title: "Apply for PMPML Student Concession Pass",
    desc: "First-year students get up to 50% discount on monthly and quarterly city bus passes with college bonafide certificate.",
    badge: "Saves ₹600/month"
  },
  {
    title: "Pune Metro Student Smart Card (Maha Card)",
    desc: "Gives a flat 30% discount on Metro Purple & Aqua lines on all days for students under 25 years.",
    badge: "Fastest Transit"
  },
  {
    title: "Always confirm shared auto drop point",
    desc: "Shared rickshaws in Bibwewadi & Kothrud drop at standard chowks (e.g. Swargate, Station). Confirm before getting in.",
    badge: "Pocket Friendly"
  }
];

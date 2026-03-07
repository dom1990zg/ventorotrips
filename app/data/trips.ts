export type Trip = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  tag: string;
  description: string;
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
};

export const TRIPS: Trip[] = [
  {
    slug: "sunset-dolphin-tour",
    title: "Sunset Dolphin Boat Tour",
    location: "Poreč Marina",
    duration: "2h",
    priceFrom: 59,
    rating: 4.9,
    reviews: 248,
    tag: "Sunset",
    description:
      "Golden-hour cruise along the Poreč coastline with a relaxed pace, dolphin spotting and a perfect sunset finish.",
    images: ["/trips/sunset.jpg", "/trips/sunset2.jpg"],
    highlights: ["Golden hour views", "Dolphin spotting route", "Small-group atmosphere"],
    included: ["Licensed skipper", "Fuel costs", "Safety equipment", "Welcome drink"],
    notIncluded: ["Hotel transfer", "Personal travel insurance", "Extra drinks"],
  },
  {
    slug: "private-wine-and-sea",
    title: "Private Wine & Sea Escape",
    location: "Istrian Coast",
    duration: "4h",
    priceFrom: 149,
    rating: 4.7,
    reviews: 161,
    tag: "Private",
    description:
      "Private charter experience with flexible swim stops, coastal views and a premium local vibe.",
    images: ["/trips/wine.jpg", "/trips/wine2.jpg"],
    highlights: ["100% private boat", "Flexible route", "Premium local feel"],
    included: ["Private skipper", "Fuel", "Water on board", "Snorkeling masks"],
    notIncluded: ["Lunch", "Entrance fees (if any)", "Hotel pickup"],
  },
  {
    slug: "kayak-old-town",
    title: "Sea Kayak: Old Town & Caves",
    location: "Poreč",
    duration: "3h",
    priceFrom: 49,
    rating: 4.6,
    reviews: 122,
    tag: "Active",
    description:
      "Guided sea-kayak route past the old town with cave stops, cliffs and swim breaks.",
    images: ["/trips/kayak.jpg", "/trips/kayak2.jpg"],
    highlights: ["Active sea route", "Caves and cliffs", "Beginner-friendly pace"],
    included: ["Kayak & paddle", "Guide", "Life vest", "Dry bag"],
    notIncluded: ["Water shoes", "Transfer", "Personal snacks"],
  },
  {
    slug: "rovinj-day-cruise",
    title: "Day Cruise to Rovinj",
    location: "Poreč → Rovinj",
    duration: "6h",
    priceFrom: 79,
    rating: 4.8,
    reviews: 203,
    tag: "Day trip",
    description:
      "Easy day cruise with free time in Rovinj, scenic photo spots and a laid-back return.",
    images: ["/trips/rovinj.jpg", "/trips/rovinj2.jpg"],
    highlights: ["Visit Rovinj in one day", "Coastal panorama", "Free time in old town"],
    included: ["Boat transfer", "Tour host", "Basic insurance"],
    notIncluded: ["Lunch", "Optional activities", "Entry tickets"],
  },
  {
    slug: "luxury-yacht-experience",
    title: "Luxury Yacht Experience",
    location: "Poreč Marina",
    duration: "3h",
    priceFrom: 299,
    rating: 5.0,
    reviews: 44,
    tag: "Luxury",
    description:
      "High-end yacht experience with premium comfort, curated route and the best views of the Riviera.",
    images: ["/trips/luxury-yacht.jpg", "/trips/luxury-yacht2.jpg"],
    highlights: ["Luxury yacht", "Premium comfort", "Curated route and service"],
    included: ["Captain & crew", "Fuel", "Premium beverages", "Towels"],
    notIncluded: ["Hotel pickup", "Special request catering", "Tips"],
  },
  {
    slug: "dolphin-watching",
    title: "Dolphin Watching (Golden Hour)",
    location: "West Coast • Istria",
    duration: "2.5h",
    priceFrom: 75,
    rating: 4.7,
    reviews: 161,
    tag: "Wildlife",
    description:
      "A calm evening cruise focused on dolphin spotting with respectful distance and beautiful sea-light.",
    images: ["/trips/dolphin.jpg", "/trips/dolphin2.jpg"],
    highlights: ["Wildlife-focused route", "Eco-respectful approach", "Best light for photos"],
    included: ["Boat tour", "Guide", "Safety gear", "Soft drink"],
    notIncluded: ["Food", "Hotel transfer", "Private photographer"],
  },
];
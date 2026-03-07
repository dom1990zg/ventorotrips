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
    description: "Golden-hour cruise along the Poreč coastline.",
    images: ["/trips/sunset.jpg", "/trips/sunset2.jpg"],
    highlights: ["Golden hour views", "Small-group atmosphere"],
    included: ["Licensed skipper", "Fuel costs", "Safety equipment"],
    notIncluded: ["Hotel transfer", "Extra drinks"],
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
    description: "Guided sea-kayak route with cave and swim stops.",
    images: ["/trips/kayak.jpg", "/trips/kayak.jpg"],
    highlights: ["Active sea route", "Beginner-friendly pace"],
    included: ["Kayak & paddle", "Guide", "Life vest"],
    notIncluded: ["Transfer", "Personal snacks"],
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
    description: "Day cruise with free time in Rovinj.",
    images: ["/trips/rovinj.jpg", "/trips/rovinj2.jpg"],
    highlights: ["Visit Rovinj in one day", "Coastal panorama"],
    included: ["Boat transfer", "Tour host"],
    notIncluded: ["Lunch", "Entry tickets"],
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
    description: "High-end yacht experience with premium comfort.",
    images: ["/trips/luxury-yacht.jpg", "/trips/luxury-yacht2.jpg"],
    highlights: ["Luxury yacht", "Premium comfort"],
    included: ["Captain & crew", "Fuel", "Premium beverages"],
    notIncluded: ["Hotel pickup", "Tips"],
  },
];
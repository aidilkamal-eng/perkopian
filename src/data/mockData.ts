import { Cafe, Review } from '../types';

export const mockCafes: Cafe[] = [
  {
    id: '1',
    name: 'Brew & Co.',
    description: 'A spacious café with industrial decor, plenty of seating, and a quiet atmosphere perfect for focused work. Known for their specialty coffee and friendly baristas.',
    address: '123 Main St, San Francisco, CA 94105',
    neighborhood: 'SoMa',
    imageUrl: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
    photos: [
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
    ],
    hours: 'Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm',
    priceLevel: '$$',
    tags: ['Quiet', 'Spacious', 'Fast WiFi', 'Power Outlets', 'Specialty Coffee'],
    overallRating: 4.7,
    wifiRating: 4.8,
    wifiNotes: 'Fast and reliable WiFi with dedicated network for customers.',
    powerOutlets: 4.5,
    powerNotes: 'Power outlets at most tables and along the walls.',
    noiseLevel: 2.1,
    noiseNotes: 'Generally quiet with soft background music.',
    comfort: 4.6,
    comfortNotes: 'Comfortable seating with a mix of tables, booths, and couches.',
    coffeeQuality: 4.9,
    crowdedness: 2.8,
    reviewCount: 42,
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-06-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Digital Grounds',
    description: 'A tech-friendly café designed with remote workers in mind. Features high-speed internet, noise-cancelling booths, and an innovative menu of brain-boosting snacks and drinks.',
    address: '456 Market St, San Francisco, CA 94105',
    neighborhood: 'Financial District',
    imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
    photos: [
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
    ],
    hours: 'Mon-Fri: 6am-8pm, Sat-Sun: 7am-7pm',
    priceLevel: '$$$',
    tags: ['Tech-Friendly', 'Private Booths', 'High-Speed WiFi', 'Standing Desks'],
    overallRating: 4.9,
    wifiRating: 5.0,
    wifiNotes: 'Enterprise-grade WiFi with separate networks for video calls.',
    powerOutlets: 5.0,
    powerNotes: 'USB-C and standard outlets at every seat.',
    noiseLevel: 1.8,
    noiseNotes: 'Sound-dampening design and quiet zones available.',
    comfort: 4.8,
    comfortNotes: 'Ergonomic chairs and adjustable-height tables.',
    coffeeQuality: 4.7,
    crowdedness: 3.2,
    reviewCount: 38,
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2023-06-18T11:45:00Z'
  },
  {
    id: '3',
    name: 'The Cozy Corner',
    description: 'A charming neighborhood café with a homey atmosphere. Perfect for those who prefer a relaxed environment with comfortable seating and homemade pastries.',
    address: '789 Valencia St, San Francisco, CA 94110',
    neighborhood: 'Mission',
    imageUrl: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
    photos: [
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
    ],
    hours: 'Daily: 8am-6pm',
    priceLevel: '$',
    tags: ['Cozy', 'Homemade Food', 'Friendly Staff', 'Outdoor Seating'],
    overallRating: 4.3,
    wifiRating: 3.8,
    wifiNotes: 'WiFi can slow down during peak hours.',
    powerOutlets: 3.2,
    powerNotes: 'Limited outlets, mostly along the walls.',
    noiseLevel: 3.5,
    noiseNotes: 'Can get noisy during lunch rush.',
    comfort: 4.5,
    comfortNotes: 'Very comfortable armchairs and couches.',
    coffeeQuality: 4.6,
    crowdedness: 3.7,
    reviewCount: 29,
    createdAt: '2023-03-05T10:30:00Z',
    updatedAt: '2023-06-15T16:20:00Z'
  },
  {
    id: '4',
    name: 'Byte & Brew',
    description: 'A modern café with a tech-inspired theme. Popular among programmers and designers, with coding meetups hosted regularly. Known for their themed drinks like "Java Script" and "Python Punch".',
    address: '101 Howard St, San Francisco, CA 94105',
    neighborhood: 'SoMa',
    imageUrl: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    photos: [
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
    ],
    hours: 'Mon-Fri: 7am-9pm, Sat-Sun: 8am-8pm',
    priceLevel: '$$',
    tags: ['Tech-Themed', 'Coding Meetups', 'Fast WiFi', 'Late Hours'],
    overallRating: 4.6,
    wifiRating: 4.9,
    wifiNotes: 'Fiber internet with open ports for developers.',
    powerOutlets: 4.7,
    powerNotes: 'Power strips at every table.',
    noiseLevel: 2.8,
    noiseNotes: 'Moderate noise level with tech discussions happening.',
    comfort: 4.2,
    comfortNotes: 'Modern furniture that prioritizes function over comfort.',
    coffeeQuality: 4.5,
    crowdedness: 3.5,
    reviewCount: 45,
    createdAt: '2023-01-20T11:45:00Z',
    updatedAt: '2023-06-22T09:10:00Z'
  },
  {
    id: '5',
    name: 'Serenity Café',
    description: 'A peaceful oasis in the busy city, with a zen garden theme. Features noise-cancelling architecture and a "quiet zone" policy. Perfect for deep focus work.',
    address: '222 Fillmore St, San Francisco, CA 94117',
    neighborhood: 'Lower Haight',
    imageUrl: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
    photos: [
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    hours: 'Daily: 7am-7pm',
    priceLevel: '$$',
    tags: ['Quiet', 'Zen', 'Meditation Corner', 'Healthy Options'],
    overallRating: 4.8,
    wifiRating: 4.6,
    wifiNotes: 'Reliable WiFi with good coverage throughout.',
    powerOutlets: 4.3,
    powerNotes: 'Discreetly placed outlets at most seating areas.',
    noiseLevel: 1.5,
    noiseNotes: 'One of the quietest cafés in the city.',
    comfort: 4.7,
    comfortNotes: 'Ergonomic seating with back support cushions available.',
    coffeeQuality: 4.4,
    crowdedness: 2.5,
    reviewCount: 31,
    createdAt: '2023-02-28T14:20:00Z',
    updatedAt: '2023-06-19T13:15:00Z'
  },
  {
    id: '6',
    name: 'Urban Workshop',
    description: 'A café and co-working hybrid with industrial design. Offers hourly desk rentals and meeting rooms alongside great coffee. Popular with freelancers and small teams.',
    address: '555 Hayes St, San Francisco, CA 94102',
    neighborhood: 'Hayes Valley',
    imageUrl: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    photos: [
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
      'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
    ],
    hours: 'Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm',
    priceLevel: '$$$',
    tags: ['Co-working', 'Meeting Rooms', 'Professional', '24/7 Access'],
    overallRating: 4.5,
    wifiRating: 4.7,
    wifiNotes: 'Business-class internet with VPN support.',
    powerOutlets: 4.9,
    powerNotes: 'Integrated power in all desks and tables.',
    noiseLevel: 2.3,
    noiseNotes: 'Well-managed noise levels with designated quiet areas.',
    comfort: 4.4,
    comfortNotes: 'Professional office chairs and proper desks.',
    coffeeQuality: 4.3,
    crowdedness: 3.8,
    reviewCount: 52,
    createdAt: '2023-01-05T08:30:00Z',
    updatedAt: '2023-06-21T15:40:00Z'
  },
  {
    id: '7',
    name: 'The Book & Bean',
    description: 'A café-bookstore combination with a scholarly atmosphere. Thousands of books line the walls, and reading is encouraged. Perfect for writers and academics.',
    address: '333 Clement St, San Francisco, CA 94118',
    neighborhood: 'Richmond',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    photos: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
    ],
    hours: 'Daily: 8am-9pm',
    priceLevel: '$$',
    tags: ['Bookstore', 'Literary Events', 'Quiet', 'Reading Nooks'],
    overallRating: 4.4,
    wifiRating: 4.2,
    wifiNotes: 'Good WiFi throughout, password changes weekly.',
    powerOutlets: 3.8,
    powerNotes: 'Outlets available in reading corners and some tables.',
    noiseLevel: 1.9,
    noiseNotes: 'Library-like quiet with occasional book discussions.',
    comfort: 4.5,
    comfortNotes: 'Comfortable reading chairs and good lighting.',
    coffeeQuality: 4.2,
    crowdedness: 3.0,
    reviewCount: 36,
    createdAt: '2023-03-15T12:10:00Z',
    updatedAt: '2023-06-17T10:25:00Z'
  },
  {
    id: '8',
    name: 'Sunrise Roasters',
    description: 'A café focused on ethically sourced, in-house roasted coffee. Large windows provide abundant natural light, and the minimalist design helps maintain focus.',
    address: '777 Irving St, San Francisco, CA 94122',
    neighborhood: 'Sunset',
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    photos: [
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg'
    ],
    hours: 'Mon-Fri: 6:30am-6pm, Sat-Sun: 7am-5pm',
    priceLevel: '$$',
    tags: ['In-house Roasting', 'Natural Light', 'Minimalist', 'Sustainable'],
    overallRating: 4.2,
    wifiRating: 3.9,
    wifiNotes: 'Decent WiFi that can slow during peak hours.',
    powerOutlets: 3.5,
    powerNotes: 'Limited outlets, mostly near the walls.',
    noiseLevel: 2.7,
    noiseNotes: 'Coffee equipment creates some background noise.',
    comfort: 4.0,
    comfortNotes: 'Wooden chairs that are stylish but not for all-day sitting.',
    coffeeQuality: 4.8,
    crowdedness: 3.3,
    reviewCount: 27,
    createdAt: '2023-02-05T07:45:00Z',
    updatedAt: '2023-06-16T08:50:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '101',
    cafeId: '1',
    user: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    date: '2023-05-15T14:30:00Z',
    comment: 'This is my go-to spot for client meetings and focused work. The WiFi is blazing fast, and I love that there are plenty of outlets. The staff is super friendly and doesn\'t mind if you camp out for a few hours. Their cold brew is amazing too!',
    overallRating: 5,
    wifiRating: 5,
    powerOutlets: 5,
    noiseLevel: 2,
    comfort: 4,
    photos: [
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
    ],
    helpfulCount: 12
  },
  {
    id: '102',
    cafeId: '1',
    user: {
      id: '2',
      name: 'Sarah Miller',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    date: '2023-04-20T09:15:00Z',
    comment: 'Great atmosphere for getting work done. The WiFi is reliable, and there are enough power outlets for everyone. It can get a bit crowded around lunchtime, but otherwise, it\'s perfect for remote work. The pastries are delicious too!',
    overallRating: 4,
    wifiRating: 4,
    powerOutlets: 4,
    noiseLevel: 3,
    comfort: 5,
    helpfulCount: 8
  },
  {
    id: '103',
    cafeId: '2',
    user: {
      id: '3',
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    date: '2023-05-02T16:45:00Z',
    comment: 'This place is a remote worker\'s dream! The WiFi is the fastest I\'ve experienced in any café, and the noise-cancelling booths are perfect for video calls. A bit pricey, but worth every penny for the productivity boost.',
    overallRating: 5,
    wifiRating: 5,
    powerOutlets: 5,
    noiseLevel: 1,
    comfort: 5,
    photos: [
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg'
    ],
    helpfulCount: 15
  },
  {
    id: '104',
    cafeId: '3',
    user: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    date: '2023-03-10T11:20:00Z',
    comment: 'Such a cozy spot! The WiFi can be a bit spotty during busy hours, but the comfortable seating and amazing pastries make up for it. Great for casual work but maybe not for important video meetings.',
    overallRating: 4,
    wifiRating: 3,
    powerOutlets: 3,
    noiseLevel: 4,
    comfort: 5,
    helpfulCount: 6
  },
  {
    id: '105',
    cafeId: '4',
    user: {
      id: '4',
      name: 'Emily Wong',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    date: '2023-05-18T13:10:00Z',
    comment: 'As a software developer, I love the tech vibe here! The themed drinks are fun, and the WiFi is optimized for developers (they even have open ports for various services). Great place to code for hours.',
    overallRating: 5,
    wifiRating: 5,
    powerOutlets: 5,
    noiseLevel: 3,
    comfort: 4,
    photos: [
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg'
    ],
    helpfulCount: 11
  },
  {
    id: '106',
    cafeId: '5',
    user: {
      id: '5',
      name: 'Michael Brown',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
    },
    date: '2023-04-05T10:30:00Z',
    comment: 'When I need deep focus, this is my sanctuary. The quiet policy is strictly enforced, which I appreciate. The zen garden view from the window seats is calming, and the herbal teas help me concentrate.',
    overallRating: 5,
    wifiRating: 4,
    powerOutlets: 4,
    noiseLevel: 1,
    comfort: 5,
    helpfulCount: 9
  },
  {
    id: '107',
    cafeId: '1',
    user: {
      id: '6',
      name: 'Jessica Taylor',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
    },
    date: '2023-05-25T15:40:00Z',
    comment: 'I\'ve tried many cafés for remote work, and this one tops the list. The WiFi never drops, even during video calls, and the ambient music is at the perfect volume. The staff remembers regular customers, which adds a nice personal touch.',
    overallRating: 5,
    wifiRating: 5,
    powerOutlets: 4,
    noiseLevel: 2,
    comfort: 4,
    helpfulCount: 7
  },
  {
    id: '108',
    cafeId: '6',
    user: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    date: '2023-02-15T09:50:00Z',
    comment: 'This place bridges the gap between a café and a coworking space perfectly. I love that I can have casual coffee meetings and then rent a proper meeting room when needed. The 24/7 access option is great for night owls like me.',
    overallRating: 4,
    wifiRating: 5,
    powerOutlets: 5,
    noiseLevel: 2,
    comfort: 4,
    photos: [
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg'
    ],
    helpfulCount: 10
  }
];
/*
  # Add Sample Cafe Data

  1. Sample Cafes
    - Insert cafes with proper UUID values
    - Include all cafe details and ratings
*/

-- Insert sample cafes with proper UUIDs
INSERT INTO cafes (
  id, name, description, address, neighborhood, image_url, photos, hours, price_level, tags,
  overall_rating, wifi_rating, wifi_notes, power_outlets, power_notes, noise_level, noise_notes,
  comfort, comfort_notes, coffee_quality, crowdedness, review_count
) VALUES 
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
  'Brew & Co.', 
  'A spacious café with industrial decor, plenty of seating, and a quiet atmosphere perfect for focused work. Known for their specialty coffee and friendly baristas.',
  '123 Main St, San Francisco, CA 94105',
  'SoMa',
  'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
    'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg'
  ],
  'Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm',
  '$$',
  ARRAY['Quiet', 'Spacious', 'Fast WiFi', 'Power Outlets', 'Specialty Coffee'],
  4.7, 4.8, 'Fast and reliable WiFi with dedicated network for customers.',
  4.5, 'Power outlets at most tables and along the walls.',
  2.1, 'Generally quiet with soft background music.',
  4.6, 'Comfortable seating with a mix of tables, booths, and couches.',
  4.9, 2.8, 42
),
(
  'b2c3d4e5-f6g7-8901-bcde-f23456789012',
  'Digital Grounds',
  'A tech-friendly café designed with remote workers in mind. Features high-speed internet, noise-cancelling booths, and an innovative menu of brain-boosting snacks and drinks.',
  '456 Market St, San Francisco, CA 94105',
  'Financial District',
  'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
    'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg'
  ],
  'Mon-Fri: 6am-8pm, Sat-Sun: 7am-7pm',
  '$$$',
  ARRAY['Tech-Friendly', 'Private Booths', 'High-Speed WiFi', 'Standing Desks'],
  4.9, 5.0, 'Enterprise-grade WiFi with separate networks for video calls.',
  5.0, 'USB-C and standard outlets at every seat.',
  1.8, 'Sound-dampening design and quiet zones available.',
  4.8, 'Ergonomic chairs and adjustable-height tables.',
  4.7, 3.2, 38
),
(
  'c3d4e5f6-g7h8-9012-cdef-345678901234',
  'The Cozy Corner',
  'A charming neighborhood café with a homey atmosphere. Perfect for those who prefer a relaxed environment with comfortable seating and homemade pastries.',
  '789 Valencia St, San Francisco, CA 94110',
  'Mission',
  'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
    'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
  ],
  'Daily: 8am-6pm',
  '$',
  ARRAY['Cozy', 'Homemade Food', 'Friendly Staff', 'Outdoor Seating'],
  4.3, 3.8, 'WiFi can slow down during peak hours.',
  3.2, 'Limited outlets, mostly along the walls.',
  3.5, 'Can get noisy during lunch rush.',
  4.5, 'Very comfortable armchairs and couches.',
  4.6, 3.7, 29
),
(
  'd4e5f6g7-h8i9-0123-defg-456789012345',
  'Byte & Brew',
  'A modern café with a tech-inspired theme. Popular among programmers and designers, with coding meetups hosted regularly. Known for their themed drinks like "Java Script" and "Python Punch".',
  '101 Howard St, San Francisco, CA 94105',
  'SoMa',
  'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
  ],
  'Mon-Fri: 7am-9pm, Sat-Sun: 8am-8pm',
  '$$',
  ARRAY['Tech-Themed', 'Coding Meetups', 'Fast WiFi', 'Late Hours'],
  4.6, 4.9, 'Fiber internet with open ports for developers.',
  4.7, 'Power strips at every table.',
  2.8, 'Moderate noise level with tech discussions happening.',
  4.2, 'Modern furniture that prioritizes function over comfort.',
  4.5, 3.5, 45
),
(
  'e5f6g7h8-i9j0-1234-efgh-567890123456',
  'Serenity Café',
  'A peaceful oasis in the busy city, with a zen garden theme. Features noise-cancelling architecture and a "quiet zone" policy. Perfect for deep focus work.',
  '222 Fillmore St, San Francisco, CA 94117',
  'Lower Haight',
  'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg',
    'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
    'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
  ],
  'Daily: 7am-7pm',
  '$$',
  ARRAY['Quiet', 'Zen', 'Meditation Corner', 'Healthy Options'],
  4.8, 4.6, 'Reliable WiFi with good coverage throughout.',
  4.3, 'Discreetly placed outlets at most seating areas.',
  1.5, 'One of the quietest cafés in the city.',
  4.7, 'Ergonomic seating with back support cushions available.',
  4.4, 2.5, 31
),
(
  'f6g7h8i9-j0k1-2345-fghi-678901234567',
  'Urban Workshop',
  'A café and co-working hybrid with industrial design. Offers hourly desk rentals and meeting rooms alongside great coffee. Popular with freelancers and small teams.',
  '555 Hayes St, San Francisco, CA 94102',
  'Hayes Valley',
  'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
  ],
  'Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm',
  '$$$',
  ARRAY['Co-working', 'Meeting Rooms', 'Professional', '24/7 Access'],
  4.5, 4.7, 'Business-class internet with VPN support.',
  4.9, 'Integrated power in all desks and tables.',
  2.3, 'Well-managed noise levels with designated quiet areas.',
  4.4, 'Professional office chairs and proper desks.',
  4.3, 3.8, 52
),
(
  'g7h8i9j0-k1l2-3456-ghij-789012345678',
  'The Book & Bean',
  'A café-bookstore combination with a scholarly atmosphere. Thousands of books line the walls, and reading is encouraged. Perfect for writers and academics.',
  '333 Clement St, San Francisco, CA 94118',
  'Richmond',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
    'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
  ],
  'Daily: 8am-9pm',
  '$$',
  ARRAY['Bookstore', 'Literary Events', 'Quiet', 'Reading Nooks'],
  4.4, 4.2, 'Good WiFi throughout, password changes weekly.',
  3.8, 'Outlets available in reading corners and some tables.',
  1.9, 'Library-like quiet with occasional book discussions.',
  4.5, 'Comfortable reading chairs and good lighting.',
  4.2, 3.0, 36
),
(
  'h8i9j0k1-l2m3-4567-hijk-890123456789',
  'Sunrise Roasters',
  'A café focused on ethically sourced, in-house roasted coffee. Large windows provide abundant natural light, and the minimalist design helps maintain focus.',
  '777 Irving St, San Francisco, CA 94122',
  'Sunset',
  'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  ARRAY[
    'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
    'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg'
  ],
  'Mon-Fri: 6:30am-6pm, Sat-Sun: 7am-5pm',
  '$$',
  ARRAY['In-house Roasting', 'Natural Light', 'Minimalist', 'Sustainable'],
  4.2, 3.9, 'Decent WiFi that can slow during peak hours.',
  3.5, 'Limited outlets, mostly near the walls.',
  2.7, 'Coffee equipment creates some background noise.',
  4.0, 'Wooden chairs that are stylish but not for all-day sitting.',
  4.8, 3.3, 27
)
ON CONFLICT (id) DO NOTHING;
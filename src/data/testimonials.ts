// Curated Google Maps reviews — Julian Photography
// Source: Google Maps · Aggregate: 4.9★ from 414 reviews
// Selected for substantive content, service diversity, and recency.

export type TestimonialService =
  | 'wedding'
  | 'prewedding'
  | 'maternity'
  | 'newborn'
  | 'baby'
  | 'family'
  | 'baby-family'
  | 'studio';

export interface Testimonial {
  id: string;
  name: string;
  body: string;
  service: TestimonialService;
  serviceLabel: string;
  date: string;          // human-readable
  dateISO: string;       // for schema
  rating: 5;
  isLocalGuide?: boolean;
  reviewCount?: number;
  language: 'id' | 'en';
}

export const aggregate = {
  ratingValue: 4.9,
  reviewCount: 414,
  bestRating: 5,
  worstRating: 1,
  source: 'Google Maps',
  url: 'https://maps.google.com/?q=Julian+Photography+Negara+Jembrana+Bali',
};

export const testimonials: Testimonial[] = [
  {
    id: 'sushmita-megarani',
    name: 'Sushmita Megarani',
    body: 'Suka banget sama fotonya & video nya, kakak-kakaknya juga ramah. Thank you sudah save moment kita.',
    service: 'family',
    serviceLabel: 'Family Portrait',
    date: 'sebulan lalu',
    dateISO: '2026-03-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'sajeevie-punnyasiri',
    name: 'Sajeevie Punnyasiri',
    body: 'I recently had the pleasure of working with Julian Photography for a maternity shoot, and I couldn\'t be happier with the experience! From start to finish, Julian was professional, creative, and incredibly attentive to every detail.',
    service: 'maternity',
    serviceLabel: 'Maternity',
    date: 'setahun lalu',
    dateISO: '2025-04-26',
    rating: 5,
    language: 'en',
    reviewCount: 3,
  },
  {
    id: 'basilia-andreani',
    name: 'Basilia Andreani Pramita',
    body: 'I never expected my wedding to become such amazing memories thanks to the skill of photographers from Julian Photo. Thank you so much for your hard work — all of my family love the moment captured by the picture and video that you made.',
    service: 'wedding',
    serviceLabel: 'Wedding',
    date: 'setahun lalu',
    dateISO: '2025-04-26',
    rating: 5,
    language: 'en',
  },
  {
    id: 'antony-gumi',
    name: 'Antony Gumi',
    body: 'Studio foto paling mantap di kota Jembrana. Pelayanan super ramah, harga paling reasonable, hasil bintang 5. Sangat rekomendasi untuk segala jenis event — happy maupun event duka. Bertanggung jawab dan profesional.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: '2 tahun lalu',
    dateISO: '2024-04-26',
    rating: 5,
    language: 'id',
    isLocalGuide: true,
    reviewCount: 104,
  },
  {
    id: 'samantha-samiada',
    name: 'Samantha Samiada',
    body: "Such an amazing experience at Julian's Photography. The studio was recommended by a friend and I am so glad I got my baby daughter's photos here.",
    service: 'baby',
    serviceLabel: 'Baby Studio',
    date: '2 tahun lalu',
    dateISO: '2024-04-26',
    rating: 5,
    language: 'en',
  },
  {
    id: 'salma-annisa',
    name: 'Salma Annisa',
    body: 'Puas banget foto prewedding di Julian Photography, staff-nya ramah dan pelayanan-nya sangat fast respon. Ngga kapok deh pokoknya. Sukses terus Julian Photography.',
    service: 'prewedding',
    serviceLabel: 'Prewedding',
    date: '2 tahun lalu',
    dateISO: '2024-04-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'lina-indriyanti',
    name: 'Lina Indriyanti',
    body: 'Karena ini moment pertama kali buat foto studio buat anak, jadinya terharu banget lihat hasil foto dan videonya. Makasi buat kakak yang bantuin adik waktu foto, jadi ikut kebawa suasana padahal lagi ngantuk. Sekali lagi terima kasih banyak ya, astungkara acara kami lancar nanti.',
    service: 'baby',
    serviceLabel: 'Baby Studio',
    date: '2 tahun lalu',
    dateISO: '2024-04-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'jospinforever',
    name: 'Jospin',
    body: 'We hired Julian Photography for family photos as a birthday gift. We\'re thrilled with the results and received the photos very quickly! I highly recommend them.',
    service: 'family',
    serviceLabel: 'Family Portrait',
    date: 'setahun lalu',
    dateISO: '2025-04-26',
    rating: 5,
    language: 'en',
    isLocalGuide: true,
    reviewCount: 51,
  },
  {
    id: 'ida-ayu-michelle',
    name: 'Ida Ayu Putu Michelle',
    body: 'Pengalaman aku yang foto studio waktu mepet dan buat undangan online dikejar deadline bener-bener puas banget. Sat set sat set, staf ramah-ramah, hasil memuaskan, pokoknya rekomendasi.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: '7 bulan lalu',
    dateISO: '2025-09-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'pebry-valentina',
    name: 'Pebry Valentina',
    body: 'Pelayanan sangat bagus, ramah dan memuaskan. Cocok photoshoot baby, bersama teman maupun keluarga. Disini rekomend bgt!',
    service: 'baby-family',
    serviceLabel: 'Baby & Family',
    date: '6 bulan lalu',
    dateISO: '2025-10-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'bhasma-vrishaba',
    name: 'Bhasma Vrishaba',
    body: 'Memuaskan, hasil foto bagus, harga masuk akal. Pelayanan baik.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: '8 bulan lalu',
    dateISO: '2025-08-26',
    rating: 5,
    language: 'id',
    isLocalGuide: true,
    reviewCount: 525,
  },
  {
    id: 'nadya-afsari',
    name: 'Nadya Afsari Dewi',
    body: 'Terimakasih Julian fotografi, hasil fotonya sangat bagus dan memuaskan, staff-nya juga ramah dan sabar banget.',
    service: 'family',
    serviceLabel: 'Family',
    date: '2 bulan lalu',
    dateISO: '2026-02-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'camela-tristiana',
    name: 'Camela Tristiana Dewi',
    body: 'We did a photo shoot for our baby boy and they worked excellent and professionally.',
    service: 'baby',
    serviceLabel: 'Baby Studio',
    date: '3 tahun lalu',
    dateISO: '2023-04-26',
    rating: 5,
    language: 'en',
  },
  {
    id: 'endra-deka',
    name: 'Endra Deka',
    body: 'Selalu langganan foto indoor disini, pelayanan ramah dan hasil yang selalu memuaskan.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: '2 bulan lalu',
    dateISO: '2026-02-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'yogi-sri-kusumawati',
    name: 'Ni Putu Yogi Sri Kusumawati',
    body: 'Hasil fotonya bagus, keren! Sangat puas foto baby di Julian Photography.',
    service: 'baby',
    serviceLabel: 'Baby Studio',
    date: '9 bulan lalu',
    dateISO: '2025-07-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'budhi-artini',
    name: 'Budhi Artini',
    body: 'Puas banget, staff-nya ramah dan sabar bgttt, hasil foto bagus-bagus.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: 'setahun lalu',
    dateISO: '2025-04-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'rianthi-karina',
    name: 'Rianthi Karina',
    body: 'Hasil fotonya bagus luar biasa, admin-nya ramah dan kakak-kakak yang foto super sabar banget mengarahkan kita yang bawa 3 anak dengan kerempongan ini. Terima kasih ya.',
    service: 'family',
    serviceLabel: 'Family Portrait',
    date: '2 tahun lalu',
    dateISO: '2024-04-26',
    rating: 5,
    language: 'id',
  },
  {
    id: 'bagus-pradita',
    name: 'Bagus Pradita',
    body: 'Harga murah, kualitas foto tidak murahan. Servis sangat ramah, terima kasih Julian Photography.',
    service: 'studio',
    serviceLabel: 'Studio Foto',
    date: '3 tahun lalu',
    dateISO: '2023-04-26',
    rating: 5,
    language: 'id',
  },
];

// Helpful tags from Google Maps (frequency aggregation)
export const reviewTags = [
  { label: 'Kid-friendly', count: 16 },
  { label: 'Friendly Team', count: 12 },
  { label: 'Fotografi Bayi', count: 11 },
  { label: 'Friendly Photographer', count: 10 },
  { label: 'Photo Results', count: 70 },
  { label: 'Bright Atmosphere', count: 4 },
  { label: 'Family Photos', count: 3 },
  { label: 'Fast Process', count: 3 },
  { label: 'Patient Cameraman', count: 3 },
  { label: 'Prewedding Photos', count: 2 },
];

export function getFeatured(n = 4): Testimonial[] {
  return testimonials.slice(0, n);
}

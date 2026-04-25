/**
 * Curated portfolio items for /karya hub page.
 * Each item has a grid span variant for editorial masonry layout.
 *
 * Span system on 12-column grid:
 *  - 'normal' = 4 cols, aspect 4/5 (default portrait)
 *  - 'wide'   = 6 cols, aspect 3/2 (landscape hero)
 *  - 'tall'   = 3 cols, aspect 3/4 (narrow portrait)
 *  - 'sq'     = 4 cols, aspect 1/1 (square)
 *
 * Mix variants per row to create editorial rhythm — never uniform.
 */

export type PortfolioCategory =
  | 'wedding'
  | 'prewedding'
  | 'maternity'
  | 'newborn'
  | 'baby'
  | 'baby-family'
  | 'family';

export type PortfolioSpan = 'normal' | 'wide' | 'tall' | 'sq';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;      // evocative project title (e.g. "Sasha & Kanha")
  location: string;   // e.g. "Uluwatu, Bali"
  year: number;
  image: string;      // full-res Unsplash URL
  span: PortfolioSpan;
  featured?: boolean; // if true, shown in "Featured Stories" section
  slug?: string;      // for /karya/[slug]/ case study (batch 3)
}

export const portfolio: PortfolioItem[] = [
  // ===== Featured (cases studies teasers) =====
  {
    id: 'p01',
    category: 'wedding',
    title: 'Sasha & Kanha',
    location: 'Uluwatu, Bali',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop',
    span: 'wide',
    featured: true,
    slug: 'sasha-kanha-uluwatu',
  },
  {
    id: 'p02',
    category: 'prewedding',
    title: 'Yoga & Citra',
    location: 'Tegallalang, Ubud',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1523438097201-512ae7d7c424?w=1400&q=85&auto=format&fit=crop',
    span: 'tall',
    featured: true,
    slug: 'yoga-citra-tegallalang',
  },
  {
    id: 'p03',
    category: 'maternity',
    title: 'Laras — 32 Weeks',
    location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1400&q=85&auto=format&fit=crop',
    span: 'normal',
    featured: true,
    slug: 'laras-maternity',
  },

  // ===== Wedding =====
  {
    id: 'p04', category: 'wedding', title: 'Dimas & Sarah', location: 'Nusa Dua',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
  {
    id: 'p05', category: 'wedding', title: 'Aditya & Mega', location: 'Seminyak',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=85&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 'p06', category: 'wedding', title: 'Bayu & Kartika', location: 'Ubud Villa',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85&auto=format&fit=crop',
    span: 'sq',
  },
  {
    id: 'p07', category: 'wedding', title: 'Intimate Ceremony', location: 'Sanur',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1400&q=85&auto=format&fit=crop',
    span: 'wide',
  },

  // ===== Prewedding =====
  {
    id: 'p08', category: 'prewedding', title: 'Rama & Nadia', location: 'Nusa Penida',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1537907510278-10acdb198d0f?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
  {
    id: 'p09', category: 'prewedding', title: 'Cliff Session', location: 'Uluwatu',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&q=85&auto=format&fit=crop',
    span: 'wide',
  },
  {
    id: 'p10', category: 'prewedding', title: 'Made & Dewi', location: 'Campuhan, Ubud',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=1200&q=85&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 'p11', category: 'prewedding', title: 'Beach Stroll', location: 'Canggu',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop',
    span: 'sq',
  },

  // ===== Maternity =====
  {
    id: 'p12', category: 'maternity', title: 'Soft Backlit', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
  {
    id: 'p13', category: 'maternity', title: 'Couple Expecting', location: 'Studio, Jembrana',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1492366254240-43affaefc3e3?w=1400&q=85&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 'p14', category: 'maternity', title: 'Earth Tone Set', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1537673023-df36ed4cb13d?w=1200&q=85&auto=format&fit=crop',
    span: 'sq',
  },

  // ===== Newborn =====
  {
    id: 'p15', category: 'newborn', title: 'Baby Arka — 7 Days', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&q=85&auto=format&fit=crop',
    span: 'wide',
  },
  {
    id: 'p16', category: 'newborn', title: 'Wrapped in Cream', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
  {
    id: 'p17', category: 'newborn', title: 'Tiny Details', location: 'Studio, Jembrana',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1547089120-4ace65eafd49?w=1200&q=85&auto=format&fit=crop',
    span: 'sq',
  },

  // ===== Baby =====
  {
    id: 'p18', category: 'baby', title: 'Aruna — 9 Months', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=1400&q=85&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 'p19', category: 'baby', title: 'Cake Smash Party', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1591197175444-aa1923ce0fa8?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
  {
    id: 'p20', category: 'baby', title: 'Sitter Session', location: 'Studio, Jembrana',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1557555187-23d685287bc3?w=1200&q=85&auto=format&fit=crop',
    span: 'sq',
  },

  // ===== Baby & Family =====
  {
    id: 'p21', category: 'baby-family', title: 'First Year Together', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&q=85&auto=format&fit=crop',
    span: 'wide',
  },
  {
    id: 'p22', category: 'baby-family', title: 'Mama & Arka', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555252586-91d8d92a02e7?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },

  // ===== Family =====
  {
    id: 'p23', category: 'family', title: 'Multi-Generation', location: 'Studio, Jembrana',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=85&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 'p24', category: 'family', title: 'Outdoor Family', location: 'Jembrana Beach',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85&auto=format&fit=crop',
    span: 'normal',
  },
];

export const categories: { slug: PortfolioCategory | 'all'; name: string }[] = [
  { slug: 'all', name: 'Semua' },
  { slug: 'wedding', name: 'Wedding' },
  { slug: 'prewedding', name: 'Prewedding' },
  { slug: 'maternity', name: 'Maternity' },
  { slug: 'newborn', name: 'Newborn' },
  { slug: 'baby', name: 'Baby' },
  { slug: 'baby-family', name: 'Baby & Family' },
  { slug: 'family', name: 'Family' },
];

export const featuredStories = portfolio.filter((p) => p.featured);

/** Used for marquee strip — returns all images deduplicated, split into 2 rows */
export function marqueeRows(): { row1: string[]; row2: string[] } {
  const urls = portfolio.map((p) => p.image);
  const mid = Math.ceil(urls.length / 2);
  return { row1: urls.slice(0, mid), row2: urls.slice(mid) };
}

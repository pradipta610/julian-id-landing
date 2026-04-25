/**
 * Single source of truth for the 7 services.
 * Used by:
 *  - homepage Services component (card list)
 *  - sub-page Related cross-sell
 *  - JSON-LD service schema
 */

export interface ServiceMeta {
  slug: string;            // URL slug (e.g. 'wedding')
  num: string;             // display number ('01'..'07')
  name: string;            // display name
  group: 'luar' | 'dalam'; // luar studio / dalam studio
  desc: string;            // short blurb (1–2 sentences)
  image: string;           // hero / card image
  href: string;            // path: '/layanan/wedding/'
}

export const services: ServiceMeta[] = [
  {
    slug: 'wedding',
    num: '01',
    name: 'Wedding',
    group: 'luar',
    desc: 'Liputan hari pernikahan — dari morning prep hingga reception. Style natural, sinematik, fokus pada momen.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/wedding/',
  },
  {
    slug: 'prewedding',
    num: '02',
    name: 'Prewedding',
    group: 'luar',
    desc: 'Sesi outdoor di lokasi pilihan: Uluwatu, Ubud, Canggu, Nusa Penida, atau lokasi favoritmu di Bali.',
    image: 'https://images.unsplash.com/photo-1523438097201-512ae7d7c424?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/prewedding/',
  },
  {
    slug: 'maternity',
    num: '03',
    name: 'Maternity',
    group: 'dalam',
    desc: 'Mengabadikan keajaiban kehamilan dengan pencahayaan studio yang lembut & wardrobe yang tersedia.',
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/maternity/',
  },
  {
    slug: 'newborn',
    num: '04',
    name: 'Newborn',
    group: 'dalam',
    desc: 'Sesi khusus 5–14 hari setelah kelahiran. Setup yang aman, tenang, dan setiap detail kecil terdokumentasi.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/newborn/',
  },
  {
    slug: 'baby',
    num: '05',
    name: 'Baby',
    group: 'dalam',
    desc: 'Untuk milestone bayi: 3, 6, 9 bulan, hingga 1st birthday. Props & set yang lucu menyesuaikan tema.',
    image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/baby/',
  },
  {
    slug: 'baby-family',
    num: '06',
    name: 'Baby & Family',
    group: 'dalam',
    desc: 'Sesi kombinasi bayi bersama orang tua — momen kebersamaan yang hangat di studio.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/baby-family/',
  },
  {
    slug: 'family',
    num: '07',
    name: 'Family',
    group: 'dalam',
    desc: 'Foto keluarga lengkap — anak, orang tua, kakek-nenek. Setup classic atau lifestyle, sesuai selera.',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=85&auto=format&fit=crop',
    href: '/layanan/family/',
  },
];

/** Get all services except one (for related/cross-sell) */
export function relatedTo(slug: string, max = 3): ServiceMeta[] {
  // Prioritize same-group services first
  const current = services.find((s) => s.slug === slug);
  if (!current) return services.slice(0, max);
  const sameGroup = services.filter((s) => s.slug !== slug && s.group === current.group);
  const otherGroup = services.filter((s) => s.slug !== slug && s.group !== current.group);
  return [...sameGroup, ...otherGroup].slice(0, max);
}

/** Look up by slug */
export function getService(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}

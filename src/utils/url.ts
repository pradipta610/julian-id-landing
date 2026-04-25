/**
 * URL helpers — always prefix with import.meta.env.BASE_URL ('/id/')
 *
 * Astro's `base` config does NOT auto-prefix href values written in components.
 * Use `url('/tentang/')` instead of hardcoding '/id/tentang/'.
 */

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/id'

/**
 * Build an internal URL prefixed with the configured base.
 *   url('/')          -> '/id/'
 *   url('/tentang/')  -> '/id/tentang/'
 *   url('tentang')    -> '/id/tentang/'
 */
export function url(path: string): string {
  if (!path || path === '/') return BASE + '/';
  let p = path.startsWith('/') ? path : '/' + path;
  // Don't append trailing slash for: hash links, query strings, file extensions, or already-slashed paths
  const hasHash = p.includes('#');
  const hasQuery = p.includes('?');
  const hasExt = /\.[a-z0-9]+$/i.test(p);
  if (!p.endsWith('/') && !hasHash && !hasQuery && !hasExt) p += '/';
  return BASE + p;
}

/** Absolute canonical URL for a given pathname, used in <link rel="canonical">. */
export function canonical(pathname: string, site = 'https://juliansphotography.com'): string {
  const clean = pathname.startsWith('/') ? pathname : '/' + pathname;
  return site + clean;
}

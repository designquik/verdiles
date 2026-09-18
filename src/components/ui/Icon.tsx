export type IconName =
  | 'tenant-launch'
  | 'catalog'
  | 'themes'
  | 'apps'
  | 'domains'
  | 'admin'
  | 'overview'
  | 'orders'
  | 'settings'
  | 'check'
  | 'gem'
  | 'search'
  | 'bell'
  | 'chevron'
  | 'plus'

const paths: Record<IconName, string> = {
  'tenant-launch': 'M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7L12 3z',
  catalog: 'M4 7.5 12 3.5l8 4v9l-8 4-8-4v-9zm0 0 8 4m0 0 8-4m-8 4v9',
  themes: 'M4 5.5h16v5H4zM4 14h6.5v5H4zm10 0h6v5h-6z',
  apps: 'M4.5 4.5h6v6h-6zm9 0h6v6h-6zm-9 9h6v6h-6zm9 0h6v6h-6z',
  domains: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 0c2.6 2.2 4 5.3 4 9s-1.4 6.8-4 9c-2.6-2.2-4-5.3-4-9s1.4-6.8 4-9zM3.4 9h17.2M3.4 15h17.2',
  admin: 'M4 6h7v5H4zm9 0h7v5h-7zM4 13h7v5H4zm9 0h7v5h-7z',
  overview: 'M4 19V9m5 10V5m5 14v-7m5 7V8',
  orders: 'M5 7h14l-1 12H6L5 7zm3 0V5.5A4 4 0 0116 5.5V7',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6zm8.4-3c0 .5 0 1-.1 1.4l2 1.5-1.9 3.3-2.3-1a7.6 7.6 0 01-2.4 1.4l-.3 2.4h-3.8l-.3-2.4a7.6 7.6 0 01-2.4-1.4l-2.3 1L3.7 14l2-1.5a8 8 0 010-1.4l-2-1.5 1.9-3.3 2.3 1A7.6 7.6 0 019 5.4l.3-2.4h3.8l.3 2.4a7.6 7.6 0 012.4 1.4l2.3-1 1.9 3.3-2 1.5c.1.4.1.9.1 1.4z',
  check: 'M4.5 12.5l4.5 4.5 10.5-11',
  gem: 'M12 3l4.5 5.2L12 21 7.5 8.2 12 3zm-4.5 5.2h9',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zm5.5-1.5L21 21',
  bell: 'M6.5 17h11l-1.4-2.2V10a4.1 4.1 0 00-8.2 0v4.8L6.5 17zm3.2 0a2.3 2.3 0 004.6 0',
  chevron: 'M5 8.5l5 5 5-5',
  plus: 'M12 5v14M5 12h14',
}

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

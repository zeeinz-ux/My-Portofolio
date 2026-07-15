export function publicPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (path.startsWith('/') && base) {
    return `${base}${path}`;
  }
  return path;
}

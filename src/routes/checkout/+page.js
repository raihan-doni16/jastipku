export function load({ url }) {
  return {
    redirect: url.searchParams.get('redirect') || null,
    expected: url.searchParams.get('expected') || 'user'
  };
}

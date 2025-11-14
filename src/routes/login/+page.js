/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  const redirect = url.searchParams.get('redirect') ?? '';
  const expected = url.searchParams.get('expected') ?? '';

  return {
    redirect,
    expected
  };
}

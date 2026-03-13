import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
  },
});

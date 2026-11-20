import { describe, it, expect } from 'vitest';
import { SITE_CONFIG } from '@/config/site';

describe('Site config', () => {
  it('describes the Salmon Software website', () => {
    expect(SITE_CONFIG.name).toBe('Salmon Software');
    expect(SITE_CONFIG.title).toBeTruthy();
    expect(SITE_CONFIG.description).toBeTruthy();
    expect(SITE_CONFIG.url).toBe('https://salmonsoftware.nz');
    expect(SITE_CONFIG.email).toBe('ben@salmonsoftware.nz');
  });
});

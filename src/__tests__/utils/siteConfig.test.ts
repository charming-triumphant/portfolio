import { describe, it, expect } from 'vitest';
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from '@/config/site';

describe('Site config', () => {
  it('has required fields', () => {
    expect(SITE_CONFIG.name).toBeTruthy();
    expect(SITE_CONFIG.title).toBeTruthy();
    expect(SITE_CONFIG.description).toBeTruthy();
    expect(SITE_CONFIG.url).toMatch(/^https?:\/\//);
    expect(SITE_CONFIG.author).toBeTruthy();
    expect(SITE_CONFIG.jobTitle).toBeTruthy();
    expect(SITE_CONFIG.location).toBeTruthy();
  });

  it('has valid nav links', () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0);
    NAV_LINKS.forEach((link) => {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
    });
  });

  it('has a Contact CTA in nav', () => {
    const contactLink = NAV_LINKS.find((link) => link.isCta);
    expect(contactLink).toBeDefined();
    expect(contactLink?.href).toBe('#contact');
  });

  it('has social links with labels and hrefs', () => {
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
    SOCIAL_LINKS.forEach((link) => {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^https?:\/\//);
    });
  });
});

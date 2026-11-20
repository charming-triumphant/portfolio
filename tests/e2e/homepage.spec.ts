import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('shows the Salmon Software page and its main sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Salmon Software/);
    await expect(page.getByRole('heading', { name: 'Salmon Software', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Craft' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Philosophy' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Connect' })).toBeVisible();
    await expect(page.locator('header img.salmon-mark')).toBeVisible();
    await expect(page.locator('footer img.salmon-mark')).toBeVisible();
  });

  test('links the contact address to email', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'ben@salmonsoftware.nz' }))
      .toHaveAttribute('href', 'mailto:ben@salmonsoftware.nz');
  });

  test('includes structured business and service data', async ({ page }) => {
    await page.goto('/');
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const data = JSON.parse((await jsonLd.textContent()) ?? '{}');
    expect(data['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'ProfessionalService', name: 'Salmon Software' }),
        expect.objectContaining({ '@type': 'WebSite' }),
        expect.objectContaining({ '@type': 'Service' }),
      ])
    );
  });
});

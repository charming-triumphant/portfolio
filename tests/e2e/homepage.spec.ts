import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and displays hero content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('web experiences');
  });

  test('has correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Ben Salcie/);
  });

  test('displays proof bar with Lighthouse scores', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Lighthouse', { exact: true })).toBeVisible();
    await expect(page.getByText('Performance', { exact: true })).toBeVisible();
  });

  test('displays case study cards', async ({ page }) => {
    await page.goto('/');
    const workSection = page.locator('#work');
    await expect(workSection).toBeVisible();
    await expect(workSection.locator('a[href*="case-study"]').first()).toBeVisible();
  });

  test('displays skills section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Tech stack')).toBeVisible();
    await expect(page.getByText('Ship in')).toBeVisible();
    await expect(page.getByText('Build in')).toBeVisible();
    await expect(page.getByText('Learning')).toBeVisible();
  });

  test('displays about section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('About me')).toBeVisible();
    await expect(page.getByText('Tauranga, New Zealand', { exact: true })).toBeVisible();
  });

  test('displays contact section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText("Let's build something together")).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
  });

  test('has JSON-LD structured data', async ({ page }) => {
    await page.goto('/');
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    expect(content).toContain('"@type":"Person"');
    expect(content).toContain('Ben Salcie');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop nav links are visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(mainNav.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(mainNav.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('mobile hamburger opens and closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const hamburger = page.getByRole('button', { name: 'Open main menu' });
    await expect(hamburger).toBeVisible();

    // Open menu
    await hamburger.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveClass(/opacity-100/);

    // Close with close button
    await page.getByRole('button', { name: 'Close main menu' }).click();
    await expect(mobileMenu).toHaveClass(/opacity-0/);
  });

  test('mobile menu closes on Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Open main menu' }).click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveClass(/opacity-100/);

    await page.keyboard.press('Escape');
    await expect(mobileMenu).toHaveClass(/opacity-0/);
  });

  test('nav glassmorphism activates on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const nav = page.locator('#site-nav');
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    await expect(nav).toHaveClass(/backdrop-blur/);
  });
});

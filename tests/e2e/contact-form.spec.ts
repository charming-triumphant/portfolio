import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('form fields are visible and labeled', async ({ page }) => {
    await page.goto('/');
    const contactSection = page.locator('#contact');

    await expect(contactSection.getByLabel(/Name/)).toBeVisible();
    await expect(contactSection.getByLabel(/Email/)).toBeVisible();
    await expect(contactSection.getByLabel(/Message/)).toBeVisible();
    await expect(contactSection.getByText('I have a project')).toBeVisible();
    await expect(contactSection.getByText('Hiring or collaborating')).toBeVisible();
  });

  test('submit button text and minimum touch target', async ({ page }) => {
    await page.goto('/');
    const submitBtn = page.getByRole('button', { name: 'Send it' });
    await expect(submitBtn).toBeVisible();
    const box = await submitBtn.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('path selector switches state', async ({ page }) => {
    await page.goto('/');
    const contactSection = page.locator('#contact');

    const projectOption = contactSection.getByText('I have a project');
    const roleOption = contactSection.getByText('Hiring or collaborating');

    await roleOption.click();
    const roleRadio = contactSection.locator('input[value="role"]');
    await expect(roleRadio).toBeChecked();

    await projectOption.click();
    const projectRadio = contactSection.locator('input[value="project"]');
    await expect(projectRadio).toBeChecked();
  });
});

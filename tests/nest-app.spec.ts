import { test, expect } from '@playwright/test';

// Tests for '/' - App index
test(' "/" Routes to correct view', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('App Home Page');
});

// Test route at /Cars 
test('index has title', async ({ page }) => {

  await page.goto('http://localhost:3000/Cars');
  await expect(page).toHaveTitle('Car Data Home Page');
});

// Test functionality of posting a new car dataset and checking it is visabile on /cars
test('Adding a new car dataset', async ({ page }) => {

  // add car tests
  await page.goto('http://localhost:3000/Cars/add');
  await expect(page).toHaveTitle('Add Car Page');
  await page.getByPlaceholder('Type here to add car brand...').fill('PW Brand Test')
  await page.getByPlaceholder('Type here to add car model...').fill('PW Model Test')
  await page.getByText('Click here to submit').click()
  await expect(page.getByText('added')).toBeVisible()

  await page.goto('http://localhost:3000/Cars');
  await expect(page.getByText('PW Model Test')).toBeVisible()
  await expect(page.getByText('PW Brand Test')).toBeVisible()

  // Delete car tests
  await page.goto('http://localhost:3000/Cars/');
  await expect(page).toHaveTitle('Car Data Home Page');
  await expect(page.getByText('PW Model Test')).toBeVisible()
  await page
    .getByRole('list')
    .filter({hasText: 'PW Model Test'})
    .getByText('Delete')
    .click()
    await expect(page).toHaveTitle('Delete Car Data');
  await page.getByText('Delete Post').click()
  await expect(page.getByText('deleted')).toBeVisible()

  await page.goto('http://localhost:3000/Cars');
  await expect(page.getByText('PW Model Test')).toBeVisible({visible: false})

});

// Test functionality of posting a new car dataset and checking it is visabile on /cars
// test('Deleting a car dataset', async ({ page }) => {

//   await page.goto('http://localhost:3000/Cars/');
//   await expect(page).toHaveTitle('Car Data Home Page');
//   await expect(page.getByText('PW Model Test')).toBeVisible()
//   await page
//     .getByRole('listitem')
//     .filter({hasText: 'PW Model Test'})
//     .getByText('Delete')
//     .click()
//     await expect(page).toHaveTitle('Delete Car Data');
//   await page.getByText('Delete Post').click()
//   await expect(page.getByText('deleted')).toBeVisible()
// });





// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

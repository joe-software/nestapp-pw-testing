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

// Test functionality of Cars module CRUD functionality on the interface
test('Testing Cars module CRUD functionality on the interface', async ({ page }) => {

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

  // Edit car tests
  await page.goto('http://localhost:3000/Cars/');
  await expect(page).toHaveTitle('Car Data Home Page');
  await expect(page.getByText('PW Model Test')).toBeVisible()
  await page
    .getByRole('list')
    .filter({hasText: 'PW Model Test'})
    .getByText('Update')
    .click()
  await expect(page).toHaveTitle('Update Car Data');
  await page.getByLabel('Update car brand:').fill('PW Brand edit Test')
  await page.getByLabel('Update car model:').fill('PW Model edit Test')
  await page.getByText('Update Post').click()
  await expect(page.getByText('edited')).toBeVisible()

  await page.goto('http://localhost:3000/Cars');
  await expect(page.getByText('PW Model edit Test')).toBeVisible()
  await expect(page.getByText('PW Brand edit Test')).toBeVisible()

  // Delete car tests
  await page.goto('http://localhost:3000/Cars/');
  await expect(page).toHaveTitle('Car Data Home Page');
  await expect(page.getByText('PW Model edit Test')).toBeVisible()
  await page
    .getByRole('list')
    .filter({hasText: 'PW Model edit Test'})
    .getByText('Delete')
    .click()
    await expect(page).toHaveTitle('Delete Car Data');
  await page.getByText('Delete Post').click()
  await expect(page.getByText('deleted')).toBeVisible()

  await page.goto('http://localhost:3000/Cars');
  await expect(page.getByText('PW Model edit Test')).toBeVisible({visible: false})

});

// Test functionality of Users module CRUD functionality on the interface
test('Testing Users module CRUD functionality on the interface', async ({ page }) => {

  // add user tests
  await page.goto('http://localhost:3000/Users/add');
  await expect(page).toHaveTitle('Add User Page');
  await page.getByLabel('Add username: ').fill('PW username Test')
  await page.getByLabel('Add bio: ').fill('PW bio Test')
  await page.getByLabel('Add age: ').fill('12341234')
  // await page.getByPlaceholder('Type here to add car model...').fill('PW Model Test')
  await page.getByText('Click here to submit').click()
  await expect(page.getByText('added')).toBeVisible()

  await page.goto('http://localhost:3000/Users');
  await expect(page.getByText('PW username Test')).toBeVisible()
  await expect(page.getByText('PW bio Test')).toBeVisible()
  await expect(page.getByText('12341234')).toBeVisible()

  // Edit user tests
  await page.goto('http://localhost:3000/Users/');
  await expect(page).toHaveTitle('User Data Home Page');
  await expect(page.getByText('PW username Test')).toBeVisible()
  await page
    .getByRole('list')
    .filter({hasText: 'PW username Test'})
    .getByText('Update')
    .click()
  await expect(page).toHaveTitle('Update User Data');
  await page.getByLabel('Update username: ').fill('PW username edit Test')
  await page.getByLabel('Update bio: ').fill('PW bio edit Test')
  await page.getByLabel('Update age: ').fill('1234123456')
  await page.getByText('Update Post').click()
  await expect(page.getByText('edited')).toBeVisible()

  await page.goto('http://localhost:3000/Users');
  await expect(page.getByText('PW username edit Test')).toBeVisible()
  await expect(page.getByText('PW bio edit Test')).toBeVisible()
  await expect(page.getByText('1234123456')).toBeVisible()

  // Delete user tests
  await page.goto('http://localhost:3000/Users/');
  await expect(page).toHaveTitle('User Data Home Page');
  await expect(page.getByText('PW username edit Test')).toBeVisible()
  await page
    .getByRole('list')
    .filter({hasText: 'PW username edit Test'})
    .getByText('Delete')
    .click()
    await expect(page).toHaveTitle('Delete User Data');
  await page.getByText('Delete Post').click()
  await expect(page.getByText('deleted')).toBeVisible()

  await page.goto('http://localhost:3000/Users');
  await expect(page.getByText('PW username edit Test')).toBeVisible({visible: false})

});



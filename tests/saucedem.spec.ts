import { test, expect } from "@playwright/test";

test("Swag Labs Test", async ({ page }) => {
  // Navigate to the home page
  await page.goto("/");
  await expect(page.locator("#root")).toContainText("Swag Labs");

  // Perform login
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");

  // Add products to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    "3"
  );

  // Navigate to the cart and remove an item
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    "2"
  );

  // Proceed to checkout
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText(
    "Checkout: Your Information"
  );

  // Fill in checkout information
  await page.locator('[data-test="firstName"]').fill("Sebastian Bagus");
  await page.locator('[data-test="lastName"]').fill("Kurniawan");
  await page.locator('[data-test="postalCode"]').fill("17610");
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText(
    "Checkout: Overview"
  );

  // Complete the purchase
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    "Thank you for your order!"
  );

  // Return to products page
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

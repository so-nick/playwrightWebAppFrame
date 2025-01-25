import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('locators syntax', async ({ page }) => {

    //by TagName
    page.locator('input')
    // By ID
    await page.locator('#inputEmail1').click() // # = id

    // By classValue
    page.locator('.shape-rectangle') // . = class

    //By attribute
    page.locator('[placeholder="Email"]') // [] - put attribute inside

    //by Class value (full value)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"]') // Input + attribute

    //by Xpath
    page.locator('//*[@id="inputEmail1"]')

    //by partial text mathc

    page.locator(':test("Using ")')

    //by exact text match

    page.locator(':text("Using the Grid")')
})


test('user facing locator', async ({ page }) => {

    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('')
})


test('locating child element', async ({ page }) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent element', async ({ page }) => {

    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click() // locator(..) - Up on one level
})

test('Reusing locator', async ({ page }) => {

    const basiForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const emailField = basiForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('test@test.com')
    await basiForm.getByRole('textbox', { name: 'Email' }).fill('test@test.com')
    await basiForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
    await basiForm.getByRole('textbox', { name: 'Password' }).clear()
    await basiForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async ({ page }) => {
    //single test value

    const basiForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const buttonText = await basiForm.locator('button').textContent()

    await expect(buttonText).toEqual('Submit')

    //all text values

    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()

    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value
    const emailField = basiForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()

    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect (placeholderValue).toEqual('Email') 
})


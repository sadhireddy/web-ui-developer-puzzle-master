import { $, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  beforeEach(()=>{
    browser.get('/');
    browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  });
  it('Then: I should see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
 });
    it('Then: I should see a book marked finished, date displayed and button content changed', async () => {
        const form = await $('form');
        const input = await $('input[type="search"]');
        await input.sendKeys('javascript');
        await form.submit();
        await $('[data-testing="mark-to-read"]').click();
        const readingListToggle = await $('[data-testing="toggle-reading-list"]');
        await readingListToggle.click();
        await $('[data-testing="marked-button"]').click();
        expect(await ($('[data-testing="finished-button"]')).getText()).toEqual("Finished");
  });
});

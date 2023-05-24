const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('login test', () => {
  let browser
  let page
  before(async function () {
    browser = await puppeteer.launch({
      headless: 'new',
      slowMo: 0,
      devtools: false,
      args: ['--start-maximized'],
      defaultViewport: null, 
    })

    page = await browser.newPage()
    await page.setDefaultNavigationTimeout(20000)
    await page.setDefaultTimeout(10000)
  })

  after( async function () {
    await browser.close()
  })

  it('Display feedback form', async function() {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.waitForSelector('#feedback')
    await page.click('#feedback')

  })

  it('Submit feedback form', async function() {
    await page.waitForSelector('form')
    await page.type('#name', 'Matt')
    await page.type('#email', 'matt@email.com')
    await page.type('#subject', 'The duality of the human being')
    await page.type('#comment', 'Just a message into the textarea')
    await page.click('input[type="submit"]')




  })

  it('Display result page', async function() {
    await page.waitForSelector('#feedback-title')
    const url = await page.url()
    expect(url).to.include('/sendFeedback.html')

  })
})
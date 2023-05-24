const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
  let browser
  let page
  
  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
      args: ['--start-maximized'] 
      
    })
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
    page.setDefaultTimeout(0)
    page.setDefaultNavigationTimeout(0)
  })

  after(async function () {
    await browser.close()
  })

  it('Desktop Device Test', async function () {
    await page.setViewport({width: 1650, height: 1050})
    await page.goto('https://www.example.com')
    await new Promise(r => setTimeout(r, 5000))
  })

  it('Tablet Device Test', async function () {
    const tablet = puppeteer.KnownDevices['iPad landscape']
    await page.emulate(tablet)
    await page.goto('https://www.example.com')
    await new Promise(r => setTimeout(r, 5000))
  })

  it('Mobile Device Test', async function () {
    const mobile = puppeteer.KnownDevices['iPhone 11']
    await page.emulate(mobile)
    await page.goto('https://www.example.com')
    await new Promise(r => setTimeout(r, 5000))
  })
})
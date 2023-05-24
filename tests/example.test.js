
const puppeteer = require("puppeteer")
const expect = require('chai').expect
const {click, getText, getCount, shouldNotExist}  = require('../lib/helpers')


describe('Puppeteer betCrawler', () => {
  let page
  let browser

  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
      defaultViewport: null,
      args: ['--start-maximized'] 
    })
    page = await browser.newPage()
    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)

  })

  after( async function () {
    await browser.close()
  })

  beforeEach(async function () {
    //runs before each test step
  })

  afterEach(async function () {
    //runs after each test step
  })

  it('launching the browser...', async function () {

    await page.goto('http://example.com/')
    await page.waitForXPath('//h1')

    

    const title = await page.title()
    const url = await page.url()

    const text = await getText(page, 'h1')
    const count = await getCount(page, 'p')
    
    expect(title).to.be.a('string', 'Example Domain')
    expect(url).to.include('example.com')
    expect(text).to.be.a('string', 'Example Domain')
    expect(count).to.equal(2)

    await page.goto('http://zero.webappsecurity.com/index.html')


    await click(page, '#signin_button')

    await new Promise(r => setTimeout(r, 2000))

    await shouldNotExist(page, '#signin_button')

  })

})
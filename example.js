const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('My first test pupperteer test', () => {
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devtools: false,
            timeout: 10000    
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setViewport({
            width: 800,
            height:600,
        })    

        await page.goto("https://dev.to/")
    })

    after(async function(){
        await browser.close()  
    })

it('Test 1  Load Page', async() => {
    //await page.goto("https://dev.to/")


    await page.waitForSelector('#nav-search')
    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain('Community')
    await page.type('#nav-search', 'Javascript')
    await page.keyboard.press('Enter')
   // await page.waitForSelector('#article-list')
})

it('Test 2 Page Reload', async() => {
    await page.reload()
    await page.waitForSelector('#page-content')


    const url = await page.url()
    const title = await page.title()

    expect(url).to.contain('dev')
    expect(title).to.contain('Community')
})

it('Test 3 - CLick on button', async() => {
    await page.waitForSelector('#write-link')
    await page.click('#write-link')
    await page.waitForSelector('.registration-rainbow')
    await page.click('.registration-rainbow', {
        button: 'right'
    })
    await page.click('.registration-rainbow')

    //await page.waitFor(9000)
})

}) 
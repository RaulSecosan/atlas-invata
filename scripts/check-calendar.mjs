import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chromium',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1050}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8080');await page.getByRole('button',{name:'Activează modul întunecat'}).click();await expect(page.locator('html')).toHaveClass('dark');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'output/atlas-dark-home.png',fullPage:true});
await page.reload();await expect(page.getByRole('button',{name:'Activează modul luminos'})).toBeVisible();
await page.getByRole('link',{name:'Calendar',exact:true}).click();await page.getByRole('button',{name:'Am învățat în această zi'}).click();await page.getByRole('textbox',{name:/Ce ai realizat/}).fill('Am repetat capitalele Europei.');await page.reload();await expect(page.getByRole('textbox',{name:/Ce ai realizat/})).toHaveValue('Am repetat capitalele Europei.');await expect(page.getByRole('button',{name:'Debifează prezența'})).toBeVisible();
await page.screenshot({path:'output/atlas-dark-calendar.png',fullPage:true});
await page.getByRole('button',{name:'Luna precedentă'}).click();await page.getByRole('button',{name:'Înapoi la astăzi'}).click();await page.getByRole('button',{name:'Debifează prezența'}).click();await page.reload();await expect(page.getByRole('button',{name:'Am învățat în această zi'})).toBeVisible();
await page.getByRole('button',{name:'Luna următoare'}).click();assert.equal(await page.locator('.calendar-grid button:not(:disabled)').count(),0);await page.getByRole('button',{name:'Înapoi la astăzi'}).click();
await page.getByRole('button',{name:'Activează modul luminos'}).click();await expect(page.locator('html')).not.toHaveClass('dark');await page.screenshot({path:'output/atlas-light-calendar.png',fullPage:true});
await page.setViewportSize({width:390,height:844});
for(const route of ['/', '/calendar','/geografie','/geografie/quiz','/matematica']){await page.goto('http://127.0.0.1:8080/#'+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflows');}
await page.goto('http://127.0.0.1:8080/#/calendar');await page.getByRole('button',{name:'Activează modul întunecat'}).click();await page.screenshot({path:'output/atlas-mobile-calendar.png',fullPage:true});
await page.goto('http://127.0.0.1:8080/#/matematica');assert.equal(await page.getByRole('button',{name:'Activează modul luminos'}).count(),2);await page.getByRole('button',{name:'Activează modul luminos'}).last().click();assert.equal(await page.getByRole('button',{name:'Activează modul întunecat'}).count(),2);
assert.deepEqual(errors,[]);console.log('Verified theme persistence, shared math toggle, calendar marking/notes/unmarking persistence, future dates, month navigation and mobile overflow.');await browser.close();

const fetch = require('node-fetch');
const cheerio = require("cheerio");

let data;

async function getData() {
  try {
    let res = await fetch("https://codequiz.azurewebsites.net/", {
      "headers": {
        "cookie": "hasCookie=true"
      }
    });
    data = await res.text();
  } catch (error) {
    console.log(error);
  }
}

function getNav(fundName) {
  let nav;
  const $ = cheerio.load(data);
  $('body > table > tbody > tr').each((index, element) => {
    if (index === 0) return;
    const tds = $(element).find('td');
    if ($(tds[0]).text().replace(/ /g,'') === fundName.replace(/ /g,'')) {
      nav = $(tds[1]).text();
    }

  });
  return nav
}

async function main() {
  await getData();
  const fundName = process.argv[2];
  const nav = getNav(fundName);
  console.log('nav: '+nav);
}

main();
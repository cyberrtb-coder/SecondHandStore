const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// In-memory cache
let cachedItems = [];
let lastFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Scrape Craigslist
async function scrapeCraigslist() {
    try {
        const url = 'https://newyork.craigslist.org/search/sss';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const items = [];

        $('.result-row').slice(0, 30).each((i, el) => {
            const title = $(el).find('.result-title').text();
            const link = $(el).find('.result-title').attr('href');
            const price = $(el).find('.result-price').first().text() || 'N/A';
            const img = $(el).find('img').attr('src') || 'https://via.placeholder.com/200';
            items.push({ title, link, price, image: img });
        });

        return items;
    } catch (error) {
        console.error('Craigslist scrape error:', error.message);
        return [];
    }
}

// Scrape OLX
async function scrapeOLX() {
    try {
        const url = 'https://www.olx.in/items/q-second-hand';
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);
        const items = [];

        $('li.EIR5N').slice(0, 30).each((i, el) => {
            const title = $(el).find('span._2tW1I').text() || 'Unknown';
            const link = 'https://www.olx.in' + ($(el).find('a').attr('href') || '');
            const price = $(el).find('span._89yzn').text() || 'N/A';
            const img = $(el).find('img').attr('src') || 'https://via.placeholder.com/200';
            items.push({ title, link, price, image: img });
        });

        return items;
    } catch (error) {
        console.error('OLX scrape error:', error.message);
        return [];
    }
}

// Combine sources with caching
app.get('/api/items', async (req, res) => {
    const now = Date.now();

    // If cached data is still valid, return it
    if (cachedItems.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
        return res.json(cachedItems);
    }

    try {
        const [craigslist, olx] = await Promise.all([
            scrapeCraigslist(),
            scrapeOLX()
        ]);

        cachedItems = [...craigslist, ...olx].slice(0, 50);
        lastFetchTime = now;

        res.json(cachedItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch combined items' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
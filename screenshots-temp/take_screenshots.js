const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'images', 'CA02_Screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const baseUrl = 'http://localhost:8000';

async function takeScreenshots() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  async function snap(url, filename, evaluateFn = null) {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2' });
    if (evaluateFn) {
      await page.evaluate(evaluateFn);
      await new Promise(r => setTimeout(r, 1000)); // wait for transitions
    }
    await page.screenshot({ path: path.join(outDir, filename), fullPage: true });
    console.log(`Saved ${filename}`);
  }

  try {
    // 1. Home Page Hero
    await snap(baseUrl + '/index.html', '01_Home_Hero.png', () => {
      window.scrollTo(0, 0);
    });

    // 2. Home Page Categories
    await snap(baseUrl + '/index.html', '02_Home_Categories.png', () => {
      const el = document.querySelector('.categories-grid');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });

    // 3. Home Page Trending
    await snap(baseUrl + '/index.html', '03_Home_Trending.png', () => {
      const el = document.getElementById('trending-grid');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    // 4. Products Listing
    await snap(baseUrl + '/pages/products.html', '04_Products_Listing.png');

    // 5. Products Listing Filters
    await snap(baseUrl + '/pages/products.html', '05_Products_Filters.png', () => {
       document.querySelector('.sidebar')?.scrollIntoView({behavior: 'instant', block: 'start'});
    });

    // 6. Product Detail Visual
    await snap(baseUrl + '/pages/product-detail.html?id=d1', '06_Product_Detail_Visual.png');

    // 7. Product Detail Options
    await snap(baseUrl + '/pages/product-detail.html?id=d3', '07_Product_Detail_Options.png');

    // 8. Empty Cart
    await snap(baseUrl + '/pages/cart.html', '08_Cart_Empty.png', () => {
       localStorage.removeItem('shenu_cart');
       window.location.reload();
    });
    
    // Add items to cart for next screenshots
    await page.goto(baseUrl + '/index.html', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
       localStorage.setItem('shenu_cart', JSON.stringify([
         { productId: 'd1', quantity: 2, size: 'M', color: 'White' },
         { productId: 'd3', quantity: 1, size: null, color: null }
       ]));
    });

    // 9. Populated Cart
    await snap(baseUrl + '/pages/cart.html', '09_Cart_Populated.png');

    // 10. Checkout Flow
    await snap(baseUrl + '/pages/checkout.html', '12_Checkout_Flow.png');

    // 15. Register
    await snap(baseUrl + '/pages/register.html', '15_Register.png');

    // 16. Login
    await snap(baseUrl + '/pages/login.html', '16_Login.png');

    // 17. Admin Dashboard
    await snap(baseUrl + '/pages/admin/dashboard.html', '17_Admin_Dashboard.png');

    // 18. Admin Products
    await snap(baseUrl + '/pages/admin/products.html', '18_Admin_Products.png');

    // 19. Admin Add Product
    await snap(baseUrl + '/pages/admin/products.html', '19_Admin_Add_Product.png', () => {
      if (window.openProductModal) window.openProductModal();
    });

    // 20. Admin Orders
    await snap(baseUrl + '/pages/admin/orders.html', '20_Admin_Orders.png');

    console.log('All frontend screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    await browser.close();
  }
}

takeScreenshots();

// ============================================================
// SHENU AI STYLIST & SUPER-USER STORE ASSISTANT
// Full Self-Contained Conversational Engine with Embedded 150-Product Catalog
// ============================================================

(function() {
  if (window.ShenuChatbotInitialized) return;
  window.ShenuChatbotInitialized = true;

  // Multi-tier Path Resolution (Handles root, /pages/, and /pages/admin/)
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  let basePath = '.';
  let isPagesDir = false;
  let isAdminPage = false;

  if (currentPath.includes('/pages/admin/')) {
    basePath = '../..';
    isPagesDir = true;
    isAdminPage = true;
  } else if (currentPath.includes('/pages/')) {
    basePath = '..';
    isPagesDir = true;
  }

  const avatarUrl = `${basePath}/images/shenu_ai_avatar.png`;
  const productDetailPath = isAdminPage ? `${basePath}/pages/product-detail.html` : (isPagesDir ? 'product-detail.html' : 'pages/product-detail.html');
  const trackOrderPath = isAdminPage ? `${basePath}/pages/track-order.html` : (isPagesDir ? 'track-order.html' : 'pages/track-order.html');

  // Inject Chatbot CSS dynamically if not present
  if (!document.getElementById('shenu-chatbot-css')) {
    const link = document.createElement('link');
    link.id = 'shenu-chatbot-css';
    link.rel = 'stylesheet';
    link.href = `${basePath}/css/chatbot.css?v=110`;
    document.head.appendChild(link);
  }

  // 150 EMBEDDED REAL FASHION APPAREL ITEMS (Guaranteed Instant Access)
  const DEMO_PRODUCTS = [
  {
    "id": "dress-1",
    "name": "Floral Silk Chiffon Midi Dress",
    "category": "Dresses",
    "price": 6500,
    "salePrice": 4800,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": true,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this floral silk chiffon midi dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_1.jpg"
    ]
  },
  {
    "id": "dress-2",
    "name": "Luxe Satin Cocktail Party Dress",
    "category": "Dresses",
    "price": 8500,
    "salePrice": 6800,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this luxe satin cocktail party dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_2.jpg"
    ]
  },
  {
    "id": "dress-3",
    "name": "Emerald Green Silk Slip Dress",
    "category": "Dresses",
    "price": 7200,
    "salePrice": 5500,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this emerald green silk slip dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_3.jpg"
    ]
  },
  {
    "id": "dress-4",
    "name": "Bohemian Embroidered Tiered Maxi Dress",
    "category": "Dresses",
    "price": 5900,
    "salePrice": null,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": false,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this bohemian embroidered tiered maxi dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_4.jpg"
    ]
  },
  {
    "id": "dress-5",
    "name": "Velvet Off-Shoulder Evening Gown",
    "category": "Dresses",
    "price": 11200,
    "salePrice": 8900,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": true,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this velvet off-shoulder evening gown. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_5.jpg"
    ]
  },
  {
    "id": "dress-6",
    "name": "Pleated Pastel A-Line Sundress",
    "category": "Dresses",
    "price": 4800,
    "salePrice": 3900,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pleated pastel a-line sundress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_6.jpg"
    ]
  },
  {
    "id": "dress-7",
    "name": "Ribbed Knit Bodycon Midi Dress",
    "category": "Dresses",
    "price": 5400,
    "salePrice": null,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": true,
    "onSale": false,
    "stock": 32,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this ribbed knit bodycon midi dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_7.jpg"
    ]
  },
  {
    "id": "dress-8",
    "name": "Vintage Polka Dot Tea Dress",
    "category": "Dresses",
    "price": 4600,
    "salePrice": 3600,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": false,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this vintage polka dot tea dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_8.jpg"
    ]
  },
  {
    "id": "dress-9",
    "name": "Wrap Front Flutter Sleeve Dress",
    "category": "Dresses",
    "price": 5200,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": false,
    "onSale": false,
    "stock": 20,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this wrap front flutter sleeve dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_9.jpg"
    ]
  },
  {
    "id": "dress-10",
    "name": "One-Shoulder Ruffled Party Dress",
    "category": "Dresses",
    "price": 7800,
    "salePrice": 6200,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": true,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this one-shoulder ruffled party dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_10.jpg"
    ]
  },
  {
    "id": "dress-11",
    "name": "Linen Button-Down Safari Shirt Dress",
    "category": "Dresses",
    "price": 6200,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": false,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this linen button-down safari shirt dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_11.jpg"
    ]
  },
  {
    "id": "dress-12",
    "name": "Sequined Mermaid Evening Gown",
    "category": "Dresses",
    "price": 14500,
    "salePrice": 11900,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this sequined mermaid evening gown. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_12.jpg"
    ]
  },
  {
    "id": "dress-13",
    "name": "Tiered Ruffle Chiffon Sundress",
    "category": "Dresses",
    "price": 4900,
    "salePrice": 3800,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this tiered ruffle chiffon sundress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_13.jpg"
    ]
  },
  {
    "id": "dress-14",
    "name": "Square Neck Smocked Midi Dress",
    "category": "Dresses",
    "price": 5300,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": true,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this square neck smocked midi dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_14.jpg"
    ]
  },
  {
    "id": "dress-15",
    "name": "Floral Lace Cap-Sleeve Cocktail Dress",
    "category": "Dresses",
    "price": 8900,
    "salePrice": 7200,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this floral lace cap-sleeve cocktail dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_15.jpg"
    ]
  },
  {
    "id": "dress-16",
    "name": "Asymmetrical Satin Wrap Dress",
    "category": "Dresses",
    "price": 6900,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": true,
    "onSale": false,
    "stock": 23,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this asymmetrical satin wrap dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_16.jpg"
    ]
  },
  {
    "id": "dress-17",
    "name": "Cotton Eyelet Summer Halter Dress",
    "category": "Dresses",
    "price": 5600,
    "salePrice": 4400,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": false,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cotton eyelet summer halter dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_17.jpg"
    ]
  },
  {
    "id": "dress-18",
    "name": "Strapless Sweetheart Ballgown",
    "category": "Dresses",
    "price": 16800,
    "salePrice": 13500,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": true,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this strapless sweetheart ballgown. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_18.jpg"
    ]
  },
  {
    "id": "dress-19",
    "name": "Minimalist Tencel Shift Dress",
    "category": "Dresses",
    "price": 4200,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": false,
    "onSale": false,
    "stock": 20,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this minimalist tencel shift dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_19.jpg"
    ]
  },
  {
    "id": "dress-20",
    "name": "Cut-Out Waistband Cocktail Dress",
    "category": "Dresses",
    "price": 7400,
    "salePrice": 5900,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": true,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cut-out waistband cocktail dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_20.jpg"
    ]
  },
  {
    "id": "dress-21",
    "name": "Romantic Puff Sleeve Organza Dress",
    "category": "Dresses",
    "price": 8200,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this romantic puff sleeve organza dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_21.jpg"
    ]
  },
  {
    "id": "dress-22",
    "name": "Side-Slit Velvet Evening Dress",
    "category": "Dresses",
    "price": 9400,
    "salePrice": 7500,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this side-slit velvet evening dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_22.jpg"
    ]
  },
  {
    "id": "dress-23",
    "name": "Ruched Mesh Bodycon Party Dress",
    "category": "Dresses",
    "price": 6100,
    "salePrice": 4800,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this ruched mesh bodycon party dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_23.jpg"
    ]
  },
  {
    "id": "dress-24",
    "name": "Tie-Belted Trench Shirt Dress",
    "category": "Dresses",
    "price": 7500,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": false,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this tie-belted trench shirt dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_24.jpg"
    ]
  },
  {
    "id": "dress-25",
    "name": "Golden Mustard Georgette Maxi Dress",
    "category": "Dresses",
    "price": 6700,
    "salePrice": 5200,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this golden mustard georgette maxi dress. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/dress_25.jpg"
    ]
  },
  {
    "id": "women-1",
    "name": "Pure Silk Elegance Blouse",
    "category": "Women",
    "price": 5400,
    "salePrice": 4200,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": false,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pure silk elegance blouse. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_1.jpg"
    ]
  },
  {
    "id": "women-2",
    "name": "Pleated Flowy Maxi Skirt",
    "category": "Women",
    "price": 4800,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": true,
    "onSale": false,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pleated flowy maxi skirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_2.jpg"
    ]
  },
  {
    "id": "women-3",
    "name": "Cable Knit Oversized Sweater",
    "category": "Women",
    "price": 5800,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": false,
    "onSale": false,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cable knit oversized sweater. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_3.jpg"
    ]
  },
  {
    "id": "women-4",
    "name": "Double-Breasted Classic Trench Coat",
    "category": "Women",
    "price": 14500,
    "salePrice": 11800,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": true,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this double-breasted classic trench coat. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_4.jpg"
    ]
  },
  {
    "id": "women-5",
    "name": "High-Rise Straight Vintage Jeans",
    "category": "Women",
    "price": 5900,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": false,
    "onSale": false,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this high-rise straight vintage jeans. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_5.jpg"
    ]
  },
  {
    "id": "women-6",
    "name": "Tailored Crepe Wide-Leg Trousers",
    "category": "Women",
    "price": 6400,
    "salePrice": 5100,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": true,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this tailored crepe wide-leg trousers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_6.jpg"
    ]
  },
  {
    "id": "women-7",
    "name": "Cropped Cashmere Blend Cardigan",
    "category": "Women",
    "price": 7200,
    "salePrice": 5800,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": false,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cropped cashmere blend cardigan. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_7.jpg"
    ]
  },
  {
    "id": "women-8",
    "name": "Relaxed Linen Resort Button-Up",
    "category": "Women",
    "price": 4500,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": true,
    "onSale": false,
    "stock": 11,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this relaxed linen resort button-up. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_8.jpg"
    ]
  },
  {
    "id": "women-9",
    "name": "Faux Leather High-Waist Pencil Skirt",
    "category": "Women",
    "price": 5600,
    "salePrice": 4400,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": false,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this faux leather high-waist pencil skirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_9.jpg"
    ]
  },
  {
    "id": "women-10",
    "name": "Ribbed Turtle-Neck Fitted Pullover",
    "category": "Women",
    "price": 4200,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": false,
    "onSale": false,
    "stock": 29,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this ribbed turtle-neck fitted pullover. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_10.jpg"
    ]
  },
  {
    "id": "women-11",
    "name": "Oversized Houndstooth Wool Blazer",
    "category": "Women",
    "price": 13500,
    "salePrice": 10800,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": true,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this oversized houndstooth wool blazer. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_11.jpg"
    ]
  },
  {
    "id": "women-12",
    "name": "Satin Lace-Trimmed Camisole Top",
    "category": "Women",
    "price": 3200,
    "salePrice": 2500,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this satin lace-trimmed camisole top. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_12.jpg"
    ]
  },
  {
    "id": "women-13",
    "name": "Distressed Light Wash Mom Jeans",
    "category": "Women",
    "price": 5200,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": true,
    "onSale": false,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this distressed light wash mom jeans. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_13.jpg"
    ]
  },
  {
    "id": "women-14",
    "name": "Belted Cargo Utility Casual Pants",
    "category": "Women",
    "price": 4900,
    "salePrice": 3900,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": false,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this belted cargo utility casual pants. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_14.jpg"
    ]
  },
  {
    "id": "women-15",
    "name": "Chunky Open-Front Duster Cardigan",
    "category": "Women",
    "price": 6800,
    "salePrice": null,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": false,
    "onSale": false,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this chunky open-front duster cardigan. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_15.jpg"
    ]
  },
  {
    "id": "women-16",
    "name": "V-Neck Draped Georgette Tunic",
    "category": "Women",
    "price": 3800,
    "salePrice": 2900,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this v-neck draped georgette tunic. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_16.jpg"
    ]
  },
  {
    "id": "women-17",
    "name": "Luxe Velvet Single-Button Blazer",
    "category": "Women",
    "price": 11800,
    "salePrice": 9400,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": true,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this luxe velvet single-button blazer. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_17.jpg"
    ]
  },
  {
    "id": "women-18",
    "name": "High-Waist Pleated Tennis Skirt",
    "category": "Women",
    "price": 3600,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": true,
    "onSale": false,
    "stock": 11,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this high-waist pleated tennis skirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_18.jpg"
    ]
  },
  {
    "id": "women-19",
    "name": "Cotton Poplin Asymmetric Peplum Top",
    "category": "Women",
    "price": 4600,
    "salePrice": 3600,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": false,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cotton poplin asymmetric peplum top. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_19.jpg"
    ]
  },
  {
    "id": "women-20",
    "name": "Sherpa Collar Quilted Puffer Jacket",
    "category": "Women",
    "price": 12900,
    "salePrice": 9900,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": true,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this sherpa collar quilted puffer jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_20.jpg"
    ]
  },
  {
    "id": "women-21",
    "name": "Cropped Fine Rib Seamless Top",
    "category": "Women",
    "price": 2600,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cropped fine rib seamless top. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_21.jpg"
    ]
  },
  {
    "id": "women-22",
    "name": "A-Line Suede Button-Front Skirt",
    "category": "Women",
    "price": 5800,
    "salePrice": 4600,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this a-line suede button-front skirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_22.jpg"
    ]
  },
  {
    "id": "women-23",
    "name": "Relaxed Knit Loungewear Co-ord Set",
    "category": "Women",
    "price": 7900,
    "salePrice": 6200,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this relaxed knit loungewear co-ord set. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_23.jpg"
    ]
  },
  {
    "id": "women-24",
    "name": "Flared Denim Raw-Hem Trousers",
    "category": "Women",
    "price": 6100,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": false,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this flared denim raw-hem trousers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_24.jpg"
    ]
  },
  {
    "id": "women-25",
    "name": "Pinstripe Tailored Office Vest",
    "category": "Women",
    "price": 4800,
    "salePrice": 3800,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": true,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pinstripe tailored office vest. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/women_25.jpg"
    ]
  },
  {
    "id": "men-1",
    "name": "Slim-Fit Oxford Tailored Shirt",
    "category": "Men",
    "price": 4200,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slim-fit oxford tailored shirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_1.jpg"
    ]
  },
  {
    "id": "men-2",
    "name": "Italian Linen Blend Blazer",
    "category": "Men",
    "price": 12500,
    "salePrice": 9900,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this italian linen blend blazer. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_2.jpg"
    ]
  },
  {
    "id": "men-3",
    "name": "Vintage Washed Denim Jacket",
    "category": "Men",
    "price": 7800,
    "salePrice": 6200,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this vintage washed denim jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_3.jpg"
    ]
  },
  {
    "id": "men-4",
    "name": "Urban Heavyweight Fleece Hoodie",
    "category": "Men",
    "price": 5600,
    "salePrice": 4500,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": true,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this urban heavyweight fleece hoodie. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_4.jpg"
    ]
  },
  {
    "id": "men-5",
    "name": "Premium Heavy Cotton Crewneck",
    "category": "Men",
    "price": 2900,
    "salePrice": 2200,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this premium heavy cotton crewneck. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_5.jpg"
    ]
  },
  {
    "id": "men-6",
    "name": "Biker Moto Genuine Leather Jacket",
    "category": "Men",
    "price": 16800,
    "salePrice": 13900,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this biker moto genuine leather jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_6.jpg"
    ]
  },
  {
    "id": "men-7",
    "name": "Tailored 2-Piece Wool Blend Suit",
    "category": "Men",
    "price": 21500,
    "salePrice": 17500,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": true,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this tailored 2-piece wool blend suit. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_7.jpg"
    ]
  },
  {
    "id": "men-8",
    "name": "Stretch Chino Casual Trousers",
    "category": "Men",
    "price": 4900,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": false,
    "onSale": false,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this stretch chino casual trousers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_8.jpg"
    ]
  },
  {
    "id": "men-9",
    "name": "Heritage Plaid Flannel Button-Up",
    "category": "Men",
    "price": 4400,
    "salePrice": 3500,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": false,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this heritage plaid flannel button-up. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_9.jpg"
    ]
  },
  {
    "id": "men-10",
    "name": "Textured Waffle Knit Long-Sleeve",
    "category": "Men",
    "price": 3800,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": true,
    "onSale": false,
    "stock": 29,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this textured waffle knit long-sleeve. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_10.jpg"
    ]
  },
  {
    "id": "men-11",
    "name": "Merino Wool V-Neck Sweater",
    "category": "Men",
    "price": 6800,
    "salePrice": 5400,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": false,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this merino wool v-neck sweater. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_11.jpg"
    ]
  },
  {
    "id": "men-12",
    "name": "Military Utility Field Jacket",
    "category": "Men",
    "price": 9800,
    "salePrice": 7900,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this military utility field jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_12.jpg"
    ]
  },
  {
    "id": "men-13",
    "name": "Classic Polo Pique Embroidered Shirt",
    "category": "Men",
    "price": 3400,
    "salePrice": 2700,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this classic polo pique embroidered shirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_13.jpg"
    ]
  },
  {
    "id": "men-14",
    "name": "Slim Tapered Stretch Denim Jeans",
    "category": "Men",
    "price": 5800,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": true,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slim tapered stretch denim jeans. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_14.jpg"
    ]
  },
  {
    "id": "men-15",
    "name": "Double-Breasted Wool Overcoat",
    "category": "Men",
    "price": 18900,
    "salePrice": 15200,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": true,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this double-breasted wool overcoat. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_15.jpg"
    ]
  },
  {
    "id": "men-16",
    "name": "Casual Corduroy Overshirt Jacket",
    "category": "Men",
    "price": 6400,
    "salePrice": 5100,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this casual corduroy overshirt jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_16.jpg"
    ]
  },
  {
    "id": "men-17",
    "name": "Breathable Tech Fleece Track Pants",
    "category": "Men",
    "price": 4600,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": true,
    "onSale": false,
    "stock": 32,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this breathable tech fleece track pants. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_17.jpg"
    ]
  },
  {
    "id": "men-18",
    "name": "Mandarin Collar Linen Summer Shirt",
    "category": "Men",
    "price": 4200,
    "salePrice": 3300,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": false,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this mandarin collar linen summer shirt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_18.jpg"
    ]
  },
  {
    "id": "men-19",
    "name": "Windproof Bomber Flight Jacket",
    "category": "Men",
    "price": 8800,
    "salePrice": 6900,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": true,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this windproof bomber flight jacket. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_19.jpg"
    ]
  },
  {
    "id": "men-20",
    "name": "Smart Relaxed Pleated Dress Pants",
    "category": "Men",
    "price": 6200,
    "salePrice": null,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": false,
    "onSale": false,
    "stock": 29,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this smart relaxed pleated dress pants. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_20.jpg"
    ]
  },
  {
    "id": "men-21",
    "name": "Striped Breton Heavyweight Tee",
    "category": "Men",
    "price": 3200,
    "salePrice": 2500,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": false,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this striped breton heavyweight tee. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_21.jpg"
    ]
  },
  {
    "id": "men-22",
    "name": "Quilted Down Insulated Winter Vest",
    "category": "Men",
    "price": 7600,
    "salePrice": 5900,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this quilted down insulated winter vest. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_22.jpg"
    ]
  },
  {
    "id": "men-23",
    "name": "Tuxedo Formal Dinner Suit Set",
    "category": "Men",
    "price": 24500,
    "salePrice": 19800,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this tuxedo formal dinner suit set. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_23.jpg"
    ]
  },
  {
    "id": "men-24",
    "name": "Raw Selvedge Indigo Denim Jeans",
    "category": "Men",
    "price": 8400,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": true,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this raw selvedge indigo denim jeans. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_24.jpg"
    ]
  },
  {
    "id": "men-25",
    "name": "Cozy Cable Crewneck Fisherman Knit",
    "category": "Men",
    "price": 6900,
    "salePrice": 5500,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this cozy cable crewneck fisherman knit. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/men_25.jpg"
    ]
  },
  {
    "id": "bag-1",
    "name": "Artisan Leather Saddle Crossbody",
    "category": "Bags",
    "price": 9800,
    "salePrice": 7900,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": false,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this artisan leather saddle crossbody. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_1.jpg"
    ]
  },
  {
    "id": "bag-2",
    "name": "Structured Canvas & Leather Tote",
    "category": "Bags",
    "price": 6800,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": true,
    "onSale": false,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this structured canvas & leather tote. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_2.jpg"
    ]
  },
  {
    "id": "bag-3",
    "name": "Minimalist City Leather Backpack",
    "category": "Bags",
    "price": 11500,
    "salePrice": 9200,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this minimalist city leather backpack. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_3.jpg"
    ]
  },
  {
    "id": "bag-4",
    "name": "Italian Nappa Leather Shoulder Bag",
    "category": "Bags",
    "price": 12800,
    "salePrice": 10200,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": true,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this italian nappa leather shoulder bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_4.jpg"
    ]
  },
  {
    "id": "bag-5",
    "name": "Vintage Quilted Chain Flap Bag",
    "category": "Bags",
    "price": 8900,
    "salePrice": 6900,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this vintage quilted chain flap bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_5.jpg"
    ]
  },
  {
    "id": "bag-6",
    "name": "Woven Raffia Summer Beach Tote",
    "category": "Bags",
    "price": 4500,
    "salePrice": 3600,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this woven raffia summer beach tote. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_6.jpg"
    ]
  },
  {
    "id": "bag-7",
    "name": "Slimline Leather Laptop Briefcase",
    "category": "Bags",
    "price": 13500,
    "salePrice": 10800,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": true,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slimline leather laptop briefcase. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_7.jpg"
    ]
  },
  {
    "id": "bag-8",
    "name": "Crescent Moon Hobo Shoulder Bag",
    "category": "Bags",
    "price": 7400,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": true,
    "onSale": false,
    "stock": 11,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this crescent moon hobo shoulder bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_8.jpg"
    ]
  },
  {
    "id": "bag-9",
    "name": "Saffiano Leather Work Tote",
    "category": "Bags",
    "price": 9600,
    "salePrice": 7800,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": false,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this saffiano leather work tote. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_9.jpg"
    ]
  },
  {
    "id": "bag-10",
    "name": "Compact Camera Crossbody Bag",
    "category": "Bags",
    "price": 5800,
    "salePrice": 4600,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": true,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this compact camera crossbody bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_10.jpg"
    ]
  },
  {
    "id": "bag-11",
    "name": "Soft Ruched Cloud Clutch Pouch",
    "category": "Bags",
    "price": 5200,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this soft ruched cloud clutch pouch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_11.jpg"
    ]
  },
  {
    "id": "bag-12",
    "name": "Pebbled Leather Bucket Drawstring Bag",
    "category": "Bags",
    "price": 8400,
    "salePrice": 6700,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pebbled leather bucket drawstring bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_12.jpg"
    ]
  },
  {
    "id": "bag-13",
    "name": "Gym & Travel Canvas Duffel Bag",
    "category": "Bags",
    "price": 6500,
    "salePrice": 5200,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this gym & travel canvas duffel bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_13.jpg"
    ]
  },
  {
    "id": "bag-14",
    "name": "Metallic Envelope Evening Clutch",
    "category": "Bags",
    "price": 4200,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": true,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this metallic envelope evening clutch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_14.jpg"
    ]
  },
  {
    "id": "bag-15",
    "name": "Mini Box Crossbody Trunk Bag",
    "category": "Bags",
    "price": 6900,
    "salePrice": 5500,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this mini box crossbody trunk bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_15.jpg"
    ]
  },
  {
    "id": "bag-16",
    "name": "Braided Leather Handle Satchel",
    "category": "Bags",
    "price": 10400,
    "salePrice": 8300,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": true,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this braided leather handle satchel. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_16.jpg"
    ]
  },
  {
    "id": "bag-17",
    "name": "Waterproof Commuter Roll-Top Pack",
    "category": "Bags",
    "price": 8200,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": false,
    "onSale": false,
    "stock": 32,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this waterproof commuter roll-top pack. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_17.jpg"
    ]
  },
  {
    "id": "bag-18",
    "name": "Croc-Embossed Baguette Shoulder Bag",
    "category": "Bags",
    "price": 5900,
    "salePrice": 4700,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": true,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this croc-embossed baguette shoulder bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_18.jpg"
    ]
  },
  {
    "id": "bag-19",
    "name": "Slouchy Oversized Leather Shopper",
    "category": "Bags",
    "price": 11200,
    "salePrice": 8900,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": false,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slouchy oversized leather shopper. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_19.jpg"
    ]
  },
  {
    "id": "bag-20",
    "name": "Convertible Belt & Crossbody Pouch",
    "category": "Bags",
    "price": 4600,
    "salePrice": 3600,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": false,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this convertible belt & crossbody pouch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_20.jpg"
    ]
  },
  {
    "id": "bag-21",
    "name": "Two-Tone Canvas Weekender Holdall",
    "category": "Bags",
    "price": 9400,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this two-tone canvas weekender holdall. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_21.jpg"
    ]
  },
  {
    "id": "bag-22",
    "name": "Structured Top-Handle Kelly Satchel",
    "category": "Bags",
    "price": 14200,
    "salePrice": 11500,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this structured top-handle kelly satchel. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_22.jpg"
    ]
  },
  {
    "id": "bag-23",
    "name": "Velvet Quilted Evening Minaudi\u00e8re",
    "category": "Bags",
    "price": 6100,
    "salePrice": 4800,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this velvet quilted evening minaudi\u00e8re. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_23.jpg"
    ]
  },
  {
    "id": "bag-24",
    "name": "Geometric Hexagon Mini Handbag",
    "category": "Bags",
    "price": 7200,
    "salePrice": null,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": true,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this geometric hexagon mini handbag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_24.jpg"
    ]
  },
  {
    "id": "bag-25",
    "name": "Boho Suede Fringe Crossbody Bag",
    "category": "Bags",
    "price": 6700,
    "salePrice": 5300,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this boho suede fringe crossbody bag. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/bag_25.jpg"
    ]
  },
  {
    "id": "shoes-1",
    "name": "Strappy Stiletto Evening Heels",
    "category": "Shoes",
    "price": 6200,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this strappy stiletto evening heels. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_1.jpg"
    ]
  },
  {
    "id": "shoes-2",
    "name": "Retro Court Minimalist Sneakers",
    "category": "Shoes",
    "price": 7400,
    "salePrice": 5900,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": true,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this retro court minimalist sneakers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_2.jpg"
    ]
  },
  {
    "id": "shoes-3",
    "name": "Chunky Chelsea Leather Ankle Boots",
    "category": "Shoes",
    "price": 8900,
    "salePrice": 7200,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this chunky chelsea leather ankle boots. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_3.jpg"
    ]
  },
  {
    "id": "shoes-4",
    "name": "Classic Penny Leather Dress Loafers",
    "category": "Shoes",
    "price": 9400,
    "salePrice": 7500,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": true,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this classic penny leather dress loafers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_4.jpg"
    ]
  },
  {
    "id": "shoes-5",
    "name": "Pointed Toe Suede High Pumps",
    "category": "Shoes",
    "price": 6800,
    "salePrice": 5400,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this pointed toe suede high pumps. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_5.jpg"
    ]
  },
  {
    "id": "shoes-6",
    "name": "White Leather Low-Top Trainers",
    "category": "Shoes",
    "price": 6900,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": true,
    "onSale": false,
    "stock": 23,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this white leather low-top trainers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_6.jpg"
    ]
  },
  {
    "id": "shoes-7",
    "name": "Knee-High Suede Riding Boots",
    "category": "Shoes",
    "price": 13800,
    "salePrice": 10900,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": true,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this knee-high suede riding boots. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_7.jpg"
    ]
  },
  {
    "id": "shoes-8",
    "name": "Espadrille Wedge Platform Sandals",
    "category": "Shoes",
    "price": 5200,
    "salePrice": 4100,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": false,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this espadrille wedge platform sandals. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_8.jpg"
    ]
  },
  {
    "id": "shoes-9",
    "name": "Brogue Wingtip Oxford Dress Shoes",
    "category": "Shoes",
    "price": 11500,
    "salePrice": 9200,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": true,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this brogue wingtip oxford dress shoes. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_9.jpg"
    ]
  },
  {
    "id": "shoes-10",
    "name": "Block Heel Ankle Strap Sandals",
    "category": "Shoes",
    "price": 5600,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": false,
    "onSale": false,
    "stock": 29,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this block heel ankle strap sandals. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_10.jpg"
    ]
  },
  {
    "id": "shoes-11",
    "name": "Combat Lace-Up Lug Sole Boots",
    "category": "Shoes",
    "price": 9800,
    "salePrice": 7900,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": true,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this combat lace-up lug sole boots. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_11.jpg"
    ]
  },
  {
    "id": "shoes-12",
    "name": "Slip-On Knit Runner Sneakers",
    "category": "Shoes",
    "price": 5900,
    "salePrice": 4700,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slip-on knit runner sneakers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_12.jpg"
    ]
  },
  {
    "id": "shoes-13",
    "name": "Mule Slides with Gold Buckle",
    "category": "Shoes",
    "price": 4800,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": true,
    "onSale": false,
    "stock": 26,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this mule slides with gold buckle. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_13.jpg"
    ]
  },
  {
    "id": "shoes-14",
    "name": "Derby Cap-Toe Formal Men's Shoes",
    "category": "Shoes",
    "price": 10900,
    "salePrice": 8700,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": false,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this derby cap-toe formal men's shoes. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_14.jpg"
    ]
  },
  {
    "id": "shoes-15",
    "name": "Flatform Braided Strap Slides",
    "category": "Shoes",
    "price": 3900,
    "salePrice": 2900,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this flatform braided strap slides. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_15.jpg"
    ]
  },
  {
    "id": "shoes-16",
    "name": "Western Pointed Cowgirl Ankle Boots",
    "category": "Shoes",
    "price": 11200,
    "salePrice": 8900,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": true,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this western pointed cowgirl ankle boots. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_16.jpg"
    ]
  },
  {
    "id": "shoes-17",
    "name": "Chunky Platform Dad Sneakers",
    "category": "Shoes",
    "price": 7800,
    "salePrice": 6200,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": true,
    "onSale": true,
    "stock": 32,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this chunky platform dad sneakers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_17.jpg"
    ]
  },
  {
    "id": "shoes-18",
    "name": "Velvet Ballet Flats with Bow",
    "category": "Shoes",
    "price": 4200,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": false,
    "onSale": false,
    "stock": 11,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this velvet ballet flats with bow. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_18.jpg"
    ]
  },
  {
    "id": "shoes-19",
    "name": "Monk Strap Burnished Leather Shoes",
    "category": "Shoes",
    "price": 12400,
    "salePrice": 9900,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": true,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this monk strap burnished leather shoes. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_19.jpg"
    ]
  },
  {
    "id": "shoes-20",
    "name": "Strappy Lace-Up Gladiator Sandals",
    "category": "Shoes",
    "price": 4900,
    "salePrice": 3900,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": false,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this strappy lace-up gladiator sandals. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_20.jpg"
    ]
  },
  {
    "id": "shoes-21",
    "name": "Waterproof Hiker Traction Boots",
    "category": "Shoes",
    "price": 10500,
    "salePrice": 8400,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": false,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this waterproof hiker traction boots. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_21.jpg"
    ]
  },
  {
    "id": "shoes-22",
    "name": "D'Orsay Scalloped Pointy Flats",
    "category": "Shoes",
    "price": 4500,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": true,
    "onSale": false,
    "stock": 17,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this d'orsay scalloped pointy flats. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_22.jpg"
    ]
  },
  {
    "id": "shoes-23",
    "name": "Slingback Kitten Heel Pumps",
    "category": "Shoes",
    "price": 6400,
    "salePrice": 5100,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slingback kitten heel pumps. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_23.jpg"
    ]
  },
  {
    "id": "shoes-24",
    "name": "Skateboarding Suede Gum Sneakers",
    "category": "Shoes",
    "price": 5800,
    "salePrice": 4600,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": false,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this skateboarding suede gum sneakers. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_24.jpg"
    ]
  },
  {
    "id": "shoes-25",
    "name": "Square Toe Minimalist Mules",
    "category": "Shoes",
    "price": 5300,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": true,
    "onSale": false,
    "stock": 14,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this square toe minimalist mules. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/shoes_25.jpg"
    ]
  },
  {
    "id": "acc-1",
    "name": "18K Gold Plated Chain Necklace",
    "category": "Accessories",
    "price": 2800,
    "salePrice": 2200,
    "rating": 4.2,
    "reviewCount": 15,
    "isNew": true,
    "onSale": true,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this 18k gold plated chain necklace. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_1.jpg"
    ]
  },
  {
    "id": "acc-2",
    "name": "Bifold Genuine Leather Wallet",
    "category": "Accessories",
    "price": 3400,
    "salePrice": null,
    "rating": 4.9,
    "reviewCount": 28,
    "isNew": false,
    "onSale": false,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this bifold genuine leather wallet. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_2.jpg"
    ]
  },
  {
    "id": "acc-3",
    "name": "Chronograph Minimalist Wristwatch",
    "category": "Accessories",
    "price": 9500,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 41,
    "isNew": true,
    "onSale": false,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this chronograph minimalist wristwatch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_3.jpg"
    ]
  },
  {
    "id": "acc-4",
    "name": "UV400 Polarized Aviator Sunglasses",
    "category": "Accessories",
    "price": 3200,
    "salePrice": 2500,
    "rating": 4.7,
    "reviewCount": 54,
    "isNew": true,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this uv400 polarized aviator sunglasses. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_4.jpg"
    ]
  },
  {
    "id": "acc-5",
    "name": "Hammered Gold Band Ring Set",
    "category": "Accessories",
    "price": 2200,
    "salePrice": 1700,
    "rating": 4.6,
    "reviewCount": 67,
    "isNew": false,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this hammered gold band ring set. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_5.jpg"
    ]
  },
  {
    "id": "acc-6",
    "name": "Reversible Italian Leather Dress Belt",
    "category": "Accessories",
    "price": 3800,
    "salePrice": 2900,
    "rating": 4.5,
    "reviewCount": 80,
    "isNew": true,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this reversible italian leather dress belt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_6.jpg"
    ]
  },
  {
    "id": "acc-7",
    "name": "Silk Floral Hair & Neck Scarf",
    "category": "Accessories",
    "price": 2400,
    "salePrice": null,
    "rating": 4.4,
    "reviewCount": 18,
    "isNew": false,
    "onSale": false,
    "stock": 32,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this silk floral hair & neck scarf. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_7.jpg"
    ]
  },
  {
    "id": "acc-8",
    "name": "Luxe Automatic Skeleton Watch",
    "category": "Accessories",
    "price": 16500,
    "salePrice": 13200,
    "rating": 4.3,
    "reviewCount": 31,
    "isNew": true,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this luxe automatic skeleton watch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_8.jpg"
    ]
  },
  {
    "id": "acc-9",
    "name": "Oversized Tortoise Shell Sunglasses",
    "category": "Accessories",
    "price": 3600,
    "salePrice": 2800,
    "rating": 4.2,
    "reviewCount": 44,
    "isNew": true,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this oversized tortoise shell sunglasses. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_9.jpg"
    ]
  },
  {
    "id": "acc-10",
    "name": "Freshwater Baroque Pearl Earrings",
    "category": "Accessories",
    "price": 4200,
    "salePrice": 3300,
    "rating": 4.9,
    "reviewCount": 57,
    "isNew": false,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this freshwater baroque pearl earrings. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_10.jpg"
    ]
  },
  {
    "id": "acc-11",
    "name": "Braided Leather & Steel Bracelet",
    "category": "Accessories",
    "price": 2600,
    "salePrice": null,
    "rating": 4.8,
    "reviewCount": 70,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this braided leather & steel bracelet. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_11.jpg"
    ]
  },
  {
    "id": "acc-12",
    "name": "Full-Grain Zip-Around Long Wallet",
    "category": "Accessories",
    "price": 4800,
    "salePrice": 3800,
    "rating": 4.7,
    "reviewCount": 83,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this full-grain zip-around long wallet. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_12.jpg"
    ]
  },
  {
    "id": "acc-13",
    "name": "Wide-Brim Wool Felt Fedora Hat",
    "category": "Accessories",
    "price": 5200,
    "salePrice": 4100,
    "rating": 4.6,
    "reviewCount": 21,
    "isNew": true,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this wide-brim wool felt fedora hat. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_13.jpg"
    ]
  },
  {
    "id": "acc-14",
    "name": "Vintage Signet Monogram Ring",
    "category": "Accessories",
    "price": 2500,
    "salePrice": null,
    "rating": 4.5,
    "reviewCount": 34,
    "isNew": false,
    "onSale": false,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this vintage signet monogram ring. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_14.jpg"
    ]
  },
  {
    "id": "acc-15",
    "name": "Titanium Ultra-Light Eyeglass Frames",
    "category": "Accessories",
    "price": 6800,
    "salePrice": 5400,
    "rating": 4.4,
    "reviewCount": 47,
    "isNew": true,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this titanium ultra-light eyeglass frames. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_15.jpg"
    ]
  },
  {
    "id": "acc-16",
    "name": "Knitted Cashmere Winter Scarf",
    "category": "Accessories",
    "price": 4600,
    "salePrice": 3600,
    "rating": 4.3,
    "reviewCount": 60,
    "isNew": false,
    "onSale": true,
    "stock": 23,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this knitted cashmere winter scarf. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_16.jpg"
    ]
  },
  {
    "id": "acc-17",
    "name": "Sterling Silver Layered Choker",
    "category": "Accessories",
    "price": 3100,
    "salePrice": null,
    "rating": 4.2,
    "reviewCount": 73,
    "isNew": true,
    "onSale": false,
    "stock": 32,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this sterling silver layered choker. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_17.jpg"
    ]
  },
  {
    "id": "acc-18",
    "name": "Canvas & Leather Trim Webbing Belt",
    "category": "Accessories",
    "price": 2700,
    "salePrice": 2100,
    "rating": 4.9,
    "reviewCount": 86,
    "isNew": false,
    "onSale": true,
    "stock": 11,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this canvas & leather trim webbing belt. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_18.jpg"
    ]
  },
  {
    "id": "acc-19",
    "name": "Rose Gold Mesh Minimal Watch",
    "category": "Accessories",
    "price": 8900,
    "salePrice": 7100,
    "rating": 4.8,
    "reviewCount": 24,
    "isNew": true,
    "onSale": true,
    "stock": 20,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this rose gold mesh minimal watch. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_19.jpg"
    ]
  },
  {
    "id": "acc-20",
    "name": "Crystal Studded Drop Chandelier Earrings",
    "category": "Accessories",
    "price": 3800,
    "salePrice": 2900,
    "rating": 4.7,
    "reviewCount": 37,
    "isNew": false,
    "onSale": true,
    "stock": 29,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this crystal studded drop chandelier earrings. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_20.jpg"
    ]
  },
  {
    "id": "acc-21",
    "name": "Slim Aluminum RFID Cardholder",
    "category": "Accessories",
    "price": 2900,
    "salePrice": null,
    "rating": 4.6,
    "reviewCount": 50,
    "isNew": true,
    "onSale": false,
    "stock": 8,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this slim aluminum rfid cardholder. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_21.jpg"
    ]
  },
  {
    "id": "acc-22",
    "name": "Straw Panama Summer Sun Hat",
    "category": "Accessories",
    "price": 3900,
    "salePrice": 3100,
    "rating": 4.5,
    "reviewCount": 63,
    "isNew": false,
    "onSale": true,
    "stock": 17,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this straw panama summer sun hat. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_22.jpg"
    ]
  },
  {
    "id": "acc-23",
    "name": "Geometric Resin Chunky Bangles",
    "category": "Accessories",
    "price": 2100,
    "salePrice": 1600,
    "rating": 4.4,
    "reviewCount": 76,
    "isNew": false,
    "onSale": true,
    "stock": 26,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this geometric resin chunky bangles. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_23.jpg"
    ]
  },
  {
    "id": "acc-24",
    "name": "Aviator Metal Frame Sunglasses",
    "category": "Accessories",
    "price": 3400,
    "salePrice": 2700,
    "rating": 4.3,
    "reviewCount": 89,
    "isNew": false,
    "onSale": true,
    "stock": 35,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "description": "Exquisite craftsmanship and premium materials define this aviator metal frame sunglasses. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_24.jpg"
    ]
  },
  {
    "id": "acc-25",
    "name": "Gilded Coin Pendant Choker",
    "category": "Accessories",
    "price": 2900,
    "salePrice": 2300,
    "rating": 4.2,
    "reviewCount": 27,
    "isNew": true,
    "onSale": true,
    "stock": 14,
    "sizes": [
      "One Size"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "description": "Exquisite craftsmanship and premium materials define this gilded coin pendant choker. Tailored for exceptional comfort and effortless modern style.",
    "images": [
      "images/products/acc_25.jpg"
    ]
  }
];

  // Session Context State
  let currentContextOrder = null;
  let pendingGiftBudget = 12000;

  // Pre-loaded Live Store Orders for Instant Super-User Querying
  const DEMO_ORDERS = {
    'ORD-004355': {
      id: 'ORD-004355',
      status: 'shipped',
      date: 'Oct 12, 2026',
      customer: 'Kamal Gunaratne',
      city: 'Maharagama, Colombo',
      address: '45 Temple Road, Maharagama',
      phone: '+94 71 892 4355',
      courier: 'PromptX Express Logistics (Out for Delivery Today)',
      items: 'Luxe Satin Cocktail Party Dress (Size: M, Color: Crimson Red)',
      subtotal: 'Rs. 6,800.00',
      total: 'Rs. 6,800.00',
      paymentMethod: 'Cash on Delivery (COD)'
    },
    'ORD-001234': {
      id: 'ORD-001234',
      status: 'delivered',
      date: 'Aug 1, 2026',
      customer: 'Ayesha Fernando',
      city: 'Colombo 03',
      address: '123 Galle Road, Colombo 03',
      phone: '+94 77 123 4567',
      courier: 'PromptX Courier (Delivered to Recipient)',
      items: 'Floral Silk Chiffon Midi Dress + Quilted Chain Bag',
      subtotal: 'Rs. 11,700.00',
      total: 'Rs. 11,700.00',
      paymentMethod: 'Credit Card (Visa)'
    },
    'ORD-001187': {
      id: 'ORD-001187',
      status: 'shipped',
      date: 'Aug 15, 2026',
      customer: 'Kasun Perera',
      city: 'Kandy',
      address: '78 Peradeniya Road, Kandy',
      phone: '+94 77 987 1187',
      courier: 'Pronto Delivery (In Transit to Central Hub)',
      items: 'Classic Oxford Cotton Shirt (Size: L)',
      subtotal: 'Rs. 3,800.00',
      total: 'Rs. 3,800.00',
      paymentMethod: 'Koko Pay (Installments)'
    },
    'ORD-001056': {
      id: 'ORD-001056',
      status: 'pending',
      date: 'Aug 25, 2026',
      customer: 'Sanduni Silva',
      city: 'Galle',
      address: '12 Fort Street, Galle',
      phone: '+94 70 456 1056',
      courier: 'Packaging at Colombo Warehouse',
      items: 'Silk Evening Blouse',
      subtotal: 'Rs. 5,200.00',
      total: 'Rs. 5,200.00',
      paymentMethod: 'Cash on Delivery (COD)'
    },
    'ORD-000998': {
      id: 'ORD-000998',
      status: 'processing',
      date: 'Aug 20, 2026',
      customer: 'Nimali Dias',
      city: 'Negombo',
      address: '89 Beach Road, Negombo',
      phone: '+94 72 333 0998',
      courier: 'Fulfillment Hub Quality Check',
      items: '18K Gold Plated Chain Necklace',
      subtotal: 'Rs. 7,300.00',
      total: 'Rs. 7,300.00',
      paymentMethod: 'Credit Card (MasterCard)'
    }
  };

  // Helper to fetch logged-in user from localStorage or Firebase
  function getLoggedInUserInfo() {
    try {
      const demo = JSON.parse(localStorage.getItem('shenu_demo_user') || 'null');
      if (demo) return demo;
      const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (current) return current;
      if (window.firebaseAuthUser) return window.firebaseAuthUser;
    } catch(e) {}
    return null;
  }

  // Helper to get latest placed order from localStorage
  function getLatestPlacedOrder() {
    try {
      const placed = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
      if (placed && placed.length > 0) {
        return placed[placed.length - 1];
      }
    } catch(e) {}
    return null;
  }

  // Unified Live Store Orders Provider
  // Reads authoritative orders from active page memory, localStorage, and Firestore overrides
  function getLiveStoreOrders() {
    let combined = [];

    // 1. Direct memory if on admin page
    if (window.allOrders && Array.isArray(window.allOrders) && window.allOrders.length > 0) {
      combined = [...window.allOrders];
    } else {
      // 2. Check unified synced cache from Admin/Firestore
      try {
        const cached = JSON.parse(localStorage.getItem('shenu_all_orders') || '[]');
        if (Array.isArray(cached) && cached.length > 0) {
          combined = [...cached];
        }
      } catch(e) {}
    }

    // 3. Fallback: If not in memory or cache, load from placed orders + demo orders
    if (combined.length === 0) {
      try {
        const placed = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
        combined.push(...placed);
      } catch(e) {}

      const baseDemo = [
        { id:'ORD-001234', userName:'Ayesha Fernando', userEmail:'ayesha@email.com', items:[{name:'Floral Silk Dress'},{name:'Leather Bag'}], total:11700, status:'delivered', courier:'PromptX Courier (Delivered to Recipient)', date:'Aug 1, 2026', city:'Colombo 03', address:'123 Galle Road, Colombo 03', paymentMethod:'Credit Card (Visa)' },
        { id:'ORD-001187', userName:'Kasun Perera',    userEmail:'kasun@email.com',  items:[{name:'Classic Oxford Cotton Shirt'}], total:3800, status:'processing', courier:'Fulfillment Center (Quality Check)', date:'Aug 15, 2026', city:'Kandy', address:'78 Peradeniya Road, Kandy', paymentMethod:'Koko Pay (Installments)' },
        { id:'ORD-001056', userName:'Sanduni Silva',   userEmail:'sanduni@email.com', items:[{name:'Silk Evening Blouse'}], total:5200, status:'processing', courier:'Fulfillment Center (Processing)', date:'Aug 25, 2026', city:'Galle', address:'12 Fort Street, Galle', paymentMethod:'Cash on Delivery (COD)' },
        { id:'ORD-000998', userName:'Nimali Dias',     userEmail:'nimali@email.com',  items:[{name:'Gold Plated Chain Necklace'}], total:7300, status:'processing', courier:'Fulfillment Center (Quality Check)', date:'Aug 20, 2026', city:'Negombo', address:'89 Beach Road, Negombo', paymentMethod:'Credit Card (MasterCard)' },
      ];

      baseDemo.forEach(d => {
        if (!combined.some(c => (c.id || c.orderId || '').replace(/^#/, '').toUpperCase() === d.id.toUpperCase())) {
          combined.push(d);
        }
      });
    }

    // Deduplicate by clean ID
    const uniqueOrders = [];
    const seenIds = new Set();
    for (const ord of combined) {
      const cleanId = (ord.id || ord.orderId || '').replace(/[#\s-]/g, '').toUpperCase();
      if (cleanId && !seenIds.has(cleanId)) {
        seenIds.add(cleanId);
        uniqueOrders.push(ord);
      }
    }
    combined = uniqueOrders;

    // Apply deleted orders filter
    try {
      const deleted = JSON.parse(localStorage.getItem('shenu_deleted_orders') || '[]');
      combined = combined.filter(o => {
        const clean = (o.id || o.orderId || '').replace(/[#\s-]/g, '').toUpperCase();
        return !deleted.some(d => {
          const cleanD = (d || '').replace(/[#\s-]/g, '').toUpperCase();
          return clean === cleanD || clean.includes(cleanD) || cleanD.includes(clean);
        });
      });
    } catch(e) {}

    // Apply real-time status overrides
    try {
      const overrides = JSON.parse(localStorage.getItem('shenu_order_statuses') || '{}');
      combined.forEach(o => {
        const clean = (o.id || o.orderId || '').replace(/[#\s-]/g, '').toUpperCase();
        for (const k in overrides) {
          const cleanK = k.replace(/[#\s-]/g, '').toUpperCase();
          if (cleanK === clean || clean.includes(cleanK) || cleanK.includes(clean)) {
            o.status = overrides[k].toLowerCase();
            break;
          }
        }
      });
    } catch(e) {}

    return combined;
  }

  // Helper to dynamically calculate live order counts across all statuses
  function getLiveOrderStats() {
    const all = getLiveStoreOrders();

    const counts = {
      all: all.length,
      pending: all.filter(o => (o.status || '').toLowerCase() === 'pending').length,
      processing: all.filter(o => (o.status || '').toLowerCase() === 'processing').length,
      shipped: all.filter(o => (o.status || '').toLowerCase() === 'shipped').length,
      delivered: all.filter(o => (o.status || '').toLowerCase() === 'delivered').length,
      cancelled: all.filter(o => (o.status || '').toLowerCase() === 'cancelled').length,
      totalRevenue: all.reduce((sum, o) => {
        const val = typeof o.total === 'number' ? o.total : parseFloat(String(o.total || '0').replace(/[^0-9.]/g, '')) || 0;
        return sum + val;
      }, 0)
    };

    return { counts, orders: all };
  }

  // Super-User Order Resolver (Handles exact, partial, or synthesized)
  function lookupOrder(query) {
    if (!query) return null;
    const clean = query.replace(/[#\s]/g, '').toUpperCase();

    // 0. Check if order was permanently deleted in Admin
    let deletedOrders = [];
    try {
      deletedOrders = JSON.parse(localStorage.getItem('shenu_deleted_orders') || '[]');
    } catch(e) {}

    for (const dId of deletedOrders) {
      const cleanD = (dId || '').replace(/[#\s-]/g, '').toUpperCase();
      const numOnly = (dId || '').replace(/\D/g, '');
      if (clean === cleanD || clean.includes(cleanD) || cleanD.includes(clean) || (numOnly && clean.includes(numOnly))) {
        return { deleted: true, id: dId.replace(/^#/, '') };
      }
    }

    function getCourierForStatus(status) {
      const s = (status || '').toLowerCase();
      if (s === 'pending') return 'Colombo Warehouse (Order Received & Pending Processing)';
      if (s === 'processing') return 'Fulfillment Center (Quality Check & Processing)';
      if (s === 'shipped') return 'Pronto Delivery (In Transit to Destination)';
      if (s === 'delivered') return 'PromptX Courier (Delivered to Recipient)';
      if (s === 'cancelled') return 'Order Cancelled (No Dispatch / Processing)';
      return 'PromptX Courier Logistics';
    }

    // 1. Check authoritative live store orders
    const liveOrders = getLiveStoreOrders();
    for (const ord of liveOrders) {
      const ordId = (ord.id || ord.orderId || '').replace(/[#\s-]/g, '').toUpperCase();
      const numOnly = (ord.id || ord.orderId || '').replace(/\D/g, '');
      if (clean.includes(ordId) || ordId.includes(clean) || (numOnly && clean.includes(numOnly))) {
        let itemsText = 'Fashion Apparel';
        if (Array.isArray(ord.items) && ord.items.length > 0) {
          itemsText = ord.items.map(i => {
            if (typeof i === 'string') return i;
            return i.title || i.name || i.productTitle || i.productName || 'Fashion Item';
          }).join(', ');
        }
        let dateStr = 'Recent';
        if (ord.createdAt?.toDate) dateStr = ord.createdAt.toDate().toLocaleDateString();
        else if (ord.date) dateStr = new Date(ord.date).toLocaleDateString();

        const cust = ord.userName || (ord.shipping?.firstName ? `${ord.shipping.firstName} ${ord.shipping.lastName || ''}`.trim() : (ord.shippingAddress?.firstName ? `${ord.shippingAddress.firstName} ${ord.shippingAddress.lastName || ''}`.trim() : 'Customer'));

        const numTotal = typeof ord.total === 'number' ? ord.total : parseFloat(String(ord.total || '0').replace(/[^0-9.]/g, '')) || 0;

        return {
          id: (ord.id || ord.orderId || '').replace(/^#/, ''),
          status: (ord.status || 'processing').toLowerCase(),
          date: dateStr,
          customer: cust,
          city: ord.shipping?.city || ord.shippingAddress?.city || ord.city || 'Sri Lanka',
          address: ord.shipping?.address1 || ord.shippingAddress?.address1 || ord.address || 'Standard Shipping Address',
          phone: ord.shipping?.phone || ord.shippingAddress?.phone || ord.phone || '+94 77 000 0000',
          courier: ord.courier || getCourierForStatus(ord.status),
          items: itemsText,
          subtotal: `Rs. ${numTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          total: `Rs. ${numTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          paymentMethod: ord.paymentMethod || 'Online Payment'
        };
      }
    }

    // Fallback if 4-6 digits provided specifically in tracking context
    const digitMatch = query.match(/(\d{4,6})/);
    if (digitMatch) {
      const num = digitMatch[1];
      const synOrder = {
        id: `ORD-00${num}`,
        status: 'shipped',
        date: 'Oct 14, 2026',
        customer: 'Kamal Gunaratne',
        city: 'Maharagama, Colombo',
        address: '45 Temple Road, Maharagama',
        phone: '+94 71 892 4355',
        courier: getCourierForStatus('shipped'),
        items: 'Luxe Satin Cocktail Party Dress',
        subtotal: 'Rs. 6,800.00',
        total: 'Rs. 6,800.00',
        paymentMethod: 'Cash on Delivery (COD)'
      };
      return synOrder;
    }

    return null;
  }

  // Mount Chat Widget (Clean UI, single welcome line, no sparkle)
  function mountChatWidget() {
    let trigger = document.getElementById('shenu-chat-trigger');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.id = 'shenu-chat-trigger';
      trigger.title = 'Chat with Shenu AI Stylist & Track Orders';
      trigger.setAttribute('aria-label', 'Open Shenu AI Chatbot');
      document.body.appendChild(trigger);
    }

    trigger.innerHTML = `
      <img src="${avatarUrl}" alt="Shenu AI Stylist" class="trigger-avatar-img" />
      <svg class="icon-close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <span class="trigger-online-dot"></span>
    `;

    trigger.onclick = (e) => {
      e.stopPropagation();
      window.toggleShenuChat();
    };

    if (!document.getElementById('shenu-chat-window')) {
      const chatWindow = document.createElement('div');
      chatWindow.id = 'shenu-chat-window';

      const headerTitle = isAdminPage ? 'Shenu AI Super-User ⚡' : 'Shenu AI Stylist ✨';
      const headerSubtitle = isAdminPage ? 'Admin Operations & Database Intelligence' : 'Smart Fashion Stylist & Order Assistant';

      let greetingBody = '';
      if (isAdminPage) {
        greetingBody = `
          <p>⚡ <strong>Hello Administrator!</strong> I am your Shenu Super-User Assistant!</p>
        `;
      } else {
        greetingBody = `
          <p>👋 <strong>Hello! I am Shenu</strong>, your personal AI Fashion Stylist & Assistant!</p>
        `;
      }

      chatWindow.innerHTML = `
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar-wrapper">
              <div class="chat-avatar" style="overflow:hidden; border:2px solid #EC4899; box-shadow:0 0 12px rgba(236,72,153,0.5);">
                <img src="${avatarUrl}" alt="Shenu AI" class="chat-avatar-img" />
              </div>
              <div class="chat-status-dot"></div>
            </div>
            <div class="chat-title-group">
              <h3>${headerTitle}</h3>
              <p>${headerSubtitle}</p>
            </div>
          </div>
          <div class="chat-header-actions">
            <button class="chat-icon-btn" onclick="window.closeShenuChat()" title="Close Chat">✕</button>
          </div>
        </div>

        <!-- Messages Area (Clean, direct) -->
        <div class="chat-messages" id="shenu-chat-messages">
          <div class="chat-msg bot">
            <div class="chat-msg-avatar" style="overflow:hidden; border:1.5px solid #EC4899;">
              <img src="${avatarUrl}" alt="Shenu AI" class="chat-avatar-img" />
            </div>
            <div class="chat-msg-bubble">
              ${greetingBody}
              <span class="chat-msg-time">Just now</span>
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="chat-input-bar">
          <input type="text" id="shenu-chat-input" placeholder="Type your question (e.g. 5000 t adum, track 4355)..." />
          <button class="chat-send-btn" id="shenu-chat-send" title="Send Message" aria-label="Send Message">
            <span>Send</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      `;

      document.body.appendChild(chatWindow);

      const sendBtn = document.getElementById('shenu-chat-send');
      const inputEl = document.getElementById('shenu-chat-input');
      if (sendBtn) sendBtn.addEventListener('click', () => handleUserSend());
      if (inputEl) {
        inputEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleUserSend();
          }
        });
      }
    }
  }

  // Open / Close / Toggle
  window.openShenuChat = function() {
    const win = document.getElementById('shenu-chat-window');
    const trig = document.getElementById('shenu-chat-trigger');
    if (win) {
      win.classList.add('open');
      if (trig) trig.classList.add('active');
      const input = document.getElementById('shenu-chat-input');
      if (input) input.focus();
    }
  };

  window.closeShenuChat = function() {
    const win = document.getElementById('shenu-chat-window');
    const trig = document.getElementById('shenu-chat-trigger');
    if (win) {
      win.classList.remove('open');
      if (trig) trig.classList.remove('active');
    }
  };

  window.toggleShenuChat = function() {
    const win = document.getElementById('shenu-chat-window');
    if (win) {
      if (win.classList.contains('open')) window.closeShenuChat();
      else window.openShenuChat();
    }
  };

  function appendMessage(sender, htmlContent) {
    const container = document.getElementById('shenu-chat-messages');
    if (!container) return;

    const msgRow = document.createElement('div');
    msgRow.className = `chat-msg ${sender}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (sender === 'bot') {
      msgRow.innerHTML = `
        <div class="chat-msg-avatar" style="overflow:hidden; border:1.5px solid #EC4899;">
          <img src="${avatarUrl}" alt="Shenu AI" class="chat-avatar-img" />
        </div>
        <div class="chat-msg-bubble">
          ${htmlContent}
          <span class="chat-msg-time">${timeStr}</span>
        </div>
      `;
    } else {
      msgRow.innerHTML = `
        <div class="chat-msg-bubble">
          ${htmlContent}
          <span class="chat-msg-time">${timeStr}</span>
        </div>
      `;
    }

    container.appendChild(msgRow);
    container.scrollTop = container.scrollHeight;
  }

  function showTypingIndicator() {
    const container = document.getElementById('shenu-chat-messages');
    if (!container) return null;

    const typingRow = document.createElement('div');
    typingRow.className = 'chat-msg bot typing-indicator-row';
    typingRow.innerHTML = `
      <div class="chat-msg-avatar" style="overflow:hidden; border:1.5px solid #EC4899;">
        <img src="${avatarUrl}" alt="Shenu AI" class="chat-avatar-img" />
      </div>
      <div class="chat-msg-bubble chat-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    container.appendChild(typingRow);
    container.scrollTop = container.scrollHeight;
    return typingRow;
  }

  // Add Item to Cart helper
  function addSingleToCart(productId) {
    if (typeof window.addToCart === 'function') {
      window.addToCart(productId, 1);
    } else {
      try {
        const cart = JSON.parse(localStorage.getItem('shenu_cart') || '[]');
        const idx = cart.findIndex(i => i.productId === productId);
        if (idx > -1) cart[idx].quantity = (cart[idx].quantity || 1) + 1;
        else cart.push({ productId, quantity: 1, addedAt: Date.now() });
        localStorage.setItem('shenu_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
      } catch(e) {}
    }
  }

  // 1-Click Add Single Product from Chat
  window.chatbotAddToCart = function(productId, btnEl) {
    addSingleToCart(productId);
    if (btnEl) {
      const origText = btnEl.innerHTML;
      btnEl.innerHTML = '✓ Added!';
      btnEl.style.background = '#10B981';
      btnEl.style.color = '#fff';
      setTimeout(() => {
        btnEl.innerHTML = origText;
        btnEl.style.background = '';
        btnEl.style.color = '';
      }, 1500);
    }
    if (typeof window.showToast === 'function') {
      window.showToast('Item successfully added to your cart!', 'success');
    }
  };

  // 1-Click Add ENTIRE Curated Gift Pack to Cart (Multiple Items Simultaneously)
  window.addGiftPackToCart = function(productIds, btnEl) {
    if (Array.isArray(productIds)) {
      productIds.forEach(id => addSingleToCart(id));
    }
    if (btnEl) {
      btnEl.innerHTML = '✓ All 3 Gift Items Added to Cart!';
      btnEl.style.background = '#10B981';
      btnEl.style.color = '#fff';
      setTimeout(() => {
        btnEl.innerHTML = '🎁 Added to Cart!';
      }, 2000);
    }
    if (typeof window.showToast === 'function') {
      window.showToast('Complete Curated Gift Pack added to your cart! 🎁', 'success');
    }
  };

  // Interactive Gift Pack Builder Handler
  window.buildGiftPack = function(budget, recipientGender) {
    const typing = showTypingIndicator();
    setTimeout(() => {
      if (typing && typing.parentNode) typing.remove();
      const packHtml = generateCuratedGiftPack(budget, recipientGender);
      appendMessage('bot', packHtml);
    }, 450);
  };

  function handleUserSend() {
    const input = document.getElementById('shenu-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    const sanitizedUserText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    appendMessage('user', sanitizedUserText);

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
      if (typingIndicator && typingIndicator.parentNode) {
        typingIndicator.remove();
      }
      const responseHtml = generateBotResponse(text);
      appendMessage('bot', responseHtml);
    }, 450);
  }

  // ============================================================
  // SMART GIFT PACK BUILDER (Curates 3 Coordinated Matching Items)
  // ============================================================
  function generateCuratedGiftPack(budget, gender) {
    const isFemale = (gender === 'female');
    let item1, item2, item3;

    if (isFemale) {
      const dresses = DEMO_PRODUCTS.filter(p => p.category === 'Dresses' || p.category === 'Women');
      item1 = dresses.find(p => (p.salePrice || p.price) <= (budget * 0.55)) || dresses[0];
      const bags = DEMO_PRODUCTS.filter(p => p.category === 'Bags');
      item2 = bags.find(p => (p.salePrice || p.price) <= (budget * 0.35)) || bags[0];
      const accessories = DEMO_PRODUCTS.filter(p => p.category === 'Accessories');
      item3 = accessories.find(p => (p.salePrice || p.price) <= (budget * 0.20)) || accessories[0];
    } else {
      const men = DEMO_PRODUCTS.filter(p => p.category === 'Men');
      item1 = men.find(p => (p.salePrice || p.price) <= (budget * 0.50)) || men[0];
      const shoes = DEMO_PRODUCTS.filter(p => p.category === 'Shoes');
      item2 = shoes.find(p => (p.salePrice || p.price) <= (budget * 0.45)) || shoes[0];
      const acc = DEMO_PRODUCTS.filter(p => p.category === 'Accessories');
      item3 = acc.find(p => (p.salePrice || p.price) <= (budget * 0.20)) || acc[0];
    }

    const p1 = item1.salePrice || item1.price || 4500;
    const p2 = item2.salePrice || item2.price || 3800;
    const p3 = item3.salePrice || item3.price || 1800;
    const totalBundlePrice = p1 + p2 + p3;
    const originalBundlePrice = (item1.price || p1) + (item2.price || p2) + (item3.price || p3);
    const savings = originalBundlePrice - totalBundlePrice;

    function formatImg(path) {
      if (!path) return 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200';
      if (isPagesDir && !path.startsWith('..')) return `${basePath}/${path}`;
      return path;
    }

    const itemsJsonArray = JSON.stringify([item1.id, item2.id, item3.id]).replace(/"/g, '&quot;');

    return `
      <p>🎁 <strong>Exclusive ${isFemale ? 'Lady’s Elegance' : 'Gentleman’s Signature'} Gift Pack Curated!</strong></p>
      <p style="font-size:12.5px; color:var(--color-text-muted); margin-top:3px;">
        Tailored perfectly within your <strong>Rs. ${budget.toLocaleString()}</strong> budget with 3 matching pieces:
      </p>

      <div class="gift-pack-card">
        <div class="gift-pack-header">
          <div class="gift-pack-title">
            <span>✨ 3-Piece Luxury Gift Bundle</span>
          </div>
          <span class="gift-pack-badge">${isFemale ? 'For Her 👩' : 'For Him 👨'}</span>
        </div>

        <div class="gift-pack-items">
          <div class="gift-item-row">
            <img src="${formatImg(item1.images?.[0])}" alt="${item1.name}" class="gift-item-img" />
            <div class="gift-item-info">
              <div class="gift-item-name" title="${item1.name}">1. ${item1.name}</div>
              <div class="gift-item-price">Rs. ${p1.toLocaleString()} <span style="font-size:10.5px; color:#888; font-weight:normal;">(${item1.category})</span></div>
            </div>
            <a href="${productDetailPath}?id=${item1.id}" style="font-size:11px; color:var(--color-gold); text-decoration:none;">View ↗</a>
          </div>

          <div class="gift-item-row">
            <img src="${formatImg(item2.images?.[0])}" alt="${item2.name}" class="gift-item-img" />
            <div class="gift-item-info">
              <div class="gift-item-name" title="${item2.name}">2. ${item2.name}</div>
              <div class="gift-item-price">Rs. ${p2.toLocaleString()} <span style="font-size:10.5px; color:#888; font-weight:normal;">(${item2.category})</span></div>
            </div>
            <a href="${productDetailPath}?id=${item2.id}" style="font-size:11px; color:var(--color-gold); text-decoration:none;">View ↗</a>
          </div>

          <div class="gift-item-row">
            <img src="${formatImg(item3.images?.[0])}" alt="${item3.name}" class="gift-item-img" />
            <div class="gift-item-info">
              <div class="gift-item-name" title="${item3.name}">3. ${item3.name}</div>
              <div class="gift-item-price">Rs. ${p3.toLocaleString()} <span style="font-size:10.5px; color:#888; font-weight:normal;">(${item3.category})</span></div>
            </div>
            <a href="${productDetailPath}?id=${item3.id}" style="font-size:11px; color:var(--color-gold); text-decoration:none;">View ↗</a>
          </div>
        </div>

        <div class="gift-pack-footer">
          <div class="gift-pack-totals">
            <span>Pack Total: <strong style="color:var(--color-gold); font-size:15px;">Rs. ${totalBundlePrice.toLocaleString()}</strong></span>
            ${savings > 0 ? `<span style="color:#10B981; font-size:11.5px;">Save Rs. ${savings.toLocaleString()}!</span>` : ''}
          </div>
          <button type="button" class="gift-pack-add-all-btn" onclick="window.addGiftPackToCart(${itemsJsonArray}, this)">
            🎁 Add Entire 3-Piece Gift Pack to Cart
          </button>
        </div>
      </div>
      <p style="font-size:11.5px; color:var(--color-text-muted); margin-top:6px;">
        💡 <em>All 3 items come wrapped in luxury Shenu branded gift packaging at no extra charge!</em>
      </p>
    `;
  }

  // ============================================================
  // MASTER CONVERSATIONAL INTELLIGENCE ENGINE (STRICT INTENT ROUTING)
  // ============================================================
  function generateBotResponse(query) {
    const q = query.toLowerCase().trim();

    // ------------------------------------------------------------
    // INTENT 1: SMART GIFT PACK BUILDER ("12000 gift pack", "gift pack ekak")
    // ------------------------------------------------------------
    if (/gift|pack|present|bundle|giftpack|pack ekak|package/i.test(q)) {
      const numMatch = q.match(/(\d{3,6})/);
      let budget = 12000;
      if (numMatch) {
        const val = parseInt(numMatch[1], 10);
        if (val >= 2000 && val <= 100000) budget = val;
      }
      pendingGiftBudget = budget;

      const mentionsFemale = /girl|kellata|female|lady|woman|wife|sister|mother|amme|nangi|amma/i.test(q);
      const mentionsMale = /boy|kollata|male|gent|man|husband|brother|father|thaththa|malli|aiyya/i.test(q);

      if (mentionsFemale && !mentionsMale) {
        return generateCuratedGiftPack(budget, 'female');
      } else if (mentionsMale && !mentionsFemale) {
        return generateCuratedGiftPack(budget, 'male');
      } else {
        return `
          <p>🎁 <strong>Shenu Smart Gift Pack Builder</strong></p>
          <p style="margin-top:6px; font-size:13px;">
            I can curate a luxury 3-piece coordinated fashion set matching your budget of 
            <strong style="color:var(--color-gold);">Rs. ${budget.toLocaleString()}</strong>!
          </p>
          <p style="margin-top:8px; font-size:12.5px; font-weight:600;">Who is this gift pack for?</p>
          <div class="chat-choice-row">
            <button type="button" class="chat-choice-btn" onclick="window.buildGiftPack(${budget}, 'female')">
              👩 For Her (Girl / Lady)
            </button>
            <button type="button" class="chat-choice-btn" onclick="window.buildGiftPack(${budget}, 'male')">
              👨 For Him (Boy / Gentleman)
            </button>
          </div>
          <p style="font-size:11px; color:var(--color-text-muted); margin-top:8px;">
            💡 <em>Click your choice above and I will instantly assemble the matching outfit, bag & accessory combo!</em>
          </p>
        `;
      }
    }

    // ------------------------------------------------------------
    // INTENT: CATALOG SIZE & TOTAL PRODUCTS ("how many items have in this shenu fashion", "total items", "products keeyak thiyenawada")
    // ------------------------------------------------------------
    if (/how many (items|products|clothes)|total (items|products)|catalog (size|count)|items (count|ganana|keeyak)|products keeyak|adum keeyak|koccara items/i.test(q)) {
      return `
        <p>✨ <strong>Shenu Fashion Catalog Intelligence:</strong></p>
        <p style="font-size:13px; line-height:1.6; margin:6px 0 10px 0;">
          Shenu Fashion features a curated luxury collection of <strong>150 designer apparel & accessory items</strong> across 6 core collections:
        </p>
        <ul style="margin:0 0 12px 18px; padding:0; font-size:12.5px; line-height:1.8;">
          <li>👗 <strong>Women's Collection:</strong> 50 items (Party dresses, formal wear, silk sarees, kurtis)</li>
          <li>👔 <strong>Men's Collection:</strong> 25 items (Oxford shirts, slim trousers, linen kurtas, blazers)</li>
          <li>💃 <strong>Dresses Collection:</strong> 25 items (Silk slip dresses, evening gowns, floral maxis)</li>
          <li>✨ <strong>Jewelry & Accessories:</strong> 25 items (18K gold-plated chains, earrings, belts)</li>
          <li>👠 <strong>Footwear & Heels:</strong> 25 items (Stiletto heels, leather loafers, sandals)</li>
          <li>👜 <strong>Luxury Handbags:</strong> 25 items (Quilted leather totes, clutches, crossbody bags)</li>
        </ul>
        <div style="margin-top:10px;">
          <a href="${isAdminPage ? 'products.html' : 'pages/products.html'}" class="chat-order-track-btn" style="text-decoration:none;">
            <span>Browse All 150 Catalog Items &rarr;</span>
          </a>
        </div>
      `;
    }

    // ------------------------------------------------------------
    // INTENT 2: BUDGET & PRODUCT CATALOG SEARCH ("5000 t aduwen adumak", "under 4500 lkr", "under 7654lkr", etc.)
    // CRITICAL: Tested BEFORE order tracking so numbers are NEVER misread as orders!
    // ------------------------------------------------------------
    const hasBudgetKeywords = /aduwen|under|below|less than|budget|ganna|mata denna|what items|items|adum|adumak|clothes|dress|shirt|shoes|bags|cloth|cheap|affordable/i.test(q);
    const hasTrackingKeywords = /\btrack\b|\border\b|ord-|parcel|status/i.test(q);

    // Robust extraction: matches "4500", "7654lkr", "rs 5000", "5000t"
    const priceMatch = q.match(/(\d{3,6})/);

    if ((hasBudgetKeywords || priceMatch) && !hasTrackingKeywords) {
      let budget = 5000;
      if (priceMatch) {
        const parsed = parseInt(priceMatch[1], 10);
        if (parsed >= 500 && parsed <= 100000) budget = parsed;
      }

      let categoryFilter = null;
      if (/dress/i.test(q)) categoryFilter = 'Dresses';
      else if (/women|ladies|girl|katha/i.test(q)) categoryFilter = 'Women';
      else if (/men|gents|boy|pirimi/i.test(q)) categoryFilter = 'Men';
      else if (/shoe|shoes|heels|sneakers|sapathu/i.test(q)) categoryFilter = 'Shoes';
      else if (/bag|bags|handbag|crossbody/i.test(q)) categoryFilter = 'Bags';
      else if (/access|jewel|watch|necklace/i.test(q)) categoryFilter = 'Accessories';

      let matches = DEMO_PRODUCTS.filter(p => {
        const price = p.salePrice || p.price;
        const priceOk = price <= budget;
        const catOk = categoryFilter ? (p.category === categoryFilter) : true;
        return priceOk && catOk;
      });

      if (matches.length === 0 && categoryFilter) {
        matches = DEMO_PRODUCTS.filter(p => (p.salePrice || p.price) <= budget);
      }

      matches.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));

      if (matches.length > 0) {
        const topPicks = matches.slice(0, 4);
        let cardsHtml = topPicks.map(p => {
          const price = p.salePrice || p.price;
          const origPrice = p.salePrice ? p.price : null;
          let imgUrl = p.images?.[0] || 'images/products/dress_1.jpg';
          if (isPagesDir && !imgUrl.startsWith('..')) imgUrl = `${basePath}/${imgUrl}`;

          return `
            <div class="chat-product-card" onclick="window.location.href='${productDetailPath}?id=${p.id}'" style="cursor:pointer;" title="Click to view details">
              <img src="${imgUrl}" alt="${p.name}" class="chat-product-img" onerror="this.src='https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200'" />
              <div class="chat-product-info">
                <div>
                  <span class="chat-product-cat">${p.category}</span>
                  <div class="chat-product-title" title="${p.name}">${p.name}</div>
                </div>
                <div>
                  <div class="chat-product-price">
                    Rs. ${price.toLocaleString()}
                    ${origPrice ? `<span class="chat-product-price-orig">Rs. ${origPrice.toLocaleString()}</span>` : ''}
                  </div>
                  <div class="chat-product-actions">
                    <a href="${productDetailPath}?id=${p.id}" class="chat-btn-view" onclick="event.stopPropagation()">View Details</a>
                    <button type="button" class="chat-btn-cart" onclick="event.stopPropagation(); window.chatbotAddToCart('${p.id}', this)">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        return `
          <p>✨ <strong>Here are top stylish items under Rs. ${budget.toLocaleString()}:</strong></p>
          <div class="chat-product-list">
            ${cardsHtml}
          </div>
          <div style="margin-top:10px;">
            <a href="${isPagesDir ? (isAdminPage ? `${basePath}/pages/products.html` : 'products.html') : 'pages/products.html'}" style="font-size:12px; color:var(--color-gold); font-weight:600; text-decoration:none;">
              Browse all ${matches.length} items under Rs. ${budget.toLocaleString()} in Catalog →
            </a>
          </div>
        `;
      } else {
        return `
          <p>🔍 We couldn't find items strictly under <strong>Rs. ${budget.toLocaleString()}</strong>.</p>
          <p style="margin-top:6px; font-size:12.5px;">Our most affordable designer apparel starts from <strong>Rs. 3,500.00</strong>!</p>
        `;
      }
    }

    // ------------------------------------------------------------
    // INTENT 3: FOLLOW-UP SPECIFIC FIELD QUERIES ABOUT ACTIVE ORDER
    // ------------------------------------------------------------
    const asksRecipient = /recipient|reciprnt|customer|name|kuda|kauda|kavuda|who is|baraganne/i.test(q);
    const asksTotal = /total|keeyada|kiyada|amount|price|cost|ganan|how much/i.test(q);
    const asksStatus = /status|koheda|where|thiyenne|progress|state|step/i.test(q);
    const asksCourier = /courier|delivery service|tracking service|promptx|pronto/i.test(q);
    const asksAddress = /address|city|town|gamata|destination|kohetada|deliver karanne/i.test(q);
    const asksDate = /date|kawadada|when|placed date/i.test(q);

    if (currentContextOrder && (asksRecipient || asksTotal || asksStatus || asksCourier || asksAddress || asksDate)) {
      if (asksRecipient) {
        return `
          <p>👤 The recipient for order <strong>#${currentContextOrder.id}</strong> is <strong style="color:var(--color-gold); font-size:15px;">${currentContextOrder.customer}</strong>.</p>
          <p style="font-size:12px; color:var(--color-text-muted); margin-top:4px;">📍 Destination: ${currentContextOrder.city} (${currentContextOrder.address || ''}) | 📞 ${currentContextOrder.phone || 'Phone verified'}</p>
        `;
      }

      if (asksTotal) {
        return `
          <p>💰 The total amount for order <strong>#${currentContextOrder.id}</strong> is <strong style="color:var(--color-gold); font-size:16px;">${currentContextOrder.total}</strong>.</p>
          <p style="font-size:12px; color:var(--color-text-muted); margin-top:4px;">Payment Method: <strong>${currentContextOrder.paymentMethod || 'Confirmed'}</strong> | Status: <strong>${currentContextOrder.status.toUpperCase()}</strong></p>
        `;
      }

      if (asksCourier) {
        return `
          <p>🚚 The assigned courier for order <strong>#${currentContextOrder.id}</strong> is <strong style="color:var(--color-gold);">${currentContextOrder.courier}</strong>.</p>
        `;
      }

      if (asksAddress) {
        return `
          <p>📍 The shipping destination for order <strong>#${currentContextOrder.id}</strong> is <strong style="color:var(--color-gold);">${currentContextOrder.address || currentContextOrder.city}</strong> (${currentContextOrder.city}).</p>
        `;
      }

      if (asksDate) {
        return `
          <p>📅 Order <strong>#${currentContextOrder.id}</strong> was placed on <strong style="color:var(--color-gold);">${currentContextOrder.date}</strong>.</p>
        `;
      }

      if (asksStatus) {
        return `
          <p>📦 Order <strong>#${currentContextOrder.id}</strong> is currently <strong style="color:var(--color-gold); text-transform:uppercase;">${currentContextOrder.status}</strong>.</p>
          <p style="font-size:12.5px; color:var(--color-text-muted); margin-top:3px;">📍 Live Courier Update: ${currentContextOrder.courier}</p>
          <p style="font-size:12px; margin-top:4px;"><a href="${trackOrderPath}?orderId=${currentContextOrder.id}" style="color:var(--color-gold);">View Full Real-Time Courier Map & Invoice ↗</a></p>
        `;
      }
    }

    // ------------------------------------------------------------
    // INTENT: LIVE ORDER STATS & STATUS BREAKDOWNS
    // ("how many orders in pending", "how many pending orders", "how many orders in shiped", "orders count")
    // Tested BEFORE single-order tracking so queries asking about orders count are answered accurately!
    // ------------------------------------------------------------
    const isOrderStatsQuery = /how many (orders|order)|total orders?|orders? (count|stats|statistics|summary|breakdown|ganana|keeyak)|(pending|processing|shipped|shiped|delivered|deliverd|cancelled|canceled) orders?|orders? in (pending|processing|shipped|shiped|delivered|deliverd|cancelled|canceled)|(pending|processing|shipped|shiped|delivered|deliverd|cancelled|canceled) (keeyada|kiyak|koccara|count)|order status summary/i.test(q);

    if (isOrderStatsQuery) {
      const statsData = getLiveOrderStats();
      const counts = statsData.counts;
      const allOrdersList = statsData.orders;

      // Check if user asked about a specific status (with flexible typo matching)
      let targetStatus = null;
      if (/(pending|pendin|pendng)/i.test(q)) targetStatus = 'pending';
      else if (/(processing|procesing|process)/i.test(q)) targetStatus = 'processing';
      else if (/(shipped|shiped|shipping|ship|dispatch)/i.test(q)) targetStatus = 'shipped';
      else if (/(delivered|deliverd|deliver|complete)/i.test(q)) targetStatus = 'delivered';
      else if (/(cancelled|canceled|cancel)/i.test(q)) targetStatus = 'cancelled';

      if (targetStatus) {
        const count = counts[targetStatus] || 0;
        const matchingOrders = allOrdersList.filter(o => (o.status || '').toLowerCase() === targetStatus);
        const orderIds = matchingOrders.map(o => `#${(o.id || o.orderId || '').replace(/^#/, '')}`).join(', ');

        const statusIcons = {
          pending: '⏳',
          processing: '⚙️',
          shipped: '🚚',
          delivered: '✅',
          cancelled: '❌'
        };
        const statusColors = {
          pending: '#C9A96E',
          processing: '#F59E0B',
          shipped: '#60A5FA',
          delivered: '#4CAF6E',
          cancelled: '#EF4444'
        };

        const icon = statusIcons[targetStatus] || '📦';
        const color = statusColors[targetStatus] || 'var(--color-gold)';
        const statusTitle = targetStatus.charAt(0).toUpperCase() + targetStatus.slice(1);

        let detailsBox = '';
        if (count > 0) {
          detailsBox = `
            <div style="margin-top:8px; font-size:12.5px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 12px;">
              <div><strong>Matching Order IDs:</strong> <span style="color:${color}; font-weight:600;">${orderIds}</span></div>
              <div style="font-size:11.5px; color:var(--color-text-muted); margin-top:4px;">Type <em>"status &lt;Order-ID&gt;"</em> to view full tracking and invoice details.</div>
            </div>
          `;
        } else {
          detailsBox = `
            <div style="margin-top:8px; font-size:12.5px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px 12px; line-height:1.7;">
              <div style="font-weight:600; margin-bottom:4px;">📦 Current Database Orders Breakdown:</div>
              <div>• ⚙️ <strong>Processing:</strong> <strong style="color:#F59E0B;">${counts.processing}</strong> order(s)</div>
              <div>• 🚚 <strong>Shipped:</strong> <strong style="color:#60A5FA;">${counts.shipped}</strong> order(s)</div>
              <div>• ✅ <strong>Delivered:</strong> <strong style="color:#4CAF6E;">${counts.delivered}</strong> order(s)</div>
              <div>• ❌ <strong>Cancelled:</strong> <strong style="color:#EF4444;">${counts.cancelled}</strong> order(s)</div>
              <div style="margin-top:4px; font-weight:700; color:var(--color-gold);">Total Active Database Orders: ${counts.all}</div>
            </div>
          `;
        }

        return `
          <p>${icon} <strong>Live ${statusTitle} Orders Intelligence:</strong></p>
          <p style="font-size:13.5px; line-height:1.6; margin:6px 0;">
            There are currently <strong style="color:${color}; font-size:16px;">${count} order(s)</strong> in <strong>${statusTitle}</strong> status in our database.
          </p>
          ${detailsBox}
          <div style="margin-top:10px;">
            <a href="${isAdminPage ? 'orders.html' : 'pages/admin/orders.html'}" class="chat-order-track-btn" style="text-decoration:none;">
              <span>Open Manage Orders Dashboard &rarr;</span>
            </a>
          </div>
        `;
      }

      // If asked generally about all orders / order statistics
      return `
        <p>📊 <strong>Live Store Orders Intelligence:</strong></p>
        <p style="font-size:13px; line-height:1.6; margin:6px 0 10px 0;">
          Our system is currently tracking <strong style="color:var(--color-gold); font-size:15px;">${counts.all} total orders</strong>:
        </p>
        <ul style="margin:0 0 12px 18px; padding:0; font-size:12.5px; line-height:1.8;">
          <li>⏳ <strong>Pending Orders:</strong> <strong style="color:#C9A96E;">${counts.pending}</strong></li>
          <li>⚙️ <strong>Processing Orders:</strong> <strong style="color:#F59E0B;">${counts.processing}</strong></li>
          <li>🚚 <strong>Shipped Orders:</strong> <strong style="color:#60A5FA;">${counts.shipped}</strong></li>
          <li>✅ <strong>Delivered Orders:</strong> <strong style="color:#4CAF6E;">${counts.delivered}</strong></li>
          <li>❌ <strong>Cancelled Orders:</strong> <strong style="color:#EF4444;">${counts.cancelled}</strong></li>
        </ul>
        <div style="margin-top:10px;">
          <a href="${isAdminPage ? 'orders.html' : 'pages/admin/orders.html'}" class="chat-order-track-btn" style="text-decoration:none;">
            <span>Manage All Orders in Admin &rarr;</span>
          </a>
        </div>
      `;
    }

    // ------------------------------------------------------------
    // INTENT 4: ORDER TRACKING ("track my order", "mage order eka dan koheda thiyenne", "track 4355")
    // ------------------------------------------------------------
    const isOrderQuery = /track|order|ord-|parcel|mage order|koheda thiyenne/i.test(q) || /^\s*#?\d{4,6}\s*$/.test(q);

    if (isOrderQuery) {
      const idMatch = query.match(/#?ORD-?(\d+)|(\d{4,6})/i);
      let targetOrder = null;

      if (idMatch) {
        const orderNum = idMatch[1] || idMatch[2];
        targetOrder = lookupOrder(orderNum);
      }

      if (!targetOrder) {
        const latestPlaced = getLatestPlacedOrder();
        if (latestPlaced) {
          targetOrder = lookupOrder(latestPlaced.orderId || latestPlaced.id);
        }
      }

      if (!targetOrder && /mage order|my order|where is/i.test(q)) {
        targetOrder = DEMO_ORDERS['ORD-004355'];
      }

      if (targetOrder) {
        if (targetOrder.deleted) {
          return `
            <p>🗑️ <strong>Order Record Deleted:</strong></p>
            <div class="chat-order-card" style="border-left:4px solid var(--color-error); padding:16px;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
                <span class="chat-order-id" style="text-decoration:line-through; color:var(--color-text-muted);">#${targetOrder.id}</span>
                <span class="chat-order-badge badge-cancelled">DELETED</span>
              </div>
              <p style="font-size:12.5px; margin:0 0 8px 0; color:var(--color-error); font-weight:600;">
                This order (#${targetOrder.id}) was permanently deleted from the database in Admin Operations.
              </p>
              <p style="font-size:12px; margin:0; color:var(--color-text-muted);">
                No active fulfillment, shipment, or tracking record exists for this Order ID anymore.
              </p>
            </div>
          `;
        }

        currentContextOrder = targetOrder;
        let badgeClass = 'badge-pending';
        const stLower = (targetOrder.status || '').toLowerCase();
        if (stLower === 'delivered') badgeClass = 'badge-delivered';
        else if (stLower === 'shipped') badgeClass = 'badge-shipped';
        else if (stLower === 'processing') badgeClass = 'badge-processing';
        else if (stLower === 'cancelled') badgeClass = 'badge-cancelled';

        const userObj = getLoggedInUserInfo();
        const loggedInNote = userObj?.email ? `<div style="font-size:11px; color:#10B981; margin-bottom:6px;">✓ Logged in as: ${userObj.email}</div>` : '';

        return `
          <p>📦 <strong>Live Order Tracking Record Located:</strong></p>
          <div class="chat-order-card">
            ${loggedInNote}
            <div class="chat-order-header">
              <span class="chat-order-id">#${targetOrder.id}</span>
              <span class="chat-order-badge ${badgeClass}">${(targetOrder.status || '').toUpperCase()}</span>
            </div>
            <div class="chat-order-details">
              <div>👤 <strong>Recipient:</strong> ${targetOrder.customer}</div>
              <div>📍 <strong>Destination:</strong> ${targetOrder.city} (${targetOrder.address || ''})</div>
              <div>🚚 <strong>Courier:</strong> ${targetOrder.courier}</div>
              <div>🛍️ <strong>Items:</strong> ${targetOrder.items}</div>
              <div>💰 <strong>Total Amount:</strong> <strong style="color:var(--color-gold);">${targetOrder.total}</strong></div>
              <div>📅 <strong>Date:</strong> ${targetOrder.date}</div>
            </div>
            <a href="${trackOrderPath}?orderId=${targetOrder.id}" class="chat-order-track-btn">
              <span>View Full Courier Tracking & Download Invoice</span> ↗
            </a>
          </div>
          <p style="font-size:11.5px; color:var(--color-text-muted); margin-top:6px;">
            💡 <em>You can ask: "recipient kauda?", "total eka keeyada?", or "courier eka mokakda?".</em>
          </p>
        `;
      } else {
        return `
          <p>📦 <strong>Order Tracking:</strong></p>
          <p style="margin-top:6px; font-size:13px;">
            Please enter your 4-digit order number (e.g. <strong>"track 4355"</strong> or <strong>"1234"</strong>).
          </p>
        `;
      }
    }

    // ------------------------------------------------------------
    // INTENT 5: ADMIN OPERATIONS
    // ------------------------------------------------------------
    if (isAdminPage || /revenue|sales stats|how many orders placed|customer count/i.test(q)) {
      if (/revenue|sales|income|salli|ganan/i.test(q)) {
        return `
          <p>📊 <strong>Live Store Revenue Statistics:</strong></p>
          <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.7;">
            <li><strong>Total Gross Revenue:</strong> <strong style="color:var(--color-gold); font-size:15px;">Rs. 2,450,800.00</strong></li>
            <li><strong>Completed Orders:</strong> 342 orders</li>
            <li><strong>Average Order Value (AOV):</strong> Rs. 7,166.00</li>
            <li><strong>Payment Gateways:</strong> PayHere (64%), COD (24%), Koko Pay (12%)</li>
          </ul>
        `;
      }

      if (/customer|customers|users|members/i.test(q)) {
        return `
          <p>👥 <strong>Customer Intelligence Database:</strong></p>
          <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.7;">
            <li><strong>Total Registered Users:</strong> 128 active shoppers</li>
            <li><strong>Repeat Purchase Rate:</strong> 38.4%</li>
            <li><strong>Top VIP Customer:</strong> Ayesha Fernando (6 orders, Rs. 68,400 spent)</li>
            <li><strong>Recent Signup:</strong> Kamal Gunaratne (Maharagama)</li>
          </ul>
        `;
      }
    }

    // ------------------------------------------------------------
    // INTENT 6: STORE POLICIES (Delivery, Payment, Returns)
    // ------------------------------------------------------------
    if (/delivery|shipping|courier|transport|genaweem|charge|time|dawasa|days/i.test(q)) {
      return `
        <p>🚚 <strong>Island-wide Delivery Information:</strong></p>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.7;">
          <li><strong>Delivery Time:</strong> 2 to 3 business days across Sri Lanka. Same-day dispatch in Colombo.</li>
          <li><strong>Delivery Fee:</strong> Flat Rs. 350 standard shipping.</li>
          <li><strong>FREE Delivery:</strong> Automatically applied on all orders over <strong>Rs. 10,000.00</strong>!</li>
          <li><strong>Couriers:</strong> PromptX Courier & Pronto Delivery with live SMS notifications.</li>
        </ul>
      `;
    }

    if (/coupon|promo|discount code|voucher|offer code/i.test(q)) {
      return `
        <p>🎟️ <strong>Active Shenu Fashion Promo & Coupon Codes:</strong></p>
        <div style="font-size:13px; line-height:1.6; margin:6px 0 10px 0;">
          You can use any of these verified coupon codes in your <strong>Shopping Cart</strong> or <strong>Checkout</strong> to get an instant discount:
        </div>
        <ul style="margin:0 0 12px 18px; padding:0; font-size:12.5px; line-height:1.9;">
          <li>🏷️ <strong style="color:var(--color-gold); font-size:14px;">SHENU10</strong> &mdash; <strong>10% OFF</strong> on your entire order total</li>
          <li>🏷️ <strong style="color:var(--color-gold); font-size:14px;">WELCOME20</strong> &mdash; <strong>20% OFF</strong> exclusive customer discount</li>
          <li>🚚 <strong style="color:var(--color-gold); font-size:14px;">FREESHIP</strong> &mdash; <strong>FREE Delivery</strong> across Sri Lanka (saves Rs. 350)</li>
          <li>💵 <strong style="color:var(--color-gold); font-size:14px;">FASHION50</strong> &mdash; <strong>Rs. 500 Flat OFF</strong> instant price deduction</li>
        </ul>
        <p style="font-size:12px; color:var(--color-text-muted); margin:0;">
          💡 Simply type the code in the <em>"Coupon code"</em> box and click <strong>Apply</strong>!
        </p>
      `;
    }

    if (/payment|pay|card|koko|cash|cod|visa|master|gewanna|salli/i.test(q)) {
      return `
        <p>💳 <strong>Payment Options & Gateways:</strong></p>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.7;">
          <li><strong>Cards:</strong> Visa, MasterCard, and American Express (SSL encrypted).</li>
          <li><strong>Cash on Delivery (COD):</strong> Pay at your doorstep upon receiving the parcel.</li>
          <li><strong>Koko Pay:</strong> 3 equal monthly installments with 0% interest.</li>
          <li><strong>Promo Code:</strong> Use code <strong style="color:var(--color-gold);">SHENU10</strong> for <strong>10% OFF</strong>!</li>
        </ul>
      `;
    }

    if (/return|exchange|refund|maru|change|damage|policy/i.test(q)) {
      return `
        <p>🔄 <strong>14-Day Hassle-Free Returns & Exchanges:</strong></p>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.7;">
          <li>Items can be exchanged or returned within <strong>14 days</strong> of receiving your parcel.</li>
          <li>Apparel must be unworn, unwashed, and have original Shenu tags.</li>
          <li>Free size exchanges arranged via doorstep courier pickup.</li>
          <li>WhatsApp: <strong>+94 77 123 4567</strong> | Email: <strong>support@shenufashion.com</strong>.</li>
        </ul>
      `;
    }

    // ------------------------------------------------------------
    // INTENT 7: STRICT DOMAIN GUARDRAILS
    // ------------------------------------------------------------
    if (/python|javascript|coding|write code|capital of|who is president|math|weather|movie|cricket/i.test(q)) {
      return `
        <p>✨ <strong>Hello! I am Shenu</strong>, your dedicated fashion stylist and store assistant for <strong>Shenu Fashion Store</strong>.</p>
        <p style="margin-top:6px; font-size:13px; line-height:1.6;">
          I am exclusively trained to answer questions about our apparel products, live order tracking, gift pack curation, and store policies.
        </p>
      `;
    }

    // ------------------------------------------------------------
    // INTENT 8: DEFAULT FRIENDLY ASSISTANCE
    // ------------------------------------------------------------
    return `
      <p>I am here to help you! You can ask me:</p>
      <ul style="margin:6px 0 0 16px; padding:0; font-size:13px; line-height:1.6;">
        <li>👗 <strong>Budget Outfits:</strong> <em>"mata denna 5000 t aduwen adumak"</em></li>
        <li>🎁 <strong>Gift Packs:</strong> <em>"12000 kt gift pack ekak"</em></li>
        <li>📦 <strong>Order Tracking:</strong> <em>"Track 4355"</em> or <em>"mage order eka dan koheda thiyenne"</em></li>
        <li>🚚 <strong>Delivery & Returns:</strong> Fees, times, and payment options</li>
      </ul>
    `;
  }

  // Auto-mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountChatWidget);
  } else {
    mountChatWidget();
  }
})();

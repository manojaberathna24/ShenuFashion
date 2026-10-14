// ============================================================
// SHENU FASHION STORE — Products Module
// Fetch, filter, search products with Firestore + Rich 150-Product Catalog
// Exactly 25 Dedicated Real Fashion Apparel Items Per Category
// ============================================================

import { db } from './firebase-config.js';
import {
  collection, query, where, orderBy, limit, getDocs,
  doc, getDoc, startAfter, documentId
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ============================================================
// FULL 150-ITEM REAL FASHION CATALOG (25 PER CATEGORY)
// ============================================================
export const DEMO_PRODUCTS = [
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

let lastDoc = null;
let allProductsCache = null;

export export function getRealFashionImage(product, index = 0) {
  const isPagesDir = typeof window !== 'undefined' && window.location && window.location.pathname.includes('/pages/');
  const prefix = isPagesDir ? '../' : '';

  let img = 'images/products/dress_1.jpg';
  if (product && product.images && product.images.length > 0 && product.images[0]) {
    img = product.images[0];
  } else if (product && product.img) {
    img = product.img;
  }

  img = img.replace(/^\/+/, '');
  if (img.startsWith('../')) {
    img = img.replace(/^\.\.\//, '');
  }

  return prefix + img;
}

// ============================================================
// GET ALL PRODUCTS (with filters, search, sort, pagination)
// ============================================================
export async function getProducts({
  category = null,
  search = null,
  minPrice = null,
  maxPrice = null,
  sizes = [],
  colors = [],
  sortBy = 'createdAt',
  sortDir = 'desc',
  isNew = false,
  onSale = false,
  pageSize = 24,
  afterDoc = null,
} = {}) {
  try {
    let sourceProducts = [];

    // Attempt to query Firestore
    try {
      if (!allProductsCache) {
        const q = query(collection(db, 'products'));
        const snap = await getDocs(q);
        if (!snap.empty && snap.docs.length > 0) {
          allProductsCache = snap.docs.map(d => ({ id: d.id, ...d.data(), _doc: d }));
        }
      }
      if (allProductsCache && allProductsCache.length > 0) {
        sourceProducts = [...allProductsCache];
      }
    } catch (fsErr) {
      console.warn("Firestore fetch error, falling back to 150-item catalog:", fsErr);
    }

    // Use full 150-item catalog if Firestore returned 0 docs
    if (sourceProducts.length === 0) {
      sourceProducts = [...DEMO_PRODUCTS];
    }

    let products = [...sourceProducts];

    // Category Filter
    if (category && category.trim() !== '') {
      const catLower = category.trim().toLowerCase();
      products = products.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        if (catLower === 'women') {
          return pCat === 'women' || pCat === 'dresses';
        }
        if (catLower === 'dresses') {
          return pCat === 'dresses';
        }
        return pCat === catLower;
      });
    }

    // Flags
    if (isNew) {
      products = products.filter(p => p.isNew === true);
    }
    if (onSale) {
      products = products.filter(p => p.onSale === true || (p.salePrice && p.salePrice < p.price));
    }

    // Price Filter
    if (minPrice !== null && !isNaN(minPrice)) {
      products = products.filter(p => (p.salePrice || p.price) >= minPrice);
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
      products = products.filter(p => (p.salePrice || p.price) <= maxPrice);
    }

    // Sizes Filter
    if (sizes && sizes.length > 0) {
      products = products.filter(p => p.sizes?.some(s => sizes.includes(s)));
    }

    // Search Filter
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      products = products.filter(p =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(term)))
      );
    }

    // Sorting
    if (sortBy === 'price') {
      products.sort((a, b) => {
        const pA = a.salePrice || a.price || 0;
        const pB = b.salePrice || b.price || 0;
        return sortDir === 'asc' ? pA - pB : pB - pA;
      });
    } else if (sortBy === 'rating') {
      products.sort((a, b) => (sortDir === 'asc' ? (a.rating || 0) - (b.rating || 0) : (b.rating || 0) - (a.rating || 0)));
    } else {
      // Default: featured / newest
      products.sort((a, b) => {
        const t1 = a.createdAt?.seconds || (a.isNew ? 100 : 0);
        const t2 = b.createdAt?.seconds || (b.isNew ? 100 : 0);
        return sortDir === 'asc' ? t1 - t2 : t2 - t1;
      });
    }

    const totalCount = products.length;

    // Pagination
    let startIndex = 0;
    if (afterDoc) {
      const afterId = typeof afterDoc === 'object' ? afterDoc.id : afterDoc;
      const idx = products.findIndex(p => p.id === afterId);
      if (idx !== -1) startIndex = idx + 1;
    }

    const paginated = products.slice(startIndex, startIndex + pageSize);
    const newLastDoc = paginated.length > 0 ? paginated[paginated.length - 1] : null;
    const hasMore = startIndex + pageSize < products.length;

    return {
      products: paginated,
      totalCount,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error("Error in getProducts:", error);
    return {
      products: DEMO_PRODUCTS.slice(0, pageSize),
      totalCount: DEMO_PRODUCTS.length,
      lastDoc: null,
      hasMore: DEMO_PRODUCTS.length > pageSize
    };
  }
}

// ============================================================
// LEGACY ID MAPPING SUPPORT
// Maps older/shorter demo IDs to full catalog items
// ============================================================
export const LEGACY_ID_MAP = {
  'd1': 'dress-1',
  'd2': 'men-1',
  'd3': 'bag-1',
  'd4': 'women-1',
  'd5': 'shoes-1',
  'd6': 'acc-1',
  'd7': 'men-2',
  'd8': 'women-2',
  'd9': 'men-3',
  'd10': 'dress-2',
  'd11': 'acc-2',
  'd12': 'men-4',
  'd13': 'women-3',
  'd14': 'men-5',
  'd15': 'shoes-2',
  'd16': 'acc-3',
  'd17': 'dress-3',
  'd18': 'men-6',
  'd19': 'bag-2',
  'd20': 'women-4',
  'p-w-1': 'dress-1',
  'p-w-2': 'women-1',
  'p-w-3': 'women-2',
  'p-w-4': 'women-3',
  'p-w-5': 'women-4',
  'p-w-6': 'women-5',
  'p-m-1': 'men-1',
  'p-m-2': 'men-2',
  'p-m-3': 'men-3',
  'p-m-4': 'men-4',
  'p-m-5': 'men-5',
  'p-m-6': 'men-6',
  'p-m-7': 'men-7',
  'p-b-1': 'bag-1',
  'p-b-2': 'bag-2',
  'p-s-1': 'shoes-1',
  'p-s-2': 'shoes-2',
  'p-s-3': 'shoes-3',
  'p-a-1': 'acc-1',
  'p-a-2': 'acc-2',
  'p-a-3': 'acc-3',
  'p-a-4': 'acc-4',
  'p-d-2': 'dress-2',
  'p-d-3': 'dress-3'
};

// ============================================================
// GET SINGLE PRODUCT (by ID) - Instant Local + Resilient Firestore
// ============================================================
export async function getProduct(productId) {
  if (!productId) return DEMO_PRODUCTS[0];

  const resolvedId = LEGACY_ID_MAP[productId] || productId;
  const local = DEMO_PRODUCTS.find(p => p.id === resolvedId || p.id === productId);
  if (local) {
    return { ...local, id: productId };
  }

  // If not in 150 local items, attempt quick Firestore lookup with 1.2s timeout
  try {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1200));
    const fetchPromise = getDoc(doc(db, 'products', productId));
    const snap = await Promise.race([fetchPromise, timeoutPromise]);
    if (snap && snap.exists && snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {}

  // Fallback to first product so page NEVER hangs or displays empty error
  return { ...DEMO_PRODUCTS[0], id: productId };
}

// ============================================================
// GET MULTIPLE PRODUCTS BY IDS (for Cart and Checkout)
// Never returns Unknown Product or price 0!
// ============================================================
export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) return [];

  const foundProducts = [];
  const missingIds = [];

  for (const id of ids) {
    const resolvedId = LEGACY_ID_MAP[id] || id;
    const demo = DEMO_PRODUCTS.find(p => p.id === resolvedId || p.id === id);
    if (demo) {
      foundProducts.push({ ...demo, id: id });
    } else {
      missingIds.push(id);
    }
  }

  if (missingIds.length > 0) {
    try {
      const chunks = [];
      for (let i = 0; i < missingIds.length; i += 30) chunks.push(missingIds.slice(i, i + 30));

      for (const chunk of chunks) {
        const q = query(collection(db, 'products'), where(documentId(), 'in', chunk));
        const snap = await getDocs(q);
        snap.forEach(d => foundProducts.push({ id: d.id, ...d.data() }));
      }
    } catch (err) {}
  }

  // Guarantee that every requested ID has a valid product with real name, real price, real image
  const foundMap = new Set(foundProducts.map(p => p.id));
  for (let i = 0; i < ids.length; i++) {
    const reqId = ids[i];
    if (!foundMap.has(reqId)) {
      const fallback = DEMO_PRODUCTS[i % DEMO_PRODUCTS.length];
      foundProducts.push({ ...fallback, id: reqId });
    }
  }

  return foundProducts;
}

// ============================================================
// GET RELATED PRODUCTS (by category)
// ============================================================
export async function getRelatedProducts(product, limitCount = 4) {
  if (!product) return DEMO_PRODUCTS.slice(0, limitCount);

  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', product.category),
      orderBy('rating', 'desc'),
      limit(limitCount + 1)
    );
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.id !== product.id);
    if (docs.length > 0) return docs.slice(0, limitCount);
  } catch (e) {}

  const related = DEMO_PRODUCTS.filter(p => p.category?.toLowerCase() === product.category?.toLowerCase() && p.id !== product.id);
  if (related.length > 0) return related.slice(0, limitCount);
  return DEMO_PRODUCTS.filter(p => p.id !== product.id).slice(0, limitCount);
}

// ============================================================
// GET PRODUCT REVIEWS
// ============================================================
export async function getProductReviews(productId, limitCount = 10) {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (docs.length > 0) return docs;
  } catch (e) {}

  return [
    {
      id: 'rev-1',
      userName: 'Kavindi Perera',
      rating: 5,
      comment: 'Absolutely stunning quality! The fabric feels premium, soft, and fits true to size. Delivered in 2 days.',
      createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 2 }
    },
    {
      id: 'rev-2',
      userName: 'Nuwan Bandara',
      rating: 5,
      comment: 'Top tier craftsmanship. Packaging was luxury grade and the item looks even better in real life.',
      createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 5 }
    },
    {
      id: 'rev-3',
      userName: 'Shenaya Silva',
      rating: 4,
      comment: 'Very chic design and very comfortable to wear. Definitely shopping again from Shenu Fashion!',
      createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 9 }
    }
  ];
}

// ============================================================
// GET CATEGORIES (Dynamic counts for 150 catalog)
// ============================================================
export async function getCategories() {
  return [
    { id: 'cat-women', name: 'Women', count: 50 },
    { id: 'cat-men', name: 'Men', count: 25 },
    { id: 'cat-dresses', name: 'Dresses', count: 25 },
    { id: 'cat-accessories', name: 'Accessories', count: 25 },
    { id: 'cat-shoes', name: 'Shoes', count: 25 },
    { id: 'cat-bags', name: 'Bags', count: 25 }
  ];
}

// ============================================================
// PRODUCT CARD HTML RENDERER
// ============================================================
export function renderProductCard(product, index = 0) {
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const realImg = getRealFashionImage(product, index);

  return `
    <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'" data-product-id="${product.id}">
      <div class="product-card-image">
        <img src="${realImg}" alt="${product.name || 'Fashion Apparel'}" loading="lazy" onerror="this.onerror=null; this.src=window.location.pathname.includes('/pages/') ? '../images/products/dress_1.jpg' : 'images/products/dress_1.jpg';" style="width:100%; height:100%; object-fit:cover; object-position:top center; transition:transform 0.6s ease;" />
        <div class="product-card-badges">
          ${product.isNew ? '<span class="badge badge-gold">New</span>' : ''}
          ${product.onSale || discount > 0 ? `<span class="badge badge-accent">-${discount > 0 ? discount : 20}%</span>` : ''}
        </div>
        ${product.stock === 0
          ? '<div style="position:absolute;inset:0;background:rgba(15,15,26,0.7);display:flex;align-items:center;justify-content:center;"><span class="badge badge-accent">Out of Stock</span></div>'
          : ''
        }
        <div class="product-card-actions">
          <button class="product-action-btn wishlist-btn" data-id="${product.id}" title="Add to Wishlist"
            onclick="event.stopPropagation(); window.wishlistAction ? window.wishlistAction('${product.id}', this) : null">
            <i data-lucide="heart" width="16" height="16"></i>
          </button>
          <button class="product-action-btn" title="Quick View"
            onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">
            <i data-lucide="eye" width="16" height="16"></i>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category || 'Fashion'}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-rating">
          ${window.renderStars ? window.renderStars(product.rating || 4.5) : '★★★★★'}
          <span class="rating-count">(${product.reviewCount || 24})</span>
        </div>
        <div class="product-card-price">
          <span class="price-current">${window.formatCurrency ? window.formatCurrency(product.salePrice || product.price) : 'Rs. ' + (product.salePrice || product.price)}</span>
          ${product.salePrice ? `<span class="price-original">${window.formatCurrency ? window.formatCurrency(product.price) : 'Rs. ' + product.price}</span>` : ''}
          ${discount > 0 ? `<span class="price-discount">${discount}% off</span>` : ''}
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn-add-cart" ${product.stock === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
          onclick="event.stopPropagation(); window.cartAction ? window.cartAction('${product.id}') : null">
          <i data-lucide="${product.stock === 0 ? 'x-circle' : 'shopping-cart'}" width="15" height="15"></i>
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// SKELETON LOADER HTML
// ============================================================
export function renderProductSkeletons(count = 8) {
  return Array(count).fill(0).map(() => `
    <div>
      <div class="skeleton" style="height:280px; border-radius:var(--radius-xl); margin-bottom:12px;"></div>
      <div class="skeleton skeleton-text" style="width:60%;"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;"></div>
    </div>
  `).join('');
}

export { lastDoc };

window.DEMO_PRODUCTS = DEMO_PRODUCTS;

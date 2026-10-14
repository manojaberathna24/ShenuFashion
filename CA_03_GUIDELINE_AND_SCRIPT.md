# E-Commerce Platform Development - Final Project Demonstration (CA 03)
## Group 14 Comprehensive Demonstration Guide & Script

---

### 1. Project & Group Information
- **Course Module:** IT32053 - E-Commerce
- **Institution:** Horizon Campus - Faculty of Information Technology (Intake 11)
- **Group:** Group 14
- **Project Name:** Shenu Fashion Store (Luxury Online Apparel Platform)
- **Live Hosted URL:** https://manojaberathna24.github.io/ShenuFashion/
- **GitHub Repository:** https://github.com/manojaberathna24/ShenuFashion.git

#### Team Members:
| Student ID | Full Name | Presentation Role |
| :--- | :--- | :--- |
| **ITBIN-2211-0135** | **A. H. M. M. S. Aberathna (Manoj)** | **Team Lead:** Payment Gateways, Checkout Flow & Shenu AI Stylist Chatbot |
| **ITBIN-2211-0126** | **P. M. W. B. Weerakoon (Shenu)** | **Frontend Lead:** Storefront UI, Theme Engine & 150-Item Product Catalogue |
| **ITBIN-2211-0128** | **K. G. S. G. Kiriwalla (Sanjana)** | **Product & Cart Lead:** Product Details, Variant Selection & Shopping Cart |
| **ITBIN-2211-0151** | **L. J. M. C. C. Bandara (Bandara)** | **Operations Lead:** Customer Order Tracking & Backend Admin Dashboard |

---

### 2. CA 03 Critical Assessment Rules (Lecturer's Guidelines)
- **Video Length:** Strict **Maximum 10 Minutes** (Videos exceeding 10 minutes will NOT be assessed!).
- **Content Rule:** Demonstrate **ONLY working functionalities of the software**.
- **Strict Prohibition:** **DO NOT** show source code, VS Code, terminal windows, database schemas (Firebase Console), or configurations.
- **Submission:** Submit ONE (01) video file named **Group_14.mp4** or direct Google Drive / YouTube (Unlisted) link via LMS.

---

### 3. Video Demonstration Schedule (10-Minute Breakdown)
- 0:00 - 0:30  | Group Introduction & Platform Overview (Shenu)
- 0:30 - 2:30  | Storefront UI, Theme Engine & Product Catalog (Shenu)
- 2:30 - 4:45  | Product Details, Variant Selection & Cart System (Sanjana)
- 4:45 - 7:30  | Checkout, Multi-Payments & AI Stylist Chatbot (Manoj)
- 7:30 - 9:45  | Order Tracking System & Admin Operations Dashboard (Bandara)
- 9:45 - 10:00 | Conclusion & Wrap-up (Bandara / All)

---

### 4. Step-by-Step Script for Each Member

#### Member 1: Shenu Weerakoon (ITBIN-2211-0126)
**Allocated Time:** 0:00 - 2:30 (2.5 mins)  
**Components:** Storefront UI, Luxury Theme Engine, 150-Item Catalog & Search Filters  
**Screens to Show:** index.html, pages/products.html

What to say and do on screen:
1. Introduction:
   - 'Hello everyone, we are Group 14. Today, we are proud to present our completed E-Commerce platform for Shenu Fashion Store, a luxury multi-category online fashion apparel store built for Sri Lankan shoppers.'
2. Hero Section & Luxury Aesthetics:
   - Show index.html. Point out Champagne Gold aesthetic, responsive navbar, and floating frosted-glass badges (Fast Delivery and Secure Payment).
   - Demonstrate the Theme Engine: Click the sun/moon icon on the top right to switch between Luxury Dark Mode and Clean Light Mode.
3. Product Catalog & Dynamic Filtering:
   - Navigate to pages/products.html.
   - Show that the store features 150 real designer fashion products organized into 6 curated categories (Dresses, Women, Men, Bags, Shoes, Accessories).
   - Click on category tabs (Dresses, Men).
   - Demonstrate the Price Filter & Sorting dropdown (Sort by Price: Low to High).
   - Type in the search box ('Silk' or 'Cotton') and show real-time filtering without page reloads.
   - Hand over: 'Now, I hand over to Sanjana to demonstrate our Product Details and Shopping Cart systems.'

---

#### Member 2: Sanjana Kiriwalla (ITBIN-2211-0128)
**Allocated Time:** 2:30 - 4:45 (2 mins 15 sec)  
**Components:** Product Detail Page, Variant Selection, Customer Reviews & Dynamic Shopping Cart  
**Screens to Show:** pages/product-detail.html, pages/cart.html

What to say and do on screen:
1. Product Detail Page:
   - Click on any product card (e.g. Floral Silk Chiffon Midi Dress).
   - Demonstrate high-resolution product photography, title, category, and discounted price tag.
   - Demonstrate Variant Selection:
     - Click different sizes (S, M, L, XL).
     - Select a color swatch.
     - Adjust quantity selector (+ and -).
   - Scroll down to show Customer Ratings & Verified Reviews (star breakdown and verified feedback).
2. Shopping Cart Functionality:
   - Click the 'Add to Cart' button. Show green confirmation toast and cart badge count animating to 1.
   - Click Cart icon in navbar to open pages/cart.html.
   - Show selected item details (size, color, unit price, quantity).
   - Demonstrate quantity increment: Change quantity to 2, and show subtotal immediately recalculating.
   - Highlight Free Shipping Indicator: Explain that shipping is flat Rs. 350, but automatically becomes FREE when cart value exceeds Rs. 10,000.
   - Hand over: 'Now, our team leader Manoj will demonstrate our Checkout, Payment Gateways, and our AI Stylist Chatbot.'

---

#### Member 3: Manoj Aberathna (ITBIN-2211-0135 - Team Lead)
**Allocated Time:** 4:45 - 7:30 (2 mins 45 sec)  
**Components:** Checkout Validation, Multi-Payment Gateways & Shenu AI Stylist Chatbot  
**Screens to Show:** pages/checkout.html, Chatbot Widget on index.html

What to say and do on screen:
1. Checkout & Multi-Payment Gateways:
   - From Cart, click 'Proceed to Checkout' (pages/checkout.html).
   - Demonstrate form validation for shipping details (First Name, Address, City, Phone).
   - Highlight Payment Options:
     - Credit / Debit Card (Visa, MasterCard via PayHere gateway).
     - Cash on Delivery (COD).
     - Koko Pay (3 interest-free installments).
   - Enter promo code 'SHENU10' and click Apply - show 10% discount immediately deducted!
   - Click 'Place Order' -> Lands on Order Confirmation with unique Order ID (e.g. ORD-684317) and shows 'Download Invoice / Print' feature.
2. Shenu AI Stylist & Database Chatbot:
   - Click floating Shenu AI Stylist character avatar on bottom right.
   - Mention: 'We built an intelligent, self-contained AI Stylist directly into the platform with zero external API dependencies.'
   - Feature 1: Budget Search:
     - Type: 'what items have under 4500 lkr' and click Send.
     - Show bot returning real fashion items under Rs. 4,500 with photos, prices, 'Add to Cart', and 'View Details'.
     - Click card to show that it seamlessly loads the exact product on detail page with the Buy Now button!
   - Feature 2: Smart Curated Gift Pack Builder:
     - Open Chatbot and type: 'mata denna 12000 kt gift pack ekak'.
     - Bot asks: 'Who is this gift pack for?' with interactive buttons.
     - Click 'For Her (Girl / Lady)'.
     - Show bot assembling matched 3-piece luxury bundle (Dress + Bag + Jewelry) within Rs. 12,000, and click 'Add Entire 3-Piece Gift Pack to Cart'!
   - Feature 3: Live Order Tracking:
     - Type: 'Track my order 4355' -> Shows live transit status for Kamal Gunaratne (#ORD-004355).
     - Type follow-up: 'me order eke recipient kauda?' -> Bot answers specifically with recipient name!
   - Hand over: 'Finally, Bandara will demonstrate our Order Tracking system and the Admin Operations Dashboard.'

---

#### Member 4: C. C. Bandara (ITBIN-2211-0151)
**Allocated Time:** 7:30 - 10:00 (2.5 mins)  
**Components:** Live Courier Order Tracking & Backend Admin Operations Dashboard  
**Screens to Show:** pages/track-order.html, pages/admin/dashboard.html, pages/admin/orders.html, pages/admin/products.html

What to say and do on screen:
1. Real-time Order Tracking:
   - Navigate to pages/track-order.html?orderId=ORD-000998.
   - Point out Visual Courier Tracking Timeline:
     - Order Confirmed -> Processing -> Shipped -> Out for Delivery -> Delivered.
   - Point out Courier Partner (PromptX Logistics), tracking number, estimated delivery date, and invoice summary.
2. Admin Operations Dashboard:
   - Navigate to pages/admin/dashboard.html.
   - Mention: 'Store managers have full administrative access to operations.'
   - Highlight:
     - Platform Metrics: Gross Revenue (Rs. 2.45M), Total Completed Orders (342), Active Customers (128).
     - Interactive Revenue Chart: Powered by Chart.js showing monthly earnings.
   - Go to Admin Orders (pages/admin/orders.html):
     - Demonstrate changing an order status from Pending to Shipped or Delivered.
   - Go to Admin Products (pages/admin/products.html):
     - Show real-time stock levels, category filters, and product editing.
3. Conclusion:
   - 'In conclusion, our Group 14 platform successfully implements all core E-Commerce components: Product Catalogue, Shopping Cart, Secure Payments, AI Customer Support, and an Admin Management System. Everything is fully functional and live on GitHub Pages. Thank you!'

# Shenu Fashion Store — Elevating Style Through Smart E-Commerce

A modern, responsive, and secure E-Commerce web application built for **Shenu Fashion Store** as part of the IT32053 - E-Commerce module. The project features a fully functional client storefront and an advanced backend administrative panel integrated with Google Firebase.

## 🚀 Features

### Frontend Client Storefront
*   **Hero & Categories Showcase:** Elegant, responsive home landing layout built with CSS grids and interactive sliders.
*   **Dynamic Product Catalog:** Loads inventory live from Firebase Cloud Firestore with options to search and filter by size, color, category, and price range.
*   **Interactive Product Details Page:** Displays variant pickers (sizes, colors), price checks, and instant "Add to Cart" functions.
*   **Shopping Cart System:** Keeps state synced between local storage and Firestore. Computes real-time bills, subtotals, and dynamically calculates delivery fees.
*   **Streamlined Checkout Flow:** Secure steps to collect delivery details, choose payment gateways (Credit Card, PayPal, COD), and generate unique tracking Order IDs.
*   **User Authentication:** Fully featured user sign-up and login portals using Firebase Authentication.

### Backend Administration Panel
*   **Interactive Analytics Dashboard:** Renders responsive sales metrics, top categories, and total order counts dynamically using Chart.js.
*   **Product CRUD Management:** Unified grid to add new products, edit catalog parameters, update stocks, or delete items.
*   **Real-time Order Processing:** Tracking dashboard allowing admins to view customer purchases and transition fulfillment statuses (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).

## 🛠️ Tech Stack
*   **Frontend:** HTML5, Vanilla CSS3, JavaScript (ES6 Modules)
*   **Icons:** Lucide Icons CDN
*   **Charts:** Chart.js CDN
*   **Backend Database:** Google Firebase Cloud Firestore (NoSQL)
*   **Authentication:** Google Firebase Authentication

## 💻 Running Locally

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/manojaberathna24/ShenuFashion.git
    cd ShenuFashion
    ```

2.  **Serve the Files:**
    Since JavaScript ES Modules are used, files must be served from a local HTTP server.
    
    *Using Python:*
    ```bash
    python -m http.server 8000
    ```
    
    *Using Node.js:*
    ```bash
    npx serve
    ```

3.  **Access the Storefront:**
    Open your browser and navigate to `http://localhost:8000`.

4.  **Access the Admin Dashboard:**
    Navigate to `http://localhost:8000/pages/admin/dashboard.html`.

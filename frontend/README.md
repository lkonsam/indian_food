Product Dashboard is a responsive and feature-rich web application built with React and Tailwind CSS that simulates a product listing and shopping cart experience. It includes a dynamic product table with features like draggable column headers, search with debounce, sorting, and pagination. Users can view, edit, delete, and add products to the cart, which is managed through a collapsible sidebar. The app also includes a reusable alert notification system for displaying success, error, or informational messages. Designed with usability and clean UI in mind, this project serves as a solid foundation for building modern dashboard-style interfaces.

#Folder structure is as below:

src/
├── components/
│ ├── CartSidebar.jsx
│ ├── CategoryFilter.jsx
| ├── Header.jsx
│ └── Pagination.jsx
│ ├── ProductTable.jsx
│ ├── StatsCards.jsx
│ ├── Table.jsx
|
├── contexts/
│ └── ProductContextProvider.js
|
├── hooks/
│ └── useAlert.jsx
│ ├── useCart.js
│ └── useProductContext.jsx
|
├── utils/
│ └── generateMockProducts.jsx
|
├── App.jsx
├── main.jsx
└── index.css

#Install using npm create vite@latest product-dashboard -- --template react
#Install tailwindcss using the npm with the direction from tailwind website https://tailwindcss.com/

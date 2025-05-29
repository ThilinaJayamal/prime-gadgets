Sure! Here's the `README.md` content in a clean, copy-paste-ready format:

```markdown
# Prime Gadgets

**Prime Gadgets** is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It provides a seamless shopping experience with features tailored for both customers and administrators.

## 🚀 Live Demo

Check out the live application here: [https://prime-gadgets-3cqd.vercel.app](https://prime-gadgets-3cqd.vercel.app)

## 🛠️ Features

- User registration and authentication
- Product browsing and detailed views
- Shopping cart functionality
- Order placement and tracking
- Admin dashboard for product and order management

## 🧰 Technologies Used

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

## 📂 Project Structure

```

prime-gadgets/
├── client/          # React frontend
├── server/          # Express backend
├── .gitignore
└── README.md

````

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ThilinaJayamal/prime-gadgets.git
   cd prime-gadgets
````

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:

   * Create a `.env` file in the `server` directory with the following content:

     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. Start the development servers:

   * In the `server` directory:

     ```bash
     npm start
     ```
   * In the `client` directory:

     ```bash
     npm start
     ```
```

# 🧪 Chemical Inventory Management System

A web-based application to efficiently manage and track chemical inventory in laboratories, industries, or educational institutions.

---

## 🚀 Features

* 📦 Add, update, and delete chemical records
* 🔍 Search and filter chemicals easilys
* ⚠️ Track quantity and stock levels
* 📅 Monitor expiry dates
* 🧾 Maintain detailed chemical informations
* 🔐 Secure data handling

---

## 🛠️ Tech Stack

* **Frontend:** react.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Version Control:** git & GitHub

---

## 📂 Project Structure

```
chemical-inventory/
│── client/        # Frontend (React)
│── server/        # Backend (Node + Express)
│── models/        # Database schemas
│── routes/        # API routes
│── controllers/   # Business logic
│── .env           # Environment variables
│── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/rishavo01/chemical-inventory.git
cd chemical-inventory
```

### 2. Install dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 4. Run the project

#### Start backend

```
npm run server
```

#### Start frontend

```
npm start
```

---

## 🔗 API Endpoints (Example)

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/chemicals     | Get all chemicals |
| POST   | /api/chemicals     | Add new chemical  |
| PUT    | /api/chemicals/:id | Update chemical   |
| DELETE | /api/chemicals/:id | Delete chemical   |

---

## 🧠 Future Improvements

* 📊 Dashboard with analytics
* 🔔 Low stock alerts
* 👥 User authentication & roles
* 📱 Mobile responsive UI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Rishav Singh**

---


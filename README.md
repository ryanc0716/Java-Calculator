# 🧮 CloudCalc: Full-Stack Web Calculator

A professional, full-stack calculator web application with persistent calculation history, built to demonstrate modern client-server architecture and cloud deployment.

### 🌐 Live Demo
**[Click here to view the live application on Vercel!](https://java-calculator-opal.vercel.app/)**

## 🏗️ Tech Stack
* **Frontend:** React, Vite, Bootstrap (Hosted on Vercel)
* **Backend:** Java 17, Spring Boot, Spring Web, Spring Data JPA (Hosted on Render via Docker)
* **Database:** PostgreSQL (Hosted on Neon.tech)

## ✨ Features
* **Modern UI:** Dark-mode interface built with Bootstrap's responsive grid system.
* **Full CRUD Operations:** Connects to a live PostgreSQL database to Read, Create, and Delete calculation history.
* **Smart Input:** Supports both on-screen buttons and physical keyboard inputs (including Enter/Backspace integration).
* **Asynchronous Networking:** Uses Axios to seamlessly pass JSON data across cloud endpoints.
* **Professional Architecture:** Utilizes Spring Boot Controller-Service-Repository layers and explicit `ResponseEntity` HTTP status codes.

## 🚀 How to Run Locally

1. **Clone the repository:**
   `git clone https://github.com/your-username/Java-Calculator.git`

2. **Start the Java Backend:**
   * Navigate to the `/backend` directory.
   * Ensure you have a local PostgreSQL database running, or update `application.properties`.
   * Run: `./mvnw spring-boot:run`

3. **Start the React Frontend:**
   * Navigate to the `/frontend` directory.
   * Run: `npm install`
   * Run: `npm run dev`
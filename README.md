# Full-Stack Web Calculator 🧮

Hello, world! 👋 I am currently a Year 2 Computer Science student, and this repository contains my foundational Full-Stack Web application.

I built this project to move beyond basic Java logic and explore how client-server architectures operate. It demonstrates how a modern frontend interface communicates with a backend REST API and persists data to a database.

## 🚀 Tech Stack
This application is built using a modern, industry-standard technology stack:

* **Frontend:** React.js, HTML5, CSS3 (Bootstrap)
* **Backend:** Java, Spring Boot (REST API)
* **Database:** PostgreSQL

## 🧠 Core Features
* Standard arithmetic operations (Addition, Subtraction, Multiplication, Division).
* A responsive, modern User Interface built with React and Bootstrap.
* Calculation history automatically saved and retrieved from the PostgreSQL database.
* Full separation of concerns between the client and the server.

## 💻 Architecture Overview
1. The user interacts with the **React** interface to input a math equation.
2. The frontend sends the data via an HTTP POST request to the **Spring Boot** backend.
3. The Java backend performs the calculation and saves the result to the **PostgreSQL** database.
4. The server responds to the frontend with the final answer, which dynamically updates on the screen.

## 🛠️ How to Run Locally

### Prerequisites
* Java Development Kit (JDK 17+)
* Node.js & npm
* PostgreSQL installed and running on your machine

### 1. Backend Setup
1. Clone the repository.
2. Navigate to the `/backend` directory.
3. Update the `src/main/resources/application.properties` file with your local PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/calculator_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
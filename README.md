
# Social Media Platform

A social media platform inspired by Instagram, allowing users to share photos, follow others, and engage with content through likes and comments.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

---

## Features
- [x] User registration and authentication (with Spring Security).
- [x] Upload and share photos.
- [x] Follow/unfollow users.
- [x] Like and comment on posts.
- [x] Responsive user interface built with Angular.

---

## Technologies Used
- **Front-end:** Angular, TypeScript, SCSS
- **Back-end:** Spring Boot, Spring Security, RESTful APIs
- **Database:** MySQL
- **Other Tools:** Postman, Git

---

## Installation

### Prerequisites
1. Node.js & npm (for Angular).
2. Java JDK 11+ (for Spring Boot).
3. MySQL Server.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/social-media-platform.git
   cd social-media-platform
   ```

2. **Back-end:**
   - Navigate to the back-end directory:
     ```bash
     cd backend
     ```
   - Update `application.properties` with your database credentials.
   - Run the application:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Front-end:**
   - Navigate to the front-end directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the Angular application:
     ```bash
     ng serve
     ```

4. Open the application in your browser:
   ```
   http://localhost:4200
   ```

---

## Usage
1. Sign up for an account or log in using your credentials.
2. Upload and share photos.
3. Follow other users to see their posts on your feed.
4. Interact with posts by liking or commenting.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact
For questions or suggestions, feel free to reach out at:
- **Email:** your.email@example.com
- **GitHub:** [YourUsername](https://github.com/YourUsername)

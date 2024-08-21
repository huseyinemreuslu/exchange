# Exchange

**Exchange** is a fictional trading game developed by the "Super Traders" startup. The application aims to educate users on the terminology used in stock trading.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [License](#license)

## Features

- Users can create portfolios and trade shares.
- Users must have a portfolio before they can start trading.
- The system ensures that users only buy or sell shares at the latest available price.
- Permissions-based system to manage access to different operations.
- Error handling middleware to catch and log errors.

## Technologies

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the REST API.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database for storing user data, shares, portfolios, and transactions.
- **Zod**: For schema validation.
- **Winston**: For logging application activities.
- **Docker**: Containerization for the application and database.

## Installation

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/huseyinemreuslu/exchange.git
   cd exchange
   ```

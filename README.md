# Instant Tiny URL Backend

This project provides a straightforward solution for converting lengthy URLs into concise, easy-to-share links. Enjoy user-friendly features, quick shortening, and a customizable experience. Boost efficiency and simplify your online interactions with our sleek and secure URL Shortener.

## Frontend Repository

For the corresponding frontend, visit the [Instant Tiny URL Frontend](https://github.com/HamidByte/Instant-Tiny-URL-Frontend).

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Install locally or use MongoDB Atlas for a cloud-based solution.)
- [Git](https://git-scm.com/) (optional but recommended)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/HamidByte/Instant-Tiny-URL.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Instant-Tiny-URL
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a .env file in the root of the project and set the following variables:

   ```env
    HOST=http://localhost
    PORT=3000
    MONGO_URI_DEV=your-mongo-uri-for-development
    MONGO_URI_PROD=your-mongo-uri-for-production
   ```

5. **Update Configurations:**

   Modify the configuration files in the `config` directory according to your needs.

6. **Update your scripts in `package.json` for a cross-platform solution:**

   If you are working in a Windows environment and using the Command Prompt, you should use the `set` command to set environment variables.

   ```json
    "scripts": {
      "start": "nodemon index.js",
      "dev": "set NODE_ENV=development && nodemon index.js",
      "prod": "set NODE_ENV=production && nodemon index.js",
    }
   ```

   If you are working in a Unix-like environment (Linux or macOS), you should use the `export` command to set environment variables.

   ```json
    "scripts": {
      "start": "nodemon index.js",
      "dev": "export NODE_ENV=development && nodemon index.js",
      "prod": "export NODE_ENV=production && nodemon index.js",
    }
   ```

   Make sure to check your environment and use the appropriate command accordingly.

7. **Run the Application:**

- For development:

  ```bash
  npm start
  ```

  or

  ```bash
  npm run dev
  ```

- For production:

  ```bash
  npm run prod
  ```

8. **Open in Browser:**

   Open your web browser and go to http://localhost:3000 (or your specified port).

## Endpoints

The URL shortener project provides the following endpoints:

### Shorten URL

- **Endpoint:** `/shortener`
- **Method:** `POST`
- **Request Body:**
  - `longUrl`: The long URL that you want to shorten.
- **Response:**
  - If the URL is valid and successfully shortened, the API will return the shortened URL details.
  - If the generated `shortId` already exists in the database, the API will generate a new `shortId` and return the corresponding details.

**Example Request:**

```bash
curl -X POST http://localhost:3000/shortener -H "Content-Type: application/json" -d '{"longUrl": "https://example.com/"}'
```

**Example Response:**

```json
{
  "_id": "some-unique-id",
  "longUrl": "https://example.com/",
  "shortId": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Redirect to Long URL

- **Endpoint:** `/:shortId`
- **Method:** `GET`
- **Response:**
  - If the `shortId` exists in the database, the API will redirect to the long URL.
  - If the `shortId` does not exist, the API will return a 404 error.

**Example Request:**

```bash
curl -L http://localhost:3000/abc123
```

**Note:** Replace `abc123` in the examples with the actual `shortId` generated.

### URL Stats

- **Endpoint:** `/stats/:shortId`
- **Method:** `GET`
- **Response:**
  - Returns JSON information for the given `shortId`, including long URL, shortId, short URL, creation date, update date, and visit count.

**Example Request:**

```bash
curl http://localhost:3000/stats/abc123
```

**Example Response:**

```json
{
  "_id": "some-unique-id",
  "longUrl": "https://example.com/",
  "shortId": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "visitCount": 10
}
```

**Note:** Replace `abc123` in the examples with the actual `shortId` generated.

### Check URL Existence

- **Endpoint:** `/check/:shortId`
- **Method:** `HEAD`
- **Description:** Checks the existence of a URL based on the provided shortId. Responds with a 204 No Content status if the URL exists or a 404 Not Found status if the URL is not found.
- **Note:** This endpoint is useful for pre-checking whether a short URL exists before attempting to redirect.

**Example Request:**

```bash
curl -I http://localhost:3000/check/abc123
```

**Example Response:**

```bash
HTTP/1.1 204 No Content
```

```bash
HTTP/1.1 404 Not Found
```

**Status Codes:**

- **`204 No Content:`** URL exists.
- **`404 Not Found:`** URL not found.
- **`500 Internal Server Error:`** Internal server error during the check.

**Note:** Replace `abc123` in the examples with the actual `shortId` generated.

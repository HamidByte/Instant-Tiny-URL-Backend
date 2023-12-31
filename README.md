# Instant Tiny URL

 This project provides a straightforward solution for converting lengthy URLs into concise, easy-to-share links. Enjoy user-friendly features, quick shortening, and a customizable experience. Boost efficiency and simplify your online interactions with our sleek and secure URL Shortener.

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Install locally or use MongoDB Atlas for a cloud-based solution.)
- [Git](https://git-scm.com/) (optional but recommended)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mhamid49/Instant-Tiny-URL.git
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
    PORT=3000
    BASE_URL=http://localhost
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
  - If the generated `shortUrl` already exists in the database, the API will generate a new `shortUrl` and return the corresponding details.

**Example Request:**

```bash
curl -X POST http://localhost:3000/shortener -H "Content-Type: application/json" -d '{"longUrl": "https://example.com"}'
```

**Example Response:**

```json
{
  "_id": "some-unique-id",
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
}
```

### Redirect to Long URL

- **Endpoint:** `/:shortUrl`
- **Method:** `GET`
- **Response:**
  - If the short URL exists in the database, the API will redirect to the long URL.
  - If the short URL does not exist, the API will return a 404 error.

**Example Request:**

```bash
curl -L http://localhost:3000/abc123
```

**Note:** Replace `abc123` in the examples with the actual short URL generated.

### URL States

- **Endpoint:** `/states/:shortUrl`
- **Method:** `GET`
- **Response:**
  - Returns JSON information for the given short URL, including long URL, short URL, creation date, update date, and visit count.

**Example Request:**

```bash
curl http://localhost:3000/states/abc123
```

**Example Response:**

```json
{
  "_id": "some-unique-id",
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "visitCount": 10
}
```

**Note:** Replace `abc123` in the examples with the actual short URL generated.

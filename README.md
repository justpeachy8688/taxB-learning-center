# Filing Made Simple
### A Full-Stack Video Learning Center

Filing Made Simple is an independent, full-stack web application designed to make tax filing education more accessible to small businesses and individuals. The platform provides a searchable library of instructional videos covering tax forms, filing procedures, deadlines, and general tax compliance.

This project was developed as a working prototype inspired by a marketing strategy assessment for a software company. Its purpose is to demonstrate how educational content, intuitive user experience, and modern web technologies can work together to improve customer engagement.

## Features

- **Video Learning Library:** Embedded YouTube tutorials that users can watch directly within the application.
- **Search Functionality:** Search for tutorials by title.
- **Category Filtering:** Browse videos by 1099s, W-2, Getting Started, and Deadlines.
- **Responsive Design:** A three-column video gallery on desktop that adapts to smaller screens.
- **Database-Driven Content:** Video titles, descriptions, categories, and URLs are stored in PostgreSQL.
- **REST API:** An Express backend provides video data to the React frontend.
- **CRUD Operations:** Backend endpoints support creating, retrieving, updating, and deleting video records.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Next.js | React framework and application routing |
| TypeScript | Type-safe frontend and backend development |
| Tailwind CSS | Responsive styling |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API |
| PostgreSQL | Relational database |
| Git & GitHub | Version control |

## Getting Started

The application currently runs locally and requires Node.js and PostgreSQL.

### Prerequisites

Install the following software before beginning:

- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/justpeachy8688/taxB-learning-center.git
cd taxB-learning-center
```

### 2. Set Up PostgreSQL

Ensure PostgreSQL is running.

Create the database:

```bash
createdb taxb_learning_center
```

Create the database table:

```bash
psql -d taxb_learning_center -f database/schema.sql
```

Populate the database with sample video tutorials:

```bash
psql -d taxb_learning_center -f database/seed.sql
```

### 3. Configure the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL=postgresql:///taxb_learning_center
```

Start the Express backend:

```bash
npx tsx src/server.ts
```

The API should be available at:

`http://localhost:3001/api/videos`

Opening this URL should display the sample video records in JSON format.

### 4. Start the Frontend

Open a second Terminal window.

From the project's root directory, navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open the application in your browser:

`http://localhost:3000`

Both the frontend and backend servers must remain running for the application to retrieve video data.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/videos` | Retrieve all videos |
| POST | `/api/videos` | Create a video record |
| PUT | `/api/videos/:id` | Update an existing video |
| DELETE | `/api/videos/:id` | Delete a video |

The public-facing application currently uses the GET endpoint to display video tutorials. The remaining endpoints demonstrate backend CRUD functionality.

## How It Works

The application follows a client-server architecture:

1. The user opens the Next.js application.
2. React sends an HTTP request to the Express API.
3. Express queries the PostgreSQL database.
4. PostgreSQL returns the video records.
5. Express responds with JSON data.
6. React displays the videos and allows users to search or filter them.

Each video record contains an ID, title, category, description, and YouTube URL. The frontend converts supported YouTube watch URLs into embedded video players.

## Marketing Strategy & Project Purpose

This prototype demonstrates how an educational video library could support a digital marketing strategy by helping users find relevant tax filing information.

The project focuses on three objectives:

**Customer Education:** Provide accessible tutorials that help users understand tax filing procedures.

**User Experience:** Reduce the time required to find helpful information through searchable content and organized categories.

**Customer Engagement:** Encourage users to explore educational resources and return when they need additional filing guidance.

The project connects marketing strategy with practical software development by turning a proposed content initiative into a functional web application.

## Future Improvements

Potential enhancements include:

- Administrative dashboard for managing video content
- User authentication and role-based access
- Additional video categories
- Video thumbnails and featured tutorials
- Pagination for larger video libraries
- Public deployment and production database hosting
- Automated testing and CI/CD

## Disclaimer

This is an independent portfolio and educational demonstration. It is not an official product of, or endorsed by, SPAN Enterprises or TaxBandits.

Embedded tutorial videos remain the property of their respective creators and are displayed through YouTube's embedded player.

## Project Status

Functional local prototype with a Next.js frontend, Express REST API, PostgreSQL database, searchable video library, category filters, and embedded tutorials.

### Project by:
Taylor Sanders
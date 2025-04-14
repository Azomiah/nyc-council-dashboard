# NYC Council Dashboard – Fullstack Coding Challenge

This is a fullstack web application built as a coding challenge to demonstrate backend and frontend skills. It allows NYC Council Members to log in and view constituent complaints within their district. Admins can view and filter data for all 51 districts.

---

## Features

- Secure login with token-based authentication
- Dashboard to view:
  - Open complaints
  - Closed complaints
  - Top complaint types
  - Complaints made by people who live in the council member’s district
- Admin-only mode with smart dropdown to view complaints from any district (D01 to D51)
- Responsive, professional UI
- Fully seeded database with at least 2 complaints per district

---

## Technologies Used

- Backend: Django 5.0, Django REST Framework
- Frontend: React (Vite + TypeScript)
- Authentication: DRF Token Auth
- Database: SQLite3 (pre-seeded)
- Styling: CSS Modules

---

## Project Structure

```
challenge/
├── backend/                # Django project
│   └── complaint_app/      # App with models, views, urls
├── frontend/               # React + TypeScript app
│   └── src/                # Components, pages, services
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── utils/
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node 14+ and npm or yarn

---

### Backend Setup (Django)

1. Navigate to the backend folder:

```bash
cd challenge/backend
```

2. Create and activate a virtual environment:

```bash
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations and seed the database:

```bash
python manage.py migrate
python manage.py populate_db
```

5. Create a superuser:

```bash
python manage.py createsuperuser
```

6. Start the server:

```bash
python manage.py runserver
```

---

### Frontend Setup (React)

1. Navigate to the frontend folder:

```bash
cd challenge/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## API Overview

All endpoints require authentication via a token in the header:

```
Authorization: Token <your-token>
```

| Endpoint                     | Method | Description                                               |
|-----------------------------|--------|-----------------------------------------------------------|
| /login/                     | POST   | Returns token when given valid username and password      |
| /api/open-cases/            | GET    | Returns open complaints in the user's (or selected) district |
| /api/closed-cases/          | GET    | Returns closed complaints                                 |
| /api/top-complaint-types/   | GET    | Returns top 5 most frequent complaint types               |
| /api/resident-complaints/   | GET    | Returns complaints made by people living in that district |

---

## Admin Smart View Mode

If logged in as the admin user below, a dropdown will appear allowing you to view complaints for any of NYC’s 51 council districts.

**Admin Credentials:**

```
Username: admin@council.gov
Password: password
```

From the dropdown, you can select D01–D51 and explore:

- Open Cases
- Closed Cases
- Top Complaint Types
- Complaints by My Constituents

This is ideal for reviewers who want to test the app functionality across all regions.

---

## Notes

- Districts are padded to match complaint data (e.g. `D01`, `D02`, etc.)
- Data was seeded with 2 complaints per district for demo purposes

---

## License

This project is for demonstration purposes only and is not affiliated with or intended for official use by the NYC Council.

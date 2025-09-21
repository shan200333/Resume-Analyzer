# 📄 AI Resume Analyzer

A full-stack web application that uses AI to analyze resumes, extract key information, and provide insights for improvement. Built with FastAPI backend and React frontend.

## ✨ Features

- **PDF Resume Upload**: Upload and parse PDF resumes
- **AI-Powered Analysis**: Uses Google Gemini AI to extract and analyze resume content
- **Structured Data Extraction**: Automatically extracts:
  - Personal information (name, email, phone)
  - Professional summary
  - Skills and technologies
  - Work experience
  - Education background
  - Projects and achievements
  - Links and portfolios
- **Resume Rating**: AI-generated rating and feedback
- **Improvement Suggestions**: Personalized recommendations for resume enhancement
- **Upskill Recommendations**: AI-suggested skills to develop
- **User Authentication**: Secure login/registration system
- **History Management**: View and manage previously analyzed resumes
- **Responsive Design**: Modern, mobile-friendly interface

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.12+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **AI Integration**: Google Gemini API for resume analysis
- **PDF Processing**: pdfplumber for text extraction
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

### Frontend (React)
- **Framework**: React 19 with Vite
- **Styling**: Inline styles with modern design
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks (useState, useEffect)
- **Animations**: Framer Motion for smooth transitions

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL database
- Google Gemini API key

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Environment Configuration**:
   Create a `.env` file in the backend directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   SECRET_KEY=your_secret_key_here
   DATABASE_URL=postgresql://username:password@localhost:5432/resume_analyzer
   ```

6. **Database Setup**:
   - Create a PostgreSQL database named `resume_analyzer`
   - Update the `DATABASE_URL` in your `.env` file with your database credentials

7. **Run the backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── resume_routes.py
│   │   │   └── user_routes.py
│   │   ├── core/                # Core configuration
│   │   │   └── config.py
│   │   ├── db/                  # Database models and connection
│   │   │   ├── database.py
│   │   │   └── models.py
│   │   ├── schemas/             # Pydantic schemas
│   │   │   ├── resume_schema.py
│   │   │   └── user_schema.py
│   │   ├── services/            # Business logic
│   │   │   ├── auth.py
│   │   │   ├── llm_service.py
│   │   │   └── resume_service.py
│   │   └── main.py              # FastAPI application
│   ├── requirements.txt
│   └── .env                     # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── HistoryTable.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ResultsDisplay.jsx
│   │   │   └── ResumeUploader.jsx
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── package.json
│   └── .env                     # Frontend environment variables
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /users/register` - Register a new user
- `POST /token` - Login and get access token

### Resume Management
- `POST /resumes` - Upload and analyze a resume
- `GET /resumes` - Get all resumes for the current user
- `GET /resumes/{resume_id}` - Get detailed resume information

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **pdfplumber** - PDF text extraction
- **LangChain** - LLM integration framework
- **Google Gemini** - AI model for resume analysis

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **Framer Motion** - Animation library

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS middleware for cross-origin requests
- Input validation with Pydantic schemas
- File type validation for PDF uploads

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `hashed_password` - Encrypted password
- `created_at` - Account creation timestamp

### Resumes Table
- `id` - Primary key
- `file_name` - Original PDF filename
- `owner_id` - Foreign key to users table
- `uploaded_at` - Upload timestamp
- Personal information fields (name, email, phone)
- Structured data fields (skills, experience, education, etc.)
- AI analysis fields (rating, improvements, suggestions)

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database (e.g., on Heroku, AWS RDS, or DigitalOcean)
2. Configure environment variables on your hosting platform
3. Deploy using platforms like:
   - Heroku
   - Railway
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/resume-analyzer/issues) page
2. Create a new issue with detailed information
3. Include error messages, steps to reproduce, and environment details

## 🔮 Future Enhancements

- [ ] Support for multiple file formats (DOCX, TXT)
- [ ] Resume comparison feature
- [ ] Job matching based on resume content
- [ ] Export analyzed resumes to different formats
- [ ] Advanced analytics and insights dashboard
- [ ] Integration with job boards and ATS systems
- [ ] Multi-language support
- [ ] Resume templates and suggestions

---

**Made with ❤️ using FastAPI and React**

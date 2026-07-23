# 🧠 AIVOA – AI Powered Customer Complaint Management System

> AI-powered pharmaceutical complaint management system built using **React, FastAPI, LangGraph, Groq LLM, PostgreSQL, SQLAlchemy, and Redux Toolkit**.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-success)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![LangGraph](https://img.shields.io/badge/LangGraph-AI_Workflow-orange)
![Groq](https://img.shields.io/badge/Groq-LLM-red)

---

# 📌 Project Overview

This project is an AI-powered Customer Complaint Management System developed as part of the **AIVOA Full Stack Developer Assessment**.

The application helps pharmaceutical companies digitize and streamline customer complaint handling by combining modern full-stack development with AI-powered complaint analysis.

Instead of manually reviewing complaint emails or PDFs, the system automatically extracts structured information, classifies the complaint, evaluates completeness, identifies duplicate complaints, recommends CAPA, and stores everything in PostgreSQL.

The application follows a modular AI workflow implemented using **LangGraph**.

---

# 🚀 Key Features

### 📄 Complaint Intake

- Paste customer complaint text
- Upload complaint PDF
- Automatic PDF text extraction

---

### 🤖 AI Complaint Analysis

Automatically extracts:

- Product Name
- Batch Number
- Customer
- Complaint Description
- Severity
- Complaint Category
- Complaint Summary
- Root Cause
- CAPA Recommendation

---

### 🧠 AI Features

Implemented AI capabilities include:

- ✅ Complaint Extraction
- ✅ Complaint Completeness Checker
- ✅ AI Risk Classification
- ✅ Duplicate Complaint Detection
- ✅ Root Cause Recommendation
- ✅ CAPA Recommendation
- ✅ Complaint Summary

---

### 📊 Dashboard

- Total Complaints
- Open Complaints
- Closed Complaints
- Complaint History
- Status Management

---

### 📝 Editable Complaint Review

AI-generated information can be reviewed and edited before saving into the database.

This allows users to validate AI recommendations instead of accepting them blindly.

---

### 📂 Complaint Management

Users can:

- Save complaints
- View complaint history
- Update complaint status
- Track complaint lifecycle

Supported Status:

- Open
- Investigating
- CAPA Implemented
- Closed

---

# 🧩 LangGraph Workflow

The AI pipeline is implemented using LangGraph.

```
Customer Complaint
        │
        ▼
Extract Node
        │
        ▼
Completeness Node
        │
        ▼
Risk Classification Node
        │
        ▼
Duplicate Detection Node
        │
        ▼
Recommendation Node
        │
        ▼
Structured JSON Response
```

Each node performs an independent task, making the workflow modular and easy to extend.

---

# 🏗️ System Architecture

```
                React + Redux Toolkit
                        │
                        ▼
                     Axios API
                        │
                        ▼
                  FastAPI Backend
                        │
                        ▼
                 LangGraph Workflow
        ┌─────────────────────────────────┐
        │ Extract Complaint               │
        │ Completeness Checker            │
        │ Risk Classification             │
        │ Duplicate Detection             │
        │ Recommendation Engine           │
        └─────────────────────────────────┘
                        │
                        ▼
                    Groq LLM
                        │
                        ▼
                  PostgreSQL Database
```

---

# ⚙️ Tech Stack

## Frontend

- React (Vite)
- Redux Toolkit
- Axios
- CSS
- Google Inter Font

---

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- PyPDF

---

## AI

- LangGraph
- Groq API
- Llama 3.3 70B Versatile *(Used because the originally suggested model is no longer available on Groq.)*

---

# 📁 Folder Structure

```
backend
│
├── app
│   ├── ai.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── routes.py
│   ├── pdf_utils.py
│   ├── prompts
│   └── langgraph
│       ├── state.py
│       ├── nodes.py
│       └── workflow.py
│
frontend
│
├── src
│   ├── app
│   ├── features
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
```

---

# 🔄 Application Workflow

```
Upload PDF / Paste Complaint
            │
            ▼
      Extract Complaint Text
            │
            ▼
      LangGraph AI Workflow
            │
            ▼
    Structured Complaint Data
            │
            ▼
   User Review & Edit Details
            │
            ▼
      Save to PostgreSQL
            │
            ▼
 Dashboard & Complaint History
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Health Check |
| POST | /upload-pdf | Upload complaint PDF |
| POST | /analyze | AI Complaint Analysis |
| POST | /complaints | Save Complaint |
| GET | /complaints | Fetch Complaints |
| PATCH | /complaints/{id}/status | Update Complaint Status |

---

# 💻 Local Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📸 Screenshots

> Add screenshots here before submission.

Suggested screenshots:

- Dashboard
- PDF Upload
- AI Analysis
- Complaint Details
- Complaint History
- Status Update

---

# 💡 Design Decisions

During development, the focus was on creating a clean and modular architecture rather than tightly coupling AI logic with backend APIs.

Key decisions include:

- LangGraph for modular AI workflow
- Redux Toolkit for centralized frontend state management
- Editable AI output to support human validation
- PostgreSQL for structured complaint storage
- FastAPI for lightweight REST APIs
- Modular backend architecture for future scalability

---

# 🔮 Future Enhancements

Potential improvements include:

- OCR for scanned complaint documents
- Email Integration
- User Authentication & Role Management
- Audit Trail
- Vector Database for semantic duplicate detection
- Human Approval Workflow
- Analytics Dashboard
- Notification System

---

# 👨‍💻 Developed By

**Aishwarya Chakote**

This project was developed as part of the **AIVOA Full Stack Developer Assessment**, focusing on practical AI integration, clean backend architecture, and modular workflow design.

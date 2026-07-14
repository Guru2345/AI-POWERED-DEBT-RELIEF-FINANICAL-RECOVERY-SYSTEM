# Architecture Details

## Network Topology
- **Frontend**: Vite + React SPA
- **Backend (Development)**: Node.js + Express (Unified in same repository)
- **Backend (Production Template)**: Python + FastAPI
- **Database (Development)**: Local JSON (`database/db.json`)
- **Database (Production)**: SQL (PostgreSQL/SQLite) via SQLAlchemy

## Database Flows
1. **Local Sandbox**: The Node.js Express server reads and writes to `database/db.json` using synchronous or asynchronous file operations.
2. **Production/Enterprise**: The FastAPI server uses SQLAlchemy ORM to interact with a relational database, providing robust transactions, migrations, and scalability.

## AI Integration
- Uses `@google/genai` (Node.js) and `google-genai` (Python) SDKs.
- Targets `gemini-2.5-flash` for all operations (Settlement predictions, Letter generation, OCR extraction, Chat Advisor).
- Responses are structured using JSON schemas where applicable for programmatic consumption.

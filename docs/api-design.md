# API Design Contract

## Authentication
- **POST /api/auth/register**
  - Payload: `{ "email": "user@example.com", "password": "securepassword", "name": "John Doe" }`
  - Response: `{ "access_token": "jwt_token", "token_type": "bearer" }`

- **POST /api/auth/login**
  - Payload: `{ "email": "user@example.com", "password": "securepassword" }`
  - Response: `{ "access_token": "jwt_token", "token_type": "bearer" }`

## Loans
- **GET /api/loans**
  - Response: `[{ "id": 1, "name": "Credit Card", "amount": 50000, "interest_rate": 18, "overdue_months": 3 }]`

- **POST /api/loans**
  - Payload: `{ "name": "Personal Loan", "amount": 100000, "interest_rate": 12, "overdue_months": 0 }`
  - Response: `{ "id": 2, "name": "Personal Loan", ... }`

## Recovery & AI
- **POST /api/recovery/analyze**
  - Payload: `{ "loan_id": 1, "income": 50000, "expenses": 30000 }`
  - Response: `{ "settlement_recommendation": "40%", "actionable_steps": [...] }`

- **POST /api/recovery/generate_letter**
  - Payload: `{ "loan_id": 1, "strategy": "Medical Hardship" }`
  - Response: `{ "letter_content": "Dear Creditor..." }`

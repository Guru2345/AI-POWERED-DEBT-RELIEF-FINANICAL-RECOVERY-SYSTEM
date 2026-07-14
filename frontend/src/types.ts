export interface Loan {
  id: string;
  creditor: string;
  balance: number;
  interestRate: number;
  emi: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LetterContext {
  type: string;
  creditor: string;
  amount: number;
  hardshipReason: string;
}

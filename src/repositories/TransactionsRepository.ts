import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    return transactions.reduce(
      ({ income, outcome, total }, transaction) => {
        return {
          income:
            transaction.type === 'income'
              ? parseFloat((income + transaction.value).toFixed(2))
              : income,
          outcome:
            transaction.type === 'outcome'
              ? parseFloat((outcome + transaction.value).toFixed(2))
              : outcome,
          total:
            transaction.type === 'outcome'
              ? parseFloat((total - transaction.value).toFixed(2))
              : parseFloat((total + transaction.value).toFixed(2)),
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

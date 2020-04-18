import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response
      .json({
        transactions,
        balance,
      })
      .status(200);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const parsedValue = parseFloat(value);

    const transaction = transactionService.execute({
      title,
      value: parsedValue,
      type,
    });

    return response.json(transaction).status(200);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

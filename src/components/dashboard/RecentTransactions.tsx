
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/currency';
import { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-4">
              <div className="flex flex-col">
                <span className="font-medium">{transaction.description}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex justify-center">
        <a href="/transactions" className="text-sm text-primary hover:underline">
          View all transactions
        </a>
      </CardFooter>
    </Card>
  );
}

import React, { useState } from 'react';
import { Calendar, Filter, Download, Bitcoin, Check, Clock, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface PaymentTransaction {
  id: string;
  type: 'payment' | 'refund' | 'deposit' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
  amount: number;
  currency: string;
  usdValue: number;
  description: string;
  date: Date;
  txHash?: string;
  plan?: string;
}

const PaymentHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'payments' | 'deposits' | 'withdrawals'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: '1',
      type: 'payment',
      status: 'completed',
      amount: 0.0012,
      currency: 'BTC',
      usdValue: 49.00,
      description: 'Pro Mentor Subscription',
      date: new Date('2024-12-28'),
      txHash: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
      plan: 'Pro Mentor'
    },
    {
      id: '2',
      type: 'deposit',
      status: 'completed',
      amount: 0.002,
      currency: 'BTC',
      usdValue: 80.00,
      description: 'Wallet Deposit',
      date: new Date('2024-12-25'),
      txHash: '9s0t1u2v3w4x5y6z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r'
    },
    {
      id: '3',
      type: 'payment',
      status: 'pending',
      amount: 0.015,
      currency: 'ETH',
      usdValue: 49.00,
      description: 'Pro Mentor Subscription Renewal',
      date: new Date('2024-12-29'),
      plan: 'Pro Mentor'
    },
    {
      id: '4',
      type: 'refund',
      status: 'completed',
      amount: 19.00,
      currency: 'USDC',
      usdValue: 19.00,
      description: 'Basic Plan Refund',
      date: new Date('2024-12-20'),
      txHash: '7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e6f'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-orange-600" />;
      case 'refund':
        return <ArrowDownLeft className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'payments') return tx.type === 'payment';
    if (filter === 'deposits') return tx.type === 'deposit';
    if (filter === 'withdrawals') return tx.type === 'withdrawal';
    return true;
  });

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Status', 'Amount', 'Currency', 'USD Value', 'Description', 'Transaction Hash'].join(','),
      ...filteredTransactions.map(tx => [
        tx.date.toISOString().split('T')[0],
        tx.type,
        tx.status,
        tx.amount,
        tx.currency,
        tx.usdValue,
        `"${tx.description}"`,
        tx.txHash || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
          <p className="text-sm text-gray-500">Track all your cryptocurrency transactions</p>
        </div>
        <button
          onClick={exportTransactions}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Transactions</option>
            <option value="payments">Payments</option>
            <option value="deposits">Deposits</option>
            <option value="withdrawals">Withdrawals</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getTypeIcon(transaction.type)}
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bitcoin className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              
              <div>
                <div className="font-medium text-gray-900">{transaction.description}</div>
                <div className="text-sm text-gray-500">
                  {transaction.date.toLocaleDateString()} • {transaction.currency}
                  {transaction.plan && (
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {transaction.plan}
                    </span>
                  )}
                </div>
                {transaction.txHash && (
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    {transaction.txHash.substring(0, 16)}...
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">
                  {transaction.type === 'payment' || transaction.type === 'withdrawal' ? '-' : '+'}
                  {transaction.amount} {transaction.currency}
                </span>
                {getStatusIcon(transaction.status)}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                ${transaction.usdValue.toFixed(2)} USD
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500">
            No transactions match your current filter criteria.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {filteredTransactions.filter(tx => tx.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredTransactions.filter(tx => tx.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${filteredTransactions.reduce((sum, tx) => sum + tx.usdValue, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Total Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
import React, { useState, useEffect } from 'react';
import { Wallet, Bitcoin, TrendingUp, TrendingDown, Eye, EyeOff, Copy, Send, Plus } from 'lucide-react';

interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: React.ComponentType<any>;
  color: string;
}

const CryptoWallet: React.FC = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);

  const [cryptoBalances, setCryptoBalances] = useState<CryptoBalance[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.00234567,
      usdValue: 156.78,
      change24h: 2.34,
      icon: Bitcoin,
      color: 'orange'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 0.0456789,
      usdValue: 123.45,
      change24h: -1.23,
      icon: Bitcoin, // Using Bitcoin icon as placeholder
      color: 'blue'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 250.00,
      usdValue: 250.00,
      change24h: 0.01,
      icon: Bitcoin, // Using Bitcoin icon as placeholder
      color: 'green'
    }
  ]);

  const totalUsdValue = cryptoBalances.reduce((sum, crypto) => sum + crypto.usdValue, 0);

  const walletAddresses = {
    BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    ETH: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
    USDC: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Crypto Wallet</h2>
            <p className="text-sm text-gray-500">Manage your cryptocurrency</p>
          </div>
        </div>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white mb-6">
        <div className="text-sm opacity-90 mb-1">Total Portfolio Value</div>
        <div className="text-3xl font-bold mb-2">
          {showBalances ? `$${totalUsdValue.toFixed(2)}` : '••••••'}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>+5.67% (24h)</span>
        </div>
      </div>

      {/* Crypto List */}
      <div className="space-y-3 mb-6">
        {cryptoBalances.map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setSelectedCrypto(selectedCrypto === crypto.symbol ? null : crypto.symbol)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${crypto.color}-100 rounded-full flex items-center justify-center`}>
                <crypto.icon className={`h-5 w-5 text-${crypto.color}-600`} />
              </div>
              <div>
                <div className="font-medium text-gray-900">{crypto.name}</div>
                <div className="text-sm text-gray-500">{crypto.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {showBalances ? `$${crypto.usdValue.toFixed(2)}` : '••••'}
              </div>
              <div className="text-sm text-gray-500">
                {showBalances ? `${crypto.balance} ${crypto.symbol}` : '••••'}
              </div>
              <div className={`text-xs flex items-center justify-end space-x-1 ${
                crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {crypto.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(crypto.change24h)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Crypto Details */}
      {selectedCrypto && (
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-3">
              {cryptoBalances.find(c => c.symbol === selectedCrypto)?.name} Wallet Address
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white border border-gray-300 rounded-lg p-3 font-mono text-sm break-all">
                {walletAddresses[selectedCrypto as keyof typeof walletAddresses]}
              </div>
              <button
                onClick={() => copyToClipboard(walletAddresses[selectedCrypto as keyof typeof walletAddresses])}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Receive</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="h-4 w-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Buy Crypto</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-4 w-4" />
            <span>View Charts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoWallet;
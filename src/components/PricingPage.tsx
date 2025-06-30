import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, Check, Zap, Crown, Star, Bitcoin, Wallet } from 'lucide-react';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic Mentor',
      price: '$19',
      cryptoPrice: '0.0005 BTC',
      period: '/month',
      description: 'Perfect for getting started with AI career guidance',
      features: [
        'Unlimited chat sessions',
        'Basic knowledge base',
        'Career goal tracking',
        'Email support',
        'Mobile app access'
      ],
      popular: false,
      color: 'blue'
    },
    {
      id: 'pro',
      name: 'Pro Mentor',
      price: '$49',
      cryptoPrice: '0.0012 BTC',
      period: '/month',
      description: 'Advanced features for serious career development',
      features: [
        'Everything in Basic',
        'Advanced personality customization',
        'Industry-specific insights',
        'Resume optimization',
        'Interview preparation',
        'Priority support',
        'Export conversations'
      ],
      popular: true,
      color: 'purple'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      cryptoPrice: '0.0025 BTC',
      period: '/month',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team management',
        'Custom integrations',
        'Advanced analytics',
        'White-label options',
        'Dedicated account manager',
        'Custom training data'
      ],
      popular: false,
      color: 'emerald'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCryptoPayment(true);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 border-l border-gray-300" />
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Upgrade Your Mentor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {!showCryptoPayment ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Your Full Career Potential
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan to accelerate your career growth with advanced AI mentoring features
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-purple-500 scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {plan.price}
                        <span className="text-lg font-normal text-gray-500">{plan.period}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                        <Bitcoin className="h-4 w-4" />
                        <span>or {plan.cryptoPrice}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className={`h-5 w-5 text-${plan.color}-600 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                        : `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700`
                    }`}
                  >
                    {plan.popular ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Crown className="h-5 w-5" />
                        <span>Choose Pro</span>
                      </div>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Crypto Payments?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Payments</h3>
                <p className="text-gray-600 text-sm">
                  Process payments instantly without waiting for bank transfers or card processing delays
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lower Fees</h3>
                <p className="text-gray-600 text-sm">
                  Save on transaction fees compared to traditional payment methods
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Access</h3>
                <p className="text-gray-600 text-sm">
                  Pay from anywhere in the world without currency conversion hassles
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CryptoPaymentModal 
          plan={selectedPlanData!}
          onClose={() => setShowCryptoPayment(false)}
          onSuccess={() => navigate('/dashboard')}
        />
      )}
    </div>
  );
};

interface CryptoPaymentModalProps {
  plan: any;
  onClose: () => void;
  onSuccess: () => void;
}

const CryptoPaymentModal: React.FC<CryptoPaymentModalProps> = ({ plan, onClose, onSuccess }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [paymentAddress, setPaymentAddress] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const cryptoOptions = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: Bitcoin,
      price: plan.cryptoPrice,
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      color: 'orange'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: '0.015 ETH',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
      color: 'blue'
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      price: plan.price.replace('$', '') + ' USDC',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
      color: 'green'
    }
  ];

  const selectedCryptoData = cryptoOptions.find(crypto => crypto.id === selectedCrypto)!;

  React.useEffect(() => {
    if (selectedCryptoData) {
      setPaymentAddress(selectedCryptoData.address);
      // Generate QR code URL (using a QR code service)
      const qrData = `${selectedCryptoData.name.toLowerCase()}:${selectedCryptoData.address}?amount=${selectedCryptoData.price.split(' ')[0]}`;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
    }
  }, [selectedCrypto, selectedCryptoData]);

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('completed');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                <div className="text-sm text-gray-500">{plan.period}</div>
              </div>
            </div>
          </div>

          {paymentStatus === 'pending' && (
            <>
              {/* Crypto Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Choose Cryptocurrency</h3>
                <div className="grid grid-cols-3 gap-3">
                  {cryptoOptions.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setSelectedCrypto(crypto.id)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        selectedCrypto === crypto.id
                          ? `border-${crypto.color}-500 bg-${crypto.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        {crypto.icon && <crypto.icon className={`h-8 w-8 mx-auto mb-2 text-${crypto.color}-600`} />}
                        <div className="font-medium text-gray-900">{crypto.symbol}</div>
                        <div className="text-xs text-gray-500">{crypto.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <img 
                      src={qrCodeUrl} 
                      alt="Payment QR Code"
                      className="mx-auto mb-4 border border-gray-200 rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mb-2">Scan QR code or copy address below</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Send exactly
                      </label>
                      <div className="bg-white border border-gray-300 rounded-lg p-3 font-mono text-lg font-bold text-center">
                        {selectedCryptoData.price}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To address
                      </label>
                      <div className="bg-white border border-gray-300 rounded-lg p-3 font-mono text-sm break-all">
                        {paymentAddress}
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(paymentAddress)}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Copy Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-yellow-800 mb-2">Important Instructions:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Send the exact amount shown above</li>
                  <li>• Use the correct network ({selectedCryptoData.name})</li>
                  <li>• Payment will be confirmed automatically</li>
                  <li>• Do not send from an exchange (use a personal wallet)</li>
                </ul>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                I've Sent the Payment
              </button>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600">
                We're confirming your transaction on the blockchain. This may take a few minutes.
              </p>
            </div>
          )}

          {paymentStatus === 'completed' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your {plan.name} subscription is now active. Welcome to the next level of AI career mentoring!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  You'll be redirected to your dashboard in a moment...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
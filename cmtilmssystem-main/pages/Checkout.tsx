import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { Button } from '../components/Button';
import { CreditCard, CheckCircle, Smartphone } from 'lucide-react';
import { useAuth } from '../App';

export const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === courseId);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa'>('jazzcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  if (!course) return <div>Course not found</div>;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, update user's enrolled courses here
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex gap-4 mb-4">
            <img src={course.thumbnail} alt="" className="w-20 h-20 object-cover rounded-md" />
            <div>
              <h3 className="font-semibold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.instructor}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center font-bold text-lg">
            <span>Total</span>
            <span>PKR {course.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Payment Method</h2>
          <div className="space-y-3 mb-8">
            <button
              onClick={() => setPaymentMethod('jazzcash')}
              className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all ${
                paymentMethod === 'jazzcash' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-red-600" />
                <span className="font-semibold text-gray-900">JazzCash</span>
              </div>
              {paymentMethod === 'jazzcash' && <CheckCircle className="w-5 h-5 text-red-600" />}
            </button>

            <button
              onClick={() => setPaymentMethod('easypaisa')}
              className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all ${
                paymentMethod === 'easypaisa' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Easypaisa</span>
              </div>
              {paymentMethod === 'easypaisa' && <CheckCircle className="w-5 h-5 text-green-600" />}
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all ${
                paymentMethod === 'card' ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-900">Credit/Debit Card</span>
              </div>
              {paymentMethod === 'card' && <CheckCircle className="w-5 h-5 text-primary-600" />}
            </button>
          </div>

          {/* Payment Details Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              {paymentMethod === 'card' ? 'Card Details' : 'Mobile Wallet Details'}
            </h3>
            
            <div className="space-y-4">
              {paymentMethod === 'card' ? (
                <>
                  <input type="text" placeholder="Card Number" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                  <div className="flex gap-4">
                    <input type="text" placeholder="MM/YY" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2" />
                    <input type="text" placeholder="CVC" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-2">Enter your {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} mobile number. You will receive a prompt on your phone to approve the transaction.</p>
                  <input type="tel" placeholder="03XX-XXXXXXX" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </>
              )}
              
              <Button onClick={handlePayment} isLoading={isProcessing} className="w-full text-lg py-3 mt-4">
                Pay PKR {course.price.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getOrder_Backend, UpdateOrder_backend } from '../../components/common/PayOS';
import MainLayout from '../../layout/MainLayout';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Đếm ngược 3 giây


  // Extract URL parameters
  const code = searchParams.get('code');
  const id = searchParams.get('id');
  const cancel = searchParams.get('cancel');
  const status = searchParams.get('status');
  const orderCode = searchParams.get('orderCode');

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [code, status, cancel, navigate, orderCode]);

  return (
    <MainLayout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Payment Result</h1>
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Status:</span> {status}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Order Code:</span> {orderCode}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold">Transaction ID:</span> {id}
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">You will be redirected in {countdown} seconds...</p>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default PaymentResult;

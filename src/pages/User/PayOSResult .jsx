import React, { useEffect } from 'react';
import { useSearchParams,useNavigate  } from 'react-router-dom';
import { getOrder_Backend ,UpdateOrder_backend,GiveMeMyMoney,CheckBanlance} from '../../components/common/PayOS';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract URL parameters
  const code = searchParams.get('code');
  const id = searchParams.get('id');
  const cancel = searchParams.get('cancel');
  const status = searchParams.get('status');
  const orderCode = searchParams.get('orderCode');

  useEffect(() => {
    const handlePaymentResult = async () => {
      // Process parameters
      if (code === '00' && status === 'CANCELLED' && cancel === 'true') {
        console.log('Payment was cancelled');
        try {
          const order = await getOrder_Backend(orderCode);
          order.paymentStatus='CANCELLED';
          const update=await UpdateOrder_backend(order);        
          navigate('/');
          // Handle payment cancellation with order details
        } catch (error) {
          console.error('Error fetching order:', error);
          // Handle the error appropriately
        }
      } else if (code === '00' && status === 'PAID') {
        console.log('Payment was successful');
        try {
          const order = await getOrder_Backend(orderCode);
          order.paymentStatus='PAID ';
          await UpdateOrder_backend(order);
          await GiveMeMyMoney(order.amount,"deposit money","Deposit");
          navigate('/');
          // Handle payment cancellation with order details
        } catch (error) {
          console.error('Error fetching order:', error);
          // Handle the error appropriately
        }
      } else {
        console.log('Payment status unknown');
        // Handle other statuses
      }
    };

    handlePaymentResult();
  }, [code, status, cancel]);

  return (
    <div>
      <h1>Payment Result</h1>
      <p>Status: {status}</p>
      <p>Order Code: {orderCode}</p>
      <p>Transaction ID: {id}</p>
      {/* Render additional information or actions based on payment status */}
    </div>
  );
};

export default PaymentResult;
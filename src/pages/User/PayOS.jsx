import {
    TextField,
    Box,
    Button,
    Typography,
    CircularProgress,
  } from "@mui/material";
  import React, { useEffect, useRef, useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate } from "react-router-dom";
  import { createPaymentLink,CreateOrder_backend } from "../../components/common/PayOS";
  import useScript from "react-script-hook";
  import CryptoJS from 'crypto-js';
  import { getUser } from '../../service/GetUser';
  import MainLayout from '../../layout/MainLayout';
  
  export default function PayOS() {
    const navigate = useNavigate();
    const [openUICustomLoading, setOpenUICustomLoading] = useState(false);
    const [redirectLoading, setRedirectLoading] = useState(false);
    const [openDialogLoading, setOpenDialogLoading] = useState(false);
    const productNameRef = useRef("");
    const descriptionRef = useRef("");
    const priceRef = useRef(1000);
  
    const [loading, error] = useScript({
      src: 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js',
      checkForExisting: true,
    });
    const RETURN_URL = `${window.location.href}result/`;
    const CANCEL_URL = `${window.location.href}result/`;
  
    const createPaymentLinkHandle = async function (
      callbackFunction,
      setLoading
    ) {
      setLoading(true);  
      if(Number(priceRef.current.value)<10000){
        toast.error("Please input minimum isis 10000");
        setLoading(false);
        return;
      }
      const user=getUser();
      const model = {
        id: 0,
        userId: user.sub,
        amount: Number(priceRef.current.value),
        paymentStatus: "PENDING"
      };
      const res= await CreateOrder_backend(model);//tạo đơn hàng phía backend


      const now = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
      const expiredAt = now + 30 * 60; // Thêm 30 phút (1800 giây)   
      const orderCode=res.id;
      const amount=res.amount;
      const description = `${user.name}${res.id}`;
      const buyerName =user.name;
      const buyerEmail=user.email;
      const buyerPhone ="";
      const buyerAddress="";
      const items =[];
      const cancelUrl =RETURN_URL;
      const returnUrl = CANCEL_URL;
      const data = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
      const checksumKey = `${import.meta.env.VITE_Checksum_Key}`;
      const signature = CryptoJS.HmacSHA256(data, checksumKey).toString(CryptoJS.enc.Hex);
  
      try {
        const body = JSON.stringify({
          orderCode: orderCode,
          amount: amount,
          description: description,
          buyerName: buyerName,
          buyerEmail: buyerEmail,
          buyerPhone: buyerPhone,
          buyerAddress: buyerAddress,
          items: items,
          cancelUrl: cancelUrl,
          returnUrl: returnUrl,
          expiredAt: expiredAt,
          signature: signature // Chữ ký được tính toán trước đó
        });
        let response = await createPaymentLink(body);
        if (response.code != "00") throw new Error("Call Api failed: ");
        callbackFunction(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("ERROR");
      }
    };
    const openUICustom = (checkoutResponse) => {
      const {
        accountName,
        accountNumber,
        amount,
        description,
        orderCode,
        qrCode,
        bin,
      } = checkoutResponse;
      navigate("/payment", {
        state: {
          accountName,
          accountNumber,
          amount,
          description,
          orderCode,
          qrCode,
          bin,
        },
      });
    };
    const redirectPaymentLink = async function (checkoutResponse) {
      if (checkoutResponse) {
        let url = checkoutResponse.checkoutUrl;
        window.location.href = url;
      }
    };
  
    const openPaymentDialog = async function (checkoutResponse) {
      if (checkoutResponse) {
        let url = checkoutResponse.checkoutUrl;
        if (checkoutResponse.checkoutUrl.startsWith("https://dev.pay.payos.vn")) {
          url = checkoutResponse.checkoutUrl.replace(
            "https://dev.pay.payos.vn",
            "https://next.dev.pay.payos.vn"
          );
        }
        if (checkoutResponse.checkoutUrl.startsWith("https://pay.payos.vn")) {
          url = checkoutResponse.checkoutUrl.replace(
            "https://pay.payos.vn",
            "https://next.pay.payos.vn"
          );
        }
        // console.log(url);
        let { open } = window.PayOSCheckout.usePayOS({
          RETURN_URL: RETURN_URL,
          ELEMENT_ID: "config_root",
          CHECKOUT_URL: url,
          onExit: (eventData) => {
            console.log(eventData);
          },
          onSuccess: (eventData) => {
            console.log(eventData);
            window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
          },
          onCancel: (eventData) => {
            console.log(eventData);
            window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
          },
        });
        open();
      }
    };
    return (
      <MainLayout>
        {/* Toàn bộ màn hình */}
        <Box
          component="div"
          className="flex items-center justify-center min-h-screen bg-gray-100"
        >
          {/* Form Container */}
          <Box
            component="div"
            className="w-full max-w-lg p-6 bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300 rounded-lg shadow-xl"
          >
            <ToastContainer />
            <Box
  component="div"
  className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-t-lg text-center"
>
  <Typography
    component="h4"
    variant="h4"
    className="text-white font-extrabold"
  >
    New Transaction
  </Typography>
</Box>
    
            {/* Amount Input */}
            <Box component="div" className="mb-5">
              
              <div className="mt-5">
              <TextField
                id="outlined-basic"
                label="Enter Amount"
                variant="outlined"
                defaultValue="10000"
                inputRef={priceRef}
                fullWidth
                className="!border-gray-300"/>
              </div>
            </Box>
    
            {/* Description Input */}
            <Box component="div" className="mb-5">
            <div className="mt-2">
              <TextField
                id="outlined-basic"
                label="Enter Description"
                variant="outlined"
                defaultValue="Deposit money into account"
                inputRef={descriptionRef}
                fullWidth
                className="!border-gray-300"
              />
              </div>
            </Box>
    
            {/* Submit Button */}
            <Box component="div" className="flex justify-center">
              <Button
                variant="contained"
                onClick={() =>
                  createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
                }
                disabled={redirectLoading}
                className="!bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 !normal-case text-white py-2 px-6 rounded-lg shadow-lg hover:opacity-90"
              >
                {redirectLoading ? (
                  <>
                    Processing &nbsp;
                    <CircularProgress className="!text-white" size={20} />
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </MainLayout>
    );
  }
  
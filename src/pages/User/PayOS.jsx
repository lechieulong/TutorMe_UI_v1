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
      <Box
        component={"div"}
        className="flex flex-col !content-center flex-wrap gap-5"
      >
        {/* <Header /> */}
        <Box
          component="div"
          className="w-3/4 md:w-1/2"
          sx={{ alignSelf: "center" }}
        >
          <ToastContainer />
          <Typography component="h4" variant="h4" className="!font-bold">
            New Transaction
          </Typography>
          <Box component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography>Amount:</Typography>
            <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id="outlined-basic"
                label="input Amount"
                variant="outlined"
                defaultValue="10000"
                inputRef={priceRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component="div" sx={{ marginBottom: "20px" }}>
            <Typography>Decription:</Typography>
            <Box component="div" sx={{ width: "100%", marginTop: "10px" }}>
              <TextField
                id="outlined-basic"
                label="Decription"
                variant="outlined"
                defaultValue="deposit money into account"
                inputRef={descriptionRef}
                fullWidth
              />
            </Box>
          </Box>
          <Box component="div" className="flex flex-col gap-3 items-center">
            <Button
              variant="contained"
              onClick={() =>
                createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
              }
              disabled={redirectLoading}
              className="!bg-[#5D5FEF] !normal-case"
            >
              Payment
              {redirectLoading ? (
                <>
                  {" "}
                  &nbsp; <CircularProgress className="!text-white" size={20} />
                </>
              ) : (
                ""
              )}
            </Button>       
          </Box>
        </Box>
      </Box>
      </MainLayout>
    );
  }
  
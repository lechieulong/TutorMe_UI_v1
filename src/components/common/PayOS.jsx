import axios from "axios";
import { getUser } from '../../service/GetUser';
import apiURLConfig from "../../redux/common/apiURLConfig";
import CryptoJS from "crypto-js";

const url= apiURLConfig.baseURL;

export async function createPaymentLink(formData) {
  try {
    const res = await axios({
      method: "POST",
      url: import.meta.env.VITE_ORDER_URL,
      data: formData,
      headers: {
        "Content-Type": 'application/json',
        "x-client-id":import.meta.env.VITE_Client_ID,
        "x-api-key" :import.meta.env.VITE_Api_Key,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function getOrder(id) {
  try {
    const res = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_ORDER_URL}/${id}`,
      headers: {
        "Content-Type": "application/json",
        "x-client-id":import.meta.env.VITE_Client_ID,
        "x-api-key" :import.meta.env.VITE_Api_Key,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}


export async function getListBank(){
    try {
        const res = await axios({
          method: "GET",
          url: 'https://api-merchant.payos.vn/v2/payment-requests',
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
}
export async function cancelOrder(orderId){
  try {
      const res = await axios({
        method: "POST",
        url: 'https://api-merchant.payos.vn/v2/payment-requests',
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function CreateOrder_backend(formData){
  try {
    console.log(formData)
      const res = await axios({
        method: "POST",
        url: `${url}/Transaction`,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function UpdateOrder_backend(formData){
  try {
      const res = await axios({
        method: "Put",
        url: `${url}/Transaction`,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function getOrder_Backend(orderId){
  try {
      const res = await axios({
        method: "GET",
        url: `${url}/Transaction/${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function GiveMeMyMoney(UserId,money,Message,Type){
  const data = `userid=${UserId}&money=${money}&message=${Message}&type=${Type}`;
  const checksumKey = `${import.meta.env.VITE_Checksum_Key}`;
  const signature = CryptoJS.HmacSHA256(data, checksumKey).toString(CryptoJS.enc.Hex);
  const model={
    UserId:UserId,
    Balance:money,
    Message:Message,
    Type:Type,
    signature:signature
  }
  try {
      const res = await axios({
        method: "PUT",
        url: `${url}/AccountBalance`,
        data:model,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function GetBanlance(){
  const user=getUser();
  try {
      const res = await axios({
        method: "GET",
        url: `${url}/AccountBalance/${user.sub}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
}
export async function CheckBanlance(money){
  const balance= await GetBanlance();
  return balance>=money?true:false;
  
}



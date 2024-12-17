
import axios from "axios";
import apiURLConfig from '../../redux/common/apiURLConfig';
import { generateRandomHexString,generateSignature } from "../common/LiveStreamFrame";
import { toast } from "react-toastify";


const url= apiURLConfig.baseURL;
const appID = Number(import.meta.env.VITE_APP_ID);
const serverSecret = import.meta.env.VITE_SERVER_SECRET;
export const getLives= async (page,pageSize,searchQuery)=>{
    try {
      const response = await axios.get(`${url}/StreamSession/lives?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lives:', error);
      setError('ERROR.');
    }
  }
  export const updateLive= async (formData)=>{
    try {
      const response = await axios.put(`${url}/StreamSession`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching lives:', error);
      setError('ERROR.');
    }
 }
 export const EndLive = async (roomId) => {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const signatureNonce = generateRandomHexString(); // Generate random nonce
    const signature = generateSignature(
      appID,
      signatureNonce,
      serverSecret,
      timestamp
    );

    const baseURL = `https://rtc-api.zego.im/?Action=CloseRoom`;

    const generatedUrl = `${baseURL}&AppId=${appID}&SignatureNonce=${signatureNonce}&Timestamp=${timestamp}&Signature=${encodeURIComponent(
      signature
    )}&SignatureVersion=2.0&RoomId=${roomId}`;
    console.log(generatedUrl);

    try {
      const response = await fetch(generatedUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.Code === 0) {
        // Return the list of RoomIds in descending order of UserCount
        toast.success("End Live Success");
        return true;
      } else {
        console.error("API Error:", data.Message);
        toast.error(data.Message);
        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };
import axios from "axios";
import apiURLConfig from '../../redux/common/apiURLConfig';
import { toast } from "react-toastify";

const url= apiURLConfig.baseURL;
export const getTransactions= async (page,pageSize,searchQuery)=>{
    try {
      const response = await axios.get(`${url}/Transaction/transactions?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  }
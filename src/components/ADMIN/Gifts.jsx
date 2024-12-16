
import axios from "axios";
import apiURLConfig from '../../redux/common/apiURLConfig';
import { toast } from "react-toastify";

const url= apiURLConfig.baseURL;
export const getGifts= async (page,pageSize,searchQuery)=>{
    try {
      const response = await axios.get(`${url}/Gift/gifts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gifts:', error);
    }
  }
  export const addGift= async (formData)=>{
    try {
      const response = await axios.post(`${url}/Gift`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("Add Gift Success");
      return response.data;
    } catch (error) {
      console.error('Error fetching gifts:', error);
      toast.error("Add Gift Fail");
    }
  }
  export const updateGift= async (formData)=>{
    try {
      const response = await axios.put(`${url}/Gift`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("Update Gift Success");
      return response.data;
    } catch (error) {
      console.error('Error fetching gifts:', error);
      toast.error("Update Gift Fail");
    }
  }
  export const deleteGift= async (id)=>{
    try {
        const response = await axios.delete(`${url}/Gift/${id}`);
        console.log(response);
        toast.success("Delete Gift Success");
        return response.data;
      } catch (error) {
        console.error('Error fetching gifts:', error);
        toast.error("Delete Gift Fail");
      }
  }
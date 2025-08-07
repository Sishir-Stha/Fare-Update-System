
import axios from "axios";

const API_BASE_URL = "https://itsystem.yetiairlines.com:8443";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { username, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username);   
    localStorage.setItem("userpassword", password);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchUserData = async (username: string, password: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      `${API_BASE_URL}/user/userdata`,  
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { username, password }, 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchAllFareRecords = async (
  sector: string,  
  bookingClassRcd: string, 
  fareCode: string, 
  flightDate: string, 
  username: string,
  currency: string
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("Authorization token is missing. Please login.");
    }

    const response = await axios.get(`${API_BASE_URL}/fare/farelist`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        sector,            
        bookingClassRcd, 
        fareCode,        
        flightDate,      
        username,
        currency         
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching fare records:", error);
    throw error;  
  }
};

export const updateFare = async (
  fareIds: string[], 
  flightdatefrom: string, 
  flightdateto: string, 
  validonflight: string | null | "",  // Ensure validonflight can be null
  fareamount: string,
  actiontype: string,
  username: string
) => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    const userpassword = localStorage.getItem("userpassword");

    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    if (!user) {
      throw new Error("Username is missing. Please log in again.");
    }
    if (!userpassword) {
      throw new Error("Password is missing. Please log in again.");
    }

    const fareIdParams = fareIds.map((id) => `fareid=${encodeURIComponent(id)}`).join('&');

  
    let validOnFlightValue = "";

    if (validonflight != null) {
      validOnFlightValue = validonflight;
    }
    const response = await axios.put(
      `${API_BASE_URL}/fare/updatefare?${fareIdParams}`,  
      null, 
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          flightdatefrom, 
          flightdateto,
          validonflight: validOnFlightValue,
          fareamount, 
          actiontype,
          userlogon: username,
        },
        timeout: 990000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating fare:", error);
    throw error;
  }
};

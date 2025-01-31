import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetch(`http://100.82.151.125:8000/get_user_data/?token=${token}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched Data:', data); // เพิ่ม log ที่นี่เพื่อดูข้อมูลที่ถูกดึง
          setData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          navigate('/');
        });
    } else {
      navigate("/", { state: { toastMessage: "No token found. Redirecting to home..." } });
    }
  }, []);

  const setUserData = (userId, role) => {
    setUserId(userId);
    setRole(role);
    console.log('User Data Set:', { userId, role });  // เพิ่ม log ที่นี่เพื่อเช็คค่าที่ถูกตั้ง
  };

  return (
    <UserContext.Provider value={{data}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

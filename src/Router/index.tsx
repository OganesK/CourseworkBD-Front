/* eslint-disable no-constant-condition */
/*eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Route, Navigate, Routes } from 'react-router-dom';

import { ME_QUERY } from '../graphql/Query';
import { API_URL } from '../config';

import { UserType } from '../types';
import Home from '../Pages/Home/Home';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';

const refreshToken: () => void = async () => {
  const res = await (await fetch(`${API_URL}/refresh_token`, { method: 'POST', credentials: 'include' })).json();
  if (res.ok) {
    localStorage.setItem('token', res.accessToken);
  } else {
    localStorage.removeItem('token');
  }
};

const AppRouter: () => JSX.Element = () => {
  const { data: userData, loading: userLoading, error: userError } = useQuery<{ me: UserType }>(ME_QUERY);

  if (userError) {
    console.error(userError);
  }

  if (userData) {
    if (localStorage.getItem('token') && userData.me === null) {
      refreshToken();
    }
  }

  if (userData?.me) {
    localStorage.setItem('role', userData.me.role);
    if (userData.me.shops.length !== 0) {
      localStorage.setItem('shopId', userData.me.shops[0].id);
    }
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<Navigate to={'/home'} />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/*" element={<Navigate to={'/signIn'} />} />
      </Routes>
    );
  }
};

export default AppRouter;

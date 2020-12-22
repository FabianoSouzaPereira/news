import React, { useContext, LinkHTMLAttributes } from 'react';
import api from './api';
import AuthContext from '../contexts/auth';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
  email: string;
  username: string;
  password: string;
  request: string;
  headers: string;
  data: string;
  status: number;
  content: string;
  contentdata: {
    activeUserLikedIt: string;
    activeUserLovedIt: string;
    author: {
      id: string;
      username: string;
    };
    content: string;
    createdAt: string;
    id: string;
    feedId: number;
    like: string;
    love: string;
    updatedAt: string;
  };
}

export function signIn(email: string, password: string): Promise<Response> {
  return new Promise<Response>((resolve) => {
    resolve(
      api.post('/sign-in', {
        username: email,
        password: password,
      }).catch(function (response) {

        console.log(response.data);
        return response.status;

      }),
    );
  });
}

export function register(email: string, password: string): Promise<Response> {
  return new Promise((resolve) => {
    resolve(
      api.post('/sign-up', {
        username: email,
        password: password,
      }),
    );
  });
}

export function forgotPassword(username: string): Promise<Response> {
  return new Promise((resolve) => {
    resolve(
      api
        .get('/forgot-password/' + username)
        .then(function (response) {
          return response;
        })
        .catch(function (response) {
          if (response.status < '500') {
            console.log(response.status);
            return response.status;
          }
        }),
    );
  });
}

export function feed(content: string): Promise<Response> {
  return new Promise((resolve, reject) => {
    resolve(
      api
        .post('/feed', { content: content })
        .then(function (response) {
          console.log(response.status);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  });
}

export function reaction(
  feedId: number,
  like: boolean,
  love: boolean,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    resolve(
      api
        .post('/reaction', {
          feedId: feedId,
          like: like,
          love: love,
        })
        .then(function (response) {
          console.log(response.status);
          var res: any = '';
          if (response.status === 200) {
            res = 'Ok';
          }
          return res;
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  });
}

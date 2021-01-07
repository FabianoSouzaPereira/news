import React, { useContext, LinkHTMLAttributes } from 'react';
import api from './api';
import AuthContext from '../contexts/auth';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { error } from 'console';

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
  reject: string;
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
      api.get(`/sign-in/?username=${ email }`, {
        password: password,
      })
        .then(function (response: { data: any; status: any; }) {
          if (response.data[ 0 ].password === password && response.data != undefined) {
            console.log(response.data[ 0 ].id);
            return response;
          }
          return "";

        }).catch(function (response: any) {

          console.log("ERRO " + response.error);
          return response.error;

        })
    );
  });
}

export function register(email: string, password: string): Promise<Response> {
  return new Promise((resolve) => {
    resolve(
      api.post('/sign-up', {
        username: email,
        password: password,
      }).then(function (response) {

        console.log(response.data);
        return response.status;

      }).catch(function (response) {

        console.log(response);
        return response;

      })
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
      api.post('/news', { content: content })
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';
import { ToastAndroid } from 'react-native';

interface AuthContextData {
  signed: boolean;
  user: Object | null;
  token: string | '';
  data: string;
  status: string | '';
  loading: boolean;
  password: string | '';
  email: string;
  id: number;
  coment: string;
  like: number;
  dislike: number;
  love: number;
  feedsres: Object[];
  signIn(email: string, password: string): PromiseLike<Response>;
  signOut(): void;
  signUp(email: string, password: string): PromiseLike<Response>;
  remember(email: string): Promise<Response>;
  getFeed(value: string): Promise<string>;
  sendReaction(feedId: number, like: boolean, love: boolean): Promise<string>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | ''>('');
  const [data, setData] = useState<string>('');
  const [feedsres, setFeedsres] = useState([]);
  const [status, setStatus] = useState<string | ''>('');
  const [user, setUser] = useState<Object | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string | ''>('');
  // const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [coment, setComent] = useState();

  useEffect(() => {
    setLoading(true);
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setToken(storagedToken);
      }
    }

    setLoading(false);
    loadStorageData();
  }, []);

  // eslint-disable-next-line no-shadow
  async function signIn(email: string, password: string) {
    const response = await auth.signIn(email, password);

    setToken(response.data);

    api.defaults.headers.Authorization = `Bearer ${response.data}`;

    await AsyncStorage.setItem('@RNAuth:token', response.data);
  }

  // eslint-disable-next-line no-shadow
  async function signUp(email: string, password: string) {
    const response = await auth.register(email, password);

    if (response.status === 200) {
      showToastSignUp('Registrado com sucesso');
    }
    if (response.status === 500) {
      showToastSignUp('Usuário já existe.');
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setToken('');
  }

  async function remember(email: string) {
    const response = await auth.forgotPassword(email);
    setPassword(response.password);

    showToastPassword(response.password);
  }

  async function getFeed(value: string) {
    await auth.feed(value);
  }

  async function sendReaction(
    feedId: number,
    like: boolean,
    love: boolean,
  ): Promise<any> {
    const res = await auth.reaction(feedId, like, love);
    console.log(res);
  }

  const showToastPassword = (pass: string) => {
    ToastAndroid.show('Sua senha é ' + pass, ToastAndroid.LONG);
  };
  const showToastSignUp = (value: string) => {
    ToastAndroid.show(value, ToastAndroid.LONG);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: true,
        user,
        token,
        data,
        loading,
        signIn,
        signUp,
        remember,
        signOut,
        password,
        // email,
        id,
        coment,
        setComent,
        getFeed,
        sendReaction,
        feedsres,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

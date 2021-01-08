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
  loading: boolean;
  password: string | '';
  id: number;
  coment: string;
  feedsres: Object[];
  sendReaction(feedId: number, like: boolean, love: boolean): Promise<string>;
  signUp(email:string, password:string):Promise<void>;
  signOut():Promise<void>;
  remember(email: string): Promise<Response>;
  getFeed(value: string): Promise<string>;
  setSigned: any;
  user_id: any;
  setUser_id: any;
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
  const [signed, setSigned] = useState(true);
  const [user_id, setUser_id] = useState<any>(null);
 
  useEffect(() => {
    setLoading(true);
    async function loadStorageData() {

      if (signed === false){
        console.log("signed is false");
          return;
      }
    }

    setLoading(false);
    loadStorageData();
  }, []);



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
    setSigned(false);
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
        signed: !!signed,
        setSigned,
        user,
        token,
        data,
        loading,
        password,
        id,
        coment,
        sendReaction,
        feedsres,
        signUp,
        signOut,
        getFeed,
        remember,
        user_id,
        setUser_id,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

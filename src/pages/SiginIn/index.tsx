/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { signIn } from '../../services/auth';


const SignIn: React.FC = () => {
  const { signed, setSigned } = useContext(AuthContext);
  const [user_id, setUser_id] = React.useState(null);
  const [emailValue, onChangeText] = React.useState();
  const [passwordValue, passwordChange] = React.useState('');
  const nav = useNavigation();

  useEffect(() => {
    async function signCheck() {
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (!storagedToken) {
        return;
      }
    }
    signCheck();
  });

  async function handleSign(email: string, password: string) {
   const  response = await signIn(email, password);
    if ( !(this === undefined) ){
      try {
        console.log('teste ' + JSON.stringify((response.data[0].id).toString()));
        setUser_id(JSON.stringify(response.data[0].id));
        setSigned(true);
      } catch (error) {
        console.log(error);
      }

    }else{
      //Todo mensagem
    }
  }

  function registerUser() {
    nav.navigate('Register');
  }

  function rememberUser() {
    nav.navigate('Remember');
  }

  function cancel() {
    nav.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>Faça o login</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={emailValue}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => passwordChange(text)}
        value={passwordValue}
      />
      <View style={styles.buttonsView}>
        <View style={styles.btnbuttons}>
          <View style={styles.viewbtnSecond}>
            <TouchableOpacity style={styles.btnCancel} onPress={() => cancel()}>
              <Text style={styles.btntexts}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewbtnFirst}>
            <TouchableOpacity
              style={styles.btnEntry}
              onPress={() => handleSign(emailValue, passwordValue)}>
              <Text style={styles.btntexts}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnEnds}>
          <View style={styles.viewbtnThird}>
            <TouchableOpacity
              style={styles.btnRegister}
              onPress={() => registerUser()}>
              <Text style={styles.btntexts}>Registrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewbtnFourth}>
            <TouchableOpacity
              style={styles.btnRemember}
              onPress={() => rememberUser()}>
              <Text style={styles.btntexts}>Lembrar senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#011B44',
    paddingStart: 15,
    paddingEnd: 15,
  },
  input: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 17,
    backgroundColor: '#cecece',
    borderColor: '#000',
    borderWidth: 4,
  },
  buttonsView: {
    flexDirection: 'column',
    height: 130,
    marginTop: 15,
  },
  btnbuttons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  viewbtnFirst: {
    alignSelf: 'flex-end',
    margin: 4,
    width: '48%',
  },
  viewbtnSecond: {
    alignSelf: 'flex-start',
    margin: 4,
    width: '48%',
  },
  btnEnds: {
    flexDirection: 'row',
    height: 30,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  viewbtnThird: {
    alignSelf: 'flex-end',
    width: '50%',
    marginStart: 1,
    marginTop: 1,
    height: 30,
  },
  viewbtnFourth: {
    alignSelf: 'flex-end',
    width: '50%',
    marginStart: 1,
  },
  btnEntry: {
    justifyContent: 'center',
    backgroundColor: '#017A58',
    margin: '1%',
    height: 50,
    flex: 1,
    alignItems: 'center',
    borderRadius: 17,
    borderColor: '#000',
    borderWidth: 4,
  },
  btnCancel: {
    justifyContent: 'center',
    backgroundColor: '#aeaeae',
    margin: '1%',
    height: 50,
    flex: 1,
    alignItems: 'center',
    borderRadius: 17,
    borderColor: '#000',
    borderWidth: 4,
  },
  btnRegister: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginStart: 2,
    marginEnd: 8,
    marginTop: 4,
    fontSize: 20,
    height: 10,
    flex: 1,
  },
  btnRemember: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginStart: 8,
    marginEnd: 2,
    marginTop: 4,
    fontSize: 20,
    height: 10,
    flex: 1,
  },
  btntexts: {
    color: '#fff',
    fontSize: 18,
  },
  texts: {
    color: '#fff',
    marginStart: 20,
    marginBottom: 10,
    fontSize: 20,
  },
});

export default SignIn;

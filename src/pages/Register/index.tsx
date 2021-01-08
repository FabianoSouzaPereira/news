import React, { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

const Register: React.FC = () => {
  const { signUp } = useContext(AuthContext);
  const [emailValue, onChangeText] = React.useState('');
  const [passwordValue, passwordChange] = React.useState('');
  const nav = useNavigation();

  function handleRegister(email: string, password: string) {
    signUp(email, password);

    const storagedToken = AsyncStorage.getItem('@RNAuth:token');

    if (storagedToken) {
      nav.navigate('SignIn');
    }
  }

  function cancel() {
    nav.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>Registre seu novo usuário</Text>
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
              onPress={() => handleRegister(emailValue, passwordValue)}>
              <Text style={styles.btntexts}>Entrar</Text>
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
export default Register;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import Remember from '../pages/Remember';
import Register from '../pages/Register';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="Remember" component={Remember} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator>
);

export default AuthRoutes;

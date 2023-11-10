import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import InscricoesScreen from './src/screens/Inscricoes/InscricoesScreen';
import PesquisaScreen from './src/screens/Pesquisa/PesquisaScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import PrimeiroAcessoScreen from './src/screens/PrimeiroAcesso/PrimeiroAcessoScreen';
import ResetSenhaScreen from './src/screens/ResetSenha/ResetSenhaScreen';
import ErrorScreen from './src/screens/Error/ErrorScreen';
import ResetCodeValidationScreen from './src/screens/ResetSenha/ResetCodeValidationScreen';
import ResetLoginScreen from './src/screens/ResetSenha/ResetLoginScreen';

const ScreensOptions = {
  headerShown: false,
  headerTintColor: '#fff',
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={ScreensOptions} />
        <Stack.Screen name="login" component={LoginScreen} options={ScreensOptions} />
        <Stack.Screen name="inscricoes" component={InscricoesScreen} options={ScreensOptions} />
        <Stack.Screen name="pesquisa" component={PesquisaScreen} options={ScreensOptions} />
        <Stack.Screen name="profile" component={ProfileScreen} options={ScreensOptions} />
        <Stack.Screen name="primeiroAcesso" component={PrimeiroAcessoScreen} options={ScreensOptions} />
        <Stack.Screen name="reset" component={ResetSenhaScreen} options={ScreensOptions} />
        <Stack.Screen name="codeValidation" component={ResetCodeValidationScreen} options={ScreensOptions} />
        <Stack.Screen name="resetLogin" component={ResetLoginScreen} options={ScreensOptions} />
        <Stack.Screen name="error" component={ErrorScreen} options={ScreensOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

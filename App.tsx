import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import InscricoesScreen from './src/screens/Inscricoes/InscricoesScreen';
import PesquisaScreen from './src/screens/Pesquisa/PesquisaScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import PrimeiroAcessoScreen from './src/screens/PrimeiroAcesso/PrimeiroAcessoScreen';
import ResetSenhaScreen from './src/screens/ResetSenha/ResetSenhaScreen';

const ScreensOptions = {
  headerShown: false,
  headerTintColor: '#fff',
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

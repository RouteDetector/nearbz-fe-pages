import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Map from './components/Map';
import Camera from './components/Camera';
import ValidateImage from './components/ValidateImage';

const Stack = createStackNavigator();

const getRegisterScreens = () => {
    return [
        <Stack.Screen
            name="Register"
            component={Register}
        />,
        <Stack.Screen
            name="Validate"
            component={ValidateImage}
        />,
        <Stack.Screen
            name="Camera"
            component={Camera}
        />
    ];
}
const App = () => {
    console.log("apps");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                if (isNewUser ) {
                    getRegisterScreens()
                }
                <Stack.Screen
                name="Map"
                component={Map}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
  
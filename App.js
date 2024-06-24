import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { colors } from './constants/colors';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerTintColor: colors.accent100,
                        headerStyle: { backgroundColor: colors.primary100 },
                        contentStyle: { backgroundColor: colors.white50 },
                    }}
                >
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    color={tintColor}
                                    size={28}
                                    onPress={() => navigation.navigate('AddPlace')}
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: 'Add a new Place',
                        }}
                    />
                    <Stack.Screen name="Map" component={Map} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

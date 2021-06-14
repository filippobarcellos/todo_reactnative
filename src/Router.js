import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateItem from './Pages/CreateItem';
import ToDoList from './Pages/ToDoList';
import UpdateItem from './Pages/UpdateItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function Router(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='ToDoList'>

                <Stack.Screen 
                name="ToDoList" 
                component={ToDoList} 
                options={({ navigation, route }) => ({ 
                    title: 'Todo List',
                    headerRight: () => (
                        <TouchableOpacity
                        onPress={() => navigation.navigate('CreateItem')}
                        color= '#fff'
                        >
                            <Image style={{width:32,height:32,marginRight:28}} source={require('../icons/add.png')} />
                        </TouchableOpacity>
                      ),
                      title: '',
                      headerStyle: {
                          backgroundColor: 'white',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                          fontWeight: 'bold',
                      },
                  })}
                />
                
                <Stack.Screen 
                  name="CreateItem" 
                  component={CreateItem} 
                  options={() => ({ 
                    title: '',
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  })}
                />

                  <Stack.Screen 
                  name="UpdateItem" 
                  component={UpdateItem} 
                    options={() => ({ 
                    title: '',
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;
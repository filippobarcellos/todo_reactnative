import React,{useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { getList,updateItem,deleteItem } from '../actions';
import { GET_LIST, ADD_LIST,ADD_LIST_LOCAL,UPDATE_ITEM } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';


const { width, height } = Dimensions.get('window');

const ToDoList = (props) => {

    useEffect(() => {
        props.getList()
    }, [])

    const deleteAlert = (item) =>
        Alert.alert(
            "Do you want to remove the selected item?",
            '',
            [
                {
                    text: "Yes",
                    onPress: () => props.deleteItem(item)
                },
                {
                    text: "No",
                    onPress: () => console.log("Cancel"),
                    style: "cancel"
                },

            ],
            { cancelable: false }
        );



    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            props.updateItem(item)
            props.navigation.navigate('UpdateItem')
        }}>
            <View style={styles.titleDescView}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            <View style={styles.dateView}>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.timeView}>
                <Text style={styles.time}>{item.time}</Text>
            </View>

            <TouchableOpacity style={styles.deleteOpacity} onPress={()=>deleteAlert(item)}>
                <Image style={styles.deleteSign} source={require('../../icons/delete.png')} />
            </TouchableOpacity>

        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            
            <FlatList
                    data={props.list}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={[styles.flatList], {flex: 1 }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyCompView}>
                                <Text style={{
                                    color: 'black', fontSize: 20,
                                    marginTop: height * 0.5 - 120
                                }}>There is nothing in the list</Text>
                                <Text style={{ color: 'black', marginTop: 5 }}>Please, add an item to the list </Text>

                                <TouchableOpacity onPress={() => props.navigation.navigate('CreateItem')}
                                    color="#fff">
                                    <Image style={{ width: 64, height: 64, marginTop: 20 }} source={require('../../icons/add.png')} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    }
                />

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: 'black'
    },
    description: {
        fontSize: 14,
        color: 'white'
    },
    time: {
        fontSize: 14,
        color: 'white'
    },
    date: {
        fontSize: 15,
        color: 'white'
    },
    timeView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:2
    },
    dateView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    deleteSign: {
        width: 25,
        height: 25
    },
    deleteOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
    titleDescView: {
        justifyContent: 'center',
        flex:3
    },
    emptyCompView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

const mapStateToProps = (state) => {
    const { list,id,updateItems} = state.listResponse;
    return { list,id,updateItems};
};

export default connect( mapStateToProps, { getList,updateItem,deleteItem} )(ToDoList);
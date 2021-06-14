import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Input from '../Components/Input'
import Button from '../Components/Button'
import { connect, useDispatch } from 'react-redux';
import { ADD_LIST, GET_LIST, ADD_LIST_LOCAL } from '../actions/types';
import {updateList} from '../actions';

import DatePicker from 'react-native-datepicker' // For time
import DateTimePicker from '@react-native-community/datetimepicker'; // For date

const { width, height } = Dimensions.get('window');

const CreateItem = (props) => {

    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [time, setTime] = useState("00.00")

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={styles.container}>
            <Input placeholder={'Title'}
                value={title}
                style={{ marginTop: height * 0.07, borderWidth: 1, }} onChangeText={(value) => setTitle(value)} />
            <Input placeholder={'Description'}
                value={description}
                style={{borderWidth: 1}}
                onChangeText={(value) => setDescription(value)} />

            <DateTimePicker
                style={{
                    width: width * 0.9,
                    height: height * 0.08,
                    backgroundColor: '#efefef',
                    borderColor: 'black',
                    borderRadius: 7,
                    marginBottom: height * 0.02,
                    justifyContent: 'center',
                    borderWidth: 1,
                }}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon="true"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        borderWidth: 0,
                        paddingLeft: 10,
                        fontSize: 18,
                    }
                }}
                onDateChange={(value) => setTime(value)}
            />

            <DatePicker
                style={{
                    width: width * 0.9,
                    height: height * 0.08,
                    backgroundColor: '#efefef',
                    borderColor: 'black',
                    borderRadius: 7,
                    marginBottom: height * 0.02,
                    justifyContent: 'center',
                    borderWidth: 1,
                }}
                date={time}
                mode="time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon="true"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        borderWidth: 0,
                        paddingLeft: 10,
                        fontSize: 18,
                    }
                }}
                value={time}
                onDateChange={(value) => setTime(value)}
            />

            <Button text={'Add'} style={{ marginTop: height * 0.07 }} onPress={() => {
                let isValid = true;

                if (title == undefined || description == undefined) {
                    setTitle(undefined);
                    setDescription(undefined);
                    isValid = false;
                }

                if (isValid) {
                    let obj = {
                        id,
                        title,
                        description,
                        date,
                        time
                    };
                    props.updateList(obj)
                    props.navigation.pop();
                }
                else {
                    alert("All fields are required!");
                }
            }} 
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column'
    },
});

const mapStateToProps = ( listResponse ) => {
    const { list, id } = listResponse;
    return { list, id };
};
export default connect(mapStateToProps, {updateList} )(CreateItem);
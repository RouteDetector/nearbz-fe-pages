import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import saveProfileImage from '../services/storage';

const Register = (props) => {
    console.log("register");

    imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    
        ImagePicker.launchImageLibrary(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                let fileUri = res.uri;
                saveProfileImage(fileUri, res.fileName, goToValidateImage, showError);
            }
        });
    }  

    const goToValidateImage = () => {
        props.navigation.navigate('Validate')
    }

    const showError = () => {

    }

    return (   
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Hello! Let's get started, we only need one picture of you.</Text>
            <TouchableOpacity onPress={this.imageGalleryLaunch} style={styles.button}  >
                <Text style={styles.buttonText}>Launch Image Gallery</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12    
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});
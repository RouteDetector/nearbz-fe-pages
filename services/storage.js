import EncryptedStorage from 'react-native-encrypted-storage';
import RNFS from 'react-native-fs';

export const saveToken = async (token) => {
    try {
        await EncryptedStorage.setItem(
            "token",
            token
        );
        return token;
    } catch (error) {
        console.log(error);
    }
}

export const getToken = async () => {
    try {   
        const token = await EncryptedStorage.getItem("token");
    
        if (token !== undefined) {
            return token;
        }
    } catch (error) {
        // There was an error on the native side
        console.log(error);
    }
}

export const removeToken = async () => {
    try {
        await EncryptedStorage.removeItem("token");
        return true;
    } catch (error) {
        console.log(error);
        // There was an error on the native side
        return false;
    }
}

export const saveProfileImage = (fileUri, imageName, successCallback, errorCallback) => {
    var path = RNFS.DocumentDirectoryPath + '/' + imageName;

    // copy the file
    RNFS.copyFile(fileUri, path)
    .then((success) => {
        console.log('FILE WRITTEN!');
        try {
            await EncryptedStorage.setItem(
                "profileImage",
                path
            );
            successCallback();
        } catch (error) {
            console.log(error);
            RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED');
                errorCallback();
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
                errorCallback();
            });
        }
    })
    .catch((err) => {
        console.log(err.message);
        errorCallback();
    });
}

export const getProfileImageName = () => {
    try {   
        const path = await EncryptedStorage.getItem("profileImage");
    
        return path;
    } catch (error) {
        // There was an error on the native side
        console.log(error);
    }
}
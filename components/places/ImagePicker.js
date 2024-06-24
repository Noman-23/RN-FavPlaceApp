import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { PermissionStatus, launchCameraAsync, useCameraPermissions } from 'expo-image-picker';
import { useState } from 'react';
import { colors } from '../../constants/colors';
import OutlinedButton from '../../.expo/OutlinedButton';
export default function ImagePicker() {
    const [pickedImage, setPickedImage] = useState();
    //imp NOTE :-     ## for ios we have to manage permissions ##
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResposponse = await requestPermission();
            console.warn('UNDETERMINED permission');
            return permissionResposponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permission to use this app.');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            console.warn('no permission ');
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        // console.log(image);
        setPickedImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
            <OutlinedButton icon={'camera'} onPress={takeImageHandler}>
                Take Image
            </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        backgroundColor: colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        // resizeMode: 'contain',
    },
});

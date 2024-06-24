import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import OutlinedButton from '../../.expo/OutlinedButton';
import { colors } from '../../constants/colors';
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location';
import { getMapPreview } from '../../util/location';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function LocationPicker() {
    const [pickedLocation, setPickedLocation] = useState({ lat: null, lng: null });

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const mapPickedLocation = route.params && { lat: route.params.pickedLat, lng: route.params.pickedLng };

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
        }
    }, [mapPickedLocation]);

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResposponse = await requestPermission();
            console.warn('UNDETERMINED permission');
            return permissionResposponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient permissions!', 'You need to grant location permission to use this app.');
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        // console.log(location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };

    // console.log(pickedLocation);
    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };

    let locationPreview = <Text>No location picked yet.</Text>;

    if (pickedLocation.lat && pickedLocation.lng) {
        locationPreview = (
            <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation?.lat, pickedLocation?.lng) }} />
        );
    }

    // console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng));

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon={'location'} onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon={'map'} onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        backgroundColor: colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

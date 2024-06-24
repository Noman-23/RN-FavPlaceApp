import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

export default function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();

    const selectLocationHandler = (event) => {
        console.log(event.nativeEvent);
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({
            lat: latitude,
            lng: longitude,
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location have been picked!', 'You have to pick a location (by tapping on the map) first!');
            return;
        }
        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
            ),
        });
    }, [navigation, savePickedLocationHandler]);

    const region = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation && (
                <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        borderWidth: 100,
    },
});

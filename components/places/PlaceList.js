import { FlatList, StyleSheet, Text, View } from 'react-native'
import Placeitem from './Placeitem'
import { colors } from '../../constants/colors'

export default function PlaceList({ places }) {
    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }
    return (
        <FlatList data={places} keyExtractor={(item) => item.id} renderItem={({ item }) => <Placeitem place={item} />} />
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 18,
        color: colors.black50
    },
})
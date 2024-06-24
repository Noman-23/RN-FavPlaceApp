import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
export default function IconButton({ icon, size, color, onPress, style }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    pressed: {
        opacity: 0.75
    }
})
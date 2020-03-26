import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';


const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');
    const track = state.find(t => t._id === _id);

    return (
        <>
            <Text style={{ fontSize: 48 }}>{track.name}</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    latitude: track.locations[0].coords.latitude,
                    longitude: track.locations[0].coords.longitude
                }}
            >
                <Polyline
                    coordinates={track.locations.map(location => location.coords)}

                />
            </MapView>
        </>
    );
}


const styles = StyleSheet.create({
    map: {
        height: 300
    }
});
export default TrackDetailScreen;
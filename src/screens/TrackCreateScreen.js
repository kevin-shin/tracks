import React, { useContext, useCallback } from 'react';
import Map from '../components/Map';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import '../_mockLocation';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';


const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording]);
    const [err] = useLocation(callback, isFocused || recording);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2> Create a Track</Text>
            <Map />
            {err ? <Text> Please enable location services.</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: "Add Track",
    tabBarIcon: <FontAwesome name="plus" size={20} />
};

export default withNavigationFocus(TrackCreateScreen);
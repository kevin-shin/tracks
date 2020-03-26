import React, { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (callback, shouldTrack) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distance: 10
                }, callback);
            } catch (err) {
                setErr(err);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) { subscriber.remove(); }
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        }
    },
        [shouldTrack, callback]
    );

    return [err];
};
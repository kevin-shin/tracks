import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

//uses Apple HQ
const getLocation = increment => {
    return {
        timestamp: 100000,
        coords: {
            speed: 0, 
            heading: 0, 
            accuracy: 5, 
            altitudeAccurarcy: 5, 
            altitude: 5, 
            longitude: 122.0322 + increment * tenMetersWithDegrees,
            latitude: 37.3230 + increment * tenMetersWithDegrees
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter ++;
}, 1000);
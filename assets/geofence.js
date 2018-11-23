import Geofence from 'react-native-expo-geofence';

export default function getPostsViaUserLocation(startPoint, markers, distance) {
  var result = Geofence.filterByProximity(startPoint, markers, distance);
  return result;
}

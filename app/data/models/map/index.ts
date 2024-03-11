import { LatLng, Point } from 'react-native-maps';

export interface MapDragEvent {
  nativeEvent: { coordinate: LatLng; position: Point };
}

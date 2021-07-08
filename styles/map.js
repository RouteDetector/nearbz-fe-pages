import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2B5CD'
  },
  item: {
    position: 'absolute',
    width: 80,
    height: 400, // this is the diameter of circle,
    zIndex: 100
  },
  pulse: {
    zIndex: 0,
  },
  connection: {
    bottom: 240,
    height: 80,
    width: 200,
    left: -60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '90deg'}]
  },
  image_container: {
    width: '100%',
    height: 80,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  image: {
    width: 80,
    height: 80,
    zIndex: 100
  },
  text: {
    color: '#fff',
  },
});
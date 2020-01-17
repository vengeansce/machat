import {StyleSheet} from 'react-native';
import sColor from './color';

const flex = {
  flex: 1,
  justifyContent: 'center',
};

const flexRow = {
  ...flex,
  flexDirection: 'row',
};

const s = StyleSheet.create({
  ...sColor,
  flexRow,
  flexRowSpace: {
    ...flexRow,
    alignContent: 'space-between',
  },
  flexRowAround: {
    ...flexRow,
    justifyContent: 'space-around',
  },
  flexRowCenter: {
    ...flexRow,
    alignItems: 'center',
  },
  flexRowReverse: {
    ...flex,
    flexDirection: 'row-reverse',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {paddingVertical: 20, marginHorizontal: 50},
  rounded: {borderRadius: 3},
  textCenter: {textAlign: 'center'},
  relative: {position: 'relative'},
  wFull: {width: '100%'},
  full: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  w1_2: {width: '50%'},
  bgOpacity: {backgroundColor: 'rgba(0, 0, 0, .5)'},
  mt: {marginTop: 10},
});

export default s;

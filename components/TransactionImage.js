import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';

export default function TransactionImage ({ transaction }) {
  const [loading, setLoading] = React.useState(true);
  const onError = (e) => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[transaction.category.startColor, transaction.category.endColor]}
        style={styles.square}
      >
        <SvgUri
            uri={transaction.category.icon}
            width="30"
            height="30"
            fill={'#ffffff'}
            onLoad={onLoad}
            onError={onError}
        />
        {loading && <ActivityIndicator size="small" color="#ffffff" />}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 50,
    height: 50,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

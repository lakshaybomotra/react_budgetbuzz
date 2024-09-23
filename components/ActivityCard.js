import { View, StyleSheet, Text, Image } from 'react-native';

export default function ActivityCard ({backgroundColor, label, amount, description, icon}) {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Text style={styles.label}>{label}</Text>
          <Image source={icon} style={styles.graph}></Image>
        </View>
        <Text style={styles.amount}>₹{amount}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    height: 100,
    padding: 8,
    borderWidth: 4,
    borderRadius: 8,
    borderColor: '#F7F8FE',
    justifyContent: 'space-evenly'
  },
  vertical: {
    flexDirection: 'coloumn',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    justifyContent: 'flex-start',
    color: '#fff'
  },
  graph: {
    width: 40,
    height: 20
  },
  description: {
    color: '#fff',
    justifyContent: 'flex-end'
  },
  amount: {
    color: '#fff',
    fontSize: 24
  }
});
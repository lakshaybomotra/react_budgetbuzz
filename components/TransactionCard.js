import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransactionImage from './TransactionImage'

export default function TransactionCard ({transaction}) {
  const transactionDate = transaction.date.toDate();

  return (
    <View style={styles.transactionCard}>
      <View style={styles.transactionRow}>
        <TransactionImage
          transaction = {transaction}
        />
        <View style={styles.vertical}>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionCategory}>{transaction.category.name}</Text>
            <Text style={styles.transactionDate}>{transactionDate.toLocaleDateString()}</Text>
          </View>
          <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>{transaction.note}</Text>
          <Text
          style={[
            styles.transactionAmount,
            { color: transaction.type === 'Income' ? '#4CAF50' : '#CF414B' },
          ]}
        >
          {transaction.type === 'Income' ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
        </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionCard: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  vertical: {
    flex: 1,
    flexDirection: 'coloumn',
  },
  transactionDetails: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    color: '#888',
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    justifyContent: 'flex-end'
  },
});

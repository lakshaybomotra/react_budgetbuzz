import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock Data
const transactions = [
  { id: 1, category: 'Freelance', date: '21/9/2024', description: 'viokart', amount: 500, type: 'income' },
  { id: 2, category: 'Personal Care', date: '19/9/2024', description: 'Facewash', amount: -500, type: 'expense' },
  { id: 3, category: 'Dining Out', date: '4/9/2024', description: 'Family', amount: -2000, type: 'expense' },
];

// Custom TransactionCard Component
const TransactionCard = ({ transaction }) => {
  return (
    <Card style={styles.transactionCard}>
      <View style={styles.transactionRow}>
        <Icon
          name={transaction.type === 'income' ? 'arrow-upward' : 'arrow-downward'}
          size={24}
          color={transaction.type === 'income' ? '#4CAF50' : '#F44336'}
        />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' },
          ]}
        >
          {transaction.type === 'income' ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
        </Text>
      </View>
      <Text style={styles.transactionDate}>{transaction.date}</Text>
    </Card>
  );
};

const TestScreen = () => {
  const totalSpent = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalEarned = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const deficit = totalEarned - totalSpent;

  return (
    <View style={styles.container}>
      {/* Header Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryValue}>-₹{totalSpent}</Text>
          <Text style={styles.summaryDescription}>Expense this month</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Earned</Text>
          <Text style={styles.summaryValue}>+₹{totalEarned}</Text>
          <Text style={styles.summaryDescription}>Income this month</Text>
        </View>
      </View>

      {/* Deficit */}
      <View style={styles.deficitContainer}>
        <Text style={styles.deficitText}>Deficit of:</Text>
        <Text style={styles.deficitAmount}>₹{deficit}</Text>
      </View>

      {/* Transaction List */}
      <ScrollView>
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    width: '45%',
    alignItems: 'center',
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  summaryDescription: {
    color: '#888',
    fontSize: 14,
  },
  deficitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  deficitText: {
    fontSize: 18,
    color: '#888',
  },
  deficitAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  transactionCard: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
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
    fontWeight: 'bold',
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TestScreen;
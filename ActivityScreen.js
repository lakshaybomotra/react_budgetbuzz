import { View, StyleSheet, Text, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';
import ActivityCard from './components/ActivityCard';
import { Card } from 'react-native-paper';
import TransactionCard from './components/TransactionCard';
import spentGraph from './assets/spent_graph.png';
import earnedGraph from './assets/earning_graph.png';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";

export default function ActivityScreen() {
  const [transactions, setTransactions] = useState([]);
  const userId = "UXQ4Lp1K1bbFSljIoNrmjpg4gpL2";

  useEffect(() => {
    const subscriber = firestore()
        .collection('Users')
        .doc(userId)
        .collection('Transactions')
        .onSnapshot(querySnapshot => {
          const transactionsList = [];
          querySnapshot.forEach(documentSnapshot => {
            transactionsList.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setTransactions(transactionsList.sort((a, b) => new Date(b.date) - new Date(a.date)));
        });

    return () => subscriber();
  }, []);

  let netLabel = "Deficit of:";
  let netAmount = 0;
  let netAmountColor = "";
  const totalSpent = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalEarned = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  if (totalEarned > totalSpent) {
    netLabel = "Net Earning:";
    netAmount = totalEarned - totalSpent;
    netAmountColor = "#4CAF50";
  } else {
    netLabel = "Deficit of:";
    netAmount = totalEarned - totalSpent;
    netAmountColor = "#CF414B";
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Activity</Text>
          <Text style={styles.headerSubText}>All</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.content}>
          <View style={styles.summaryContent}>
            <ActivityCard
                backgroundColor="#F07590"
                icon={spentGraph}
                label="Spent"
                amount={totalSpent}
                description="Expense this month"
            />
            <ActivityCard
                label="Earned"
                icon={earnedGraph}
                description="Income this month"
                amount={totalEarned}
                backgroundColor="#2DC897"
            />
          </View>

          <Card style={styles.transactionCard}>
            <View style={styles.deficitContainer}>
              <Text style={styles.deficitText}>{netLabel}</Text>
              <Text style={[styles.deficitAmount, { color: netAmountColor }]}>₹{netAmount}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {transactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </ScrollView>
          </Card>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F8FE',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 60
  },
  header: {
    elevation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  content: {
    flex: 3,
    padding: 16,
    flexDirection: 'column'
  },
  summaryContent: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 26,
    color: '#000',
    justifyContent: 'top',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  headerSubText: {
    margin: 4,
    fontSize: 20,
    color: '#000',
    justifyContent: 'bottom',
    alignItems: 'center'
  },
  transactionCard: {
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    elevation: 4,
    flex: 1
  },
  deficitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deficitText: {
    fontSize: 18,
    color: '#888',
  },
  deficitAmount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  line: {
    width: 50,
    height: 6,
    backgroundColor: '#2DC897'
  }
});

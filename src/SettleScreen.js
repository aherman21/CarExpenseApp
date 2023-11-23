// SettlementItem component to display amount owed
const SettlementItem = ({ debtor, amount, distance }) => {
    return (
      <View style={styles.settlementItem}>
        <Text>{debtor} owes you</Text>
        <Text>{amount} €</Text>
        <Text>{distance} km</Text>
      </View>
    );
  };
  
  // SettleUp screen component
  const SettleUp = () => {
    // Example data, this should be from your app state
    const settlements = [
      { debtor: 'Ron', amount: '23.48', distance: '234.59' },
      { debtor: 'You', creditor: 'Nori', amount: '73.48', distance: '694.22' },
      // Add more settlements here
    ];
  
    return (
      <View style={styles.container}>
        {settlements.map((settlement, index) => (
          <SettlementItem
            key={index}
            debtor={settlement.debtor}
            amount={settlement.amount}
            distance={settlement.distance}
          />
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    settlementItem: {
      backgroundColor: 'lightgreen',
      padding: 20,
      marginBottom: 10,
    },
    // Reuse and add more styles from the PassengerSetup component as needed
  });
  
  export default SettleUp;
  
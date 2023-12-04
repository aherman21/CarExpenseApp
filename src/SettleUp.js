import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DebtScreen() {
  const [debt, setDebt] = useState(null);

  const handleDebtSelection = (amount) => {
    setDebt(amount === debt ? null : amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.debtInfoContainer}>
        {debt ? (
          <View>
            <Text style={styles.debtText}>Ron owes you {debt} euros.</Text>
          </View>
        ) : (
          <Text>No debt selected.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.debtButton, debt === 50 ? styles.selectedDebtButton : null]}
          onPress={() => handleDebtSelection(50)}
        >
          <Text>Ron owes you 50 euros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={() => handleDebtSelection(null)}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  debtInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  debtText: {
    color: 'green',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  debtButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'darkgray',
    padding: 10,
    margin: 10,
  },
  selectedDebtButton: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
  },
  resetButton: {
    backgroundColor: 'lightcoral',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'darkred',
    padding: 10,
    margin: 10,
  },
});

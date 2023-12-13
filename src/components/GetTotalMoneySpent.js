export const getTotalMoneySpent = (passengers) => {
    return passengers.reduce((total, passenger) => total + passenger.moneySpent, 0)
    }
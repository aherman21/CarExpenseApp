const getTotalMoneySpent = (props) => {
    return props.passengers.reduce((total, passenger) => total + passenger.moneySpent, 0)
}

export default getTotalMoneySpent
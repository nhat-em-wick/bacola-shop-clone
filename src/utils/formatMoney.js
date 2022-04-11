const formatMoneyVND = (money) => {
  return money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})
} 

export default formatMoneyVND
const dateConvert = (date) => {
    const formatDate = date.toISOString().split('T')[0].split('-').reverse().join('-')
    return formatDate
  }
  
  export default dateConvert
  
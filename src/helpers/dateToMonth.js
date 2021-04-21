export default function dateToMonth (date) {

    if(date === 0) {
      return 'Present'
    }
  
    const Month = ['','Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = Number(date.split('-')[1])
    const year = date.split('-')[2]
  
    return Month[month] + ' ' +  year
  
  }
  
export function first2(date){
  return ('0' + date).split('').reverse().slice(0,2).reverse().join('')
}

export function lessThanDate(date,today){
  let [dateYear,dateMonth,dateDay] = date.split('-').map(el => Number(el))
  let [todayYear,todayMonth,todayDay] = today.split('-').map(el => Number(el))
  if(todayYear > dateYear) return true
  if(todayYear == todayYear){
    if(todayMonth > dateMonth) return true
    if(todayMonth == dateMonth){
      if(todayDay > dateDay) return true
    }
  }
  return false
}

export function InThisWeek(date){
  let noOfDays = [31,28,31,30,31,30,31,31,30,31,30,31]
  let todayWeekDate = new Date().getDay()
  let [year,month,day] = [new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate()]
  let sday = (noOfDays[month - 2] + day-todayWeekDate) % noOfDays[month - 2]
  let smonth = sday == day-todayWeekDate ? month : month - 1
  let syear = smonth < 0 ? year - 1 : year

  let stday = (noOfDays[month - 1] + (day + (6 - todayWeekDate))) % noOfDays[month - 1]
  let stmonth = stday == day + (6 - todayWeekDate) ? month : month + 1
  let styear = stmonth > 12 ? year + 1 : year

  console.log('sunday',[sday,smonth,syear])
  console.log('saturday',[stday,stmonth,styear])


  let [dateYear,dateMonth,dateDay] = date.split('-').map(el => Number(el))
  if(dateYear > syear && dateYear < styear) return true
  if(dateYear == syear && dateYear == styear){
    if(dateMonth > smonth && dateMonth < stmonth) return true
    if(dateMonth == stmonth && dateMonth == smonth){
      if(dateDay >= sday && dateDay <= stday) return true
    }
    if(dateMonth == smonth && dateDay > sday) return true
    if(dateMonth == stmonth && dateDay < stday) return true
  }
  return false
}

export function InThisMonth(date){
  return date.split('-')[1] == (new Date().getMonth() + 1)
}

export function AfterToday(date){
  let [dateYear,dateMonth,dateDay] = date.split('-').map(el => Number(el))
  let [todayYear,todayMonth,todayDay] = `${new Date().getFullYear()}-${first2(new Date().getMonth() + 1)}-${first2(new Date().getDate())}`.split('-').map(el => Number(el))

  if(todayYear < dateYear) return true
  if(todayYear == dateYear){
    if(todayMonth < dateMonth) return true
    if(todayMonth == dateMonth){
      if(todayDay < dateDay) return true
    }
  }
  return false
}

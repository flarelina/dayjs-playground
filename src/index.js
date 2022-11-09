import * as dayjs from 'dayjs'

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

// switch language
const lang = "zh-cn"
if (lang === 'ja') {
  require('dayjs/locale/ja');
} else if (lang === 'zh-cn') {
  require('dayjs/locale/zh-cn')
} else {
  require('dayjs/locale/en')
}
dayjs.locale(lang)


const getTime = (timeZone = 'Asia/Tokyo', format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().tz(timeZone).format(format)
}

const formatDate = (datetime, format = 'YYYY-MM-DD', timeZone = 'Asia/Tokyo', locale) => {
  const _date = dayjs(datetime).tz(timeZone);
  
  if(locale) {
    _date.locale(locale)
  }

  return _date.format(format)
}

const dayTrimmed = (datetime) => {
  return dayjs(datetime, 'YYYY-MM-DD HH:mm:ss z').format("D");
}

const monthTrimmed = (datetime) => {
  return dayjs(datetime, 'YYYY-MM-DD HH:mm:ss z').format("MMM");
}

export const getDateDiff = (date1, date2, measurement = 'day') => {
  return dayjs(date2).diff(dayjs(date1), measurement)  
}


console.log(getTime()) // output: current datetime in JP
console.log(formatDate('Aug 22, 2021', 'dddd, MMMM D, YYYY h:mm A'))
/**
 * output:
 * en: Sunday, August 22, 2021 1:00 AM
 * ja: 日曜日, 8月 22, 2021 1:00 午前
 * zh: 星期日, 八月 22, 2021 1:00 凌晨
 * **/
console.log(dayTrimmed("2022-10-20")) // output: 20
console.log(monthTrimmed("2022-10-20")) // output: Oct
console.log(getDateDiff("2022-10-20", "2022-10-25")) // output: 5

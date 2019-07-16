
export const format_date = timeStamp => {
    const date = new Date(timeStamp)
    const zero = num => num >= 10 ? num : '0' + num
    return `${date.getFullYear()}年${zero(date.getMonth() + 1)}月${zero(date.getDate())}日 ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(data.getSeconds())}`
}

export const format_date_day= timeStamp => {
    const date = new Date(timeStamp)
    return `${date.getFullYear()}年${zero(date.getMonth() + 1)}月${zero(date.getDate())}日`
}

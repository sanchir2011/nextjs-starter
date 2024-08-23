import moment from "moment"
 
/* ============== Class niiluuleh ============== */

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
/* ============== Check inputs ============== */

export const isValidEmail = (email) => { // only email format
    if(!email) return false
    const regex = new RegExp(/^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/, "i")
    return regex.test(email)
}

export const isValidPhoneNumber = (phone) => { // all types of phone numbers
    const regex = new RegExp(/^[+]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/)
    return regex.test(phone)
}

export const isValidName = (name) => { // Mongolian and English letters, hyphen, apostrophe and space
    const regex = new RegExp('^[\u04ae\u04af\u04e8\u04e9\u0401\u0451\u0410-\u044fa-zA-Z-\' ]+$')
    return regex.test(name)
}

export const isValidUsername = (username) => { // only letters, numbers, dots and underscores
    if(!username) return false
    const regex = new RegExp(/^[a-zA-Z0-9._]+$/)
    return regex.test(username)
}


/* ============== Check JS variables ============== */

export const isValidBoolean = (something) => {
    if(typeof something === "boolean") return true
    else return false
}

export const isValidArray = (array) => {
    if(Array.isArray(array)) return true
    else return false
}


/* ============== Utils ============== */

export function formatImageURL(image){ // Use this function if you are using images from bucket
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    if(urlPattern.test(image)) return image
    else return process.env.NEXT_PUBLIC_BUCKET ? process.env.NEXT_PUBLIC_BUCKET + image : image
}

export function formatNumber(number){ // 12000 => 12,000
    number = number.toString()
    var pattern = /(-?\d+)(\d{3})/
    while (pattern.test(number))
        number = number.replace(pattern, "$1,$2")
    return number
}

export function formatPrice(amount){ // 12000 => 12,000₮
    if(amount === undefined || amount === null) return false
    amount = amount.toString()
    var pattern = /(-?\d+)(\d{3})/
    while (pattern.test(amount))
        amount = amount.replace(pattern, "$1,$2")
    return amount + '₮'
}

export function timeAgo(date) { // 2024-04-10T12:00:00.000Z => 1ц өмнө
    const now = new Date();
    date = new Date(date);
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) {
        return `${seconds}с өмнө`
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes}${minutes === 1 ? 'м' : 'м'} өмнө`
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours}${hours === 1 ? 'ц' : 'ц'} өмнө`
    } else if (seconds < 2592000) {
        const days = Math.floor(seconds / 86400);
        return `${days}${days === 1 ? 'ө' : 'ө'} өмнө`
    } else if (seconds < 31536000) {
        const months = Math.floor(seconds / 2592000);
        return `${months}${months === 1 ? ' сарын' : 'сарын'} өмнө`
    } else {
        const years = Math.floor(seconds / 31536000);
        return `${years}${years === 1 ? ' жилийн' : 'жилийн'} өмнө`
    }
}

export function formatDateNormal(date){ // 2024-04-10T12:00:00.000Z => 2024.04.10
    date = new Date(date);
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = String(date.getFullYear());
    return `${year}.${month}.${day}`;
}

export function formatDateTimeNormal(date){ // 2024-04-10T12:00:00.000Z => 2024.04.10 12:00
    date = new Date(date);
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = String(date.getFullYear());
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function formatDateLong(date){ // 2024-04-10T12:00:00.000Z => 2024 оны 04-р сарын 10
    date = new Date(date);
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1);
    var year = String(date.getFullYear());
    return `${year} оны ${month}-р сарын ${day}`;
}

export function formatDateTimeLong(date){ // 2024-04-10T12:00:00.000Z => 2024 оны 04-р сарын 10 12:00
    date = new Date(date);
    var day = String(date.getDate());
    var month = String(date.getMonth() + 1);
    var year = String(date.getFullYear());
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year} оны ${month}-р сарын ${day} ${hours}:${minutes}`;
}

export function calcBetweenDates(start, end){ // 2024-04-10T12:00:00.000Z, 2024-04-15T12:00:00.000Z => 5
    let startDate = new Date(start)
    let endDate = new Date(end)
    let diff = endDate - startDate
    let days = diff / (1000 * 60 * 60 * 24)
    return days + 1
}

export function formatTime(seconds){ // 3600 => 01:00:00
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor(seconds / 60) - (hours * 60)
    seconds = seconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

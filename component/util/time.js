const MAX_HOUR = 23;
const MAX_MIN = 59;
const MAX_SEC = MAX_MIN;

const timeStr2Obj = (value='00:00:00', options = {
    simple: false, 
}) => {
    let {simple} = options;
    
    let arr = value.split(':');
    arr = arr.slice(0, 3);

    for (let i = 0; i < arr.length; i++) {
        let item = String(arr[i])
        if (item.length > 2) arr[i] = item.slice(0, 2)
        if (item.length === 1) arr[i] = `0${item}`;
        if (!item) arr[i] = '00';
    };

    let [hour, min, sec] = arr;
    hour = validateUnitByMax(hour, MAX_HOUR);
    min = validateUnitByMax(min, MAX_MIN);
    
    if (options.simple) return { hour, min }

    sec = validateUnitByMax(sec, MAX_SEC);

    return { hour, min, sec }
}

const validateUnitByMax = (value, max) => {
    if (value > max) value = String(Math.floor(value % (max + 1)));
    if (isNaN(value) || value < 0) value = '00';
    if (value.length === 1) value = `0${value}`;
    return value;
}

module.exports = { timeStr2Obj }
export { dateTimeToDateAndTime };

function dateTimeToDateAndTime(dateTime) {
    const date = new Date(dateTime);
    return { date: date.toLocaleDateString(), time: date.toLocaleTimeString() };
}
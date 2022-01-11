export function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " лет";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " месяца(ев)";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " дней";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " часа(ов)";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " минут(ы)";
    }
    return Math.floor(seconds) + " секунд(ы)";
}
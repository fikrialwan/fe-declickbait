const timeConvert = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    if (minutes > 0) {
        return `${minutes} menit ${seconds} detik`;
    }
        return `${seconds} detik`;
}

export default timeConvert;
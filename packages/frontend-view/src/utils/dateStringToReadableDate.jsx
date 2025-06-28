export default function dateStringToReadableDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

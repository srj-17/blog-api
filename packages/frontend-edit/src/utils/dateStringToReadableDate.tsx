export default function dateStringToReadableDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
}

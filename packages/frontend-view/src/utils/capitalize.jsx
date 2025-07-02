export default function capitalize(text) {
    if (typeof text !== "string") {
        return;
    }

    let textArray = text.split(" ");
    textArray = textArray.map((text) => {
        return text[0].toUpperCase() + text.slice(1);
    });

    return textArray.join(" ");
}

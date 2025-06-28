export default function ErrorElement({ statusCode, message }) {
    return (
        <div className="error">
            <div className="code">{statusCode}</div>
            <div className="msg">{message}</div>
        </div>
    );
}

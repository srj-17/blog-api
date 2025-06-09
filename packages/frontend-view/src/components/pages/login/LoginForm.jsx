import FormInputContainer from "../../FormInputContainer";

export default function LoginForm() {
    return (
        <form action="http://localhost:3000/login" method="POST">
            <FormInputContainer>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </FormInputContainer>
            <FormInputContainer>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
            </FormInputContainer>
            <button type="submit">Log In</button>
        </form>
    );
}

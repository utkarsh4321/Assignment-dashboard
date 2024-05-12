import { fireEvent, waitFor, screen } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";

test("Signin Page Initial render", () => {
    const { container, getByText } = renderWithProviders()
    expect(getByText('Sign in')).toBeDefined()
})
test('Signin Form With wrong User', async () => {
    const { container, getByText, user } = renderWithProviders()
    const emailInput = container.querySelector('#email1') as HTMLInputElement;
    const passwordInput = container.querySelector('#password1') as HTMLInputElement;
    expect(emailInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    if (emailInput) {
        fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } })
        expect(emailInput.value).toBe('test@gmail.com')
    }
    if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: 'test@123' } })
        expect(passwordInput.value).toBe('test@123')
    }
    await user.click(getByText('Login'))
    await new Promise((r) => setTimeout(r, 4000))
    await waitFor(() => {
        expect(container.querySelector('.alerts_msg')).toBeDefined()
    })
    expect(getByText('user not found')).toBeDefined()

})
test('Signin Form With Correct User and logout', async () => {
    const { container, getByText, user } = renderWithProviders()
    const emailInput = container.querySelector('#email1') as HTMLInputElement;
    const passwordInput = container.querySelector('#password1') as HTMLInputElement;
    expect(emailInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    if (emailInput) {
        fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } })
        expect(emailInput.value).toBe('eve.holt@reqres.in')
    }
    if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: 'cityslicka' } })
        expect(passwordInput.value).toBe('cityslicka')
    }
    await user.click(getByText('Login'))
    await new Promise((r) => setTimeout(r, 4000))
    expect(screen.getByText('Welcome to dashboard')).toBeInTheDocument();
    await user.click(screen.getByText('Logout'));
    expect(screen.getByText('Sign in')).toBeInTheDocument()
})

test("Don't Have an account", async () => {
    const { getByText, user } = renderWithProviders()
    expect(getByText('sign up')).toBeInTheDocument()
    await user.click(getByText('sign up'));
    expect(screen.getByText('Sign up')).toBeInTheDocument()
})
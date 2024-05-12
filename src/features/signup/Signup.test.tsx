import { fireEvent, waitFor, screen } from "@testing-library/dom";
import { renderWithProviders } from "../../utils/test-utils";

test("SignUp Page Initial render", async () => {
    const { container, getByText, user } = renderWithProviders()
    await user.click(getByText('sign up'));
    expect(getByText('Sign up')).toBeDefined()
})
test('SignUp Form With wrong User', async () => {
    const { container, getByText, user } = renderWithProviders()
    await user.click(getByText('sign up'));
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
    await user.click(getByText('Create'))
    await new Promise((r) => setTimeout(r, 4000))
    await waitFor(() => {
        expect(container.querySelector('.alerts_msg')).toBeDefined()
    })
    expect(getByText('Note: Only defined users succeed registration')).toBeDefined()

})
test('SignUp Form With Correct User', async () => {
    const { container, getByText, user } = renderWithProviders()
    await user.click(getByText('sign up'));
    const emailInput = container.querySelector('#email1') as HTMLInputElement;
    const passwordInput = container.querySelector('#password1') as HTMLInputElement;
    expect(emailInput).toBeDefined()
    expect(passwordInput).toBeDefined()
    if (emailInput) {
        fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } })
        expect(emailInput.value).toBe('eve.holt@reqres.in')
    }
    if (passwordInput) {
        fireEvent.change(passwordInput, { target: { value: 'pistol' } })
        expect(passwordInput.value).toBe('pistol')
    }
    await user.click(getByText('Create'))
    await new Promise((r) => setTimeout(r, 4000))
    expect(screen.getByText('Welcome to dashboard')).toBeInTheDocument()
})

test("Have an account",async()=>{
    const {  getByText, user } = renderWithProviders()
    await user.click(getByText('sign up'));
    expect(getByText('sign in')).toBeInTheDocument()
    await user.click(getByText('sign in'));
    expect(screen.getByText('Sign in')).toBeInTheDocument()
})
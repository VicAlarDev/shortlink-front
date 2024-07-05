<script lang="ts">
    import { _ } from 'svelte-i18n'
    import {
        Envelope,
        Eye,
        EyeSlash,
        Icon,
        LockClosed,
    } from 'svelte-hero-icons'
    import { createEventDispatcher } from 'svelte'
    import { goto } from '$app/navigation'
    import { BACKEND_URL } from '$lib/constants/link'
    import { setCookie } from '$lib/helpers/cookie'

    let email = ''
    let password = ''
    let confirmPassword = ''
    let emailError = ''
    let passwordError = ''
    let confirmPasswordError = ''
    let generalError = ''
    let showPassword = false
    let showConfirmPassword = false

    function togglePasswordVisibility() {
        showPassword = !showPassword
    }

    function toggleConfirmPasswordVisibility() {
        showConfirmPassword = !showConfirmPassword
    }

    function handleEmailInput(event: Event) {
        const target = event.target as HTMLInputElement
        email = target.value
    }

    function handlePasswordInput(event: Event) {
        const target = event.target as HTMLInputElement
        password = target.value
    }

    function handleConfirmPasswordInput(event: Event) {
        const target = event.target as HTMLInputElement
        confirmPassword = target.value
    }

    const dispatch = createEventDispatcher()

    function validateEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    function validatePassword(password: string) {
        const errors = []
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.')
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter.')
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter.')
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one digit.')
        }
        if (!/[!@#$%^&.*]/.test(password)) {
            errors.push('Password must contain at least one special character.')
        }
        return errors
    }

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        emailError = ''
        passwordError = ''
        confirmPasswordError = ''
        generalError = ''

        if (!validateEmail(email)) {
            emailError = 'Invalid email address'
            return
        }

        const passwordValidationErrors = validatePassword(password)
        if (passwordValidationErrors.length > 0) {
            passwordError = passwordValidationErrors.join(' ')
            return
        }

        if (password !== confirmPassword) {
            confirmPasswordError = 'Passwords do not match'
            return
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                try {
                    const response = await fetch(`${BACKEND_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    })

                    if (response.ok) {
                        const data = await response.json()
                        console.log(data)
                        setCookie('shortlink-token', data.token, 1, 'Lax')
                        goto('/dashboard')
                    } else {
                        const errorData = await response.json()
                        generalError = errorData.error || 'Failed to login'
                    }
                } catch (error) {
                    generalError = 'Failed to login'
                }
            } else {
                const errorData = await response.json()
                generalError = errorData.message || 'Failed to register'
            }
        } catch (error) {
            generalError = 'Failed to register'
        }
    }
</script>

<form class="form" on:submit={handleSubmit}>
    <div class="flex-column">
        <label for="email">{$_('email')}</label>
    </div>
    <div class="inputForm">
        <div class="icon-container">
            <Icon src={Envelope} alt="email" class="w-6 h-6" />
        </div>
        <input
            name="email"
            type="text"
            class="input"
            placeholder={$_('placeholder_email')}
            value={email}
            on:input={handleEmailInput}
        />
    </div>
    {#if emailError}
        <p class="text-sm text-red-500">{emailError}</p>
    {/if}

    <div class="flex-column">
        <label for="password">{$_('password')}</label>
    </div>
    <div class="inputForm">
        <div class="icon-container">
            <Icon src={LockClosed} alt="password" class="w-6 h-6" />
        </div>
        <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            class="input"
            placeholder={$_('placeholder_password')}
            value={password}
            on:input={handlePasswordInput}
        />
        <button
            type="button"
            class="password-toggle"
            on:click={togglePasswordVisibility}
        >
            <Icon
                src={showPassword ? EyeSlash : Eye}
                alt="eye"
                class="w-6 h-6"
            />
        </button>
    </div>
    {#if passwordError}
        <p class="text-sm text-red-500">{passwordError}</p>
    {/if}

    <div class="flex-column">
        <label for="confirmPassword">{$_('confirm_password')}</label>
    </div>
    <div class="inputForm">
        <div class="icon-container">
            <Icon src={LockClosed} alt="confirmPassword" class="w-6 h-6" />
        </div>
        <input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            class="input"
            placeholder={$_('placeholder_confirm_password')}
            value={confirmPassword}
            on:input={handleConfirmPasswordInput}
        />
        <button
            type="button"
            class="password-toggle"
            on:click={toggleConfirmPasswordVisibility}
        >
            <Icon
                src={showConfirmPassword ? EyeSlash : Eye}
                alt="eye"
                class="w-6 h-6"
            />
        </button>
    </div>
    {#if confirmPasswordError}
        <p class="text-sm text-red-500">{confirmPasswordError}</p>
    {/if}

    {#if generalError}
        <p class="-mb-0 text-sm text-center text-red-500">{generalError}</p>
    {/if}
    <button type="submit" class="button-submit">{$_('register')}</button>
    <p class="p">
        {$_('already_have_account')}
        <a href="/login" class="span">{$_('login')}</a>
    </p>
</form>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: radial-gradient(
                circle,
                rgba(104, 67, 181, 0.5) 0%,
                rgba(25, 20, 40, 1) 100%
            ),
            rgba(25, 20, 40, 1);
        padding: 30px;
        width: 100%;
        max-width: 450px;
        border-radius: 20px;
        font-family: 'Poppins';
        margin: 0 auto; /* Center form horizontally */
    }

    ::placeholder {
        font-family: 'Poppins';
    }

    .form button {
        align-self: flex-end;
    }

    .flex-column > label {
        color: #b7aeca;
        font-weight: 600;
    }

    .inputForm {
        border: 1.5px solid #b7aeca;
        color: #b7aeca;
        border-radius: 10px;
        background-color: #120e1e;
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        transition: 0.2s ease-in-out;
    }

    .input {
        flex-grow: 1;
        margin-left: 10px;
        border-radius: 10px;
        border: none;
        height: 100%;
        background-color: transparent;
        font-family: 'Poppins';
        padding: 0 10px;
    }

    .input:focus {
        outline: none;
    }

    .inputForm:focus-within {
        border: 1.5px solid #2d79f3;
    }

    .password-toggle {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 40px; /* Ensures the button has a proper width */
    }

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 100%;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        justify-content: space-between;
    }

    .span {
        font-size: 14px;
        margin-left: 5px;
        color: #2d79f3;
        font-weight: 500;
        cursor: pointer;
        font-family: 'Poppins';
    }

    .button-submit {
        margin: 20px 0 10px 0;
        background: linear-gradient(
            135deg,
            rgba(104, 67, 181, 1) 0%,
            rgba(65, 38, 119, 1) 100%
        );
        border: none;
        color: white;
        font-size: 20px;
        font-weight: 500;
        border-radius: 10px;
        height: 50px;
        width: 100%;
        cursor: pointer;
        font-family: 'Josefin Sans';
    }

    .button-submit:hover {
        background-color: #252727;
    }

    .p {
        text-align: center;
        color: #b7aeca;
        font-size: 14px;
        margin: 5px 0;
        font-family: 'Poppins';
    }

    .btn {
        font-family: 'Josefin Sans';
        margin-top: 10px;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        gap: 10px;
        border: 1px solid #ededef;
        background-color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
    }

    .btn:hover {
        border: 1px solid #2d79f3;
    }
</style>

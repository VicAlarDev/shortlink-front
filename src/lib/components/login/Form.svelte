<script lang="ts">
    import { Envelope, Eye, Icon, LockClosed } from 'svelte-hero-icons'
    import Google from './Google.svelte'
    import { createEventDispatcher } from 'svelte'
    import { goto } from '$app/navigation'
    import { getCookie, setCookie, eraseCookie } from '../../helpers/cookie'

    let email = ''
    let password = ''
    let emailError = ''
    let passwordError = ''
    let generalError = ''

    const dispatch = createEventDispatcher()

    function validateEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        emailError = ''
        passwordError = ''
        generalError = ''

        if (!validateEmail(email)) {
            emailError = 'Invalid email address'
            return
        }

        if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters long'
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
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
                generalError = errorData.message || 'Failed to login'
            }
        } catch (error) {
            generalError = 'Failed to login'
        }
    }
</script>

<form class="form" on:submit={handleSubmit}>
    <div class="flex-column">
        <label for="email">Email </label>
    </div>
    <div class="inputForm">
        <Icon src={Envelope} alt="email" class="w-6 h-6" />
        <input
            name="email"
            type="text"
            class="input"
            placeholder="Enter your Email"
            bind:value={email}
        />
    </div>
    {#if emailError}
        <p class="text-red-500 text-sm">{emailError}</p>
    {/if}

    <div class="flex-column">
        <label for="password">Password </label>
    </div>
    <div class="inputForm">
        <Icon src={LockClosed} alt="password" class="w-6 h-6" />
        <input
            name="password"
            type="password"
            class="input"
            placeholder="Enter your Password"
            bind:value={password}
        />
        <Icon src={Eye} alt="eye" class="w-6 h-6 mr-4" />
    </div>
    {#if passwordError}
        <p class="text-red-500 text-sm">{passwordError}</p>
    {/if}

    <div class="flex-row">
        <span class="span">Forgot password?</span>
    </div>
    {#if generalError}
        <p class="text-red-500 text-sm text-center -mb-0">{generalError}</p>
    {/if}
    <button type="submit" class="button-submit">Sign In</button>
    <p class="p">Don't have an account? <span class="span">Sign Up</span></p>
    <p class="p line">Or With</p>

    <div class="flex-row">
        <button class="btn google">
            <Google />
            Google
        </button>
    </div>
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
        width: 450px;
        border-radius: 20px;
        font-family: 'Poppins';
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
        margin-left: 10px;
        border-radius: 10px;
        border: none;
        width: 85%;
        height: 100%;
        background-color: transparent;
        font-family: 'Poppins';
    }

    .input:focus {
        outline: none;
    }

    .inputForm:focus-within {
        border: 1.5px solid #2d79f3;
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

import { createSignal } from 'solid-js'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = createSignal(false)
    const [email, setEmail] = createSignal('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            if (error) throw error
            alert('Check your email for the login link')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div class="flex items-center">
            <div class="w-1/2 flex flex-col gap-[20px]" aria-live="polite">
                <h1>Supabase + SolidJS</h1>
                <p>Sign in via magic link with your email below</p>
                <form class="flex flex-col gap-[20px]" onSubmit={handleLogin}>
                    <div>
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={email()}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" class="block" aria-live="polite">
                            { loading() ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
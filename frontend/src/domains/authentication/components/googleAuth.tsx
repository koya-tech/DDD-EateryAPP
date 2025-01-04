function GoogleLogin() {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3001/auth/google';
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleGoogleLogin}
            >
                Login with Google
            </button>
        </div>
    );
}

export default GoogleLogin;

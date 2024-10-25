// const GOOGLE_CLIENT_ID =
// '868129029221-4mp7jhnjnb8rmp7ckabgcpfuskjg8k6c.apps.googleusercontent.com';
// const REDIRECT_URI = 'http://localhost:3001/auth/google'; // Backend endpoint

function GoogleLogin() {
    const handleGoogleLogin = () => {
        // Redirect user to backend Google auth endpoint
        // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
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

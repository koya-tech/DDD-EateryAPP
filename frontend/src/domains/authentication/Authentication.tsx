import { Link } from 'react-router-dom';
import AuthForm from './components/authForm';
import GoogleLogin from './components/googleAuth';
// import cn from '../../lib/utils';
// import { buttonVariants } from '../../shadcn/ui/button';

export default function AuthenticationPage() {
    return (
        <div className="flex border-t">
            <div className="basis-1/2">
                <img
                    src="/forAuth.jpg"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
            </div>
            <div className="basis-1/2 items-center justify-center">
                <div className="h-full mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <AuthForm />
                    <GoogleLogin />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our
                        <br />
                        <Link
                            to="/terms"
                            className="text-primary hover:underline"
                        >
                            Terms of Service
                        </Link>
                        <br />
                        {' '}
                        and
                        {' '}
                        <br />
                        <Link
                            to="/privacy"
                            className="text-primary hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

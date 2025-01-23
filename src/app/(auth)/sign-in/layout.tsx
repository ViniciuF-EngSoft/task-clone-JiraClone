interface SignInLayoutProps{
    children: React.ReactNode
}

const SignInLayout = ({children}:SignInLayoutProps) => {
    return (
        <div className="flex flex-col ">
            <nav className="bg-blue-400 h-20">
                NAVBAR
            </nav>
            SignIn layout
            {children}
        </div>
    );
}

export default SignInLayout;

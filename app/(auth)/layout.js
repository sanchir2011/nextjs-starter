export default async function AuthLayout({ children }) {
    return (
        <div className="flex justify-center items-center mt-12 md:mt-28">
            {children}
        </div>
    );
}

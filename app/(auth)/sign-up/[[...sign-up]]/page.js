import { SignUp } from "@clerk/nextjs";

const Page = () => {
    return ( 
        <main className="h-screen flex items-center justify-center p-4">
            <SignUp />
        </main>
    );
}
 
export default Page;
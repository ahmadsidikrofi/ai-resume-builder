import { SignIn } from "@clerk/nextjs";

const Page = () => {
    return ( 
        <main className="flex h-screen items-center p-4 justify-center">
            <SignIn />
        </main>
    );
}
 
export default Page;
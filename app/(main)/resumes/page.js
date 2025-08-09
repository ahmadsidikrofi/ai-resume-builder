import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export const metadata = () => {
    title: "Your Resumes"
}

const Page = () => {
    return ( 
        <main className="max-w-7xl w-full mx-auto px-3 py-6 space-y-6">
            <Button asChild className="mx-auto flex w-fit gap-2">
                <Link href="/editor">
                    <PlusSquare className="size-5" /> New Resume
                </Link>
            </Button>
        </main>
    );
}
 
export default Page;
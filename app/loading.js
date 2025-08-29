import { ResumeLoading } from "@/components/ResumeLoading";
import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        // <Loader2 className="size-8 mx-auto my-6 animate-spin"/>
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Load all your creation</h1>
                    <p className="text-muted-foreground">Resumind: The intelligence behind your perfect resume.</p>
                </div>

                <ResumeLoading message="Generating your professional resume..." />
            </div>
        </main>
    );
}

export default Loading;
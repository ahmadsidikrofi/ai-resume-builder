import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import previewImage from "@/assets/resume-preview.jpg"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-6 bg-gray-100 px-6 py-12 text-gray-900 text-center md:text-start md:flex-row lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image 
          src={logo}
          width={180}
          height={180}
          alt="Logo"
          className="md:ms-0 max-sm:mx-auto mx-auto md:mx-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl tracking-tight">
          Let {" "}
          <span className="inline-block bg-gradient-to-tr from-violet-500 to-blue-400 text-transparent bg-clip-text">
            Resumind think,
          </span> {" "}
          so your resume can shine
        </h1>
        <p className="text-lg text-gray-500">
          From <span className="font-bold">fresh graduates </span> to seasoned professionals <span className="bg-gradient-to-tr from-violet-500 to-blue-400 text-transparent bg-clip-text font-bold">Resumind</span> makes it easy to create a polished, professional resume in just a few minutes.
        </p>
        <Button asChild size="lg" variant="premium" className="">
          <Link href="/resumes">
            Get started
          </Link>
        </Button>
      </div>
      <div>
        <Image 
          src={previewImage}
          width={500}
          alt="Resume Preview"
          className="shadow-lg hover:shadow-md lg:rotate-[1.5deg] lg:hover:rotate-[5deg] transition-all ease-in duration-300"
        />
      </div>
    </main>
  );
}

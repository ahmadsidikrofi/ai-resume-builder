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
          width={160}
          height={160}
          alt="Logo"
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl tracking-tight">
          Create a {" "}
          <span className="inline-block bg-gradient-to-tr from-green-600 to-green-400 text-transparent bg-clip-text">
            Perfect Resume
          </span> {" "}
          in Minutes
        </h1>
        <p className="text-lg text-gray-500">
          Our <span className="font-bold">AI resume builder</span> helps you design a professional resume even if you&apos;re not very smart
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

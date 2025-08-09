"use client"

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./footer";
import { useState } from "react";
import ResumePreviewSection from "./ResumePreviewSection";

const ResumeEditor = () => {
    const searchParams = useSearchParams()
    const [ resumeData, setResumeData ] = useState({})
    const currentStep = searchParams.get("step") || steps[0].key

    function setStep(key) {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step", key)
        window.history.pushState(null, "", `?${newSearchParams.toString()}`)
    }

    const FormComponent = steps.find(
        (step) => step.key === currentStep
    )?.component


    return ( 
        <div className="flex grow flex-col">
            <header className="space-y-2 border-b px-3 py-5 text-center">
                <h1 className="text-xl font-bold text-green-500">Design you resume</h1>
                <p className="text-muted-foreground text-sm">
                    Follow the steps bellow to create your resume. Your progress 
                    will be saved automatically.
                </p>
            </header>
            <main className="relative grow">
                <div className="absolute bottom-0 top-0 flex w-full">
                    <div className="md:w-1/2 w-full p-3 overflow-y-auto space-y-6">
                        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
                        {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData} /> }
                    </div>
                    <div className="grow md:border-r" />
                    <ResumePreviewSection 
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                </div>
            </main>
            <Footer currentStep={currentStep} setCurrentStep={setStep} />
        </div>
    );
}
 
export default ResumeEditor;
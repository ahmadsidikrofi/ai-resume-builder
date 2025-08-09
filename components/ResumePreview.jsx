import useDimensions from "@/app/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { format, formatDate } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";

const ResumePreview = ({ resumeData, className }) => {
    const containerRef = useRef(null)
    const { width } = useDimensions(containerRef)

    const PersonalInfoHeader = ({ resumeData }) => {
        const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHext, borderStyle } = resumeData
        const [ photoSrc, setPhotoSrc ] = useState(photo instanceof File ? "" : photo)

        useEffect(() => {
            const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ""
            if (objectUrl) setPhotoSrc(objectUrl)
            if (photo === null) setPhotoSrc("")
            return () => URL.revokeObjectURL(objectUrl)
        }, [photo])

        return (
            <div className="flex items-center gap-6">
                {photoSrc && (
                    <Image 
                        src={photoSrc}
                        width={100}
                        height={100}
                        alt="Author Photo"
                        className="aspect-square object-cover"
                    />
                )}
                <div className="space-y-2.5">
                    <div className="space-y-1">
                        <p className="text-3xl font-bold">{firstName} {lastName}</p>
                        <p className="font-medium">{jobTitle}</p>
                        <p className="text-xs text-gray-500">
                            {city}
                            {city && country ? ", " : ""}
                            {country}
                            {(city || country) && (phone || email) ? " • " : ""}
                            {[phone, email].filter(Boolean).join(" • ")}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const SummarySection = ({ resumeData }) => {
        const { summary } = resumeData
        if (!summary) return null

        return (
            <>
                <hr className="border-2"/>
                <div className="break-inside-avoid space-y-3">
                    <p className="text-lg font-semibold">Professional profile</p>
                    <div className="whitespace-pre-line text-sm">{ summary }</div>
                </div>
            </>
        )
    }

    const WorkExperienceSection = ({ resumeData }) => {
        const { workExperiences } = resumeData
        
        const workExperiencesNotEmpty = workExperiences?.filter((exp) => Object.values(exp).filter(Boolean).length > 0)
        if (!workExperiencesNotEmpty?.length) return null

        return (
          <>
            <hr className="border-2" />
            <div className="space-y-3">
              <p className="text-lg font-semibold">Woek experience</p>
              {workExperiencesNotEmpty.map((exp, i) => (
                <div key={i} className="break-inside-avoid space-y-1">
                    <div className="flex items-center justify-between text-sm font-semibold">
                        <span>{exp.position}</span>
                        {exp.startDate && (
                            <span>
                                {formatDate(exp.startDate, "MM/yyyy")} - {" "}
                                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                            </span>
                        )}
                    </div>
                    <p className="text-xs font-semibold">{exp.company}</p>
                    <div className="whitespace-pre-line text-xs ">{exp.description}</div>
                </div>
              ))}
            </div>
          </>
        );
    }

    const EducationSection = ({ resumeData }) => {
        const { educations } = resumeData
        const educationsNotEmpty = educations?.filter((edu) => Object.values(edu).filter(Boolean).length > 0)
        if (!educationsNotEmpty?.length) return null

        return (
          <>
            <hr className="border-2" />
            <div className="space-y-3">
              <p className="text-lg font-semibold">Education</p>
              {educationsNotEmpty.map((edu, i) => (
                <div key={i} className="break-inside-avoid space-y-1">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{edu.degree}</span>
                    {edu.startDate && (
                      <span>
                        {formatDate(edu.startDate, "MM/yyyy")} -{" "}
                        {edu.endDate
                          ? formatDate(edu.endDate, "MM/yyyy")
                          : "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold">{edu.school}</p>
                </div>
              ))}
            </div>
          </>
        );
    }

    const SkillsSection = ({ resumeData }) => {
        const { skills } = resumeData
        if (!skills?.length) return null

        return (
          <>
            <hr className="border-2" />
            <div className="break-inside-avoid space-y-3">
              <p className="text-lg font-semibold">Skills</p>
              <div className="break-inside-avoid flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge className="bg-black text-white" key={i}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        );
    } 

    return ( 
        <div className={cn("h-fit w-full aspect-[210/297] bg-white text-black", className)}
            ref={containerRef}
        >
            <div
                className={cn("space-y-6 p-6", !width && "invisible")} 
                style={{ 
                    zoom: (1 / 794) * width
                }}
            >
                <PersonalInfoHeader resumeData={resumeData}/>
                <SummarySection resumeData={resumeData}/>
                <WorkExperienceSection resumeData={resumeData}/>
                <EducationSection resumeData={resumeData}/>
                <SkillsSection resumeData={resumeData}/>
            </div>
        </div>
    )
}
 
export default ResumePreview;
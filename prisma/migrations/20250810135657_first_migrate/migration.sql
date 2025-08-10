-- CreateTable
CREATE TABLE "public"."resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "summary" TEXT,
    "photoUrl" TEXT,
    "colorHex" TEXT NOT NULL DEFAULT '#000000',
    "borderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."work_experiences" (
    "id" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."educations" (
    "id" TEXT NOT NULL,
    "degree" TEXT,
    "school" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."work_experiences" ADD CONSTRAINT "work_experiences_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."educations" ADD CONSTRAINT "educations_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

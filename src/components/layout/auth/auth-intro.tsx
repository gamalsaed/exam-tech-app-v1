import React from "react";
import Image from "next/image";
import AppFeatureAd from "@/components/skeletons/app-featchers-ad";

// The left side in auth pages
export default function AuthIntro() {
  return (
    <div className="w-2/4  bg-blue-50 h-full flex justify-center items-center relative z-10  overflow-hidden backdrop-blur-sm max-md:hidden">
      <div className="w-3/5">
        <header className="flex gap-2 mb-32 font-semibold items-center">
          <Image
            width={40}
            height={40}
            src="/assets/icons/folder-code.svg"
            alt="code"
          />
          <p className="text-blue-600 text-xl">Exam App</p>
        </header>
        <div>
          <h1 className="font-bold text-3xl mb-14">
            Empower your learning journey with our smart exam platform.
          </h1>
          <div className="flex flex-col gap-9">
            <AppFeatureAd
              title="Tailored Diplomas"
              description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
              img="/assets/icons/brain.svg"
            />
            <AppFeatureAd
              title="Focused Exams"
              description="Access topic-specific tests including HTML, CSS, JavaScript, and more."
              img="/assets/icons/book-open-check.svg"
            />
            <AppFeatureAd
              title="Smart Multi-Step Forms"
              description="Choose from specialized tracks like Frontend, Backend, and Mobile Development."
              img="/assets/icons/rectangle-ellipsis.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-96 h-96 bg-blue-600 opacity-20  blur-3xl rounded-full absolute -z-10 -right-14 top-12"></div>
      <div className="w-96 h-96 bg-blue-600 opacity-20  blur-3xl rounded-full absolute -z-10 -left-12 -bottom-10"></div>
    </div>
  );
}

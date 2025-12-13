import React from "react";
import Image from "next/image";

type AppAppFeatureProps = {
  title: string;
  img: string;
  description: string;
};

export default function AppFeatureAd({
  title,
  img,
  description,
}: AppAppFeatureProps) {
  // the content inside the left side screen in the auth pages

  return (
    <div className="font-mono flex gap-5">
      <Image
        width={35}
        height={35}
        src={img}
        alt="brain"
        className="border-2 border-blue-600 h-fit p-1"
      />
      <div>
        <h1 className="text-blue-600 text-xl mb-2.5">{title}</h1>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}

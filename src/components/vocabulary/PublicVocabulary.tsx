import { getAllSectionPublic } from "@/app/vocabulary/action"
import BackgroundUniverse from "@/components/background/BackgroundUniverse"
import Link from "next/link"
import Image from "next/image"
import React from "react"

const PublicVocabulary = async () => {
  const res = await getAllSectionPublic(1, 4)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {res.sections.map((section) => {
        return (
          <Link href={`/vocabulary/learn/${section.id}`} key={section.id}>
            <div
              className="rounded-lg border dark:bg-transparent dark:border-gray-600 dark:text-white p-4 
            flex flex-col gap-2 shadow-md hover:cursor-pointer hover:shadow-xl 
            transition-all duration-300 ease-linear dark:hover:border-gray-300"
            >
              <p className="text-lg line-clamp-1 font-semibold">{section.title}</p>
              <div className="font-bold w-fit flex-1 text-xs border border-green-600 bg-green-100 text-green-600 px-2 rounded-md">
                {section.length} thuật ngữ
              </div>

              <div className="flex gap-2 items-center">
                <Image
                  alt="avatar"
                  src={section.user.photoURL}
                  width={26}
                  height={26}
                  className="rounded-full"
                />
                <p>{section.user.displayName}</p>
              </div>
            </div>
          </Link>
        )
      })}
      <BackgroundUniverse />
    </div>
  )
}

export default PublicVocabulary

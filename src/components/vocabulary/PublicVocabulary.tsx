/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { getAllSectionPublic } from "@/app/vocabulary/action"
import BackgroundUniverse from "@/components/background/BackgroundUniverse"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Loading from "@/components/ui/Loading"

const PublicVocabulary = () => {
  const [listSection, setListSection] = React.useState<any[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  const handleGetAllSectionPublic = async () => {
    const res = await getAllSectionPublic(currentPage, 12) // limit
    if (res.success) {
      setListSection(res.sections)
      setTotalPage(res.totalPage)
      setCurrentPage(res.currentPage)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetAllSectionPublic()
  }, [currentPage])

  if (loading) {
    return <Loading />
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pb-16 md:pb-0">
      {listSection.map((section: any) => {
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
      <div className="col-span-2 md:col-span-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:cursor-pointer"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1)
                  }
                }}
              />
            </PaginationItem>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                <PaginationItem
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 hover:bg-slate-300 hover:cursor-pointer rounded-md ${
                    currentPage === page ? " bg-slate-200 dark:bg-slate-600" : ""
                  }`}
                >
                  {page}
                </PaginationItem>
              ))}
            </div>
            <PaginationItem>
              <PaginationNext
                className="hover:cursor-pointer"
                onClick={() => {
                  if (currentPage < totalPage) {
                    setCurrentPage(currentPage + 1)
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default PublicVocabulary

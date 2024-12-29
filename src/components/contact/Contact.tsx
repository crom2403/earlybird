import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import Image from "next/image"
import React from "react"

const Contact = () => {
  return (
    <div className="relative">
      <section className="mx-auto w-full md:w-[1000px] lg:flex-row flex items-center gap-4 flex-col justify-between bg-transparent p-[30px] rounded-xl">
        {/* form area */}
        <form className="lg:w-[60%] w-full">
          <div className="lg:w-[80%] w-full mx-auto">
            <div className="dark:text-white">
              <h1 className="text-[1.7rem] font-[600] leading-[35px]">
                Let’s connect constellations
              </h1>
              <p className="text-[0.9rem] mt-2 mb-8">
                Let&quot;s align our constellations! Reach out and let the magic of collaboration
                illuminate our skies.
              </p>
            </div>

            <div className="flex sm:flex-row flex-col items-center gap-[20px]">
              <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                <input
                  type="text"
                  placeholder="Your name"
                  className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-slate-100 dark:bg-[#22222f] text-gray-400 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-slate-100 dark:bg-[#22222f] text-gray-400 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[5px] w-full mt-[20px]">
              <textarea
                placeholder="Write message"
                className="peer min-h-[200px] border-[#383844] border rounded-md outline-none px-4 bg-slate-100 dark:bg-[#22222f] py-3 w-full text-gray-400 transition-colors duration-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full`}
            >
              Send it to the moon
            </button>
          </div>
        </form>

        {/*  image  */}
        <div className="">
          <Image
            src="https://i.ibb.co/h7rjVJS/Image.png"
            alt="image"
            width={800}
            height={800}
            className="min-w-full md:w-full h-full object-cover"
          />
        </div>
      </section>
      <ShootingStars className="absolute inset-0 z-[-1]" />
      <StarsBackground className="absolute inset-0 z-[-2]" />
    </div>
  )
}

export default Contact

"use client";

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        const scrollPosition = window.screenY;
        const scrollThreshold = 100;
    }, []) 

    return (
        <section className='w-full pt-36 md:pt-48 pb-10' suppressHydrationWarning>
            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
                        Your AI Career Coach for
                        <br />
                        Professional Success
                    </h1>
                    <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                        Advance your career with personalised guidance, interview prep, and AI-powered tools for job success.
                    </p>
                </div>

                <div className='flex justify-center items-center'>
                    <Link href='/dashboard'>
                        <Button size='lg' className='px-8 cursor-pointer'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className='hero-image-wrapper mt-5 md:mt-0'>
                    <div ref={imageRef} className='hero-image'>
                        <Image
                            src={"/banner.jpeg"}
                            width={1080}
                            height={720}
                            alt='Banner image'
                            className='rounded-lg shadow-2xl border mx-auto'
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
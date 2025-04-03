import React from 'react'
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton, Bu } from '@clerk/nextjs'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from './ui/dropdown-menu'
import { ChevronDown, FileText, GraduationCap, PenBox, Route, StarsIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
    await checkUser();
    return (
        <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60' suppressHydrationWarning>
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between' suppressHydrationWarning>
                <Link href='/'>
                    <Image src="/logo.png" alt='Sensai Logo' width={200} height={60} className='h-12 py-1 w-auto object-contain' />
                </Link>

                <div className='flex items-center space-x-2 md:space-x-4'>
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button variant='outline' className='cursor-pointer'>
                                <LayoutDashboard className='h-4 w-4' />
                                <span className='hidden md:block'>Industry Insights</span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button className='cursor-pointer'>
                                    <StarsIcon className='h-4 w-4' />
                                    <span className='hidden md:block'>Growth Tools</span>
                                    <ChevronDown className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={'/resume'} className='flex items-center gap-2 cursor-pointer'>
                                        <FileText className='h-4 w-4' />
                                        <span>Build Resume</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/ai-cover-letter'} className='flex items-center gap-2 cursor-pointer'>
                                        <PenBox className='h-4 w-4' />
                                        <span>Cover Letter</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/interview'} className='flex items-center gap-2 cursor-pointer' >
                                        <GraduationCap className='h-4 w-4' />
                                        <span>Interview Prep</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/roadmap'} className='flex items-center gap-2 cursor-pointer' >
                                        <Route className='h-4 w-4' />
                                        <span>Roadmap</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button variant='outline' className='cursor-pointer'>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default Header
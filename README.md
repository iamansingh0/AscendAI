This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<hr/>

# Development

## Create a new Next.js project

Run this command to create a new nextjs project

```bash
npx create-next-app@latest
```

- Use TypeScript: No
- Use ESLint: Yes
- Use Tailwind CSS: Yes
- Code inside of src: No
- Use App Router: Yes
- Use Turbopack: Yes
- Customize the import Alias: No

Run this app using the following command:

```bash
npx run dev
```

## Install Shadcn UI and Components
Go to [Shadcn UI](https://ui.shadcn.com/docs/installation/next) for documentation. <br/>
Run ```npx shadcn@latest init``` to install the shadcn UI in our project.

We can install required components using this command:
```bash
npx shadcn@latest add accordion badge alert-dialog card dialog dropdown-menu input label progress radio-group select sonner tabs textarea
```

√ How would you like to proceed? » Use --legacy-peer-deps

### Dark Mode
- To implement the dark mode using the Shadcn UI, go to this [documentation](https://ui.shadcn.com/docs/dark-mode/next) or you can run this command:
```bash
npm install next-themes
```
- Create a **theme-provider.jsx** file inside components folder with the following code:
```javascript
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- Import ThemeProvider in layout.js file and wrap the children components inside it.
```javascript
import { ThemeProvider } from "@/components/theme-provider"

....

<ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
    {children}
</ThemeProvider>
```

## Configuring Clerk for User Authentication and Management
[Clerk](https://clerk.com/) gives us access to prebuilt components, React hooks, and helpers to make user authentication easier.
<br/>

Create a new App in Clerk with the given settings.
<div style="text-align: center;">
  <img src="public/image.png" height="280px" width="500px" />
</div>

Then just follow the steps given by the clerk documentation.
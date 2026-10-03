import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mira — Understand your health',description:'Understand your health. Discover what works for you. Bring everyday habits, health data and trusted evidence together with Mira.',icons:{icon:'/favicon.svg?v=mira'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

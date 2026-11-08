import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'EMT Study Room',description:'Learn together. Keep your own space. EMT notes, flashcards and focused practice.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

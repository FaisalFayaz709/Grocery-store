// import Navbar from '@/components/ui/Navbar'
// import './globals.css'
// import { usePathname } from 'next/navigation';


// export const metadata = {
//   title: 'Grocery Store - Fresh & Healthy',
//   description: 'Get your daily groceries delivered to your doorstep',
// }

// export default function RootLayout({ children }) {
//     const pathname = usePathname();
//    const isAdmin = pathname.startsWith("/Admin");

//   return (
//     <html lang="en">
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
//           rel="stylesheet"
//         />
//       </head>
     
//       <body className="font-[Poppins] antialiased">
//           {!isAdmin && <Navbar />} 
//         {children}
//       </body>
//     </html>
//   )
// }


// import Navbar from '@/components/ui/Navbar'
import ClientLayout from './ClientLayout'
import './globals.css'

export const metadata = {
  title: 'Grocery Store - Fresh & Healthy',
  description: 'Get your daily groceries delivered to your doorstep',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-[Poppins] antialiased">
       <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



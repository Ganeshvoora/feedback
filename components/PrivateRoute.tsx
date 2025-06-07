// // components/PrivateRoute.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";


interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check if the session is loading or if the user is not authenticated
  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  if (!session) {
    router.push("/signin"); // Redirect to the sign-in page if not authenticated
    return <div>Redirecting...</div>; // Optionally show a "Redirecting" message
  }

  // If the user is authenticated, show the protected content
  return <><SessionProvider >{children}</SessionProvider></>;
};

export default PrivateRoute;



// "use client";

// import React from 'react';
// import { useRouter } from "next/navigation";
// import { getCookie } from 'cookies-next';
// import { useEffect, useState } from 'react';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
//   useEffect(() => {
//     // Check authentication on the client side
//     const cookie = getCookie("next-auth.session-token");
//     console.log("Cookie:", cookie);
//     if (cookie=== undefined) {
//       router.push("/signin");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, []);
  
//   if (isAuthenticated === null) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }
  
//   if (!isAuthenticated) {
//     return <div className="text-center p-8">Redirecting to login...</div>;
//   }
  
//   return <>{children}</>;
// };

// export default PrivateRoute;



// "use client";

// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const { status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect("/signin");
//     },
//   });

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;
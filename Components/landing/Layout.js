// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Head from "next/head";
// import { NextSeo } from "next-seo";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actionCreators } from "@/store";
// import { fetchWrapper } from "../../helpers";
// import { BASE_URL } from "../../config";

// const Layout = ({ children, title, canonicalUrl, isWebinar }) => {
//   const router = useRouter();
//   const pathName = router.pathname;
//   const asPath = router.asPath;

//   const dispatch = useDispatch();
//   const { isUserLoggedIn, setSingleUser, logout } = bindActionCreators(
//     actionCreators,
//     dispatch
//   );
//   const auth = useSelector((state) => state.auth);

//   useEffect(async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     isUserLoggedIn();

//     if (auth.isAuthenticated) {
//       if (user._id) {
//         try {
//           const res = await fetchWrapper.get(`${BASE_URL}/user/${user._id}`);
//           const resJSon = await res.json();

//           const data = resJSon.data;

//           if (res.ok) {
//             if (data.isAdmin !== auth.user.isAdmin) {
//               logout();
//             }

//             setSingleUser(data);
//           } else {
//             setSingleUser("");
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//   }, [auth.isAuthenticated]);

//   useEffect(() => {
//     if (pathName) {
//       if (asPath) {
//         const asPathArray = asPath.split("?");
//         const params = asPathArray[1];
//         if (params) {
//           localStorage.setItem("urlParams", params);
//         }
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const urlParams = localStorage.getItem("urlParams");
//     if (urlParams) {
//       router.replace(`${pathName}?${urlParams}`);
//     }
//   }, [pathName]);

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "Digitalexplora",
//     alternateName: "Digital Explora",
//     url: "https://www.digitalexplora.in",
//     logo: "https://www.digitalexplora.in/logo.png",
//     sameAs: [
//       "https://www.facebook.com/thedigitalexplora",
//       "https://www.twitter.com/thedigitalexplora",
//       "https://www.instagram.com/thedigitalexplora",
//       "https://www.youtube.com/channel/UCz1Q5ErhfQhEMHCIuLQSa6g",
//       "https://www.linkedin.com/company/digitalexplora/",
//       "https://www.digitalexplora.in",
//     ],
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <NextSeo
//         title={title}
//         description="Digitalexplora is a place where you can learn marketing and sales and also learn how to apply it. Digitalexplora don't just give you the information but powers you with the right software and tools."
//       />
//       <Head>
//         <link rel="canonical" href={canonicalUrl} />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />

//         {/* Global site tag (gtag.js) - Google Analytics */}
//         <script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-QP2YWHHDHY"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `window.dataLayer = window.dataLayer || [];
//             function gtag(){
//               dataLayer.push(arguments)
//             }
            
//             gtag('js', new Date()); gtag('config', 'G-QP2YWHHDHY')`,
//           }}
//         ></script>
//       </Head>

//       <Navbar />
//       {children}
//       <Footer isWebinar={isWebinar} />
//     </div>
//   );
// };
// export default Layout;
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer isWebinar />
    </div>
  )
}

export default Layout
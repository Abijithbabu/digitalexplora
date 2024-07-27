import Head from "next/head";
import LoginForm from "../Components/LoginForm";

function Login() {
  return (
    <>
      <Head>
        <title>Sign in to Digital Explora</title>
        <meta name="description" content="Sign in to digital explora" />
        <meta name="keywords" content="digital explora, affiliate, kerala" />
        <meta name="author" content="Digital Explora" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.digitalexplora.in/login" />
      </Head>
      <LoginForm />
    </>
  );
}

export default Login;

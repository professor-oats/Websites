import Image from "next/image"
import VerifyEmail from "@/components/VerifyEmail"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

/* The token is constituted by searchParams in a URL token field
that is given from the verify link that we have payload sent out
when creating a user. We then define the searchParams to be of the correct type:
[key: string]: string, string[] or undefined and then we set them to
a token that we will then pass in later functions (client side VerifyEmail component). */

const VerifyEmailPage = ({searchParams}: PageProps) => {
  const token = searchParams.token
  const toEmail = searchParams.to


  return <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {token && typeof token === "string" ? (
        <div className="grid gap-6">
          <VerifyEmail token={token} />  {/* Passing the token in here */}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <Image src="/hippo-email-sent.png"
              fill
              alt="hippo email sent image"
            />
          </div>

          <h3 className="font-semibold text-2xl">Check your email</h3>

          {toEmail ? (
            <p className="text-muted-foreground text-center">
            We&apos;ve sent a vefification link to <span className="font-semibold">{toEmail}</span>.
          </p>
          ) : (
            <p className="text-muted-foreground text-center">
              We&apos;ve sent a verification link to your email.
            </p>
          )}
        </div>
      )}
    </div>
  </div>
}

export default VerifyEmailPage
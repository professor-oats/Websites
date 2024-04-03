import Link from "next/link";
import MaxWidthWrapper from "./MaxWIdthWrapper";
import { Icons } from "./Icons"
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";
import MobileNav from './MobileNav'

const Navbar = async () => {

  /* Get user through the login cookies */

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return(
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile nav */}

              <div className="ml-4 flex lg:ml-0">
                <Link href='/'>
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>


              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  {/* Let's render all the user functionalities here - signed in vs. not signed in */}

                  {/* TODO: Check so that the Navbar properly updates on user sign in */}

                  {user ? (
                    <UserAccountNav user = {user} />
                  ) : (
                    <Link href="/sign-in" className={buttonVariants({variant: "ghost"})}>Sign in</Link>
                  )} {/* If no user signed in - show Sign in link */}

                  {user ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>} {/* Visual divider for righthand nav buttons */}

                  {user ? (
                    <p></p>
                  ) : (
                    <Link href="/sign-up" className={buttonVariants({variant: "ghost"})}>Create account</Link>
                  )} 

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                  ) : null} {/* Visual divider for righthand nav buttons */} 

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                    </div>
                  )} {/* Visual divider for righthand nav buttons */}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
)
}

export default Navbar;
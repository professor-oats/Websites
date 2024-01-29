import Link from "next/link";
import Image from "next/image";

export default function _header() {
  return(
    <header>
      <div>
      <Image className="center-content padding-bottom-20" alt="mom" src={'/images/model.png'} width={150} height={150} />
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/events'>Events</Link>
        <Link href='/about-us'>About Us</Link>
      </nav>
      </div>
      <h1 className="center-content">I think that wellfare sometimes brings identities that can be harmful to people</h1>
    </header>
  );
}
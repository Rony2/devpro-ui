import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 text-black border-b">
      <div className="flex items-center">
        <Link href="/" className="flex">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="mr-2"
            height={30}
            width={30}
          />
          <h1 className="text-xl">DevPro</h1>
        </Link>
        <Link href='/quiz'>
          <p className="ml-4"> Practise Questions</p>
        </Link>
      </div>
      {/* Theme toggle widget can go here */}
    </header>
  )
}

export default Header;
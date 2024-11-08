import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return (
    <header className=" sticky top-0 flex z-10 bg-white justify-between items-center p-4 text-black border-b">
      <div className="flex gap-2 items-center">
        <Link href="/" className="flex">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="mr-2"
            height={30}
            width={30}
          />
          <h1 className="text-xl font-bold">DevPro</h1>
        </Link>
        <Link href='/quiz'>
          <p className="ml-4"> Practice Questions</p>
        </Link>
      </div>
      {/* Theme toggle widget can go here */}
    </header>
  )
}

export default Header;
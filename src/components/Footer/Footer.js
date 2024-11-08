import Image from "next/image";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center border-t border-slate-400/10 py-4 sm:justify-between">
                    <p className="text-sm text-slate-500 mt-0">Copyright ©2024 DevPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
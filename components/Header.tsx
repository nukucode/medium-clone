import Image from "next/image"
import Link from "next/link"

function Header() {
    return (
        <header className="flex items-center justify-between max-w-7xl p-5 mx-auto">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <Image src="https://links.papareact.com/yvf"
                        alt="logo"
                        className="w-44 object-contain"
                        width={100}
                        height={100}
                    />
                </Link>
                <div className="hidden sm:inline-flex space-x-5 items-center ">
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className="bg-green-600 py-1 px-4 rounded-full text-white">Follow</h3>
                </div>
            </div>
            <div className="flex items-center space-x-5 text-green-600">
                <h3>Sign In</h3>
                <h3 className="border-green-600 border rounded-full py-1 px-4">Get Started</h3>
            </div>
        </header>
    )
}

export { Header }
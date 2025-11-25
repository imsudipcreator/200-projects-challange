import Image from "next/image";
import Link from "next/link";

const ROUTES = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
]

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-start h-svh">
      {/**Navbar */}
      <nav className="w-full h-12 flex items-center justify-between p-4">
        <h1>@imsudipdev</h1>
        <div className="flex items-center gap-4">
          {
            ROUTES.map(route => (
              <Link href={route.path} key={route.name} className="hover:text-foreground/80 transition-colors duration-300">
                {route.name}
              </Link>
            ))
          }
        </div>
      </nav>

      {/**Hero section */}
      <section className="w-full flex items-center justify-center gap-8 flex-1">
          <Image src={'/assets/profile.jpg'} alt="Profile Image" width={300} height={300} className="rounded-full object-cover"/>
          <div className="flex-col items-start justify-center gap-5 max-w-[30%]">
            <h1 className="text-5xl font-medium">Sudip Mahata</h1>
            <h4 className="my-2 text-xl font-medium">A bit about me</h4>
            <p className="text-foreground/80 text-sm">
              I am a self taught software engineer from West bengal, India.
              I provide digital effective solutions for buisnesess through our agency named Imago.
              I am also interested in other fields like Comedy, Dancing and Singing
              other than just coding.
            </p>
          </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 bg-indigo-300 absolute z-10 top-0 w-full px-2 h-10 text-black border-b border-slate-500">
      <Link href="/general">General</Link>
      <Link href="/hospitality">Hospitality</Link>
    </nav>
  );
};

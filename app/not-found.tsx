import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-night px-6 text-center text-cream">
      <div>
        <p className="font-hand text-3xl text-[#9d958a]">Wrong turn, stranger.</p>
        <Link href="/stranger" className="mt-6 inline-block font-hand text-2xl underline underline-offset-8">
          this way →
        </Link>
      </div>
    </main>
  );
}

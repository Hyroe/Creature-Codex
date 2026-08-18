import { Link } from "react-router-dom";

export default function NotFoundPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#f4f0e8] px-6 text-[#26352d]">
			<section className="w-full max-w-xl text-center">
				<p className="font-mono text-8xl font-bold tracking-[0.2em] text-[#a44b38] sm:text-9xl">
					404
				</p>

				<div className="mx-auto my-8 h-px w-24 bg-[#a44b38]" />

				<h1 className="font-mono text-xl font-bold uppercase tracking-[0.18em] sm:text-2xl">
					Specimen Not Found
				</h1>
				<p className="mx-auto mt-6 max-w-sm text-lg leading-relaxed text-[#526158]">
					The requested entry could not
					<br />
					be found in the Creature Codex.
				</p>

				<Link
					to="/"
					className="mt-10 inline-block border border-[#26352d] px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:bg-[#26352d] hover:text-[#f4f0e8]"
				>
					[ Return Home ]
				</Link>
			</section>
		</main>
	);
}

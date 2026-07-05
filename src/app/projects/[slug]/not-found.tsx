export default function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-6 text-center text-[#0f172a]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#00ABE4]">FilmTrade demo</p>
        <h1 className="mt-4 text-4xl font-black">Project not found.</h1>
        <p className="mt-4 text-slate-600">This fictional demo project does not exist in the local data.</p>
        <a href="/discover" className="mt-8 inline-block rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white">
          Back to Discover
        </a>
      </div>
    </main>
  );
}
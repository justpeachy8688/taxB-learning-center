
"use client"; // tells Next.js that the file is a Client Component, 
              // allowing to use interactive react features like useState

import { useEffect, useState } from "react";

// the expected structure of a video object
type Video = {
  id: number;
  title: string;
  category: string;
  description: string;
  video_url: string | null;
};



export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Videos");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        // sends http GET request from browser to Express backend
        const response = await fetch(
          "http://localhost:3001/api/videos"
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        // reads the JSON response and converts it into JavaScript data
        const data: Video[] = await response.json();
        // updates React state
        setVideos(data);
      } catch (err) {
        setError("Unable to load videos. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchVideos();
  }, []);

  const categories = [
    "All Videos",
    "1099s",
    "W-2",
    "Getting Started",
    "Deadlines",
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Videos" ||
      video.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-950 px-8 py-12 text-white">
  <div className="mx-auto max-w-7xl">
    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
      TaxB Video Learning Center
    </p>

    <h1 className="max-w-3xl text-4xl font-bold">
      Tax Filing Made Simple for Small Businesses
    </h1>

    <p className="mt-4 max-w-2xl text-lg text-blue-100">
      From filing your first 1099 to correcting a W-2,
      explore step-by-step video tutorials designed to
      help you navigate tax filing with confidence.
    </p>
  </div>
</header>

      {/* Main content */}
      <section className="mx-auto max-w-5xl px-8 py-10">
        <h2 className="mb-5 text-2xl font-semibold">
          What do you need help with?
        </h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search tutorials..."
          aria-label="Search tutorials"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3"
        />

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full px-4 py-2 ${
                category === item
                  ? "bg-blue-950 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading message */}      
        {loading && (
          <p className="mb-6 text-gray-500">
          Loading videos...
          </p>
        )}

        {/* Error msg */}
        {error && (
          <p className="mb-6 text-red-600">
          {error}
          </p>
        )}
        
        {/* Video cards */}
        {!loading && !error && (
  <div className="grid gap-6 md:grid-cols-2">
    {filteredVideos.map((video) => (
      <div
        key={video.id}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Embedded video */}
        {video.video_url && (
          <div className="mb-5 aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
            <iframe
              src={`https://www.youtube.com/embed/${
                new URL(video.video_url).searchParams.get("v")
              }`}
              title={video.title}
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {/* Video title */}
        <h3 className="text-xl font-semibold">
          {video.title}
        </h3>

        {/* Category */}
        <p className="mt-2 text-sm font-medium text-blue-700">
          {video.category}
        </p>

        {/* Description */}
        <p className="mt-3 text-gray-600">
          {video.description}
        </p>
      </div>
    ))}
  </div>
)}

        {/* No results */}
        {!loading && !error && filteredVideos.length === 0 && (
          <p className="mt-6 text-gray-500">
            No matching videos found.
          </p>
        )}

      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 bg-white px-8 py-6 text-center text-sm text-gray-500">
        <p>Filing Made Simple | Educational Video Library</p>

        <p className="mt-2">
          Independent portfolio demonstration created for educational purposes.
          Not affiliated with or endorsed by any tax filing service.
        </p>
      </footer>

    </main>
  );
}

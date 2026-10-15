
"use client"; // tells Next.js that the file is a Client Component, 
              // allowing to use interactive react features like useState

import { useEffect, useState } from "react";
// the expected structure of a video object
type Video = {
  id: number;
  title: string;
  category: string;
  description: string;
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
      <header className="bg-blue-950 px-8 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">
            TaxB Learning Center
          </h1>
          <p className="mt-2 text-blue-100">
            Simple tutorials for smarter tax filing.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-8 py-10">
        <h2 className="mb-5 text-2xl font-semibold">
          What do you need help with?
        </h2>

        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
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

        {loading && (
          <p className="mb-6 text-gray-500">
          Loading videos...
          </p>
        )}

        {error && (
          <p className="mb-6 text-red-600">
          {error}
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {video.title}
              </h3>

              <p className="mt-2 text-sm text-blue-700">
                {video.category}
              </p>

              <p className="mt-3 text-gray-600">
                {video.description}
              </p>
            </div>
          ))}
        </div>

        {!loading && !error && filteredVideos.length === 0 && (
          <p className="mt-6 text-gray-500">
            No matching videos found.
          </p>
        )}
      </section>
    </main>
  );
}

"use client";
import Header from "@/components/Header";
import StoriesComponent from "@/components/Story";
import { useState, useEffect } from "react";
import axios from "axios";
import Stories from "@/components/Stories";

export default function Home() {
  const [ showStories, setShowStories] = useState(false);
  const [ stories, setStories ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8008/api/users').then(response => setStories(response.data));
  }, [showStories, setShowStories])

  const openStories = () => {
    setShowStories(true);
  }
  return (
    <main className="bg-white flex min-h-screen max-w-[480px] min-w-[320px] m-auto border border-white flex-col items-center justify-between p-5">
      
      {!showStories && <>
        <Header />
        <Stories stories={stories} open={openStories}/>
      </>}
      {showStories && <StoriesComponent stories={stories} setShowStories={setShowStories}/>}
    </main>
  );
}

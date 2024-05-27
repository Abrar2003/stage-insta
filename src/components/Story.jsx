"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

const StoriesComponent = ({ stories, setShowStories }) => {
  const [currentStory, setCurrentStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [watchedStories, setWatchedStories] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    console.log(stories)
    if (stories.length > 0) {
      const unwatchedStory = stories.find((story, index) => !watchedStories.includes(index));
      if (unwatchedStory) {
        setCurrentStory(unwatchedStory);
        setCurrentStoryIndex(stories.indexOf(unwatchedStory));
        startTimer();
      } else {
        // All stories have been watched, reset or show a message
        setCurrentStory(null);
        clearTimer();
        console.log('All stories have been watched');
      }
    }
    return clearTimer;
  }, [stories, watchedStories]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      handleNextStory();
    }, 5000);
  };

  const clearTimer = () => {
    clearInterval(intervalRef.current);
  };

  const handleNextStory = () => {
    const nextIndex = currentStoryIndex + 1;
    if (nextIndex < stories.length) {
      if (!watchedStories.includes(nextIndex)) {
        setCurrentStory(stories[nextIndex]);
        setCurrentStoryIndex(nextIndex);
        setWatchedStories([...watchedStories, currentStoryIndex]);
      } else {
        handleNextStory(); // Move to the next unwatched story
      }
    } else {
      // All stories have been watched, reset or show a message
      setCurrentStory(null);
      clearTimer();
      setShowStories(false);
      setWatchedStories([]);
      console.log('All stories have been watched');
    }
  };

  const handlePrevStory = () => {
    const prevIndex = currentStoryIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStory(stories[prevIndex]);
      setCurrentStoryIndex(prevIndex);
    } else {
      // At the start of stories, handle as needed
      console.log('At the start of stories');
    }
  };

  return (
    <div
      className="relative top-0 left-0 h-screen text-black text-3xl font-bold font-sans"
    >
      {currentStory && (
        <div className="flex items-center justify-center h-screen">
          <div>
            
              <img src={currentStory.content} alt="Story" className="min-h-screen min-w-full" />
            
          </div>
        </div>
      )}
      <div className='min-w-full min-h-screen absolute top-0 left-0 flex z-10'>
        <button className='bg-none border-none w-1/2 min-h-full' onClick={handlePrevStory}></button>
        <button className='bg-none border-none w-1/2 min-h-full' onClick={handleNextStory}></button>
      </div>
    </div>
  );
};

export default StoriesComponent;
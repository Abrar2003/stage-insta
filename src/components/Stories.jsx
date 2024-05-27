import React from 'react'

function Stories({stories, open}) {
  return (
    <div className='w-full fixed top-[80px] h-[120px] overflow-x-auto flex gap-[10px]'>
        {
           stories.length !== 0 && stories.map((story) => (
            <div key={story._id} >
                <button onClick={open} className='rounded-full min-w-16 min-h-16'>
                    <img className='w-full rounded-full h-16 border-2 border-red-400' src={story.content} alt="username" />

                </button>
                <p className='text-base text-center font-medium text-black tracking-normal mt-2'>{story.user.username}</p>
            </div>

            ))
        }
    </div>
  )

}

export default Stories
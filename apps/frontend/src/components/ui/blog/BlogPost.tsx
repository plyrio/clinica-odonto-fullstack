import React from 'react'

const BlogPost = () => {
  return (
      
          <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
              <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
                  <div className="flex flex-col space-y-8 md:space-y-12">
                      <div className="flex flex-col space-y-2">
                          <h3 className="flex items-center space-x-2 text-gray-400">
                              <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full bg-violet-400"></span>
                              <span className="text-xs font-bold tracking-wider uppercase">Exclusive</span>
                          </h3>
                          <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Donec sed elit quis odio mollis dignissim eget et nulla.</a>
                          <p className="text-xs text-gray-400">47 minutes ago by
                              <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Leroy Jenkins</a>
                          </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                          <h3 className="flex items-center space-x-2 text-gray-400">
                              <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full bg-violet-400"></span>
                              <span className="text-xs font-bold tracking-wider uppercase">Exclusive</span>
                          </h3>
                          <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Ut fermentum nunc quis ipsum laoreet condimentum.</a>
                          <p className="text-xs text-gray-400">2 hours ago by
                              <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Leroy Jenkins</a>
                          </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                          <h3 className="flex items-center space-x-2 text-gray-400">
                              <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full bg-violet-400"></span>
                              <span className="text-xs font-bold tracking-wider uppercase">Exclusive</span>
                          </h3>
                          <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Nunc nec ipsum lobortis, pulvinar neque sed.</a>
                          <p className="text-xs text-gray-400">4 hours ago by
                              <a rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Leroy Jenkins</a>
                          </p>
                      </div>
                  </div>
                  <div className="flex flex-col w-full space-y-2">
                      <div className="flex w-full h-1 bg-opacity-10 bg-violet-400">
                          <div className="w-1/2 h-full bg-violet-400"></div>
                      </div>
                      <a rel="noopener noreferrer" href="#" className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold tracking-wider uppercase">See more exclusives</span>
                          <svg viewBox="0 0 24 24" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 strokeCurrent text-violet-400">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                      </a>
                  </div>
              </div>
              <div className="relative flex col-span-12 bg-gray-500 bg-center bg-no-repeat bg-cover xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96" >
                  <span className="absolute px-1 pb-2 text-xs font-bold uppercase border-b-2 left-6 top-6 text-gray-100 border-violet-400">paris, france</span>
                  <a className="flex flex-col items-center justify-end p-6 text-center sm:p-8 group dark:via- flex-grow-1 bg-gradient-to-b from-gray-900 to-gray-900">
                      <span className="flex items-center mb-4 space-x-2 text-violet-400">
                          <span className="relative flex-shrink-0 w-2 h-2 rounded-full bg-violet-400">
                              <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping bg-violet-400"></span>
                          </span>
                          <span className="text-sm font-bold">Live</span>
                      </span>
                      <h1 rel="noopener noreferrer" className="font-serif text-2xl font-semibold group-hover:underline text-gray-100">Morbi mattis justo est, ac consectetur dui eleifend vitae. Donec venenatis?</h1>
                  </a>
              </div>
              <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
                  <div className="mb-8 space-x-5 border-b-2 border-opacity-10 border-violet-400">
                      <button type="button" className="pb-5 text-xs font-bold uppercase border-b-2 border-violet-400">Latest</button>
                      <button type="button" className="pb-5 text-xs font-bold uppercase border-b-2 dark:border- text-gray-400">Popular</button>
                  </div>
                  <div className="flex flex-col divide-y divide-gray-700">
                      <div className="flex px-1 py-4">
                          <img alt="" className="flex-shrink-0 object-cover w-20 h-20 mr-4 bg-gray-500" src="https://source.unsplash.com/random/244x324" />
                          <div className="flex flex-col flex-grow">
                              <a rel="noopener noreferrer" href="#" className="font-serif hover:underline">Aenean ac tristique lorem, ut mollis dui.</a>
                              <p className="mt-auto text-xs text-gray-400">5 minutes ago
                                  <a rel="noopener noreferrer" href="#" className="block text-blue-400 lg:ml-2 lg:inline hover:underline">Politics</a>
                              </p>
                          </div>
                      </div>
                      
                  </div>
              </div>
          </div>
      
  )
}

export default BlogPost
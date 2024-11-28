import React from 'react'

function Blog() {
  return (
    <>
<div class="blog-cont overflow-hidden shadow-lg">
  <img class="w-full" src="/assets/982990.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class=" text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>

<div class="max-w-80 w-full rounds h-64 lg:max-w-5xl lg:flex">
<div className="h-48 lg:h-auto lg:w-48 flex-none lg:rounded-tr-none rounded-tr-custom-50 rounded-tl-custom-50 lg:rounded-bl-custom-50 lg:rounded-tl-custom-50 bg-cover text-center overflow-hidden" style={{ backgroundImage: "url('/assets/982990.jpg')" }} title="Woman holding a mug">  </div>
  <div class="border-r lg:rounded-bl-none lg:rounded-tr-custom-50 sm:rounded-bl-custom-50 sm:rounded-br-custom-50 border-b border-l custum-style border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400  p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <div class="font-bold text-xl mb-2">Can coffee make you a better developer?</div>
      <p class=" text-base">Lorem ipsum dolor consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et pconsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis  perferendis eaque, exercitationem praesentium nihil.</p>
    </div>
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="/assets/982990.jpg" alt="Avatar of Jonathan Reinink"/>
      <div class="text-sm">
        <p class="leading-none">Jonathan Reinink</p>
        <p class="text-gray-600">Aug 18</p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Blog
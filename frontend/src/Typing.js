import React from 'react'
import { useState, useRef } from "react";

function Typing() {

const words = 'loreum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum' 


const [currentIndex, setCurrentIndex] = useState(0)
const [letterStatuses, setLetterStatuses] = useState([])
const inputRef = useRef(null)

if (inputRef.current) {
    inputRef.current.value = ''
}


const handleKeyUp = (e) => {
const newStatuses = [...letterStatuses];
const expectLetter = words[currentIndex]
const currentLetter = e.key

if (expectLetter === currentLetter && letterStatuses[currentIndex] !== 'incorrect') {
    newStatuses[currentIndex] = 'correct'
    console.log(currentIndex)
    console.log(newStatuses)
    setCurrentIndex(currentIndex + 1)
    // console.log('correct')  
}

else if (expectLetter === currentLetter && letterStatuses[currentIndex] === 'incorrect') {
    setCurrentIndex(currentIndex + 1)
}
else if (expectLetter !== currentLetter) {
    newStatuses[currentIndex] = 'incorrect'
    console.log('incorrect')
    console.log(newStatuses)

}
setLetterStatuses(newStatuses)
}

    return (

<div>

    <div className=' inner-type w-3/4 m-auto'
    onClick={() => inputRef.current.focus()}
    >

{words.split('').map((letter, index) => {
    
    return (
        <div
    className={`inline text-xl ${index < currentIndex ? 
        (letterStatuses[index]==='correct'?
         'text-green-600':'text-red-700'
        ) : index === currentIndex ? 'border-b-2 border-slate-600' : 'text-black-500'
        }`}
         key={index}>
        {letter}
    </div>
    )
})}

    </div>


<input type='text'
ref={inputRef}
onKeyUp={handleKeyUp}
className='block w-0'
placeholder='hello'
autoFocus
>

</input>

<div
className='text-center'>
    Next Letter: {words[currentIndex]}
</div>

</div>
)
}

export default Typing
import React from 'react'

const Button = ({title, id, leftIcon, rightIcon, containerClass }) => {
    return (
       <button type="button" id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 font-semibold px-7 py-3 text-black 
        hover:bg-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-950 text-center me-2 mb-2" ${containerClass}`}>
              {leftIcon}
              <span className="relative inline-flex overflow-hidden font-genral text-sm uppercase" aria-label="Watch Trailer">
                  {title}</span>
              {rightIcon}
       </button>
    )
}
export default Button

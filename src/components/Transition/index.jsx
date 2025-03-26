// "use client"
// import React, { useEffect, useRef } from 'react'
// import { useState } from 'react'
// import gsap from 'gsap'
// import {useGSAP} from "@gsap/react"
// gsap.registerPlugin(useGSAP)

// const index = ({children}) => {

//     const [displayChildren, setDisplayChildren] = useState(children)
//     const container = useRef()
  
//     useGSAP(() => {
//         if(children.key != displayChildren.key) {
//             gsap.to(container.current, {opacity: 0}).then(() => {
//                 setDisplayChildren(children)
//                 gsap.to(container.current, {opacity: 1})
//             })
//         }
        
//     },[children])

//   return (
//     <div ref={container}>
//         {displayChildren}
//     </div>
//   )
// }

// export default index
"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Index = ({ children }) => {
    const [displayChildren, setDisplayChildren] = useState(children)
    const container = useRef()

    useEffect(() => {
        // Only animate if children change
        if (children !== displayChildren) {
            gsap.to(container.current, { opacity: 0, duration: 0.5 }).then(() => {
                setDisplayChildren(children)
                gsap.to(container.current, { opacity: 1, duration: 0.5 })
            })
        }
    }, [children, displayChildren]) // Depend on children and current displayChildren

    return (
        <div ref={container}>
            {displayChildren}
        </div>
    )
}

export default Index

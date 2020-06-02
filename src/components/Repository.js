import React from 'react'

export default function Repository ({id, title, children}) {
  return (
    <li key={id}>
      {title}

      {children}
    </li>
  )
}

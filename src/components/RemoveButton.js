import React from 'react'

export default function RemoveButton ({ id, handler }) {
  return (
    <button onClick={() => handler(id)}>
      Remover
    </button>
  )
}

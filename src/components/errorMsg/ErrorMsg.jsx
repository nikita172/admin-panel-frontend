import React from 'react'
import "./errorMsg.css"
export default function ErrorMsg({ error }) {
  return (
    <div className="showError">
      {error} !
    </div>
  )
}

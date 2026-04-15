"use client"

import React from 'react'

 const Nav = () => {
  return (
    <>
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-medium text-gray-800">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Admin</div>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </header>

    </>
  )
}

export default Nav
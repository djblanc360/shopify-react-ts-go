import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <div className="flex justify-center gap-8 p-8 ">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 h-24" alt="React logo" />
        </a>
      </div>
      <h1 className="text-6xl font-bold text-center mb-8">Vite + React</h1>
      <div className="card text-center ">
        <button
          className="rounded-lg border border-transparent px-4 py-2 text-lg font-medium text-gray-400 bg-gray-900 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="font-mono p-1 bg-gray-900 rounded text-gray-400">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-center text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

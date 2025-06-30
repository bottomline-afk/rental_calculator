export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="px-4 py-2 bg-blue-500 text-white rounded">
      Print
    </button>
  )
}

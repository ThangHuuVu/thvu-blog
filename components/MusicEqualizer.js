export default function MusicEqualizer() {
  return (
    <div className="w-max h-4 flex items-center gap-0.75">
      <span className="w-0.75 h-4 bg-gray-200 rounded-sm motion-safe:animate-shrink" />
      <span className="w-0.75 h-1.5 bg-gray-200 rounded-sm motion-safe:animate-expand" />
      <span className="w-0.75 h-4 bg-gray-200 rounded-sm motion-safe:animate-shrink" />
    </div>
  )
}

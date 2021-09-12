export default function MusicEqualizer() {
  return (
    <div className="w-4 h-3 flex items-center gap-0.75">
      <span className="w-0.75 h-3 bg-spotify-green rounded-sm motion-safe:animate-shrink" />
      <span className="w-0.75 h-1.5 bg-spotify-green rounded-sm motion-safe:animate-expand" />
      <span className="w-0.75 h-3 bg-spotify-green rounded-sm motion-safe:animate-shrink" />
    </div>
  )
}

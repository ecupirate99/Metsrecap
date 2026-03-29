export default function GameCard({ game }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      {/* HEADLINE */}
      <div className="text-xl font-bold mb-2">
        {game?.headline}
      </div>

      {/* DATE */}
      <div className="text-xs text-gray-400 mb-3">
        {game?.game_date}
      </div>

      {/* RECAP */}
      <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
        <div dangerouslySetInnerHTML={{ __html: game.recap }} />
      </div>

      {/* RESULT */}
      {game?.result_summary && (
        <div className="border-t pt-3 text-sm text-gray-600">
          {game.result_summary}
        </div>
      )}

    </div>
  );
}

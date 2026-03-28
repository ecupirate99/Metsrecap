"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Page() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadGame() {
    setLoading(true);

    const { data, error } = await supabase
      .from("mets_daily_game")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (data) setGame(data);

    setLoading(false);
  }

  useEffect(() => {
    loadGame();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading Mets Recap...</div>;
  }

  if (!game) {
    return <div style={{ padding: 20 }}>No game data found</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>

      <h1>{game.headline}</h1>

      <p style={{ color: "gray" }}>{game.game_date}</p>

      <div style={{ whiteSpace: "pre-line" }}>
        {game.recap}
      </div>

      <hr />

      <p>{game.result_summary}</p>

      <button onClick={loadGame} style={{ marginTop: 20 }}>
        Refresh
      </button>

    </div>
  );
}

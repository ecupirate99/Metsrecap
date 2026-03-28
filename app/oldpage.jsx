"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import GameCard from "../components/GameCard";

export default function Page() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchLatestGame() {

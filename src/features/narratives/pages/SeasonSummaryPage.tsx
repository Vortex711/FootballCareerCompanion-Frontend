import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../../../shared/navigation/BackButton";

import { getSeasonNarrative } from "../api/narrativesApi";
import type { Narrative } from "../types";

function SeasonSummaryPage() {
  const { seasonId } = useParams<{ seasonId: string }>();

  const [summary, setSummary] = useState<Narrative | null>(null);

  useEffect(() => {
  if (!seasonId) return;

  getSeasonNarrative(seasonId)
    .then((data) => setSummary(data))
    .catch(() => setSummary(null));
}, [seasonId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* Back */}
        <BackButton />

        {/* Editorial Header */}
        <header className="mt-10 border-b border-slate-800 pb-8">

          <p className="text-sm font-bold tracking-[0.25em] text-emerald-400">
            SEASON REVIEW
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            The Season in Review
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-400">
            Every match. Every setback. Every moment that shaped the journey.
          </p>

        </header>

        {/* Article */}
        <main className="py-10">

          {summary?.narrative ? (

            <article
              className="
                rounded-2xl
                border border-slate-800
                bg-slate-900/40
                p-6
                shadow-xl shadow-black/10
                sm:p-10
              "
            >

              {/* Article Label */}
              <div className="mb-8 flex items-center gap-3">

                <span className="h-px w-10 bg-emerald-500" />

                <span className="text-xs font-bold tracking-[0.2em] text-slate-500">
                  THE STORY
                </span>

              </div>

              {/* Narrative */}
              <p
                className="
                  whitespace-pre-line
                  text-justify
                  text-base
                  leading-8
                  text-slate-300
                  sm:text-lg
                "
              >
                {summary.narrative}
              </p>

              {/* Footer */}
              <div className="mt-10 border-t border-slate-800 pt-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                    ⚽
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Football Career Companion
                    </p>

                    <p className="text-xs text-slate-500">
                      Every career has a story.
                    </p>
                  </div>

                </div>

              </div>

            </article>

          ) : (

            <div
              className="
                rounded-2xl
                border border-dashed border-slate-700
                p-12 text-center
              "
            >
              <p className="text-lg font-medium text-slate-400">
                Summary unavailable
              </p>

              <p className="mt-2 text-sm text-slate-500">
                A season narrative has not been generated yet.
              </p>
            </div>

          )}

        </main>

      </div>
    </div>
  );
}

export default SeasonSummaryPage;
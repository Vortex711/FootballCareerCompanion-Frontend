import { useEffect, useState } from "react";
import { getMatchNarrative } from "../api/narrativesApi";
import type { Narrative } from "../types";

interface MatchNarrativeViewProps {
  seasonId: string;
  matchId: string;
}

function MatchNarrativeView({
  seasonId,
  matchId,
}: MatchNarrativeViewProps) {
  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
  getMatchNarrative(seasonId, matchId)
    .then((data) => setNarrative(data))
    .catch(() => setNarrative(null));
}, [seasonId, matchId]);

  return (
    <div className="mt-5">
      <button
        onClick={() => setShow(!show)}
        className="
          flex items-center gap-2
          text-sm font-semibold text-emerald-400
          transition
          hover:text-emerald-300
        "
      >
        <span>
          {show ? "Hide Match Story" : "Read Match Story"}
        </span>

        <span
          className={`
            transition-transform duration-200
            ${show ? "rotate-180" : ""}
          `}
        >
          ↓
        </span>
      </button>

      {show && (
        <div className="
          mt-4 rounded-xl
          border border-slate-700/70
          bg-slate-900/60
          p-5
        ">
          {narrative?.narrative ? (
            <>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
                  MATCH NARRATIVE
                </p>
              </div>

              <p className="text-justify leading-7 text-slate-300">
                {narrative.narrative}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Narrative unavailable.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MatchNarrativeView;
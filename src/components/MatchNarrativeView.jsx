import { useEffect, useState } from "react";
import api from "../api/api";

function MatchNarrativeView({ seasonId, matchId }) {
  const [narrative, setNarrative] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    api.get(
      `/v1/seasons/${seasonId}/matches/${matchId}/narrative`
    )
      .then((res) => setNarrative(res.data))
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
        <div
          className="
            mt-4 rounded-xl
            border border-slate-700/70
            bg-slate-900/60
            p-5
          "
        >
          {narrative && narrative.narrative ? (
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
import type { ReactNode } from "react";

interface TwoPanelLayoutProps {
  leftTitle: string;
  leftSubtitle?: string;
  leftContent: ReactNode;

  rightTitle: string;
  rightSubtitle?: string;
  rightContent: ReactNode;
}

function TwoPanelLayout({
  leftTitle,
  leftSubtitle,
  leftContent,
  rightTitle,
  rightSubtitle,
  rightContent,
}: TwoPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div
          className="
            grid
            min-h-[calc(100vh-4rem)]
            overflow-hidden
            rounded-2xl
            border border-border
            bg-surface
            shadow-2xl
            lg:grid-cols-[380px_1fr]
          "
        >
          {/* LEFT PANEL */}
          <aside
            className="
              border-b border-border
              bg-surface-light
              p-6
              lg:border-b-0
              lg:border-r
            "
          >
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-accent">
                CREATE
              </p>

              <h2 className="text-2xl font-bold">
                {leftTitle}
              </h2>

              {leftSubtitle && (
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {leftSubtitle}
                </p>
              )}
            </div>

            {leftContent}
          </aside>

          {/* RIGHT PANEL */}
          <main
            className="
              min-w-0
              p-6
              lg:max-h-[calc(100vh-4rem)]
              lg:overflow-y-auto
              lg:p-8
            "
          >
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-accent">
                YOUR CAREER
              </p>

              <h1 className="text-3xl font-bold">
                {rightTitle}
              </h1>

              {rightSubtitle && (
                <p className="mt-2 text-text-secondary">
                  {rightSubtitle}
                </p>
              )}
            </div>

            {rightContent}
          </main>
        </div>
      </div>
    </div>
  );
}

export default TwoPanelLayout;
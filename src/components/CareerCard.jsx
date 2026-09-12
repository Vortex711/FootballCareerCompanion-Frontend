function CareerCard({ career, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        group relative flex w-full flex-col overflow-hidden
        rounded-2xl border border-border
        bg-surface p-6 text-left
        transition-all duration-200
        hover:-translate-y-1 hover:border-accent
        hover:bg-surface-hover
        hover:shadow-lg hover:shadow-black/20
      "
    >
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl bg-accent/10 text-xl
          "
        >
          ⚽
        </div>

        <span className="text-xl text-text-secondary transition group-hover:text-accent">
          →
        </span>
      </div>

      {/* Main information */}
      <div className="mt-6">
        <p className="text-xs font-bold tracking-[0.2em] text-accent">
          CAREER
        </p>

        <h3 className="mt-2 text-xl font-bold text-text-primary">
          {career.name}
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          {career.clubName}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs font-semibold tracking-wider text-text-secondary">
          MANAGER
        </p>

        <p className="mt-1 font-medium text-text-primary">
          {career.managerName}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          View Career
        </span>

        <span className="text-sm font-semibold text-accent">
          Explore →
        </span>
      </div>
    </button>
  );
}

export default CareerCard;
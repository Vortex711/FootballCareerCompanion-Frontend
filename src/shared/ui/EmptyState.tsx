interface EmptyStateProps {
  title: string;
  description?: string;
}

function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <p className="text-text-secondary">
        {title}
      </p>

      {description && (
        <p className="mt-2 text-sm text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

export default EmptyState;
// ==============================
// components/ServiceCard.tsx
// ==============================
type Props = {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
};

export default function ServiceCard({
  title,
  description,
  image,
  children,
}: Props) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {image && (
        <div className="h-70 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Extension libre (témoignages, listes, CTA…) */}
        {children}
      </div>
    </div>
  );
}
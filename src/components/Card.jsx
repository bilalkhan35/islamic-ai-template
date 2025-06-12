// components/Card.js
const Card = ({ title, children, footer }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
    {title && (
      <h2 className="text-2xl font-bold text-center text-blue-600">{title}</h2>
    )}
    <div>{children}</div>
    {footer && <div className="mt-4">{footer}</div>}
  </div>
);

export default Card;

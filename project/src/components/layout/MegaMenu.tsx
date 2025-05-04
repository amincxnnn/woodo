import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Kitchen',
    items: ['Cutting Boards', 'Utensils', 'Storage', 'Servingware']
  },
  {
    title: 'Toys',
    items: ['Puzzles', 'Building Blocks', 'Educational', 'Games']
  },
  {
    title: 'Tables and Chairs',
    items: ['Dining Tables', 'Coffee Tables', 'Dining Chairs', 'Stools']
  },
  {
    title: 'Accessories',
    items: ['Wall Art', 'Clocks', 'Mirrors', 'Decorative Items']
  }
];

const MegaMenu = () => {
  return (
    <div className="fixed top-20 left-0 right-0 w-full bg-white shadow-xl rounded-b-lg p-6 grid grid-cols-4 gap-4 z-[999]">
      {categories.map((category, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-medium text-accent">{category.title}</h3>
          <ul className="space-y-2">
            {category.items.map((item, idx) => (
              <li key={idx}>
                <Link 
                  to={`/shop/${category.title.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-gray-600 hover:text-accent transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to={`/shop/${category.title.toLowerCase()}`}
            className="inline-block text-sm font-medium text-secondary hover:text-secondary-light transition-colors"
          >
            View All {category.title} →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MegaMenu;
import { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <footer className="footer bg-gray-900 text-center lg:text-left p-6">
      <div className="text-gray-700 text-center p-4">
        <a
          className="text-white hover:scale-110"
          href="https://www.szeeta.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          szeeta blockachain solutions
        </a>
      </div>
    </footer>
  );
};

export { Footer };

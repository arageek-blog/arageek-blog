import { createContext, useContextSelector } from 'use-context-selector';

const pageContext = createContext({});

export const PageProvider: React.FC = ({ children, initialPageProps = {} }) => {
  return (
    <pageContext.Provider value={initialPageProps}>
      {children}
    </pageContext.Provider>
  );
};

export const usePageContext = (callback): any => {
  return useContextSelector(pageContext, callback);
};

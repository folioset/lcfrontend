import * as React from 'react';
import { useHistory } from 'react-router-dom';

interface SearchContextProps {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	handleSearch: (e: React.FormEvent<HTMLElement>) => void;
}

export const SearchContext = React.createContext<Partial<SearchContextProps>>(
	{}
);

const SearchContextProvider: React.FC<any> = ({ children }) => {
	const [search, setSearch] = React.useState<string>('');
	const history = useHistory();

	const handleSearch = (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();
		history.push('/search');
	};

	return (
		<>
			<SearchContext.Provider value={{ search, handleSearch, setSearch }}>
				{children}
			</SearchContext.Provider>
		</>
	);
};

export default SearchContextProvider;

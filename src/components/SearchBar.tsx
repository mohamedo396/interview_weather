
import { Search } from "lucide-react";
import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full py-2 pl-4 pr-10 text-sm transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-weather-blue border-slate-200 bg-white/90 backdrop-blur-sm"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="absolute inset-y-0 right-0 flex items-center px-3"
          disabled={isLoading}
        >
          <Search className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </form>
  );
}

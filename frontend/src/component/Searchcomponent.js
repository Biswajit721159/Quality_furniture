import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import debounce from 'lodash/debounce';

const api = process.env.REACT_APP_API;

const Searchcomponent = () => {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const query = searchParams.get('search');
        if (query) {
            setInputValue(query);
        } else {
            setInputValue('');
        }
    }, [searchParams]);

    const fetchSuggestions = useMemo(() => 
        debounce(async (searchTerm) => {
            if (!searchTerm || searchTerm.trim() === '') {
                setSuggestions([]);
                return;
            }
            try {
                let response = await fetch(`${api}/product/getProductNameSuggestion/${encodeURIComponent(searchTerm)}`);
                let data = await response.json();
                if (data && data.data) {
                    setSuggestions(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        }, 300),
    []);

    function handleInputChange(e, newInputValue) {
        setInputValue(newInputValue);
        fetchSuggestions(newInputValue);
    }

    function searchItem(e) {
        e.preventDefault();
        submitSearch(inputValue);
    }

    function submitSearch(term) {
        if (term && term.trim() !== '') {
            history(`/Product?search=${encodeURIComponent(term.trim())}`);
        } else {
            history(`/Product`);
        }
    }

    return (
        <form onSubmit={searchItem} className="w-full">
            <Autocomplete
                freeSolo
                disablePortal
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={suggestions}
                size="small"
                getOptionLabel={(option) => typeof option === 'string' ? option : option.product_name}
                onChange={(event, newValue) => {
                    if (newValue) {
                        const term = typeof newValue === 'string' ? newValue : newValue.product_name;
                        setInputValue(term);
                        submitSearch(term);
                    }
                }}
                renderOption={(props, option) => (
                    <li {...props} key={option.product_name} className="flex items-center gap-3 px-3 py-2 hover:bg-stone-50 cursor-pointer border-b border-stone-50 last:border-0">
                        {option.photo && (
                            <img src={option.photo} alt={""} className="w-8 h-8 rounded-md object-cover border border-stone-100" />
                        )}
                        <span className="text-xs font-semibold text-stone-700 truncate line-clamp-1">{option.product_name}</span>
                    </li>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Search Furniture..." 
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#f5f5f4', // stone-100
                                '& fieldset': { borderColor: 'transparent' },
                                '&:hover fieldset': { borderColor: '#d6d3d1' }, // stone-300
                                '&.Mui-focused fieldset': { borderColor: '#7C4B2A' }, // brand
                                paddingRight: '12px !important'
                            },
                        }}
                    />
                )}
            />
        </form>
    )
}

export default Searchcomponent;
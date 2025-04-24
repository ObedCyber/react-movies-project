import React from "react";  

// To get access to all the props passed to the component, we use the props parameter in the function definition.
// This allows us to access the props object and its properties within the component.
// In this case, we are using destructuring to extract the searchTerm and setSearchTerm properties from the props object.
const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input 
                    type="text" 
                    placeholder="Search through thousands of movies" 
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)} // This updates the searchTerm state in the parent component when the input value changes.
                    // The onChange event handler is triggered whenever the value of the input field changes.
                 />
            </div>
        </div>
    )
}

export default Search;


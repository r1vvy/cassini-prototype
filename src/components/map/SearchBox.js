function SearchBox({ onSearch }) {
    async function searchLocation(searchText) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchText}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSearch({ lat, lon }); // pass the result to the onSearch function
      }
    }
  
    return (
      <div className="search-box">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target;
            const searchText = form.search.value;
            console.log('Searching for: ' + searchText);
            searchLocation(searchText);
            form.reset();
          }}
        >
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }

export default SearchBox;
  
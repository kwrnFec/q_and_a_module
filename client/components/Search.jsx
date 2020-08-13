import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ReactDom from 'react-dom';

const Search = (props) => {

  const onChangeSearch = (event) => {
    let input = event.target.value;
    if (input.length >= 3) {
      console.log(input);
      props.setFilterState(true);
    } else {
      props.setFilterState(false);
    }
  }


  return (
    <div className='searchBar'>
      <InputGroup className="mb-3">
        <FormControl
          onChange={onChangeSearch}
          type="text" className="searchInput"
          placeholder="Have a question? Search for answers…"
        />
      </InputGroup>
    </div>
  );
}

export default Search;
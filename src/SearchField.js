import React, { Component } from 'react'

class SearchField extends Component {

  render() {
      return (
        <div className="filterLocations" role="application">
          <input
          type="text"
          autoFocus
          id="query-Filter"
          placeholder="Search..."
          aria-label="Locations filter"
          value={this.props.query}
          onChange={e => this.props.onQuery(e.target.value)}
          />
        </div>
      );
    }
}


export default SearchField;
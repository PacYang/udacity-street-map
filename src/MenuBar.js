import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MenuBar.css';

class MenuBar extends Component {
 
// when a list item of venues is clicked, displayMarker function is called
displayMarker = venueName => {
    // eslint-disable-next-line
    this.props.markers.map(marker => {
        if (marker.title === venueName) {
        window.google.maps.event.trigger(marker, "click")
        }
    })
}
  
render () {
    return (
        <Menu width={ '25%' } isOpen noOverlay >
        <div className="venuelist" aria-label="List of Venues"> 
        {this.props.venues.map(selectedVenue => (
            <li role="menuitem"
                onClick={() => {
                this.displayMarker(selectedVenue.venue.name);
                }}
                aria-label={selectedVenue.venue.name}
                tabIndex="0"
                id={selectedVenue.venue.id}
                key={selectedVenue.venue.id}
            >
                <br />
                <strong>{selectedVenue.venue.name}</strong>
                <br />
                <em>{selectedVenue.venue.location.address}</em>
            </li>
            ))}
        </div>
        </Menu>
    );
}
}

export default MenuBar
const CLIENT_ID = 'LNKEUMRCDZDQI3NFHAFGSBW23FFJL14AI5AVFXNAHY3TR0V2';
const CLIENT_SECRET = 'EKIM4SFIW5H12UNYE5CX5SCC4NDSZLSY1JDLPIEWVK4SPTSK';
const VERSION = 20180323;

export const getVenues = (area, venue, limit) => {
  return fetch(`https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&limit=${limit}&near=${area.trim().toLowerCase()}&radius=100000&query=${venue.trim().toLowerCase()}`)
    .then(response => response.json())
    .then(result => result.response.venues);
}

export const getVenuePhoto = venueId => {
  return fetch(`https://api.foursquare.com/v2/venues/${venueId}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
    .then(response => response.json())
    .then(result => result.response.photos.items);
}

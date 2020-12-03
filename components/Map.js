import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

// Known issue with Leaflet & webpack: https://github.com/PaulLeCam/react-leaflet/issues/453
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const getGeolocation = (setPosition) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation:', position)
        const { latitude, longitude } = position.coords
        setPosition({ latitude, longitude })
      },
      (error) => {
        console.log('Geolocation error:', error)
        setPosition({ latitude: 52.76, longitude: 17.4 })
      },
    )
  }
}

const Map = ({ jobOffers }) => {
  const [center, setCenter] = React.useState({
    latitude: 52.76,
    longitude: 17.4,
  })
  React.useEffect(() => {
    getGeolocation(setCenter)
  }, [])

  console.log('Map', center)
  return (
    <MapContainer
      center={[center.latitude, center.longitude]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: 400, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {jobOffers.map((offer) => (
        <Marker key={offer.id} position={[offer.latitude, offer.longitude]}>
          <Popup>
            {offer.title}
            <br />
            {offer.company_name}
            <br />
            {offer.salary_from}-{offer.salary_to}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map

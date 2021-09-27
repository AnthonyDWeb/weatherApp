import { MapContainer } from 'react-leaflet'
import './CityMap.css';
import MyMap from './myMap';



function Citymap(props) {
    
    const position = [props.latitude, props.longitude]
    

    return (
        <MapContainer className="mapContainer" center={position} zoom={13} scrollWheelZoom={false}>
            <MyMap position={position} center={position} zoom={13}/>
      </MapContainer>
    )
}
export default Citymap;
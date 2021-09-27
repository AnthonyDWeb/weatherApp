import {TileLayer, Marker, Popup, useMap} from 'react-leaflet'


function MyMap(props) {
console.log('props', props)
    const map = useMap();
    map.setView(props.center, props.zoom);
  

    return (
        <>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.position}>
            <Popup>   
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </>
    )
}
export default MyMap;

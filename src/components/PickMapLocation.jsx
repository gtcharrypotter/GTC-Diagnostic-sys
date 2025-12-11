import L from "leaflet";
import { useEffect, useRef, useState } from "react";

import {
	CircleMarker,
	FeatureGroup,
	LayerGroup,
	MapContainer,
	Marker,
	Polygon,
	Popup,
	Rectangle,
	TileLayer,
	Tooltip,
	useMap,
	useMapEvents,
	Circle,
	GeoJSON,
} from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

import { features } from "../libs/sarangani.json";

var markerIcon = L.icon({
	iconUrl: "/marker-icon.png",
	iconSize: [25, 41], // size of the icon
	iconAnchor: [12.8, 40.8],
});

const mapStyle = {
	fillColor: "#fff",
	weight: 2,
	opacity: 1,
	color: "#808080",
	fillOpacity: 0.1,
	dashArray: "3",
};

const MapEvents = ({ handleClick }) => {
	const mapEvents = useMapEvents({
		click: (e) => {
			handleClick(e);
			console.log("mapEventsmapEvents click", e?.latlng);
		},
		mouseup: (e) => {
			handleClick(e);
			console.log("mapEventsmapEvents mouseup", e?.latlng);
		},
		moveend: (e) => {
			handleClick(e);
			console.log("mapEventsmapEvents moveend ", e?.latlng);
		},
		zoomend: () => {
			console.log("MapEventsmapEvents props", mapEvents);
		},
	});
};

const PickMapLocation = ({ propsCenter, position = null, setPosition }) => {
	const map_container_ref = useRef(null);
	const [center, setCenter] = useState([6.0498006, 125.15]);
	const [key, setKey] = useState(uuidv4());
	const [mounted, setMounted] = useState(0);
	const handleClick = (e) => {
		if (e.latlng) {
			setPosition(e.latlng);
		}
	};
	useEffect(() => {
		let t = setTimeout(() => {
			if (propsCenter?.lat && propsCenter?.lng && mounted == 0) {
				setCenter([propsCenter?.lat, propsCenter?.lng]);
				setKey(uuidv4());
				setMounted(1);
			}
		}, 300);
		return () => {
			clearTimeout(t);
		};
	}, [propsCenter?.lat, propsCenter?.lng]);
	var prevLayerClicked = null;
	const mapOnEachFeature = (feature, layer) => {
		layer.bindPopup(
			`${feature.properties.name}, ${feature.properties.city}`
		);
		layer.on({
			click: (e) => {
				// const map = mapRef.current.contextValue.map;
				var layer = e.target;
				// map.fitBounds(e.target.getBounds());
				if (prevLayerClicked !== null) {
					prevLayerClicked.setStyle({
						fillColor: "#FFF",
						weight: 2,
						opacity: 0.5,
						color: "#808080",
						fillOpacity: 0.1,
						dashArray: "3",
					});
				}
				layer.setStyle({
					weight: 4,
					color: "blue",
					dashArray: "",
					fillOpacity: 0.3,
				});
				if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
					layer.bringToFront();
				}
				prevLayerClicked = layer;
			},
		});
	};

	return (
		<div>
			<div className="h-[352px]">
				<MapContainer
					key={`map-key-${key}`}
					center={center}
					zoom={10}
					scrollWheelZoom={true}
					measureControl={true}
					ref={map_container_ref}
				>
					<MapEvents handleClick={handleClick} />
					<GeoJSON
						style={mapStyle}
						data={features}
						onEachFeature={mapOnEachFeature}
					/>

					{position && (
						<Marker
							position={position}
							draggable={true}
							icon={markerIcon}
						/>
					)}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
			</div>
			{/* <Map
				center={this.props.center}
				zoom={this.props.zoom}
				onClick={this.handleClick}
			>
				<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
				{position && (
					<Marker position={position} draggable={true}>
						<Popup position={position}>
							Current location:{" "}
							<pre>{JSON.stringify(position, null, 2)}</pre>
						</Popup>
					</Marker>
				)}
			</Map> */}
		</div>
	);
};
export default PickMapLocation;

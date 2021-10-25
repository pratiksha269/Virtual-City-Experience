import React, { useState } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Control from './components/Control'
import ReactPlayer from 'react-player';
import mui from './plugins/materialui';

import {
	cities as citiesData,
	areas as areasData
} from './data'

const App = () => {

	//Initializing dark theme
	const theme = React.useMemo(() => createMuiTheme(mui.getTheme()), []);

	const [player, setPlayer] = useState(null)

	const [cities] = useState(citiesData)
	const [city, setCity] = useState(cities[0])

	const [areas] = useState(areasData)
	const [cityAreas, setCityAreas] = useState(
		areas.filter(
			a => a.cityId === city.id
		)
	)
	const [area, setArea] = useState(areas[0])

	// Video States
	const [video, setVideo] = useState({
		loop: true,
		volume: 0.9,
		isMuted: true,
		playbackRate: 1,
		wasMuted: true,
		showNoise: true,
		controls: false,
		isPlaying: false,
	})

	const _setVideo = (changes) => {
		setVideo(prevVideo => ({
			...prevVideo,
			...changes
		}))
	}
	// Changing to new video
	const handleChangeCity = (cityId) => {
		setCity(cities.find(city => city.id === cityId))
		const newAreas = areas.filter(area => area.cityId === cityId)
		const newArea = newAreas[0]

		setCityAreas(newAreas)
		setArea(newAreas[0])

	}

	const handleChangeArea = areaId => {
		setArea(cityAreas.find(area => area.id === areaId))

	}

	const handleYTPlayerOnReady = player => {
		setPlayer(player)
		_setVideo({
			isPlaying: true,
			isMuted: video.wasMuted,
		})
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Control

				video={video}

				city={city}
				area={area}
				cities={cities}
				areas={cityAreas}

				onChangeCity={handleChangeCity}
				onChangeArea={handleChangeArea}
				onPlaybackRate={playbackRate => _setVideo({ playbackRate })}
				onStreetNoise={() => _setVideo({ isMuted: !video.isMuted })}

			/>

			<div className="yt-player">
				<ReactPlayer
					width='100%'
					height='100%'
					url={area.video}
					loop={video.loop}
					volume={video.volume}
					muted={video.isMuted}
					playing={video.isPlaying}
					controls={video.controls}
					onReady={handleYTPlayerOnReady}
					playbackRate={video.playbackRate}
					
				/>
				{video.showNoise && <div className='yt-player__noise' />}
			</div>
		</ThemeProvider>
	);
}
export default App;

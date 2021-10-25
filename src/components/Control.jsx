import { useState } from 'react';
import {
	Grid,
	Select,
	Container,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	IconButton,
	Slider,
	Button,
	//CircularProgress
} from '@material-ui/core';

import {
	Pause as PauseIcon,
	SkipNext as SkipNextIcon,
	PlayArrow as PlayArrowIcon,
	SkipPrevious as SkipPreviousIcon,
	Visibility as VisibilityIcon
} from '@material-ui/icons'

// Stylesheet
import '../assets/scss/components/control.scss'

import img1 from './ig.png';


const Control = ({
	video,

	city, area,
	cities, areas,

	onStreetNoise, onChangeCity,
	onPlaybackRate, onChangeArea,


}) => {

	const [playbackRates] = useState([
		{ value: 1, text: '1x' },
		{ value: 1.5, text: '1.5x' },
		{ value: 2, text: '2x' },
	]);
	const [isVisible, setIsVisible] = useState(true)


	return (
		<div className='control relative'>
			<div className='control__visibility'>
				<IconButton
					aria-label="visibility"
					onClick={() => setIsVisible(!isVisible)}
				>
					<VisibilityIcon />
				</IconButton>
			</div>
			<div className={`control__content${isVisible ? ' visible' : ''}`}>
				<a href="https://www.instagram.com/e_stroll/">
					<img src={img1} alt="" height="40px" />
				</a>
				<Container>
					<Grid container spacing={6}>
						<Grid item sm={12} lg={2}>
							<div className="h-full flex items-center">
								<Typography style={{ justifyContent: 'flex-start' }} style={{ fontSize: 30 }} variant='h5' className='ws-nowrap'>Virtual City Experience</Typography>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className='flex flex-col justify-center h-full'>
								<div className='flex items-center'>

									<Typography
										variant='body2'
										color='inherit'
										target='_blank'
										href={area.video}
										rel="noopener noreferrer"
										className='flex-none td-none'
										variantMapping={{ 'body2': 'a' }}
										style={{ width: '40%' }}
									>

									</Typography>
									<FormControl variant="outlined" className='w-full'>
										<InputLabel id="select-city-label">City</InputLabel>
										<Select
											label="City"
											id="select-city"
											labelId="select-city-label"
											value={city.id}
											onChange={e => onChangeCity(+e.target.value)}
										>
											{cities.map(city => (
												<MenuItem
													key={city.id}
													value={city.id}
												>
													{city.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
								<div className='flex items-center mt-4'>
									<Typography
										variant='body2'
										className='flex-none'
										style={{ width: '40%' }}
									>

									</Typography>
									<FormControl variant="outlined" className='w-full'>
										<InputLabel id="select-area-label">Season</InputLabel>
										<Select
											labelId="select-area-label"
											id="select-area"
											value={area.id}
											onChange={e => onChangeArea(+e.target.value)}
											label="Area"
										>
											{areas.map(area => (
												<MenuItem
													key={area.id}
													value={area.id}
												>
													{area.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<div className='h-full flex flex-col outline w-25 pa3 mr2 justify-center'>
								<div className="control__noise h-full w-full flex items-center">

									<Typography
										variant='body2'
										className='ws-nowrap'
										style={{ width: '35%' }}
									>
										Street Noise
									</Typography>
									<Button
										color="primary"
										variant="contained"
										className='ml-auto'
										onClick={() => onStreetNoise && onStreetNoise()}
									>
										{video.isMuted ? 'OFF' : 'ON'}
									</Button>
								</div>
								<div className='control__speeds h-full w-full flex items-center mt-4 lg:mt-0'>
									<Typography
										variant='body2'
										className='ws-nowrap flex-none'
										style={{ width: '35%' }}
									>
										Speed
									</Typography>
									{playbackRates.map((rate, i) => (
										<Button
											size='small'
											color="primary"
											key={rate.value}
											variant={
												video.playbackRate === rate.value
													? "contained"
													: "outlined"
											}
											className={i === 0 ? 'ml-auto' : ''}
											onClick={() => onPlaybackRate(rate.value)}
										>
											{rate.text}
										</Button>
									))}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} md={4}>
							<div className='audio'>
								<div className="audio__header">
									<Typography variant="subtitle1"></Typography>
								</div>
								<div className="audio__control">
									<div className='audio__buttons flex justify-between'>
										<div className="flex-none flex items-center">
											<div>
												<iframe src="https://open.spotify.com/embed/playlist/5vR2rHuXmcxDmYKNYgJw2g" 
												width="400" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		</div>
	);
}

export default Control;



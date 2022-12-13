import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfiles, setProfiles, reloadRejectedProfiles } from 'redux/slices/SwipeSlice'
import './Swipe.scss';

import ProfileCard from './ProfileCard/ProfileCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

function Swipe() {
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	var profiles = useSelector(selectProfiles);

	useEffect(() => {
		fetch('/assets/profiles.json')
		.then(response => response.json())
		.then(((profiles: any[]) => {
			dispatch(setProfiles(profiles));
			setIsLoading(false);
		}))
	 }, [dispatch]);

	var profileCards = profiles.filter(profile => profile.Status === "candidate").filter((profile, index) => index < 3).reverse().map(profile => {
		return (<ProfileCard profile={profile} key={profile.UserName}></ProfileCard>);
	});

	const reloadClicked = function() {
		setIsLoading(true);
		setTimeout(() => {
			dispatch(reloadRejectedProfiles(""));
			setIsLoading(false);
		}, 2000);
	}

	const rejectedCount = profiles.reduce((count, profile) => {
		if (profile.Status === "rejected") {
			return ++count;
		}
		return count;
	}, 0);

	const acceptedCount = profiles.reduce((count, profile) => {
		if (profile.Status === "accepted") {
			return ++count;
		}
		return count;
	}, 0);

	var endOfListMessage = <div></div>;

	if (profiles.length === 0) {
		endOfListMessage = (
			<div>
				<div className={`reload ${isLoading ? "loading" : ""}`}>
					<FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
				</div>
			</div>
		);
	} else if (acceptedCount > 0) {
		endOfListMessage = (
			<div>
				<h3>You're outta profiles! Talk to your matches on slack</h3>
				{/* <Link to="/messages">Go talk to your matches!</Link> */}
			</div>
		);
	} else if (rejectedCount > 0) {
		endOfListMessage = (
			<div>
				<div>
					<h3>You're outta profiles!</h3>
					<p>
						Try not to swipe left on all of them this time.
					</p>
				</div>
				<div 
					className={`reload ${isLoading ? "loading" : ""}`} 
					onClick={reloadClicked}>
						<FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
				</div>
			</div>
		);
	}

	return (
	<div className="swipe-container">
		{profileCards}
		<div className="end-of-list-message">
			{endOfListMessage}
		</div>
	</div>
	);
}

export default Swipe;

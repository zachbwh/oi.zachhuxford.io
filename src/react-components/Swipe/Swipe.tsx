import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfiles } from 'redux/slices/SwipeSlice'
import './Swipe.scss';

import ProfileCard from './ProfileCard/ProfileCard';

function Swipe() {
	const profiles = useSelector(selectProfiles);

	var profileCards = profiles.filter(profile => profile.Status === "candidate").map(profile => {
		return (<ProfileCard profile={profile} key={profile.UserName}></ProfileCard>);
	});

	return (
	<div className="swipe-container">
		{profileCards}
	</div>
	);
}

export default Swipe;

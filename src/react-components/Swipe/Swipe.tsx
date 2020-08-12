import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfiles, setProfiles } from 'redux/slices/SwipeSlice'
import './Swipe.scss';

import ProfileCard from './ProfileCard/ProfileCard';

function Swipe() {
	const dispatch = useDispatch();

	var profiles = useSelector(selectProfiles);

	useEffect(() => {
		fetch('/assets/profiles.json')
		.then(response => response.json())
		.then(((profiles: any[]) => {
			dispatch(setProfiles(profiles));
		}))
	 }, [dispatch]);

	var profileCards = profiles.filter(profile => profile.Status === "candidate").filter((profile, index) => index < 3).map(profile => {
		return (<ProfileCard profile={profile} key={profile.UserName}></ProfileCard>);
	});

	return (
	<div className="swipe-container">
		{profileCards}
	</div>
	);
}

export default Swipe;

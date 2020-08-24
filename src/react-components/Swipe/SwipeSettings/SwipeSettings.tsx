import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile, setProfiles } from 'redux/slices/SwipeSlice'

import Moment from 'moment'
import './SwipeSettings.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPencilAlt, faImages } from "@fortawesome/free-solid-svg-icons";

function SwipeSettings() {
	const dispatch = useDispatch();

	var userProfile = useSelector(selectUserProfile),
		userProfileImage = userProfile?.ProfileImages[4] ?? null;

	useEffect(() => {
		fetch('/assets/profiles.json')
		.then(response => response.json())
		.then(((profiles: any[]) => {
			dispatch(setProfiles(profiles));
		}));
	 }, [dispatch]);

	 var profileThing;
	 if (!userProfile) {
		profileThing = (
			<div>
			</div>
		);
	 } else {
		const age = Moment(new Date()).diff(userProfile.BirthDate, 'years');

		profileThing = [
			(<div key="1">
				<img src={userProfileImage.ImageUrl} alt={userProfileImage.ImageAltText}></img>
			</div>),
			(<h3 key="2">{userProfile.ShortName} <span className="age">{age}</span></h3>),
			(<div key="3">
				{userProfile.Occupation}
			</div>),
			(<div key="4" className="actions">
				<div>
					<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
					<div>Settings</div>
				</div>
				<div>
					<FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
					<div>Add Media</div>
				</div>
				<div>
					<FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
					<div>Edit Profile</div>
				</div>
			</div>)
		];
	 }

	return (
		<div className="swipe-settings">
			{profileThing}
		</div>
	);
}

export default SwipeSettings;
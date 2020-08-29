import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile, setProfiles } from 'redux/slices/SwipeSlice'

import Moment from 'moment'
import './SwipeUserProfile.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPencilAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SwipeUserProfile() {
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
					<Link to="/swipe/settings">
						<FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
						<div>Settings</div>
					</Link>
				</div>
				<div>
					<Link to="/swipe/edit-media">
						<FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
						<div>Add Media</div>
					</Link>
				</div>
				<div>
					<Link to="/swipe/edit-profile">
						<FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
						<div>Edit Profile</div>
					</Link>
				</div>
			</div>)
		];
	 }

	return (
		<div className="swipe-user-profile">
			{profileThing}
		</div>
	);
}

export default SwipeUserProfile;
import React, { useRef, useLayoutEffect, useState } from 'react';
import './ProfileCardPreview.scss'

import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons'

import ProfileImages from '../ProfileImages/ProfileImages'

import IProfile from 'typescript-types/Swipe/IProfile';

interface ProfileCardPreviewProps {
	profile: IProfile,
	imageIndex: number,
	setImageIndex: (newImageIndex: number) => void,
	toggleViewMode: () => void
}

function ProfileCardPreview({profile, imageIndex, setImageIndex, toggleViewMode}: ProfileCardPreviewProps) {
	const age = Moment(new Date()).diff(profile.BirthDate, 'years');
	const [headerTranslateY, setHeaderTranslateY] = useState(0);
	const firstBodyRef = useRef<HTMLDivElement>(null);
	const secondBodyRef = useRef<HTMLDivElement>(null);

	var previewBody;

	if (imageIndex === 0) {
		var bio = profile.Biography,
			bioPreview = bio.split("\n")[0];

		if (bio !== bioPreview) {
			bioPreview += "\n..."
		}

		previewBody = (
			<div ref={firstBodyRef}>
				<p className="biography">
					{bio}
				</p>
			</div>
		);
	} else if (imageIndex > 0) {
		previewBody = (
			<div ref={secondBodyRef}>
				<p>
					<FontAwesomeIcon icon={faBriefcase} /> {profile.Occupation}
					<br />
					<FontAwesomeIcon icon={faHome} /> Lives in {profile.Locality.ShortName}
				</p>
			</div>
		);
	}

	useLayoutEffect(() => {
		var newHeaderTranslateY = 0;
		if (imageIndex === 0) {
			newHeaderTranslateY = firstBodyRef.current?.offsetHeight || 0;
		} else if (imageIndex > 0) {
			newHeaderTranslateY = secondBodyRef.current?.offsetHeight || 0;
		}
		newHeaderTranslateY += 15;
		setHeaderTranslateY(newHeaderTranslateY);
	}, [imageIndex]);


	return (
		<div className="profile-card-preview">
			<ProfileImages profileImages={profile.ProfileImages} imageIndex={imageIndex} setImageIndex={setImageIndex} />
			<div className="profile-body" onClick={toggleViewMode}>
				<div className="section">
					<h3 className="profile-header" style={{transform: `translateY(${-headerTranslateY}px)`}}>{profile.ShortName} <span className="age">{age}</span></h3>
					{previewBody}
				</div>
			</div>
		</div>
	);
}

export default ProfileCardPreview;

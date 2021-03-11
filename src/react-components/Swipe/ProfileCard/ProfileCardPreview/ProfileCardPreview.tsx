import React, { useRef, useLayoutEffect, useState } from 'react';
import './ProfileCardPreview.scss'

import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons'

import ProfileImages from '../ProfileImages/ProfileImages'

import IProfile from 'typescript-types/Swipe/IProfile';

const ProfileCardPreview: React.FunctionComponent<{profile: IProfile, imageIndex: number, setImageIndex: any, toggleViewMode: any;}> = props => {
	const age = Moment(new Date()).diff(props.profile.BirthDate, 'years');
	const [headerTranslateY, setHeaderTranslateY] = useState(0);
	const firstBodyRef = useRef<HTMLDivElement>(null);
	const secondBodyRef = useRef<HTMLDivElement>(null);

	var previewBody;

	if (props.imageIndex === 0) {
		var bio = props.profile.Biography,
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
	} else if (props.imageIndex > 0) {
		previewBody = (
			<div ref={secondBodyRef}>
				<p>
					<FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon> {props.profile.Occupation}
					<br />
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Lives in {props.profile.Locality.ShortName}
				</p>
			</div>
		);
	}

	useLayoutEffect(() => {
		var newHeaderTranslateY = 0;
		if (props.imageIndex === 0) {
			newHeaderTranslateY = firstBodyRef.current?.offsetHeight || 0;
		} else if (props.imageIndex > 0) {
			newHeaderTranslateY = secondBodyRef.current?.offsetHeight || 0;
		}
		newHeaderTranslateY += 15;
		setHeaderTranslateY(newHeaderTranslateY);
	}, [props.imageIndex]);


	return (
		<div className="profile-card-preview">
			<ProfileImages profileImages={props.profile.ProfileImages} imageIndex={props.imageIndex} setImageIndex={props.setImageIndex}></ProfileImages>
			<div className="profile-body" onClick={props.toggleViewMode}>
				<div className="section">
					<h3 className="profile-header" style={{transform: `translateY(${-headerTranslateY}px)`}}>{props.profile.ShortName} <span className="age">{age}</span></h3>
					{previewBody}
				</div>
			</div>
		</div>
	);
}

export default ProfileCardPreview;

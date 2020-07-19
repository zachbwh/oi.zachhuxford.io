import React, { useState } from 'react';
import './ProfileCardDetail.scss'

import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase } from '@fortawesome/free-solid-svg-icons'

import ProfileImages from '../ProfileImages/ProfileImages'

import IProfile from 'typescript-types/IProfile';

const ProfileCardDetail: React.FunctionComponent<{profile: IProfile, toggleViewMode: any;}> = props => {
	const age = Moment(new Date()).diff(props.profile.BirthDate, 'years');

	return (
		<div className="profile-card-detail">
			<ProfileImages profileImages={props.profile.ProfileImages}></ProfileImages>
			<div className="profile-body">
				<div className="section">
					<h3>{props.profile.ShortName} <span className="age">{age}</span></h3>
					<div>
						<p>
							<FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon> {props.profile.Occupation}
						</p>
						<p>
							<FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Lives in {props.profile.Locality.ShortName}
						</p>
					</div>
				</div>
				<hr />
				<div className="section">
					<p className="biography">
						{props.profile.Biography}
					</p>
				</div>
				<hr />
			</div>
		</div>
	);
}

export default ProfileCardDetail;

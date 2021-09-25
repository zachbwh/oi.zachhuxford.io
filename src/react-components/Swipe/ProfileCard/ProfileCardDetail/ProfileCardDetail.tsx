import React from 'react';
import './ProfileCardDetail.scss'

import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

import ProfileImages from '../ProfileImages/ProfileImages'

import IProfile from 'typescript-types/Swipe/IProfile';

interface ProfileCardDetailProps {
	profile: IProfile,
	imageIndex: number,
	setImageIndex: any,
	toggleViewMode: any
}

function ProfileCardDetail({ profile, imageIndex, setImageIndex, toggleViewMode }: ProfileCardDetailProps) {
	const age = Moment(new Date()).diff(profile.BirthDate, 'years');

	return (
		<div className="profile-card-detail">
			<ProfileImages profileImages={profile.ProfileImages} imageIndex={imageIndex} setImageIndex={setImageIndex} />
			<div className="profile-body">
				<div className="section">
					<h3 className="profile-header">{profile.ShortName} <span className="age">{age}</span></h3>
					<div>
						<p>
							<FontAwesomeIcon icon={faBriefcase} /> {profile.Occupation}
						</p>
						<p>
							<FontAwesomeIcon icon={faHome} /> Lives in {profile.Locality.ShortName}
						</p>
					</div>
				</div>
				<hr />
				<div className="section">
					<p className="biography">
						{profile.Biography}
					</p>
				</div>
				<hr />
				<div className="toggle-view-mode">
					<div className="circle" onClick={toggleViewMode}><FontAwesomeIcon icon={faArrowAltCircleDown} /></div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCardDetail;

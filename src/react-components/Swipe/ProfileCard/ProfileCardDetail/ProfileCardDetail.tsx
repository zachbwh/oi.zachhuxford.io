import React from 'react';
import './ProfileCardDetail.scss'

import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

import ProfileImages from '../ProfileImages/ProfileImages'

import IProfile from 'typescript-types/IProfile';

const ProfileCardDetail: React.FunctionComponent<{profile: IProfile, imageIndex: number, setImageIndex: any, toggleViewMode: any;}> = props => {
	const age = Moment(new Date()).diff(props.profile.BirthDate, 'years');

	return (
		<div className="profile-card-detail">
			<ProfileImages profileImages={props.profile.ProfileImages} imageIndex={props.imageIndex} setImageIndex={props.setImageIndex}></ProfileImages>
			<div className="profile-body">
				<div className="section">
					<h3 className="profile-header">{props.profile.ShortName} <span className="age">{age}</span></h3>
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
				<div className="toggle-view-mode">
					<div className="circle" onClick={props.toggleViewMode}><FontAwesomeIcon icon={faArrowAltCircleDown}></FontAwesomeIcon></div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCardDetail;

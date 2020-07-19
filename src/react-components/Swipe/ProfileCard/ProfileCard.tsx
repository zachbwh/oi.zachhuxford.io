import React, { useState } from 'react';
import './ProfileCard.scss'

import ProfileCardDetail from './ProfileCardDetail/ProfileCardDetail'
import ProfileCardPreview from './ProfileCardPreview/ProfileCardPreview'

import IProfile from 'typescript-types/IProfile';

const ProfileCard: React.FunctionComponent<{profile: IProfile;}> = props => {

	const [viewMode, setViewMode] = useState("preview");
	var cardContent;

	if (viewMode === "preview") {
		cardContent = <ProfileCardPreview profile={props.profile} toggleViewMode={() => setViewMode("detail")}></ProfileCardPreview>;
	} else {
		cardContent = <ProfileCardDetail profile={props.profile} toggleViewMode={() => setViewMode("preview")}></ProfileCardDetail>;
	}

	return (
		<div className="profile-card">
			{cardContent}
		</div>
	);
}

export default ProfileCard;

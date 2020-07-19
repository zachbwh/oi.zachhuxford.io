import React from 'react';
import './ProfileImageIndicator.scss'

const ProfileImageIndicator: React.FunctionComponent<{isActive: boolean; count: number;}> = props => {
	return (
		<div className={`profile-image-indicator ${props.isActive ? "active" : "inactive"}`} style={{"width": `calc(${100 / props.count}% - 4px)`}}>
		</div>
	);
}

export default ProfileImageIndicator;

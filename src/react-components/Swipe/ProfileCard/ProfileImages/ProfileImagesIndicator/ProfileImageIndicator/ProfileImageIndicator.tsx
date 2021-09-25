import React from 'react';
import './ProfileImageIndicator.scss'

interface ProfileImageIndicatorProps {
	isActive: boolean,
	count: number
}

function ProfileImageIndicator({isActive, count}: ProfileImageIndicatorProps) {
	return (
		<div
			className={`profile-image-indicator ${isActive ? "active" : "inactive"}`}
			style={{"width": `calc(${100 / count}% - 4px)`}}
		/>
	);
}

export default ProfileImageIndicator;

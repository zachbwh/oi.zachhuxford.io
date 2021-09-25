import React from 'react';
import './ProfileImage.scss'

import IProfileImage from 'typescript-types/Swipe/IProfileImage';

interface ProfileImageProps {
	index: number,
	visibleIndex: number,
	profileImage: IProfileImage
}

function ProfileImage({index, visibleIndex, profileImage}: ProfileImageProps) {
	var imageClass = "hidden";

	if (visibleIndex === index) {
		imageClass = "top";
	} else if (visibleIndex === index - 1 || visibleIndex === index + 1) {
		imageClass = "adjacent"
	}

	var imgStyle : React.CSSProperties = {};
	if (typeof profileImage.Offset !== "undefined") {
		imgStyle = {
			position: "absolute",
			width: "auto",
			right: `${profileImage.Offset}px`
		}
	}
	
	return (
	<div className={`profile-image ${imageClass}`}>
		<img src={imageClass !== "hidden" ? profileImage.ImageUrl : ""} alt={profileImage.ImageAltText} style={imgStyle}></img>
    </div>
	);
}
export default ProfileImage;

import React from 'react';
import './ProfileImage.scss'

import IProfileImage from 'typescript-types/Swipe/IProfileImage';

const ProfileImage: React.FunctionComponent<{index: number, visibleIndex: number, profileImage: IProfileImage;}> = props => {
	var imageClass = "hidden",
		visibleIndex = props.visibleIndex,
		index = props.index;

	if (visibleIndex === index) {
		imageClass = "top";
	} else if (props.visibleIndex === props.index - 1 || props.visibleIndex === props.index + 1) {
		imageClass = "adjacent"
	}

	var imgStyle : React.CSSProperties = {};
	if (typeof props.profileImage.Offset !== "undefined") {
		imgStyle = {
			position: "absolute",
			width: "auto",
			right: `${props.profileImage.Offset}px`
		}
	}
	
	return (
	<div className={`profile-image ${imageClass}`}>
		<img src={imageClass !== "hidden" ? props.profileImage.ImageUrl : ""} alt={props.profileImage.ImageAltText} style={imgStyle}></img>
    </div>
	);
}
export default ProfileImage;

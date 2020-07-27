import React, { useState } from 'react';
import './ProfileImages.scss'

import ProfileImage from './ProfileImage/ProfileImage'
import ProfileImagesIndicator from './ProfileImagesIndicator/ProfileImagesIndicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import IProfileImage from 'typescript-types/IProfileImage'

var imageList = [
	"isolation-April 03, 2020-9.jpg", 
	"isolation-April 07, 2020-6.jpg", 
	// "isolation-April 07, 2020-7.jpg", 
	"isolation-April 07, 2020-8.jpg", 
	"isolation-April 10, 2020-10.jpg", 
	"isolation-April 10, 2020-49.jpg", 
	// "isolation-April 10, 2020-50.jpg", 
	// "isolation-April 10, 2020-52.jpg", 
	// "isolation-April 11, 2020-6.jpg", 
	// "isolation-April 13, 2020-10.jpg", 
	// "isolation-April 13, 2020-9.jpg", 
	// "isolation-April 17, 2020-10.jpg", 
	// "isolation-April 17, 2020-3.jpg", 
	// "isolation-April 17, 2020-4.jpg", 
	// "isolation-April 17, 2020-5.jpg", 
	// "isolation-April 17, 2020-6.jpg", 
	// "isolation-April 18, 2020-23.jpg", 
	// "isolation-April 18, 2020-28.jpg", 
	// "isolation-April 18, 2020-36.jpg", 
	// "isolation-April 18, 2020-37.jpg", 
	// "isolation-April 18, 2020-39.jpg", 
	// "isolation-April 18, 2020-57.jpg", 
	// "isolation-April 18, 2020-63.jpg", 
	// "isolation-April 26, 2020-7.jpg", 
	// "isolation-March 20, 2020-11.jpg", 
	// "isolation-March 20, 2020-12.jpg", 
	// "isolation-March 20, 2020-28.jpg", 
	// "isolation-March 20, 2020-29.jpg", 
	// "isolation-March 20, 2020-31.jpg", 
	// "isolation-March 20, 2020-3.jpg", 
	// "isolation-March 20, 2020.jpg", 
	// "isolation-March 21, 2020-10.jpg", 
	// "isolation-March 21, 2020-7.jpg", 
	// "isolation-March 21, 2020-8.jpg", 
	// "isolation-March 21, 2020-9.jpg", 
	// "isolation-March 23, 2020.jpg", 
	// "isolation-March 25, 2020-2.jpg", 
	// "isolation-March 28, 2020-8.jpg", 
	// "isolation-March 29, 2020-4.jpg", 
	// "isolation-March 29, 2020.jpg", 
	// "isolation-May 01, 2020-11.jpg", 
	// "isolation-May 01, 2020-7.jpg", 
	// "isolation-May 01, 2020-9.jpg", 
	// "isolation-May 02, 2020-6.jpg", 
	// "isolation-May 06, 2020-2.jpg", 
	// "isolation-May 08, 2020-33.jpg", 
	// "isolation-May 08, 2020-35.jpg"
];
const ProfileImages: React.FunctionComponent<{profileImages: IProfileImage[], imageIndex: number, setImageIndex: any;}> = props => {
	const imageIndex = props.imageIndex;
	const [isFirstImage, setIsFirstImage] = useState(imageIndex <= 0);
	const [isLastImage, setIsLastImage] = useState(imageIndex >= props.profileImages.length - 1);

	const prevImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex > 0) {
			newImageIndex = imageIndex - 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= props.profileImages.length - 1);
			if (props.setImageIndex) {
				props.setImageIndex(newImageIndex);
			}
		}
	}

	const nextImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex < props.profileImages.length - 1) {
			newImageIndex = imageIndex + 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= props.profileImages.length - 1);
			if (props.setImageIndex) {
				props.setImageIndex(newImageIndex);
			}
		}
	}

	var profileImagesElements = props.profileImages.map((profileImage, index) => (
		<ProfileImage key={index} index={index} visibleIndex={imageIndex} profileImage={profileImage}></ProfileImage>
	))

	return (
		<div className="profile-images">
			<div className="profile-images-inner">
				<ProfileImagesIndicator index={imageIndex} profileImages={props.profileImages}></ProfileImagesIndicator>
				{profileImagesElements}
				<div className={`profile-images-controls ${isFirstImage ? "first-image" : ""} ${isLastImage ? "last-image" : ""}`}>
					<div className="profile-images-left-control" onClick={prevImage}>
						<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
					</div>
					<div className="profile-images-right-control" onClick={nextImage}>
						<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
					</div>
				</div>
			</div>
			
		</div>
	);
}

export default ProfileImages;
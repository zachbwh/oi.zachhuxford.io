import React, { useState } from 'react';
import './ProfileImages.scss'

import ProfileImage from './ProfileImage/ProfileImage'
import ProfileImagesIndicator from './ProfileImagesIndicator/ProfileImagesIndicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import IProfileImage from 'typescript-types/Swipe/IProfileImage'

interface ProfileImagesProps {
	profileImages: IProfileImage[],
	imageIndex: number,
	setImageIndex: any
}

function ProfileImages({ profileImages, imageIndex, setImageIndex }: ProfileImagesProps) {
	const [isFirstImage, setIsFirstImage] = useState(imageIndex <= 0);
	const [isLastImage, setIsLastImage] = useState(imageIndex >= profileImages.length - 1);

	const prevImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex > 0) {
			newImageIndex = imageIndex - 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= profileImages.length - 1);
			if (setImageIndex) {
				setImageIndex(newImageIndex);
			}
		}
	}

	const nextImage = function() {
		var newImageIndex = imageIndex;
		if (imageIndex < profileImages.length - 1) {
			newImageIndex = imageIndex + 1;
			setIsFirstImage(newImageIndex <= 0);
			setIsLastImage(newImageIndex >= profileImages.length - 1);
			if (setImageIndex) {
				setImageIndex(newImageIndex);
			}
		}
	}

	var profileImagesElements = profileImages.map((profileImage, index) => (
		<ProfileImage key={index} index={index} visibleIndex={imageIndex} profileImage={profileImage}></ProfileImage>
	))

	return (
		<div className="profile-images">
			<div className="profile-images-inner">
				<ProfileImagesIndicator index={imageIndex} profileImages={profileImages}></ProfileImagesIndicator>
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
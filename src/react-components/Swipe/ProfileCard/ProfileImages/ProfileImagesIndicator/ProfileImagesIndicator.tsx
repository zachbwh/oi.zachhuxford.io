import React from 'react';
import './ProfileImagesIndicator.scss'

import ProjectImageIndicator from './ProfileImageIndicator/ProfileImageIndicator'
import IProfileImage from 'typescript-types/Swipe/IProfileImage';

interface ProfileImagesIndicatorProps {
    index: number,
    profileImages: IProfileImage[]
}

function ProfileImagesIndicator({index, profileImages}: React.PropsWithChildren<ProfileImagesIndicatorProps>) {
    var indicatorElements = profileImages.map((profileImage, i) => {
        return <ProjectImageIndicator key={i} isActive={index === i} count={profileImages.length} />
    });
    
    return <div className="profile-images-indicator">{indicatorElements}</div>
}

export default ProfileImagesIndicator;

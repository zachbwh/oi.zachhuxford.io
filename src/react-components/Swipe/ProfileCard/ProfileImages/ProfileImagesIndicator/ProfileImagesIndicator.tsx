import React from 'react';
import './ProfileImagesIndicator.scss'

import ProjectImageIndicator from './ProfileImageIndicator/ProfileImageIndicator'
import IProfileImage from 'typescript-types/Swipe/IProfileImage';

const ProfileImagesIndicator: React.FunctionComponent<{index: number; profileImages: IProfileImage[];}> = props => {
    var indicatorElements = props.profileImages.map((profileImage, index) => {
        return (
            <ProjectImageIndicator key={index} isActive={props.index === index} count={props.profileImages.length}></ProjectImageIndicator>
        );
    })
    return (
        <div className="profile-images-indicator">
            {indicatorElements}
        </div>
    );
}

export default ProfileImagesIndicator;

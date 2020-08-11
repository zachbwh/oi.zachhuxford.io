import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { acceptProfileAsync, rejectProfileAsync } from 'redux/slices/SwipeSlice'

import './ProfileCard.scss'

import ProfileCardDetail from './ProfileCardDetail/ProfileCardDetail'
import ProfileCardPreview from './ProfileCardPreview/ProfileCardPreview'

import IProfile from 'typescript-types/IProfile';

interface ProfileCardProps {
	profile: IProfile
}

interface ProfileCardState {
	downOnCard: boolean,
	viewMode: "preview" | "detail",
	deltaX: number,
	deltaY: number,
	rotate: number,
	swipeProgress: number,
	imageIndex: number
}

const maxCardRotate = 25;
const maxTimeOnCardToClick = 250;
const cardSpeedToAcceptOrReject = 0.3;

const ProfileCard: React.FunctionComponent<ProfileCardProps> = props => {
	const [downOnCard, setDownOnCard] = useState(false);
	const [viewMode, setViewMode] = useState<"preview" | "detail">("preview");
	const [deltaX, setDeltaX] = useState(0);
	const [deltaY, setDeltaY] = useState(0);
	const [rotate, setRotate] = useState(0);
	const [swipeProgress, setSwipeProgress] = useState(0);
	const [imageIndex, setImageIndex] = useState(0);

	const [downOnCardStartTime, setDownOnCardStartTime] = useState<Date | null>(null);
	// time down on card should be calculated each render cycle
	const [referenceTouch, setReferenceTouch] = useState<React.Touch | null>(null);

	const dispatch = useDispatch();

	const handleProfileCardMouseDown = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		setDownOnCard(true);
		setDownOnCardStartTime(new Date());
	}

	const handleProfileCardMouseMove = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (!downOnCard || viewMode === "detail") {
			return;
		}

		var newDeltaX = deltaX + event.movementX,
			newDeltaY = deltaY + event.movementY;

		updateCardTransform(newDeltaX, newDeltaY);
	}

	const handleProfileCardMouseUp = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const timeDownOnCard = Date.now() - (downOnCardStartTime?.getTime() ?? 0);

		var speed = Math.abs(deltaX) / timeDownOnCard;

		if (swipeProgress > 0.5 || (speed > cardSpeedToAcceptOrReject && swipeProgress > 0.05)) {
			accept();
		} else if (swipeProgress < -0.5  || (speed > cardSpeedToAcceptOrReject && swipeProgress < 0.05)) {
			reject();
		} else {
			updateCardTransform(0, 0);
		}

		setDownOnCard(false);
	}

	const handleProfileCardTouchStart = function(event: React.TouchEvent<HTMLDivElement>) {
		setDownOnCard(true);
		setDownOnCardStartTime(new Date());
		setReferenceTouch(event.targetTouches.item(0))
	}

	const handleProfileCardTouchMove = function(event: React.TouchEvent<HTMLDivElement>) {
		if (!downOnCard || viewMode === "detail") {
			return;
		}

		var newDeltaX = event.targetTouches[0].pageX - (referenceTouch?.pageX ?? 0),
			newDeltaY = event.targetTouches[0].pageY - (referenceTouch?.pageY ?? 0);
		updateCardTransform(newDeltaX, newDeltaY);
	}

	const handleProfileCardTouchEnd = function(event: React.TouchEvent<HTMLDivElement>) {
		const timeDownOnCard = Date.now() - (downOnCardStartTime?.getTime() ?? 0);

		var speed = Math.abs(deltaX) / timeDownOnCard;
		console.log(speed);

		if (swipeProgress > 0.5 || (speed > cardSpeedToAcceptOrReject && swipeProgress > 0.05)) {
			accept();
		} else if (swipeProgress < -0.5  || (speed > cardSpeedToAcceptOrReject && swipeProgress < 0.05)) {
			reject();
		} else {
			updateCardTransform(0, 0);
		}

		setDownOnCard(false);
	}

	const updateCardTransform = function(newDeltaX: number, newDeltaY: number) {
		var windowWidth = window.innerWidth,
			newSwipeProgress = newDeltaX / (windowWidth / 2);

		var newRotate = newSwipeProgress * maxCardRotate;

		setSwipeProgress(newSwipeProgress);
		setRotate(newRotate);
		setDeltaX(newDeltaX);
		setDeltaY(newDeltaY);
	}

	const trySetImageIndex = function(newImageIndex: number) {
		const timeDownOnCard = Date.now() - (downOnCardStartTime?.getTime() ?? 0);
		if ((timeDownOnCard ?? 0) > maxTimeOnCardToClick) {
			return;
		}
		setImageIndex(newImageIndex)
	}

	const trySetViewMode = function(newViewMode: "detail" | "preview") {
		const timeDownOnCard = Date.now() - (downOnCardStartTime?.getTime() ?? 0);
		if ((timeDownOnCard ?? 0) > maxTimeOnCardToClick) {
			return;
		}
		setViewMode(newViewMode)
	}

	const setProgress = function(progress: number) {
		var windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			newDeltaX = windowWidth * progress,
			newDeltaY = windowHeight * Math.abs(progress) * -0.1;

		setSwipeProgress(progress);
		setDeltaX(newDeltaX);
		setDeltaY(newDeltaY);
	}
	
	const accept = function() {
		setProgress(1.2);

		dispatch(acceptProfileAsync(props.profile.UserName));
	}

	const reject = function() {
		setProgress(-1.2);

		dispatch(rejectProfileAsync(props.profile.UserName));
	}

	var cardContent;

	if (viewMode === "preview") {
		cardContent = <ProfileCardPreview profile={props.profile} imageIndex={imageIndex} setImageIndex={trySetImageIndex} toggleViewMode={() => trySetViewMode("detail")}></ProfileCardPreview>;
	} else {
		cardContent = <ProfileCardDetail profile={props.profile} imageIndex={imageIndex} setImageIndex={trySetImageIndex} toggleViewMode={() => trySetViewMode("preview")}></ProfileCardDetail>;
	}

	return (
		<div className={`profile-card ${downOnCard ? "down-on-card" : ""}`} style={{transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`}}
			onMouseDown={handleProfileCardMouseDown}
			onMouseMove={handleProfileCardMouseMove}
			onMouseUp={handleProfileCardMouseUp}
			onTouchStart={handleProfileCardTouchStart}
			onTouchMove={handleProfileCardTouchMove}
			onTouchEnd={handleProfileCardTouchEnd}
		>
			<div className="swipe-indicator nope" style={{opacity: -swipeProgress}}><h3>NOPE</h3></div>
			<div className="swipe-indicator like" style={{opacity: swipeProgress}}><h3>LIKE</h3></div>
			{cardContent}
		</div>
	);
}

export default ProfileCard;

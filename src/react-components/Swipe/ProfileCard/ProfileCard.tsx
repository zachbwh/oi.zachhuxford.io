import React, { Component } from 'react';
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

class ProfileCard extends React.Component<ProfileCardProps, ProfileCardState> {
	state: ProfileCardState = {
		downOnCard: false,
		viewMode: "preview",
		deltaX: 0,
		deltaY: 0,
		rotate: 0,
		swipeProgress: 0,
		imageIndex: 0
	}

	downOnCard: boolean = false

	downOnCardStartTime: Date | null = null
	timeDownOnCard: number | null = null
	referenceTouch: React.Touch | null = null

	handleProfileCardMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		this.downOnCard = true;
		this.timeDownOnCard = null;
		this.downOnCardStartTime = new Date();
		
		this.setState({downOnCard: true});
	}

	handleProfileCardMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (!this.downOnCard || this.state.viewMode === "detail") {
			return;
		}

		var newDeltaX = this.state.deltaX + event.movementX,
			newDeltaY = this.state.deltaY + event.movementY;

		this.updateCardTransform(newDeltaX, newDeltaY);
	}

	handleProfileCardMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		this.downOnCard = false;
		this.timeDownOnCard = Date.now() - (this.downOnCardStartTime?.getTime() ?? 0);
		this.downOnCardStartTime = null;

		this.setState({downOnCard: false});
		this.updateCardTransform(0, 0);
	}

	handleProfileCardTouchStart(event: React.TouchEvent<HTMLDivElement>) {
		this.downOnCard = true;
		this.timeDownOnCard = null;
		this.downOnCardStartTime = new Date();
		this.referenceTouch = event.targetTouches.item(0);
		
		this.setState({downOnCard: true});
	}

	handleProfileCardTouchMove(event: React.TouchEvent<HTMLDivElement>) {
		if (!this.downOnCard || this.state.viewMode === "detail") {
			return;
		}

		var newDeltaX = event.targetTouches[0].pageX - (this.referenceTouch?.pageX ?? 0),
			newDeltaY = event.targetTouches[0].pageY - (this.referenceTouch?.pageY ?? 0);
		this.updateCardTransform(newDeltaX, newDeltaY);
	}

	handleProfileCardTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
		this.downOnCard = false;
		this.timeDownOnCard = Date.now() - (this.downOnCardStartTime?.getTime() ?? 0);
		this.downOnCardStartTime = null;
		
		this.setState({downOnCard: false});
		this.updateCardTransform(0, 0);
	}

	updateCardTransform(newDeltaX: number, newDeltaY: number) {
		var windowWidth = window.innerWidth,
			swipeProgress = newDeltaX / (windowWidth / 2);

		var newRotate = swipeProgress * maxCardRotate;
		this.setState({
			swipeProgress: swipeProgress,
			rotate: newRotate,
			deltaX: newDeltaX,
			deltaY: newDeltaY
		})
	}

	setImageIndex(newImageIndex: number) {
		if (this.downOnCard || (this.timeDownOnCard ?? 0) > maxTimeOnCardToClick) {
			return;
		}
		this.setState({imageIndex: newImageIndex});
	}

	setViewMode(newViewMode: "preview" | "detail") {
		this.setState({viewMode: newViewMode});
	}

	render() {
		var cardContent;

		if (this.state.viewMode === "preview") {
			cardContent = <ProfileCardPreview profile={this.props.profile} imageIndex={this.state.imageIndex} setImageIndex={this.setImageIndex.bind(this)} toggleViewMode={() => this.setViewMode("detail")}></ProfileCardPreview>;
		} else {
			cardContent = <ProfileCardDetail profile={this.props.profile} imageIndex={this.state.imageIndex} setImageIndex={this.setImageIndex.bind(this)} toggleViewMode={() => this.setViewMode("preview")}></ProfileCardDetail>;
		}

		return (
			<div className={`profile-card ${this.state.downOnCard ? "down-on-card" : ""}`} style={{transform: `translate(${this.state.deltaX}px, ${this.state.deltaY}px) rotate(${this.state.rotate}deg)`}}
				onMouseDown={this.handleProfileCardMouseDown.bind(this)}
				onMouseMove={this.handleProfileCardMouseMove.bind(this)}
				onMouseUp={this.handleProfileCardMouseUp.bind(this)}
				onTouchStart={this.handleProfileCardTouchStart.bind(this)}
				onTouchMove={this.handleProfileCardTouchMove.bind(this)}
				onTouchEnd={this.handleProfileCardTouchEnd.bind(this)}
			>
				<div className="swipe-indicator nope" style={{opacity: -this.state.swipeProgress}}><h3>NOPE</h3></div>
				<div className="swipe-indicator like" style={{opacity: this.state.swipeProgress}}><h3>LIKE</h3></div>
				{cardContent}
			</div>
		);
	}
}

export default ProfileCard;

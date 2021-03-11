interface IUser {
	Username: string,
	UserId: string,
	ProfileImage: string,
	ProfileImageAltText: string,
	FirstName: string,
	LastName: string,
	Email?: string,
	Phone?: string,
	BankNumber?: string
};

export default IUser;
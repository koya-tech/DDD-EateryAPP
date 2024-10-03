import User from '../../domain/entities/User';

export default class UserDto {
    public readonly userId: string;

    public readonly userName: string;

    public readonly userPassword: string;

    public readonly userImage: string;

    constructor(user: User) {
        this.userId = user.userId.value;
        this.userName = user.userName.value;
        this.userPassword = user.userPassword.value;
        this.userImage = user.userImage.value;
    }
}

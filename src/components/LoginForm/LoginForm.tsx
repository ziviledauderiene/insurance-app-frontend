interface LoginFormProps {
  userType: string;
}

const LoginForm = ({ userType }: LoginFormProps): JSX.Element => (
  <div>{userType} Login form</div>
);

export default LoginForm;

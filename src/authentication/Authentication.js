import AuthenticationContainer from './parts/AuthenticationContainer';
import AuthenticationForm from './parts/AuthenticationForm';
import AuthenticationRouter from './tools/AuthenticationRouter';

import LoginForm from './forms/LoginForm';
import PasswordForm from './forms/PasswordForm';

const Authentication = AuthenticationContainer;

Authentication.Form = AuthenticationForm;
Authentication.Router = AuthenticationRouter;

// Forms
Authentication.Login = LoginForm;
Authentication.Password = PasswordForm;

export default Authentication;

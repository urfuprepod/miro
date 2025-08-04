import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router-dom";
import AuthLayout from "./ui/auth-layout";
import LoginForm from "./ui/login-form";

function LoginPage() {

    return (
        <AuthLayout
            title="Вход в систему"
            description="Введите ваш email и пароль для входа в систему"
            footerText={
                <>
                    Нет аккаунта?{" "}
                    <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
                </>
            }
            form={<LoginForm />}
        />
    );
}

export const Component = LoginPage;

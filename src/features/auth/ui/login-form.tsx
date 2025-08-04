import { Button } from "@/shared/ui/kit/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/useLogin";

const loginSchema = z.object({
    email: z
        .string()
        .refine((value) => value.trim().length > 0, {
            message: "Email обязателен",
        })
        .email({ message: "Неверный формат email" }),
    password: z
        .string()
        .refine((value) => value.trim().length > 0, {
            message: "Пароль обязателен",
        })
        .min(6, "Пароль должен содержать минимум 6 символов"),
});

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { errorMessage, isPending, login } = useLogin();

    const onSubmit = form.handleSubmit(login);

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="admin@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="***"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {errorMessage && (
                    <p className="text-destructive text-sm">{errorMessage}</p>
                )}
                <Button disabled={isPending} type="submit">
                    Войти
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
